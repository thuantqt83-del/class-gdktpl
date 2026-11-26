/* Lớp học thông minh · CHƠI NHÓM LUÂN PHIÊN TRÊN MỘT MÁY (giai đoạn A, phần b — 23/11/2026; thiết kế: THIET-KE-LOP-HOC-THONG-MINH-v2.md mục 3.2 số 8). ✅ BẢN NHÁP.
   • Nhóm 2–5 bạn, gọi bằng BIỆT DANH hoặc MÃ (HS01…); KHÔNG nhập họ tên thật (kiểm bằng SC.hs.kiemTen: chặn số điện thoại, email, đường dẫn). Chỉ lưu trên máy này (SC.storage, khoá «nhom»).
   • Mỗi CẢNH (Pháp luật quanh ta) hoặc mỗi THÁNG (Phòng kinh doanh ảo) MỘT bạn làm «người quyết định», lần lượt theo thứ tự; cả nhóm bàn trước.
     Người quyết định = bạn thứ (số cảnh hoặc số tháng đã qua) mod (số bạn) → suy ra từ trạng thái ván (s.nk.length hoặc s.t), nên «Tiếp tục» ván đang lưu vẫn đúng lượt.
     Phòng kinh doanh ảo có 2 quyết định mỗi tháng; xoay theo từng quyết định thì nhóm 2 hoặc 4 bạn luôn có cùng một bạn làm phần điều hành, nên một bạn quyết định cả hai phần của tháng.
   • Đồng hồ bàn bạc là TUỲ CHỌN (30/60/90 giây): chỉ hiển thị đếm ngược, KHÔNG tự chọn thay nhóm, KHÔNG khoá nút.
   • Không đổi chỉ số, cách chấm hay lời bình. Cuối ván có thẻ «Kết quả của nhóm»: ai quyết định cảnh nào, kèm mức chất lượng. KHÔNG xếp hạng, KHÔNG tổng điểm từng bạn.
     Ván nhóm tính vào hồ sơ và danh hiệu của MÁY này (không phải của từng bạn).
   • Hai trò lưu «nhom» = {t: [tên…], d: giây} trong trạng thái ván (đã lọc bằng sach()). Mọi chỗ gọi bọc «SC.nhom &&» để bản đóng gói APP 1 (chưa có file này) vẫn chạy. */
