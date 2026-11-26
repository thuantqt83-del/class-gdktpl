/* Lớp học thông minh · PHÒNG KINH DOANH ẢO — em là chủ cơ sở bán rau sạch «Rau sạch Nhà em», điều hành 8 tháng với số tiền ảo (số giả định).
   Mỗi tháng có HAI phần: (1) ĐIỀU HÀNH — đọc bản tin thị trường, nghe lời dẫn dụ (bẫy), chọn GIÁ BÁN và LƯỢNG NHẬP, xem lãi lỗ thật theo mô hình cầu – cung
   (data/game/kdao_mo_hinh.js); (2) TÌNH HUỐNG cuối tháng — ba phương án về đạo đức, pháp luật, trách nhiệm kinh doanh, tác động đến tiền, uy tín, tuân thủ.
   Quyết định cũ để lại «dấu vết» làm đổi các tháng sau. Dùng chung với «Pháp luật quanh ta»: sa bàn 3D (lophoc_sb3d.js), nhạc và giọng đọc (lophoc_am.js),
   gợi ý 3 bậc Quan sát – Nguyên tắc – Cách nghĩ KHÔNG nêu đáp án (dùng đến bậc 3 thì chỉ được tính tối đa 1/2 điểm), Trợ giảng phân tích lỗi sai và rủi ro
   (soạn sẵn, chưa phải AI thật). Chạy trên máy; không ghi vào điểm hồ sơ; chỉ lưu tiến độ, số lần chơi, kết cục đã mở, kết quả tốt nhất. Dữ liệu: data/game/kdao.js.
   (23/11/2026) Thêm «Tháng 0 · chia vốn khởi nghiệp» (pha 'z'), «sự cố giữa tháng» (pha 'sc', xen giữa điều hành và tình huống cuối tháng) và bảng đánh giá 5 tiêu chí ở màn kết cục.
   Cả ba loại tình huống (z, sc, th) dùng chung khung veKB; trạng thái ván có thêm s.z và s.sc.
   (24/11/2026) CẤP ĐỘ: năm kinh doanh chia thành 4 cấp độ (data/game/cap_do.js): 1 Khởi nghiệp (Tháng 0 + tháng 1), 2 Điều hành (tháng 2–3), 3 Xử lý khủng hoảng (tháng 4–5), 4 Doanh nghiệp bền vững (tháng 6–8).
   Nội dung tình huống KHÔNG đổi, chỉ xếp vào cấp độ. Chơi lần lượt (tiền, uy tín, dấu vết giữ sang cấp sau) hoặc bắt đầu từ cấp độ bất kì (khi đó vốn tính lại từ đầu cấp độ, s.tu = cấp bắt đầu).
   Hết tháng cuối của mỗi cấp độ có màn «Hoàn thành cấp độ» (chất lượng quyết định trong cấp độ, nhật kí, bài liên quan); kết quả tốt nhất mỗi cấp lưu ở g.cap[số cấp].
   (24/11/2026, L3) HỘP THƯ VÀ ĐIỂM SỨC (cơ chế M1) ở THÁNG 3: pha 'hop' thay «sự cố giữa tháng» (sự cố khách trả rau héo thành việc số 1); 3 việc, 5 điểm sức, mỗi việc chọn cách xử lí (tốn sức) hoặc để lại;
   cờ của từng cách quay lại ở tháng 4 (hau_qua). Dữ liệu: data/game/kdao.js thang[2].hop; kết quả mỗi lần xử lí ở s.hp = [{t, ch[], gh}]. */
