/* Lớp học thông minh · HÀNH TRÌNH — trò chơi tình huống NHIỀU CHƯƠNG đi xuyên Lớp 10 → 11 → 12 .
   Trò «Pháp luật quanh ta» (pháp luật); nội dung ở data/game/hanhtrinh_pl.js. (21/11/2026: «Ông chủ trẻ» đã thay bằng «Phòng kinh doanh ảo» ở lophoc_kdao.js, dùng chung bộ SC.gm của file này; bản cũ nằm ở _thung-rac/lop_hoc_gon_21-11-2026/.)
   Cơ chế: (1) chỉ số (3 thanh) GIỮ NGUYÊN qua các chương; (2) mỗi lựa chọn có thể đặt «cờ» (dấu vết) làm đổi lời kể và cảnh ở chương sau;
   (3) tự lưu tiến độ sau mỗi cảnh để học sinh chơi tiếp hôm sau; (4) có thể bắt đầu từ chương Lớp 11 hoặc Lớp 12 (dùng khi học đúng bài đó);
   (5) cuối hành trình có kết cục (theo tỉ lệ lựa chọn tốt), «hậu vận» theo các dấu vết đã để lại và nhật kí quyết định kèm lời bình, cách tốt hơn, bài liên quan.
   (6) MỖI CẢNH CÓ BẪY: một nhân vật nói lời dẫn dụ (loi_dan) làm phương án sai trông hấp dẫn; (7) TRỢ GIẢNG chỉ GỢI Ý 3 cấp trước khi chọn, KHÔNG nêu đáp án
   (dùng đến cấp 3 thì lựa chọn không được tính «tốt trọn vẹn»); (8) sau khi chọn, Trợ giảng PHÂN TÍCH bẫy đã gặp, lỗi sai và rủi ro; cuối hành trình tổng kết «bẫy em hay mắc».
   Trợ giảng là bản SOẠN SẴN theo từng cảnh, chưa phải AI thật (xem SKILL.md mục 15.1).
   (9) CHẾ ĐỘ 3D (mặc định bật nếu máy có WebGL): mỗi cảnh dựng thành sa bàn hoạt hình 3D (lophoc_sb3d.js), nhân vật nói lời dẫn dụ ở bong bóng thoại và phản ứng sau khi em chọn;
   ba bậc gợi ý đặt tên Quan sát – Nguyên tắc – Cách nghĩ (giống ba bậc địa hình – lực lượng – thời cơ của «Sa bàn số»). Không có WebGL thì tự chơi bằng chữ.
   (10) ÂM THANH (lophoc_am.js): nhạc nền ngũ cung theo kiểu bẫy của cảnh, hiệu ứng khi chọn, giọng đọc lời kể, lời dẫn dụ (bong bóng thoại gõ chữ theo giọng), gợi ý, lời bình và phân tích.
   Chạy hoàn toàn trên máy (không cần mạng, không cần đăng nhập); KHÔNG ghi vào điểm hồ sơ; chỉ lưu trên máy: tiến độ, số lần chơi, kết cục đã mở, tỉ lệ tốt nhất.
   (23/11/2026) Thêm: BẢN ĐỒ KHU VỰC ở trang giới thiệu (lophoc_bando.js, data/game/khu_vuc.js; r.qua[id] = mức tốt nhất ở từng cảnh) và bước «BÀN HỒ SƠ» thu thập chứng cứ
   ở các cảnh có chung_cu (s.cc[id]): học sinh chọn tối đa vài vật chứng; chỉ đổi lời nhận xét, KHÔNG đổi điểm hay chỉ số (để giữ nguyên cân bằng đã kiểm).
   (24/11/2026) CẤP ĐỘ: mỗi CHƯƠNG của hành trình «Pháp luật quanh ta» nay là một CẤP ĐỘ (4 cấp độ: Luật chơi chung, Quyền đi cùng nghĩa vụ, Công dân trưởng thành, Công dân có trách nhiệm;
   chương Lớp 12 tách làm hai); mô tả ở data/game/cap_do.js. Cơ chế không đổi (chỉ số và dấu vết giữ nguyên qua các cấp độ, bắt đầu từ cấp độ nào cũng được); chỉ đổi chữ hiển thị «chương» → «cấp độ».
   (24/11/2026, L2) HẬU QUẢ QUAY LẠI VÀ KHẮC PHỤC (M6): việc em làm sai ở cảnh trước (cờ xấu) QUAY LẠI ở một cảnh sau, đổi chỉ số thật (h.hq_lai); em có thể sửa sai (giảm một phần, có giá riêng) hoặc để đó;
   hậu quả và việc sửa sai được ghi ở màn hết cấp độ và màn kết cục («Hậu quả quay lại và sửa sai»); sửa sai KHÔNG xoá lịch sử. */