(function () {
  var E = SC.esc, KEY = 'nhom', DONGHO = [0, 30, 60, 90], TOI_THIEU = 2, TOI_DA = 5;
  function doc() {
    var c = SC.storage.get(KEY, null); c = c && typeof c === 'object' ? c : {};
    return { bat: !!c.bat, ten: Array.isArray(c.ten) ? c.ten.map(String) : [], dongHo: DONGHO.indexOf(+c.dongHo) >= 0 ? +c.dongHo : 0 };
  }
  function kiemTenMot(t) {
    if (SC.hs && SC.hs.kiemTen) return SC.hs.kiemTen(t);
    var s = String(t == null ? '' : t).replace(/\s+/g, ' ').trim();
    return s.length >= 2 && s.length <= 16 ? { ok: true, ten: s } : { ok: false, loi: 'Biệt danh cần từ 2 đến 16 ký tự.' };
  }
  // Kiểm danh sách bạn: bỏ ô trống, mỗi tên hợp lệ, không trùng (không phân biệt hoa thường), 2–5 bạn
  function kiemDs(ds) {
    var ra = [], co = {};
    for (var i = 0; i < ds.length; i++) {
      var s = String(ds[i] == null ? '' : ds[i]).trim();
      if (!s) continue;
      var kt = kiemTenMot(s);
      if (!kt.ok) return { ok: false, loi: 'Bạn thứ ' + (i + 1) + ': ' + kt.loi };
      var k = kt.ten.toLowerCase();
      if (co[k]) return { ok: false, loi: 'Hai bạn không được trùng biệt danh hoặc mã («' + kt.ten + '»).' };
      co[k] = true; ra.push(kt.ten);
    }
    if (ra.length < TOI_THIEU || ra.length > TOI_DA) return { ok: false, loi: 'Chơi nhóm cần từ ' + TOI_THIEU + ' đến ' + TOI_DA + ' bạn.' };
    return { ok: true, ten: ra };
  }
  // Lọc «nhom» đọc từ ván đã lưu (hoặc từ cấu hình): trả về {t, d} hợp lệ hoặc null
  function sach(n) {
    if (!n || !Array.isArray(n.t)) return null;
    var kt = kiemDs(n.t.slice(0, TOI_DA)); if (!kt.ok) return null;
    return { t: kt.ten, d: DONGHO.indexOf(+n.d) >= 0 ? +n.d : 0 };
  }
  // Cấu hình nhóm cho ván MỚI: null nếu đang chơi cá nhân
  function dung() { var c = doc(); return c.bat ? sach({ t: c.ten, d: c.dongHo }) : null; }

  // ---------------- Trong ván ----------------
  // Dải «Lượt của …»; so = số quyết định đã đưa ra trước cảnh này
  function luot(nhom, so) {
    if (!nhom || !Array.isArray(nhom.t) || nhom.t.length < TOI_THIEU) return '';
    var n = nhom.t.length, i = Math.max(0, Math.floor(+so || 0));
    return '<div class="gm-luot" data-nhom-d="' + (+nhom.d || 0) + '"><div class="gm-luot-t" role="status"><b>👥 Lượt của: ' + E(nhom.t[i % n]) + '</b>' +
      '<span class="mute">Cả nhóm bàn trước, rồi bạn này bấm chọn. Lượt sau: ' + E(nhom.t[(i + 1) % n]) + '.</span></div>' +
      (nhom.d ? '<span class="gm-luot-dh" aria-hidden="true" data-dh>⏱ ' + (+nhom.d) + ' giây</span>' : '') + '</div>';
  }
  // Bật đồng hồ đếm ngược (nếu có). Tự dừng khi cảnh đã chọn xong hoặc khi dải bị thay (sang cảnh khác)
  function chay(box) {
    var el = box && box.querySelector('.gm-luot'); if (!el) return;
    var d = +el.getAttribute('data-nhom-d') || 0, out = el.querySelector('[data-dh]'); if (!d || !out) return;
    var con = d, h = setInterval(function () {
      if (!document.body.contains(el)) { clearInterval(h); return; }
      if (box.querySelector('.gm-kq .fb')) { out.textContent = '✔ Đã chọn'; clearInterval(h); return; }
      con--;
      if (con > 0) out.textContent = '⏱ ' + con + ' giây';
      else { out.textContent = '⏱ Hết giờ bàn bạc'; el.classList.add('het'); clearInterval(h); }
    }, 1000);
  }

  // ---------------- Thiết lập ở trang giới thiệu của mỗi trò ----------------
  function tomTat() {
    var n = dung();
    return n ? 'Đang chơi <b>nhóm ' + n.t.length + ' bạn</b>: ' + n.t.map(function (x) { return E(x); }).join(', ') + (n.d ? ' · bàn bạc ' + n.d + ' giây mỗi lượt' : '') : 'Đang chơi <b>cá nhân</b>.';
  }
  function formHtml() {
    var c = doc(), o = '', i;
    for (i = 0; i < TOI_DA; i++) o += '<div><label for="nhom-t' + (i + 1) + '">Bạn ' + (i + 1) + (i < TOI_THIEU ? ' (bắt buộc)' : ' (nếu có)') + '</label><input id="nhom-t' + (i + 1) + '" type="text" maxlength="16" autocomplete="off" value="' + E(c.ten[i] || '') + '"></div>';
    var sel = DONGHO.map(function (v) { return '<option value="' + v + '"' + (v === c.dongHo ? ' selected' : '') + '>' + (v ? v + ' giây mỗi lượt' : 'Không đặt đồng hồ') + '</option>'; }).join('');
    return '<form class="gm-hoso-f gm-nhom-f" novalidate><p class="gm-hoso-w">Mỗi cảnh một bạn làm <b>người quyết định</b>, lần lượt theo thứ tự; cả nhóm bàn trước. Chỉ nhập <b>biệt danh hoặc mã</b> (ví dụ HS01). Không nhập họ tên thật, ngày sinh, số điện thoại hay email.</p>' +
      '<div class="gm-nhom-g">' + o + '</div><label for="nhom-dh">Đồng hồ bàn bạc (tùy chọn; chỉ đếm ngược, không tự chọn thay nhóm)</label><select id="nhom-dh">' + sel + '</select>' +
      '<p class="gm-hoso-e" role="alert"></p><p class="row"><button type="submit" class="btn">Lưu và chơi nhóm</button><button type="button" class="btn alt" data-nhom="ca">Chơi cá nhân</button><button type="button" class="btn alt" data-nhom="dong">Đóng</button></p>' +
      '<p class="mute">Áp dụng cho ván mới; ván đang lưu giữ nguyên cách chơi cũ. Nhóm chỉ lưu trên máy này.</p></form>';
  }
  function khungHub() {
    return '<div class="gm-nhom"><p class="gm-nhom-r"><span data-nhom-tom>' + tomTat() + '</span><button type="button" class="btn alt" data-nhom="mo" aria-expanded="false">Thiết lập chơi nhóm</button></p>' +
      '<div class="gm-hoso-p" data-nhom-p hidden>' + formHtml() + '</div></div>';
  }
  function noiHub(box) {
    var p = box.querySelector('[data-nhom-p]'), mo = box.querySelector('[data-nhom="mo"]'); if (!p || !mo) return;
    function dong() { p.setAttribute('hidden', ''); mo.setAttribute('aria-expanded', 'false'); }
    function capNhat() { var t = box.querySelector('[data-nhom-tom]'); if (t) t.innerHTML = tomTat(); }
    mo.addEventListener('click', function () {
      var m = p.hasAttribute('hidden');
      if (m) { p.removeAttribute('hidden'); var i = p.querySelector('#nhom-t1'); if (i) i.focus(); } else p.setAttribute('hidden', '');
      mo.setAttribute('aria-expanded', String(m));
    });
    p.querySelector('[data-nhom="dong"]').addEventListener('click', function () { dong(); mo.focus(); });
    p.querySelector('[data-nhom="ca"]').addEventListener('click', function () { var c = doc(); c.bat = false; SC.storage.set(KEY, c); capNhat(); dong(); mo.focus(); });
    p.querySelector('form').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ds = [], i; for (i = 1; i <= TOI_DA; i++) ds.push(p.querySelector('#nhom-t' + i).value);
      var kt = kiemDs(ds), e = p.querySelector('.gm-hoso-e');
      if (!kt.ok) { e.textContent = kt.loi; return; }
      if (!SC.storage.set(KEY, { bat: true, ten: kt.ten, dongHo: +p.querySelector('#nhom-dh').value || 0 })) { e.textContent = 'Không lưu được trên máy này (trình duyệt đang chặn lưu trữ).'; return; }
      e.textContent = ''; capNhat(); dong(); mo.focus();
    });
  }

  // ---------------- Màn kết cục ----------------
  // ds = danh sách quyết định THEO THỨ TỰ: [{ten, q, l}] (q: 2 tốt, 1 chấp nhận được, 0 còn rủi ro). Người quyết định = bạn (l mod n); không có l thì l = thứ tự i.
  function theKetCuc(nhom, ds) {
    if (!nhom || !Array.isArray(nhom.t) || !ds || !ds.length) return '';
    var n = nhom.t.length, tot = ds.filter(function (x) { return x.q === 2; }).length;
    var dong = ds.map(function (x, i) {
      var nh = x.q === 2 ? ['Lựa chọn tốt', ''] : x.q === 1 ? ['Chấp nhận được', 'warn'] : ['Còn rủi ro', 'warn'];
      return '<li><b>' + E(nhom.t[(x.l != null ? x.l : i) % n]) + '</b> quyết định «' + E(x.ten) + '» <span class="tag ' + nh[1] + '">' + nh[0] + '</span></li>';
    }).join('');
    return '<div class="card gm-nhom-kq"><h3>👥 Kết quả của nhóm</h3><p>Nhóm ' + n + ' bạn (' + nhom.t.map(function (x) { return E(x); }).join(', ') + ') đã đưa ra <b>' + ds.length + '</b> quyết định, trong đó <b>' + tot + '</b> lựa chọn tốt.</p>' +
      '<ol class="gm-log">' + dong + '</ol><p class="mute">Đây là kết quả của <b>cả nhóm</b>, không xếp hạng từng bạn. Ván chơi nhóm được tính vào hồ sơ và danh hiệu của máy này, không phải của từng bạn. Biệt danh hoặc mã chỉ lưu trên máy này.</p></div>';
  }

  SC.nhom = { dung: dung, sach: sach, luot: luot, chay: chay, khungHub: khungHub, noiHub: noiHub, theKetCuc: theKetCuc, kiemDs: kiemDs, doc: doc };
})();
