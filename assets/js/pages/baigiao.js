/* Bài cô giao (BƯỚC 3, dành cho học sinh đã vào lớp bằng mã). Hiện các bài giáo viên giao cho lớp: hạn nộp, số lượt còn lại, đã nộp chưa.
   «Làm bài» mở đề (bấm giờ) hoặc bộ câu luyện tập đúng bài đã giao; lượt làm gắn với bài giao và lưu lên máy chủ (cloudService.luuKetQua). */
SC.pages.baigiao = {
  title: 'Bài cô giao',
  ds: [],
  render: function (el) {
    var self = this, E = SC.esc;
    if (!(SC.cloud && SC.cloud.laHS())) {
      el.innerHTML = '<div class="card"><h2>Bài cô giao</h2><p>Trang này hiện các bài cô giao cho lớp. Bạn cần vào lớp (đăng nhập bằng tên): <a href="#/dangnhap">Đăng nhập</a> (tab Học sinh).</p></div>';
      return;
    }
    el.innerHTML = '<div class="card"><h2>Bài cô giao</h2><p class="mute" id="bg-tb" role="status">Đang tải…</p><p><button class="btn alt" type="button" id="bg-moi">Làm mới danh sách</button></p><div id="bg-ds"></div></div><div id="run"></div>';
    el.querySelector('#bg-moi').addEventListener('click', function () { self.tai(el); });
    this.tai(el);
  },
  tai: function (el) {
    var self = this, E = SC.esc, tb = el.querySelector('#bg-tb'), box = el.querySelector('#bg-ds');
    tb.textContent = 'Đang tải…';
    SC.cloud.baiGiaoCuaToi().then(function (r) {
      if (!r.ok) { tb.textContent = '⚠️ ' + r.thongBao; box.innerHTML = ''; return; }
      self.ds = r.du_lieu;
      if (!self.ds.length) { tb.textContent = ''; box.innerHTML = '<div class="empty">Cô chưa giao bài nào cho lớp.</div>'; return; }
      tb.textContent = 'Có ' + self.ds.length + ' bài. Bài hết hạn hoặc hết lượt thì không làm được nữa.';
      var bay = Date.now();
      box.innerHTML = self.ds.map(function (b, i) {
        var chuaMo = new Date(b.mo_luc) > bay, hetHan = b.han_nop && new Date(b.han_nop) < bay, hetLuot = b.so_luot_da_dung >= b.so_luot_toi_da;
        var tt = chuaMo ? '<span class="tag warn">chưa mở</span>' : hetHan ? '<span class="tag warn">hết hạn</span>' : hetLuot ? '<span class="tag warn">hết lượt</span>' : '<span class="tag">đang mở</span>';
        var lam = !chuaMo && !hetHan && !hetLuot;
        return '<div class="card"><h3>' + E(b.tieu_de) + '</h3><p>' + tt + '<span class="tag">' + (b.loai === 'de' ? 'đề thi thử bấm giờ' : 'luyện tập ' + (b.so_cau || '') + ' câu') + '</span>' + (b.da_nop ? '<span class="tag">đã nộp · điểm cao nhất ' + String(b.diem_10_cao == null ? '—' : b.diem_10_cao).replace('.', ',') + '/10</span>' : '') + '</p>' +
          '<p class="mute">Mở: ' + E(new Date(b.mo_luc).toLocaleString('vi-VN')) + ' · Hạn nộp: ' + E(b.han_nop ? new Date(b.han_nop).toLocaleString('vi-VN') : 'không có') + ' · Đã dùng ' + b.so_luot_da_dung + '/' + b.so_luot_toi_da + ' lượt</p>' +
          '<p><button class="btn" type="button" data-i="' + i + '"' + (lam ? '' : ' disabled') + '>Làm bài</button></p></div>';
      }).join('');
      box.querySelectorAll('[data-i]').forEach(function (bt) { bt.addEventListener('click', function () { self.bat(self.ds[+bt.dataset.i], el); }); });
    });
  },
  bat: function (b, el) {
    var run = el.querySelector('#run'), tb = el.querySelector('#bg-tb'), tuyChon = { baiGiao: b.bai_giao_id };
    run.innerHTML = '';
    if (b.loai === 'de' && /^cuatoi-/.test(b.ma_de)) {
      // Đề do cô tự thêm (đưa lên máy chủ): lấy CHỮ của đề từ máy chủ (không có đáp án), làm kiểu «mù đáp án»: máy chủ chấm.
      tb.textContent = 'Đang lấy đề «' + b.tieu_de + '» từ máy chủ…';
      SC.cloud.goi('lay_de_giao', { p_ma_de: b.ma_de }).then(function (r) {
        if (!r || !r.ok) { tb.textContent = '⚠️ ' + (({ khong_co_quyen: 'Đề này chưa mở cho lớp em.', khong_co_de: 'Cô đã gỡ đề này khỏi máy chủ. Báo cô giáo.', chua_dang_nhap: 'Chưa đăng nhập. Tải lại trang rồi thử lại.' })[r && r.ly_do] || 'Không lấy được đề.'); return; }
        var de = { id: r.ma_de, ten: r.ten, loai: 'cua-toi', khoi: r.khoi, thoi_gian: r.thoi_gian, mu: true,
          cau: (r.cau || []).map(function (c) { return { id: c.ma_cau, dang: c.dang, q: c.q, o: c.o, muc_do: 2, bai: '' }; }) };
        run.innerHTML = '';
        SC.pages.de.lam(run, de, tuyChon);
        tb.textContent = 'Đang làm «' + b.tieu_de + '» (máy chủ chấm điểm). Nộp xong, bấm «Làm mới danh sách» để cập nhật số lượt.';
      }).catch(function (e) { tb.textContent = '⚠️ ' + ((e && e.thongBao) || 'Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.'); });
      return;
    }
    if (b.loai === 'de') {
      var d = SC.pages.de.timDe(b.ma_de);
      if (!d) { tb.textContent = '⚠️ Đề «' + b.ma_de + '» không có trong app trên máy này. Báo cô giáo.'; return; }
      SC.pages.de.lam(run, d, tuyChon);
    } else {
      var kha = SC.questions.filter({ bai: b.ma_de }).filter(function (q) { return q.dang === 'tn4' || q.dang === 'dung_sai'; });
      var qs = SC.shuffle(kha).slice(0, b.so_cau || 10);
      if (!qs.length || (b.so_cau && qs.length !== b.so_cau)) { tb.textContent = '⚠️ Bài này không đủ ' + (b.so_cau || '') + ' câu trên máy này. Báo cô giáo.'; return; }
      tuyChon.goiY = !!b.cho_goi_y;
      SC.pages.luyen.run(run, qs, tuyChon);
    }
    tb.textContent = 'Đang làm «' + b.tieu_de + '». Nộp xong, bấm «Làm mới danh sách» để cập nhật số lượt.';
  }
};
