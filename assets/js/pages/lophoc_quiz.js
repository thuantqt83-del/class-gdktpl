/* TRÒ CHƠI QUIZ TÍNH ĐIỂM (bản 24/11/2026, sửa lần 2) — thay phân hệ «Lớp học thông minh». Hai PHÒNG: «Kinh doanh ảo» (câu hỏi phần Kinh tế) và «Pháp luật quanh ta» (phần Pháp luật).
   KHÔNG CÓ MÀN CÀI ĐẶT, KHÔNG CHỌN CÁCH CHƠI: bấm «Chơi ngay» là vào chơi luôn (10 câu, mỗi câu 20 giây, cả ba lớp). Giao diện chỉ có chữ, không hình ảnh hay biểu tượng.
   Mỗi câu: đúng được 100 điểm + thưởng nhanh tối đa 50 điểm → tối đa 150 điểm/câu (cùng cách tính với phòng online của máy chủ). HỆ THỐNG tự chấm điểm.
   TỰ LƯU: ván đang chơi lưu sau mỗi câu (đóng trang rồi quay lại vẫn «Chơi tiếp» được); hết ván tự cộng vào thành tích (số ván, tổng điểm, kỷ lục, 5 ván gần nhất; SC.storage khoá «quiz»)
   và tự ghi vào Hồ sơ học tập (SC.progress, loại «quiz») nên câu sai hiện ở «Câu cần ôn lại». Chỉ lưu trên máy này; chưa gửi lên máy chủ.
   Câu hỏi NGẮN GỌN: chỉ lấy câu trắc nghiệm 4 lựa chọn có đề ≤ 110 ký tự, phương án dài nhất ≤ 60, tổng ≤ 260 và không nhắc «SGK»; trộn mức độ (khoảng 3 vận dụng, 4 thông hiểu, 3 nhận biết); thứ tự phương án xáo mỗi lần.
   Chữ hiển thị đi qua SC.sach; lời giải còn đi qua sachBai để bỏ chỉ dẫn nguồn như «Bài 5, tr.31.».
   Phòng ONLINE với lớp (lophoc_quiz_online.js) vẫn có, là nút phụ «Thi đấu online với lớp». Chế độ «nhóm chung một máy» và màn cài đặt cũ đã bỏ (bản cũ: _sao-luu/lophoc_quiz.truoc_quiz_tuluu.js).
   Trò «nhập vai tình huống» cũ của hai phòng vẫn nằm ở tab «Nhập vai tình huống». ✅ BẢN NHÁP — thầy/cô duyệt trước khi dùng. */