(function () {
  var E = SC.esc, KEY = 'kdao', GM = SC.gm;
  var che3d = SC.storage.get('hanhtrinh3d', true) !== false, lanVe = 0;
  function K() { return SC.data.game.kdao; }
  // Cấp độ (data/game/cap_do.js); không có dữ liệu thì coi cả năm là một cấp độ
  function CD() { var L = SC.data.game.capdo && SC.data.game.capdo['kinh-doanh']; return L && L.length ? L : [{ so: 1, ten: 'Cả năm', thang: [0, K().thang.length - 1], z: true, mota: '', muc_tieu: '' }]; }
  function capCua(t) { var L = CD(); for (var i = 0; i < L.length; i++) if (t >= L[i].thang[0] && t <= L[i].thang[1]) return L[i]; return L[L.length - 1]; }
  function doc() { var g = SC.storage.get(KEY, null); return g && typeof g === 'object' ? g : {}; }
  function ghi(g) { SC.storage.set(KEY, g); }
  function lay() { var g = doc(); if (!g.ket) g.ket = {}; return g; }
  function soKet() { return K().ket.length + Object.keys(K().ket_som).length; }
  function kep(v) { return Math.max(0, Math.min(100, v)); }
  // Định dạng tiền (đơn vị nghìn đồng): từ 1.000 trở lên hiện bằng triệu
  function fm(n, dau) {
    var a = Math.abs(n), t = a >= 1000 ? (a / 1000).toFixed(1).replace('.', ',') + ' triệu' : a + ' nghìn';
    return (n < 0 ? '−' : (dau && n > 0 ? '+' : '')) + t;
  }
  function sd(n) { return String(n).replace('.', ','); }   // số thập phân kiểu Việt Nam
  function moi(n) { var M = K().mo_hinh, c = CD()[(n || 1) - 1] || CD()[0], dau = !!(c.z && K().thang0); return { t: dau ? 0 : c.thang[0], pha: dau ? 'z' : 'dh', tu: c.so, tien: M.TIEN_DAU, tin: M.TIN_DAU, ct: M.CT_DAU, co: {}, dh: [], th: [], sc: [], hp: [], z: null, diem: 0, toiDa: 0, hqThang: [], kPhu: 1, nhom: (SC.nhom ? SC.nhom.dung() : null) }; }
  function luu(s) {
    var g = lay(); g.tien = { t: s.t, pha: s.pha, tu: s.tu || 1, tien: s.tien, tin: s.tin, ct: s.ct, co: Object.keys(s.co), dh: s.dh, th: s.th, sc: s.sc, hp: s.hp || [], z: s.z, diem: s.diem, toiDa: s.toiDa, hqThang: s.hqThang, kPhu: s.kPhu, nhom: s.nhom || null }; ghi(g);
  }
  function khoiPhuc(t) {
    try {
      if (!t || typeof t.t !== 'number' || t.t < 0 || t.t >= K().thang.length || ['dh', 'th', 'sc', 'hop', 'z'].indexOf(t.pha) < 0) return null;
      if ((t.pha === 'z' && !K().thang0) || (t.pha === 'sc' && !K().thang[t.t].su_co) || (t.pha === 'hop' && !K().thang[t.t].hop)) return null;
      var co = {}; (t.co || []).forEach(function (f) { co[f] = true; });
      return { t: t.t, pha: t.pha, tu: t.tu || 1, tien: t.tien, tin: t.tin, ct: t.ct, co: co, dh: t.dh || [], th: t.th || [], sc: t.sc || [], hp: t.hp || [], z: t.z || null, diem: t.diem || 0, toiDa: t.toiDa || 0, hqThang: t.hqThang || [], kPhu: t.kPhu || 1, nhom: (SC.nhom ? SC.nhom.sach(t.nhom) : null) };
    } catch (e) { return null; }
  }
  function som(s) { return s.tien <= 0 ? 'tien' : s.tin <= 0 ? 'tin' : s.ct <= 0 ? 'ct' : null; }
  // Đầu tháng: áp các hậu quả của quyết định cũ (theo cờ), ghi lại để hiện trong bản tin
  function batDauThang(s) {
    s.hqThang = []; s.kPhu = 1;
    K().hau_qua.forEach(function (h) {
      if (h.thang !== s.t + 1 || !s.co[h.co]) return;
      var d = h.d || {}; s.tien += d.tien || 0; s.tin = kep(s.tin + (d.tin || 0)); s.ct = kep(s.ct + (d.ct || 0));
      if (h.k) s.kPhu *= h.k; s.hqThang.push({ nd: h.nd, d: d });
    });
  }

  // ---------------- Hiển thị chung ----------------
  function meters(s) {
    var M = K().mo_hinh, ds = [['tien', 'Tiền mặt', fm(s.tien), Math.max(0, Math.min(100, s.tien / (2 * M.TIEN_DAU) * 100)), s.tien < 0.25 * M.TIEN_DAU],
      ['tin', 'Uy tín', s.tin, s.tin, s.tin < 25], ['ct', 'Tuân thủ và trách nhiệm', s.ct, s.ct, s.ct < 25]];
    return '<div class="gm-meters">' + ds.map(function (m) {
      return '<div class="gm-m' + (m[4] ? ' low' : '') + '" data-m="' + m[0] + '"><div class="gm-ml"><span>' + E(m[1]) + '</span><b>' + E(String(m[2])) + '</b></div>' +
        '<div class="gm-mb" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(m[3]) + '" aria-label="' + E(m[1]) + '"><i style="width:' + m[3] + '%"></i></div></div>';
    }).join('') + '</div>';
  }
  function capNhat(box, s) {
    var M = K().mo_hinh, v = { tien: [fm(s.tien), Math.max(0, Math.min(100, s.tien / (2 * M.TIEN_DAU) * 100)), s.tien < 0.25 * M.TIEN_DAU], tin: [s.tin, s.tin, s.tin < 25], ct: [s.ct, s.ct, s.ct < 25] };
    Object.keys(v).forEach(function (k) {
      var el = box.querySelector('[data-m="' + k + '"]'); if (!el) return;
      el.querySelector('b').textContent = v[k][0]; el.querySelector('.gm-mb').setAttribute('aria-valuenow', Math.round(v[k][1])); el.querySelector('i').style.width = v[k][1] + '%'; el.classList.toggle('low', v[k][2]);
    });
  }
  function thangBuoc(t) {
    return '<div class="gm-steps kd-thang" aria-label="Các tháng">' + K().thang.map(function (m, i) { return '<span class="' + (i === t ? 'on' : i < t ? 'xong' : '') + '">T' + (i + 1) + '</span>'; }).join('') + '</div>';
  }
  function thanhTren() {
    return '<div class="gm-top"><button type="button" class="btn alt gm-back">Lưu và thoát</button>' + (SC.am ? '<span class="gm-top-am"><button type="button" class="btn alt gm-am" aria-pressed="' + SC.am.coAmThanh() + '">' + (SC.am.coAmThanh() ? '🔊 Âm thanh: bật' : '🔇 Âm thanh: tắt') + '</button><button type="button" class="btn alt gm-bq" title="Bỏ qua câu đang đọc">⏭ Bỏ qua giọng</button></span>' : '') + '<b>' + E(K().ten) + '</b></div>';
  }
  function chips(d) {
    var ten = { tien: 'Tiền mặt', tin: 'Uy tín', ct: 'Tuân thủ' };
    return Object.keys(d || {}).filter(function (k) { return d[k]; }).map(function (k) {
      var v = d[k]; return '<span class="gm-chip ' + (v >= 0 ? 'up' : 'dn') + '">' + ten[k] + ' ' + (k === 'tien' ? fm(v, true) : (v > 0 ? '+' : '−') + Math.abs(v)) + '</span>';
    }).join('');
  }
  function phanTichHtml(bay, loiSai, ruiRo, tranh) {
    var lb = bay && GM.LOAI_BAY[bay.loai]; if (!lb && !loiSai) return '';
    return '<div class="gm-tg"><p class="gm-tg-h"><b>Trợ giảng phân tích</b> <span class="mute">(soạn sẵn, chưa phải AI thật)</span></p><ul>' +
      (lb ? '<li><b>Bẫy trong phần này:</b> ' + E(lb.ten) + '. ' + E(bay.mo) + '</li>' : '') +
      (loiSai ? '<li><b>Lỗi sai:</b> ' + E(loiSai) + '</li><li><b>Rủi ro em có thể gặp:</b> ' + E(ruiRo) + '</li>' : '<li><b>Em đã tránh được bẫy này.</b></li>') +
      (lb ? '<li><b>Cách tự bảo vệ lần sau:</b> ' + E(lb.tu) + '</li>' : '') + '</ul></div>';
  }
  function khungHtml(dung3d) { return dung3d ? '<div class="sb-khung" role="img" aria-label="Sa bàn 3D minh hoạ"><div class="sb-cho">Đang dựng sa bàn 3D…</div></div>' : ''; }
  function dan(loi) { return loi ? '<blockquote class="gm-dan"><b>' + E(loi.ai) + ':</b> «' + E(loi.nd) + '»</blockquote>' : ''; }
  function khungGy(gy) {
    return gy && gy.length ? '<div class="gm-gy-box"><button type="button" class="btn alt gm-gy-btn">Trợ giảng: xin gợi ý (0/' + gy.length + ')</button><span class="mute"> Trợ giảng chỉ gợi ý, không đưa đáp án; soạn sẵn, chưa phải AI thật. Dùng gợi ý cấp ' + gy.length + ' thì được tính tối đa 1/2 điểm.</span><div class="gm-gy-list" aria-live="polite"></div></div>' : '';
  }
  function so(box) { var el = box.querySelector('.gm-play, .gm-end'); if (el) el.scrollIntoView({ block: 'start' }); }

  // ---------------- Trang giới thiệu ----------------
  function hub(box) {
    var k = K(), g = lay(), t = khoiPhuc(g.tien), conTiep = !!t, mo = Object.keys(g.ket).length;
    box.innerHTML =
      '<div class="card gm-intro gm-hero" style="--c:' + k.mau + '"><span class="tag warn">' + CD().length + ' cấp độ · điều hành ' + k.thang.length + ' tháng · Kinh tế Lớp 10 – 11 – 12</span>' +
      '<h3>' + E(k.ten) + '</h3><p class="gm-kh">' + E(k.khau_hieu) + '</p><p>' + E(k.gioi_thieu) + '</p>' +
      '<p class="mute">Năm kinh doanh chia thành <b>' + CD().length + ' cấp độ</b>: ' + CD().map(function (c) { return E(c.ten); }).join(', ') + '. Xong một cấp độ, tiền, uy tín và dấu vết được giữ sang cấp độ sau; em cũng có thể bắt đầu từ cấp độ em muốn. Mỗi tháng em <b>chọn giá bán và lượng nhập</b> rồi xem lãi lỗ thật; rau tươi không để qua tháng, nên nhập thừa là mất tiền, nhập thiếu là mất khách. Cuối tháng có một tình huống về đạo đức, pháp luật, trách nhiệm kinh doanh. Trước khi khai trương có «Tháng 0» chia vốn; một số tháng còn có thêm sự cố giữa tháng. <b>Cẩn thận: có người nói rất thuyết phục để kéo em vào bẫy.</b> Trợ giảng chỉ gợi ý, không đưa đáp án, rồi phân tích lỗi sai và rủi ro (soạn sẵn, chưa phải AI thật). Tiền, giá, số liệu đều là giả định; kết quả không tính vào điểm hồ sơ; tự lưu sau mỗi phần.</p>' +
      '<p class="row">' + (conTiep ? '<button type="button" class="btn" id="kd-tiep">Tiếp tục: cấp độ ' + capCua(t.t).so + ' · tháng ' + (t.t + 1) + ' <span class="gm-tri" aria-hidden="true"></span></button>' : '') +
      '<button type="button" class="btn' + (conTiep ? ' alt' : '') + '" id="kd-moi">' + (conTiep ? 'Bắt đầu lại từ cấp độ 1' : 'Bắt đầu từ cấp độ 1') + (conTiep ? '' : ' <span class="gm-tri" aria-hidden="true"></span>') + '</button></p>' +
      '<p class="row"><label class="gm-che"><input type="checkbox" id="kd-3d"' + (che3d ? ' checked' : '') + (SC.sb && SC.sb.ok === false ? ' disabled' : '') + '> Chơi dạng <b>3D</b> (sa bàn hoạt hình)</label>' +
      (SC.sb && SC.sb.ok === false ? '<span class="mute"> Máy này chưa hỗ trợ 3D (WebGL), trò chơi chạy bằng chữ.</span>' : '') + '</p>' + (SC.nhom ? SC.nhom.khungHub() : '') + (SC.am ? SC.am.dieuKhien() : '') +
      (SC.hs && SC.hs.chanNoiDung ? SC.hs.chanNoiDung(k) : '') + '<p class="gm-card-s">' + (g.lan ? 'Đã hoàn thành ' + g.lan + ' năm · Kết cục đã mở ' + mo + '/' + soKet() + (g.tot ? ' · Tốt nhất ' + g.tot + '%' : '') + (g.tienCao ? ' · Tiền cuối năm cao nhất ' + fm(g.tienCao) : '') : 'Chưa hoàn thành năm nào · ' + soKet() + ' kết cục đang chờ em') + '</p></div>' +
      '<h4>Các cấp độ</h4><p class="mute">Chơi lần lượt từ cấp độ 1, hoặc bấm một cấp độ để bắt đầu từ đó (vốn tính lại từ đầu cấp độ).</p><div class="gm-grid">' + CD().map(function (c) {
        var tn = [], b = (g.cap || {})[c.so];
        if (c.z && k.thang0) tn.push(k.thang0.tieu_de);
        for (var m = c.thang[0]; m <= c.thang[1]; m++) { tn.push(k.thang[m].tinh_huong.tieu_de); if (k.thang[m].su_co) tn.push(k.thang[m].su_co.tieu_de); if (k.thang[m].hop) tn.push(k.thang[m].hop.tieu_de); }
        return '<button type="button" class="gm-card" data-cap="' + c.so + '" style="--c:' + k.mau + '"><span class="gm-card-ic">' + c.so + '</span><span class="gm-card-b"><b>Cấp độ ' + c.so + ' · ' + E(c.ten) + '</b>' +
          '<span class="gm-card-t"><span class="tag">' + (c.z ? 'Tháng 0 + tháng ' : 'Tháng ') + (c.thang[0] === c.thang[1] ? (c.thang[0] + 1) : (c.thang[0] + 1) + '–' + (c.thang[1] + 1)) + '</span><span class="tag">' + tn.length + ' tình huống</span></span>' +
          '<span class="gm-card-d gm-clamp">' + E(c.mota) + '</span><span class="gm-card-d">Tình huống: ' + tn.map(E).join(' · ') + '</span>' +
          '<span class="gm-card-s">' + (b != null ? 'Tốt nhất ở cấp độ này: ' + b + '%' : 'Chưa chơi cấp độ này') + '</span></span></button>';
      }).join('') + '</div>';
    if (SC.am) { SC.am.dung(); SC.am.nhac(null); SC.am.noiDieuKhien(box); }
    if (SC.nhom) SC.nhom.noiHub(box);
    var cb = box.querySelector('#kd-3d');
    if (cb) cb.addEventListener('change', function () { che3d = cb.checked; SC.storage.set('hanhtrinh3d', che3d); if (che3d && SC.sb) SC.sb.nap(function () {}); });
    if (che3d && SC.sb) SC.sb.nap(function () {});
    if (conTiep) box.querySelector('#kd-tiep').addEventListener('click', function () { if (SC.am) SC.am.mo(); chay(box, t); });
    function batDau(n) {
      if (conTiep && !window.confirm('Bắt đầu mới sẽ thay tiến độ đang lưu. Em chắc chứ?')) return;
      if (SC.am) SC.am.mo(); var s = moi(n); batDauThang(s); chay(box, s);
    }
    box.querySelector('#kd-moi').addEventListener('click', function () { batDau(1); });
    box.querySelectorAll('[data-cap]').forEach(function (b) { b.addEventListener('click', function () { batDau(+b.dataset.cap); }); });
  }

  // ---------------- Chơi ----------------
  function chay(box, s) {
    if (s.pha === 'th') veTH(); else if (s.pha === 'sc') veSC(); else if (s.pha === 'hop') veHop(); else if (s.pha === 'z') veZ(); else veDH();

    function amKhoiDong(th, dsGiong, dung3d, moodBay) {
      var amBat = !!(SC.am && SC.am.dangBat());
      if (SC.am) {
        SC.am.dung(); SC.am.nhac(GM.MOOD_BAY[moodBay] || 'tam'); SC.am.sfx('vao'); if (dung3d && SC.sb) SC.sb.datLai();
        if (amBat) SC.am.noi(dsGiong);
      }
      return amBat;
    }
    function noiDieuKhienAm() {
      var nutAm = box.querySelector('.gm-am'), nutBq = box.querySelector('.gm-bq');
      if (nutAm) nutAm.addEventListener('click', function () { SC.am.mo(); var v = !SC.am.coAmThanh(); SC.am.datBat(v); nutAm.textContent = v ? '🔊 Âm thanh: bật' : '🔇 Âm thanh: tắt'; nutAm.setAttribute('aria-pressed', String(v)); });
      if (nutBq) nutBq.addEventListener('click', function () { SC.am.boQua(); });
      box.querySelector('.gm-back').addEventListener('click', function () { hub(box); window.scrollTo(0, 0); });
    }
    function bat3d(kh, d, loi, amBat) {
      var tk = ++lanVe;
      SC.sb.nap(function (ok) {
        if (tk !== lanVe || !kh || !document.body.contains(kh)) return;
        var cho = kh.querySelector('.sb-cho'); if (cho) kh.removeChild(cho);
        if (!ok || !SC.sb.dung(kh, d, loi, { cho: amBat })) { if (kh.parentNode) kh.parentNode.removeChild(kh); var sc0 = box.querySelector('.gm-scene'); if (sc0) sc0.classList.remove('sb-on'); }
      });
    }
    function gopY(c, gy, ds) {   // xử lí nút gợi ý; trả về hàm đọc số bậc đã dùng
      var gl = 0, nut = box.querySelector('.gm-gy-btn');
      if (nut) nut.addEventListener('click', function () {
        if (c.daChon || gl >= gy.length) return;
        gl++;
        box.querySelector('.gm-gy-list').insertAdjacentHTML('beforeend', '<p class="gm-gy"><b>Gợi ý ' + gl + '/' + gy.length + ' · ' + (GM.TEN_GY[gl - 1] || '') + '.</b> ' + E(gy[gl - 1]) + '</p>' + (gl === gy.length ? '<p class="mute">Em đã dùng gợi ý cấp cuối: phần này được tính tối đa 1/2 điểm.</p>' : ''));
        nut.textContent = gl < gy.length ? 'Trợ giảng: xin gợi ý tiếp (' + gl + '/' + gy.length + ')' : 'Đã dùng hết gợi ý (' + gl + '/' + gy.length + ')';
        if (gl >= gy.length) nut.disabled = true;
        if (SC.am) { SC.am.sfx('goi_y'); SC.am.noi([{ id: 'tg', text: gy[gl - 1] }]); }
      });
      return function () { return gl; };
    }

    // ===== Phần 1: ĐIỀU HÀNH =====
    function veDH() {
      s.pha = 'dh'; luu(s);
      var k = K(), M = k.mo_hinh, th = k.thang[s.t], dung3d = !!(che3d && th.sb && SC.sb && SC.sb.ok !== false), c = { daChon: false };
      var truoc = s.dh.length ? s.dh[s.dh.length - 1] : null, giaVon = Math.round(M.C0 * th.cf * 10) / 10;
      var hq = s.hqThang.map(function (h) { return '<p class="gm-nd gm-them"><b>Hậu quả từ quyết định trước:</b> ' + E(h.nd) + ' ' + chips(h.d) + '</p>'; }).join('');
      var nutGia = M.GIA.map(function (p, i) { return '<button type="button" class="kd-btn" data-g="' + i + '" aria-pressed="false"><b>' + k.gia_ten[i] + '</b><span>' + p + ' nghìn/túi</span></button>'; }).join('');
      var nutNhap = M.NHAP.map(function (q, i) { return '<button type="button" class="kd-btn" data-n="' + i + '" aria-pressed="false"><b>' + k.nhap_ten[i] + '</b><span>' + String(q).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' túi</span></button>'; }).join('');
      var so_sach = s.dh.length ? '<details class="card kd-so"><summary><b>Sổ sách các tháng trước</b></summary><table class="kd-bang"><tr><th>Tháng</th><th>Giá</th><th>Nhập</th><th>Khách đặt</th><th>Bán</th><th>Lãi</th></tr>' +
        s.dh.map(function (x) { return '<tr><td>T' + (x.t + 1) + '</td><td>' + M.GIA[x.g] + '</td><td>' + M.NHAP[x.n] + '</td><td>' + x.cau + '</td><td>' + x.ban + '</td><td class="' + (x.ln >= 0 ? 'ln-d' : 'ln-a') + '">' + fm(x.ln, true) + '</td></tr>'; }).join('') + '</table></details>' : '';
      box.innerHTML = '<div class="card gm-play" style="--c:' + k.mau + '">' + thanhTren() + thangBuoc(s.t) + meters(s) + (SC.nhom ? SC.nhom.luot(s.nhom, s.t) : '') + khungHtml(dung3d) +
        '<div class="gm-scene' + (dung3d ? ' sb-on' : '') + '">' + tagCap() + '<span class="tag">Tháng ' + (s.t + 1) + '/' + k.thang.length + ' · ' + E(th.ten) + '</span> <span class="tag warn">Điều hành</span>' +
        '<h3>Bản tin thị trường</h3><p class="gm-nd">' + E(th.tin_tuc) + '</p>' + hq +
        '<div class="kd-tt">Giá vốn mỗi túi tháng này: <b>' + sd(giaVon) + ' nghìn</b> · Chi phí cố định: <b>' + fm(M.F) + '</b>' + (truoc ? ' · Tháng trước khách đặt <b>' + truoc.cau + '</b> túi, bán được <b>' + truoc.ban + '</b> túi' : '') + '</div>' +
        dan(th.dan) + khungGy(th.goi_y) + so_sach +
        '<div class="kd-nhom" role="group" aria-label="Giá bán"><b>Giá bán mỗi túi</b><div class="kd-hang">' + nutGia + '</div></div>' +
        '<div class="kd-nhom" role="group" aria-label="Lượng nhập"><b>Lượng nhập trong tháng</b><div class="kd-hang">' + nutNhap + '</div></div>' +
        '<p><button type="button" class="btn" id="kd-chot" disabled>Chốt tháng này</button></p><div class="gm-kq" aria-live="polite"></div></div></div>';
      noiDieuKhienAm(); if (SC.nhom) SC.nhom.chay(box);
      var dsg = [{ id: 'ke', text: th.tin_tuc }].concat(s.hqThang.map(function (h) { return { id: 'ke', text: h.nd }; }));
      if (th.dan) dsg.push({ id: SC.vo.hoSo('nv', th.sb ? th.sb.noi : th.dan.vai), text: th.dan.nd, bd: function (g) { if (dung3d && SC.sb) SC.sb.hienBong(g); } });
      var amBat = amKhoiDong(th, dsg, dung3d, th.bay.loai);
      if (dung3d) bat3d(box.querySelector('.sb-khung'), th.sb, th.dan ? { ai: th.dan.ai, nd: th.dan.nd } : null, amBat);
      var docGl = gopY(c, th.goi_y);
      var gi = -1, nh = -1, chot = box.querySelector('#kd-chot');
      function chonNhom(attr, val) { box.querySelectorAll('[data-' + attr + ']').forEach(function (b) { var on = +b.getAttribute('data-' + attr) === val; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); }); if (SC.am) SC.am.sfx('chon'); chot.disabled = gi < 0 || nh < 0; }
      box.querySelectorAll('[data-g]').forEach(function (b) { b.addEventListener('click', function () { if (c.daChon) return; gi = +b.dataset.g; chonNhom('g', gi); }); });
      box.querySelectorAll('[data-n]').forEach(function (b) { b.addEventListener('click', function () { if (c.daChon) return; nh = +b.dataset.n; chonNhom('n', nh); }); });
      so(box);
      chot.addEventListener('click', function () {
        if (c.daChon || gi < 0 || nh < 0) return; c.daChon = true;
        var kq = SC.kd.cham(k, s.t, gi, nh, s.tin, s.kPhu), r = kq.kq, g = docGl(), q = GM.hq({ tot: kq.tot }, g);
        s.diem += q; s.toiDa += 2; s.tien += r.ln;
        s.dh.push({ t: s.t, g: gi, n: nh, cau: r.cau, ban: r.ban, ln: r.ln, dt: r.dt, tot: kq.tot, gh: g, bg: kq.best.g, bn: kq.best.n, bln: kq.best.ln });
        box.querySelectorAll('.kd-btn,.gm-gy-btn,#kd-chot').forEach(function (b) { b.disabled = true; });
        capNhat(box, s);
        if (dung3d && SC.sb && SC.sb.phanUng) SC.sb.phanUng(kq.tot);
        if (SC.am) SC.am.sfx(kq.tot === 2 ? 'dung' : kq.tot === 1 ? 'nghi' : 'sai');
        var nh0 = GM.NHAN_TOT[kq.tot], sm = som(s);
        var ghiChu = [];
        if (r.thieu > 0) ghiChu.push('<b>Thiếu hàng:</b> khách đặt ' + r.cau + ' túi nhưng em chỉ nhập ' + r.nhap + ' túi, bỏ lỡ ' + r.thieu + ' túi (khoảng ' + fm(r.thieu * r.gia) + ' doanh thu).');
        if (r.du > 0) ghiChu.push('<b>Hàng ế:</b> thừa ' + r.du + ' túi bị bỏ đi, lãng phí khoảng ' + fm(Math.round(r.du * r.giaVon)) + ' tiền nhập.');
        ghiChu.push('Ở mức giá ' + r.gia + ' nghìn, mỗi túi lãi <b>' + sd(r.laiTui) + ' nghìn</b> sau khi trừ giá vốn (chưa tính chi phí cố định).');
        if (kq.tot < 2) ghiChu.push('<b>Cách làm tốt hơn tháng này:</b> giá ' + M.GIA[kq.best.g] + ' nghìn, nhập ' + M.NHAP[kq.best.n] + ' túi, lãi ' + fm(kq.best.ln, true) + ' (em kém ' + fm(kq.gap) + ').');
        var loi = null, rui = null;
        if (kq.tot < 2) {
          var vd = [], rr = [];
          if (r.du > 0.12 * r.nhap) { vd.push('Nhập nhiều hơn mức khách thật sự đặt'); rr.push('hàng tươi bị ế, tiền nhập mất trắng'); }
          if (r.thieu > 0.12 * r.cau) { vd.push('Nhập ít hơn mức khách thật sự đặt'); rr.push('thiếu hàng, bỏ lỡ doanh thu và làm khách quen thất vọng'); }
          if (gi > kq.best.g) { vd.push('Đặt giá cao hơn mức khách chấp nhận'); rr.push('khách giảm mua hoặc chuyển sang nơi khác'); }
          if (gi < kq.best.g) { vd.push('Đặt giá thấp hơn cần thiết'); rr.push('lãi mỗi túi mỏng, một biến động nhỏ cũng dễ lỗ'); }
          if (!vd.length) { vd.push('Chưa so tổng lãi của các cách chọn'); rr.push('bỏ lỡ khoản lãi lớn hơn'); }
          loi = vd.join('; ') + '.'; rui = rr.join('; ') + '.';
        }
        var kqEl = box.querySelector('.gm-kq');
        kqEl.innerHTML = '<div class="fb gm-fb ' + nh0[1] + '"><p><span class="tag ' + (nh0[1] === 'ok' ? '' : 'warn') + '">' + (kq.tot === 2 ? 'Điều hành tốt' : kq.tot === 1 ? 'Điều hành chấp nhận được' : 'Điều hành còn rủi ro') + '</span> ' + chips({ tien: r.ln }) + '</p>' +
          '<table class="kd-bang"><tr><th>Giá</th><th>Nhập</th><th>Khách đặt</th><th>Bán được</th><th>Doanh thu</th><th>Tiền nhập</th><th>Chi phí cố định</th><th>Lãi</th></tr><tr><td>' + r.gia + '</td><td>' + r.nhap + '</td><td>' + r.cau + '</td><td>' + r.ban + '</td><td>' + fm(r.dt) + '</td><td>' + fm(r.cp) + '</td><td>' + fm(r.cf) + '</td><td class="' + (r.ln >= 0 ? 'ln-d' : 'ln-a') + '"><b>' + fm(r.ln, true) + '</b></td></tr></table>' +
          '<ul class="kd-ghi">' + ghiChu.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' + (q < kq.tot ? '<p class="mute">Em đã dùng gợi ý cấp cuối nên phần này chỉ được tính ' + q + '/2 điểm.</p>' : '') + '</div>' + phanTichHtml(th.bay, loi, rui) +
          '<p><button type="button" class="btn gm-next">' + (sm ? 'Xem kết cục' : th.su_co ? 'Tiếp: sự cố giữa tháng' : th.hop ? 'Tiếp: hộp thư giữa tháng' : 'Tiếp: tình huống cuối tháng') + ' <span class="gm-tri" aria-hidden="true"></span></button></p>';
        if (SC.am) SC.am.noi([{ id: 'tg', text: 'Lãi tháng này là ' + fm(r.ln) + '.' + (kq.tot < 2 ? ' ' + (loi || '') : ' Em điều hành tốt.') }]);
        var tiep = kqEl.querySelector('.gm-next');
        tiep.addEventListener('click', function () { if (sm) ketThuc(sm); else if (th.su_co) { s.pha = 'sc'; veSC(); } else if (th.hop) { s.pha = 'hop'; veHop(); } else { s.pha = 'th'; veTH(); } });
        tiep.focus(); kqEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    // ===== Phần 2: TÌNH HUỐNG — cùng một khung cho ba loại: «Tháng 0 · chia vốn» (z), «sự cố giữa tháng» (sc), «tình huống cuối tháng» (th) =====
    function tagCap() { var c = capCua(s.t); return '<span class="tag">Cấp độ ' + c.so + '/' + CD().length + ' · ' + E(c.ten) + '</span> '; }
    function tagThang(nhan) { var k = K(); return tagCap() + '<span class="tag">Tháng ' + (s.t + 1) + '/' + k.thang.length + ' · ' + E(k.thang[s.t].ten) + '</span> <span class="tag warn">' + nhan + '</span>'; }
    function veTH() {
      veKB({ pha: 'th', tt: K().thang[s.t].tinh_huong, tag: tagThang('Tình huống cuối tháng'),
        ghi: function (i, g) { s.th.push({ t: s.t, i: i, gh: g }); },
        nut: function (sm) { return sm || s.t + 1 >= K().thang.length ? 'Xem kết cục' : s.t === capCua(s.t).thang[1] ? 'Hoàn thành cấp độ ' + capCua(s.t).so : 'Sang tháng ' + (s.t + 2); },
        tiep: function (sm) {
          if (sm) ketThuc(sm);
          else if (s.t + 1 >= K().thang.length) ketThuc(null);
          else if (s.t === capCua(s.t).thang[1]) capXong();
          else { s.t++; batDauThang(s); var sm2 = som(s); if (sm2) ketThuc(sm2); else veDH(); }
        } });
    }
    // ===== Hộp thư giữa tháng (L3 · cơ chế M1): nhiều việc đến cùng lúc, ÍT ĐIỂM SỨC; mỗi việc chọn một cách xử lí (tốn điểm sức) hoặc ĐỂ LẠI.
    // Xử lí kĩ tốn nhiều sức; xử lí qua loa hoặc để lại thì để lại «dấu vết» (cờ) quay lại ở tháng sau (data/game/kdao.js: hop, hau_qua). Kết quả của mỗi việc ghi vào s.hp. =====
    function veHop() {
      s.pha = 'hop'; luu(s);
      var k = K(), hp = k.thang[s.t].hop, c = { daChon: false }, ch = hp.viec.map(function () { return null; });   // ch[i]: null chưa chọn, -1 để lại, ≥ 0 số thứ tự cách xử lí
      function daDung() { var d = 0; ch.forEach(function (j, i) { if (j != null && j >= 0) d += hp.viec[i].cach[j].ts; }); return d; }
      box.innerHTML = '<div class="card gm-play" style="--c:' + k.mau + '">' + thanhTren() + thangBuoc(s.t) + meters(s) + (SC.nhom ? SC.nhom.luot(s.nhom, s.t) : '') +
        '<div class="gm-scene">' + tagThang('Hộp thư giữa tháng') + '<h3>' + E(hp.tieu_de) + '</h3><p class="gm-nd">' + E(hp.nd) + '</p>' + khungGy(hp.goi_y) +
        '<p class="hop-sluc" role="status" aria-live="polite"></p>' +
        hp.viec.map(function (v, i) {
          return '<div class="hop-viec"><p class="hop-h"><span class="tag">' + E(v.ai) + '</span> <b>' + E(v.tieu_de) + '</b></p><p class="gm-nd">' + E(v.nd) + '</p>' + dan(v.loi_dan) +
            '<div class="hop-cach" role="group" aria-label="Cách xử lí: ' + E(v.tieu_de) + '">' + v.cach.map(function (x, j) { return '<button type="button" class="opt hop-b" data-v="' + i + '" data-j="' + j + '" aria-pressed="false">' + E(x.nhan) + '<span class="hop-ts">' + x.ts + ' điểm sức</span></button>'; }).join('') +
            '<button type="button" class="opt hop-b" data-v="' + i + '" data-j="-1" aria-pressed="false">Để lại việc này<span class="hop-ts">0 điểm sức</span></button></div></div>';
        }).join('') +
        '<p><button type="button" class="btn" id="hop-chot" disabled>Xử lí xong, xem kết quả</button></p><div class="gm-kq" aria-live="polite"></div></div></div>';
      noiDieuKhienAm(); if (SC.nhom) SC.nhom.chay(box);
      amKhoiDong(null, [{ id: 'ke', text: hp.nd }].concat(hp.viec.map(function (v) { return { id: 'ke', text: v.nd }; })), false, hp.bay.loai);
      var docGl = gopY(c, hp.goi_y);
      function lamMoi() {
        var con = hp.diem - daDung();
        box.querySelector('.hop-sluc').innerHTML = 'Điểm sức còn lại: <b>' + con + '/' + hp.diem + '</b>' + (ch.some(function (j) { return j == null; }) ? ' · chọn cách xử lí (hoặc để lại) cho cả ' + hp.viec.length + ' việc' : '');
        box.querySelectorAll('.hop-b').forEach(function (b) {
          var i = +b.dataset.v, j = +b.dataset.j, hien = ch[i] != null && ch[i] >= 0 ? hp.viec[i].cach[ch[i]].ts : 0, gia = j >= 0 ? hp.viec[i].cach[j].ts : 0;
          b.classList.toggle('on', ch[i] === j); b.setAttribute('aria-pressed', String(ch[i] === j));
          b.disabled = c.daChon || (j !== ch[i] && gia > con + hien);
        });
        var chot = box.querySelector('#hop-chot'); chot.disabled = c.daChon || ch.some(function (j) { return j == null; });
        chot.textContent = 'Xử lí xong, xem kết quả · còn ' + con + '/' + hp.diem + ' điểm sức';   // trang dài trên điện thoại: nhắc điểm sức ngay ở nút
      }
      box.querySelectorAll('.hop-b').forEach(function (b) { b.addEventListener('click', function () { if (c.daChon) return; ch[+b.dataset.v] = +b.dataset.j; if (SC.am) SC.am.sfx('chon'); lamMoi(); }); });
      lamMoi(); so(box);
      box.querySelector('#hop-chot').addEventListener('click', function () {
        if (c.daChon || ch.some(function (j) { return j == null; })) return; c.daChon = true;
        var g = docGl(), x = { t: s.t, ch: ch.slice(), gh: g }, ms = hopMuc(x), tong = 0, dungTs = daDung();
        s.hp.push(x);
        ms.forEach(function (m) { var d = m.o.d || {}; tong += m.q; s.diem += m.q; s.toiDa += 2; s.tien += d.tien || 0; s.tin = kep(s.tin + (d.tin || 0)); s.ct = kep(s.ct + (d.ct || 0)); GM.mang(m.o.cd).forEach(function (f) { s.co[f] = true; }); });
        box.querySelectorAll('.hop-b,.gm-gy-btn,#hop-chot').forEach(function (b) { b.disabled = true; });
        capNhat(box, s);
        if (SC.am) SC.am.sfx(tong >= 5 ? 'dung' : tong >= 3 ? 'nghi' : 'sai');
        var sm = som(s), xau = ms.filter(function (m) { return m.o.tot < 2; })[0], leo = ms.filter(function (m) { return GM.mang(m.o.cd).some(function (f) { return k.hau_qua.some(function (h) { return h.co === f; }); }); }).length;
        var kqEl = box.querySelector('.gm-kq');
        kqEl.innerHTML = '<p class="mute">Em đã dùng <b>' + dungTs + '/' + hp.diem + '</b> điểm sức cho ' + ms.filter(function (m) { return m.ts > 0; }).length + ' việc; ' + ms.filter(function (m) { return !m.ts; }).length + ' việc để lại hoặc không tốn sức.</p>' +
          ms.map(function (m) {
            var nh0 = GM.NHAN_TOT[m.o.tot];
            return '<div class="fb gm-fb ' + nh0[1] + '"><p><b>' + E(m.v.tieu_de) + '</b> · ' + E(m.nhan) + (m.ts ? ' <span class="mute">(' + m.ts + ' điểm sức)</span>' : '') + '</p><p><span class="tag ' + (nh0[1] === 'ok' ? '' : 'warn') + '">' + nh0[0] + '</span> ' + chips(m.o.d) + '</p><p>' + E(m.o.bl) + '</p>' +
              (m.q < m.o.tot ? '<p class="mute">Em đã dùng gợi ý cấp cuối nên việc này chỉ được tính ' + m.q + '/2 điểm.</p>' : '') + (m.o.loi_sai ? '<p class="mute"><b>Lỗi sai:</b> ' + E(m.o.loi_sai) + ' <b>Rủi ro:</b> ' + E(m.o.rui_ro) + '</p>' : '') + '</div>';
          }).join('') + (leo ? '<p class="mute"><b>Lưu ý:</b> có ' + leo + ' việc em xử lí sẽ để lại «dấu vết» quay lại ở các tháng sau.</p>' : '') + phanTichHtml(hp.bay, xau ? xau.o.loi_sai : '', xau ? xau.o.rui_ro : '') +
          '<p><button type="button" class="btn gm-next">' + (sm ? 'Xem kết cục' : 'Tiếp: tình huống cuối tháng') + ' <span class="gm-tri" aria-hidden="true"></span></button></p>';
        var tiep = kqEl.querySelector('.gm-next');
        tiep.addEventListener('click', function () { if (sm) ketThuc(sm); else { s.pha = 'th'; veTH(); } });
        tiep.focus(); kqEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
    function veSC() {
      veKB({ pha: 'sc', tt: K().thang[s.t].su_co, tag: tagThang('Sự cố giữa tháng'),
        ghi: function (i, g) { s.sc.push({ t: s.t, i: i, gh: g }); },
        nut: function (sm) { return sm ? 'Xem kết cục' : 'Tiếp: tình huống cuối tháng'; },
        tiep: function (sm) { if (sm) ketThuc(sm); else { s.pha = 'th'; veTH(); } } });
    }
    function veZ() {
      veKB({ pha: 'z', tt: K().thang0, tag: tagCap() + '<span class="tag">Tháng 0 · Chuẩn bị khai trương</span> <span class="tag warn">Chia vốn khởi nghiệp</span>',
        ghi: function (i, g) { s.z = { i: i, gh: g }; },
        nut: function (sm) { return sm ? 'Xem kết cục' : 'Vào tháng 1'; },
        tiep: function (sm) { if (sm) ketThuc(sm); else { s.pha = 'dh'; veDH(); } } });
    }
    function veKB(cf) {
      s.pha = cf.pha; luu(s);
      var k = K(), tt = cf.tt, dung3d = !!(che3d && tt.sb && SC.sb && SC.sb.ok !== false), c = { daChon: false };
      var ds = SC.shuffle(tt.chon.map(function (o, i) { return { o: o, i: i }; }));
      box.innerHTML = '<div class="card gm-play" style="--c:' + k.mau + '">' + thanhTren() + thangBuoc(cf.pha === 'z' ? -1 : s.t) + meters(s) + (SC.nhom ? SC.nhom.luot(s.nhom, s.t) : '') + khungHtml(dung3d) +
        '<div class="gm-scene' + (dung3d ? ' sb-on' : '') + '">' + cf.tag +
        '<h3>' + E(tt.tieu_de) + '</h3><p class="gm-nd">' + E(tt.nd) + '</p>' + dan(tt.loi_dan) + khungGy(tt.goi_y) +
        '<div class="gm-opts" role="group" aria-label="Các cách xử lí">' + ds.map(function (x, j) { return '<button type="button" class="opt" data-j="' + j + '">' + E(x.o.nhan) + '</button>'; }).join('') + '</div><div class="gm-kq" aria-live="polite"></div></div></div>';
      noiDieuKhienAm(); if (SC.nhom) SC.nhom.chay(box);
      var dsg = [{ id: 'ke', text: tt.nd }];
      if (tt.loi_dan) dsg.push({ id: SC.vo.hoSo('nv', tt.sb.noi), text: tt.loi_dan.nd, bd: function (g) { if (dung3d && SC.sb) SC.sb.hienBong(g); } });
      var amBat = amKhoiDong(null, dsg, dung3d, tt.bay.loai);
      if (dung3d) bat3d(box.querySelector('.sb-khung'), tt.sb, tt.loi_dan, amBat);
      var docGl = gopY(c, tt.goi_y);
      so(box);
      box.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () {
          if (c.daChon) return; c.daChon = true;
          var o = ds[+b.dataset.j].o, tu = GM.toiUu(tt), g = docGl(), q = GM.hq(o, g), d = o.d || {};
          s.diem += q; s.toiDa += 2; s.tien += d.tien || 0; s.tin = kep(s.tin + (d.tin || 0)); s.ct = kep(s.ct + (d.ct || 0));
          GM.mang(o.cd).forEach(function (f) { s.co[f] = true; });
          cf.ghi(ds[+b.dataset.j].i, g);
          box.querySelectorAll('.gm-gy-btn').forEach(function (x) { x.disabled = true; });
          capNhat(box, s);
          if (dung3d && SC.sb && SC.sb.phanUng) SC.sb.phanUng(o.tot);
          box.querySelectorAll('.opt').forEach(function (x, kk) { x.disabled = true; if (kk === +b.dataset.j) x.classList.add(o.tot === 2 ? 'ok' : o.tot === 1 ? 'sel' : 'bad'); else if (ds[kk].o === tu && o.tot < 2) x.classList.add('ok'); });
          var nh0 = GM.NHAN_TOT[o.tot], sm = som(s);
          var kqEl = box.querySelector('.gm-kq');
          kqEl.innerHTML = '<div class="fb gm-fb ' + nh0[1] + '"><p><span class="tag ' + (nh0[1] === 'ok' ? '' : 'warn') + '">' + nh0[0] + '</span> ' + chips(d) + '</p><p>' + E(o.bl) + '</p>' +
            (q < o.tot ? '<p class="mute">Em đã dùng gợi ý cấp cuối nên lựa chọn này chỉ được tính ' + q + '/2 điểm.</p>' : '') + (o.tot < 2 ? '<p class="mute"><b>Cách tốt hơn:</b> ' + E(tu.nhan) + '</p>' : '') + '</div>' + phanTichHtml(tt.bay, o.loi_sai, o.rui_ro) +
            '<p><button type="button" class="btn gm-next">' + cf.nut(sm) + ' <span class="gm-tri" aria-hidden="true"></span></button></p>';
          if (SC.am) { SC.am.sfx(o.tot === 2 ? 'dung' : o.tot === 1 ? 'nghi' : 'sai'); var pt = SC.vo.phanTich(o); SC.am.noi([{ id: 'tg', text: o.bl }].concat(pt ? [{ id: 'tg', text: pt }] : [])); }
          var tiep = kqEl.querySelector('.gm-next');
          tiep.addEventListener('click', function () { cf.tiep(sm); });
          tiep.focus(); kqEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      });
    }

    // Hộp thư: các việc của một lần xử lí x = {t, ch[], gh} → [{v, o, q, nhan, ts}] (o = cách đã chọn hoặc «để lại» v.bo; q = điểm hiệu lực, đã tính gợi ý)
    function hopMuc(x) {
      var hp = K().thang[x.t].hop;
      return hp.viec.map(function (v, i) { var o = x.ch[i] >= 0 ? v.cach[x.ch[i]] : v.bo; return { v: v, o: o, q: GM.hq(o, x.gh), nhan: x.ch[i] >= 0 ? o.nhan : 'Để lại việc này', ts: x.ch[i] >= 0 ? o.ts : 0 }; });
    }
    // ===== Cấp độ: thống kê chất lượng quyết định trong cấp độ và màn «Hoàn thành cấp độ» =====
    function thongKeCap(c) {
      var k = K(), a = c.thang[0], b = c.thang[1], d = 0, toi = 0, nTot = 0, ln = 0, muc = [];
      function them(nhan, tt, i, gh) { var o = tt.chon[i], q = GM.hq(o, gh); d += q; toi += 2; if (q === 2) nTot++; muc.push({ l: nhan + ' «' + tt.tieu_de + '»', o: o.nhan, tot: o.tot, bl: o.bl }); }
      if (c.z && s.z) them('Tháng 0 · Chia vốn', k.thang0, s.z.i, s.z.gh);
      for (var t = a; t <= b; t++) {
        s.dh.filter(function (x) { return x.t === t; }).forEach(function (x) { var q = GM.hq({ tot: x.tot }, x.gh); d += q; toi += 2; if (q === 2) nTot++; ln += x.ln; muc.push({ l: 'Tháng ' + (x.t + 1) + ' · Điều hành', o: 'giá ' + k.gia_ten[x.g] + ', nhập ' + k.nhap_ten[x.n] + ' → lãi ' + fm(x.ln, true), tot: x.tot, bl: '' }); });
        s.sc.filter(function (x) { return x.t === t; }).forEach(function (x) { them('Tháng ' + (t + 1) + ' · Sự cố', k.thang[t].su_co, x.i, x.gh); });
        s.hp.filter(function (x) { return x.t === t; }).forEach(function (x) { hopMuc(x).forEach(function (m) { d += m.q; toi += 2; if (m.q === 2) nTot++; muc.push({ l: 'Tháng ' + (t + 1) + ' · Hộp thư · ' + m.v.tieu_de, o: m.nhan + (m.ts ? ' (' + m.ts + ' điểm sức)' : ''), tot: m.o.tot, bl: m.o.bl }); }); });
        s.th.filter(function (x) { return x.t === t; }).forEach(function (x) { them('Tháng ' + (t + 1) + ' · Tình huống', k.thang[t].tinh_huong, x.i, x.gh); });
      }
      return { pct: toi ? Math.round(100 * d / toi) : 0, nTot: nTot, nPhan: muc.length, ln: ln, muc: muc };
    }
    function capXong() {
      var k = K(), c = capCua(s.t), sau = CD()[c.so], st = thongKeCap(c);
      var g = lay(); g.cap = g.cap || {}; g.cap[c.so] = Math.max(g.cap[c.so] || 0, st.pct); ghi(g);
      if (!sau) { ketThuc(null); return; }
      s.t++; batDauThang(s);                       // sang tháng đầu của cấp độ sau: áp hậu quả đầu tháng rồi lưu để «Tiếp tục» đúng chỗ
      var sm = som(s);
      if (sm) { ketThuc(sm); return; }
      s.pha = 'dh'; luu(s);
      var bai = c.z && k.thang0 ? (k.thang0.bai || []).slice() : []; for (var t = c.thang[0]; t <= c.thang[1]; t++) bai = bai.concat(k.thang[t].bai || [], k.thang[t].su_co ? k.thang[t].su_co.bai || [] : [], k.thang[t].hop ? k.thang[t].hop.bai || [] : []);
      if (SC.am) { SC.am.dung(); SC.am.nhac(st.pct >= 65 ? 'vui' : 'tam'); SC.am.sfx('chuong'); }
      box.innerHTML = '<div class="card gm-end" style="--c:' + k.mau + '"><span class="tag warn">Hoàn thành cấp độ ' + c.so + '/' + CD().length + '</span><h3>' + E(c.ten) + '</h3>' +
        '<p class="mute"><b>Em đã học được:</b> ' + E(c.muc_tieu) + '</p>' + meters(s) +
        '<p><b>Chất lượng các quyết định trong cấp độ: ' + st.pct + '% ' + GM.sao(st.pct) + '</b> (' + st.nTot + '/' + st.nPhan + ' phần làm tốt). Lãi từ điều hành trong cấp độ: <b>' + fm(st.ln, true) + '</b>; tiền mặt hiện có: <b>' + fm(s.tien) + '</b>.</p>' +
        '<p class="row"><button type="button" class="btn" id="kd-sang">Sang cấp độ ' + sau.so + ' · ' + E(sau.ten) + ' <span class="gm-tri" aria-hidden="true"></span></button><button type="button" class="btn alt" id="kd-dung">Lưu và dừng ở đây</button><button type="button" class="btn alt" id="kd-capl">Chơi lại cấp độ này</button></p></div>' +
        '<div class="card"><h3>Nhật kí cấp độ ' + c.so + '</h3><ol class="gm-log">' + st.muc.map(function (m) {
          return '<li><b>' + E(m.l) + '</b><br>' + E(m.o) + ' <span class="tag ' + (m.tot === 2 ? '' : 'warn') + '">' + GM.NHAN_TOT[m.tot][0] + '</span>' + (m.bl ? '<br><span class="mute">' + E(m.bl) + '</span>' : '') + '</li>';
        }).join('') + '</ol></div>' +
        '<div class="card"><h3>Kiến thức trong cấp độ</h3><p class="mute">Bấm để mở lại bài tương ứng trong Kho kiến thức.</p><p class="row">' + GM.nutBai(bai) + '</p></div>';
      box.querySelector('#kd-sang').addEventListener('click', function () { if (SC.am) SC.am.mo(); veDH(); });
      box.querySelector('#kd-dung').addEventListener('click', function () { hub(box); window.scrollTo(0, 0); });
      box.querySelector('#kd-capl').addEventListener('click', function () { var s2 = moi(c.so); batDauThang(s2); chay(box, s2); });
      GM.noiBai(box); so(box);
    }

    // Bảng 5 tiêu chí (thang tham khảo 25/20/20/25/10): tính từ dữ liệu của ván; chỉ là phản hồi, không ghi vào điểm hồ sơ
    function bangTieuChi(kinhTe) {
      var k = K(), M = k.mo_hinh, dh = [], th = [], xh = [];
      s.dh.forEach(function (x) { dh.push(GM.hq({ tot: x.tot }, x.gh) / 2); });
      function them(tt, i, gh) { var q = GM.hq(tt.chon[i], gh) / 2; th.push(q); if (tt.xh) xh.push(q); }
      if (s.z) them(k.thang0, s.z.i, s.z.gh);
      s.sc.forEach(function (x) { them(k.thang[x.t].su_co, x.i, x.gh); });
      s.hp.forEach(function (x) { hopMuc(x).forEach(function (m) { var q = m.q / 2; th.push(q); if (k.thang[x.t].hop.xh) xh.push(q); }); });
      s.th.forEach(function (x) { them(k.thang[x.t].tinh_huong, x.i, x.gh); });
      function tb(a) { return a.length ? a.reduce(function (p, q) { return p + q; }, 0) / a.length : null; }
      var hang = [
        ['Hiệu quả kinh doanh', 25, kinhTe / 100, 'lãi cả năm so với mục tiêu ' + fm(M.MUC_TIEU)],
        ['Quản lý tài chính', 20, tb(dh), 'chất lượng chọn giá bán và lượng nhập (' + dh.length + ' tháng)'],
        ['Giải quyết tình huống', 20, tb(th), 'chất lượng xử lí ' + th.length + ' tình huống và sự cố'],
        ['Tuân thủ pháp luật', 25, s.ct / 100, 'chỉ số «Tuân thủ và trách nhiệm» cuối năm'],
        ['Trách nhiệm xã hội', 10, tb(xh), 'các tình huống về người lao động, khách hàng, sản phẩm (' + xh.length + ')']
      ], tong = 0;
      var tr = hang.map(function (h) {
        var diem = h[2] == null ? null : Math.round(h[1] * h[2]); if (diem != null) tong += diem;
        return '<tr><td>' + h[0] + '</td><td><b>' + (diem == null ? '–' : diem) + '</b></td><td>' + h[1] + '</td><td class="mute">' + E(h[3]) + '</td></tr>';
      }).join('');
      return '<div class="card"><h3>Bảng đánh giá 5 tiêu chí</h3><table class="kd-bang"><tr><th>Tiêu chí</th><th>Điểm</th><th>Tối đa</th><th>Tính từ</th></tr>' + tr +
        '<tr><td><b>Tổng tham khảo</b></td><td><b>' + tong + '</b></td><td>100</td><td class="mute"></td></tr></table>' +
        '<p class="mute">Chỉ là phản hồi để em tự soi lại, thang điểm tham khảo (25/20/20/25/10); không ghi vào điểm hồ sơ và không xếp hạng. Lãi cao chưa chắc thắng: tuân thủ pháp luật và trách nhiệm xã hội chiếm 35 điểm. Dấu «–» là chưa có dữ liệu (ván kết thúc sớm).</p></div>';
    }

    // ===== Kết cục và báo cáo năm =====
    function ketThuc(sm) {
      var k = K(), M = k.mo_hinh;
      var nTot = 0, tong = s.dh.length + s.th.length + s.sc.length + s.hp.reduce(function (a, x) { return a + x.ch.length; }, 0) + (s.z ? 1 : 0);
      s.dh.forEach(function (x) { if (GM.hq({ tot: x.tot }, x.gh) === 2) nTot++; });
      s.th.forEach(function (x) { if (GM.hq(k.thang[x.t].tinh_huong.chon[x.i], x.gh) === 2) nTot++; });
      s.sc.forEach(function (x) { if (GM.hq(k.thang[x.t].su_co.chon[x.i], x.gh) === 2) nTot++; });
      s.hp.forEach(function (x) { hopMuc(x).forEach(function (m) { if (m.q === 2) nTot++; }); });
      if (s.z && GM.hq(k.thang0.chon[s.z.i], s.z.gh) === 2) nTot++;
      var chatLuong = s.toiDa ? Math.round(100 * s.diem / s.toiDa) : 0, kinhTe = Math.max(0, Math.min(100, Math.round(100 * (s.tien - M.TIEN_DAU) / M.MUC_TIEU)));
      var pct = Math.round(0.7 * chatLuong + 0.3 * kinhTe), kc = null, id = '';
      if (sm) { kc = k.ket_som[sm]; id = 'som:' + sm; }
      else { for (var i = 0; i < k.ket.length; i++) { if (pct >= k.ket[i].tu) { kc = k.ket[i]; id = 'ket:' + i; break; } } }
      var g = lay(); g.lan = (g.lan || 0) + 1; g.ket[id] = 1; g.tot = Math.max(g.tot || 0, pct); g.tienCao = Math.max(g.tienCao || 0, s.tien); g.tien = null;
      if (!sm) { var cc = capCua(s.t), cs = thongKeCap(cc); g.cap = g.cap || {}; g.cap[cc.so] = Math.max(g.cap[cc.so] || 0, cs.pct); }   // cấp độ cuối được tính khi hết năm
      ghi(g);
      var dhMoi = (SC.hs && SC.hs.xet) ? SC.hs.xet(k.id) : null;   // danh hiệu (lophoc_hoso.js): xét sau khi đã lưu kết quả năm
      // chơi nhóm: MỖI THÁNG MỘT BẠN quyết định cả hai phần (điều hành và tình huống cuối tháng); l = lượt = số thứ tự tháng.
      // (Xoay theo từng quyết định thì nhóm 2 hoặc 4 bạn sẽ luôn có cùng một bạn làm phần điều hành.)
      var dsNhom = []; if (s.nhom) {
        if (s.z) dsNhom.push({ ten: 'Tháng 0 · ' + k.thang0.tieu_de, q: GM.hq(k.thang0.chon[s.z.i], s.z.gh), l: 0 });
        k.thang.forEach(function (th0, t0) {
          var x0 = s.dh.filter(function (y) { return y.t === t0; })[0], c0 = s.sc.filter(function (y) { return y.t === t0; })[0], y0 = s.th.filter(function (y) { return y.t === t0; })[0];
          if (x0) dsNhom.push({ ten: 'Tháng ' + (t0 + 1) + ' · điều hành', q: GM.hq({ tot: x0.tot }, x0.gh), l: t0 });
          if (c0) dsNhom.push({ ten: 'Tháng ' + (t0 + 1) + ' · ' + th0.su_co.tieu_de, q: GM.hq(th0.su_co.chon[c0.i], c0.gh), l: t0 });
          s.hp.filter(function (y) { return y.t === t0; }).forEach(function (hx) { hopMuc(hx).forEach(function (m) { dsNhom.push({ ten: 'Tháng ' + (t0 + 1) + ' · Hộp thư · ' + m.v.tieu_de, q: m.q, l: t0 }); }); });
          if (y0) dsNhom.push({ ten: 'Tháng ' + (t0 + 1) + ' · ' + th0.tinh_huong.tieu_de, q: GM.hq(th0.tinh_huong.chon[y0.i], y0.gh), l: t0 });
        });
      }
      var mo = Object.keys(g.ket).length, tongLn = s.dh.reduce(function (a, x) { return a + x.ln; }, 0), tongDt = s.dh.reduce(function (a, x) { return a + x.dt; }, 0);
      var max = Math.max.apply(null, s.dh.map(function (x) { return Math.abs(x.ln); }).concat([1]));
      var bd = s.dh.length ? '<div class="kd-bd" role="img" aria-label="Lãi lỗ từng tháng">' + s.dh.map(function (x) { return '<div class="kd-cot"><span class="kd-gt">' + fm(x.ln, true).replace(' triệu', 'tr').replace(' nghìn', 'k') + '</span><i class="' + (x.ln >= 0 ? 'd' : 'a') + '" style="height:' + Math.max(4, Math.round(Math.abs(x.ln) / max * 90)) + 'px"></i><span>T' + (x.t + 1) + '</span></div>'; }).join('') + '</div>' : '';
      var hau = (k.hau || []).filter(function (b) { return s.co[b.co]; });
      // thống kê bẫy đã mắc
      var dem = {}, ga = 0;
      s.dh.forEach(function (x) { if (x.gh) ga++; if (x.tot < 2) { var l = k.thang[x.t].bay.loai; dem[l] = (dem[l] || 0) + 1; } });
      s.th.forEach(function (x) { if (x.gh) ga++; var o = k.thang[x.t].tinh_huong.chon[x.i]; if (o.tot < 2) { var l = k.thang[x.t].tinh_huong.bay.loai; dem[l] = (dem[l] || 0) + 1; } });
      s.sc.forEach(function (x) { if (x.gh) ga++; var o = k.thang[x.t].su_co.chon[x.i]; if (o.tot < 2) { var l = k.thang[x.t].su_co.bay.loai; dem[l] = (dem[l] || 0) + 1; } });
      s.hp.forEach(function (x) { if (x.gh) ga++; hopMuc(x).forEach(function (m) { if (m.o.tot < 2) { var l = k.thang[x.t].hop.bay.loai; dem[l] = (dem[l] || 0) + 1; } }); });
      if (s.z) { if (s.z.gh) ga++; if (k.thang0.chon[s.z.i].tot < 2) { var l0 = k.thang0.bay.loai; dem[l0] = (dem[l0] || 0) + 1; } }
      var ks = Object.keys(dem).sort(function (a, b) { return dem[b] - dem[a]; });
      function dongHop(x) {
        return hopMuc(x).map(function (m) { return '<br>Hộp thư «' + E(m.v.tieu_de) + '»: ' + E(m.nhan) + (m.ts ? ' (' + m.ts + ' điểm sức)' : '') + ' <span class="tag ' + (m.o.tot === 2 ? '' : 'warn') + '">' + GM.NHAN_TOT[m.o.tot][0] + '</span><br><span class="mute">' + E(m.o.bl) + '</span>' + (m.o.loi_sai ? '<br><b>Lỗi sai:</b> ' + E(m.o.loi_sai) + ' <b>Rủi ro:</b> ' + E(m.o.rui_ro) : ''); }).join('');
      }
      function dongKB(nhan, tt, i) {
        var o = tt.chon[i], tu = GM.toiUu(tt);
        return '<br>' + nhan + ' «' + E(tt.tieu_de) + '»: ' + E(o.nhan) + ' <span class="tag ' + (o.tot === 2 ? '' : 'warn') + '">' + GM.NHAN_TOT[o.tot][0] + '</span><br><span class="mute">' + E(o.bl) + '</span>' + (o.loi_sai ? '<br><b>Lỗi sai:</b> ' + E(o.loi_sai) + ' <b>Rủi ro:</b> ' + E(o.rui_ro) : '') + (o.tot < 2 ? '<br><b>Cách tốt hơn:</b> ' + E(tu.nhan) : '');
      }
      var nk0 = s.z ? '<li><b>Tháng 0 · Chuẩn bị khai trương</b>' + dongKB('Chia vốn', k.thang0, s.z.i) + '</li>' : '';
      var nk = k.thang.map(function (th, t) {
        var x = s.dh.filter(function (y) { return y.t === t; })[0], y2 = s.th.filter(function (y) { return y.t === t; })[0], c2 = s.sc.filter(function (y) { return y.t === t; })[0], h2 = s.hp.filter(function (y) { return y.t === t; })[0]; if (!x) return '';
        var tt = th.tinh_huong, o = y2 ? tt.chon[y2.i] : null, tu = GM.toiUu(tt);
        return '<li><b>Tháng ' + (t + 1) + ' · ' + E(th.ten) + '</b><br>Điều hành: giá ' + k.gia_ten[x.g] + ' (' + M.GIA[x.g] + '), nhập ' + k.nhap_ten[x.n] + ' (' + M.NHAP[x.n] + ') → lãi ' + fm(x.ln, true) + ' <span class="tag ' + (x.tot === 2 ? '' : 'warn') + '">' + GM.NHAN_TOT[x.tot][0] + '</span>' + (x.tot < 2 ? '<br><span class="mute">Cách tốt hơn: giá ' + M.GIA[x.bg] + ', nhập ' + M.NHAP[x.bn] + ' (lãi ' + fm(x.bln, true) + ').</span>' : '') +
          (c2 ? dongKB('Sự cố', th.su_co, c2.i) : '') + (h2 ? dongHop(h2) : '') + (o ? '<br>Tình huống «' + E(tt.tieu_de) + '»: ' + E(o.nhan) + ' <span class="tag ' + (o.tot === 2 ? '' : 'warn') + '">' + GM.NHAN_TOT[o.tot][0] + '</span><br><span class="mute">' + E(o.bl) + '</span>' + (o.loi_sai ? '<br><b>Lỗi sai:</b> ' + E(o.loi_sai) + ' <b>Rủi ro:</b> ' + E(o.rui_ro) : '') + (o.tot < 2 ? '<br><b>Cách tốt hơn:</b> ' + E(tu.nhan) : '') : '') + '</li>';
      }).join('');
      var bai = k.thang0 ? (k.thang0.bai || []).slice() : []; k.thang.forEach(function (th) { bai = bai.concat(th.bai || [], th.su_co ? th.su_co.bai || [] : [], th.hop ? th.hop.bai || [] : []); });
      box.innerHTML = '<div class="card gm-end" style="--c:' + k.mau + '"><span class="tag warn">' + (sm ? 'Kết thúc sớm' : 'Kết cục năm kinh doanh') + ' · ' + E(k.ten) + '</span>' +
        '<h3>' + E(kc ? kc.ten : 'Kết thúc') + '</h3><p class="gm-nd">' + E(kc ? kc.nd : '') + '</p>' + meters(s) +
        '<p><b>Điểm tổng hợp: ' + pct + '% ' + GM.sao(pct) + '</b> (chất lượng quyết định ' + chatLuong + '%, kết quả kinh doanh ' + kinhTe + '%; ' + nTot + '/' + tong + ' phần làm tốt). Em đã mở <b>' + mo + '/' + soKet() + '</b> kết cục' + (mo < soKet() ? '; chơi lại và chọn khác đi để mở thêm.' : '. Em đã mở hết!') + '</p>' +
        (s.tu > 1 ? '<p class="mute">Em bắt đầu từ cấp độ ' + s.tu + ' · ' + E(CD()[s.tu - 1].ten) + ' nên điểm và báo cáo chỉ tính từ đó (vốn tính lại từ đầu cấp độ).</p>' : '') +
        '<p class="row"><button type="button" class="btn" id="kd-lai">Chơi lại năm mới</button>' + (capCua(s.t).so > 1 ? '<button type="button" class="btn alt" id="kd-capl">Chơi lại cấp độ ' + capCua(s.t).so + '</button>' : '') + '<button type="button" class="btn alt" id="kd-ds">Về trang trò chơi</button></p></div>' +
        (SC.nhom ? SC.nhom.theKetCuc(s.nhom, dsNhom) : '') +
        (SC.hs ? SC.hs.theKetCuc(k.id, dhMoi) : '') +
        '<div class="card"><h3>Báo cáo năm kinh doanh</h3><ul class="kd-ghi"><li>Vốn đầu năm: <b>' + fm(M.TIEN_DAU) + '</b> → tiền mặt cuối: <b>' + fm(s.tien) + '</b> (' + fm(s.tien - M.TIEN_DAU, true) + ').</li><li>Tổng doanh thu bán rau (' + s.dh.length + ' tháng): <b>' + fm(tongDt) + '</b>; tổng lãi điều hành: <b>' + fm(tongLn, true) + '</b> (chưa tính các khoản từ tình huống).</li></ul>' + bd + '<p class="mute">Cột xanh là tháng lãi, cột đỏ là tháng lỗ.</p></div>' + bangTieuChi(kinhTe) +
        (hau.length ? '<div class="card"><h3>Dấu vết em để lại</h3><ul class="gm-hau">' + hau.map(function (b) { return '<li>' + E(b.nd) + '</li>'; }).join('') + '</ul></div>' : '') +
        '<div class="card"><h3>Bẫy em hay mắc</h3>' + (ks.length ? '<p class="mute">Trợ giảng đếm những bẫy em đã sa vào trong ' + tong + ' phần đã chơi.</p><ul class="gm-hau">' + ks.map(function (l) { return '<li><b>' + E(GM.LOAI_BAY[l].ten) + '</b> × ' + dem[l] + '. Tự hỏi: ' + E(GM.LOAI_BAY[l].tu) + '</li>'; }).join('') + '</ul>' : '<p>Em không sa vào bẫy nào. Rất tỉnh táo!</p>') + '<p class="mute">Em đã xin gợi ý ở ' + ga + ' phần. Trợ giảng chỉ gợi ý, không đưa đáp án.</p></div>' +
        '<div class="card"><h3>Nhật kí điều hành</h3><p class="mute">Tháng 0 chia vốn, rồi mỗi tháng gồm phần điều hành, sự cố giữa tháng (nếu có) và tình huống cuối tháng, kèm lời bình, lỗi sai, rủi ro và cách tốt hơn.</p><ol class="gm-log">' + nk0 + nk + '</ol></div>' +
        '<div class="card"><h3>Kiến thức trong trò chơi</h3><p class="mute">Bấm để mở lại bài tương ứng trong Kho kiến thức.</p><p class="row">' + GM.nutBai(bai) + '</p></div>';
      if (SC.am) { SC.am.dung(); SC.am.nhac(!sm && pct >= 65 ? 'vui' : 'buon'); SC.am.sfx(!sm && pct >= 65 ? 'dung' : 'nghi'); if (kc) SC.am.noi([{ id: 'ke', text: SC.vo.ketCuc(kc) }]); }
      box.querySelector('#kd-lai').addEventListener('click', function () { var s2 = moi(); batDauThang(s2); chay(box, s2); });
      var capl = box.querySelector('#kd-capl'); if (capl) capl.addEventListener('click', function () { var s2 = moi(capCua(s.t).so); batDauThang(s2); chay(box, s2); });
      box.querySelector('#kd-ds').addEventListener('click', function () { hub(box); window.scrollTo(0, 0); });
      GM.noiBai(box); so(box);
    }
  }

  SC.lophoc.kdao = function (box) { hub(box); };
  // Mục «Phòng kinh doanh ảo» của Lớp học thông minh: hai tab phụ — «Các cấp độ» (trò chơi điều hành cả năm, chia 4 cấp độ) và «Ôn nhanh» (3 mô phỏng ngắn, trước là «Thực hành nhanh»; lophoc_kinhte.js)
  var sub = 'dieuhanh';
  SC.lophoc.kinhdoanh = function (box) {
    var T = [['dieuhanh', 'Các cấp độ'], ['nhanh', 'Ôn nhanh']];
    box.innerHTML = '<div class="tabs kd-sub" role="group" aria-label="Chọn phần của Phòng kinh doanh ảo">' + T.map(function (t) { return '<button type="button" data-k="' + t[0] + '" class="' + (t[0] === sub ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') + '</div><div id="kd-body"></div>';
    box.querySelectorAll('[data-k]').forEach(function (b) { b.addEventListener('click', function () { if (SC.am) { SC.am.dung(); SC.am.nhac(null); } sub = b.dataset.k; SC.lophoc.kinhdoanh(box); window.scrollTo(0, 0); }); });
    var body = box.querySelector('#kd-body');
    if (sub === 'nhanh') SC.lophoc.kinhte(body); else hub(body);
  };
})();
