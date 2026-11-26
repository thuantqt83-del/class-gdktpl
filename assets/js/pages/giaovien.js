/* Phân hệ 5 — Quản lý dành cho giáo viên (BƯỚC 3). Cần kết nối máy chủ (SC.config) và đăng nhập bằng tài khoản giáo viên.
   Tab: Lớp và mã học sinh · Giao bài · Thống kê (bài giao, học sinh, câu khó, sa sút) · Xuất đề in.
   Học sinh vào lớp bằng TÊN (cô nhập danh sách tên ở tab «Lớp và mã học sinh»; cần chạy _cong-cu/supabase/schema_buoc5.sql một lần) hoặc bằng mã như cũ. Nên dùng tên gọi ở lớp/biệt danh, không họ tên đầy đủ.
   Phiếu mã in ra có cột «họ tên» để cô ghi tay (cách cũ). Đăng nhập giáo viên chỉ cần mật khẩu (xem pages/dangnhap.js).
   Không đăng nhập giáo viên thì trang chỉ giới thiệu (như trước). Quyền truy cập do RLS trên máy chủ bảo đảm, không phải do trang này. */
SC.pages.giaovien = {
  title: 'Quản lý giáo viên',
  tab: 'lop', lopId: null, lops: [], el: null,

  render: function (el) {
    var E = SC.esc, ph = SC.phanhe('giaovien');
    this.el = el;
    if (!(SC.cloud && SC.cloud.laGV())) {
      var ly = !SC.cloud || !SC.cloud.bat()
        ? 'Chưa kết nối máy chủ, nên chưa dùng được các chức năng này. Điền Project URL và anon key vào <code>assets/js/core/config.js</code> theo <code>_cong-cu/supabase/HUONG-DAN-BUOC-1.md</code>.'
        : 'Bạn chưa đăng nhập bằng tài khoản giáo viên. <a href="#/dangnhap">Đăng nhập</a> (tab Giáo viên) để quản lý lớp.';
      el.innerHTML = '<div class="card"><h2>' + E(ph.ten) + '</h2>' +
        '<p>' + ly + '</p><p class="mute">' + E(ph.mota) + '</p><ul>' + ph.muc.map(function (m) { return '<li>' + E(m) + '</li>'; }).join('') + '</ul></div>';
      return;
    }
    this.nap();
  },

  // ---------- tiện ích ----------
  db: function () { return SC.cloud.client(); },
  chay: function (b) { return Promise.resolve(b).then(function (r) { if (r && r.error) throw { thongBao: r.error.message || 'Lỗi máy chủ' }; return r.data; }); },
  loi: function (e) { return (e && e.thongBao) || (e && e.message) || 'Có lỗi.'; },
  lop: function () { var id = this.lopId; return this.lops.filter(function (l) { return l.id === id; })[0] || null; },
  tb: function (m, xau) { var b = this.el.querySelector('#gv-tb'); if (b) { b.textContent = m || ''; b.style.color = xau ? 'var(--bad)' : ''; } },
  f: function (x) { return x == null ? '—' : String(Math.round(x * 100) / 100).replace('.', ','); },
  gio: function (t) { return t ? new Date(t).toLocaleString('vi-VN') : '—'; },
  nd: function () { return this.el.querySelector('#gv-nd'); },
  // tên học sinh theo mã (từ danh sách đã tải ở tab lớp); chưa có tên thì trả mã
  tenMa: function (ma) { var l = this.lop(), d = (l && l._hs) || []; for (var i = 0; i < d.length; i++) if (d[i].ma_hs === ma && d[i].ten) return d[i].ten + ' (' + ma + ')'; return ma; },

  nap: function () {
    var self = this;
    this.el.innerHTML = '<div class="card"><p class="mute">Đang tải danh sách lớp…</p></div>';
    this.db().then(function (c) { return self.chay(c.from('lop').select('id, ten_lop, ma_lop, khoi, nam_hoc, cho_xep_hang, da_dong, hoc_sinh(count)').order('tao_luc', { ascending: false })); })
      .then(function (d) {
        self.lops = d || [];
        if (!self.lops.some(function (l) { return l.id === self.lopId; })) self.lopId = self.lops.length ? self.lops[0].id : null;
        self.ve();
      }).catch(function (e) { self.el.innerHTML = '<div class="card"><p>⚠️ ' + SC.esc(self.loi(e)) + '</p><p class="mute">Nếu thấy «chưa sẵn sàng», cô kiểm đã chạy schema.sql, schema_buoc2.sql và schema_buoc3.sql chưa.</p></div>'; });
  },

  ve: function () {
    var self = this, E = SC.esc, T = this.tab;
    var tabs = [['lop', 'Lớp và mã học sinh'], ['giao', 'Giao bài'], ['thongke', 'Thống kê'], ['in', 'Xuất đề in'], ['de', 'Đề của tôi']];
    var chon = this.lops.length ? '<label for="gv-lop">Lớp đang làm việc</label><select id="gv-lop">' + this.lops.map(function (l) {
      return '<option value="' + E(l.id) + '"' + (l.id === self.lopId ? ' selected' : '') + '>' + E(l.ten_lop) + ' · mã lớp ' + E(l.ma_lop) + (l.da_dong ? ' (đã đóng)' : '') + '</option>';
    }).join('') + '</select>' : '';
    this.el.innerHTML = '<div class="card"><h2>Quản lý dành cho giáo viên</h2><div class="tabs" role="group" aria-label="Chọn chức năng">' +
      tabs.map(function (t) { return '<button type="button" data-t="' + t[0] + '" class="' + (t[0] === T ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') + '</div>' +
      (T === 'lop' || T === 'in' || T === 'de' ? '' : chon) + '<p id="gv-tb" role="status" class="mute"></p></div><div id="gv-nd"></div>';
    this.el.querySelectorAll('[data-t]').forEach(function (b) { b.addEventListener('click', function () { self.tab = b.dataset.t; self.ve(); }); });
    var s = this.el.querySelector('#gv-lop');
    if (s) s.addEventListener('change', function () { self.lopId = s.value; self.ve(); });
    this['tab_' + T]();
    if (this._tbSau) { this.tb(this._tbSau); this._tbSau = null; }
  },

  // Chèn vùng in rồi gọi hộp thoại in của trình duyệt (chỉ phần cần in hiện ra).
  in: function (html) {
    var v = document.getElementById('in-vung');
    if (v) v.remove();
    v = document.createElement('div'); v.id = 'in-vung'; v.innerHTML = html; document.body.appendChild(v);
    document.body.classList.add('dang-in');
    var xong = function () { document.body.classList.remove('dang-in'); var x = document.getElementById('in-vung'); if (x) x.remove(); window.removeEventListener('afterprint', xong); };
    window.addEventListener('afterprint', xong);
    try { window.print(); } catch (e) { xong(); }
  },

  // ---------- TAB 1: lớp và mã học sinh ----------
  tab_lop: function () {
    var self = this, E = SC.esc, lop = this.lop();
    var h = '<div class="card"><h3>Các lớp của cô</h3>';
    if (!this.lops.length) h += '<div class="empty">Chưa có lớp nào. Tạo lớp ở bên dưới.</div>';
    else h += '<table><tr><th>Lớp</th><th>Mã lớp</th><th>Khối</th><th>Năm học</th><th>Số học sinh</th><th></th></tr>' + this.lops.map(function (l) {
      return '<tr' + (l.id === self.lopId ? ' style="font-weight:bold"' : '') + '><td>' + E(l.ten_lop) + (l.da_dong ? ' <span class="tag warn">đã đóng</span>' : '') + '</td><td>' + E(l.ma_lop) + '</td><td>' + E(l.khoi) + '</td><td>' + E(l.nam_hoc) + '</td><td>' + ((l.hoc_sinh && l.hoc_sinh[0] && l.hoc_sinh[0].count) || 0) + '</td><td><button class="btn alt" type="button" data-chon="' + E(l.id) + '">Chọn</button></td></tr>';
    }).join('') + '</table>';
    h += '<h3>Tạo lớp mới</h3><form id="f-tao" novalidate><label for="t-ten">Tên lớp</label><input id="t-ten" maxlength="40" placeholder="ví dụ: 12A3" autocomplete="off">' +
      '<label for="t-khoi">Khối</label><select id="t-khoi"><option>10</option><option>11</option><option selected>12</option></select>' +
      '<label for="t-nam">Năm học</label><input id="t-nam" maxlength="9" value="2026-2027" autocomplete="off"><p><button class="btn" type="submit">Tạo lớp</button></p></form></div>';
    h += this.theDanhSach(lop);
    if (lop) h +='<div class="card" id="lop-chon"><h3>Lớp ' + E(lop.ten_lop) + '</h3><p>Mã lớp để học sinh nhập: <b style="font-size:1.4rem;letter-spacing:2px">' + E(lop.ma_lop) + '</b></p>' +
      '<p><label style="display:inline"><input type="checkbox" id="l-xh" style="width:auto"' + (lop.cho_xep_hang ? ' checked' : '') + '> Cho học sinh xem xếp hạng trong lớp (hiện theo mã học sinh)</label></p>' +
      '<p><button class="btn alt" type="button" id="l-dong">' + (lop.da_dong ? 'Mở lại lớp' : 'Đóng lớp') + '</button> <button class="btn alt" type="button" id="l-xoa">Xoá lớp…</button></p>' +
      '<p class="mute">Đóng lớp: học sinh không vào được bằng mã nữa nhưng dữ liệu còn. Xoá lớp: xoá HẲN lớp, học sinh, lượt làm và câu trả lời, không hoàn tác.</p>' +
      '<h3>Học sinh vào lớp bằng tên</h3><form id="f-ten" novalidate><label for="s-ten">Danh sách tên học sinh (mỗi dòng một tên; tối đa 60 tên mỗi lần, 100 học sinh mỗi lớp)</label><textarea id="s-ten" rows="6" autocomplete="off" spellcheck="false" placeholder="Lan&#10;Minh Anh&#10;Tuấn B"></textarea><p><button class="btn" type="submit">Thêm tên</button></p></form>' +
      '<p class="mute">Học sinh vào lớp bằng cách gõ đúng tên ở trang Đăng nhập (có dấu hay không dấu đều được). Dùng họ tên đầy đủ (nhập từ Excel) hoặc tên gọi ở lớp đều được, miễn là học sinh biết gõ đúng như trong danh sách; hai bạn cùng tên trong lớp thì thêm chữ cái để phân biệt (ví dụ «Lan A», «Lan B»). Tên lưu trên máy chủ của cô; chỉ cô và chính bạn đó xem được (xếp hạng và đấu trường vẫn chỉ hiện mã). Một tên chỉ dùng ở một máy: đổi máy thì bấm «Cho đăng nhập lại».</p>' +
      '<h3>Mã học sinh (cách cũ)</h3><form id="f-sinh" novalidate><label for="s-so">Sinh thêm mã (1–60 mỗi lần; tối đa 100 mã/lớp)</label><input id="s-so" type="number" min="1" max="60" value="30"><p><button class="btn" type="submit">Sinh mã</button> <button class="btn alt" type="button" id="l-in">In phiếu mã cả lớp</button></p></form>' +
      '<p class="mute">Phiếu mã có cột «họ tên» để cô ghi tay; hệ thống chỉ lưu mã, không lưu tên.</p><div id="ds-hs"><p class="mute">Đang tải danh sách mã…</p></div></div>';
    this.nd().innerHTML = h;
    var nd = this.nd();
    nd.querySelectorAll('[data-chon]').forEach(function (b) { b.addEventListener('click', function () { self.lopId = b.dataset.chon; self.ve(); }); });
    nd.querySelector('#f-tao').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ten = nd.querySelector('#t-ten').value.trim();
      if (!ten) { self.tb('Nhập tên lớp.', true); return; }
      self.tb('Đang tạo lớp…');
      SC.cloud.goi('tao_lop', { p_ten: ten, p_khoi: +nd.querySelector('#t-khoi').value, p_nam_hoc: nd.querySelector('#t-nam').value.trim() }).then(function (d) {
        if (!d || !d.ok) { self.tb('Không tạo được lớp: ' + ((d && d.ly_do) === 'khong_phai_giao_vien' ? 'tài khoản này chưa được cấp quyền giáo viên.' : ((d && d.ly_do) || 'lỗi')), true); return; }
        self.lopId = d.id; self.nap();
      }).catch(function (e) { self.tb(self.loi(e), true); });
    });
    nd.querySelector('#x-nhap').addEventListener('click', function () { nd.querySelector('#x-tep').click(); });
    nd.querySelector('#x-tep').addEventListener('change', function (ev) { var f = ev.target.files && ev.target.files[0]; ev.target.value = ''; if (f) self.docExcel(f); });
    nd.querySelector('#x-xoa').addEventListener('click', function () { self.xoaDanhSach(lop); });
    if (!lop) return;
    nd.querySelector('#l-xh').addEventListener('change', function (ev) {
      var bat = ev.target.checked;
      self.db().then(function (c) { return self.chay(c.from('lop').update({ cho_xep_hang: bat }).eq('id', lop.id)); })
        .then(function () { lop.cho_xep_hang = bat; self.tb('Đã ' + (bat ? 'bật' : 'tắt') + ' xếp hạng cho lớp ' + lop.ten_lop + '.'); }).catch(function (e) { self.tb(self.loi(e), true); });
    });
    nd.querySelector('#l-dong').addEventListener('click', function () {
      self.db().then(function (c) { return self.chay(c.from('lop').update({ da_dong: !lop.da_dong }).eq('id', lop.id)); }).then(function () { self.nap(); }).catch(function (e) { self.tb(self.loi(e), true); });
    });
    nd.querySelector('#l-xoa').addEventListener('click', function () {
      var x = window.prompt('XOÁ HẲN lớp «' + lop.ten_lop + '» cùng toàn bộ học sinh, lượt làm và câu trả lời?\nKhông hoàn tác được. Gõ đúng tên lớp để xác nhận:');
      if (x === null) return;
      if (x.trim() !== lop.ten_lop) { self.tb('Tên lớp gõ chưa đúng — chưa xoá gì.', true); return; }
      self.db().then(function (c) { return self.chay(c.from('lop').delete().eq('id', lop.id)); }).then(function () { self.lopId = null; self.nap(); }).catch(function (e) { self.tb(self.loi(e), true); });
    });
    nd.querySelector('#f-sinh').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var so = parseInt(nd.querySelector('#s-so').value, 10);
      if (!(so >= 1 && so <= 60)) { self.tb('Số mã mỗi lần từ 1 đến 60.', true); return; }
      self.tb('Đang sinh mã…');
      SC.cloud.goi('sinh_ma_hoc_sinh', { p_lop: lop.id, p_so: so }).then(function (d) {
        if (!d || !d.ok) { self.tb('Không sinh được mã: ' + (({ lop_day: 'lớp đã đủ 100 mã.', so_luong_khong_hop_le: 'số lượng không hợp lệ.' })[d && d.ly_do] || (d && d.ly_do) || 'lỗi'), true); return; }
        self.tb('Đã sinh ' + d.ma_hs.length + ' mã mới.'); self.veHS(lop);
      }).catch(function (e) { self.tb(self.loi(e), true); });
    });
    nd.querySelector('#f-ten').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ds = nd.querySelector('#s-ten').value.split(/\r?\n/).map(function (x) { return x.replace(/\s+/g, ' ').trim(); }).filter(Boolean);
      if (!ds.length) { self.tb('Nhập ít nhất một tên (mỗi dòng một tên).', true); return; }
      if (ds.length > 60) { self.tb('Mỗi lần tối đa 60 tên.', true); return; }
      self.tb('Đang thêm tên…');
      SC.cloud.goi('them_hoc_sinh_theo_ten', { p_lop: lop.id, p_ten: ds }).then(function (d) {
        if (!d || !d.ok) { self.tb('Không thêm được: ' + (({ lop_day: 'lớp đã đủ 100 học sinh.', so_luong_khong_hop_le: 'số lượng không hợp lệ.', chua_co_ten: 'chưa có tên nào.', khong_phai_lop_cua_ban: 'đây không phải lớp của cô.' })[d && d.ly_do] || (d && d.ly_do) || 'lỗi'), true); return; }
        nd.querySelector('#s-ten').value = '';
        self.tb('Đã thêm ' + d.them + ' tên.' + (d.bo_qua && d.bo_qua.length ? ' Bỏ qua (trùng tên trong lớp hoặc không hợp lệ): ' + d.bo_qua.join(', ') + '.' : '')); self.veHS(lop);
      }).catch(function (e) { self.tb(/Could not find the function|schema cache/i.test(self.loi(e)) ? 'Máy chủ chưa có chức năng nhập tên: chạy schema_buoc5.sql theo HUONG-DAN-DANG-NHAP.md.' : self.loi(e), true); });
    });
    nd.querySelector('#l-in').addEventListener('click', function () { self.inPhieuMa(lop); });
    this.veHS(lop);
  },

  veHS: function (lop) {
    var self = this, E = SC.esc, box = this.nd().querySelector('#ds-hs');
    if (!box) return;
    this.db().then(function (c) { return self.chay(Promise.resolve(c.from('hoc_sinh').select('id, ma_hs, ten, auth_uid, cho_dang_nhap_lai, lan_cuoi_vao').eq('lop_id', lop.id).order('ma_hs')).then(function (x) { return x && x.error ? c.from('hoc_sinh').select('id, ma_hs, auth_uid, cho_dang_nhap_lai, lan_cuoi_vao').eq('lop_id', lop.id).order('ma_hs') : x; })); }).then(function (d) {
      d = d || [];
      lop._hs = d;
      if (!d.length) { box.innerHTML = '<div class="empty">Chưa có học sinh nào. Thêm tên hoặc bấm «Sinh mã».</div>'; return; }
      box.innerHTML = '<table><tr><th>Tên</th><th>Mã</th><th>Trạng thái</th><th>Lần vào cuối</th><th></th></tr>' + d.map(function (h) {
        var tt = h.cho_dang_nhap_lai ? '<span class="tag warn">đang cho đăng nhập lại</span>' : (h.auth_uid ? '<span class="tag">đã nhận mã ở một máy</span>' : '<span class="tag warn">chưa ai dùng</span>');
        return '<tr><td><b>' + E(h.ten || '—') + '</b></td><td>' + E(h.ma_hs) + '</td><td>' + tt + '</td><td>' + E(self.gio(h.lan_cuoi_vao)) + '</td><td>' +
          (h.auth_uid && !h.cho_dang_nhap_lai ? '<button class="btn alt" type="button" data-lai="' + E(h.id) + '">Cho đăng nhập lại</button> ' : '') +
          '<button class="btn alt" type="button" data-xoa-hs="' + E(h.id) + '" data-ma="' + E(h.ten || h.ma_hs) + '">Xoá</button></td></tr>';
      }).join('') + '</table>';
      box.querySelectorAll('[data-lai]').forEach(function (b) { b.addEventListener('click', function () {
        self.db().then(function (c) { return self.chay(c.from('hoc_sinh').update({ cho_dang_nhap_lai: true }).eq('id', b.dataset.lai)); }).then(function () { self.tb('Đã cho phép mã này đăng nhập lại ở máy mới (một lần).'); self.veHS(lop); }).catch(function (e) { self.tb(self.loi(e), true); });
      }); });
      box.querySelectorAll('[data-xoa-hs]').forEach(function (b) { b.addEventListener('click', function () {
        if (!window.confirm('Xoá học sinh «' + b.dataset.ma + '» cùng toàn bộ kết quả? Không hoàn tác được.')) return;
        self.db().then(function (c) { return self.chay(c.from('hoc_sinh').delete().eq('id', b.dataset.xoaHs)); }).then(function () { self.nap(); }).catch(function (e) { self.tb(self.loi(e), true); });
      }); });
    }).catch(function (e) { box.innerHTML = '<p>⚠️ ' + E(self.loi(e)) + '</p>'; });
  },

  // ---------- nhập / xóa danh sách học sinh (dùng được nhiều lần) ----------
  theDanhSach: function (lop) {
    var E = SC.esc, n = lop ? ((lop.hoc_sinh && lop.hoc_sinh[0] && lop.hoc_sinh[0].count) || 0) : 0;
    return '<div class="card" id="x-the"><h3>Nhập và xóa danh sách học sinh</h3>' +
      '<p class="mute">Nhập từ file Excel (.xls, .xlsx) hoặc .csv có cột «Họ và tên» (hoặc hai cột «Họ đệm» và «Tên»); mỗi sheet là một lớp. App chỉ lấy họ tên, không lấy mã học sinh, ngày sinh hay điểm. File được đọc ngay trên máy cô, không gửi đi đâu; chỉ danh sách tên được lưu lên máy chủ của cô. Dùng nhiều lần được: tên đã có trong lớp thì bỏ qua.</p>' +
      '<p><button class="btn" type="button" id="x-nhap">Nhập danh sách từ Excel…</button> ' +
      '<button class="btn alt" type="button" id="x-xoa"' + (lop && n ? '' : ' disabled') + '>' + (lop ? 'Xóa danh sách lớp ' + E(lop.ten_lop) + ' (' + n + ' học sinh)…' : 'Xóa danh sách…') + '</button>' +
      '<input type="file" id="x-tep" accept=".xls,.xlsx,.csv,.txt" hidden></p><div id="x-xem"></div></div>';
  },

  chuanLop: function (s) { return String(s || '').replace(/\s+/g, '').toUpperCase(); },
  lopCoSan: function (ten) {
    var self = this, k = this.chuanLop(ten);
    return this.lops.filter(function (l) { return self.chuanLop(l.ten_lop) === k; })[0] || null;
  },
  loiTen: function (e) { return /Could not find the function|schema cache/i.test(this.loi(e)) ? 'Máy chủ chưa có chức năng nhập tên: chạy schema_buoc5.sql theo HUONG-DAN-DANG-NHAP.md.' : this.loi(e); },

  // Đọc tệp Excel/CSV cô chọn (ngay trên trình duyệt), rồi cho cô xem trước từng lớp trước khi nhập.
  docExcel: function (f) {
    var self = this;
    if (!SC.bangtinh) { this.tb('Chưa nạp được bộ đọc Excel. Tải lại trang rồi thử lại.', true); return; }
    if (f.size > 8 * 1024 * 1024) { this.tb('Tệp lớn quá (tối đa 8 MB).', true); return; }
    this.tb('Đang đọc ' + f.name + '…');
    var rd = new FileReader();
    rd.onerror = function () { self.tb('Không mở được tệp này.', true); };
    rd.onload = function () {
      SC.bangtinh.docTep(rd.result, f.name).then(function (sheets) { self.xemExcel(SC.bangtinh.timDanhSach(sheets), f.name); })
        .catch(function (e) { self.tb('Không đọc được tệp: ' + self.loi(e), true); });
    };
    rd.readAsArrayBuffer(f);
  },

  tinhTrangX: function (x) {
    var ten = String(x.lop || '').trim(), kh = /^(1[0-2])/.exec(this.chuanLop(ten));
    if (!ten) return { ok: false, tx: 'Chưa có tên lớp: gõ vào ô bên trái (ví dụ 10A7).' };
    if (ten.length > 40) return { ok: false, tx: 'Tên lớp dài quá (tối đa 40 ký tự).' };
    var co = this.lopCoSan(ten);
    if (co) return { ok: true, tx: 'Lớp đã có (' + ((co.hoc_sinh && co.hoc_sinh[0] && co.hoc_sinh[0].count) || 0) + ' học sinh): thêm tên mới, tên trùng được bỏ qua.' };
    if (!kh) return { ok: false, tx: 'Không đoán được khối: sửa tên lớp thành dạng 10A1, 11B2, 12A3.' };
    return { ok: true, tx: 'Sẽ tạo lớp mới (khối ' + kh[1] + ').' };
  },

  xemExcel: function (ds, tenTep) {
    var self = this, E = SC.esc, box = this.nd().querySelector('#x-xem'), thay = {};
    if (!ds.length) {
      box.innerHTML = '<p>⚠️ Không thấy bảng có cột «Họ và tên» (hoặc «Họ đệm» + «Tên») trong tệp ' + E(tenTep) + '. Kiểm dòng tiêu đề của bảng rồi thử lại, hoặc dán tên vào ô nhập tay ở dưới.</p>';
      this.tb(''); return;
    }
    this._xl = ds.map(function (d) {
      var k = self.chuanLop(d.lop), trung = !!(k && thay[k]); if (k) thay[k] = true;
      return { lop: d.lop, ten: d.ten, sheet: d.sheet, bo_qua: d.bo_qua, doi: d.doi || [], chon: !trung, trung: trung };
    });
    var namMau = (this.nd().querySelector('#t-nam') || {}).value || '2026-2027';
    box.innerHTML = '<h4>Xem trước: ' + E(tenTep) + '</h4>' +
      '<table><tr><th></th><th>Lớp</th><th>Sheet</th><th>Số tên</th><th>Tình trạng</th></tr>' + this._xl.map(function (x, i) {
        return '<tr><td><input type="checkbox" data-xc="' + i + '" style="width:auto"' + (x.chon ? ' checked' : '') + ' aria-label="Nhập sheet ' + E(x.sheet) + '"></td>' +
          '<td><input data-xl="' + i + '" value="' + E(x.lop) + '" maxlength="40" style="width:7em" aria-label="Tên lớp của sheet ' + E(x.sheet) + '"></td>' +
          '<td>' + E(x.sheet) + '</td><td>' + x.ten.length + (x.bo_qua ? ' <span class="mute">(bỏ ' + x.bo_qua + ' tên quá dài)</span>' : '') + (x.doi.length ? '<br><span class="mute">Trùng họ tên trong lớp, thêm số để phân biệt: ' + E(x.doi.join('; ')) + '</span>' : '') + '<br><span class="mute">' + E(x.ten.slice(0, 2).join(', ')) + '…</span></td>' +
          '<td id="x-tt-' + i + '"></td></tr>';
      }).join('') + '</table>' +
      '<p><label for="x-nam" style="display:inline">Năm học cho lớp mới</label> <input id="x-nam" maxlength="9" value="' + E(namMau) + '" style="width:7em" autocomplete="off"></p>' +
      '<p class="mute">Tích chọn các lớp muốn nhập. Sheet trùng lớp với một sheet ở trên được bỏ tích sẵn. Chỉ tên được gửi lên máy chủ.</p>' +
      '<p><button class="btn" type="button" id="x-ok">Nhập</button> <button class="btn alt" type="button" id="x-huy">Hủy</button></p>';
    var lamMoi = function () {
      var n = 0, t = 0;
      self._xl.forEach(function (x, i) {
        var st = self.tinhTrangX(x), c = box.querySelector('#x-tt-' + i);
        c.textContent = (x.chon ? '' : 'Không nhập. ') + st.tx; c.style.color = st.ok ? '' : 'var(--bad)';
        if (x.chon && st.ok) { n++; t += x.ten.length; }
      });
      var b = box.querySelector('#x-ok'); b.disabled = !n; b.textContent = n ? 'Nhập ' + t + ' tên vào ' + n + ' lớp' : 'Chọn ít nhất một lớp hợp lệ';
    };
    box.querySelectorAll('[data-xc]').forEach(function (c) { c.addEventListener('change', function () { self._xl[+c.dataset.xc].chon = c.checked; lamMoi(); }); });
    box.querySelectorAll('[data-xl]').forEach(function (c) { c.addEventListener('input', function () { self._xl[+c.dataset.xl].lop = c.value; lamMoi(); }); });
    box.querySelector('#x-huy').addEventListener('click', function () { self._xl = null; box.innerHTML = ''; self.tb(''); });
    box.querySelector('#x-ok').addEventListener('click', function () { self.nhapExcel(); });
    lamMoi(); this.tb('Đã đọc ' + tenTep + ': xem trước rồi bấm Nhập.');
  },

  // Tạo lớp (nếu chưa có) rồi thêm tên, mỗi lần gọi máy chủ tối đa 60 tên (giới hạn của hàm).
  nhapExcel: function () {
    var self = this, box = this.nd().querySelector('#x-xem'), rows = (this._xl || []).filter(function (x) { return x.chon && self.tinhTrangX(x).ok; });
    if (!rows.length || this._dangNhap) return;
    var nam = (box.querySelector('#x-nam').value || '').trim() || '2026-2027', tong = { them: 0, bo: 0, tao: 0, hong: [] }, dau = null;
    this._dangNhap = true; box.querySelector('#x-ok').disabled = true;
    var xong = function () { self._dangNhap = false; };
    var lop1 = function (i) {
      if (i >= rows.length) return Promise.resolve();
      var x = rows[i], ten = x.lop.trim(), kh = +/^(1[0-2])/.exec(self.chuanLop(ten))[1];
      self.tb('Đang nhập lớp ' + ten + ' (' + (i + 1) + '/' + rows.length + ')…');
      var co = self.lopCoSan(ten);
      var p = co ? Promise.resolve(co.id) : SC.cloud.goi('tao_lop', { p_ten: ten, p_khoi: kh, p_nam_hoc: nam }).then(function (d) {
        if (!d || !d.ok) throw { thongBao: 'không tạo được lớp ' + ten + ((d && d.ly_do) === 'khong_phai_giao_vien' ? ': tài khoản này chưa được cấp quyền giáo viên.' : ((d && d.ly_do) ? ' (' + d.ly_do + ')' : '.')) };
        tong.tao++; self.lops.push({ id: d.id, ten_lop: ten, ma_lop: d.ma_lop, khoi: kh, nam_hoc: nam, hoc_sinh: [{ count: 0 }] });
        return d.id;
      });
      return p.then(function (idLop) {
        if (dau === null) dau = idLop;
        var phan = function (k) {
          if (k >= x.ten.length) return Promise.resolve();
          return SC.cloud.goi('them_hoc_sinh_theo_ten', { p_lop: idLop, p_ten: x.ten.slice(k, k + 60) }).then(function (d) {
            if (!d || !d.ok) { tong.hong.push(ten + ': ' + (({ lop_day: 'lớp đã đủ 100 học sinh', so_luong_khong_hop_le: 'số lượng không hợp lệ', khong_phai_lop_cua_ban: 'không phải lớp của cô' })[d && d.ly_do] || (d && d.ly_do) || 'lỗi')); if (d && d.them) tong.them += d.them; return; }
            tong.them += d.them; tong.bo += (d.bo_qua || []).length;
            return phan(k + 60);
          });
        };
        return phan(0);
      }).then(function () { return lop1(i + 1); });
    };
    lop1(0).then(function () {
      xong();
      self._tbSau = 'Đã nhập ' + tong.them + ' tên' + (tong.tao ? ', tạo ' + tong.tao + ' lớp mới' : '') + '; bỏ qua ' + tong.bo + ' tên đã có sẵn trong lớp.' + (tong.hong.length ? ' Chưa nhập hết: ' + tong.hong.join('; ') + '.' : '');
      if (dau) self.lopId = dau;
      self._xl = null; self.nap();
    }).catch(function (e) {
      xong();
      if (tong.them || tong.tao) { self._tbSau = 'Dừng giữa chừng: ' + self.loiTen(e) + ' (đã nhập ' + tong.them + ' tên, tạo ' + tong.tao + ' lớp).'; self.nap(); }
      else { box.querySelector('#x-ok').disabled = false; self.tb(self.loiTen(e), true); }
    });
  },

  // Xóa HẾT học sinh của lớp đang chọn (lớp và mã lớp giữ nguyên) để nhập lại danh sách mới.
  xoaDanhSach: function (lop) {
    var self = this;
    if (!lop) { this.tb('Chọn một lớp trước (bấm «Chọn» ở bảng các lớp).', true); return; }
    var n = (lop.hoc_sinh && lop.hoc_sinh[0] && lop.hoc_sinh[0].count) || 0;
    if (!n) { this.tb('Lớp ' + lop.ten_lop + ' chưa có học sinh nào để xóa.', true); return; }
    var x = window.prompt('XÓA DANH SÁCH: ' + n + ' học sinh của lớp «' + lop.ten_lop + '» cùng toàn bộ kết quả học tập của các em sẽ bị xóa HẲN. Lớp và mã lớp vẫn còn. Không hoàn tác được.\nGõ đúng tên lớp để xác nhận:');
    if (x === null) return;
    if (x.trim() !== lop.ten_lop) { this.tb('Tên lớp gõ chưa đúng — chưa xóa gì.', true); return; }
    this.tb('Đang xóa danh sách…');
    this.db().then(function (c) { return self.chay(c.from('hoc_sinh').delete().eq('lop_id', lop.id)); })
      .then(function () { self._tbSau = 'Đã xóa danh sách ' + n + ' học sinh của lớp ' + lop.ten_lop + '. Có thể nhập danh sách mới.'; self.nap(); })
      .catch(function (e) { self.tb(self.loi(e), true); });
  },

  inPhieuMa: function (lop) {
    var E = SC.esc, d = lop._hs || [];
    if (!d.length) { this.tb('Chưa có mã nào để in.', true); return; }
    this.in('<div class="in-de"><h2>Phiếu mã vào lớp ' + E(lop.ten_lop) + ' — năm học ' + E(lop.nam_hoc) + '</h2>' +
      '<p>Mở app → <b>Đăng nhập</b> → tab <b>Học sinh</b> → nhập <b>Mã lớp</b> <b>' + E(lop.ma_lop) + '</b> và <b>Mã học sinh</b> của em. Không nhập tên thật vào app. Giữ kín mã của mình.</p>' +
      '<table style="width:100%;border-collapse:collapse"><tr><th style="border:1px solid #000;padding:4px">STT</th><th style="border:1px solid #000;padding:4px">Mã học sinh</th><th style="border:1px solid #000;padding:4px">Họ và tên (cô ghi tay)</th></tr>' +
      d.map(function (h, i) { return '<tr><td style="border:1px solid #000;padding:6px">' + (i + 1) + '</td><td style="border:1px solid #000;padding:6px"><b>' + E(h.ma_hs) + '</b></td><td style="border:1px solid #000;padding:6px">&nbsp;</td></tr>'; }).join('') +
      '</table><p style="font-size:.85em">Giáo viên giữ phiếu này; cắt từng dòng phát cho học sinh.</p></div>');
  },

  // ---------- TAB 2: giao bài ----------
  tab_giao: function () {
    var self = this, E = SC.esc, lop = this.lop(), nd = this.nd();
    if (!lop) { nd.innerHTML = '<div class="card"><div class="empty">Chưa có lớp. Tạo lớp ở tab «Lớp và mã học sinh».</div></div>'; return; }
    var optDe = '';
    var nhomHienTai = '';
    SC.pages.de.tatCa().forEach(function (x) {
      if (x.nhom !== nhomHienTai) { if (nhomHienTai) optDe += '</optgroup>'; optDe += '<optgroup label="' + E(x.nhom) + '">'; nhomHienTai = x.nhom; }
      optDe += '<option value="' + E(x.d.id) + '">' + E(SC.tenBo(x.d.ten)) + '</option>';
    });
    optDe += '</optgroup>';
    var optBai = '';
    SC.data.curriculum.muc.forEach(function (m) { m.bai.forEach(function (b) {
      var n = SC.questions.filter({ bai: b.id }).filter(function (q) { return q.dang === 'tn4' || q.dang === 'dung_sai'; }).length;
      if (n >= 5) optBai += '<option value="' + E(b.id) + '">Lớp ' + m.khoi + ' · Bài ' + b.so + '. ' + E(b.ten) + ' (' + n + ' câu)</option>';
    }); });
    nd.innerHTML = '<div class="card"><h3>Giao bài cho lớp ' + E(lop.ten_lop) + '</h3><form id="f-giao" novalidate>' +
      '<label for="g-loai">Loại bài</label><select id="g-loai"><option value="de">Đề thi thử (bấm giờ)</option><option value="bai">Luyện tập theo bài</option></select>' +
      '<div id="g-de-box"><label for="g-de">Đề</label><select id="g-de">' + optDe + '</select></div>' +
      '<div id="g-bai-box" hidden><label for="g-bai">Bài</label><select id="g-bai">' + optBai + '</select><label for="g-socau">Số câu mỗi lượt</label><input id="g-socau" type="number" min="5" max="30" value="10"><p><label style="display:inline"><input type="checkbox" id="g-goiy" style="width:auto"> Cho học sinh dùng gợi ý khi làm</label></p></div>' +
      '<label for="g-mo">Mở lúc</label><input id="g-mo" type="datetime-local">' +
      '<label for="g-han">Hạn nộp (để trống = không có hạn)</label><input id="g-han" type="datetime-local">' +
      '<label for="g-luot">Số lượt làm tối đa</label><select id="g-luot"><option>1</option><option>2</option><option>3</option><option>5</option></select>' +
      '<label for="g-dapan">Cho xem đáp án</label><select id="g-dapan"><option value="sau_han">Sau hạn nộp</option><option value="ngay">Ngay khi nộp</option><option value="khong">Không cho xem</option></select>' +
      '<p><button class="btn" type="submit">Giao bài</button></p></form></div><div class="card" id="g-ds"><p class="mute">Đang tải các bài đã giao…</p></div>';
    var loai = nd.querySelector('#g-loai');
    var mo = nd.querySelector('#g-mo'), pad = function (n) { return (n < 10 ? '0' : '') + n; }, now = new Date();
    mo.value = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + 'T' + pad(now.getHours()) + ':' + pad(now.getMinutes());
    loai.addEventListener('change', function () {
      nd.querySelector('#g-de-box').hidden = loai.value !== 'de'; nd.querySelector('#g-bai-box').hidden = loai.value !== 'bai';
    });
    nd.querySelector('#f-giao').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var l = loai.value, ma = nd.querySelector(l === 'de' ? '#g-de' : '#g-bai').value;
      if (!ma) { self.tb('Chưa chọn ' + (l === 'de' ? 'đề.' : 'bài.'), true); return; }
      var han = nd.querySelector('#g-han').value, moLuc = nd.querySelector('#g-mo').value;
      if (han && moLuc && new Date(han) <= new Date(moLuc)) { self.tb('Hạn nộp phải sau giờ mở.', true); return; }
      var tieuDe, thang = '764';
      if (l === 'de') { var d = SC.pages.de.timDe(ma), xm = self.timXb(ma); tieuDe = d ? SC.tenBo(d.ten) : (xm ? xm.ten : ma); if (d && d.loai === 'hsg') thang = 'hsg20'; }
      else { tieuDe = nd.querySelector('#g-bai').selectedOptions[0].textContent.replace(/\s*\(\d+ câu\)$/, ''); }
      var soCau = null;
      if (l === 'bai') {
        var kha = SC.questions.filter({ bai: ma }).filter(function (q) { return q.dang === 'tn4' || q.dang === 'dung_sai'; }).length;
        soCau = Math.max(5, Math.min(30, parseInt(nd.querySelector('#g-socau').value, 10) || 10));
        if (soCau > kha) { self.tb('Bài này chỉ có ' + kha + ' câu dùng được; đặt số câu = ' + kha + '.'); soCau = kha; }
      }
      var dong = { lop_id: lop.id, loai: l, ma_de: ma, tieu_de: tieuDe, mo_luc: moLuc ? new Date(moLuc).toISOString() : new Date().toISOString(), han_nop: han ? new Date(han).toISOString() : null,
        so_luot_toi_da: +nd.querySelector('#g-luot').value, cho_goi_y: l === 'bai' && nd.querySelector('#g-goiy').checked, hien_dap_an: nd.querySelector('#g-dapan').value, thang_diem: thang,
        so_cau: soCau };
      self.tb('Đang giao bài…');
      self.db().then(function (c) { return self.chay(c.from('bai_giao').insert(dong)); }).then(function () { self.tb('Đã giao bài «' + tieuDe + '».'); self.veBaiGiao(lop); }).catch(function (e) { self.tb(self.loi(e), true); });
    });
    // «Đề của tôi» đã đưa lên máy chủ: thêm nhóm vào ô chọn đề (lên đầu)
    var themXb = function () {
      var sel = nd.querySelector('#g-de'); if (!sel) return;
      var cu = sel.querySelector('optgroup[data-xb]'); if (cu) cu.remove();
      if (!(self._xb && self._xb.length)) return;
      var og = document.createElement('optgroup'); og.label = 'Đề của tôi (đã đưa lên máy chủ)'; og.setAttribute('data-xb', '1');
      self._xb.forEach(function (x) { var o = document.createElement('option'); o.value = x.ma_de; o.textContent = x.ten + ' · ' + x.so_cau + ' câu'; og.appendChild(o); });
      sel.insertBefore(og, sel.firstChild); sel.value = sel.options[0] ? sel.options[0].value : '';
    };
    if (this._xb === null) this.napXb().then(themXb, function () { self._xb = []; }); else themXb();
    this.veBaiGiao(lop);
  },

  veBaiGiao: function (lop) {
    var self = this, E = SC.esc, box = this.nd().querySelector('#g-ds');
    if (!box) return;
    this.db().then(function (c) {
      return Promise.all([self.chay(c.from('bai_giao').select('id, loai, ma_de, tieu_de, mo_luc, han_nop, so_luot_toi_da, so_cau, hien_dap_an').eq('lop_id', lop.id).order('tao_luc', { ascending: false })), SC.cloud.danhSach('thong_ke_bai_giao', { p_lop: lop.id })]);
    }).then(function (kq) {
      var ds = kq[0] || [], tk = {}; if (kq[1].ok) kq[1].du_lieu.forEach(function (x) { tk[x.bai_giao_id] = x; });
      if (!ds.length) { box.innerHTML = '<h3>Các bài đã giao</h3><div class="empty">Chưa giao bài nào cho lớp này.</div>'; return; }
      var bay = Date.now();
      box.innerHTML = '<h3>Các bài đã giao</h3><table><tr><th>Bài</th><th>Mở lúc</th><th>Hạn nộp</th><th>Lượt tối đa</th><th>Đã nộp</th><th></th></tr>' + ds.map(function (b) {
        var s = tk[b.id], st = new Date(b.mo_luc) > bay ? 'chưa mở' : (b.han_nop && new Date(b.han_nop) < bay ? 'hết hạn' : 'đang mở');
        return '<tr><td>' + E(b.tieu_de) + '<br><span class="tag">' + (b.loai === 'de' ? 'đề thi thử' : 'luyện theo bài ' + (b.so_cau || '') + ' câu') + '</span><span class="tag ' + (st === 'đang mở' ? '' : 'warn') + '">' + st + '</span></td><td>' + E(self.gio(b.mo_luc)) + '</td><td>' + E(b.han_nop ? self.gio(b.han_nop) : 'không có') + '</td><td>' + b.so_luot_toi_da + '</td><td>' + (s ? s.so_da_nop + '/' + s.so_hs : '—') + '</td><td>' +
          '<button class="btn alt" type="button" data-cn="' + E(b.id) + '">Ai chưa nộp?</button> <button class="btn alt" type="button" data-han="' + E(b.id) + '">Đổi hạn</button> <button class="btn alt" type="button" data-xoa="' + E(b.id) + '" data-tt="' + E(b.tieu_de) + '">Xoá</button><div id="cn-' + E(b.id) + '"></div></td></tr>';
      }).join('') + '</table>';
      box.querySelectorAll('[data-cn]').forEach(function (bt) { bt.addEventListener('click', function () {
        var o = box.querySelector('#cn-' + bt.dataset.cn); o.textContent = 'Đang tải…';
        SC.cloud.danhSach('chua_nop', { p_bai_giao: bt.dataset.cn }).then(function (r) { o.innerHTML = !r.ok ? '⚠️ ' + E(r.thongBao) : (r.du_lieu.length ? '<span class="mute">Chưa nộp (' + r.du_lieu.length + '): </span>' + r.du_lieu.map(function (x) { return '<span class="tag warn">' + E(self.tenMa(x.ma_hs)) + '</span>'; }).join('') : '<span class="mute">Cả lớp đã nộp.</span>'); });
      }); });
      box.querySelectorAll('[data-han]').forEach(function (bt) { bt.addEventListener('click', function () {
        var v = window.prompt('Hạn nộp mới (dạng 2026-12-31 20:00). Để trống = bỏ hạn:');
        if (v === null) return;
        var t = v.trim() ? new Date(v.trim().replace(' ', 'T')) : null;
        if (t && isNaN(t.getTime())) { self.tb('Chưa hiểu ngày giờ này. Dạng đúng: 2026-12-31 20:00', true); return; }
        self.db().then(function (c) { return self.chay(c.from('bai_giao').update({ han_nop: t ? t.toISOString() : null }).eq('id', bt.dataset.han)); }).then(function () { self.tb('Đã đổi hạn nộp.'); self.veBaiGiao(lop); }).catch(function (e) { self.tb(self.loi(e), true); });
      }); });
      box.querySelectorAll('[data-xoa]').forEach(function (bt) { bt.addEventListener('click', function () {
        if (!window.confirm('Xoá bài giao «' + bt.dataset.tt + '»? Kết quả học sinh đã làm vẫn còn nhưng không còn gắn với bài này.')) return;
        self.db().then(function (c) { return self.chay(c.from('bai_giao').delete().eq('id', bt.dataset.xoa)); }).then(function () { self.veBaiGiao(lop); }).catch(function (e) { self.tb(self.loi(e), true); });
      }); });
    }).catch(function (e) { box.innerHTML = '<p>⚠️ ' + E(self.loi(e)) + '</p>'; });
  },

  // ---------- TAB 3: thống kê ----------
  tab_thongke: function () {
    var self = this, E = SC.esc, lop = this.lop(), nd = this.nd();
    if (!lop) { nd.innerHTML = '<div class="card"><div class="empty">Chưa có lớp.</div></div>'; return; }
    nd.innerHTML = '<div class="card"><p class="mute">Đang tải thống kê…</p></div>';
    Promise.all([SC.cloud.danhSach('thong_ke_bai_giao', { p_lop: lop.id }), SC.cloud.danhSach('ket_qua_hoc_sinh', { p_lop: lop.id }), SC.cloud.danhSach('hs_sa_sut', { p_lop: lop.id }), SC.cloud.danhSach('cau_kho', { p_lop: lop.id, p_gioi_han: 15 }),
      self.db().then(function (c) { return Promise.resolve(c.from('hoc_sinh').select('ma_hs, ten').eq('lop_id', lop.id)); }).then(function (x) { var m = {}; ((x && x.data) || []).forEach(function (y) { if (y.ten) m[y.ma_hs] = y.ten; }); return m; }).catch(function () { return {}; })]).then(function (kq) {
      var tk = kq[0], hs = kq[1], sa = kq[2], ck = kq[3], h = '', tenHS = kq[4] || {};
      var hien = function (ma) { return tenHS[ma] ? '<b>' + E(tenHS[ma]) + '</b> <span class="mute">(' + E(ma) + ')</span>' : '<b>' + E(ma) + '</b>'; };
      var loi = function (r) { return '<p class="mute">⚠️ ' + E(r.thongBao || 'Không tải được.') + '</p>'; };
      var co = hs.ok ? hs.du_lieu : [], saMa = {}; if (sa.ok) sa.du_lieu.forEach(function (x) { (saMa[x.ma_hs] = saMa[x.ma_hs] || []).push(x); });
      // tổng quan
      var dem = co.length, nhan = co.filter(function (x) { return x.da_nhan_may; }).length, luot = co.reduce(function (n, x) { return n + (x.so_luot || 0); }, 0);
      var dv = co.filter(function (x) { return x.diem_tb != null; }), tb = dv.length ? dv.reduce(function (n, x) { return n + x.diem_tb; }, 0) / dv.length : null;
      h += '<div class="card"><h3>Tổng quan lớp ' + E(lop.ten_lop) + '</h3>' + (hs.ok ? '<p>' + dem + ' mã học sinh · <b>' + nhan + '</b> đã nhận mã ở một máy · <b>' + luot + '</b> lượt làm đã nộp · điểm trung bình các đề: <b>' + self.f(tb) + '</b> (thang 10)</p>' : loi(hs)) + '</div>';
      // theo bài giao
      h += '<div class="card"><h3>Theo bài giao</h3>';
      if (!tk.ok) h += loi(tk); else if (!tk.du_lieu.length) h += '<div class="empty">Chưa giao bài nào.</div>';
      else h += '<table><tr><th>Bài</th><th>Hạn nộp</th><th>Đã nộp</th><th>Điểm TB</th><th>Cao nhất</th><th>Thấp nhất</th><th>Câu đúng hoàn toàn</th></tr>' + tk.du_lieu.map(function (x) {
        return '<tr><td>' + E(x.tieu_de) + '</td><td>' + E(x.han_nop ? self.gio(x.han_nop) : 'không có') + '</td><td>' + x.so_da_nop + '/' + x.so_hs + '<div class="bar"><i style="width:' + (x.so_hs ? Math.round(100 * x.so_da_nop / x.so_hs) : 0) + '%"></i></div></td><td>' + self.f(x.diem_tb) + '</td><td>' + self.f(x.diem_cao) + '</td><td>' + self.f(x.diem_thap) + '</td><td>' + (x.ty_le_dung == null ? '—' : self.f(x.ty_le_dung) + '%') + '</td></tr>';
      }).join('') + '</table>';
      h += '</div>';
      // phân bố điểm
      h += '<div class="card"><h3>Phân bố điểm trung bình các đề</h3>';
      if (!dv.length) h += '<div class="empty">Chưa có học sinh nào nộp đề.</div>';
      else {
        var bin = [0, 0, 0, 0, 0]; dv.forEach(function (x) { bin[Math.min(4, Math.floor(x.diem_tb / 2))]++; });
        h += ['0 – dưới 2', '2 – dưới 4', '4 – dưới 6', '6 – dưới 8', '8 – 10'].map(function (t, i) { return '<div>' + t + ': <b>' + bin[i] + '</b> học sinh<div class="bar"><i style="width:' + Math.round(100 * bin[i] / dv.length) + '%"></i></div></div>'; }).join('');
      }
      h += '</div>';
      // học sinh
      h += '<div class="card"><h3>Học sinh</h3>';
      if (!hs.ok) h += loi(hs); else if (!co.length) h += '<div class="empty">Chưa có mã học sinh.</div>';
      else h += '<table><tr><th>Học sinh</th><th>Đã vào</th><th>Lượt đã nộp</th><th>Điểm TB đề</th><th>Bài giao đã nộp</th><th>Nộp gần nhất</th><th>Lưu ý</th></tr>' + co.map(function (x) {
        var c = saMa[x.ma_hs] || [], note = c.map(function (y) { return '<span class="tag warn" title="' + E(y.mo_ta) + '">' + (y.ly_do === 'diem_giam' ? 'điểm giảm' : 'quá hạn chưa nộp') + '</span>'; }).join('') || (x.da_nhan_may ? '' : '<span class="tag">chưa vào</span>');
        return '<tr><td>' + hien(x.ma_hs) + '</td><td>' + (x.da_nhan_may ? 'có' : 'chưa') + '</td><td>' + x.so_luot + '</td><td>' + self.f(x.diem_tb) + '</td><td>' + x.so_bai_giao_da_nop + '/' + x.so_bai_giao + '</td><td>' + E(self.gio(x.nop_gan_nhat)) + '</td><td>' + note + '</td></tr>';
      }).join('') + '</table>';
      h += '</div>';
      // sa sút
      h += '<div class="card"><h3>Học sinh có dấu hiệu sa sút hoặc chưa hoàn thành</h3>';
      if (!sa.ok) h += loi(sa); else if (!sa.du_lieu.length) h += '<p class="mute">Chưa có học sinh nào rơi vào hai quy tắc (điểm giảm ≥ 1,5 so với ba đề trước; quá hạn chưa nộp hai bài gần nhất).</p>';
      else h += '<ul>' + sa.du_lieu.map(function (x) { return '<li>' + hien(x.ma_hs) + ': ' + E(x.mo_ta) + '</li>'; }).join('') + '</ul>';
      h += '<p class="mute">Quy tắc để tham khảo; không phải đánh giá chính thức về học sinh.</p></div>';
      // câu khó
      h += '<div class="card"><h3>Câu hỏi khó (tỉ lệ đúng thấp nhất, từ 3 lượt trở lên)</h3>';
      if (!ck.ok) h += loi(ck); else if (!ck.du_lieu.length) h += '<div class="empty">Chưa đủ dữ liệu (mỗi câu cần ít nhất 3 lượt làm).</div>';
      else h += '<table><tr><th>Câu</th><th>Tỉ lệ đúng</th><th>Số lượt</th><th>Nội dung</th></tr>' + ck.du_lieu.map(function (x) {
        var q = SC.questions.byId(x.ma_cau), nd2 = q ? E(String(q.q).replace(/\s+/g, ' ').slice(0, 150)) + (String(q.q).length > 150 ? '…' : '') : '<span class="mute">(không thấy câu trong dữ liệu app)</span>';
        return '<tr><td>' + E(x.ma_cau) + '<br><span class="tag">' + (x.dang === 'dung_sai' ? 'đúng/sai' : 'trắc nghiệm') + '</span></td><td><b>' + self.f(x.ty_le) + '%</b></td><td>' + x.so_lam + '</td><td>' + nd2 + '</td></tr>';
      }).join('') + '</table>';
      h += '</div>';
      nd.innerHTML = h;
    });
  },

  // ---------- TAB 4: xuất đề in ----------
  tab_in: function () {
    var self = this, E = SC.esc, nd = this.nd(), opt = '', g = '';
    SC.pages.de.tatCa().forEach(function (x) {
      if (x.nhom !== g) { if (g) opt += '</optgroup>'; opt += '<optgroup label="' + E(x.nhom) + '">'; g = x.nhom; }
      opt += '<option value="' + E(x.d.id) + '">' + E(SC.tenBo(x.d.ten)) + '</option>';
    });
    opt += '</optgroup>';
    var mine = this.deCuaToi();
    if (mine.length) opt += '<optgroup label="Đề của tôi">' + mine.map(function (d) { return '<option value="' + E(d.id) + '">' + E(d.ten) + '</option>'; }).join('') + '</optgroup>';
    nd.innerHTML = '<div class="card"><h3>Xuất đề để in cho học sinh làm</h3><p class="mute">Chọn đề, xem trước rồi bấm In (hoặc «Lưu thành PDF» trong hộp thoại in của trình duyệt). Bản học sinh không có đáp án; bản giáo viên có đáp án và bảng đáp án. Muốn có file để sửa thì bấm «Tải Word»: bản giáo viên tô đỏ đậm đáp án đúng. Bản Word tải ở đây là bản đơn giản (chưa có dấu Triway); cần bản đóng dấu Triway thì dùng công cụ xuất Word trên máy cô.</p>' +
      '<label for="i-de">Đề</label><select id="i-de">' + opt + '</select>' +
      '<p><button class="btn" type="button" id="i-hs">Xem bản học sinh</button> <button class="btn alt" type="button" id="i-gv">Xem bản giáo viên (có đáp án)</button> <button class="btn" type="button" id="i-in" disabled>In</button></p>' +
      '<p><button class="btn alt" type="button" id="i-w-hs">Tải Word — bản học sinh</button> <button class="btn alt" type="button" id="i-w-gv">Tải Word — bản giáo viên (đáp án tô đỏ)</button></p></div><div class="card" id="i-xem"><div class="empty">Chọn đề rồi bấm «Xem».</div></div>';
    var cur = null;
    var xem = function (co) {
      var d = self.timDeAny(nd.querySelector('#i-de').value); if (!d) return;
      cur = self.dungDeIn(d, co); nd.querySelector('#i-xem').innerHTML = cur; nd.querySelector('#i-in').disabled = false;
    };
    nd.querySelector('#i-hs').addEventListener('click', function () { xem(false); });
    nd.querySelector('#i-gv').addEventListener('click', function () { xem(true); });
    nd.querySelector('#i-in').addEventListener('click', function () { if (cur) self.in(cur); });
    var tai = function (co) { var d = self.timDeAny(nd.querySelector('#i-de').value); if (d) self.taiWord(d, co); };
    nd.querySelector('#i-w-hs').addEventListener('click', function () { tai(false); });
    nd.querySelector('#i-w-gv').addEventListener('click', function () { tai(true); });
  },

  // Tải đề ra file Word (.docx): bản học sinh hoặc bản giáo viên (đáp án đúng tô đỏ đậm). Làm ngay trên trình duyệt.
  taiWord: function (d, coDapAn) {
    if (!SC.xuatdocx) { this.tb('Chưa nạp được bộ xuất Word. Tải lại trang rồi thử lại.', true); return; }
    try {
      var ten = SC.tenBo(d.ten), tep = SC.xuatdocx.tenTep(ten + (coDapAn ? ' (có đáp án)' : ' (học sinh)')) + '.docx';
      SC.xuatdocx.taiXuong(SC.xuatdocx.dungDocx(d, coDapAn, {
        ten: ten, cham: SC.pages.de.chamCua(d),
        ghiChuCuoi: d.loai === 'hsg' ? 'Thang 20 theo tỉ lệ cấu trúc Sở GDĐT Ninh Bình (CV 1229); đề luyện, không phải đề chính thức.' : 'Thang điểm theo QĐ 764/QĐ-BGDĐT; đề luyện, không phải đề minh hoạ hay đề dự đoán của Bộ.'
      }), tep);
      this.tb('Đã tạo file «' + tep + '» (xem trong thư mục Tải xuống của trình duyệt).');
    } catch (e) { this.tb('Không tạo được file Word: ' + (e && e.message ? e.message : 'lỗi'), true); }
  },

  // ---------- TAB 5: đề của tôi (giáo viên tự thêm đề từ Word/Excel/CSV/văn bản dán; lưu trong trình duyệt của máy này) ----------
  KHO_DE: 'gv_de_cua_toi',
  deCuaToi: function () { try { var x = JSON.parse(localStorage.getItem(this.KHO_DE) || '[]'); return Array.isArray(x) ? x : []; } catch (e) { return []; } },
  luuDeCuaToi: function (ds) {
    try { localStorage.setItem(this.KHO_DE, JSON.stringify(ds)); return true; }
    catch (e) { this.tb('Không lưu được vào trình duyệt (đầy bộ nhớ hoặc bị chặn). Bấm «Sao lưu» để tải file .json rồi xoá bớt đề cũ.', true); return false; }
  },
  timDeAny: function (id) { return SC.pages.de.timDe(id) || this.deCuaToi().filter(function (d) { return d.id === id; })[0] || null; },
  taiTep: function (noiDung, ten, loai) {
    var b = new Blob([noiDung], { type: loai }), a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = ten; a.style.display = 'none'; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  },

  tab_de: function () {
    var self = this, nd = this.nd();
    nd.innerHTML = '<div class="card"><h3>Thêm đề</h3>' +
      '<p class="mute">Chọn file đề Word (.docx), file Excel/CSV theo mẫu, hoặc dán nội dung đề. App đọc ngay trên máy cô (không gửi file đi đâu), nhận «Câu 1.», phương án A–D, ý a–d của câu đúng/sai, rồi cho cô <b>xem trước và chọn lại đáp án</b> trước khi lưu. Đáp án được nhận từ chữ tô đỏ, gạch chân, tô nền, in đậm ở phương án đúng hoặc từ bảng «Đáp án» cuối đề; câu nào không nhận được thì để trống cho cô chọn. Đề lưu <b>trong trình duyệt của máy này</b> (để in, tải Word, xem lại). Muốn <b>giao cho học sinh làm</b>: bấm «Đưa lên máy chủ để giao bài» ở danh sách bên dưới (đáp án nằm ở máy chủ, học sinh chỉ nhận chữ của đề; máy chủ chấm điểm), rồi giao ở tab «Giao bài». Đề đã đưa lên thì không sửa được. Nên bấm «Sao lưu» thỉnh thoảng.</p>' +
      '<p><button class="btn" type="button" id="d-nhap">Chọn file đề…</button> <button class="btn alt" type="button" id="d-mau">Tải file mẫu (CSV)</button>' +
      '<input type="file" id="d-tep" accept=".docx,.xlsx,.xls,.csv,.txt" hidden></p>' +
      '<details><summary>Hoặc dán nội dung đề</summary><label for="d-dan">Nội dung đề (mỗi câu bắt đầu bằng «Câu 1.», phương án A. B. C. D.)</label><textarea id="d-dan" rows="8" spellcheck="false" placeholder="Câu 1. Thị trường là gì?&#10;A. …&#10;B. …&#10;C. …&#10;D. …"></textarea>' +
      '<p><button class="btn alt" type="button" id="d-doc">Đọc nội dung đã dán</button></p></details><div id="d-xem"></div></div>' +
      '<div class="card" id="d-ds"></div><div id="d-in"></div>';
    nd.querySelector('#d-nhap').addEventListener('click', function () { nd.querySelector('#d-tep').click(); });
    nd.querySelector('#d-tep').addEventListener('change', function (ev) { var f = ev.target.files && ev.target.files[0]; ev.target.value = ''; if (f) self.docTepDe(f); });
    nd.querySelector('#d-mau').addEventListener('click', function () { self.taiTep(SC.nhapde.mauCSV(), 'mau-de-thi.csv', 'text/csv;charset=utf-8'); self.tb('Đã tạo file mẫu «mau-de-thi.csv»: mở bằng Excel, thay bằng câu hỏi của cô rồi chọn lại ở «Chọn file đề».'); });
    nd.querySelector('#d-doc').addEventListener('click', function () {
      var tx = nd.querySelector('#d-dan').value;
      if (!/\S/.test(tx)) { self.tb('Dán nội dung đề vào ô trước.', true); return; }
      self.xemDe(SC.nhapde.tuVanBan(tx, ''), 'nội dung đã dán');
    });
    this.veDsDe();
  },

  docTepDe: function (f) {
    var self = this;
    if (!SC.nhapde || !SC.bangtinh) { this.tb('Chưa nạp được bộ đọc đề. Tải lại trang rồi thử lại.', true); return; }
    if (f.size > 12 * 1024 * 1024) { this.tb('Tệp lớn quá (tối đa 12 MB).', true); return; }
    this.tb('Đang đọc ' + f.name + '…');
    var rd = new FileReader();
    rd.onerror = function () { self.tb('Không mở được tệp này.', true); };
    rd.onload = function () { SC.nhapde.docTep(rd.result, f.name).then(function (kq) { self.xemDe(kq, f.name); }).catch(function (e) { self.tb('Không đọc được tệp: ' + self.loi(e), true); }); };
    rd.readAsArrayBuffer(f);
  },

  // Xem trước đề vừa đọc: sửa tên/khối/thời gian, chọn lại đáp án, bỏ câu đọc nhầm, rồi lưu.
  xemDe: function (kq, nguon) {
    var self = this, E = SC.esc, box = this.nd().querySelector('#d-xem');
    if (!kq.cau.length) { box.innerHTML = '<p>⚠️ ' + E((kq.loi && kq.loi[0]) || 'Không thấy câu hỏi nào.') + '</p>'; this.tb(''); return; }
    this._de = { cau: kq.cau.map(function (q) { q.giu = true; return q; }), ten: kq.ten || '', khoi: kq.khoi || 12, tg: 50 };
    var cut = function (s, n) { s = String(s); return s.length > n ? s.slice(0, n) + '…' : s; };
    var sel = function (i, k, mo) { return '<select data-qa="' + i + '" data-k="' + k + '" aria-label="Đáp án câu ' + (i + 1) + (k === '' ? '' : ' ý ' + 'abcd'[+k]) + '">' + mo + '</select>'; };
    var hang = this._de.cau.map(function (q, i) {
      var ans;
      if (q.dang === 'tn4') ans = sel(i, '', ['', 'A', 'B', 'C', 'D'].map(function (x, j) { return '<option value="' + (j - 1) + '"' + (q.a === j - 1 ? ' selected' : '') + '>' + (x || '— chọn —') + '</option>'; }).join(''));
      else ans = [0, 1, 2, 3].map(function (k) { return 'abcd'[k] + ' ' + sel(i, String(k), '<option value="">—</option><option value="1"' + (q.a && q.a[k] === true ? ' selected' : '') + '>Đ</option><option value="0"' + (q.a && q.a[k] === false ? ' selected' : '') + '>S</option>'); }).join(' ');
      return '<tr data-r="' + i + '"><td><input type="checkbox" data-giu="' + i + '" checked style="width:auto" aria-label="Giữ câu ' + (i + 1) + '"></td><td>' + (i + 1) + '<br><span class="tag">' + (q.dang === 'tn4' ? 'TN' : 'Đ/S') + '</span></td>' +
        '<td>' + E(cut(q.q, 110)) + (q.o.some(function (x) { return !x; }) ? '<br><span class="mute" style="color:var(--bad)">có phương án trống</span>' : '') +
        '<details><summary class="mute">Sửa nội dung</summary><textarea data-qq="' + i + '" rows="3" style="width:100%" aria-label="Nội dung câu ' + (i + 1) + '">' + E(q.q) + '</textarea>' +
        [0, 1, 2, 3].map(function (k) { return '<label class="mute" style="display:block">' + (q.dang === 'tn4' ? 'ABCD' : 'abcd')[k] + '. <input data-qo="' + i + '" data-k="' + k + '" value="' + E(q.o[k] || '') + '" style="width:calc(100% - 2em)"></label>'; }).join('') + '</details></td><td>' + ans + '</td>' +
        '<td class="mute">' + (q.ghi.length ? E(q.ghi.join(' ')) : (q.nguon === 'thieu' ? '' : 'đáp án nhận từ ' + ({ mau: 'chữ tô/gạch chân', dam: 'chữ đậm', 'ghi chu': '«(Đúng)/(Sai)»', bang: 'bảng đáp án', 'bang tinh': 'bảng tính' })[q.nguon])) + '</td></tr>';
    }).join('');
    box.innerHTML = '<h4>Xem trước: ' + E(nguon) + '</h4>' +
      (kq.canhBao.length ? '<p class="mute">⚠️ ' + E(kq.canhBao.join(' ')) + '</p>' : '') +
      '<p><label for="d-ten" style="display:inline">Tên đề</label> <input id="d-ten" maxlength="120" style="width:min(100%,26em)" value="' + E(this._de.ten) + '" autocomplete="off"> ' +
      '<label for="d-khoi" style="display:inline">Khối</label> <select id="d-khoi" style="width:auto">' + [['10', 'Lớp 10'], ['11', 'Lớp 11'], ['12', 'Lớp 12'], ['tn', 'Tốt nghiệp']].map(function (x) { return '<option value="' + x[0] + '"' + (String(self._de.khoi) === x[0] ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select> ' +
      '<label for="d-tg" style="display:inline">Thời gian (phút)</label> <input id="d-tg" type="number" min="5" max="240" value="50" style="width:5em"></p>' +
      '<p id="d-tong" role="status"></p>' +
      '<div style="overflow-x:auto"><table><tr><th>Giữ</th><th>Câu</th><th>Nội dung</th><th>Đáp án đúng</th><th>Ghi chú</th></tr>' + hang + '</table></div>' +
      '<p><button class="btn" type="button" id="d-luu">Lưu đề</button> <button class="btn alt" type="button" id="d-huy">Bỏ, không lưu</button></p>';
    var lam = function () {
      var cau = self.cauDangGiu(), loi = SC.nhapde.kiemDe(cau), tn = cau.filter(function (q) { return q.dang === 'tn4'; }).length;
      box.querySelector('#d-tong').innerHTML = 'Giữ <b>' + cau.length + '</b> câu (' + tn + ' trắc nghiệm, ' + (cau.length - tn) + ' đúng/sai). ' + (loi.length ? '<span style="color:var(--bad)">Còn ' + loi.length + ' việc cần sửa: ' + E(loi.slice(0, 3).join(' ')) + (loi.length > 3 ? ' …' : '') + '</span>' : '<b>Sẵn sàng lưu.</b>');
      box.querySelector('#d-luu').disabled = !!loi.length || !cau.length;
    };
    box.querySelectorAll('[data-qa]').forEach(function (s) {
      s.addEventListener('change', function () {
        var q = self._de.cau[+s.dataset.qa];
        if (q.dang === 'tn4') q.a = s.value === '' || s.value === '-1' ? null : +s.value;
        else { if (!q.a) q.a = [null, null, null, null]; q.a[+s.dataset.k] = s.value === '' ? null : s.value === '1'; }
        lam();
      });
    });
    box.querySelectorAll('[data-giu]').forEach(function (c) { c.addEventListener('change', function () { self._de.cau[+c.dataset.giu].giu = c.checked; box.querySelector('tr[data-r="' + c.dataset.giu + '"]').style.opacity = c.checked ? '' : '.4'; lam(); }); });
    box.querySelectorAll('[data-qq]').forEach(function (t) { t.addEventListener('input', function () { self._de.cau[+t.dataset.qq].q = t.value; lam(); }); });
    box.querySelectorAll('[data-qo]').forEach(function (t) { t.addEventListener('input', function () { self._de.cau[+t.dataset.qo].o[+t.dataset.k] = t.value; lam(); }); });
    box.querySelector('#d-huy').addEventListener('click', function () { self._de = null; box.innerHTML = ''; self.tb(''); });
    box.querySelector('#d-luu').addEventListener('click', function () { self.luuDe(); });
    lam(); this.tb('Đã đọc ' + nguon + ': xem trước, chọn lại đáp án nếu cần rồi bấm «Lưu đề».');
  },

  cauDangGiu: function () {
    return (this._de ? this._de.cau : []).filter(function (q) { return q.giu; }).map(function (q) {
      return { dang: q.dang, q: q.q, o: q.o, a: q.dang === 'dung_sai' ? (Array.isArray(q.a) ? q.a.map(function (v) { return v === true || v === false ? v : null; }) : null) : q.a };
    });
  },

  luuDe: function () {
    var box = this.nd().querySelector('#d-xem'), cau = this.cauDangGiu(), loi = SC.nhapde.kiemDe(cau);
    if (loi.length) { this.tb('Chưa lưu được: ' + loi[0], true); return; }
    var ten = (box.querySelector('#d-ten').value || '').trim() || 'Đề của tôi', k = box.querySelector('#d-khoi').value, tg = parseInt(box.querySelector('#d-tg').value, 10) || 50;
    var d = SC.nhapde.dungDe(cau, { ten: ten, khoi: k === 'tn' ? 'tn' : +k, thoi_gian: Math.max(5, Math.min(240, tg)) }), ds = this.deCuaToi();
    ds.unshift(d);
    if (!this.luuDeCuaToi(ds)) return;
    this._de = null; box.innerHTML = '';
    this.veDsDe(); this.tb('Đã lưu đề «' + ten + '» (' + d.cau.length + ' câu) vào «Đề của tôi».');
  },

  // ---- đề đã đưa lên máy chủ (schema_buoc6.sql): nguồn sự thật là máy chủ ----
  LOI_XB: {
    khong_phai_giao_vien: 'tài khoản này chưa được cấp quyền giáo viên.', ma_de_khong_hop_le: 'mã đề không hợp lệ.', ten_khong_hop_le: 'tên đề trống hoặc dài quá 120 ký tự.',
    khoi_khong_hop_le: 'khối không hợp lệ.', thoi_gian_khong_hop_le: 'thời gian làm bài phải từ 5 đến 240 phút.', cau_khong_hop_le: 'có câu hỏi không hợp lệ.',
    so_cau_khong_hop_le: 'đề phải có từ 1 đến 100 câu.', qua_lon: 'đề lớn quá (tối đa 300 KB chữ).', ma_de_da_co: 'mã đề này thuộc người khác.',
    da_giao_hoac_da_lam: 'đề đã được giao hoặc đã có học sinh làm nên không ghi đè được; hãy thêm lại thành đề mới.', qua_nhieu_de: 'đã có 100 đề trên máy chủ; gỡ bớt đề cũ trước.',
    ma_cau_khong_hop_le: 'mã câu không hợp lệ.', ma_cau_trung: 'mã câu bị trùng.', dang_khong_hop_le: 'dạng câu không hợp lệ.', noi_dung_khong_hop_le: 'nội dung câu trống hoặc dài quá 4000 ký tự.',
    phuong_an_khong_hop_le: 'phương án trống hoặc dài quá 1000 ký tự.', dap_an_khong_hop_le: 'đáp án không hợp lệ.', dang_duoc_giao: 'đề đang được giao ở một bài: xoá bài giao ở tab «Giao bài» trước.', khong_co_de: 'không thấy đề này trên máy chủ.'
  },
  _xb: null,   // danh sách đề của giáo viên đang ở máy chủ (null = chưa tải)
  timXb: function (ma) { return (this._xb || []).filter(function (x) { return x.ma_de === ma; })[0] || null; },
  napXb: function () {
    var self = this;
    return SC.cloud.danhSach('de_cua_toi_tren_may_chu').then(function (r) {
      self._xb = r.ok ? r.du_lieu : [];
      self._xbLoi = r.ok ? '' : (/Could not find the function|schema cache|chưa sẵn sàng/i.test(r.thongBao || '') ? 'Máy chủ chưa có chức năng này: chạy schema_buoc6.sql.' : (r.thongBao || ''));
      return self._xb;
    });
  },
  // Đưa một «Đề của tôi» lên máy chủ: đáp án vào bảng đáp án (chỉ máy chủ đọc), chữ đề vào nơi học sinh chỉ lấy được khi lớp có bài giao.
  xuatBanDe: function (d) {
    var self = this;
    var loi = SC.nhapde.kiemDe(d.cau);
    if (loi.length) { this.tb('Đề còn lỗi, chưa đưa lên được: ' + loi[0], true); return; }
    if (!window.confirm('Đưa đề «' + d.ten + '» (' + d.cau.length + ' câu) lên máy chủ để giao bài cho học sinh?\n\nSau khi đưa lên, đề KHÔNG sửa được (muốn đổi thì thêm đề mới). Đáp án sai là sai cho cả lớp: hãy chắc là đã kiểm đáp án từng câu.')) return;
    this.tb('Đang đưa đề lên máy chủ…');
    var cau = d.cau.map(function (q) { return { id: q.id, dang: q.dang, q: q.q, o: q.o, a: q.a }; });
    SC.cloud.goi('xuat_ban_de', { p_ma_de: d.id, p_ten: d.ten, p_khoi: (d.khoi === 10 || d.khoi === 11 || d.khoi === 12) ? d.khoi : null, p_thoi_gian: d.thoi_gian, p_cau: cau }).then(function (r) {
      if (!r || !r.ok) { self.tb('Chưa đưa lên được: ' + (self.LOI_XB[r && r.ly_do] || (r && r.ly_do) || 'lỗi') + (r && r.cau ? ' (câu ' + r.cau + ')' : ''), true); return; }
      return self.napXb().then(function () { self.veDsDe(); self.tb('Đã đưa đề «' + d.ten + '» lên máy chủ. Giao bài ở tab «Giao bài» (nhóm «Đề của tôi»).'); });
    }).catch(function (e) { self.tb(/Could not find the function|schema cache/i.test(self.loi(e)) ? 'Máy chủ chưa có chức năng này: chạy schema_buoc6.sql.' : self.loi(e), true); });
  },
  goDe: function (ma, ten) {
    var self = this;
    if (!window.confirm('Gỡ đề «' + ten + '» khỏi máy chủ? Đề vẫn còn trong «Đề của tôi» trên máy này (nếu có). Không gỡ được khi đề đang được giao.')) return;
    SC.cloud.goi('go_de_cua_toi', { p_ma_de: ma }).then(function (r) {
      if (!r || !r.ok) { self.tb('Chưa gỡ được: ' + (self.LOI_XB[r && r.ly_do] || (r && r.ly_do) || 'lỗi'), true); return; }
      return self.napXb().then(function () { self.veDsDe(); self.tb('Đã gỡ đề «' + ten + '» khỏi máy chủ.'); });
    }).catch(function (e) { self.tb(self.loi(e), true); });
  },

  veDsDe: function () {
    var self = this, E = SC.esc, box = this.nd().querySelector('#d-ds'), ds = this.deCuaToi();
    if (!box) return;
    if (this._xb === null && !this._xbDang && SC.cloud && SC.cloud.laGV()) {   // tải trạng thái máy chủ một lần, rồi vẽ lại
      this._xbDang = true;
      this.napXb().then(function () { self._xbDang = false; if (document.body.contains(box)) self.veDsDe(); }, function () { self._xbDang = false; self._xb = []; });
    }
    var coLop = function (id) { return ds.some(function (d) { return d.id === id; }); };
    var nhan = function (d) {
      var x = self.timXb(d.id);
      if (self._xb === null) return ' <span class="tag">đang kiểm tra máy chủ…</span>';
      return x ? ' <span class="tag">đã đưa lên máy chủ</span>' + (x.so_bai_giao ? ' <span class="mute">giao ' + x.so_bai_giao + ' bài</span>' : '') : ' <span class="tag warn">chỉ trên máy này</span>';
    };
    var nut = function (d) {
      var x = self.timXb(d.id);
      if (self._xb === null) return '<button class="btn alt" type="button" disabled>Đưa lên máy chủ…</button> ';
      return x ? '<button class="btn alt" type="button" data-go-mc="' + E(d.id) + '">Gỡ khỏi máy chủ</button> ' : '<button class="btn" type="button" data-len-mc="' + E(d.id) + '">Đưa lên máy chủ để giao bài</button> ';
    };
    var h = '<h3>Đề của tôi (' + ds.length + ')</h3>';
    if (!ds.length) h += '<div class="empty">Chưa có đề nào. Thêm đề ở khung trên.</div>';
    else h += '<table><tr><th>Đề</th><th>Câu</th><th>Ngày</th><th></th></tr>' + ds.map(function (d) {
      var tn = d.cau.filter(function (q) { return q.dang === 'tn4'; }).length;
      return '<tr><td><b>' + E(d.ten) + '</b>' + nhan(d) + '<br><span class="mute">' + (d.khoi === 'tn' ? 'Tốt nghiệp' : d.khoi ? 'Lớp ' + E(d.khoi) : '') + ' · ' + d.thoi_gian + ' phút</span></td><td>' + tn + ' TN' + (d.cau.length - tn ? ' + ' + (d.cau.length - tn) + ' Đ/S' : '') + '</td><td>' + E(self.gio(d.tao_luc)) + '</td><td>' +
        nut(d) +
        '<button class="btn alt" type="button" data-xem="' + E(d.id) + '|0">Xem bản học sinh</button> <button class="btn alt" type="button" data-xem="' + E(d.id) + '|1">Xem bản giáo viên</button> ' +
        '<button class="btn alt" type="button" data-w="' + E(d.id) + '|0">Tải Word (học sinh)</button> <button class="btn alt" type="button" data-w="' + E(d.id) + '|1">Tải Word (đáp án)</button> ' +
        '<button class="btn alt" type="button" data-xoa-de="' + E(d.id) + '">Xoá</button></td></tr>';
    }).join('') + '</table>';
    var rieng = (this._xb || []).filter(function (x) { return !coLop(x.ma_de); });
    if (rieng.length) h += '<h4>Đề đang ở máy chủ nhưng không có ở máy này (' + rieng.length + ')</h4><table><tr><th>Đề</th><th>Câu</th><th>Bài giao</th><th></th></tr>' + rieng.map(function (x) {
      return '<tr><td><b>' + E(x.ten) + '</b></td><td>' + x.so_cau + '</td><td>' + x.so_bai_giao + '</td><td><button class="btn alt" type="button" data-go-mc="' + E(x.ma_de) + '" data-ten="' + E(x.ten) + '">Gỡ khỏi máy chủ</button></td></tr>';
    }).join('') + '</table>';
    if (this._xbLoi) h += '<p class="mute">⚠️ ' + E(this._xbLoi) + '</p>';
    h += '<p><button class="btn alt" type="button" id="d-sl"' + (ds.length ? '' : ' disabled') + '>Sao lưu tất cả (.json)</button> <button class="btn alt" type="button" id="d-nap">Nạp từ file sao lưu…</button><input type="file" id="d-nap-tep" accept=".json,application/json" hidden></p>' +
      '<p class="mute">Đề lưu trong trình duyệt này; xoá dữ liệu duyệt web hoặc đổi máy sẽ mất đề. «Sao lưu» tải về file .json; «Nạp từ file sao lưu» đưa đề trở lại (đề trùng bị bỏ qua).</p>';
    box.innerHTML = h;
    var tim = function (v) { var p = v.split('|'); return { d: self.deCuaToi().filter(function (x) { return x.id === p[0]; })[0], co: p[1] === '1' }; };
    box.querySelectorAll('[data-xem]').forEach(function (b) { b.addEventListener('click', function () {
      var t = tim(b.dataset.xem); if (!t.d) return;
      var cur = self.dungDeIn(t.d, t.co), z = self.nd().querySelector('#d-in');
      z.innerHTML = '<div class="card"><p><button class="btn" type="button" id="d-in-nut">In</button> <button class="btn alt" type="button" id="d-in-dong">Đóng</button></p>' + cur + '</div>';
      z.querySelector('#d-in-nut').addEventListener('click', function () { self.in(cur); });
      z.querySelector('#d-in-dong').addEventListener('click', function () { z.innerHTML = ''; });
      z.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }); });
    box.querySelectorAll('[data-w]').forEach(function (b) { b.addEventListener('click', function () { var t = tim(b.dataset.w); if (t.d) self.taiWord(t.d, t.co); }); });
    box.querySelectorAll('[data-len-mc]').forEach(function (b) { b.addEventListener('click', function () { var d = self.deCuaToi().filter(function (x) { return x.id === b.dataset.lenMc; })[0]; if (d) self.xuatBanDe(d); }); });
    box.querySelectorAll('[data-go-mc]').forEach(function (b) { b.addEventListener('click', function () {
      var d = self.deCuaToi().filter(function (x) { return x.id === b.dataset.goMc; })[0], x = self.timXb(b.dataset.goMc);
      self.goDe(b.dataset.goMc, (d && d.ten) || b.dataset.ten || (x && x.ten) || b.dataset.goMc);
    }); });
    box.querySelectorAll('[data-xoa-de]').forEach(function (b) { b.addEventListener('click', function () {
      var d = self.deCuaToi().filter(function (x) { return x.id === b.dataset.xoaDe; })[0]; if (!d) return;
      if (!window.confirm('Xoá đề «' + d.ten + '» khỏi «Đề của tôi» trên máy này? Không hoàn tác được (nên sao lưu trước).' + (self.timXb(d.id) ? '\n\nĐề này đã đưa lên máy chủ: xoá ở đây KHÔNG gỡ nó khỏi máy chủ (dùng nút «Gỡ khỏi máy chủ»).' : ''))) return;
      if (self.luuDeCuaToi(self.deCuaToi().filter(function (x) { return x.id !== d.id; }))) { self.veDsDe(); self.tb('Đã xoá đề «' + d.ten + '».'); }
    }); });
    var sl = box.querySelector('#d-sl');
    if (sl) sl.addEventListener('click', function () { self.taiTep(JSON.stringify({ app: 'class-gdktpl', loai: 'de-cua-toi', phien_ban: 1, de: self.deCuaToi() }), 'sao-luu-de-cua-toi.json', 'application/json'); self.tb('Đã tạo file «sao-luu-de-cua-toi.json» (' + self.deCuaToi().length + ' đề).'); });
    box.querySelector('#d-nap').addEventListener('click', function () { box.querySelector('#d-nap-tep').click(); });
    box.querySelector('#d-nap-tep').addEventListener('change', function (ev) {
      var f = ev.target.files && ev.target.files[0]; ev.target.value = ''; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        try {
          var j = JSON.parse(rd.result), nap = Array.isArray(j) ? j : (j && j.de), ok = function (d) { return d && typeof d.id === 'string' && Array.isArray(d.cau) && d.cau.length && SC.nhapde.kiemDe(d.cau).length === 0; };
          if (!Array.isArray(nap)) throw new Error('không phải file sao lưu của app');
          var co = self.deCuaToi(), id = {}; co.forEach(function (d) { id[d.id] = 1; });
          var moi = nap.filter(function (d) { return ok(d) && !id[d.id]; }), hong = nap.filter(function (d) { return !ok(d); }).length;
          if (self.luuDeCuaToi(moi.concat(co))) { self.veDsDe(); self.tb('Đã nạp ' + moi.length + ' đề' + (nap.length - moi.length - hong ? ', bỏ qua ' + (nap.length - moi.length - hong) + ' đề đã có' : '') + (hong ? ', ' + hong + ' đề trong file bị hỏng nên bỏ qua' : '') + '.'); }
        } catch (e) { self.tb('Không nạp được: ' + (e && e.message ? e.message : 'file không đúng'), true); }
      };
      rd.readAsText(f);
    });
  },

  // Dựng nội dung đề để in. coDapAn = true: bản giáo viên.
  dungDeIn: function (d, coDapAn) {
    var E = SC.esc, c = SC.pages.de.chamCua(d), f = function (x) { return String(Math.round(x * 100) / 100).replace('.', ','); };
    var tn = d.cau.filter(function (q) { return q.dang === 'tn4'; }), ds = d.cau.filter(function (q) { return q.dang === 'dung_sai'; });
    var h = '<div class="in-de"><h2 style="text-align:center">' + E(SC.tenBo(d.ten)) + (coDapAn ? ' — BẢN GIÁO VIÊN (CÓ ĐÁP ÁN)' : '') + '</h2>' +
      '<p style="text-align:center">Môn: Giáo dục kinh tế và pháp luật · Thời gian làm bài: ' + d.thoi_gian + ' phút (không kể thời gian phát đề) · Thang điểm ' + c.tong + '</p>' +
      (coDapAn ? '' : '<p>Họ và tên: ................................................ Lớp: ............ Số báo danh: ............</p>') +
      '<h3>PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (' + tn.length + ' câu; mỗi câu đúng ' + f(c.tn) + ' điểm)</h3>';
    tn.forEach(function (q, i) {
      h += '<div class="cau"><b>Câu ' + (i + 1) + '.</b> ' + E(String(q.q).trim()) + '</div>' + q.o.map(function (o, k) {
        return '<div class="pa' + (coDapAn && k === q.a ? ' da' : '') + '">' + 'ABCD'[k] + '. ' + E(o) + (coDapAn && k === q.a ? ' ✓' : '') + '</div>';
      }).join('');
    });
    if (ds.length) {
      h += '<h3>PHẦN II. Câu trắc nghiệm đúng/sai (' + ds.length + ' câu; mỗi câu bốn ý a, b, c, d; điểm theo số ý đúng: 1 ý ' + f(c.ds[1]) + ' · 2 ý ' + f(c.ds[2]) + ' · 3 ý ' + f(c.ds[3]) + ' · 4 ý ' + f(c.ds[4]) + ')</h3>';
      ds.forEach(function (q, i) {
        h += '<div class="cau"><b>Câu ' + (i + 1) + '.</b> ' + E(String(q.q).trim()) + '</div>' + q.o.map(function (o, k) {
          return '<div class="pa">' + 'abcd'[k] + ') ' + E(o) + (coDapAn ? ' <b>(' + (q.a[k] ? 'Đúng' : 'Sai') + ')</b>' : '') + '</div>';
        }).join('');
      });
    }
    if (coDapAn) {
      h += '<h3 class="ngat-trang">BẢNG ĐÁP ÁN</h3><p><b>Phần I:</b> ' + tn.map(function (q, i) { return (i + 1) + '-' + 'ABCD'[q.a]; }).join(' · ') + '</p>' +
        (ds.length ? '<p><b>Phần II:</b> ' + ds.map(function (q, i) { return 'Câu ' + (i + 1) + ': ' + q.a.map(function (v, k) { return 'abcd'[k] + ' ' + (v ? 'Đ' : 'S'); }).join(', '); }).join(' · ') + '</p>' : '');
    }
    return h + '<p style="font-size:.85em;margin-top:16px">' + (d.loai === 'hsg' ? 'Thang 20 theo tỉ lệ cấu trúc Sở GDĐT Ninh Bình (CV 1229); đề luyện, không phải đề chính thức.' : 'Thang điểm theo QĐ 764/QĐ-BGDĐT; đề luyện, không phải đề minh hoạ hay đề dự đoán của Bộ.') + '</p></div>';
  }
};
