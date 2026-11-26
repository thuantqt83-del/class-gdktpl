/* Thẻ câu hỏi dùng chung cho luyện tập, bài tự kiểm tra, thi thử (Phần 2–3 dùng lại).
   Dùng: var card = SC.QuestionCard(q, soThuTu); container.appendChild(card.el);
         card.getAnswer(); card.lock(ketQua)  — hiện đúng/sai và lời giải.
   opts.hint = true: thêm nút gợi ý 3 cấp (cấp 1 nhắc kiến thức · cấp 2 đọc đoạn sách + loại một phương án sai · cấp 3 xem giải thích).
   Xem giải thích (cấp 3) thì câu đó không tính điểm; card.hintLevel() trả về cấp cao nhất đã dùng. Gợi ý lấy từ SC.tutor (không phải AI sinh). */
SC.QuestionCard = function (q, no, opts) {
  var E = SC.esc;
  var el = document.createElement('section');
  el.className = 'card';
  var ans = q.dang === 'tn4' ? null : (q.dang === 'dung_sai' ? q.o.map(function () { return null; }) : '');
  var locked = false;

  var html = '<div class="row"><span class="tag">Câu ' + no + '</span><span class="tag">' + E(SC.DANG[q.dang] || '') + '</span>' +
    (q.status === 'mau' ? '<span class="tag warn">câu mẫu kỹ thuật</span>' : '') + '</div>' +
    '<p style="white-space:pre-line">' + E(q.q) + '</p><div data-body></div><div data-hint></div><div data-fb></div>';
  el.innerHTML = html;
  var body = el.querySelector('[data-body]');

  function mark(btns, i, cls) { btns[i].classList.add(cls); }

  if (q.dang === 'tn4') {
    var btns = q.o.map(function (t, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'opt';
      b.textContent = SC.LETTERS[i] + '. ' + t;
      b.addEventListener('click', function () {
        if (locked) return;
        ans = i;
        btns.forEach(function (x, j) { x.classList.toggle('sel', j === i); });
      });
      body.appendChild(b);
      return b;
    });
  } else if (q.dang === 'dung_sai') {
    var rows = q.o.map(function (t, i) {
      var r = document.createElement('div');
      r.className = 'sub';
      r.innerHTML = '<span style="flex:1">' + 'abcd'[i] + ') ' + E(t) + '</span>';
      var bd = document.createElement('button'), bs = document.createElement('button');
      [bd, bs].forEach(function (b) { b.type = 'button'; b.className = 'btn alt'; });
      bd.textContent = 'Đúng'; bs.textContent = 'Sai';
      function set(v) {
        if (locked) return;
        ans[i] = v;
        bd.classList.toggle('on', v === true); bs.classList.toggle('on', v === false);
      }
      bd.addEventListener('click', function () { set(true); });
      bs.addEventListener('click', function () { set(false); });
      r.appendChild(bd); r.appendChild(bs); body.appendChild(r);
      return { r: r, bd: bd, bs: bs };
    });
  } else {
    var inp = document.createElement('input');
    inp.type = 'text'; inp.setAttribute('aria-label', 'Câu trả lời của em'); inp.placeholder = 'Nhập câu trả lời';
    inp.addEventListener('input', function () { if (!locked) ans = inp.value; });
    body.appendChild(inp);
  }

  var hintLevel = 0, revealed = false;
  // Khoá ô trả lời (không hiện đúng/sai): dùng khi đang nộp bài hoặc khi đề không có đáp án trên máy (đề do máy chủ chấm).
  function freeze() {
    locked = true;
    if (q.dang === 'tn4') btns.forEach(function (b) { b.disabled = true; });
    else if (q.dang === 'dung_sai') rows.forEach(function (x) { x.bd.disabled = x.bs.disabled = true; });
    else inp.disabled = true;
  }
  function lock(res) {
    locked = true;
    var fb = el.querySelector('[data-fb]');
    if (res && res.kin) { freeze(); fb.innerHTML = '<div class="fb"><b>Đã nộp.</b> Đáp án sẽ hiện sau hạn nộp bài.</div>'; return; }   // máy chủ chưa cho xem đáp án
    if (revealed) { fb.innerHTML = '<div class="fb"><b>Đã xem giải thích ở gợi ý cấp 3 nên câu này không tính điểm.</b></div>'; return; }
    var head;
    if (q.dang === 'tn4') {
      btns.forEach(function (b, i) {
        b.disabled = true;
        if (i === q.a) mark(btns, i, 'ok');
        else if (i === ans) mark(btns, i, 'bad');
      });
      head = res.dung ? 'Chính xác.' : 'Chưa đúng. Đáp án: ' + SC.LETTERS[q.a] + '.';
    } else if (q.dang === 'dung_sai') {
      rows.forEach(function (x, i) {
        x.bd.disabled = x.bs.disabled = true;
        x.r.style.color = ans[i] === q.a[i] ? 'var(--ok)' : 'var(--bad)';
        x.r.insertAdjacentHTML('beforeend', '<span class="mute">(đáp án: ' + (q.a[i] ? 'Đúng' : 'Sai') + ')</span>');
      });
      head = 'Đúng ' + res.so_y_dung + '/' + q.a.length + ' ý.';
    } else {
      inp.disabled = true;
      head = res.dung ? 'Chính xác.' : 'Chưa đúng. Đáp án chấp nhận: ' + q.a.join(' / ') + '.';
    }
    fb.innerHTML = '<div class="fb"><b>' + E(head) + '</b><br>' + E(SC.loiGiai(q)) + '</div>';
  }

  // ---- Gợi ý 3 cấp (chỉ khi bài luyện tập bật gợi ý và câu có gắn bài) ----
  if (opts && opts.hint && SC.tutor && SC.tutor.coGoiY(q)) {
    var hb = el.querySelector('[data-hint]'), E2 = SC.esc, H = SC.tutor.hint(q);
    var NHAN = ['💡 Gợi ý cấp 1: nhắc kiến thức', '💡 Gợi ý cấp 2: đọc đoạn bài học và loại bớt phương án', '💡 Cấp 3: xem giải thích đáp án'];
    hb.innerHTML = '<div class="row"><button type="button" class="btn alt" data-hbtn>' + NHAN[0] + '</button></div><div data-hpanel></div>';
    var btn = hb.querySelector('[data-hbtn]'), panel = hb.querySelector('[data-hpanel]');
    var ul = function (a) { return '<ul>' + a.map(function (x) { return '<li>' + E2(x) + '</li>'; }).join('') + '</ul>'; };
    btn.addEventListener('click', function () {
      if (locked || hintLevel >= 3) return;
      hintLevel++;
      if (hintLevel === 1) {
        panel.innerHTML += '<div class="fb"><b>Cấp 1 · Nhắc kiến thức.</b> Xem lại <b>Bài ' + H.bai.so + '. ' + E2(H.bai.ten_bai) + '</b>' +
          (H.doan ? ', mục «' + E2(H.doan.tieu_de.replace(/\s*\(tr\.[^)]*\)/, '')) + '»' : '') +
          '. Hệ thống kiến thức của bài nằm ở mục Kho kiến thức.</div>';
        btn.textContent = NHAN[1];
      } else if (hintLevel === 2) {
        var t = '<div class="fb"><b>Cấp 2 · Phân tích lựa chọn.</b> ';
        t += H.doan ? 'Đọc lại đoạn sau, gạch từ khoá của đề rồi đối chiếu từng phương án:' + ul(H.doan.y) : 'Chưa tìm được đoạn khớp; hãy đọc lại cả bài rồi đối chiếu từng phương án.';
        if (H.loai !== null && q.dang === 'tn4') {
          btns[H.loai].disabled = true; btns[H.loai].classList.add('out'); btns[H.loai].classList.remove('sel');
          if (ans === H.loai) ans = null;
          t += '<br>Đã làm mờ phương án <b>' + SC.LETTERS[H.loai] + '</b> (không phải đáp án).';
        }
        panel.innerHTML += t + '</div>';
        btn.textContent = NHAN[2];
      } else {
        revealed = true; locked = true;
        var kq = '';
        if (q.dang === 'tn4') {
          btns.forEach(function (b, i) { b.disabled = true; if (i === q.a) b.classList.add('ok'); });
          kq = 'Đáp án: <b>' + SC.LETTERS[q.a] + '</b>.';
        } else if (q.dang === 'dung_sai') {
          rows.forEach(function (x, i) { x.bd.disabled = x.bs.disabled = true; x.r.insertAdjacentHTML('beforeend', '<span class="mute">(đáp án: ' + (q.a[i] ? 'Đúng' : 'Sai') + ')</span>'); });
          kq = 'Đáp án từng ý đã hiện ở trên.';
        } else {
          inp.disabled = true; kq = 'Đáp án chấp nhận: <b>' + E2(q.a.join(' / ')) + '</b>.';
        }
        panel.innerHTML += '<div class="fb"><b>Cấp 3 · Giải thích đáp án.</b> ' + kq + '<br>' + E2(SC.loiGiai(q)) + '<br><span class="mute">Câu này không tính điểm vì đã xem giải thích.</span></div>';
        btn.disabled = true; btn.textContent = 'Đã xem giải thích';
      }
    });
  }

  return { el: el, q: q, getAnswer: function () { return ans; }, lock: lock, freeze: freeze, hintLevel: function () { return hintLevel; } };
};
