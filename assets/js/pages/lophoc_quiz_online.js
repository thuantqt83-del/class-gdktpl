/* QUIZ TÍNH ĐIỂM · CHƠI ONLINE VỚI LỚP (24/11/2026) — khôi phục từ «Đấu trường trực tuyến» (Bước 4, đã chạy thử trên máy chủ thật 17/11/2026; thùng rác: _thung-rac/lop_hoc_gon_21-11-2026/pages/lophoc_dautruong.js).
   Cần máy chủ Supabase (schema_buoc4.sql đã nạp) và học sinh đã vào lớp bằng mã (SC.cloud.laHS()). Học sinh tạo phòng (mã 5 ký tự) hoặc nhập mã để vào phòng của CÙNG LỚP (tối đa 10 người).
   Mọi người thấy cùng một câu; máy chủ chấm từng câu (đúng 100 điểm + thưởng nhanh tối đa 50) và tự chuyển câu theo đồng hồ máy chủ. Máy khách chỉ HIỂN THỊ ảnh chụp trạng thái do hàm dau_trang_thai trả về
   (hỏi lại mỗi ~1,5 giây và ngay khi Realtime báo có thay đổi). Kết quả không ghi vào hồ sơ học tập. Chỉ hiện MÃ học sinh, không hiện tên.
   Sửa 24/11/2026 (lần 2): không còn ô chọn số câu/thời gian (cố định 10 câu, 20 giây), bỏ biểu tượng và emoji, câu hỏi ngắn gọn, lời giải bỏ chỉ dẫn «Bài…, tr.…».
   Khác bản cũ: bộ câu lấy theo PHÒNG (Kinh doanh ảo = phần Kinh tế, Pháp luật quanh ta = phần Pháp luật) và có thể chọn «cả ba lớp»; gọi bằng SC.quiz.online(out, {phan, khoi, ten, n, giay}). ✅ BẢN NHÁP — chưa chạy thử lại sau khi đổi giao diện. */
