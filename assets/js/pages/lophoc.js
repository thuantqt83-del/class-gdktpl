/* TRÒ CHƠI QUIZ TÍNH ĐIỂM (24/11/2026) — trang của phân hệ «Quiz tính điểm» (thay «Lớp học thông minh», đã bỏ tên này).
   Hai PHÒNG dùng lại tên hai trò chơi cũ: «Kinh doanh ảo» (#/kinhdoanh, câu hỏi phần Kinh tế) và «Pháp luật quanh ta» (#/phapluat, câu hỏi phần Pháp luật).
   Trong mỗi phòng có hai tab: «Quiz tính điểm» (lophoc_quiz.js: bấm «Chơi ngay», tự lưu, tự chấm điểm; nút phụ «Thi đấu online với lớp» qua lophoc_quiz_online.js)
   và «Tình huống theo cấp độ» (trò chơi cũ, nay chia 4 cấp độ — Kinh doanh ảo: Khởi nghiệp, Điều hành, Xử lý khủng hoảng, Doanh nghiệp bền vững; Pháp luật quanh ta: Luật chơi chung, Quyền đi cùng nghĩa vụ, Công dân trưởng thành, Công dân có trách nhiệm: Phòng kinh doanh ảo ở lophoc_kdao.js, Pháp luật quanh ta ở lophoc_hanhtrinh.js + lophoc_vuviec.js; có hồ sơ nhân vật và danh hiệu).
   Địa chỉ #/quiz mở phòng đang chọn; #/lophoc (địa chỉ cũ) mở phòng Kinh doanh ảo để ứng dụng độc lập đã đóng gói trỏ về đúng chỗ.
   Các mục cũ (Ông chủ trẻ, Ngã rẽ, Soi lỗi, Tình huống trong bài) nằm ở _thung-rac/lop_hoc_gon_21-11-2026/ và có thể khôi phục. Số liệu trong mô phỏng là SỐ GIẢ ĐỊNH. */
SC.lophoc = SC.lophoc || {};
(function () {
  var E = SC.esc;
  var NHAP_VAI = { kinhdoanh: 'kinhdoanh', phapluat: 'phapluat' };   // id phòng → hàm SC.lophoc.<tên> của trò nhập vai
  SC.pages.quiz = {
    title: 'Trò chơi Quiz tính điểm',
    phong: 'kinhdoanh',
    che: 'quiz',
    render: function (el, role) { this.che = 'quiz'; this.ve(el, role); },   // vào từ menu hoặc địa chỉ: luôn mở tab Quiz tính điểm
    ve: function (el, role) {
      var self = this, ph = SC.phanhe('quiz'), P = SC.data.phongQuiz || [];
      if (!P.some(function (p) { return p.id === self.phong; })) self.phong = 'kinhdoanh';
      var cur = P.filter(function (p) { return p.id === self.phong; })[0];
      el.innerHTML = '<section class="gh gh-quiz" style="--band:' + E(ph.band) + '">' +
        '<div class="gh-t"><span class="gh-k">Thi đua · Tính điểm</span><h2>' + E(ph.ten) + '</h2><p>' + E(ph.mota) + '</p></div></section>' +
        '<div class="qz-rooms" role="group" aria-label="Chọn phòng">' + P.map(function (p) {
          var on = p.id === self.phong;
          return '<button type="button" class="qz-room' + (on ? ' on' : '') + '" data-p="' + E(p.id) + '" aria-pressed="' + on + '" style="--band:' + E(p.band) + '">' +
            '<span class="qz-room-t"><b>' + E(p.ten) + '</b><span>' + E(p.nhan) + '</span></span></button>';
        }).join('') + '</div>' +
        '<div class="tabs qz-tabs" role="group" aria-label="Chọn kiểu chơi trong phòng"><button type="button" data-c="quiz" class="' + (self.che === 'quiz' ? 'on' : '') + '">Quiz tính điểm</button>' +
        '<button type="button" data-c="nhapvai" class="' + (self.che === 'nhapvai' ? 'on' : '') + '">Tình huống theo cấp độ</button></div><div id="qz-body"></div>';
      el.querySelectorAll('[data-p]').forEach(function (b) { b.addEventListener('click', function () { self.phong = b.dataset.p; if (SC.quiz && SC.quiz.dung) SC.quiz.dung(); self.ve(el, role); }); });
      el.querySelectorAll('[data-c]').forEach(function (b) { b.addEventListener('click', function () { self.che = b.dataset.c; if (SC.quiz && SC.quiz.dung) SC.quiz.dung(); self.ve(el, role); window.scrollTo(0, 0); }); });
      var body = el.querySelector('#qz-body');
      if (self.che === 'quiz') { SC.lophoc.quiz(body, cur.id); return; }
      body.innerHTML = '<div class="card gh-hoso"><div id="lh-hoso" class="gm-hoso"></div></div><div id="lh-body"></div>';
      if (SC.hs) SC.hs.ve(body.querySelector('#lh-hoso'));   // hồ sơ nhân vật và danh hiệu (lophoc_hoso.js); không có file này thì thẻ để trống và tự ẩn
      SC.lophoc[NHAP_VAI[cur.id]](body.querySelector('#lh-body'), role);
    }
  };
  function vaoPhong(id) { return { title: (SC.phanhe(id) || {}).ten || id, render: function (el, role) { SC.pages.quiz.phong = id; SC.pages.quiz.render(el, role); } }; }
  SC.pages.kinhdoanh = vaoPhong('kinhdoanh');
  SC.pages.phapluat = vaoPhong('phapluat');
  SC.pages.lophoc = SC.pages.kinhdoanh;   // địa chỉ cũ
})();
