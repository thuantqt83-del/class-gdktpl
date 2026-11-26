/* Kho kiến thức lớp 10–11–12. Mục lục là thanh dọc bên trái: Lớp 10 · 11 · 12 → Kinh tế / Pháp luật → chủ đề → bài; bấm một bài để đọc ở khung bên phải.
   Nội dung từng bài nạp từ data/lopXX/... */
SC.pages.kho = {
  title: 'Kho kiến thức',
  khoi: 10, phan: 'kinh-te', bai: null, root: null,
  // thanh mục lục dọc (dùng <details> nên bàn phím và đọc màn hình đều dùng được)
  cay: function (E, cur) {
    var self = this, h = '<div class="k-tit">Mục lục</div>';
    cur.khoi.forEach(function (k) {
      var openK = k === self.khoi;
      h += '<details class="k-lop"' + (openK ? ' open' : '') + '><summary>Lớp ' + k + '</summary>';
      cur.phan.forEach(function (p) {
        var m = cur.muc.filter(function (x) { return x.khoi === k && x.phan === p.id; })[0];
        if (!m) return;
        h += '<details class="k-phan"' + (openK && p.id === self.phan ? ' open' : '') + '><summary data-k="' + k + '" data-p="' + p.id + '">' + E(p.ten) + '</summary>';
        var cd = '';
        m.bai.forEach(function (b) {
          if (b.chu_de !== cd) { cd = b.chu_de; h += '<div class="k-cd">' + E(cd) + '</div>'; }
          h += '<button type="button" class="k-bai' + (self.bai === b.id ? ' on' : '') + '" data-b="' + b.id + '" data-k="' + k + '" data-p="' + p.id + '">Bài ' + b.so + '. ' + E(b.ten) + '</button>';
        });
        h += '</details>';
      });
      h += '</details>';
    });
    return h;
  },
  render: function (el) {
    var self = this, E = SC.esc, cur = SC.data.curriculum;
    this.root = el;
    el.innerHTML = '<div class="kho"><aside class="kho-side" aria-label="Mục lục Kho kiến thức">' + this.cay(E, cur) + '</aside><section class="kho-main" id="kho-main" tabindex="-1"></section></div>';
    var main = el.querySelector('#kho-main');
    if (this.bai) this.chiTiet(main); else this.danhSach(main);
    el.querySelectorAll('.k-bai').forEach(function (b) {
      b.addEventListener('click', function () { self.khoi = +b.dataset.k; self.phan = b.dataset.p; self.bai = b.dataset.b; self.render(el); window.scrollTo(0, 0); });
    });
    el.querySelectorAll('.k-phan > summary').forEach(function (s) {   // bấm tên phần: đồng thời hiện danh sách bài của phần đó ở khung phải
      s.addEventListener('click', function () { self.khoi = +s.dataset.k; self.phan = s.dataset.p; self.bai = null; self.danhSach(main); });
    });
    if (window.innerWidth < 900) el.querySelectorAll('.kho-side details').forEach(function (d) { if (!d.classList.contains('k-lop') || !d.open) d.open = false; });
  },
  // khung phải khi chưa chọn bài: danh sách bài của khối/phần đang chọn
  danhSach: function (main) {
    var self = this, E = SC.esc, cur = SC.data.curriculum;
    var m = cur.muc.filter(function (x) { return x.khoi === self.khoi && x.phan === self.phan; })[0];
    var ten = cur.phan.filter(function (p) { return p.id === self.phan; })[0].ten;
    var h = '<div class="card"><h2>Lớp ' + self.khoi + ' · ' + E(ten) + '</h2><p class="mute">Chọn một bài ở mục lục bên trái hoặc ở danh sách dưới đây. Mỗi bài có hệ thống kiến thức (ô đánh số, có GHI NHỚ), sơ đồ nhánh, ví dụ thực tiễn, tình huống và câu hỏi tự kiểm tra.</p></div>';
    var cd = '';
    m.bai.forEach(function (b) {
      if (b.chu_de !== cd) { cd = b.chu_de; h += '<h3 class="k-cdt">' + E(cd) + '</h3>'; }
      var nq = SC.questions.filter({ bai: b.id }).length, co = !!SC.data.bai[b.id];
      h += '<button type="button" class="opt" data-b="' + b.id + '"><b>Bài ' + b.so + '.</b> ' + E(b.ten) +
        '<br><span class="mute">' + (co ? '<b>có bài giảng</b>' : 'chưa có bài giảng') + ' · ' + nq + ' câu hỏi</span></button>';
    });
    main.innerHTML = h;
    main.querySelectorAll('[data-b]').forEach(function (b) { b.addEventListener('click', function () { self.bai = b.dataset.b; self.render(self.root); window.scrollTo(0, 0); }); });
  },
  // Ảnh «hệ thống kiến thức» sẵn có (cắt từ ảnh sếp gửi); bài chưa có ảnh được dựng bằng heThong()
  HT_ANH: { '11-b01': 'assets/img/ht/l11-b01.jpg', '11-b02': 'assets/img/ht/l11-b02.jpg', '11-b04': 'assets/img/ht/l11-b04.jpg', '11-b05': 'assets/img/ht/l11-b05.jpg' },
  // «Vẽ» hệ thống kiến thức theo ảnh mẫu (lớp 11): băng tiêu đề «CHỦ ĐỀ… / BÀI…», các ô đánh số có biểu tượng, thanh GHI NHỚ. Ý trong ô lấy nguyên từ bài giảng theo chỉ số.
  veHeThong: function (d, info, E, ht) {
    function tach(s) {
      var ps = s.length > 90 ? s.split(/;\s+/) : [s];
      return ps.map(function (p) {
        p = p.trim(); p = p.charAt(0).toUpperCase() + p.slice(1);
        var m = /^([^:]{3,48}):\s+([\s\S]*)$/.exec(p);
        return m ? '<b>' + E(m[1]) + ':</b> ' + E(m[2]) : E(p);
      });
    }
    var h = '<div class="ht ht-ve"><div class="ht-head"><small>' + E(info.chu_de) + '</small><b>Bài ' + info.so + ': ' + E(info.ten) + '</b></div><div class="ht-grid">';
    ht.o.forEach(function (o, i) {
      var li = [];
      o[2].forEach(function (c) {
        var nd = d.noi_dung[c[0]]; if (!nd) return;
        (c[1] === '*' ? nd.y : [nd.y[c[1]]]).forEach(function (y) { if (y) li = li.concat(tach(y)); });
      });
      h += '<div class="ht-o ht-c' + (i % 5) + '"><h4><i>' + (i + 1) + '</i><span>' + E(o[0]) + '</span><em aria-hidden="true">' + o[1] + '</em></h4><ul>' +
        li.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>';
    });
    h += '</div><div class="ht-nho"><b>💡 GHI NHỚ</b><span>' + E(ht.nho) + '</span></div></div>';
    return h;
  },
  // Thẻ «hệ thống kiến thức» kiểu infographic: mỗi mục nội dung trọng tâm là một ô đánh số, cuối là GHI NHỚ từ sơ đồ của bài (không thêm ý ngoài bài giảng)
  heThong: function (d, info, E, kemDau) {
    function sach(t) { return t.replace(/\s*\(tr\.[^)]*\)\s*/g, ' ').replace(/^\s*\d+\.\s*/, '').trim(); }
    var h = '<div class="ht">';
    if (kemDau) h += '<div class="ht-head"><small>' + E(info.chu_de) + '</small><b>Bài ' + info.so + '. ' + E(info.ten) + '</b></div>';
    h += '<div class="ht-grid">';
    d.noi_dung.forEach(function (n, i) {
      h += '<div class="ht-o ht-c' + (i % 5) + '"><h4><i>' + (i + 1) + '</i>' + E(sach(n.tieu_de)) + '</h4><ul>' +
        n.y.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul></div>';
    });
    h += '</div>';
    if (d.so_do && d.so_do.nhanh && d.so_do.nhanh.length) {
      h += '<div class="ht-nho"><b>GHI NHỚ</b><span><b>' + E(d.so_do.goc) + '</b> gồm: ' +
        d.so_do.nhanh.map(function (n, i) { return (i + 1) + '. ' + E(n.ten); }).join(' · ') + '. Khi làm bài, gạch chân từ khoá của đề rồi đối chiếu với từng ý trên.</span></div>';
    }
    return h + '</div>';
  },
  chiTiet: function (el) {
    var self = this, E = function (s) { return SC.esc(SC.sach(s)); }, id = this.bai, info = null;   // chữ của bài đi qua SC.sach: bỏ chỗ nhắc SGK và số trang sách
    SC.data.curriculum.muc.forEach(function (m) { m.bai.forEach(function (b) { if (b.id === id) info = b; }); });
    var d = SC.data.bai[id], nq = SC.questions.filter({ bai: id }).length;
    var h = '<div class="card"><p><button type="button" class="btn alt" id="back">← Danh sách bài</button></p>' +
      '<h2>Bài ' + info.so + '. ' + E(info.ten) + '</h2><p class="mute">' + E(info.chu_de) + '</p>';
    function ul(a) { return '<ul>' + a.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul>'; }
    if (!d) {
      h += '<div class="empty">Bài này đang được hoàn thiện.</div>';
    } else {
      // Hệ thống kiến thức của bài (thay mục «yêu cầu cần đạt»): bài có ảnh sẵn thì dùng ảnh; bài còn lại dựng từ nội dung trọng tâm + sơ đồ của bài
      var anh = self.HT_ANH[id];
      if (anh) {
        h += '<h3>Hệ thống kiến thức</h3><img class="ht-anh" src="' + anh + '" alt="Hệ thống kiến thức Bài ' + info.so + '. ' + E(info.ten) + ' (ảnh tổng hợp)">' +
          '<p class="mute">Ảnh tổng hợp của trang «Trần Minh Kinhtế Phápluật» (Facebook), tác giả mời thầy cô tải về dùng. Chữ bên dưới là bản dựng từ bài giảng của app.</p>' +
          '<details class="card"><summary>Xem hệ thống kiến thức bằng chữ</summary>' + self.heThong(d, info, E, false) + '</details>';
      } else if (SC.data.ht && SC.data.ht[id]) {
        h += '<h3>Hệ thống kiến thức</h3>' + self.veHeThong(d, info, E, SC.data.ht[id]);
      } else {
        h += '<h3>Hệ thống kiến thức</h3>' + self.heThong(d, info, E, true);
      }
      if (d.so_do) {
        h += '<details class="card"><summary>Sơ đồ nhánh của bài</summary><b>' + E(d.so_do.goc) + '</b>' +
          d.so_do.nhanh.map(function (n) { return '<div style="margin-left:14px">└ <b>' + E(n.ten) + '</b>: ' + E(n.y) + '</div>'; }).join('') + '</details>';
      }
      if (d.vi_du && d.vi_du.length) h += '<h3>Ví dụ thực tiễn</h3>' + ul(d.vi_du);
      if (d.tinh_huong && d.tinh_huong.length) {
        h += '<h3>Tình huống vận dụng thực tiễn</h3>';
        d.tinh_huong.forEach(function (t) {
          h += '<div class="card" style="background:var(--bg)"><b>' + E(t.ten) + '</b><p style="white-space:pre-line">' + E(t.mo_ta) + '</p>' +
            (t.cau_hoi && t.cau_hoi.length ? '<p class="mute">Câu hỏi gợi ý:</p>' + ul(t.cau_hoi) : '') +
            '</div>';
        });
      }
      if (d.tai_lieu && d.tai_lieu.length) h += '<h3>Tài liệu</h3>' + ul(d.tai_lieu);
    }
    h += '<h3>Câu hỏi tự kiểm tra</h3>' + (nq ? '<p>' + nq + ' câu cho bài này.</p><button type="button" class="btn" id="tkt">Tự kiểm tra bài này</button>' : '<div class="empty">Chưa có câu hỏi cho bài này.</div>');
    h += '</div>';
    el.innerHTML = h;
    el.querySelector('#back').addEventListener('click', function () { self.bai = null; self.render(self.root); });
    var t = el.querySelector('#tkt');
    if (t) t.addEventListener('click', function () { SC.pages.luyen.preset = { bai: id }; location.hash = '#/luyen'; });
  }
};
