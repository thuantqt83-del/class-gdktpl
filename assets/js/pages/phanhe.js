/* Trang cửa vào Phân hệ 2 (Luyện thi 8 tuần). Phân hệ 3 ở pages/ai.js, Phân hệ 4 ở pages/lophoc*.js. Đề mục lấy từ data/phanhe.js (đúng thiết kế.docx). */
(function () {
  function dsMuc(ph) {
    return '<ul>' + ph.muc.map(function (m) { return '<li>' + SC.esc(m) + '</li>'; }).join('') + '</ul>';
  }
  function dau(ph) {
    return '<div class="card"><h2>' + SC.esc(ph.ten) + '</h2>' +
      '<p class="mute">' + SC.esc(ph.mota) + '</p>' + dsMuc(ph) + '</div>';
  }
  SC.pages.luyenthi = {
    title: 'Luyện thi',
    render: function (el) {
      var ph = SC.phanhe('luyenthi'), n = ['l10n', 'l11n', 'l12n'].reduce(function (a, k) { return a + ((SC.data.de && SC.data.de[k]) || []).length; }, 0);
      el.innerHTML = dau(ph) +
        '<div class="grid">' +
        '<div class="card"><h3>Luyện đề theo bài</h3><p class="mute">Chọn bài, số câu và dạng câu; chấm ngay.</p><a class="btn" href="#/luyen">Luyện tập</a></div>' +
        '<div class="card"><h3>Đề thi thử có bấm giờ</h3><p class="mute">' + n + ' đề theo khối: mỗi khối 10, 11, 12 có 40 đề chia bốn bộ (giữa kì 1, cuối kì 1, giữa kì 2, cuối kì 2); mỗi đề 24 câu trắc nghiệm và 4 câu đúng/sai, 50 phút. Thêm 24 đề ôn thi tốt nghiệp. Đề học sinh giỏi nằm ở mục Ôn luyện HSG.</p><a class="btn" href="#/de">Đề thi thử</a></div>' +
        '<div class="card"><h3>Lộ trình ôn tập</h3><p class="mute">Lộ trình theo tuần, kèm các đề gắn với từng giai đoạn.</p><a class="btn" href="#/lotrinh">Lộ trình</a></div></div>' +
        '<div class="card"><h3>Chấm điểm và phân tích kết quả</h3><p class="mute">Chấm tự động ngay sau khi nộp; xem thống kê kết quả ở <a href="#/hoso">Hồ sơ và tiến trình học tập</a>.</p></div>';
    }
  };
})();
