SC.pages.tiendo = {
  title: 'Tiến độ dự án',
  render: function (el) {
    var E = SC.esc, T = { xong: '✅ Xong', dang: '🔧 Đang làm', cho: '⏳ Chờ' };
    el.innerHTML = '<div class="card"><h2>Tiến độ dự án: 8 phần</h2><p class="mute">Làm lần lượt, xong phần nào dùng được phần đó.</p><table>' +
      '<tr><th>Phần</th><th>Nội dung</th><th>Trạng thái</th><th>Cần trước khi làm</th></tr>' +
      SC.data.tiendo.map(function (r) {
        return '<tr><td>' + r.p + '</td><td>' + E(r.ten) + '</td><td>' + T[r.tt] + '</td><td>' + E(r.can) + '</td></tr>';
      }).join('') + '</table></div>';
  }
};
