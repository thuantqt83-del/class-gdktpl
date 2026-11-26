/* Phân hệ 3 · Ôn luyện học sinh giỏi: các đề HSG LẤY TỪ ĐỀ NGUỒN của giáo viên (data/de/hsg25.js), giữ nguyên chữ của đề.
   Làm bài và chấm điểm dùng lại SC.pages.de.lam (bấm giờ, chấm thử trên máy). Thang điểm quy về 20 theo cấu trúc Sở GDĐT Ninh Bình (CV 1229): Phần I 12 điểm, Phần II 8 điểm. */
SC.pages.hsg = {
  title: 'Ôn luyện HSG',
  loc: '',
  render: function (el, role) {
    var self = this, E = SC.esc, gv = role === 'gv', de = (SC.data.de && SC.data.de.hsg25) || [];
    function khoa(d) {
      var k = d.khoa || {}, t = [];
      if (k['khớp 2 nguồn']) t.push(k['khớp 2 nguồn'] + ' câu khớp 2 nguồn (gạch chân và file ĐÁP ÁN)');
      if (k['1 nguồn']) t.push(k['1 nguồn'] + ' câu chỉ có 1 nguồn');
      if (k['ĐÃ TỰ GIẢI LẠI']) t.push('<b>' + k['ĐÃ TỰ GIẢI LẠI'] + ' câu em đã tự giải lại</b>');
      return t.join(' · ');
    }
    function the(d, i) {
      var bo = d.bo_cau && d.bo_cau.length ? '<p class="mute">Bỏ câu hỏng: ' + d.bo_cau.map(function (b) { return E(b.nhan + ' — ' + b.ly_do); }).join('; ') + '</p>' : '';
      return '<div class="card"><h3>' + E(d.ten) + '</h3>' +
        '<p>' + E(d.cau_truc) + ' · ' + d.thoi_gian + ' phút (thời gian luyện) · quy về 20 điểm</p>' +
        (gv ? '<details><summary class="mute">Thông tin nguồn đề (dành cho giáo viên)</summary><p class="mute">Khoá: ' + khoa(d) + '</p>' + (d.sua ? '<p class="mute">' + E(d.sua) + '</p>' : '') + bo + '</details>' : '') +
        '<p><button class="btn" type="button" data-de="' + E(d.id) + '">Làm đề này (bấm giờ)</button></p></div>';
    }
    var ql = de.filter(function (d) { return !self.loc || E(d.ten).toLowerCase().indexOf(self.loc.toLowerCase()) >= 0; });
    el.innerHTML = '<div class="card"><h2>Ôn luyện học sinh giỏi</h2>' +
      '<p>' + de.length + ' đề ôn luyện học sinh giỏi môn Giáo dục kinh tế và pháp luật lớp 12: làm bài có bấm giờ, chấm quy về thang 20 điểm.</p>' +
      '<p class="mute">Thang điểm quy về 20 theo tỉ lệ cấu trúc của Sở GDĐT Ninh Bình (CV 1229): Phần I (trắc nghiệm) 12 điểm chia đều các câu; Phần II (đúng/sai) 8 điểm chia đều các câu, mỗi câu tính theo số ý đúng (1 ý 3/16 · 2 ý 6/16 · 3 ý 10/16 · 4 ý 16/16 điểm tối đa của câu). ' +
      'Thời gian làm bài là thời gian luyện tập, không phải thời gian chính thức của từng tỉnh.</p>' +
      '<div><label for="hl">Lọc theo tên đề</label><input id="hl" type="search" placeholder="ví dụ: Thanh Hóa, Ninh Bình, Hải Phòng, Đề 07" value="' + E(self.loc) + '"></div></div>' +
      (ql.map(the).join('') || '<div class="empty">Không có đề nào khớp.</div>') + '<div id="run"></div>';
    var inp = el.querySelector('#hl');
    inp.addEventListener('input', function () { self.loc = inp.value; var p = inp.selectionStart; self.render(el); var n = el.querySelector('#hl'); n.focus(); try { n.setSelectionRange(p, p); } catch (e) {} });
    el.querySelectorAll('button[data-de]').forEach(function (b) {
      b.addEventListener('click', function () {
        var d = de.filter(function (x) { return x.id === b.getAttribute('data-de'); })[0];
        if (d) SC.pages.de.lam(el.querySelector('#run'), d);
      });
    });
  }
};