(function () {
  var E = SC.esc, KEY = 'quiz', run = null;
  var N_CAU = 10, GIAY = 20;                                    // cố định: không có màn cài đặt
  var NGAN = { de: 110, dapan: 60, tong: 260 };                 // «ngắn gọn»: số ký tự tối đa của đề, của phương án dài nhất, và của cả câu
  var RX_SACH = /SGK|sách giáo khoa/i;
  var RX_NGUON = /\(\s*tr\.\s*[\d–,\s-]*\d\s*\)|(?:Theo\s+bài học\s+)?\bBài\s*\d+(?:\s*,\s*tr\.\s*[\d–,\s-]*\d)?/gi;   // «Bài 5, tr.31–32», «(tr.12)»

  function conSong(el) { return !!el && typeof document !== 'undefined' && document.body.contains(el); }
  function tomTat(t, n) { t = String(t || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1) + '…' : t; }
  function kho() { var g = SC.storage.get(KEY, null); return g && typeof g === 'object' ? g : {}; }
  function luu(id, f) { var g = kho(), tk = g[id] && typeof g[id] === 'object' ? g[id] : {}; f(tk); g[id] = tk; SC.storage.set(KEY, g); return tk; }
  function phongCfg(id) { return ((SC.data && SC.data.phongQuiz) || []).filter(function (p) { return p.id === id; })[0]; }
  function dung() { if (run) { clearInterval(run.timer); run = null; } }

  // Điểm của một câu: đúng 100 + thưởng nhanh 0–50 theo phần thời gian còn lại (giống phòng online)
  function diemCau(dungCau, conLai, tong) { return dungCau ? 100 + Math.round(50 * Math.max(0, Math.min(1, conLai / tong))) : 0; }

  // Lời giải: bỏ chỉ dẫn nguồn còn sót sau SC.sach («Bài 5, tr.31.», «Tình huống Bài 6.»); nếu chỉ còn nhãn cụt thì bỏ hẳn
  function sachBai(t) {
    var g = SC.sach(t), r = g.replace(RX_NGUON, '').replace(/\s{2,}/g, ' ').replace(/\s+([.,;:])/g, '$1').replace(/^[\s.,;:–-]+/, '').trim();
    return r !== g && r.split(/\s+/).filter(Boolean).length <= 3 ? '' : r;
  }

  // Câu NGẮN GỌN và không nhắc sách giáo khoa
  function ngan(q) {
    var de = SC.sach(q.q).length, dai = 0, tong = de;
    q.o.forEach(function (o) { var l = SC.sach(o).length; tong += l; if (l > dai) dai = l; });
    return de <= NGAN.de && dai <= NGAN.dapan && tong <= NGAN.tong;
  }
  function hopLe(q) { return SC.cauChoi(q) && !RX_SACH.test(q.q + ' ' + q.o.join(' ')) && ngan(q); }
  function kho_cau(phan, khoi) { return SC.questions.all().filter(function (q) { return q.phan === phan && (!khoi || q.khoi === khoi) && hopLe(q); }); }

  // Bộ câu của một phòng: đúng phần (kinh-te / phap-luat), đúng khối (0 = cả ba khối); trộn mức độ ~3 vận dụng, 4 thông hiểu, còn lại nhận biết
  function chonBoCau(phan, khoi, n) {
    var pool = SC.shuffle(kho_cau(phan, khoi)), ds = [];
    function them(f, tran) { if (ds.length >= tran) return; ds = ds.concat(pool.filter(function (q) { return ds.indexOf(q) < 0 && f(q); }).slice(0, tran - ds.length)); }
    var m3 = Math.round(n * 0.3), m2 = Math.round(n * 0.4);
    them(function (q) { return q.muc_do === 3; }, m3); them(function (q) { return q.muc_do === 2; }, m3 + m2); them(function () { return true; }, n);
    return SC.shuffle(ds).slice(0, n);
  }
  function soCauCo(phan, khoi) { return kho_cau(phan, khoi).length; }

  // ---------------- Tự lưu ván đang chơi ----------------
  function luuDang(s, iTiep) {
    luu(s.id, function (tk) {
      tk.dang = { ids: s.ds.map(function (q) { return q.id; }), i: iTiep, diem: s.diem, dung: s.dung,
        kq: s.kq.map(function (x) { return { id: x.q.id, chon: x.chon, dung: x.dung, diem: x.diem, giay: x.giay }; }) };
    });
  }
  function khoiPhuc(id) {
    var d = (kho()[id] || {}).dang;
    if (!d || !Array.isArray(d.ids) || !d.ids.length || !Array.isArray(d.kq) || !(d.i >= 0 && d.i < d.ids.length) || d.kq.length !== d.i) return null;
    var ds = d.ids.map(function (x) { return SC.questions.byId(x); }), kq = d.kq.map(function (x) { return { q: SC.questions.byId(x.id), chon: x.chon, dung: !!x.dung, diem: +x.diem || 0, giay: +x.giay || 0 }; });
    if (ds.some(function (q) { return !q || q.dang !== 'tn4'; }) || kq.some(function (x) { return !x.q; })) return null;
    return { id: id, ds: ds, i: d.i, diem: +d.diem || 0, dung: +d.dung || 0, kq: kq };
  }
  // Hết ván: cộng vào thành tích và ghi vào Hồ sơ học tập (hệ thống tự tính), rồi xoá ván dở
  function ghiVan(s) {
    var n = s.ds.length, tb = Math.round(s.diem / n), moi = false;
    luu(s.id, function (tk) {
      tk.lan = (tk.lan || 0) + 1; tk.tong = (tk.tong || 0) + s.diem; tk.dung = (tk.dung || 0) + s.dung; tk.cau = (tk.cau || 0) + n;
      if (!tk.best || tb > tk.best.tb) { tk.best = { diem: s.diem, n: n, tb: tb }; moi = true; }
      tk.gan = [{ t: Date.now(), diem: s.diem, n: n, dung: s.dung }].concat(tk.gan || []).slice(0, 5);
      delete tk.dang;
    });
    s.moiKyLuc = moi;
    try {
      SC.progress.add({ id: 'Q' + Date.now(), ts: new Date().toISOString(), loai: 'quiz', so_cau: n, so_dung: s.dung, diem10: Math.round(100 * s.dung / n) / 10, diem_quiz: s.diem,
        chi_tiet: s.kq.map(function (x) { return { qid: x.q.id, muc_do: x.q.muc_do, dang: 'tn4', dung: x.dung, diem: x.dung ? 1 : 0, bai: x.q.bai }; }) });
    } catch (e) {}
  }

  // ---------------- Màn vào phòng: chỉ một nút «Chơi ngay» ----------------
  function sanh(box, id) {
    dung();
    var ph = phongCfg(id) || { phan: 'kinh-te', ten: id }, tk = kho()[id] || {}, d = khoiPhuc(id);
    var onl = !(SC.cloud && SC.cloud.bat()) ? 'cần nối máy chủ' : !SC.cloud.laHS() ? 'cần vào lớp (đăng nhập bằng tên)' : '';
    var gan = (tk.gan || []).map(function (x) {
      var t = new Date(x.t);
      return '<tr><td>' + E(t.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })) + '</td><td>' + x.dung + '/' + x.n + '</td><td><b>' + x.diem + '</b></td></tr>';
    }).join('');
    box.innerHTML = '<div class="card qz-set"><h3>' + E(ph.ten) + '</h3>' +
      '<p class="mute">' + N_CAU + ' câu ngắn, mỗi câu ' + GIAY + ' giây. Đúng được <b>100 điểm</b>, trả lời càng nhanh được thêm tối đa <b>50 điểm</b>. Hệ thống tự chấm điểm, tự lưu và tính vào Hồ sơ học tập.</p>' +
      (d ? '<p class="qz-tt">Ván đang chơi dở: câu ' + (d.i + 1) + '/' + d.ds.length + ' · ' + d.diem + ' điểm.</p>' : '') +
      '<p class="row">' + (d ? '<button type="button" class="btn" id="qz-tiep">Chơi tiếp</button><button type="button" class="btn alt" id="qz-bd">Ván mới</button>' : '<button type="button" class="btn" id="qz-bd">Chơi ngay</button>') +
      '<button type="button" class="btn alt" id="qz-onl">Thi đấu online với lớp</button></p>' +
      '<p class="mute" id="qz-tb" role="status" aria-live="polite">' + (onl ? 'Thi đấu online ' + onl + '.' : '') + '</p></div>' +
      (tk.lan ? '<div class="card qz-ky"><h3>Thành tích đã lưu</h3><div class="qz-kpi"><div><b>' + tk.lan + '</b><span>ván đã chơi</span></div><div><b>' + (tk.tong || 0) + '</b><span>tổng điểm</span></div>' +
        '<div><b>' + (tk.best ? tk.best.diem : 0) + '</b><span>điểm cao nhất một ván</span></div><div><b>' + (tk.cau ? Math.round(100 * (tk.dung || 0) / tk.cau) + '%' : '—') + '</b><span>câu trả lời đúng</span></div></div>' +
        (gan ? '<table><tr><th>Ván gần đây</th><th>Đúng</th><th>Điểm</th></tr>' + gan + '</table>' : '') + '</div>' : '');
    function moi() {
      var tb = box.querySelector('#qz-tb'), ds = chonBoCau(ph.phan, 0, N_CAU);
      if (ds.length < 3) { tb.textContent = 'Phòng này chưa đủ câu hợp lệ để chơi.'; return; }
      if (SC.am && SC.am.mo) SC.am.mo();
      choi(box, id, ds, null);
    }
    box.querySelector('#qz-bd').addEventListener('click', moi);
    var tiep = box.querySelector('#qz-tiep');
    if (tiep) tiep.addEventListener('click', function () { if (SC.am && SC.am.mo) SC.am.mo(); choi(box, id, d.ds, d); });
    box.querySelector('#qz-onl').addEventListener('click', function () { online(box, id); });
  }

  // ---------------- Chơi online: dùng phòng của máy chủ (lophoc_quiz_online.js) ----------------
  function online(box, id) {
    var ph = phongCfg(id) || { phan: 'kinh-te', ten: id };
    box.innerHTML = '<p><button type="button" class="btn alt" id="qz-ve">Quay lại</button></p><div id="qz-on"></div>';
    box.querySelector('#qz-ve').addEventListener('click', function () { if (SC.quiz && SC.quiz.dungOnline) SC.quiz.dungOnline(); sanh(box, id); });
    var out = box.querySelector('#qz-on');
    if (SC.quiz && SC.quiz.online) SC.quiz.online(out, { phan: ph.phan, khoi: 0, ten: ph.ten, n: N_CAU, giay: GIAY });
    else out.innerHTML = '<div class="card"><p>Chế độ online chưa có trong bản app này. Em bấm «Quay lại» rồi «Chơi ngay» nhé.</p></div>';
  }

  // ---------------- Chơi: hoàn toàn trên máy ----------------
  function choi(box, id, ds, tiep) {
    dung();
    var s = { id: id, ds: ds, i: tiep ? tiep.i : 0, diem: tiep ? tiep.diem : 0, dung: tiep ? tiep.dung : 0, kq: tiep ? tiep.kq : [], giay: GIAY, timer: null, han: 0, ord: [], xong: false };
    run = s;
    luuDang(s, s.i);
    ve(box, s);
  }
  function ve(box, s) {
    if (run !== s) return;
    var q = s.ds[s.i], ph = phongCfg(s.id) || {};
    s.ord = SC.shuffle([0, 1, 2, 3]); s.da = false; s.han = Date.now() + s.giay * 1000;
    box.innerHTML = '<div class="card qz-play" style="--band:' + E(ph.band || '#2355d6') + '">' +
      '<div class="qz-top"><span class="tag">Câu ' + (s.i + 1) + '/' + s.ds.length + '</span><span class="tag">Lớp ' + E(q.khoi) + '</span>' +
      '<span class="qz-diem">Điểm: <b id="qz-d">' + s.diem + '</b></span><span class="qz-clock" id="qz-dem" aria-live="off">' + s.giay + '</span></div>' +
      '<div class="qz-bar" aria-hidden="true"><i id="qz-bi"></i></div>' +
      '<p class="qz-q">' + E(SC.sach(q.q)) + '</p>' +
      '<div class="qz-opts" role="group" aria-label="Các phương án">' + s.ord.map(function (k, j) { return '<button type="button" class="opt qz-opt" data-j="' + j + '"><b>' + SC.LETTERS[j] + '.</b> ' + E(SC.sach(q.o[k])) + '</button>'; }).join('') + '</div>' +
      '<div class="fb qz-fb" id="qz-fb" role="status" aria-live="polite" hidden></div>' +
      '<p class="row"><button type="button" class="btn" id="qz-next" hidden>Câu tiếp</button><button type="button" class="btn alt" id="qz-thoat">Lưu và thoát</button></p></div>';
    box.querySelectorAll('.qz-opt').forEach(function (b) { b.addEventListener('click', function () { traLoi(box, s, +b.dataset.j); }); });
    box.querySelector('#qz-thoat').addEventListener('click', function () { dung(); sanh(box, s.id); });   // ván đã tự lưu: vào lại sẽ «Chơi tiếp» đúng câu này
    clearInterval(s.timer);
    s.timer = setInterval(function () {
      if (run !== s) { clearInterval(s.timer); return; }
      if (!conSong(box)) { dung(); return; }
      var con = (s.han - Date.now()) / 1000, el = box.querySelector('#qz-dem'), bi = box.querySelector('#qz-bi');
      if (el) { el.textContent = Math.max(0, Math.ceil(con)); el.classList.toggle('gap', con <= 5); }
      if (bi) { bi.style.width = Math.max(0, Math.min(100, 100 * con / s.giay)) + '%'; bi.classList.toggle('gap', con <= 5); }
      if (con <= 0 && !s.da) traLoi(box, s, -1);
    }, 100);
    try { box.querySelector('.qz-play').scrollIntoView({ block: 'start' }); } catch (e) {}
  }
  function traLoi(box, s, j) {
    if (run !== s || s.da) return;
    s.da = true; clearInterval(s.timer);
    var q = s.ds[s.i], con = Math.max(0, (s.han - Date.now()) / 1000), chon = j >= 0 ? s.ord[j] : -1, dungCau = chon === q.a, d = diemCau(dungCau, con, s.giay), cuoi = s.i + 1 >= s.ds.length;
    s.diem += d; if (dungCau) s.dung++;
    s.kq.push({ q: q, chon: chon, dung: dungCau, diem: d, giay: Math.round((s.giay - con) * 10) / 10 });
    if (cuoi) ghiVan(s); else luuDang(s, s.i + 1);   // tự lưu ngay sau mỗi câu
    box.querySelectorAll('.qz-opt').forEach(function (b, k) {
      b.disabled = true;
      if (s.ord[k] === q.a) b.classList.add('ok'); else if (k === j) b.classList.add('bad');
    });
    if (SC.am && SC.am.sfx) SC.am.sfx(dungCau ? 'dung' : 'sai');
    var gt = sachBai(SC.loiGiai ? SC.loiGiai(q) : (q.e || '')), fb = box.querySelector('#qz-fb');
    fb.hidden = false; fb.className = 'fb qz-fb ' + (dungCau ? 'ok' : 'bad');
    fb.innerHTML = '<p><b>' + (j < 0 ? 'Hết giờ! 0 điểm.' : dungCau ? 'Đúng! +' + d + ' điểm' : 'Chưa đúng, 0 điểm.') + '</b>' + (dungCau ? ' <span class="mute">(100 + ' + (d - 100) + ' thưởng nhanh)</span>' : '') + '</p>' +
      '<p>Đáp án đúng: <b>' + SC.LETTERS[s.ord.indexOf(q.a)] + '. ' + E(SC.sach(q.o[q.a])) + '</b></p>' + (gt ? '<p>' + E(gt) + '</p>' : '');
    var dEl = box.querySelector('#qz-d'); if (dEl) dEl.textContent = s.diem;
    var next = box.querySelector('#qz-next');
    next.hidden = false; next.textContent = cuoi ? 'Xem kết quả' : 'Câu tiếp'; next.focus();
    next.addEventListener('click', function () { if (cuoi) ketQua(box, s); else { s.i++; ve(box, s); } });
    var tt = box.querySelector('#qz-thoat'); if (tt) tt.hidden = true;
  }

  // ---------------- Kết quả (đã được ghi ở ghiVan) ----------------
  function ketQua(box, s) {
    s.xong = true; clearInterval(s.timer);
    var n = s.ds.length, toiDa = 150 * n, pct = Math.round(100 * s.diem / toiDa), tb = Math.round(s.diem / n), xep = pct >= 75 ? 'Xuất sắc' : pct >= 50 ? 'Khá' : 'Cần cố gắng thêm';
    var tk = kho()[s.id] || {};
    if (SC.am && SC.am.sfx) SC.am.sfx(pct >= 50 ? 'chuong' : 'nghi');
    box.innerHTML = '<div class="card qz-end"><span class="tag warn">Kết thúc ván · ' + E(xep) + '</span><h3>Em được ' + s.diem + ' điểm</h3>' +
      '<div class="qz-kpi"><div><b>' + s.dung + '/' + n + '</b><span>câu đúng</span></div><div><b>' + pct + '%</b><span>trên tối đa ' + toiDa + ' điểm</span></div><div><b>' + tb + '</b><span>điểm mỗi câu</span></div></div>' +
      (s.moiKyLuc ? '<p class="fb ok">Kỷ lục mới của em ở phòng này: ' + tb + ' điểm mỗi câu.</p>' : '') +
      '<p class="mute">Đã tự lưu. Tổng điểm của em ở phòng này: <b>' + (tk.tong || s.diem) + '</b> điểm (' + (tk.lan || 1) + ' ván). Kết quả cũng đã tính vào Hồ sơ học tập.</p>' +
      '<p class="row"><button type="button" class="btn" id="qz-lai">Chơi ván mới</button><button type="button" class="btn alt" id="qz-doi2">Xong</button></p></div>' +
      '<div class="card"><h3>Xem lại từng câu</h3><div class="qz-rv">' + s.kq.map(function (x, i) {
        return '<div class="qz-r ' + (x.dung ? 'ok' : 'bad') + '"><span class="qz-n">' + (i + 1) + '</span><div><p>' + E(tomTat(SC.sach(x.q.q), 150)) + '</p>' +
          '<p class="mute">Đáp án: <b>' + E(SC.sach(x.q.o[x.q.a])) + '</b>' + (x.chon < 0 ? ' · không kịp trả lời' : x.dung ? ' · đúng' : ' · em chọn: ' + E(SC.sach(x.q.o[x.chon]))) + ' · ' + x.diem + ' điểm</p></div></div>';
      }).join('') + '</div></div>';
    box.querySelector('#qz-lai').addEventListener('click', function () { var ph = phongCfg(s.id) || { phan: 'kinh-te' }, ds = chonBoCau(ph.phan, 0, N_CAU); if (ds.length) choi(box, s.id, ds, null); });
    box.querySelector('#qz-doi2').addEventListener('click', function () { dung(); sanh(box, s.id); });
    try { box.scrollIntoView({ block: 'start' }); } catch (e) {}
    run = null;
  }

  SC.quiz = SC.quiz || {};
  SC.quiz.diemCau = diemCau; SC.quiz.chonBoCau = chonBoCau; SC.quiz.soCauCo = soCauCo; SC.quiz.sachBai = sachBai; SC.quiz.ngan = ngan; SC.quiz.hopLe = hopLe;
  SC.quiz.N_CAU = N_CAU; SC.quiz.GIAY = GIAY;
  SC.lophoc = SC.lophoc || {};
  SC.lophoc.quiz = function (box, id) { sanh(box, id || 'kinhdoanh'); };
  SC.quiz.dung = dung;
})();
