/* Đăng nhập (Bước 1 của Phân hệ 4–6; sửa 24/11/2026 theo yêu cầu của cô).
   HỌC SINH CHỈ CẦN GÕ TÊN (hàm máy chủ tham_gia_theo_ten, _cong-cu/supabase/schema_buoc5.sql; trùng tên giữa hai lớp thì chọn lớp). Cách cũ «mã lớp + mã học sinh» vẫn còn ở mục gập bên dưới.
   GIÁO VIÊN CHỈ CẦN NHẬP MẬT KHẨU (email nội bộ lấy ở SC.config.giaoVienEmail, không phải gõ); chủ dự án muốn đăng nhập bằng email khác thì mở mục gập «Đăng nhập bằng email».
   Chưa cấu hình máy chủ (SC.config trống) thì trang chỉ báo app đang chạy chế độ trên máy. */
SC.pages.dangnhap = {
  title: 'Đăng nhập',
  tab: 'hs', dang: false, loi: '', chonLop: null, tenDaGo: '',
  render: function (el) {
    var self = this, E = SC.esc;
    if (!SC.cloud.bat()) {
      el.innerHTML = '<div class="card"><h2>Đăng nhập</h2>' +
        '<p>Chưa kết nối máy chủ. Bạn vẫn dùng đầy đủ phần học và làm đề; <b>kết quả chỉ lưu trên trình duyệt của máy này</b>.</p>' +
        '<p class="mute">Giáo viên muốn bật đăng nhập và thống kê theo lớp: điền Project URL và anon key vào <code>assets/js/core/config.js</code> theo <code>HUONG-DAN-DANG-NHAP.md</code>.</p></div>';
      return;
    }
    var p = SC.cloud.phien();
    if (p.vaiTro === 'hs' || p.vaiTro === 'gv') {
      var who = p.vaiTro === 'gv'
        ? '<p>Đang đăng nhập với tư cách <b>giáo viên</b>.</p><p class="mute">Vào <a href="#/giaovien">Quản lý giáo viên</a> để tạo lớp, thêm tên học sinh, giao bài, xem thống kê và xuất đề in.</p>'
        : '<p>Đang vào lớp <b>' + E(p.lop && p.lop.ten_lop) + '</b> (khối ' + E(p.lop && p.lop.khoi) + ', năm học ' + E(p.lop && p.lop.nam_hoc) + ') ' + (p.hs && p.hs.ten ? 'với tên <b>' + E(p.hs.ten) + '</b>' : 'với mã học sinh <b>' + E(p.hs && p.hs.ma_hs) + '</b>') + '.</p>' +
          '<p class="mute">Xem <a href="#/baigiao">Bài cô giao</a> và <a href="#/hoso">Hồ sơ học tập</a> (tiến bộ, huy hiệu, xếp hạng). Đổi máy: nhờ cô bấm «Cho đăng nhập lại» cho tên của bạn.</p>';
      el.innerHTML = '<div class="card"><h2>Đăng nhập</h2>' + who +
        '<p><button class="btn alt" type="button" id="dn-thoat">' + (p.vaiTro === 'gv' ? 'Thoát' : 'Rời lớp trên máy này') + '</button></p>' +
        '<div id="dn-loi"></div></div>';
      el.querySelector('#dn-thoat').addEventListener('click', function () {
        if (p.vaiTro === 'hs' && !window.confirm('Rời lớp trên máy này? Muốn vào lại bạn phải nhờ cô bấm «Cho đăng nhập lại» cho tên của bạn.')) return;
        SC.cloud.dangXuat().then(function (r) { if (!r.ok) self.baoLoi(el, r.thongBao); });
      });
      return;
    }
    var hs = this.tab === 'hs', loiHtml = this.loi ? '<div class="fb" style="background:var(--badbg);color:var(--bad)">' + E(this.loi) + '</div>' : '';
    var form;
    if (hs) {
      var chon = this.chonLop && this.chonLop.length
        ? '<label for="dn-lop">Em học lớp nào?</label><select id="dn-lop">' + this.chonLop.map(function (l) { return '<option value="' + E(l) + '">' + E(l) + '</option>'; }).join('') + '</select>' : '';
      form = '<form id="dn-form" novalidate><label for="dn-ten">Tên của em</label>' +
        '<input id="dn-ten" maxlength="40" autocomplete="off" spellcheck="false" placeholder="ví dụ: Lan hoặc Minh Anh" value="' + E(this.tenDaGo) + '">' + chon +
        '<p class="mute">Gõ <b>đúng tên như cô đã ghi trong danh sách lớp</b> (có dấu hay không dấu đều được; danh sách ghi họ tên đầy đủ thì gõ đầy đủ). Hai bạn trùng tên thì tên bạn sau có thêm số (ví dụ «… 2»). Không nhập ngày sinh, số điện thoại hay mật khẩu vào đây.</p>' +
        '<p><button class="btn" type="submit" id="dn-gui">Vào lớp</button></p></form>' +
        '<details class="dn-cu"><summary class="mute">Vào bằng mã lớp + mã học sinh (cách cũ)</summary><form id="dn-form-ma" novalidate>' +
        '<label for="dn-malop">Mã lớp</label><input id="dn-malop" maxlength="12" autocomplete="off" autocapitalize="characters" spellcheck="false" style="text-transform:uppercase" placeholder="ví dụ: K7M2QX">' +
        '<label for="dn-hs">Mã học sinh</label><input id="dn-hs" maxlength="12" autocomplete="off" autocapitalize="characters" spellcheck="false" style="text-transform:uppercase" placeholder="ví dụ: 4HT9P">' +
        '<p class="mute">Dùng mã cô đã phát.</p><p><button class="btn alt" type="submit" id="dn-gui-ma">Vào lớp bằng mã</button></p></form></details>';
    } else {
      form = '<form id="dn-form" novalidate><label for="dn-mk">Mật khẩu giáo viên</label><input id="dn-mk" type="password" autocomplete="current-password">' +
        '<p><button class="btn" type="submit" id="dn-gui">Đăng nhập</button></p></form>' +
        '<details class="dn-cu"><summary class="mute">Đăng nhập bằng email (chủ dự án)</summary><form id="dn-form-em" novalidate>' +
        '<label for="dn-email">Email</label><input id="dn-email" type="email" autocomplete="username" spellcheck="false">' +
        '<label for="dn-mk2">Mật khẩu</label><input id="dn-mk2" type="password" autocomplete="current-password">' +
        '<p><button class="btn alt" type="submit" id="dn-gui-em">Đăng nhập bằng email</button></p></form></details>' +
        '<p class="mute">Tài khoản giáo viên do chủ dự án tạo một lần ở máy chủ (xem <code>HUONG-DAN-DANG-NHAP.md</code>).</p>';
    }
    el.innerHTML = '<div class="card"><h2>Đăng nhập</h2>' +
      '<div class="tabs" role="group" aria-label="Chọn cách đăng nhập"><button type="button" data-t="hs" class="' + (hs ? 'on' : '') + '">Học sinh</button><button type="button" data-t="gv" class="' + (hs ? '' : 'on') + '">Giáo viên</button></div>' +
      form + '<div id="dn-loi" role="alert">' + loiHtml + '</div></div>';
    el.querySelectorAll('[data-t]').forEach(function (b) { b.addEventListener('click', function () { self.tab = b.dataset.t; self.loi = ''; self.chonLop = null; self.render(el); }); });
    function gui(form, nut, chu, goi) {
      var f = el.querySelector(form); if (!f) return;
      f.addEventListener('submit', function (ev) {
        ev.preventDefault();
        if (self.dang) return;
        self.dang = true;
        var n = el.querySelector(nut); n.disabled = true; n.textContent = 'Đang kiểm tra…';
        goi().then(function (r) {
          self.dang = false;
          if (r.ok) { self.loi = ''; self.chonLop = null; self.tenDaGo = ''; return; }          // phiên đổi => khung app tự vẽ lại
          self.loi = r.thongBao || 'Không đăng nhập được.';
          self.chonLop = r.ly_do === 'trung_ten' && r.lop && r.lop.length ? r.lop : null;
          self.render(el);
        });
      });
    }
    gui('#dn-form', '#dn-gui', 'Vào lớp', function () {
      var ten = el.querySelector('#dn-ten'), lop = el.querySelector('#dn-lop');
      if (ten) self.tenDaGo = ten.value;
      return hs ? SC.cloud.hocSinhVaoTen(ten.value, lop ? lop.value : null) : SC.cloud.dangNhapGVMatKhau(el.querySelector('#dn-mk').value);
    });
    gui('#dn-form-ma', '#dn-gui-ma', 'Vào lớp bằng mã', function () { return SC.cloud.hocSinhVao(el.querySelector('#dn-malop').value, el.querySelector('#dn-hs').value); });
    gui('#dn-form-em', '#dn-gui-em', 'Đăng nhập bằng email', function () { return SC.cloud.dangNhapGV(el.querySelector('#dn-email').value, el.querySelector('#dn-mk2').value); });
  },
  baoLoi: function (el, m) {
    var b = el.querySelector('#dn-loi');
    if (b) b.innerHTML = '<div class="fb" style="background:var(--badbg);color:var(--bad)">' + SC.esc(m) + '</div>';
  }
};
