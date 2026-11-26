/* AI trợ giảng (mục phụ, không có số phân hệ) — bản chạy trên máy (chưa nối AI thật). Năm chức năng theo thiết kế:
   hỏi đáp từ kho · gợi ý 3 cấp khi làm bài · phân tích lỗi sai · bài luyện cá nhân · trợ giúp giáo viên (chưa làm, cần máy chủ).
   Mọi nội dung lấy từ các bài đã soạn (SC.tutor); không tự sinh nội dung mới, không tự sửa đáp án chuẩn, không tự quyết điểm. */
SC.pages.ai = {
  title: 'AI trợ giảng',
  tab: 'hoidap', q: '', khoi: 0, phan: '',
  TABS: [['hoidap', 'Hỏi đáp từ kho'], ['phantich', 'Phân tích lỗi sai'], ['luyen', 'Bài luyện cá nhân'], ['goiy', 'Gợi ý khi làm bài'], ['gv', 'Trợ giúp giáo viên']],
  PHAN: { 'kinh-te': 'Kinh tế', 'phap-luat': 'Pháp luật' },
  render: function (el, role) {
    var self = this, E = SC.esc, ph = SC.phanhe('ai');
    el.innerHTML = '<div class="card"><h2>' + E(ph.ten) + '</h2>' +
      '<p class="mute">' + ph.muc.map(E).join(' · ') + '</p>' +
      '<div class="fb"><b>Nói rõ để khỏi hiểu lầm:</b> trợ giảng này <b>chưa nối AI thật</b> (khoá AI phải đặt ở máy chủ). Bản hiện tại chạy ngay trên máy, ' +
      'chỉ <b>tìm và gợi ý từ nội dung các bài đã soạn</b>; không tự viết nội dung mới, không tự sửa đáp án chuẩn, không tự quyết điểm số.</div>' +
      '<div class="tabs" role="group" aria-label="Chọn chức năng" style="margin-top:12px">' +
      self.TABS.map(function (t) { return '<button type="button" data-t="' + t[0] + '" class="' + (t[0] === self.tab ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') +
      '</div></div><div id="ai-body"></div>';
    el.querySelectorAll('[data-t]').forEach(function (b) { b.addEventListener('click', function () { self.tab = b.dataset.t; self.render(el, role); }); });
    var box = el.querySelector('#ai-body');
    ({ hoidap: self.hoiDap, phantich: self.phanTich, luyen: self.luyenCaNhan, goiy: self.goiY, gv: self.troGiup })[self.tab].call(self, box, role);
  },

  // ---------- 1. Hỏi đáp từ kho ----------
  hoiDap: function (box) {
    var self = this, E = SC.esc;
    var chips = ['văn hoá tiêu dùng', 'thẻ tín dụng', 'quyền học tập', 'bảo hiểm y tế', 'kế hoạch kinh doanh', 'Hiến pháp'];
    box.innerHTML = '<div class="card"><h3>Hỏi một khái niệm, một quyền, một điều luật…</h3>' +
      '<div class="row"><input id="aiq" type="search" aria-label="Câu hỏi" placeholder="Ví dụ: thẻ tín dụng là gì? quyền học tập của công dân" value="' + E(self.q) + '" style="flex:1;min-width:220px">' +
      '<button type="button" class="btn" id="aigo">Tìm trong kho</button></div>' +
      '<div class="row"><div><label for="aik">Lớp</label><select id="aik"><option value="0">Cả ba lớp</option><option value="10">Lớp 10</option><option value="11">Lớp 11</option><option value="12">Lớp 12</option></select></div>' +
      '<div><label for="aip">Phần</label><select id="aip"><option value="">Kinh tế và Pháp luật</option><option value="kinh-te">Kinh tế</option><option value="phap-luat">Pháp luật</option></select></div></div>' +
      '<p class="mute">Gợi ý tìm: ' + chips.map(function (c) { return '<button type="button" class="tag" style="border:0;cursor:pointer" data-c="' + E(c) + '">' + E(c) + '</button>'; }).join(' ') + '</p></div><div id="airs"></div>';
    box.querySelector('#aik').value = String(self.khoi); box.querySelector('#aip').value = self.phan;
    function tim() {
      self.q = box.querySelector('#aiq').value.trim(); self.khoi = +box.querySelector('#aik').value; self.phan = box.querySelector('#aip').value;
      var out = box.querySelector('#airs');
      if (!self.q) { out.innerHTML = '<div class="empty">Gõ một từ khoá hoặc một câu hỏi ngắn, rồi bấm «Tìm trong kho».</div>'; return; }
      var r = SC.tutor.search(self.q, { khoi: self.khoi, phan: self.phan, n: 8 });
      if (!r.kq.length) { out.innerHTML = '<div class="empty">Chưa thấy đoạn nào khớp trong các bài đã dựng. Thử từ khoá khác (tên khái niệm, tên luật) hoặc bỏ bớt từ.</div>'; return; }
      out.innerHTML = '<p class="mute">' + r.kq.length + ' đoạn liên quan nhất trong các bài đã dựng (xếp theo độ khớp). Từ khoá em tìm: ' + r.qt.map(E).join(', ') + '.</p>' + r.kq.map(function (k) {
        return '<div class="card"><p><span class="tag">Lớp ' + k.khoi + '</span><span class="tag">' + self.PHAN[k.phan] + '</span><span class="tag">Bài ' + k.so + '</span><span class="tag">' + E(k.loai) + '</span></p>' +
          '<p><b>' + E(k.tieu_de.replace(/\s*\(tr\.[^)]*\)/, '')) + '</b> <span class="mute">· Bài ' + k.so + '. ' + E(k.ten_bai) + '</span></p>' +
          '<p>' + k.html + '</p>' +
          (k.van_ban.length ? '<p class="mute">Văn bản/điều khoản được nhắc trong đoạn: ' + k.van_ban.map(function (v) { return '<span class="tag warn">' + E(v) + '</span>'; }).join('') + '</p>' : '') +
          '<button type="button" class="btn alt" data-mo="' + E(k.bai) + '">Mở bài này</button></div>';
      }).join('') + '<p class="mute">Nội dung lấy từ các bài học trong ứng dụng. <b>Chưa đối chiếu văn bản pháp luật gốc</b>, chưa có dữ liệu hiệu lực và ngày cập nhật: cần tra văn bản gốc trước khi dùng vào việc chính thức.</p>';
      out.querySelectorAll('[data-mo]').forEach(function (b) { b.addEventListener('click', function () { SC.moBai(b.dataset.mo); }); });
    }
    box.querySelector('#aigo').addEventListener('click', tim);
    box.querySelector('#aiq').addEventListener('keydown', function (e) { if (e.key === 'Enter') tim(); });
    box.querySelectorAll('[data-c]').forEach(function (b) { b.addEventListener('click', function () { box.querySelector('#aiq').value = b.dataset.c; tim(); }); });
    if (self.q) tim();
  },

  // chạy một bộ câu bằng trang Luyện tập (có gợi ý, chấm, lưu hồ sơ)
  chay: function (run, qs) {
    if (!qs.length) { run.innerHTML = '<div class="empty">Chưa có câu nào phù hợp. Thử đổi lớp hoặc phần.</div>'; return; }
    SC.pages.luyen.run(run, qs);
    run.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  // ---------- 2. Phân tích lỗi sai ----------
  phanTich: function (box) {
    var self = this, E = SC.esc, p = SC.tutor.phanTich();
    if (!p.tong) { box.innerHTML = '<div class="card"><div class="empty">Chưa có lượt làm bài nào để phân tích. Vào <a href="#/luyen">Luyện tập</a> hoặc <a href="#/de">Đề thi thử</a> làm vài câu, rồi quay lại đây.</div></div>'; return; }
    var h = '<div class="card"><h3>Em đang ở đâu?</h3><div class="grid"><div class="stat"><b>' + p.luot + '</b>lượt làm bài</div><div class="stat"><b>' + p.tong + '</b>câu đã làm</div><div class="stat"><b>' + p.chinhXac + '%</b>mức chính xác</div></div>';
    h += '<h3>Gợi ý nguyên nhân</h3><ul>' + p.nguyenNhan.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul>' +
      '<p class="mute">Rút ra từ mẫu làm bài trên máy này theo các quy tắc đơn giản, <b>không phải chẩn đoán</b>; học sinh và giáo viên cân nhắc thêm.</p></div>';
    h += '<div class="card"><h3>Bài nên ôn trước</h3>';
    if (!p.yeu.length) h += '<p class="mute">Chưa có bài nào làm từ 3 câu trở lên mà đúng dưới 75%.</p>';
    else {
      h += '<table><tr><th>Bài</th><th>Đã làm</th><th>Đúng</th><th></th></tr>';
      p.yeu.slice(0, 6).forEach(function (x) {
        h += '<tr><td>Lớp ' + x.khoi + ' · Bài ' + x.so + '. ' + E(x.ten) + '</td><td>' + x.tong + ' câu</td><td>' + x.pct + '%</td>' +
          '<td><button type="button" class="btn alt" data-doc="' + E(x.bai) + '">Đọc lại</button> <button type="button" class="btn" data-lai="' + E(x.bai) + '">Luyện lại</button></td></tr>';
      });
      h += '</table>';
    }
    h += '</div>';
    if (p.hay.length) {
      h += '<div class="card"><h3>Câu sai nhiều nhất</h3>';
      p.hay.forEach(function (x) {
        h += '<div class="card" style="background:var(--bg)"><p><span class="tag warn">sai ' + x.lan + ' lần</span></p><p style="white-space:pre-line">' + E(x.q.q.length > 260 ? x.q.q.slice(0, 257) + '…' : x.q.q) + '</p>' +
          '<p class="mute">' + E(SC.loiGiai(x.q)) + '</p></div>';
      });
      h += '</div>';
    }
    h += '<div id="airun"></div>';
    box.innerHTML = h;
    box.querySelectorAll('[data-doc]').forEach(function (b) { b.addEventListener('click', function () { SC.moBai(b.dataset.doc); }); });
    box.querySelectorAll('[data-lai]').forEach(function (b) {
      b.addEventListener('click', function () { self.chay(box.querySelector('#airun'), SC.tutor.luyenCaNhan({ bai: b.dataset.lai, n: 10 }).cau); });
    });
  },

  // ---------- 3. Bài luyện cá nhân ----------
  luyenCaNhan: function (box) {
    var self = this, E = SC.esc, p = SC.tutor.phanTich(), muc = SC.tutor.mucDeXuat(p), plan;
    if (!p.tong) plan = 'Chưa có dữ liệu làm bài, nên em chọn lớp và phần muốn luyện; sau vài lượt làm, trợ giảng sẽ tự chọn bài yếu cho em.';
    else if (p.yeu.length) plan = 'Chỗ yếu hiện nay: ' + p.yeu.slice(0, 3).map(function (x) { return 'Bài ' + x.so + ' (lớp ' + x.khoi + ', đúng ' + x.pct + '%)'; }).join('; ') + '. Một nửa bộ câu là câu em từng làm sai.';
    else plan = 'Chưa bài nào đúng dưới 75%. Em luyện trên toàn ngân hàng để nâng dần.';
    box.innerHTML = '<div class="card"><h3>Tạo bài luyện cho em</h3><p>' + plan + '</p>' +
      '<div class="grid"><div><label for="lcn">Số câu</label><select id="lcn"><option>5</option><option selected>10</option><option>15</option><option>20</option></select></div>' +
      '' +
      '<div><label for="lck">Lớp</label><select id="lck"><option value="0">Cả ba lớp</option><option value="10">Lớp 10</option><option value="11">Lớp 11</option><option value="12">Lớp 12</option></select></div>' +
      '<div><label for="lcp">Phần</label><select id="lcp"><option value="">Kinh tế và Pháp luật</option><option value="kinh-te">Kinh tế</option><option value="phap-luat">Pháp luật</option></select></div></div>' +
      '<p><button type="button" class="btn" id="lcgo">Tạo bài luyện</button></p>' +
      '<p class="mute">Bộ câu chỉ lấy từ ngân hàng câu hỏi đã có. Khi sau này có AI thật tạo câu mới, câu đó phải được giáo viên duyệt trước khi vào ngân hàng chính thức.</p></div><div id="airun"></div>';
    box.querySelector('#lcgo').addEventListener('click', function () {
      var kq = SC.tutor.luyenCaNhan({ n: +box.querySelector('#lcn').value, muc: 0, khoi: +box.querySelector('#lck').value || 0, phan: box.querySelector('#lcp').value });
      self.chay(box.querySelector('#airun'), kq.cau);
    });
  },

  // ---------- 4. Gợi ý khi làm bài ----------
  goiY: function (box, role) {
    var self = this, bat = SC.tutor.batGoiY();
    box.innerHTML = '<div class="card"><h3>Gợi ý ba cấp khi làm bài</h3>' +
      '<p>Trong <a href="#/luyen">Luyện tập</a>, mỗi câu có nút gợi ý. Em bấm từng cấp, tự chọn đáp án rồi mới nộp:</p><ol>' +
      '<li><b>Cấp 1 · Nhắc kiến thức:</b> bài nào, mục nào và hệ thống kiến thức của bài.</li>' +
      '<li><b>Cấp 2 · Phân tích lựa chọn:</b> hiện đoạn bài học liên quan để em đối chiếu và làm mờ một phương án sai (với câu trắc nghiệm).</li>' +
      '<li><b>Cấp 3 · Giải thích đáp án:</b> hiện đáp án, lời giải và căn cứ. Câu đã xem cấp 3 <b>không tính điểm</b>.</li></ol>' +
      '<p class="mute">Gợi ý lấy nguyên từ bài giảng và lời giải đã soạn, không phải AI sinh. Đề thi thử bấm giờ không có gợi ý.</p>' +
      (role === 'gv'
        ? '<label style="display:flex;gap:8px;align-items:center;color:var(--ink)"><input type="checkbox" id="gybat" style="width:auto"' + (bat ? ' checked' : '') + '> Cho phép học sinh dùng gợi ý khi Luyện tập</label>' +
          '<p class="mute">Cài đặt này hiện chỉ có tác dụng trên máy này. Bật/tắt theo từng lớp cần kết nối máy chủ.</p>'
        : '<p>Gợi ý đang <b>' + (bat ? 'bật' : 'tắt') + '</b> (giáo viên đặt).</p>') +
      '<p><button type="button" class="btn"' + (bat ? '' : ' disabled') + ' id="gythu">Làm thử 3 câu có gợi ý</button></p></div><div id="airun"></div>';
    var cb = box.querySelector('#gybat');
    if (cb) cb.addEventListener('change', function () { SC.tutor.datGoiY(cb.checked); self.render(document.getElementById('app'), role); });
    box.querySelector('#gythu').addEventListener('click', function () {
      self.chay(box.querySelector('#airun'), SC.shuffle(SC.questions.all().filter(function (q) { return SC.tutor.coGoiY(q) && q.dang === 'tn4'; })).slice(0, 3));
    });
  },

  // ---------- 5. Trợ giúp giáo viên ----------
  troGiup: function (box) {
    box.innerHTML = '<div class="card"><h3>Trợ giúp giáo viên <span class="tag warn">⏳ Chưa làm</span></h3>' +
      '<p>Tổng hợp tình hình cả lớp, học sinh có dấu hiệu giảm sút, câu cả lớp hay sai, gợi ý nội dung phụ đạo. Cần dữ liệu của nhiều học sinh gửi về <b>máy chủ</b> và AI thật gọi qua máy chủ.</p>' +
      '<p class="mute">Trong lúc chờ, từng học sinh đã có <a href="#/hoso">Hồ sơ học tập</a> và tab «Phân tích lỗi sai» trên máy của mình. Mọi đề xuất của AI sau này giáo viên được duyệt, sửa hoặc bỏ; AI không tự sửa đáp án chuẩn và không tự quyết điểm số.</p></div>' +
      '<div class="card"><h3>Hỏi đáp pháp luật nguồn chính thống <span class="tag warn">⏳ Chưa làm</span></h3><p class="mute">Hiển thị tên văn bản, điều khoản, hiệu lực, ngày cập nhật khi có dữ liệu đã xác minh. Chưa có kho văn bản gốc trong app; tab «Hỏi đáp từ kho» mới chỉ tìm trong nội dung các bài học đã dựng.</p></div>';
  }
};
