/* Lộ trình ôn tập 8 tuần (khung theo đề xuất) kèm bảng gắn đề thi thử theo khối. Tuần gắn đề là đề xuất, giáo viên chỉnh. */
SC.pages.lotrinh = {
  title: 'Lộ trình ôn tập',
  render: function (el) {
    var E = SC.esc, d = SC.data.lotrinh;
    function tbl(rows) {
      return '<table><tr><th style="width:90px">Tuần</th><th>Nội dung định hướng</th></tr>' +
        rows.map(function (r) { return '<tr><td>' + E(r.tuan) + '</td><td>' + E(r.nd) + '</td></tr>'; }).join('') + '</table>';
    }
    // tuần đề xuất cho 6 đề mỗi khối: HK I tuần 3, 4, 7; HK II tuần 2, 5, 7
    var TUAN = ['Kì 1 · tuần 3', 'Kì 1 · tuần 4', 'Kì 1 · tuần 7', 'Kì 2 · tuần 2', 'Kì 2 · tuần 5', 'Kì 2 · tuần 7'];
    function bangDe(k) {
      if (SC.data.de && SC.data.de['l' + k + 'n']) {
        var L = SC.data.de['l' + k + 'n'], bo = ['8T1', 'HK1', '8T2', 'HK2'];
        return '<h3>Đề lớp ' + k + ' (40 đề lấy từ đề nguồn)</h3><table><tr><th style="width:150px">Bộ</th><th>Đề</th></tr>' + bo.map(function (b) {
          var x = L.filter(function (d) { return d.bo === b; }); if (!x.length) return '';
          return '<tr><td>' + E(SC.tenBo(x[0].ten_bo)) + '</td><td>' + x.length + ' đề (Đề 1 – Đề ' + x.length + ')</td></tr>';
        }).join('') + '</table>';
      }
      var ds = (SC.data.de && SC.data.de['lop' + k]) || [];
      if (!ds.length) return '<div class="empty">Lớp ' + k + ' chưa có đề.</div>';
      return '<h3>Đề lớp ' + k + '</h3><table><tr><th style="width:120px">Học kì · tuần</th><th>Đề</th></tr>' +
        ds.map(function (x, i) { return '<tr><td>' + E(TUAN[i] || ('Kì ' + x.hoc_ki)) + '</td><td>' + E(SC.tenBo(x.ten)) + '</td></tr>'; }).join('') + '</table>';
    }
    function cuoiNam(k, ghi) {
      var ds = (SC.data.de && SC.data.de[k]) || [];
      if (!ds.length) return '<div class="empty">Chưa có đề.</div>';
      return '<p class="mute">' + E(ghi) + '</p><ul>' + ds.map(function (x) { return '<li>' + E(x.ten) + ' <span class="mute">(' + x.thoi_gian + ' phút, ' + ((x.cham && x.cham.tong) || 10) + ' điểm)</span></li>'; }).join('') + '</ul>';
    }
    el.innerHTML = '<div class="card"><h2>Lộ trình ôn tập 8 tuần</h2><p class="mute">Khung lộ trình gợi ý để em chia đều thời gian ôn tập; có thể điều chỉnh theo chương trình của nhà trường.</p>' +
      '<h3>Học kỳ I</h3>' + tbl(d.hk1) + '<h3>Học kỳ II</h3>' + tbl(d.hk2) + '<h3>Giai đoạn cuối năm</h3>' +
      d.cuoi_nam.map(function (c) { return '<p><b>' + E(c.ten) + ':</b> ' + E(c.nd) + '</p>'; }).join('') +
      '<p class="mute">Hai lộ trình dùng chung phần kiến thức nền.</p></div>' +
      '<div class="card"><h2>Đề thi thử gắn với lộ trình</h2>' + bangDe(10) + bangDe(11) + bangDe(12) +
      '<p><a class="btn" href="#/de">Vào làm đề thi thử</a></p></div>' +
      '<div class="card"><h2>Giai đoạn cuối năm: hai lộ trình (đề xuất)</h2>' +
      '<h3>Tốt nghiệp</h3>' + cuoiNam('tn', '24 đề ôn thi tốt nghiệp; làm lần lượt ở giai đoạn cuối năm sau khi ôn xong từng khối, những đề cuối để rà lỗ hổng.') +
      '<h3>Học sinh giỏi lớp 12 cấp tỉnh</h3>' + cuoiNam('hsg25', '21 đề học sinh giỏi (mỗi đề giữ cấu trúc của tỉnh), chấm quy về 20 điểm; dùng cho học sinh trong đội tuyển.') +
      '<p><a class="btn" href="#/de" onclick="SC.pages.de.khoi=\'tn\'">Đề tốt nghiệp</a> <a class="btn alt" href="#/hsg">Ôn luyện HSG</a></p></div>';
  }
};