(function () {
  var E = SC.esc, run = null;
  var TEN_PHA = { cho: 'Đang chờ người chơi', chuan_bi: 'Chuẩn bị', tra_loi: 'Đang đấu', xem_kq: 'Xem đáp án', xong: 'Đã kết thúc' };

  function dungChay() {
    if (!run) return;
    clearInterval(run.timer); clearInterval(run.tick);
    if (run.dungNghe) run.dungNghe();
    run = null;
  }
  function conSong(el) { return !!el && document.body.contains(el); }
  function giayCon(han) { return Math.max(0, Math.ceil((han - Date.now()) / 1000)); }
  function tomTat(t, n) { t = String(t || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1) + '…' : t; }

  // Bộ câu: trắc nghiệm 4 lựa chọn của ngân hàng, đúng PHẦN của phòng (kinh-te | phap-luat) và đúng khối (0 = cả ba khối); lấy chung bộ chọn với chế độ chơi trên máy.
  var OPT = { phan: 'kinh-te', khoi: 0, ten: '', n: 10, giay: 20 };
  function chonBoCau(khoi, n) { return SC.quiz.chonBoCau(OPT.phan, khoi, n); }
  function tenLop(k) { return k ? 'Lớp ' + k : 'cả ba lớp'; }

  // Vẽ một câu (nội dung lấy từ ngân hàng trên máy; ĐÁP ÁN KHÔNG lấy từ đây mà từ máy chủ). Trả mảng nút phương án.
  function veCau(host, q) {
    host.innerHTML = '<div class="row"><span class="tag">Lớp ' + E(q.khoi) + '</span></div><p style="white-space:pre-line">' + E(SC.sach(q.q)) + '</p>';
    return q.o.map(function (t, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'opt'; b.textContent = SC.LETTERS[i] + '. ' + SC.sach(t);
      host.appendChild(b);
      return b;
    });
  }

  // ---------------- Điểm vào của mục «Đấu trường trực tuyến» ----------------
  SC.quiz = SC.quiz || {};
  SC.quiz.dungOnline = dungChay;
  SC.quiz.online = function (out, opt) {
    OPT = { phan: (opt && opt.phan) || 'kinh-te', khoi: (opt && opt.khoi) || 0, ten: (opt && opt.ten) || '', n: (opt && opt.n) || 10, giay: (opt && opt.giay) || 20 };
    var khoi = OPT.khoi;
    dungChay();
    if (!(SC.cloud && SC.cloud.bat())) {
      out.innerHTML = '<div class="card"><h3>Quiz online · '+E(OPT.ten)+'</h3><p>Chế độ này chơi nhiều máy cùng lúc nên cần <b>máy chủ</b>. App đang chạy ở chế độ trên máy (chưa nối máy chủ) nên chưa dùng được; em bấm «Quay lại» rồi «Chơi ngay» để chơi một mình (không cần mạng).</p></div>';
      return;
    }
    if (!SC.cloud.laHS()) {
      out.innerHTML = '<div class="card"><h3>Quiz online · '+E(OPT.ten)+'</h3><p>Em cần vào lớp (đăng nhập bằng tên) để chơi cùng các bạn cùng lớp: <a href="#/dangnhap">Đăng nhập</a> (tab Học sinh).</p></div>';
      return;
    }
    out.innerHTML = '<div class="card"><p class="mute" role="status">Đang kiểm tra phòng của em…</p></div><div id="dt-ct"></div>';
    SC.cloud.dau.phongCuaToi().then(function (r) {
      if (!conSong(out)) return;
      var box = out.querySelector('#dt-ct');
      out.firstChild.style.display = 'none';
      if (r.ok && r.phongId) phong(box, khoi, r.phongId, r.maPhong);
      else sanh(box, khoi, r.ok ? '' : r.thongBao);
    });
  };

  // ---------------- Sảnh: tạo phòng / vào phòng ----------------
  function sanh(box, khoi, thongBao) {
    dungChay();
    box.innerHTML = '<div class="card"><h3>Quiz online · '+E(OPT.ten)+'</h3>' +
      '<p>Chơi cùng các bạn <b>cùng lớp</b> trên nhiều máy: mọi người thấy cùng một câu, trả lời trong thời gian quy định, <b>máy chủ chấm từng câu</b>. Đúng được <b>100 điểm</b>, trả lời càng nhanh được thêm tối đa <b>50 điểm</b>. Phòng tối đa 10 người.</p>' +
      (thongBao ? '<p class="fb" role="status">' + E(thongBao) + '</p>' : '') + '</div>' +
      '<div class="grid"><div class="card"><h3>Tạo phòng</h3>' +
      '<p>' + OPT.n + ' câu, mỗi câu ' + OPT.giay + ' giây.</p>' +
      '<p class="mute">Bộ câu thuộc phần <b>' + (OPT.phan === 'kinh-te' ? 'Kinh tế' : 'Pháp luật') + '</b>, gồm câu ngắn gọn của cả ba lớp, trộn các mức độ.</p>' +
      '<p><button type="button" class="btn" id="dt-tao">Tạo phòng</button></p></div>' +
      '<div class="card"><h3>Vào phòng của lớp</h3><label for="dt-ma">Mã phòng (5 ký tự)</label>' +
      '<input id="dt-ma" maxlength="6" autocomplete="off" autocapitalize="characters" style="text-transform:uppercase">' +
      '<p><button type="button" class="btn" id="dt-vao">Vào phòng</button></p></div></div>' +
      '<p class="mute">Kết quả không ghi vào hồ sơ học tập và không tính huy hiệu. Trong phòng chỉ hiện mã học sinh, không hiện tên.</p><p class="mute" id="dt-tb" role="status" aria-live="polite"></p>';
    var tb = box.querySelector('#dt-tb'), bam = false;
    function vaoPhong(r) {
      bam = false;
      if (!conSong(box)) return;
      if (!r.ok) { tb.textContent = r.thongBao; return; }
      phong(box, khoi, r.phongId, r.maPhong);
    }
    box.querySelector('#dt-tao').addEventListener('click', function () {
      if (bam) return;
      var n = OPT.n, g = OPT.giay, ds = chonBoCau(khoi, n);
      if (ds.length < n) { tb.textContent = '' + tenLop(khoi) + ' chưa đủ câu hợp lệ cho lựa chọn này.'; return; }
      bam = true; tb.textContent = 'Đang tạo phòng…';
      SC.cloud.dau.tao(ds.map(function (q) { return q.id; }), g).then(vaoPhong);
    });
    function vao() {
      if (bam) return;
      var ma = box.querySelector('#dt-ma').value.trim();
      if (ma.length < 3) { tb.textContent = 'Nhập mã phòng bạn chủ phòng đã đưa.'; return; }
      bam = true; tb.textContent = 'Đang vào phòng…';
      SC.cloud.dau.vao(ma).then(vaoPhong);
    }
    box.querySelector('#dt-vao').addEventListener('click', vao);
    box.querySelector('#dt-ma').addEventListener('keydown', function (e) { if (e.key === 'Enter') vao(); });
  }

  // ---------------- Phòng: chỉ hiển thị ảnh chụp trạng thái từ máy chủ ----------------
  function phong(box, khoi, phongId, maPhong) {
    dungChay();
    box.innerHTML = '<div class="card"><div class="row"><b>Phòng</b><span class="tag" style="font-size:1.1rem;letter-spacing:.15em">' + E(maPhong) + '</span><span class="mute" id="dt-pha"></span></div>' +
      '<p class="mute" id="dt-tb" role="status" aria-live="polite">Đang tải phòng…</p></div><div id="dt-main"></div><div class="card" id="dt-bang"></div>' +
      '<p><button type="button" class="btn alt" id="dt-roi">Rời phòng</button></p>';
    var s = { id: phongId, khoi: khoi, khoa: '', p: null, r: null, daChon: null, loiTL: '', btns: null, dangHoi: false, hanBD: 0, hanTL: 0, hanXem: 0, lanCuoi: 0 };
    run = s;
    var tb = box.querySelector('#dt-tb');

    function bang(nguoi, p) {
      var el = box.querySelector('#dt-bang');
      if (!el) return;
      var dau = p.pha === 'cho';
      el.innerHTML = '<h3>' + (dau ? 'Người trong phòng' : 'Bảng điểm') + '</h3><table><tr><th>Hạng</th><th>Mã</th><th>Điểm</th>' + (p.pha === 'tra_loi' ? '<th>Câu này</th>' : '') + '</tr>' +
        nguoi.map(function (x) {
          var hang = 1 + nguoi.filter(function (y) { return y.diem > x.diem; }).length;
          return '<tr' + (x.la_toi ? ' style="font-weight:700"' : '') + '><td>' + (dau ? '·' : hang) + '</td><td>' + E(x.ma_hs) +
            (x.la_toi ? ' (bạn)' : '') + (x.la_chu ? ' (chủ phòng)' : '') + '</td><td>' + E(x.diem) + '</td>' + (p.pha === 'tra_loi' ? '<td>' + (x.da_tra_loi ? 'đã trả lời' : '…') + '</td>' : '') + '</tr>';
        }).join('') + '</table>';
    }

    function hoi() {
      if (run !== s) return;
      if (!conSong(box)) { dungChay(); return; }
      if (s.dangHoi) return;
      s.dangHoi = true;
      SC.cloud.dau.trangThai(s.id).then(function (r) {
        s.dangHoi = false;
        if (run !== s) return;
        if (!conSong(box)) { dungChay(); return; }
        if (!r.ok) {
          if (r.lyDo === 'khong_trong_phong' || r.lyDo === 'chua_vao_lop') { sanh(box, s.khoi, 'Em không còn ở trong phòng này (phòng đã bị xoá hoặc em đã rời).'); return; }
          tb.textContent = r.thongBao + ' (đang thử lại…)';
          return;
        }
        ve(r);
      });
    }

    function ve(r) {
      var p = r.phong, bay = Date.now();
      s.p = p; s.r = r;
      if (p.pha === 'chuan_bi') s.hanBD = bay + p.bat_dau_sau * 1000;
      if (p.pha === 'tra_loi') s.hanTL = bay + p.con_lai * 1000;
      if (p.pha === 'xem_kq') s.hanXem = bay + p.xem_con * 1000;
      tb.textContent = '';
      box.querySelector('#dt-pha').textContent = TEN_PHA[p.pha] + (p.pha !== 'cho' ? ' · câu ' + (p.cau_hien_tai + 1) + '/' + p.so_cau : '');
      bang(r.nguoi, p);
      var khoa = p.pha + '|' + p.cau_hien_tai + (p.pha === 'cho' ? '|' + r.nguoi.length + '|' + (p.la_chu ? 1 : 0) : '');
      if (khoa !== s.khoa) { s.khoa = khoa; s.daChon = null; s.loiTL = ''; s.btns = null; chinh(r); } else nhe(r);
      if (p.pha === 'xong') {   // hết ván: không cần hỏi nữa
        clearInterval(s.timer);
        if (s.dungNghe) { s.dungNghe(); s.dungNghe = null; }
      }
    }

    function chinh(r) {
      var p = r.phong, main = box.querySelector('#dt-main');
      if (p.pha === 'cho') chinhCho(main, r);
      else if (p.pha === 'chuan_bi') main.innerHTML = '<div class="card" style="text-align:center"><h3>Chuẩn bị!</h3><p>Câu đầu tiên mở sau <b id="dt-dem" style="font-size:1.6rem">' + giayCon(s.hanBD) + '</b> giây…</p><p class="mute">' + p.so_cau + ' câu · ' + p.giay_cau + ' giây mỗi câu. Chọn nhanh và đúng để được nhiều điểm.</p></div>';
      else if (p.pha === 'tra_loi') chinhTraLoi(main, r);
      else if (p.pha === 'xem_kq') chinhXemKq(main, r);
      else chinhXong(main, r);
    }

    function chinhCho(main, r) {
      var p = r.phong, ds = r.nguoi.length;
      main.innerHTML = '<div class="card"><h3>Phòng chờ</h3><p>Báo mã <b style="font-size:1.6rem;letter-spacing:.2em">' + E(p.ma_phong) + '</b> cho các bạn cùng lớp để vào phòng.</p>' +
        '<p>Đang có <b>' + ds + '/10</b> người · ' + p.so_cau + ' câu · ' + p.giay_cau + ' giây mỗi câu.</p>' +
        (p.la_chu ? '<p><button type="button" class="btn" id="dt-bd"' + (ds < 2 ? ' disabled' : '') + '>Bắt đầu chơi</button> ' + (ds < 2 ? '<span class="mute">cần ít nhất 2 người</span>' : '') + '</p>'
                  : '<p class="mute">Chờ chủ phòng bấm «Bắt đầu chơi»…</p>') + '</div>';
      if (p.la_chu && ds >= 2) {
        main.querySelector('#dt-bd').addEventListener('click', function (e) {
          e.target.disabled = true;
          SC.cloud.dau.batDau(s.id).then(function (r2) {
            if (run !== s) return;
            if (!r2.ok) { tb.textContent = r2.thongBao; e.target.disabled = false; return; }
            hoi();
          });
        });
      }
    }

    function chinhTraLoi(main, r) {
      var p = r.phong, q = SC.questions.byId(p.ma_cau);
      main.innerHTML = '<div class="card"><div class="row"><b>Câu ' + (p.cau_hien_tai + 1) + '/' + p.so_cau + '</b><span class="tag">Còn <b id="dt-dem">' + giayCon(s.hanTL) + '</b> giây</span></div>' +
        '<div id="dt-q"></div><p class="mute" id="dt-tt" role="status" aria-live="polite"></p></div>';
      if (!q || q.dang !== 'tn4' || !q.o || q.o.length !== 4) {
        main.querySelector('#dt-q').innerHTML = '<div class="empty">Câu này (' + E(p.ma_cau) + ') chưa có trong app trên máy này nên em chưa trả lời được. Báo cô giáo.</div>';
        return;
      }
      var btns = veCau(main.querySelector('#dt-q'), q);
      s.btns = btns;
      btns.forEach(function (b, i) {
        if (p.da_tra_loi_toi) b.disabled = true;
        b.addEventListener('click', function () { chon(i, p.ma_cau); });
      });
      nhe(r);
    }

    function chon(i, maCau) {
      if (s.daChon != null || !s.btns) return;
      s.daChon = i; s.loiTL = '';
      s.btns.forEach(function (b) { b.disabled = true; });
      s.btns[i].classList.add('sel');
      var tt = box.querySelector('#dt-tt'); if (tt) tt.textContent = 'Đang gửi câu trả lời…';
      SC.cloud.dau.traLoi(s.id, maCau, i).then(function (r2) {
        if (run !== s) return;
        if (!r2.ok && r2.lyDo !== 'da_tra_loi') {
          s.loiTL = r2.thongBao;
          if (r2.lyDo === 'mang' && s.btns) { s.daChon = null; s.btns.forEach(function (b) { b.disabled = false; b.classList.remove('sel'); }); }   // mất mạng: cho chọn lại
          if (s.r) nhe(s.r);
          return;
        }
        hoi();
      });
    }

    // cập nhật phần động mà không vẽ lại cả câu (giữ nguyên lựa chọn đang tô)
    function nhe(r) {
      var p = r.phong;
      if (p.pha === 'chuan_bi' || p.pha === 'xem_kq') return;
      var tt = box.querySelector('#dt-tt');
      if (!tt || p.pha !== 'tra_loi') return;
      var daTL = p.da_tra_loi_toi || (s.daChon != null && !s.loiTL);
      if (p.da_tra_loi_toi && s.btns) s.btns.forEach(function (b) { b.disabled = true; });
      tt.textContent = (s.loiTL ? s.loiTL + ' ' : '') + (daTL ? 'Đã ghi nhận câu trả lời của em. ' : 'Chọn một đáp án. ') + p.so_tra_loi + '/' + p.so_nguoi + ' bạn đã trả lời.';
    }

    function chinhXemKq(main, r) {
      var p = r.phong, kq = r.ketQuaCau, q = kq && SC.questions.byId(kq.ma_cau), cuoi = p.cau_hien_tai + 1 >= p.so_cau;
      main.innerHTML = '<div class="card"><div class="row"><b>Đáp án câu ' + (p.cau_hien_tai + 1) + '/' + p.so_cau + '</b><span class="tag">' + (cuoi ? 'Chung cuộc' : 'Câu tiếp') + ' sau <b id="dt-dem">' + giayCon(s.hanXem) + '</b> giây</span></div>' +
        '<div id="dt-q"></div><div class="fb" id="dt-fb"></div></div>';
      if (!kq) { main.querySelector('#dt-fb').textContent = 'Chưa lấy được đáp án câu này từ máy chủ.'; return; }
      if (q && q.o && q.o.length === 4) {
        veCau(main.querySelector('#dt-q'), q).forEach(function (b, i) {
          b.disabled = true;
          if (i === kq.dap_an) b.classList.add('ok'); else if (i === kq.chon_toi) b.classList.add('bad');
        });
      }
      var m = kq.chon_toi == null ? 'Em chưa trả lời câu này (0 điểm).' : kq.dung_toi ? 'Đúng! +' + kq.diem_toi + ' điểm.' : 'Chưa đúng (0 điểm).';
      main.querySelector('#dt-fb').innerHTML = '<p><b>' + E(m) + '</b> Đáp án đúng: <b>' + E(SC.LETTERS[kq.dap_an]) + '</b>.</p><p>' + E(kq.so_dung) + '/' + E(kq.so_tra_loi) + ' bạn trả lời đúng.</p>' +
        (q && SC.loiGiai && SC.quiz.sachBai(SC.loiGiai(q)) ? '<p>' + E(SC.quiz.sachBai(SC.loiGiai(q))) + '</p>' : '');
    }

    function chinhXong(main, r) {
      var nguoi = r.nguoi, toi = nguoi.filter(function (x) { return x.la_toi; })[0] || { diem: 0 };
      var hang = 1 + nguoi.filter(function (y) { return y.diem > toi.diem; }).length;
      var kq = hang === 1 ? 'Em đứng nhất' + (nguoi.filter(function (y) { return y.diem === toi.diem; }).length > 1 ? ' (đồng hạng)' : '') + '!' : 'Em đứng hạng ' + hang + '/' + nguoi.length + '.';
      var tk = r.tongKet || [];
      main.innerHTML = '<div class="card"><h3>Chung cuộc</h3><p><b>' + E(kq) + '</b> Em được ' + E(toi.diem) + ' điểm. Bảng điểm cả phòng ở bên dưới.</p>' +
        '<p class="mute">Kết quả không ghi vào hồ sơ học tập. Bấm «Rời phòng» để chơi ván mới.</p></div>' +
        (tk.length ? '<div class="card"><h3>Xem lại từng câu</h3><table><tr><th>Câu</th><th>Nội dung</th><th>Đáp án</th><th>Em chọn</th><th>Điểm</th></tr>' + tk.map(function (x, i) {
          var q = SC.questions.byId(x.ma_cau);
          return '<tr><td>' + (i + 1) + '</td><td>' + E(q ? tomTat(q.q, 90) : x.ma_cau) + '</td><td>' + E(SC.LETTERS[x.dap_an]) + '</td><td>' +
            (x.chon_toi == null ? '—' : E(SC.LETTERS[x.chon_toi]) + (x.dung_toi ? ' (đúng)' : ' (sai)')) + '</td><td>' + E(x.diem_toi) + '</td></tr>';
        }).join('') + '</table></div>' : '');
    }

    function nhip() {
      if (run !== s) return;
      if (!conSong(box)) { dungChay(); return; }
      var p = s.p;
      if (!p) return;
      var el = box.querySelector('#dt-dem'), han = p.pha === 'chuan_bi' ? s.hanBD : p.pha === 'tra_loi' ? s.hanTL : p.pha === 'xem_kq' ? s.hanXem : 0;
      if (!el || !han) return;
      var c = giayCon(han);
      el.textContent = c;
      if (c <= 0) {
        if (p.pha === 'tra_loi' && s.btns && s.daChon == null) s.btns.forEach(function (b) { b.disabled = true; });   // hết giờ
        if (Date.now() - s.lanCuoi > 800) { s.lanCuoi = Date.now(); hoi(); }
      }
    }

    // Rời phòng (giữa ván phải bấm hai lần)
    var armed = false, nutRoi = box.querySelector('#dt-roi');
    nutRoi.addEventListener('click', function () {
      var giua = s.p && s.p.pha !== 'cho' && s.p.pha !== 'xong';
      if (giua && !armed) {
        armed = true; nutRoi.textContent = 'Bấm lần nữa để rời giữa ván';
        setTimeout(function () { armed = false; nutRoi.textContent = 'Rời phòng'; }, 4000);
        return;
      }
      nutRoi.disabled = true;
      SC.cloud.dau.roi(s.id).then(function (r) {
        if (!conSong(box) || run !== s) return;
        if (!r.ok) { nutRoi.disabled = false; tb.textContent = r.thongBao; return; }
        sanh(box, s.khoi, '');
      });
    });

    s.dungNghe = SC.cloud.dau.nghe(phongId, hoi);
    s.timer = setInterval(hoi, 1500);
    s.tick = setInterval(nhip, 250);
    hoi();
  }
})();
