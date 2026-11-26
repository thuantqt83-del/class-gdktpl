/* Lớp học thông minh · BẢN ĐỒ KHU VỰC của «Pháp luật quanh ta» (giai đoạn B, 23/11/2026; thiết kế: THIET-KE-LOP-HOC-THONG-MINH-v2.md mục 3.2 số 5). ✅ BẢN NHÁP.
   Hiện ở trang giới thiệu của hành trình: mỗi khu vực (data/game/khu_vuc.js) liệt kê các tình huống ở đó, kèm mức tốt nhất em đã đạt ở từng cảnh (r.qua, do lophoc_hanhtrinh.js ghi).
   Bấm một tình huống = bắt đầu từ CHƯƠNG chứa nó (chỉ số và dấu vết đi theo cả chương, nên không nhảy vào giữa chương). Khu vực chưa có cảnh hiện «sắp có».
   Kết quả chỉ lưu trên máy, không ghi vào điểm hồ sơ. Gọi bằng «SC.bd &&» nên thiếu file này thì trang giới thiệu vẫn chạy bình thường. */
(function () {
  var E = SC.esc;
  function chuongCua(h, id) { for (var i = 0; i < h.chuong.length; i++) if (h.chuong[i].canh[id]) return i; return -1; }
  function html(h, r) {
    var KV = (SC.data.game && SC.data.game.khu_vuc) || []; if (!KV.length) return '';
    var qua = (r && r.qua) || {}, tong = 0, xong = 0;
    var luoi = KV.map(function (k) {
      var cs = (k.canh || []).filter(function (id) { return chuongCua(h, id) >= 0; });
      var daQua = cs.filter(function (id) { return qua[id] != null; }).length; tong += cs.length; xong += daQua;
      return '<section class="bd-kv"><h5><span aria-hidden="true">' + E(k.e) + '</span> ' + E(k.ten) + '</h5><p class="mute">' + E(k.mo) + '</p>' +
        '<p class="bd-tt">' + (cs.length ? 'Đã qua ' + daQua + '/' + cs.length + ' tình huống' : 'Sắp có tình huống ở khu vực này') + '</p><div class="bd-ds">' + cs.map(function (id) {
          var c = chuongCua(h, id), sc = h.chuong[c].canh[id], q = qua[id];
          return '<button type="button" class="bd-cs' + (q != null ? ' xong' : '') + '" data-bd="' + c + '"><span class="bd-sao" aria-hidden="true">' + (q === 2 ? '★' : q === 1 ? '◐' : q === 0 ? '○' : '·') + '</span>' +
            '<span class="bd-ten"><b>' + E(sc.tieu_de) + '</b><span class="mute">Cấp độ ' + (c + 1) + ' · Lớp ' + h.chuong[c].khoi + (sc.chung_cu ? ' · có bàn hồ sơ' : '') + '</span></span></button>';
        }).join('') + '</div></section>';
    }).join('');
    return '<h4>Bản đồ khu vực</h4><p class="mute">Em đã qua <b>' + xong + '/' + tong + '</b> tình huống. Bấm một tình huống để bắt đầu từ cấp độ chứa nó. ★ làm tốt · ◐ chấp nhận được · ○ còn rủi ro · · chưa chơi (theo lần tốt nhất ở cảnh đó).</p><div class="bd-luoi">' + luoi + '</div>';
  }
  function noi(box, batDau) {
    box.querySelectorAll('[data-bd]').forEach(function (b) { b.addEventListener('click', function () { batDau(+b.getAttribute('data-bd')); }); });
  }
  SC.bd = { html: html, noi: noi };
})();
