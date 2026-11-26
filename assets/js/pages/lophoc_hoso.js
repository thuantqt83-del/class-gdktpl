/* Lớp học thông minh · HỒ SƠ NHÂN VẬT và DANH HIỆU (giai đoạn A, phần a — 23/11/2026; thiết kế: THIET-KE-LOP-HOC-THONG-MINH-v2.md mục 3.2 số 9). ✅ BẢN NHÁP.
   • Hồ sơ nhân vật: BIỆT DANH + hình đại diện, chỉ lưu trên máy này (SC.storage, khoá «hosonv»). KHÔNG nhập họ tên thật, ngày sinh, số điện thoại, email:
     kiemTen() chặn chuỗi giống số điện thoại, email, đường dẫn. Không gửi đi đâu, không ghi vào điểm hồ sơ.
   • Danh hiệu: tính từ dữ liệu đã lưu của hai trò (số lần hoàn thành, kết quả tốt nhất, số kết cục đã mở) theo bảng data/game/danh_hieu.js.
     Không xếp hạng giữa học sinh, không tiền thưởng (SKILL.md 15.7).
   • Hai trò gọi SC.hs.xet(id) khi kết thúc ván rồi chèn SC.hs.theKetCuc(id, moi) vào màn kết cục. Mọi chỗ gọi đều bọc «SC.hs &&»
     để bản đóng gói APP 1 (tools/dong_goi_app.js, chưa có file này) vẫn chạy bình thường.
   • Khoá lưu của hai trò phải khớp: lophoc_hanhtrinh.js KEY = 'hanhtrinh' (mỗi hành trình một mục theo id); lophoc_kdao.js KEY = 'kdao'. */
