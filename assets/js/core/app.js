/* Khung app: điều hướng theo #/trang, chọn vai trò xem thử (Phần 5 thay bằng đăng nhập thật). */
(function () {
  // Menu = Trang chủ + các phân hệ (tên lấy từ data/phanhe.js) + Trợ giảng. Từ 23/11/2026: app tên «Class GDKT&PL»; phân hệ «Lớp học thông minh» đã đổi thành «Trò chơi Quiz tính điểm» (hai phòng Kinh doanh ảo, Pháp luật quanh ta); menu không đánh số.
  var PARENT = { luyen: 'luyenthi', de: 'luyenthi', lotrinh: 'luyenthi', kinhdoanh: 'quiz', phapluat: 'quiz', lophoc: 'quiz' };   // trang con tô sáng phân hệ cha
  var ALIAS = {};                                                              // địa chỉ cũ #/lophoc (ứng dụng độc lập đã đóng gói) vẫn là một trang (lophoc.js), tô sáng mục «Quiz tính điểm»
  var SHORT = { kho: 'Kho kiến thức', luyenthi: 'Luyện thi', hsg: 'Ôn luyện HSG', quiz: 'Quiz tính điểm', giaovien: 'Giáo viên', hoso: 'Hồ sơ & tiến trình' };
  function menu() {
    var m = [['home', 'Trang chủ', 'home']];
    SC.data.phanhe.forEach(function (p) { m.push([p.id, SHORT[p.id] || p.ten, p.icon || 'book']); });
    m.push(['ai', 'Trợ giảng', 'chat']);   // trang «Tiến độ dự án» (#/tiendo) là bảng theo dõi nội bộ: không đưa vào menu của học sinh
    return m;
  }
  var role = SC.storage.get('role', 'hs');
  if (role !== 'hs' && role !== 'gv') role = 'hs';
  var sel = document.getElementById('roleSel'), nav = document.getElementById('nav'), app = document.getElementById('app');
  sel.value = role;

  function current() {
    var h = (location.hash || '').replace(/^#\/?/, '');
    h = ALIAS[h] || h;
    return SC.pages[h] ? h : 'home';
  }
  function drawNav(cur) {
    nav.innerHTML = menu().map(function (m) {
      var on = m[0] === (PARENT[cur] || cur);
      return '<a href="#/' + m[0] + '"' + (on ? ' class="on" aria-current="page"' : '') + '>' + SC.icon(m[2]) + '<span>' + m[1] + '</span></a>';
    }).join('');
  }
  // Có kết nối máy chủ thì vai trò lấy từ phiên đăng nhập thật (khách chưa đăng nhập = học sinh); không thì dùng ô chọn trên máy.
  function vaiTro() { return SC.cloud && SC.cloud.bat() ? (SC.cloud.vaiTro() || 'hs') : role; }
  function veChip() {
    var box = document.getElementById('phien'), E = SC.esc;
    if (!box) return;
    if (!SC.cloud || !SC.cloud.bat()) { box.innerHTML = ''; return; }
    var p = SC.cloud.phien();
    box.innerHTML = p.vaiTro === 'gv' ? 'Giáo viên · <a href="#/giaovien">quản lý lớp</a> · <a href="#/dangnhap">tài khoản</a>'
      : p.vaiTro === 'hs' ? 'Lớp ' + E(p.lop && p.lop.ten_lop) + ' · ' + E(p.hs && p.hs.ten ? p.hs.ten : 'mã ' + (p.hs && p.hs.ma_hs)) + ' · <a href="#/baigiao">Bài cô giao</a> · <a href="#/dangnhap">tài khoản</a>'
      : '<a href="#/dangnhap">Đăng nhập</a>';
  }
  function route() {
    var cur = current(), p = SC.pages[cur];
    drawNav(cur);
    veChip();
    var on = nav.querySelector('a.on'); if (on && on.scrollIntoView) { try { on.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) {} }
    document.title = (cur === 'home' ? 'Class GDKT&PL' : p.title + ' · Class GDKT&PL');
    try { p.render(app, vaiTro()); }
    catch (e) { app.innerHTML = '<div class="card"><b>Có lỗi khi hiển thị trang này.</b><p class="mute">' + SC.esc(e.message) + '</p></div>'; }
  }
  sel.addEventListener('change', function () { role = sel.value; SC.storage.set('role', role); route(); });
  window.addEventListener('hashchange', function () { route(); app.focus(); window.scrollTo(0, 0); });
  route();
  if (SC.cloud && SC.cloud.bat()) {
    var oVaiTro = document.querySelector('.role'); if (oVaiTro) oVaiTro.style.display = 'none';   // vai trò do phiên đăng nhập quyết định
    SC.cloud.nghe(function () { route(); });                                                       // đăng nhập/thoát => vẽ lại trang hiện tại
    SC.cloud.khoiPhuc();                                                                           // khôi phục phiên cũ (nếu có)
  }
})();
