/* Thẻ hỏi nhanh cho trò chơi và thử thách (khác QuestionCard: chọn một phương án là có kết quả ngay).
   SC.AskCard(q, { nhan, giauKetQua, onPick(i, dung, the) }) → { el, btns, hide([i…]), chon, xong() , lo() }
   giauKetQua = true: chỉ tô phương án đã chọn, chưa lộ đúng/sai (dùng cho đấu trường 2 người); gọi the.lo(i) để lộ sau. Chỉ nhận câu trắc nghiệm 4 lựa chọn. */
SC.AskCard = function (q, o) {
  o = o || {};
  var E = SC.esc, el = document.createElement('section'), xong = false, chon = null;
  el.className = 'card';
  el.innerHTML = '<div class="row">' + (o.nhan ? '<span class="tag">' + E(o.nhan) + '</span>' : '') + '</div>' +
    '<p style="white-space:pre-line">' + E(q.q) + '</p><div data-body></div>';
  var body = el.querySelector('[data-body]');
  var btns = q.o.map(function (t, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'opt'; b.textContent = SC.LETTERS[i] + '. ' + t;
    b.addEventListener('click', function () { pick(i); });
    body.appendChild(b);
    return b;
  });
  function lo(i) {
    btns.forEach(function (b, j) {
      b.disabled = true; b.classList.remove('sel');
      if (j === q.a) b.classList.add('ok'); else if (j === i) b.classList.add('bad');
    });
  }
  function pick(i) {
    if (xong || btns[i].disabled) return;
    xong = true; chon = i;
    btns.forEach(function (b) { b.disabled = true; });
    if (o.giauKetQua) btns[i].classList.add('sel'); else lo(i);
    if (o.onPick) o.onPick(i, i === q.a, api);
  }
  function hide(idxs) { idxs.forEach(function (i) { btns[i].disabled = true; btns[i].classList.add('out'); }); }
  var api = { el: el, btns: btns, hide: hide, lo: lo, chon: function () { return chon; }, xong: function () { return xong; }, pick: pick };
  return api;
};