(function () {
  var E = SC.esc, KEY = 'hosonv', KD = 'phong-kinh-doanh-ao';
  function DL() { return (SC.data && SC.data.game && SC.data.game.danh_hieu) || { hinh: [], tro: {} }; }
  function doc() {
    var h = SC.storage.get(KEY, null); h = h && typeof h === 'object' ? h : {};
    if (!h.dh || typeof h.dh !== 'object') h.dh = {};
    return h;
  }
  function ghi(h) { return SC.storage.set(KEY, h); }
  function layHinh(id) {
    var ds = DL().hinh, r = ds.filter(function (x) { return x.id === id; })[0];
    return r || ds[0] || { id: '', e: '🙂', ten: '' };
  }

  // ---------------- Biệt danh ----------------
  // Chỉ chấp nhận biệt danh 2–16 ký tự; chặn chuỗi giống số điện thoại, email, đường dẫn (họ tên thật thì không thể tự phát hiện: nhắc ngay trên màn hình)
  function kiemTen(t) {
    var s = String(t == null ? '' : t).replace(/\s+/g, ' ').trim();
    if (s.length < 2 || s.length > 16) return { ok: false, loi: 'Biệt danh cần từ 2 đến 16 ký tự.' };
    if (/\d{7,}/.test(s.replace(/[\s.\-]/g, ''))) return { ok: false, loi: 'Biệt danh không được giống số điện thoại. Hãy đặt một cái tên vui, không phải số.' };
    if (/[@<>]|https?:|www\./i.test(s)) return { ok: false, loi: 'Biệt danh không được chứa email, đường dẫn hay ký tự đặc biệt (@ < >).' };
    return { ok: true, ten: s };
  }

  // ---------------- Danh hiệu ----------------
  function thongKe(id) {
    var G = (SC.data && SC.data.game) || {}, r = {}, tong = 0;
    if (id === KD) {
      r = SC.storage.get('kdao', null) || {};
      if (G.kdao) tong = G.kdao.ket.length + Object.keys(G.kdao.ket_som).length;
    } else {
      var h = (G.hanhtrinh || []).filter(function (x) { return x.id === id; })[0];
      r = (SC.storage.get('hanhtrinh', null) || {})[id] || {};
      if (h) tong = h.ket.length + Object.keys(h.ket_som).length;
    }
    return { lan: r.lan || 0, tot: r.tot || 0, mo: r.ket ? Object.keys(r.ket).length : 0, tong: tong };
  }
  function dat(dk, tk) { return tk.lan >= (dk.lan || 0) && tk.tot >= (dk.tot || 0) && tk.mo >= (dk.ket || 0); }
  function moTaDk(dk) {
    var p = [];
    if (dk.lan) p.push('hoàn thành ít nhất ' + dk.lan + ' lần');
    if (dk.tot) p.push('kết quả tốt nhất từ ' + dk.tot + '%');
    if (dk.ket) p.push('mở ít nhất ' + dk.ket + ' kết cục');
    return p.join('; ');
  }
  function tomTat(tk) { return 'đã hoàn thành ' + tk.lan + ' lần, kết quả tốt nhất ' + tk.tot + '%, mở ' + tk.mo + (tk.tong ? '/' + tk.tong : '') + ' kết cục'; }
  // Bậc cao nhất đạt được (các bậc xét theo thứ tự, dừng ở bậc đầu tiên chưa đạt)
  function danhHieu(id) {
    var T = (DL().tro[id] || {}).bac || [], tk = thongKe(id), b = 0;
    for (var i = 0; i < T.length; i++) { if (dat(T[i].dk, tk)) b = i + 1; else break; }
    return { bac: b, hien: b ? T[b - 1] : null, tiep: b < T.length ? T[b] : null, tk: tk, tong: T.length };
  }
  // Gọi sau khi trò ĐÃ lưu kết quả ván. Trả về danh hiệu mới (nếu vừa lên bậc) hoặc null. Bậc đã nhận không bao giờ bị hạ.
  function xet(id) {
    var d = danhHieu(id), h = doc(), cu = +h.dh[id] || 0;
    if (d.bac <= cu) return null;
    h.dh[id] = d.bac; ghi(h); lamMoi();
    return { id: id, bac: d.bac, ten: d.hien.ten, nd: d.hien.nd };
  }
  // Thẻ «Danh hiệu» ở màn kết cục (moi = kết quả của xet(), có thể null)
  function theKetCuc(id, moi) {
    var d = danhHieu(id), h = doc(), hinh = layHinh(h.hinh), ten = (DL().tro[id] || {}).ten || '';
    var dong = moi ? '<p><span class="tag warn">Danh hiệu mới</span> <b>«' + E(moi.ten) + '»</b>. ' + E(moi.nd) + '</p>'
      : d.hien ? '<p>Danh hiệu hiện có: <b>«' + E(d.hien.ten) + '»</b>. ' + E(d.hien.nd) + '</p>'
      : '<p>Em chưa có danh hiệu ở trò này.</p>';
    var tiep = d.tiep ? '<p class="mute"><b>Danh hiệu tiếp theo: «' + E(d.tiep.ten) + '».</b> Cần ' + E(moTaDk(d.tiep.dk)) + '. Hiện tại em ' + E(tomTat(d.tk)) + '.</p>'
      : '<p class="mute">Em đã đạt danh hiệu cao nhất của trò này.</p>';
    return '<div class="card gm-dh-card' + (moi ? ' moi' : '') + '"><h3>🏅 Danh hiệu · ' + E(ten) + '</h3>' +
      (h.ten ? '<p class="gm-hoso-nv"><span class="gm-av gm-av-s" aria-hidden="true">' + E(hinh.e) + '</span> <b>' + E(h.ten) + '</b></p>'
        : '<p class="mute">Em chưa đặt biệt danh: bấm «Đặt biệt danh» ở đầu trang để có hồ sơ nhân vật.</p>') +
      dong + tiep + '<p class="mute">Danh hiệu chỉ lưu trên máy này, không xếp hạng giữa học sinh và không tính vào điểm hồ sơ. Tên danh hiệu là bản nháp, chờ giáo viên duyệt.</p></div>';
  }

  // ---------------- Thẻ hồ sơ ở đầu trang Lớp học thông minh ----------------
  // Các trò hiện trong hồ sơ: mặc định cả hai; ứng dụng độc lập chỉ có một trò thì đặt SC.hs.chiTro = ['<id trò>'] (tools/dong_goi_app.js làm việc này)
  function troHienCo() {
    var tat = DL().tro, ds = (SC.hs && SC.hs.chiTro) || null, out = {};
    Object.keys(tat).forEach(function (k) { if (!ds || ds.indexOf(k) >= 0) out[k] = tat[k]; });
    return out;
  }
  function bangDanhHieu() {
    var tro = troHienCo();
    return Object.keys(tro).map(function (id) {
      var d = danhHieu(id);
      return '<h4>' + E(tro[id].ten) + '</h4><p class="mute">Em ' + E(tomTat(d.tk)) + '.</p><ul class="gm-dh-list">' + tro[id].bac.map(function (b, i) {
        var on = i < d.bac;
        return '<li class="' + (on ? 'on' : '') + '"><b>' + (on ? '🏅 ' : '🔒 ') + '«' + E(b.ten) + '»</b> <span class="mute">(' + E(moTaDk(b.dk)) + ')</span><br>' + E(b.nd) + '</li>';
      }).join('') + '</ul>';
    }).join('') + '<p class="mute">Danh hiệu tính từ kết quả đã lưu trên máy này, không xếp hạng giữa học sinh và không tính vào điểm hồ sơ. Tên danh hiệu là bản nháp, chờ giáo viên duyệt.</p>';
  }
  function formHtml(h, hinhId) {
    return '<form class="gm-hoso-f" novalidate><label for="hs-ten">Biệt danh (2–16 ký tự)</label>' +
      '<input id="hs-ten" type="text" maxlength="16" autocomplete="off" value="' + E(h.ten || '') + '" aria-describedby="hs-nhac">' +
      '<p class="gm-hoso-w" id="hs-nhac">Chỉ đặt <b>biệt danh</b>. Không nhập họ tên thật, ngày sinh, số điện thoại hay email. Hồ sơ chỉ lưu trên máy này.</p>' +
      '<div class="gm-hoso-h" role="group" aria-label="Chọn hình đại diện">' + DL().hinh.map(function (x) {
        var on = x.id === hinhId;
        return '<button type="button" class="gm-hinh' + (on ? ' on' : '') + '" data-h="' + E(x.id) + '" aria-pressed="' + on + '" aria-label="' + E(x.ten) + '">' + E(x.e) + '</button>';
      }).join('') + '</div><p class="gm-hoso-e" role="alert"></p>' +
      '<p class="row"><button type="submit" class="btn">Lưu hồ sơ</button><button type="button" class="btn alt" data-hs="huy">Đóng</button></p></form>';
  }
  function ve(el) {
    el = el || (typeof document !== 'undefined' ? document.getElementById('lh-hoso') : null);
    if (!el) return;
    var h = doc(), hinh = layHinh(h.hinh), co = !!h.ten, tro = troHienCo();
    var chips = Object.keys(tro).map(function (id) {
      var d = danhHieu(id);
      return '<span class="tag' + (d.hien ? '' : ' mute-tag') + '">' + E(tro[id].ten) + ': ' + (d.hien ? '🏅 ' + E(d.hien.ten) : 'chưa có danh hiệu') + '</span>';
    }).join('');
    el.innerHTML =
      '<div class="gm-hoso-r"><span class="gm-av" aria-hidden="true">' + E(hinh.e) + '</span>' +
      '<div class="gm-hoso-t"><b>' + (co ? 'Biệt danh: ' + E(h.ten) : 'Em chưa đặt biệt danh') + '</b><span class="mute">Hồ sơ nhân vật chỉ lưu trên máy này, không tính vào điểm hồ sơ.</span><span class="mute" data-hs-st role="status" aria-live="polite"></span></div>' +
      '<div class="gm-hoso-b"><button type="button" class="btn alt" data-hs="sua" aria-expanded="false">' + (co ? 'Sửa hồ sơ' : 'Đặt biệt danh') + '</button>' +
      '<button type="button" class="btn alt" data-hs="dh" aria-expanded="false">Danh hiệu</button></div></div>' +
      '<div class="gm-hoso-dh">' + chips + '</div>' +
      '<div class="gm-hoso-p" data-hs-p="sua" hidden>' + formHtml(h, hinh.id) + '</div>' +
      '<div class="gm-hoso-p" data-hs-p="dh" hidden>' + bangDanhHieu() + '</div>';
    noi(el);
  }
  function lamMoi() { if (typeof document !== 'undefined') ve(document.getElementById('lh-hoso')); }
  function noi(el) {
    var pS = el.querySelector('[data-hs-p="sua"]'), pD = el.querySelector('[data-hs-p="dh"]'), bS = el.querySelector('[data-hs="sua"]'), bD = el.querySelector('[data-hs="dh"]');
    function bat(p, b, q, bq) {   // mở/đóng bảng p; đóng bảng còn lại; trả về true nếu vừa mở
      var mo = p.hasAttribute('hidden');
      q.setAttribute('hidden', ''); bq.setAttribute('aria-expanded', 'false');
      if (mo) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
      b.setAttribute('aria-expanded', String(mo));
      return mo;
    }
    bS.addEventListener('click', function () { if (bat(pS, bS, pD, bD)) { var i = el.querySelector('#hs-ten'); if (i) i.focus(); } });
    bD.addEventListener('click', function () { bat(pD, bD, pS, bS); });
    var huy = el.querySelector('[data-hs="huy"]');
    if (huy) huy.addEventListener('click', function () { pS.setAttribute('hidden', ''); bS.setAttribute('aria-expanded', 'false'); bS.focus(); });
    var hinhChon = layHinh(doc().hinh).id;
    el.querySelectorAll('[data-h]').forEach(function (b) {
      b.addEventListener('click', function () {
        hinhChon = b.getAttribute('data-h');
        el.querySelectorAll('[data-h]').forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); });
      });
    });
    var form = el.querySelector('form');
    if (form) form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var kt = kiemTen(el.querySelector('#hs-ten').value), e = el.querySelector('.gm-hoso-e');
      if (!kt.ok) { e.textContent = kt.loi; return; }
      var h = doc(); h.ten = kt.ten; h.hinh = hinhChon;
      if (!ghi(h)) { e.textContent = 'Không lưu được trên máy này (trình duyệt đang chặn lưu trữ).'; return; }
      ve(el);
      var st = el.querySelector('[data-hs-st]'); if (st) st.textContent = 'Đã lưu hồ sơ.';
    });
  }

  // Dòng «Nội dung soạn và cập nhật ngày …; giáo viên chưa duyệt» ở trang giới thiệu của trò (dữ liệu của trò có cap_nhat và duyet)
  function chanNoiDung(o) {
    if (!o || !o.cap_nhat) return '';
    var da = o.duyet && o.duyet !== 'chưa';
    return '<p class="mute gm-cn">Nội dung soạn và cập nhật ngày ' + E(o.cap_nhat) + '. ' + (da ? 'Giáo viên đã duyệt: ' + E(o.duyet) + '.' : '<b>Giáo viên chưa duyệt</b> (bản nháp).') + '</p>';
  }

  SC.hs = { chiTro: null, ve: ve, lamMoi: lamMoi, kiemTen: kiemTen, thongKe: thongKe, danhHieu: danhHieu, xet: xet, theKetCuc: theKetCuc, chanNoiDung: chanNoiDung, doc: doc };
})();