(function () {
  var E = SC.esc, KEY = 'hanhtrinh';
  var NHAN_TOT = { 2: ['Lựa chọn tốt', 'ok'], 1: ['Chấp nhận được, còn thiếu sót', 'warn'], 0: ['Còn rủi ro', 'bad'] };
  // Các kiểu «bẫy» dẫn dắt lựa chọn; tu = câu tự hỏi để tự bảo vệ (không nêu đáp án của cảnh nào)
  var LOAI_BAY = {
    thoi_gian: { ten: 'Áp lực thời gian', tu: 'Nếu mình dành thêm mười phút hoặc hỏi một người đáng tin thì mất gì thật sự?' },
    so_dong: { ten: 'Bẫy số đông', tu: 'Số đông làm vậy có chứng minh việc đó đúng hoặc hợp pháp không?' },
    loi_truoc_mat: { ten: 'Lợi trước mắt', tu: 'Sau sáu tháng, ai là người phải trả giá cho sự nhanh và tiện này?' },
    uy_quyen: { ten: 'Uy quyền và người quen', tu: 'Nếu một người lạ nói điều này, mình có tin không? Có giấy tờ hay quy định nào chứng minh?' },
    so_mat: { ten: 'Sợ mất mát, sợ rắc rối', tu: 'Nỗi sợ này có thật không, và có cách nào vừa an toàn vừa đúng không?' },
    cam_xuc: { ten: 'Cảm xúc nhất thời', tu: 'Mai khi bình tĩnh lại, mình còn muốn làm như vậy không?' }
  };
  // Điểm hiệu lực của một lựa chọn: đã dùng gợi ý cấp 3 thì tối đa chỉ được tính «chấp nhận được»
  function hq(o, g) { return g >= 3 ? Math.min(o.tot, 1) : o.tot; }
  // Ba bậc gợi ý của Trợ giảng (giống «địa hình – lực lượng – thời cơ» ở Sa bàn số): nhìn kĩ → nguyên tắc → cách nghĩ đang dẫn dắt
  var TEN_GY = ['🔍 Quan sát', '📖 Nguyên tắc', '⚖️ Cách nghĩ'];
  function sao(pct) { return pct >= 85 ? '★★★' : pct >= 65 ? '★★☆' : '★☆☆'; }
  var che3d = SC.storage.get(KEY + '3d', true) !== false, lanVe = 0;
  // Nhạc nền theo kiểu bẫy của cảnh: thúc ép (thời gian, sợ mất) → căng thẳng; còn lại suy tư hoặc tươi sáng
  var MOOD_BAY = { thoi_gian: 'cang', so_mat: 'cang', cam_xuc: 'tam', so_dong: 'tam', loi_truoc_mat: 'khoi', uy_quyen: 'tam' };
  function amDung() { if (window.SC && SC.am) { SC.am.dung(); SC.am.nhac(null); } }

  function kho() { return (SC.data.game && SC.data.game.hanhtrinh) || []; }
  function tim(id) { return kho().filter(function (h) { return h.id === id; })[0]; }
  function doc() { var g = SC.storage.get(KEY, null); return g && typeof g === 'object' ? g : {}; }
  function lay(g, id) {
    var r = g[id]; if (!r) r = g[id] = { lan: 0, ket: {}, tot: 0, chuong: {}, tien: null };
    if (!r.ket) r.ket = {}; if (!r.chuong) r.chuong = {};
    return r;
  }
  function soKet(h) { return h.ket.length + Object.keys(h.ket_som).length; }
  function mang(x) { return x == null ? [] : (Object.prototype.toString.call(x) === '[object Array]' ? x : [x]); }
  function dung(rule, co) {
    return mang(rule.co).every(function (f) { return !!co[f]; }) && !mang(rule.khong).some(function (f) { return !!co[f]; });
  }
  function kep(v) { return Math.max(0, Math.min(100, v)); }
  function tenBai(id) {
    var r = '';
    SC.data.curriculum.muc.forEach(function (m) { m.bai.forEach(function (b) { if (b.id === id) r = 'Lớp ' + m.khoi + ' · Bài ' + b.so + '. ' + SC.sach(b.ten); }); });
    return r;
  }
  // Số cảnh dài nhất của một chương (các nhánh cùng độ dài thì không cộng dồn)
  function soCanh(ch) {
    var memo = {};
    function f(id) {
      if (memo[id]) return memo[id];
      var best = 1;
      ch.canh[id].chon.forEach(function (o) { mang(o.di).forEach(function (d) { var t = typeof d === 'string' ? d : d.den; if (t !== 'ket' && ch.canh[t]) best = Math.max(best, 1 + f(t)); }); });
      return (memo[id] = best);
    }
    return f(ch.bat_dau);
  }
  // Cấp độ (24/11/2026): thông tin mô tả của cấp độ c (data/game/cap_do.js) — chỉ có cho «Pháp luật quanh ta»
  function capMeta(h, c) { var L = SC.data.game && SC.data.game.capdo && h.id === 'phap-luat-quanh-ta' && SC.data.game.capdo['phap-luat']; return (L && L[c]) || null; }
  function chuongCua(h, id) { for (var i = 0; i < h.chuong.length; i++) if (h.chuong[i].canh[id]) return i; return -1; }
  function toiUu(c) { var t = Math.max.apply(null, c.chon.map(function (x) { return x.tot; })); return c.chon.filter(function (x) { return x.tot === t; })[0]; }
  function dauTrang(box) { var el = box.querySelector('.gm-play, .gm-end'); if (el) el.scrollIntoView({ block: 'start' }); }
  function coObj(arr) { var o = {}; mang(arr).forEach(function (f) { o[f] = true; }); return o; }
  // Ghi nhận cảnh đã qua và mức tốt nhất ở cảnh đó (0, 1, 2) cho bản đồ khu vực
  function ghiQua(h, id, q) { var g = doc(), r = lay(g, h.id); if (!r.qua) r.qua = {}; r.qua[id] = Math.max(r.qua[id] == null ? 0 : r.qua[id], q); SC.storage.set(KEY, g); }
  // Lựa chọn «hiệu lực» của một mục nhật kí: cảnh kiểu cũ → phương án đã chọn; cảnh «vụ việc» (lophoc_vuviec.js, 23/11/2026) → kết quả của KẾ HOẠCH đã ký, e.v = {m: mức 0–2, d, nhan, ls, rr}
  function opt(h, e) {
    var o = h.chuong[e.c].canh[e.id].chon[e.i];
    if (!e.v) return o;
    var vc = SC.vv && SC.vv.cua(h.id, e.id);
    return { nhan: 'Kế hoạch đã ký: ' + e.v.nhan, tot: e.v.m, d: e.v.d || {}, cd: o.cd, bl: vc ? vc.bl_muc[e.v.m] : o.bl, loi_sai: e.v.ls || '', rui_ro: e.v.rr || '', mau: vc ? vc.mau : '' };
  }

  // ---------------- Hậu quả quay lại và khắc phục (L2 · cơ chế M6, 24/11/2026) ----------------
  // h.hq_lai[] (data/game/hanhtrinh_pl.js): mỗi luật = {id, co/khong (cờ), canh (cảnh mà hậu quả QUAY LẠI), nd «Vì em đã … nên …», d (tác động chỉ số), kp[] (cách sửa sai: nhan, d, bl)}.
  // Vào cảnh `canh` mà cờ còn đúng thì hậu quả được ÁP NGAY MỘT LẦN (s.hq[id] = {sua, c}); học sinh có thể sửa sai (sua = số thứ tự cách sửa) hoặc để đó (sua = -2).
  // Sửa sai chỉ GIẢM MỘT PHẦN hậu quả và có cái giá riêng (kiem_hauqua.js kiểm); cờ gốc không bị xoá, chỉ thêm cờ «sua_<id>» để lời kể cuối ván ghi «đã sửa sai», không ghi «chưa từng sai».
  function hqCua(h, canh, co) { return (h.hq_lai || []).filter(function (r) { return r.canh === canh && dung(r, co); }); }
  function chipsD(h, d) {
    return Object.keys(d || {}).filter(function (k) { return d[k]; }).map(function (k) {
      var m = h.chi_so.filter(function (x) { return x.id === k; })[0], v = d[k];
      return '<span class="gm-chip ' + (v >= 0 ? 'up' : 'dn') + '">' + E(m ? m.ten : k) + ' ' + (v > 0 ? '+' : '−') + Math.abs(v) + '</span>';
    }).join('');
  }
  function apD(s, d) { Object.keys(d || {}).forEach(function (k) { if (k in s.chi) s.chi[k] = kep(s.chi[k] + d[k]); }); }
  function hqHtml(h, s, rs) {
    return rs.map(function (r) {
      var st = s.hq[r.id], kq;
      if (st.sua >= 0) { var k = r.kp[st.sua]; kq = '<p class="fb ok"><b>Em đã sửa sai:</b> ' + E(k.nhan) + ' ' + chipsD(h, k.d) + '</p><p class="mute">' + E(k.bl) + ' Hồ sơ ghi «đã sửa sai»; chuyện cũ vẫn còn đó.</p>'; }
      else if (st.sua === -2) kq = '<p class="mute">Em để đó, chưa xử lí việc này. Hồ sơ ghi «chưa xử lí xong».</p>';
      else kq = '<p class="mute"><b>Em có thể sửa sai ngay bây giờ.</b> Sửa sai chỉ giảm được một phần hậu quả, không xoá chuyện đã xảy ra, và có cái giá của nó. Em cũng có thể để đó và lo việc trước mắt.</p><div class="gm-hq-kp" role="group" aria-label="Cách sửa sai">' +
        r.kp.map(function (k, i) { return '<button type="button" class="btn alt gm-hq-b" data-hq="' + E(r.id) + '" data-kp="' + i + '">' + E(k.nhan) + '<span class="gm-hq-c">' + chipsD(h, k.d) + '</span></button>'; }).join('') +
        '<button type="button" class="btn alt gm-hq-b" data-hq="' + E(r.id) + '" data-kp="-2">Để đó, lo việc trước mắt</button></div>';
      return '<div class="gm-hq" data-hqbox="' + E(r.id) + '"><p class="gm-hq-h"><span class="tag warn">Hậu quả quay lại</span> ' + chipsD(h, r.d) + '</p><p class="gm-nd">' + E(r.nd) + '</p>' + kq + '</div>';
    }).join('');
  }

  // ---------------- Trạng thái và lưu tiến độ ----------------
  function taoMoi(h, c) {
    var s = { c: c, canh: h.chuong[c].bat_dau, buoc: 1, chi: {}, co: coObj(h.chuong[c].co_mac_dinh), diem: 0, toiDa: 0, nk: [], kc: false, cc: {}, vv: {}, hq: {}, nhom: (SC.nhom ? SC.nhom.dung() : null) };
    h.chi_so.forEach(function (m) { s.chi[m.id] = m.dau; });
    return s;
  }
  function luuTien(h, s) {
    var g = doc(), r = lay(g, h.id);
    r.tien = { c: s.c, canh: s.canh, buoc: s.buoc, chi: s.chi, co: Object.keys(s.co), diem: s.diem, toiDa: s.toiDa, nk: s.nk.map(function (e) { var m = [e.c, e.id, e.i, e.g || 0]; if (e.v) m.push(e.v); return m; }), kc: !!s.kc, cc: s.cc || {}, vv: s.vv || {}, hq: s.hq || {}, nhom: s.nhom || null };
    SC.storage.set(KEY, g);
  }
  function khoiPhuc(h, t) {
    try {
      if (!t || !h.chuong[t.c]) return null;
      if (!t.kc && !h.chuong[t.c].canh[t.canh]) { var c2 = chuongCua(h, t.canh); if (c2 < 0) return null; t = JSON.parse(JSON.stringify(t)); t.c = c2; }   // bản lưu trước khi tách cấp độ: tìm lại chương chứa cảnh
      var s = { c: t.c, canh: t.canh, buoc: t.buoc || 1, chi: {}, co: coObj(t.co), diem: t.diem || 0, toiDa: t.toiDa || 0, nk: [], kc: !!t.kc, cc: (t.cc && typeof t.cc === 'object') ? t.cc : {}, vv: (t.vv && typeof t.vv === 'object') ? t.vv : {}, hq: (t.hq && typeof t.hq === 'object') ? t.hq : {}, nhom: (SC.nhom ? SC.nhom.sach(t.nhom) : null) };
      h.chi_so.forEach(function (m) { s.chi[m.id] = typeof t.chi[m.id] === 'number' ? t.chi[m.id] : m.dau; });
      for (var i = 0; i < t.nk.length; i++) { var e = t.nk[i]; if (!h.chuong[e[0]] || !h.chuong[e[0]].canh[e[1]]) { var c3 = chuongCua(h, e[1]); if (c3 < 0) return null; e = [c3].concat(e.slice(1)); } if (!h.chuong[e[0]].canh[e[1]].chon[e[2]]) return null; s.nk.push({ c: e[0], id: e[1], i: e[2], g: e[3] || 0, v: (e[4] && typeof e[4] === 'object' && typeof e[4].m === 'number') ? e[4] : undefined }); }
      return s;
    } catch (err) { return null; }
  }
  function diemChuong(h, s, c) {
    var d = 0, n = 0;
    s.nk.forEach(function (e) { if (e.c === c) { d += hq(opt(h, e), e.g); n++; } });
    return { diem: d, toiDa: 2 * n, n: n, pct: n ? Math.round(100 * d / (2 * n)) : 0 };
  }

  // ---------------- Hiển thị chung ----------------
  function mauChiSo(h, chi) {
    return '<div class="gm-meters">' + h.chi_so.map(function (m) {
      var v = chi[m.id];
      return '<div class="gm-m' + (v < 25 ? ' low' : '') + '" data-m="' + E(m.id) + '"><div class="gm-ml"><span>' + E(m.ten) + '</span><b>' + v + '</b></div>' +
        '<div class="gm-mb" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + v + '" aria-label="' + E(m.ten) + '"><i style="width:' + v + '%"></i></div></div>';
    }).join('') + '</div>';
  }
  function capNhat(box, h, chi) {
    h.chi_so.forEach(function (m) {
      var el = box.querySelector('[data-m="' + m.id + '"]'); if (!el) return;
      el.querySelector('b').textContent = chi[m.id];
      el.querySelector('.gm-mb').setAttribute('aria-valuenow', chi[m.id]);
      el.querySelector('i').style.width = chi[m.id] + '%';
      el.classList.toggle('low', chi[m.id] < 25);
    });
  }
  function buoc(h, c) {
    return '<div class="gm-steps" aria-label="Các cấp độ">' + h.chuong.map(function (ch, i) {
      return '<span class="' + (i === c ? 'on' : i < c ? 'xong' : '') + '" title="' + E(ch.ten) + '">Cấp ' + (i + 1) + '</span>';
    }).join('') + '</div>';
  }
  function chuyenText(ch, co) {
    return (ch.chuyen || []).filter(function (b) { return dung(b, co); }).map(function (b) { return '<p class="gm-nd">' + E(b.nd) + '</p>'; }).join('');
  }
  function nhatKy(h, s) {
    var out = '';
    h.chuong.forEach(function (ch, ci) {
      var es = s.nk.filter(function (e) { return e.c === ci; });
      if (!es.length) return;
      out += '<h4>Cấp độ ' + (ci + 1) + ' · Lớp ' + ch.khoi + ': ' + E(ch.ten) + '</h4><ol class="gm-log">' + es.map(function (e) {
        var c = ch.canh[e.id], o = opt(h, e), tu = toiUu(c), nh = NHAN_TOT[o.tot];
        return '<li><b>' + E(c.tieu_de) + '</b><br>Em chọn: ' + E(o.nhan) + ' <span class="tag ' + (nh[1] === 'ok' ? '' : 'warn') + '">' + nh[0] + '</span>' +
          '<br><span class="mute">' + E(o.bl) + '</span>' + (o.loi_sai ? '<br><b>Lỗi sai:</b> ' + E(o.loi_sai) + ' <b>Rủi ro:</b> ' + E(o.rui_ro) : '') + (o.tot < 2 ? '<br><b>Cách tốt hơn:</b> ' + E(o.mau || tu.nhan) : '') + (e.g ? '<br><span class="mute">Em đã dùng gợi ý ' + e.g + '/3.</span>' : '') + '</li>';
      }).join('') + '</ol>';
    });
    return out;
  }
  function nutBai(ids) {
    var seen = {};
    return ids.filter(function (b) { if (seen[b]) return false; seen[b] = true; return !!tenBai(b); }).map(function (b) { return '<button type="button" class="btn alt" data-mo="' + E(b) + '">' + E(tenBai(b)) + '</button>'; }).join('');
  }
  function noiBai(box) { box.querySelectorAll('[data-mo]').forEach(function (b) { b.addEventListener('click', function () { SC.moBai(b.dataset.mo); }); }); }

  // ---------------- Trang giới thiệu của một hành trình ----------------
  function hub(box, h) {
    if (!h) { box.innerHTML = '<div class="empty">Chưa có hành trình này.</div>'; return; }
    var g = doc(), r = lay(g, h.id), t = khoiPhuc(h, r.tien), mo = Object.keys(r.ket).length;
    var conTiep = !!t;
    box.innerHTML =
      '<div class="card gm-intro gm-hero" style="--c:' + h.mau + '"><span class="tag warn">' + h.chuong.length + ' cấp độ · Lớp ' + h.chuong.map(function (c) { return c.khoi; }).filter(function (k, i, a) { return a.indexOf(k) === i; }).join(' → ') + '</span>' +
      '<h3>' + E(h.ten) + '</h3><p class="gm-kh">' + E(h.khau_hieu) + '</p><p>' + E(h.gioi_thieu) + '</p>' +
      '<p class="mute">Em đóng vai nhân vật chính (xưng «em»). Ba thanh chỉ số được <b>giữ nguyên qua các cấp độ</b>: ' + h.chi_so.map(function (m) { return '<b>' + E(m.ten) + '</b>'; }).join(', ') +
      '. Mỗi lựa chọn để lại «dấu vết» làm thay đổi những cấp độ sau, và chỉ số về 0 là kết thúc sớm. <b>Cẩn thận: trong mỗi cảnh có người nói lời rất thuyết phục để kéo em vào bẫy.</b> Trợ giảng chỉ gợi ý, không đưa đáp án, rồi phân tích lỗi sai và rủi ro sau khi em chọn (soạn sẵn, chưa phải AI thật). Cả hành trình khoảng 15–20 phút, tự lưu sau mỗi cảnh. Số tiền và tên nhân vật là giả định; kết quả không tính vào điểm hồ sơ.</p>' +
      '<p class="row">' + (conTiep ? '<button type="button" class="btn" id="ht-tiep">Tiếp tục: ' + (t.kc ? 'sang cấp độ ' + (t.c + 2) + ' · ' + h.chuong[t.c + 1].ten : 'cấp độ ' + (t.c + 1) + ' · ' + h.chuong[t.c].ten) + ' <span class="gm-tri" aria-hidden="true"></span></button>' : '') +
      '<button type="button" class="btn' + (conTiep ? ' alt' : '') + '" id="ht-moi">' + (conTiep ? 'Bắt đầu lại từ đầu' : 'Bắt đầu hành trình') + (conTiep ? '' : ' <span class="gm-tri" aria-hidden="true"></span>') + '</button></p>' +
      '<p class="row"><label class="gm-che"><input type="checkbox" id="ht-3d"' + (che3d ? ' checked' : '') + (SC.sb && SC.sb.ok === false ? ' disabled' : '') + '> Chơi dạng <b>3D</b> (sa bàn hoạt hình)</label>' +
      (SC.sb && SC.sb.ok === false ? '<span class="mute"> Máy này chưa hỗ trợ 3D (WebGL), trò chơi chạy bằng chữ.</span>' : '') + '</p>' + (SC.nhom ? SC.nhom.khungHub() : '') + (SC.am ? SC.am.dieuKhien() : '') +
      (SC.hs && SC.hs.chanNoiDung ? SC.hs.chanNoiDung(h) : '') + '<p class="gm-card-s">' + (r.lan ? 'Đã hoàn thành ' + r.lan + ' lần · Kết cục đã mở ' + mo + '/' + soKet(h) + (r.tot ? ' · Tốt nhất ' + r.tot + '%' : '') : 'Chưa hoàn thành lần nào · ' + soKet(h) + ' kết cục đang chờ em') + '</p></div>' +
      '<h4>Các cấp độ</h4><p class="mute">Chơi lần lượt từ cấp độ 1, hoặc bắt đầu từ cấp độ ứng với bài em đang học. Xong một cấp độ, các chỉ số và dấu vết được giữ sang cấp độ sau.</p><div class="gm-grid">' + h.chuong.map(function (ch, i) {
        var b = r.chuong[i];
        var mt = capMeta(h, i);
        return '<button type="button" class="gm-card" data-ch="' + i + '" style="--c:' + h.mau + '"><span class="gm-card-ic">' + (i + 1) + '</span>' +
          '<span class="gm-card-b"><b>Cấp độ ' + (i + 1) + ' · ' + E(ch.ten) + '</b>' +
          '<span class="gm-card-t"><span class="tag">Lớp ' + ch.khoi + '</span><span class="tag">' + soCanh(ch) + ' cảnh</span></span>' +
          '<span class="gm-card-d gm-clamp">' + E(mt ? mt.mota : ch.mo) + '</span>' +
          '<span class="gm-card-s">' + (b ? 'Tốt nhất ở cấp độ này: ' + b + '%' : 'Chưa chơi cấp độ này') + '</span></span></button>';
      }).join('') + '</div>' + (SC.bd ? SC.bd.html(h, r) : '');
    amDung(); if (SC.am) SC.am.noiDieuKhien(box);
    if (SC.nhom) SC.nhom.noiHub(box);
    if (SC.bd) SC.bd.noi(box, batDau);   // bản đồ khu vực: bấm tình huống để bắt đầu từ chương chứa nó
    var cb3 = box.querySelector('#ht-3d');
    if (cb3) cb3.addEventListener('change', function () { che3d = cb3.checked; SC.storage.set(KEY + '3d', che3d); if (che3d && SC.sb) SC.sb.nap(function () {}); });
    if (che3d && SC.sb) SC.sb.nap(function () {});   // làm nóng: nạp thư viện 3D từ trước để cảnh đầu không phải chờ
    if (conTiep) box.querySelector('#ht-tiep').addEventListener('click', function () { if (SC.am) SC.am.mo(); chay(box, h, t); });
    box.querySelector('#ht-moi').addEventListener('click', function () { batDau(0); });
    box.querySelectorAll('[data-ch]').forEach(function (b) { b.addEventListener('click', function () { batDau(+b.dataset.ch); }); });
    function batDau(c) {
      if (conTiep && !window.confirm('Bắt đầu mới sẽ thay tiến độ đang lưu của hành trình này. Em chắc chứ?')) return;
      if (SC.am) SC.am.mo();
      chay(box, h, taoMoi(h, c));
    }
  }

  // ---------------- Chơi ----------------
  function chay(box, h, s) {
    if (s.kc) ketChuong(); else { luuTien(h, s); veCanh(); }

    function veCanh() {
      var ch = h.chuong[s.c], c = ch.canh[s.canh], vc = (SC.vv && SC.vv.cua(h.id, s.canh)) || null, ds0 = c.chon.map(function (o, i) { return { o: o, i: i }; }), ds = vc ? ds0 : SC.shuffle(ds0), daChon = false, gl = 0, cc = (!vc && c.chung_cu && !(s.cc && s.cc[s.canh])) ? c.chung_cu : null;   // vc: cảnh kiểu «vụ việc» (lophoc_vuviec.js), không có nút phương án
      var dung3d = !!(che3d && c.sb && SC.sb && SC.sb.ok !== false);
      // L2: hậu quả của việc đã làm quay lại ở cảnh này (áp một lần, lưu ngay); cảnh đã quyết rồi thì việc chưa sửa coi như «để đó»
      if (!s.hq) s.hq = {};
      var hqs = hqCua(h, s.canh, s.co), daQuyet = s.nk.some(function (e) { return e.id === s.canh; }), hqMoi = false;
      hqs.forEach(function (r) {
        if (!s.hq[r.id]) { s.hq[r.id] = { sua: -1, c: s.c }; apD(s, r.d); hqMoi = true; }
        if (daQuyet && s.hq[r.id].sua === -1) { s.hq[r.id].sua = -2; hqMoi = true; }
      });
      if (hqMoi) luuTien(h, s);
      var them = (c.them || []).filter(function (b) { return dung(b, s.co); }).map(function (b) { return '<p class="gm-nd gm-them">' + E(b.nd) + '</p>'; }).join('');
      box.innerHTML = '<div class="card gm-play" style="--c:' + h.mau + '">' +
        '<div class="gm-top"><button type="button" class="btn alt gm-back">Lưu và thoát</button>' + (SC.am ? '<span class="gm-top-am"><button type="button" class="btn alt gm-am" aria-pressed="' + SC.am.coAmThanh() + '">' + (SC.am.coAmThanh() ? '🔊 Âm thanh: bật' : '🔇 Âm thanh: tắt') + '</button><button type="button" class="btn alt gm-bq" title="Bỏ qua câu đang đọc">⏭ Bỏ qua giọng</button></span>' : '') + '<b>' + E(h.ten) + '</b></div>' + buoc(h, s.c) +
        mauChiSo(h, s.chi) + (SC.nhom ? SC.nhom.luot(s.nhom, s.nk.length) : '') +
        (dung3d ? '<div class="sb-khung" role="img" aria-label="Sa bàn 3D minh hoạ tình huống"><div class="sb-cho">Đang dựng sa bàn 3D…</div></div>' : '') +
        '<div class="gm-scene' + (dung3d ? ' sb-on' : '') + '"><span class="tag">Cấp độ ' + (s.c + 1) + '/' + h.chuong.length + ' · ' + E(ch.ten) + ' · Lớp ' + ch.khoi + '</span> <span class="tag">Cảnh ' + s.buoc + '</span>' +
        (s.buoc === 1 ? '<p class="gm-mo">' + E(ch.mo) + '</p>' : '') +
        '<h3>' + E(c.tieu_de) + '</h3><p class="gm-nd">' + E(c.nd) + '</p>' + them + hqHtml(h, s, hqs) +
        (c.loi_dan ? '<blockquote class="gm-dan"><b>' + E(c.loi_dan.ai) + ':</b> «' + E(c.loi_dan.nd) + '»</blockquote>' : '') +
        (c.goi_y && c.goi_y.length ? '<div class="gm-gy-box"><button type="button" class="btn alt gm-gy-btn">Trợ giảng: xin gợi ý (0/' + c.goi_y.length + ')</button>' +
          '<span class="mute"> Trợ giảng chỉ gợi ý, không đưa đáp án; soạn sẵn, chưa phải AI thật. Dùng gợi ý cấp ' + c.goi_y.length + ' thì lựa chọn không được tính «tốt trọn vẹn».</span><div class="gm-gy-list" aria-live="polite"></div></div>' : '') +
        (vc ? '<div class="vv-hop"></div>' : (cc ? ccHtml(cc) : '') + '<div class="gm-opts"' + (cc ? ' hidden' : '') + ' role="group" aria-label="Các cách xử lí">' + ds.map(function (x, j) { return '<button type="button" class="opt" data-j="' + j + '">' + E(x.o.nhan) + '</button>'; }).join('') + '</div>') +
        '<div class="gm-kq" aria-live="polite"></div></div></div>';
      if (SC.nhom) SC.nhom.chay(box);   // chơi nhóm (lophoc_nhom.js): đồng hồ bàn bạc tùy chọn
      if (cc) noiCC(cc);
      box.querySelectorAll('.gm-hq-b').forEach(function (b) {
        b.addEventListener('click', function () {
          var r = (h.hq_lai || []).filter(function (x) { return x.id === b.dataset.hq; })[0], i = +b.dataset.kp, st = r && s.hq[r.id];
          if (!st || st.sua !== -1 || daChon) return;
          if (i >= 0) { apD(s, r.kp[i].d); st.sua = i; s.co['sua_' + r.id] = true; capNhat(box, h, s.chi); if (SC.am) SC.am.sfx('chon'); } else st.sua = -2;
          luuTien(h, s);
          var bx = box.querySelector('[data-hqbox="' + r.id + '"]'); if (bx) bx.outerHTML = hqHtml(h, s, [r]);
        });
      });
      if (vc) vcDung();
      box.querySelector('.gm-back').addEventListener('click', function () { hub(box, h); window.scrollTo(0, 0); });
      var nutAm = box.querySelector('.gm-am'), nutBq = box.querySelector('.gm-bq');
      if (nutAm) nutAm.addEventListener('click', function () { SC.am.mo(); var v = !SC.am.coAmThanh(); SC.am.datBat(v); nutAm.textContent = v ? '🔊 Âm thanh: bật' : '🔇 Âm thanh: tắt'; nutAm.setAttribute('aria-pressed', String(v)); });
      if (nutBq) nutBq.addEventListener('click', function () { SC.am.boQua(); });
      var amBat = !!(SC.am && SC.am.dangBat());
      if (SC.am) {
        SC.am.dung(); SC.am.nhac(MOOD_BAY[c.bay && c.bay.loai] || 'tam'); SC.am.sfx('vao'); if (dung3d && SC.sb) SC.sb.datLai();
        if (amBat) {
          var dsg = [];
          if (s.buoc === 1) dsg.push({ id: 'ke', text: ch.mo });
          dsg.push({ id: 'ke', text: c.nd });
          (c.them || []).filter(function (b) { return dung(b, s.co); }).forEach(function (b) { dsg.push({ id: 'ke', text: b.nd }); });
          hqs.forEach(function (r) { dsg.push({ id: 'ke', text: r.nd }); });
          if (c.loi_dan) dsg.push({ id: SC.vo.hoSo('nv', c.sb ? c.sb.noi : null), text: c.loi_dan.nd, bd: function (g) { if (dung3d && SC.sb) SC.sb.hienBong(g); } });
          SC.am.noi(dsg);
        }
      }
      box.querySelectorAll('.opt').forEach(function (b) { b.addEventListener('click', function () { chon(+b.dataset.j); }); });
      if (dung3d) {
        var kh = box.querySelector('.sb-khung'), tk = ++lanVe;
        SC.sb.nap(function (ok) {
          if (tk !== lanVe || !kh || !document.body.contains(kh)) return;
          var cho = kh.querySelector('.sb-cho'); if (cho) kh.removeChild(cho);
          if (!ok || !SC.sb.dung(kh, c.sb, c.loi_dan, { cho: amBat })) { if (kh.parentNode) kh.parentNode.removeChild(kh); var sc0 = box.querySelector('.gm-scene'); if (sc0) sc0.classList.remove('sb-on'); }
        });
      }
      var nutGy = box.querySelector('.gm-gy-btn');
      if (nutGy) nutGy.addEventListener('click', function () {
        if (daChon || gl >= c.goi_y.length) return;
        gl++;
        box.querySelector('.gm-gy-list').insertAdjacentHTML('beforeend', '<p class="gm-gy"><b>Gợi ý ' + gl + '/' + c.goi_y.length + ' · ' + (TEN_GY[gl - 1] || '') + '.</b> ' + E(c.goi_y[gl - 1]) + '</p>' + (gl === c.goi_y.length ? '<p class="mute">Em đã dùng gợi ý cấp cuối: lựa chọn của cảnh này tối đa được tính «chấp nhận được».</p>' : ''));
        nutGy.textContent = gl < c.goi_y.length ? 'Trợ giảng: xin gợi ý tiếp (' + gl + '/' + c.goi_y.length + ')' : 'Đã dùng hết gợi ý (' + gl + '/' + c.goi_y.length + ')';
        if (gl >= c.goi_y.length) nutGy.disabled = true;
        if (SC.am) { SC.am.sfx('goi_y'); SC.am.noi([{ id: 'tg', text: c.goi_y[gl - 1] }]); }
      });
      dauTrang(box);

      // «Vụ việc» (lophoc_vuviec.js): cảnh có kế hoạch đã ký → hiện kết quả của kế hoạch; lai = true khi mở lại ván đã ký (trạng thái đã áp dụng, không áp dụng lần nữa)
      function vcDung() {
        if (!s.vv) s.vv = {};
        var st = SC.vv.khoiPhuc(vc, s.vv[s.canh]); s.vv[s.canh] = st;
        function gan(m) { var b = 0, kc = 9; c.chon.forEach(function (o, i) { var k = Math.abs(o.tot - m) + (o.tot > m ? 0.5 : 0); if (k < kc) { kc = k; b = i; } }); return b; }   // phương án cũ gần mức nhất (dùng cho nối cảnh kế và sa bàn 3D)
        SC.vv.dung(box.querySelector('.vv-hop'), vc, st, {
          am: SC.am,
          luu: function () { luuTien(h, s); },
          ky: function () { st.r.g = gl; var kq = SC.vv.ketQua(vc, st, c); chon(gan(kq.m), kq, false); }
        });
        if (st.r) { gl = st.r.g || 0; var kq0 = SC.vv.ketQua(vc, st, c); chon(gan(kq0.m), kq0, true); }
      }

      function chon(j, ex, lai) {
        if (daChon) return; daChon = true;
        hqs.forEach(function (r) { var st = s.hq[r.id]; if (st && st.sua === -1) { st.sua = -2; var bx = box.querySelector('[data-hqbox="' + r.id + '"]'); if (bx) bx.outerHTML = hqHtml(h, s, [r]); } });   // đã quyết định cảnh này: việc chưa sửa coi như để đó
        var o = ds[j].o, tu = toiUu(c), oe = ex ? { nhan: ex.nhan, tot: ex.m, d: ex.d, cd: ex.cd, bl: ex.noi, loi_sai: ex.ls, rui_ro: ex.rr } : o;   // oe: lựa chọn hiệu lực (kế hoạch đã ký hoặc phương án cũ)
        var q = hq(oe, gl); if (!lai) { s.diem += q; s.toiDa += 2; }
        box.querySelectorAll('.gm-gy-btn').forEach(function (b) { b.disabled = true; });
        if (!lai) {
          Object.keys(oe.d || {}).forEach(function (k) { s.chi[k] = kep(s.chi[k] + oe.d[k]); });
          mang(oe.cd).forEach(function (f) { s.co[f] = true; });
          mang(o.xd).forEach(function (f) { delete s.co[f]; });
          s.nk.push({ c: s.c, id: s.canh, i: ds[j].i, g: gl, v: ex ? { m: ex.m, d: ex.d, nhan: ex.nhan, ls: ex.ls, rr: ex.rr } : undefined }); ghiQua(h, s.canh, q);
          if (ex) luuTien(h, s);   // lưu ngay sau khi ký: thoát giữa chừng rồi vào lại thì thấy kết quả, không đổi được quyết định
        }
        capNhat(box, h, s.chi);
        if (dung3d && SC.sb && SC.sb.phanUng) SC.sb.phanUng(oe.tot);
        if (SC.am && !lai) {
          SC.am.sfx(oe.tot === 2 ? 'dung' : oe.tot === 1 ? 'nghi' : 'sai');
          var pt = SC.vo.phanTich(oe);
          SC.am.noi([{ id: 'tg', text: oe.bl }].concat(pt ? [{ id: 'tg', text: pt }] : []));
        }
        box.querySelectorAll('.opt').forEach(function (b, k) {
          b.disabled = true;
          if (k === j) b.classList.add(o.tot === 2 ? 'ok' : o.tot === 1 ? 'sel' : 'bad');
          else if (ds[k].o === tu && o.tot < 2) b.classList.add('ok');
        });
        var som = null, thap = 101;
        h.chi_so.forEach(function (m) { if (s.chi[m.id] <= 0 && s.chi[m.id] < thap) { thap = s.chi[m.id]; som = m.id; } });
        var nxt = den(o), cuoiChuong = nxt === 'ket', cuoiHanhTrinh = cuoiChuong && s.c === h.chuong.length - 1;
        var nh = NHAN_TOT[oe.tot];
        var chips = Object.keys(oe.d || {}).map(function (k) {
          var m = h.chi_so.filter(function (x) { return x.id === k; })[0], v = oe.d[k];
          return '<span class="gm-chip ' + (v >= 0 ? 'up' : 'dn') + '">' + E(m ? m.ten : k) + ' ' + (v > 0 ? '+' : '−') + Math.abs(v) + '</span>';
        }).join('');
        var kq = box.querySelector('.gm-kq');
        kq.innerHTML = '<div class="fb gm-fb ' + nh[1] + '"><p><span class="tag ' + (nh[1] === 'ok' ? '' : 'warn') + '">' + nh[0] + '</span> ' + chips + '</p>' +
          (ex ? ex.html : '<p>' + E(o.bl) + '</p>') + (q < oe.tot ? '<p class="mute">Em đã dùng gợi ý cấp cuối nên lựa chọn này chỉ được tính ' + q + '/2 điểm.</p>' : '') + (oe.tot < 2 ? '<p class="mute"><b>Cách tốt hơn:</b> ' + E(ex ? ex.mau : tu.nhan) + '</p>' : '') + '</div>' + phanTich(c, oe) + ccGhiChu(c, o) +
          '<p><button type="button" class="btn gm-next">' + (som || cuoiHanhTrinh ? 'Xem kết cục' : cuoiChuong ? 'Hoàn thành cấp độ' : 'Tiếp theo') + ' <span class="gm-tri" aria-hidden="true"></span></button></p>';
        var tiep = kq.querySelector('.gm-next');
        tiep.addEventListener('click', function () {
          if (som) ketCuc(som);
          else if (cuoiChuong) ketChuong();
          else { s.canh = nxt; s.buoc++; luuTien(h, s); veCanh(); }
        });
        tiep.focus();
        kq.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // ---- Bàn hồ sơ: thu thập chứng cứ (chung_cu). Chỉ đổi lời nhận xét, KHÔNG đổi điểm hay chỉ số ----
    var NH_CC = { can: ['Cần thiết', ''], huu_ich: ['Hữu ích', ''], nhieu: ['Không giúp được', 'warn'], nguy: ['Không nên dùng', 'warn'] };
    function ccHtml(cc) {
      var ds = SC.shuffle(cc.vat.map(function (v, i) { return i; }));
      return '<div class="gm-cc" data-cc><h4>🗂️ Bàn hồ sơ: thu thập chứng cứ</h4><p class="mute">' + E(cc.mo) + ' Chọn tối đa <b>' + cc.toi_da + '</b> thứ để mang theo: có thứ giúp ích, có thứ không liên quan, và có thứ không nên dùng.</p>' +
        '<div class="gm-cc-ds" role="group" aria-label="Vật chứng">' + ds.map(function (i) { var v = cc.vat[i]; return '<button type="button" class="gm-cc-v" data-v="' + i + '" aria-pressed="false"><b>' + E(v.ten) + '</b><span>' + E(v.mo) + '</span></button>'; }).join('') + '</div>' +
        '<p class="row"><button type="button" class="btn" data-cc-xong disabled>Mang theo (0/' + cc.toi_da + ')</button></p><div class="gm-cc-kq" aria-live="polite"></div></div>';
    }
    function noiCC(cc) {
      var el = box.querySelector('[data-cc]'), xong = el.querySelector('[data-cc-xong]'), chon = [];
      el.querySelectorAll('.gm-cc-v').forEach(function (b) {
        b.addEventListener('click', function () {
          var i = +b.getAttribute('data-v'), k = chon.indexOf(i);
          if (k >= 0) chon.splice(k, 1); else if (chon.length < cc.toi_da) chon.push(i); else return;
          var on = chon.indexOf(i) >= 0; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on));
          xong.disabled = !chon.length; xong.textContent = 'Mang theo (' + chon.length + '/' + cc.toi_da + ')';
        });
      });
      xong.addEventListener('click', function () {
        if (!chon.length) return;
        var kq = ccDanhGia(cc, chon); s.cc[s.canh] = kq.luu; luuTien(h, s);
        el.querySelectorAll('.gm-cc-v').forEach(function (b) { b.disabled = true; });
        xong.hidden = true; el.querySelector('.gm-cc-kq').innerHTML = kq.html;
        var op = box.querySelector('.gm-opts'); if (op) op.removeAttribute('hidden');
        if (SC.am) SC.am.sfx('chon');
      });
    }
    function ccDanhGia(cc, chon) {
      var can = cc.vat.filter(function (v) { return v.loai === 'can'; }), mangTheo = chon.map(function (i) { return cc.vat[i]; });
      var du = mangTheo.filter(function (v) { return v.loai === 'can'; }).length, nguy = mangTheo.filter(function (v) { return v.loai === 'nguy'; }).length;
      var thieu = can.filter(function (v) { return mangTheo.indexOf(v) < 0; });
      var html = '<ul class="gm-cc-ds2">' + mangTheo.map(function (v) { return '<li><span class="tag ' + NH_CC[v.loai][1] + '">' + NH_CC[v.loai][0] + '</span> <b>' + E(v.ten) + '</b><br><span class="mute">' + E(v.bl) + '</span></li>'; }).join('') + '</ul>' +
        '<p>' + (thieu.length ? 'Em mang được <b>' + du + '/' + can.length + '</b> chứng cứ cần thiết; còn thiếu: ' + thieu.map(function (v) { return '«' + E(v.ten) + '»'; }).join(', ') + '.' : 'Em đã mang đủ <b>' + du + '/' + can.length + '</b> chứng cứ cần thiết.') +
        (nguy ? ' <b>Có ' + nguy + ' thứ không nên dùng</b>: dùng nó có thể làm chính em sai.' : '') + ' Phần này không tính vào điểm; em chọn cách xử lí ở dưới.</p>';
      return { luu: { c: chon.map(function (i) { return cc.vat[i].id; }), du: du, can: can.length, nguy: nguy }, html: html };
    }
    function ccGhiChu(c, o) {
      var r = c.chung_cu && s.cc && s.cc[s.canh]; if (!r) return '';
      var tot = r.du >= r.can && !r.nguy, goc = tot ? 'Em đã mang đủ chứng cứ cần thiết và không dùng thứ không nên dùng' + (o.tot === 2 ? ', nên cách xử lí này có căn cứ vững hơn.' : '.')
        : [r.du < r.can ? 'Em còn thiếu chứng cứ cần thiết nên việc phản ánh có thể khó thuyết phục hơn.' : '', r.nguy ? 'Em có mang thứ không nên dùng: dùng nó có thể khiến chính em sai hoặc xâm phạm người khác.' : ''].filter(Boolean).join(' ');
      return '<p class="mute gm-cc-gc"><b>Về chứng cứ:</b> ' + goc + '</p>';
    }
    function ccTongKet() {
      var ids = Object.keys(s.cc || {}); if (!ids.length) return '';
      return '<div class="card"><h3>Bàn hồ sơ của em</h3><p class="mute">Chứng cứ em đã thu thập ở các tình huống có bước này.</p><ul class="gm-hau">' + ids.map(function (id) {
        var r = s.cc[id], ten = id; h.chuong.forEach(function (ch) { if (ch.canh[id]) ten = ch.canh[id].tieu_de; });
        return '<li><b>' + E(ten) + '</b>: ' + r.du + '/' + r.can + ' chứng cứ cần thiết' + (r.nguy ? ' <span class="tag warn">có ' + r.nguy + ' thứ không nên dùng</span>' : '') + '</li>';
      }).join('') + '</ul></div>';
    }

    // Trợ giảng phân tích sau khi chọn: bẫy trong cảnh, lỗi sai và rủi ro (nếu có), cách tự bảo vệ. Nội dung soạn sẵn theo từng cảnh.
    function phanTich(c, o) {
      var lb = c.bay && LOAI_BAY[c.bay.loai];
      if (!lb && !o.loi_sai) return '';
      return '<div class="gm-tg"><p class="gm-tg-h"><b>Trợ giảng phân tích</b> <span class="mute">(soạn sẵn, chưa phải AI thật)</span></p><ul>' +
        (lb ? '<li><b>Bẫy trong cảnh này:</b> ' + E(lb.ten) + '. ' + E(c.bay.mo) + '</li>' : '') +
        (o.loi_sai ? '<li><b>Lỗi sai của lựa chọn:</b> ' + E(o.loi_sai) + '</li><li><b>Rủi ro em có thể gặp:</b> ' + E(o.rui_ro) + '</li>' : '<li><b>Em đã tránh được bẫy này.</b></li>') +
        (lb ? '<li><b>Cách tự bảo vệ lần sau:</b> ' + E(lb.tu) + '</li>' : '') + '</ul></div>';
    }
    // L2: tổng kết hậu quả quay lại và việc sửa sai (c = chỉ lấy các hậu quả quay lại ở cấp độ c; bỏ trống = cả ván)
    function hqTongKet(c) {
      var ds = (h.hq_lai || []).filter(function (r) { var st = s.hq && s.hq[r.id]; return st && (c == null || st.c === c); });
      if (!ds.length) return '';
      return '<div class="card"><h3>Hậu quả quay lại và sửa sai' + (c == null ? '' : ' trong cấp độ này') + '</h3><p class="mute">Việc em làm trước đây quay lại ở các cảnh sau. Sửa sai chỉ giảm hậu quả, không xoá chuyện đã xảy ra.</p><ul class="gm-hau">' + ds.map(function (r) {
        var st = s.hq[r.id], ci = chuongCua(h, r.canh), ten = ci >= 0 ? h.chuong[ci].canh[r.canh].tieu_de : r.canh;
        return '<li><b>' + E(ten) + '</b>: ' + E(r.nd) + ' ' + chipsD(h, r.d) + '<br>' + (st.sua >= 0 ? '<span class="tag">Đã sửa sai</span> ' + E(r.kp[st.sua].nhan) + ' ' + chipsD(h, r.kp[st.sua].d) : '<span class="tag warn">Chưa xử lí xong</span>') + '</li>';
      }).join('') + '</ul></div>';
    }
    // Tổng kết «bẫy em hay mắc» và số lần dùng gợi ý
    function tongKetBay() {
      var dem = {}, ga = 0, g3 = 0, tong = 0;
      s.nk.forEach(function (e) {
        var c = h.chuong[e.c].canh[e.id], o = opt(h, e); tong++;
        if (e.g) ga++; if (e.g >= 3) g3++;
        if (o.tot < 2 && c.bay && LOAI_BAY[c.bay.loai]) dem[c.bay.loai] = (dem[c.bay.loai] || 0) + 1;
      });
      var ks = Object.keys(dem).sort(function (a, b) { return dem[b] - dem[a]; });
      return '<div class="card"><h3>Bẫy em hay mắc</h3>' + (ks.length
        ? '<p class="mute">Trợ giảng đếm những bẫy em đã sa vào trong ' + tong + ' cảnh đã chơi.</p><ul class="gm-hau">' + ks.map(function (k) { return '<li><b>' + E(LOAI_BAY[k].ten) + '</b> × ' + dem[k] + '. Tự hỏi: ' + E(LOAI_BAY[k].tu) + '</li>'; }).join('') + '</ul>'
        : '<p>Em không sa vào bẫy nào trong ' + tong + ' cảnh đã chơi. Rất tỉnh táo!</p>') +
        '<p class="mute">Em đã xin gợi ý ở ' + ga + ' cảnh' + (g3 ? ' (dùng đến cấp cuối ở ' + g3 + ' cảnh, các lựa chọn đó bị tính tối đa 1/2 điểm)' : '') + '. Trợ giảng chỉ gợi ý, không đưa đáp án.</p></div>';
    }

    function den(o) {
      var d = o.di;
      if (Object.prototype.toString.call(d) !== '[object Array]') return d;
      for (var i = 0; i < d.length; i++) { if (typeof d[i] === 'string') return d[i]; if (dung(d[i], s.co)) return d[i].den; }
      return 'ket';
    }

    function ketChuong() {
      var ch = h.chuong[s.c], dc = diemChuong(h, s, s.c);
      if (s.c === h.chuong.length - 1) { ketCuc(null); return; }
      s.kc = true; luuTien(h, s);
      var g = doc(), r = lay(g, h.id); r.chuong[s.c] = Math.max(r.chuong[s.c] || 0, dc.pct); SC.storage.set(KEY, g);
      var sau = h.chuong[s.c + 1];
      if (SC.am) { SC.am.dung(); SC.am.nhac(dc.pct >= 65 ? 'vui' : 'tam'); SC.am.sfx('chuong'); SC.am.noi((ch.chuyen || []).filter(function (b) { return dung(b, s.co); }).map(function (b) { return { id: 'ke', text: b.nd }; })); }
      box.innerHTML = '<div class="card gm-end" style="--c:' + h.mau + '"><span class="tag warn">Hoàn thành cấp độ ' + (s.c + 1) + '/' + h.chuong.length + ' · Lớp ' + ch.khoi + '</span>' + buoc(h, s.c + 1) +
        '<h3>' + E(ch.ten) + '</h3>' + (capMeta(h, s.c) ? '<p class="mute"><b>Em đã học được:</b> ' + E(capMeta(h, s.c).muc_tieu) + '</p>' : '') + chuyenText(ch, s.co) + mauChiSo(h, s.chi) +
        '<p><b>Chất lượng các quyết định trong cấp độ: ' + dc.pct + '% ' + sao(dc.pct) + '</b> (' + dc.diem + '/' + dc.toiDa + ' điểm qua ' + dc.n + ' cảnh).</p>' +
        '<p class="row"><button type="button" class="btn" id="gm-sang">Sang cấp độ ' + (s.c + 2) + ' · ' + E(sau.ten) + ' <span class="gm-tri" aria-hidden="true"></span></button><button type="button" class="btn alt" id="gm-dung">Lưu và dừng ở đây</button></p></div>' +
        '<div class="card"><h3>Nhật kí cấp độ ' + (s.c + 1) + '</h3>' + nhatKy(h, { nk: s.nk.filter(function (e) { return e.c === s.c; }) }) + '</div>' +
        hqTongKet(s.c) + '<div class="card"><h3>Kiến thức trong cấp độ</h3><p class="row">' + nutBai(ch.bai) + '</p></div>';
      box.querySelector('#gm-sang').addEventListener('click', function () { s.kc = false; s.c++; s.canh = h.chuong[s.c].bat_dau; s.buoc = 1; luuTien(h, s); veCanh(); });
      box.querySelector('#gm-dung').addEventListener('click', function () { hub(box, h); window.scrollTo(0, 0); });
      noiBai(box); dauTrang(box);
    }

    function ketCuc(som) {
      var tl = s.toiDa ? s.diem / s.toiDa : 0, pct = Math.round(tl * 100), kc = null, id = '';
      if (som) { kc = h.ket_som[som]; id = 'som:' + som; }
      else { for (var i = 0; i < h.ket.length; i++) { if (pct >= h.ket[i].tu) { kc = h.ket[i]; id = 'ket:' + i; break; } } }
      var nTot = s.nk.filter(function (e) { return hq(opt(h, e), e.g) === 2; }).length;
      var g = doc(), r = lay(g, h.id);
      r.lan++; r.ket[id] = 1; r.tot = Math.max(r.tot || 0, pct); r.tien = null;
      var dc = diemChuong(h, s, s.c); r.chuong[s.c] = Math.max(r.chuong[s.c] || 0, dc.pct);
      SC.storage.set(KEY, g);
      var dhMoi = (SC.hs && SC.hs.xet) ? SC.hs.xet(h.id) : null;   // danh hiệu (lophoc_hoso.js): xét sau khi đã lưu kết quả ván
      var dsNhom = s.nhom ? s.nk.map(function (e) { var c0 = h.chuong[e.c].canh[e.id]; return { ten: c0.tieu_de, q: hq(opt(h, e), e.g) }; }) : [];   // chơi nhóm: quyết định theo thứ tự
      var mo = Object.keys(r.ket).length, tong = soKet(h);
      if (SC.am) { SC.am.dung(); SC.am.nhac(!som && pct >= 65 ? 'vui' : 'buon'); SC.am.sfx(!som && pct >= 65 ? 'dung' : 'nghi'); if (kc) SC.am.noi([{ id: 'ke', text: SC.vo.ketCuc(kc) }]); }
      var hau = (h.hau || []).filter(function (b) { return dung(b, s.co); });
      var cacBai = []; h.chuong.forEach(function (ch) { cacBai = cacBai.concat(ch.bai); });

      box.innerHTML = '<div class="card gm-end" style="--c:' + h.mau + '"><span class="tag warn">' + (som ? 'Kết thúc sớm' : 'Kết cục') + ' · ' + E(h.ten) + '</span>' +
        '<h3>' + E(kc ? kc.ten : 'Kết thúc') + '</h3><p class="gm-nd">' + E(kc ? kc.nd : '') + '</p>' + mauChiSo(h, s.chi) +
        '<p><b>Chất lượng các quyết định: ' + pct + '% ' + sao(pct) + '</b> (' + nTot + '/' + s.nk.length + ' lựa chọn tốt). Em đã mở <b>' + mo + '/' + tong + '</b> kết cục của hành trình này' + (mo < tong ? '; chơi lại và chọn khác đi để mở thêm.' : '. Em đã mở hết!') + '</p>' +
        '<p class="row"><button type="button" class="btn" id="gm-lai">Chơi lại từ đầu</button><button type="button" class="btn alt" id="gm-ds">Về trang hành trình</button></p></div>' +
        (SC.nhom ? SC.nhom.theKetCuc(s.nhom, dsNhom) : '') +
        (SC.hs ? SC.hs.theKetCuc(h.id, dhMoi) : '') +
        (hau.length ? '<div class="card"><h3>Dấu vết em để lại</h3><p class="mute">Những quyết định của em đã để lại hậu quả như sau.</p><ul class="gm-hau">' + hau.map(function (b) { return '<li>' + E(b.nd) + '</li>'; }).join('') + '</ul></div>' : '') +
        hqTongKet() + tongKetBay() + ccTongKet() +
        '<div class="card"><h3>Nhật kí quyết định</h3><p class="mute">Mỗi dòng là một lựa chọn của em, kèm lời bình, lỗi sai, rủi ro và cách tốt hơn nếu có.</p>' + nhatKy(h, s) + '</div>' +
        '<div class="card"><h3>Kiến thức trong hành trình</h3><p class="mute">Bấm để mở lại bài tương ứng trong Kho kiến thức.</p><p class="row">' + nutBai(cacBai) + '</p></div>';
      box.querySelector('#gm-lai').addEventListener('click', function () { chay(box, h, taoMoi(h, 0)); });
      box.querySelector('#gm-ds').addEventListener('click', function () { hub(box, h); window.scrollTo(0, 0); });
      noiBai(box); dauTrang(box);
    }
  }

  // Dùng chung với «Phòng kinh doanh ảo» (lophoc_kdao.js): từ điển bẫy, tên bậc gợi ý, điểm hiệu lực, hàm tiện ích
  SC.gm = { LOAI_BAY: LOAI_BAY, TEN_GY: TEN_GY, NHAN_TOT: NHAN_TOT, MOOD_BAY: MOOD_BAY, hq: hq, sao: sao, kep: kep, tenBai: tenBai, nutBai: nutBai, noiBai: noiBai, dung: dung, mang: mang, toiUu: toiUu, dauTrang: dauTrang };
  SC.lophoc.hanhtrinh = function (box, id) { hub(box, tim(id)); };
  SC.lophoc.phapluat = function (box) { hub(box, tim('phap-luat-quanh-ta')); };
})();
