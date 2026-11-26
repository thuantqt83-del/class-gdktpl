/* Hồ sơ học tập (Phân hệ 6). Luôn có phần lịch sử làm bài lưu trên máy này. Khi học sinh đã vào lớp bằng mã học sinh (Bước 2) có thêm phần lấy từ máy chủ:
   tiến bộ theo tuần, huy hiệu, xếp hạng lớp (theo MÃ học sinh), năng lực theo bài và gợi ý lộ trình. Không có tên học sinh. */
SC.pages.hoso = {
  title: 'Hồ sơ học tập',
  render: function (el) {
    var self = this, E = SC.esc, s = SC.progress.summary(), l = SC.progress.list();
    var ph = SC.phanhe('hoso'), hs = SC.cloud && SC.cloud.laHS(), p = SC.cloud && SC.cloud.phien();
    var ghiChu = hs
      ? 'Bạn đang vào lớp <b>' + E(p.lop && p.lop.ten_lop) + '</b> ' + (p.hs && p.hs.ten ? 'với tên <b>' + E(p.hs.ten) + '</b>' : 'với mã học sinh <b>' + E(p.hs && p.hs.ma_hs) + '</b>') + ': kết quả làm bài được lưu lên máy chủ theo mã này. Phần «Trên máy này» ở cuối là lịch sử riêng của trình duyệt.'
      : (SC.cloud && SC.cloud.bat()
        ? 'Chưa vào lớp: kết quả chỉ lưu trên máy này. <a href="#/dangnhap">Đăng nhập bằng tên</a> để lưu lên máy chủ và xem tiến bộ theo tuần, huy hiệu, xếp hạng.'
        : 'Dữ liệu chỉ lưu trên trình duyệt của máy này, không gửi đi đâu. Khi giáo viên kết nối máy chủ, học sinh vào lớp bằng mã sẽ có thêm tiến bộ theo tuần, huy hiệu, xếp hạng và gợi ý lộ trình.');
    var h = '<div class="card"><h2>' + E(ph.ten) + '</h2><p class="mute">' + ghiChu + '</p></div>';
    if (hs) h += '<div id="mc"></div>';
    h += '<div class="card"><h3>Trên máy này</h3>';
    if (!l.length) {
      h += '<div class="empty">Chưa có lượt làm bài nào trên máy này. Vào <a href="#/luyen">Luyện tập</a> để bắt đầu.</div></div>';
      el.innerHTML = h;
      if (hs) self.veMayChu(el.querySelector('#mc'));
      return;
    }
    var sai = Object.keys(s.sai);
    h += '<h3>Câu cần ôn lại</h3>' + (sai.length ? '<p>' + sai.map(function (id) { return '<span class="tag warn">' + E(id) + ' ×' + s.sai[id] + '</span>'; }).join('') + '</p>' : '<p class="mute">Chưa có câu sai nào.</p>');
    h += '<h3>Lịch sử</h3><table><tr><th>Thời gian</th><th>Số câu</th><th>Đúng hoàn toàn</th><th>Điểm thử</th></tr>';
    l.slice(0, 20).forEach(function (a) {
      var t = new Date(a.ts);
      h += '<tr><td>' + E(t.toLocaleString('vi-VN')) + '</td><td>' + a.so_cau + '</td><td>' + a.so_dung + '</td><td>' + String(a.diem10).replace('.', ',') + (a.loai === 'quiz' ? ' <span class="mute">· Quiz ' + E(a.diem_quiz) + ' điểm</span>' : '') + '</td></tr>';
    });
    h += '</table><p><button class="btn alt" id="xoa" type="button">Xóa lịch sử trên máy này</button></p></div>';
    el.innerHTML = h;
    el.querySelector('#xoa').addEventListener('click', function () {
      if (confirm('Xóa toàn bộ lịch sử làm bài trên máy này? Việc này không hoàn tác được.')) { SC.progress.clear(); SC.pages.hoso.render(el); }
    });
    if (hs) self.veMayChu(el.querySelector('#mc'));
  },

  tenBai: function (id) {
    var kq = id;
    SC.data.curriculum.muc.forEach(function (m) { m.bai.forEach(function (b) { if (b.id === id) kq = 'Lớp ' + m.khoi + ' · Bài ' + b.so + '. ' + b.ten; }); });
    return kq;
  },

  // Phần lấy từ máy chủ (chỉ gọi khi đã vào lớp). Mỗi phần tự báo lỗi riêng, không làm hỏng các phần khác.
  veMayChu: function (box) {
    var self = this, E = SC.esc, f = function (x) { return String(x).replace('.', ','); };
    var ngay = function (d) { return String(d).split('-').reverse().join('/'); };
    box.innerHTML = '<div class="card"><p class="mute">Đang tải hồ sơ từ máy chủ…</p></div>';
    Promise.all([SC.cloud.tienBoTuan(), SC.cloud.huyHieu(), SC.cloud.xepHang(), SC.cloud.nangLuc()]).then(function (kq) {
      var tuan = kq[0], hh = kq[1], xh = kq[2], nl = kq[3], h = '';
      var loi = function (r) { return '<p class="mute">⚠️ ' + E(r.thongBao || 'Không tải được.') + '</p>'; };
      // 1. Tiến bộ theo tuần
      h += '<div class="card"><h3>Tiến bộ theo tuần</h3>';
      if (!tuan.ok) h += loi(tuan);
      else if (!tuan.du_lieu.length) h += '<div class="empty">Chưa có bài nào được lưu lên máy chủ. Làm một đề hoặc bài Luyện tập rồi nộp bài.</div>';
      else {
        var t = tuan.du_lieu.slice(0, 8), dh = '';
        if (t.length >= 2) { var dl = Math.round((t[0].diem_tb - t[1].diem_tb) * 100) / 100; dh = '<p>So với tuần trước: <b>' + (dl > 0 ? '+' : '') + f(dl) + ' điểm</b> (thang 10).</p>'; }
        h += dh + '<table><tr><th>Tuần từ</th><th>Số lượt</th><th>Điểm TB (thang 10)</th><th>Câu đúng hoàn toàn</th></tr>' +
          t.map(function (x) { return '<tr><td>' + E(ngay(x.tuan)) + '</td><td>' + x.so_luot + '</td><td>' + f(x.diem_tb) + '<div class="bar"><i style="width:' + Math.max(0, Math.min(100, x.diem_tb * 10)) + '%"></i></div></td><td>' + (x.ty_le_dung == null ? '—' : f(x.ty_le_dung) + '%') + '</td></tr>'; }).join('') + '</table>';
      }
      h += '</div>';
      // 2. Huy hiệu
      h += '<div class="card"><h3>Huy hiệu</h3>';
      if (!hh.ok) h += loi(hh);
      else h += '<ul>' + hh.du_lieu.map(function (x) { return '<li>' + (x.da_dat ? '🏅 <b>' + E(x.ten) + '</b> · đạt ' + E(new Date(x.ngay).toLocaleDateString('vi-VN')) : '<span class="mute">▫️ ' + E(x.ten) + '</span>') + '<br><span class="mute">' + E(x.mo_ta) + '</span></li>'; }).join('') + '</ul>';
      h += '</div>';
      // 3. Xếp hạng lớp
      h += '<div class="card"><h3>Xếp hạng trong lớp</h3>';
      if (!xh.ok) h += loi(xh);
      else if (!xh.du_lieu.length) h += '<div class="empty">Chưa có xếp hạng: giáo viên chưa bật xếp hạng cho lớp hoặc chưa ai nộp đề.</div>';
      else h += '<table><tr><th>Hạng</th><th>Mã học sinh</th><th>Điểm TB (thang 10)</th><th>Số đề</th></tr>' +
        xh.du_lieu.map(function (x, i) { return '<tr' + (x.la_toi ? ' style="font-weight:bold"' : '') + '><td>' + (i + 1) + '</td><td>' + E(x.ma_hoc_sinh) + (x.la_toi ? ' (bạn)' : '') + '</td><td>' + f(x.diem_tb) + '</td><td>' + x.so_de + '</td></tr>'; }).join('') +
        '</table><p class="mute">Chỉ tính đề thi thử cố định, mỗi đề lấy lần điểm cao nhất; hiện theo mã học sinh, không có tên.</p>';
      h += '</div>';
      // 4. Năng lực theo bài + 5. Gợi ý lộ trình
      h += '<div class="card"><h3>Năng lực theo bài</h3>';
      var yeu = [];
      if (!nl.ok) h += loi(nl);
      else if (!nl.du_lieu.length) h += '<div class="empty">Chưa có dữ liệu theo bài. Làm Luyện tập theo bài để xem năng lực từng bài.</div>';
      else {
        var ds = nl.du_lieu.slice().sort(function (a, b) { return a.ty_le - b.ty_le; });
        h += ds.map(function (x) { return '<div>' + E(self.tenBai(x.bai)) + ': <b>' + f(x.ty_le) + '%</b> <span class="mute">(' + x.so_cau + ' câu)</span><div class="bar"><i style="width:' + Math.max(0, Math.min(100, x.ty_le)) + '%"></i></div></div>'; }).join('');
        yeu = ds.filter(function (x) { return x.so_cau >= 5 && x.ty_le < 70; }).slice(0, 3);
      }
      h += '</div><div class="card"><h3>Gợi ý lộ trình</h3>';
      if (!nl.ok) h += '<p class="mute">Chưa có dữ liệu để gợi ý.</p>';
      else if (!nl.du_lieu.length) h += '<p class="mute">Làm vài bài Luyện tập theo bài (mỗi bài từ 5 câu) để nhận gợi ý ôn tập.</p>';
      else if (!yeu.length) h += '<p>Chưa có bài nào dưới 70%. Tiếp tục làm đề thi thử theo <a href="#/lotrinh">Lộ trình ôn tập</a>.</p>';
      else h += '<p class="mute">Gợi ý từ kết quả của bạn (bài đã làm từ 5 câu mà đúng dưới 70%): đọc lại bài, rồi làm thêm Luyện tập đúng bài đó.</p><ol>' +
        yeu.map(function (x) { return '<li>' + E(self.tenBai(x.bai)) + ' — đúng ' + f(x.ty_le) + '%. <button class="btn alt" type="button" data-doc="' + E(x.bai) + '">Đọc bài</button> <button class="btn" type="button" data-luyen="' + E(x.bai) + '">Luyện bài này</button></li>'; }).join('') + '</ol>';
      h += '<p class="mute">Gợi ý do quy tắc đơn giản em đặt, không phải đánh giá chính thức; giáo viên có thể xem để tham khảo.</p></div>';
      box.innerHTML = h;
      box.querySelectorAll('[data-doc]').forEach(function (b) { b.addEventListener('click', function () { SC.moBai(b.getAttribute('data-doc')); }); });
      box.querySelectorAll('[data-luyen]').forEach(function (b) { b.addEventListener('click', function () { SC.pages.luyen.preset = { bai: b.getAttribute('data-luyen') }; location.hash = '#/luyen'; }); });
    });
  }
};
