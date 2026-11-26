/* Luyện tập trực tuyến: chọn phạm vi (cả ngân hàng hoặc một bài), số câu, mức độ, dạng → làm → nộp → kết quả → lưu hồ sơ. */
SC.pages.luyen = {
  title: 'Luyện tập',
  preset: null,
  render: function (el) {
    var E = SC.esc, total = SC.questions.all().length;
    var pre = this.preset && this.preset.bai || ''; this.preset = null;
    var opts = '<option value="">Cả ngân hàng (' + total + ' câu)</option>';
    SC.data.curriculum.muc.forEach(function (m) {
      m.bai.forEach(function (b) {
        var n = SC.questions.filter({ bai: b.id }).length;
        if (n) opts += '<option value="' + b.id + '"' + (b.id === pre ? ' selected' : '') + '>Lớp ' + m.khoi + ' · Bài ' + b.so + '. ' + E(b.ten) + ' (' + n + ' câu)</option>';
      });
    });
    el.innerHTML = '<div class="card"><h2>Luyện đề theo bài</h2>' +
      '<p class="mute">Ngân hàng có <b>' + total + '</b> câu hỏi. Chọn phạm vi, số câu và dạng câu rồi bắt đầu làm bài.</p>' +
      '<div class="grid"><div><label for="fB">Phạm vi</label><select id="fB">' + opts + '</select></div>' +
      '<div><label for="fN">Số câu</label><select id="fN"><option>5</option><option selected>10</option><option>20</option></select></div>' +
      '' +
      '<div><label for="fD">Dạng câu</label><select id="fD"><option value="">Tất cả</option><option value="tn4">Trắc nghiệm 4 lựa chọn</option><option value="dung_sai">Đúng/sai nhiều ý</option><option value="tra_loi_ngan">Trả lời ngắn</option></select></div></div>' +
      '<p><button class="btn" id="go" type="button">Bắt đầu làm bài</button></p></div><div id="run"></div>';

    el.querySelector('#go').addEventListener('click', function () {
      var n = parseInt(el.querySelector('#fN').value, 10);
      var f = { bai: el.querySelector('#fB').value, muc_do: 0, dang: el.querySelector('#fD').value };
      var qs = SC.questions.pick(n, f);
      var run = el.querySelector('#run');
      if (!qs.length) { run.innerHTML = '<div class="empty">Chưa có câu nào khớp bộ lọc này. Hãy chọn "Tất cả" hoặc bài khác.</div>'; return; }
      SC.pages.luyen.run(run, qs);
    });
  },
  run: function (run, qs, tuyChon) {   // tuyChon: { baiGiao: mã bài giao, goiY: true/false } (Bước 3: bài cô giao quyết định có gợi ý hay không)
    var E = SC.esc;
    run.innerHTML = '';
    var goiY = tuyChon && tuyChon.goiY !== undefined ? tuyChon.goiY : SC.tutor && SC.tutor.batGoiY();   // gợi ý 3 cấp do giáo viên bật/tắt (Phân hệ 3); đề thi thử bấm giờ không có gợi ý
    var cards = qs.map(function (q, i) { var c = SC.QuestionCard(q, i + 1, { hint: goiY }); run.appendChild(c.el); return c; });
    // Bước 2: học sinh đã vào lớp => lượt luyện tập lưu trên máy chủ (câu trả lời ngắn chấm trên máy, không gửi lên)
    var idsMay = qs.filter(function (q) { return q.dang === 'tn4' || q.dang === 'dung_sai'; }).map(function (q) { return q.id; });
    var luotP = SC.cloud && SC.cloud.laHS() && idsMay.length ? SC.cloud.batDauLuot('LUYEN', { dsCau: idsMay, baiGiao: tuyChon && tuyChon.baiGiao }) : null;
    var bar = document.createElement('div');
    bar.className = 'row';
    bar.innerHTML = '<button class="btn" type="button" id="nop">Nộp bài</button>';
    run.appendChild(bar);
    var done = false;
    bar.querySelector('#nop').addEventListener('click', function () {
      if (done) return;
      done = true;
      var tong = 0, chi = [];
      cards.forEach(function (c) {
        var r = SC.questions.cham(c.q, c.getAnswer()), lv = c.hintLevel();
        if (lv >= 3) r = { dung: false, diem: 0 };   // đã xem giải thích (cấp 3): không tính điểm
        c.lock(r);
        tong += r.diem;
        var x = { qid: c.q.id, muc_do: c.q.muc_do, dang: c.q.dang, dung: r.dung, diem: r.diem, bai: c.q.bai };
        if (lv) x.goi_y = lv;
        chi.push(x);
      });
      var soDung = chi.filter(function (x) { return x.dung; }).length;
      var d10 = Math.round(tong / cards.length * 100) / 10;
      SC.progress.add({ id: 'L' + Date.now(), ts: new Date().toISOString(), so_cau: cards.length, so_dung: soDung, diem10: d10, chi_tiet: chi });
      bar.innerHTML = '<div class="card" style="flex:1"><h3>Kết quả</h3><p><b>' + soDung + '/' + cards.length + '</b> câu đúng hoàn toàn · điểm thử <b>' + d10.toString().replace('.', ',') + '/10</b></p>' +
        '<p class="mute">Kết quả đã lưu vào Hồ sơ học tập.</p>' +
        '<p class="mute" id="cloud-kq" aria-live="polite"></p><a class="btn alt" href="#/luyen" onclick="location.reload()">Làm bộ khác</a> <a class="btn" href="#/hoso">Xem hồ sơ học tập</a></div>';
      if (SC.cloud) SC.cloud.luuKetQua(luotP, cards, bar.querySelector('#cloud-kq'));
      bar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
};
