/* Lớp học thông minh · Phòng kinh doanh ảo, tab phụ «Ôn nhanh» (trước là «Thực hành nhanh»): ba mô phỏng nhỏ gắn với bài trong sách. MỌI SỐ LIỆU LÀ SỐ GIẢ ĐỊNH để học khái niệm, không phải số liệu thật.
   1) Cửa hàng của em — giá cả thị trường, cung–cầu, cạnh tranh, lợi nhuận (Lớp 10 Bài 4).
   2) Kế hoạch tài chính cá nhân — bốn bước lập kế hoạch (Lớp 10 Bài 10).
   3) Trả góp hay trả một lần — chênh lệch chi phí tín dụng và tiền mặt (Lớp 10 Bài 9). */
(function () {
  var E = SC.esc, tab = 'cuahang';

  SC.lophoc.kinhte = function (box) {
    var T = [['cuahang', '1. Cửa hàng của em'], ['taichinh', '2. Kế hoạch tài chính cá nhân'], ['tragop', '3. Trả góp hay trả một lần?']];
    box.innerHTML = '<div class="card"><h3>Ôn nhanh</h3><p class="mute">Em đóng vai người ra quyết định kinh tế. <b>Mọi con số trong trò chơi là số giả định</b> để học cách suy nghĩ, không phải số liệu thật.</p>' +
      '<div class="tabs" role="group" aria-label="Chọn mô phỏng">' + T.map(function (t) { return '<button type="button" data-s="' + t[0] + '" class="' + (t[0] === tab ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') + '</div></div><div id="kt-body"></div>';
    box.querySelectorAll('[data-s]').forEach(function (b) { b.addEventListener('click', function () { tab = b.dataset.s; SC.lophoc.kinhte(box); }); });
    ({ cuahang: cuaHang, taichinh: taiChinh, tragop: traGop })[tab](box.querySelector('#kt-body'));
  };
  function lienKet(id, nhan) { return '<button type="button" class="btn alt" data-mo="' + id + '">' + nhan + '</button>'; }
  function noiKet(root) { root.querySelectorAll('[data-mo]').forEach(function (b) { b.addEventListener('click', function () { SC.moBai(b.dataset.mo); }); }); }
  var N = function (v) { return SC.tien(v * 1000); };   // đơn vị trong mô phỏng: nghìn đồng

  // ---------------- 1. Cửa hàng của em ----------------
  function cuaHang(box) {
    var NGAY = 7, F = 50, SK = [
      { t: 'Một ngày bình thường', e: 'Không có gì đặc biệt.', k: 1, c: 8, w: 4 },
      { t: 'Trời nắng nóng', e: 'Nhiều người muốn uống đồ mát: cầu tăng.', k: 1.3, c: 8, w: 2 },
      { t: 'Trời mưa to', e: 'Ít người ra đường: cầu giảm.', k: 0.7, c: 8, w: 2 },
      { t: 'Trường em tổ chức hội thao', e: 'Đông người qua lại: cầu tăng mạnh.', k: 1.4, c: 8, w: 1 },
      { t: 'Có cửa hàng mới khai trương cạnh bên', e: 'Cạnh tranh: một phần khách chuyển sang cửa hàng mới, cầu giảm.', k: 0.8, c: 8, w: 2 },
      { t: 'Giá nguyên liệu tăng', e: 'Chi phí cho mỗi ly tăng từ 8 lên 10 (nghìn đồng).', k: 1, c: 10, w: 2 }
    ];
    var s;
    function cau(p, k) { return Math.max(0, Math.round((60 - 2 * p) * k)); }            // cầu giả định: giá càng cao, người mua càng ít
    function loi(p, Q, D, c) { return Math.min(Q, D) * p - Q * c - F; }
    function toiUu(k, c) { var b = { p: 10, l: -1e9 }; for (var p = 10; p <= 29; p++) { var D = cau(p, k), l = loi(p, D, D, c); if (l > b.l) b = { p: p, l: l }; } return b; }
    function chonSK() { var kho = []; SK.forEach(function (x) { for (var i = 0; i < x.w; i++) kho.push(x); }); return kho[Math.floor(Math.random() * kho.length)]; }
    function bat() { s = { ngay: 1, tong: 0, hq: [], lich: [], sk: chonSK(), qua: null }; ve(); }

    function ve() {
      if (s.ngay > NGAY) return ketThuc();
      var qua = s.qua ? '<div class="fb">Hôm qua em bán ' + s.qua.p + ' nghìn/ly, chuẩn bị ' + s.qua.Q + ' ly: ' + (s.qua.Q > s.qua.D ? 'dư ' + (s.qua.Q - s.qua.D) + ' ly (phải bỏ)' : s.qua.Q < s.qua.D ? 'hết hàng, bỏ lỡ ' + (s.qua.D - s.qua.Q) + ' khách' : 'vừa đủ') + '. Giá bán là thông tin cho em quyết định hôm nay.</div>' : '';
      var root = box;
      root.innerHTML = '<div class="card"><h3>Ngày ' + s.ngay + '/' + NGAY + ' · lợi nhuận tích luỹ: <b>' + N(s.tong) + '</b></h3>' +
        '<p>Em bán trà chanh. Chi phí nguyên liệu <b>' + N(s.sk.c) + '</b>/ly, chi phí cố định <b>' + N(F) + '</b>/ngày (tiền thuê chỗ, điện). Mỗi ngày em chọn <b>giá bán</b> và <b>số ly chuẩn bị</b> (ly không bán hết phải bỏ).</p>' +
        '<div class="fb"><b>Hôm nay:</b> ' + E(s.sk.t) + '. ' + E(s.sk.e) + '</div>' + qua +
        '<label for="cp">Giá bán: <b id="cpv"></b></label><input id="cp" type="range" min="10" max="29" step="1" value="' + (s.qua ? s.qua.p : 18) + '">' +
        '<label for="cq">Số ly chuẩn bị: <b id="cqv"></b></label><input id="cq" type="range" min="0" max="60" step="1" value="' + (s.qua ? s.qua.Q : 20) + '">' +
        '<p class="mute" id="cph"></p><p><button type="button" class="btn" id="mo">Mở cửa bán hàng</button></p></div>' + bang();
      var cp = root.querySelector('#cp'), cq = root.querySelector('#cq');
      function cap() { root.querySelector('#cpv').textContent = N(+cp.value) + '/ly'; root.querySelector('#cqv').textContent = cq.value + ' ly'; root.querySelector('#cph').textContent = 'Chi phí em bỏ ra trước: ' + N(+cq.value * s.sk.c + F) + ' (nguyên liệu + cố định).'; }
      cp.addEventListener('input', cap); cq.addEventListener('input', cap); cap();
      root.querySelector('#mo').addEventListener('click', function () {
        var p = +cp.value, Q = +cq.value, D = cau(p, s.sk.k), ban = Math.min(Q, D), l = loi(p, Q, D, s.sk.c), t = toiUu(s.sk.k, s.sk.c);
        s.tong += l; s.qua = { p: p, Q: Q, D: D };
        var hq = t.l > 0 ? Math.max(0, Math.min(1, l / t.l)) : 0; s.hq.push(hq);
        s.lich.push({ ngay: s.ngay, sk: s.sk.t, p: p, Q: Q, D: D, ban: ban, dt: ban * p, cp: Q * s.sk.c + F, l: l, tot: t });
        s.ngay++; s.sk = chonSK(); ve();
        root.insertAdjacentHTML('afterbegin', '<div class="card" style="border-color:var(--pri)"><b>Kết quả ngày ' + (s.ngay - 1) + ':</b> khách muốn mua ' + D + ' ly, em bán ' + ban + ' ly, doanh thu ' + N(ban * p) + ', lợi nhuận ' + N(l) + '. Giá tốt nhất hôm đó khoảng ' + N(t.p) + '/ly (lợi nhuận tối đa ' + N(t.l) + '), em đạt ' + Math.round(hq * 100) + '%.</div>');
      });
    }
    function bang() {
      if (!s.lich.length) return '';
      return '<div class="card"><h3>Sổ sách các ngày trước</h3><table><tr><th>Ngày</th><th>Sự kiện</th><th>Giá</th><th>Chuẩn bị</th><th>Khách muốn</th><th>Lợi nhuận</th></tr>' +
        s.lich.map(function (r) { return '<tr><td>' + r.ngay + '</td><td>' + E(r.sk) + '</td><td>' + N(r.p) + '</td><td>' + r.Q + '</td><td>' + r.D + '</td><td>' + N(r.l) + '</td></tr>'; }).join('') + '</table></div>';
    }
    function ketThuc() {
      var tb = Math.round(100 * s.hq.reduce(function (a, b) { return a + b; }, 0) / s.hq.length), xep = tb >= 80 ? 'Nhà kinh tế tài ba' : tb >= 60 ? 'Chủ cửa hàng khá' : 'Cần thêm kinh nghiệm thị trường';
      var best = SC.storage.get('game:cuahang', 0); if (tb > best) SC.storage.set('game:cuahang', tb);
      var root = box;
      root.innerHTML = '<div class="card"><h3>Kết thúc ' + NGAY + ' ngày: <b>' + xep + '</b></h3><p>Lợi nhuận cả tuần: <b>' + N(s.tong) + '</b>. Mức hiệu quả trung bình so với cách bán tốt nhất mỗi ngày: <b>' + tb + '%</b> (cao nhất từ trước tới nay trên máy này: ' + Math.max(best, tb) + '%).</p>' +
        '<h3>Em rút ra điều gì?</h3><ul><li>Giá cả thị trường cho em <b>thông tin</b>: bán hết sớm thì có thể tăng giá hoặc tăng hàng, bán ế thì nên giảm giá hoặc giảm hàng (chức năng thông tin của giá).</li>' +
        '<li>Giá cao thì ít người mua, giá thấp thì lãi mỗi ly mỏng: lợi nhuận tốt nhất nằm ở giữa.</li><li>Cạnh tranh, thời tiết, chi phí nguyên liệu thay đổi làm cung – cầu và lợi nhuận thay đổi; người kinh doanh phải điều chỉnh thường xuyên.</li></ul>' +
        '<p class="mute">Số liệu giả định. Ôn lại: Lớp 10 Bài 4 (cơ chế thị trường, giá cả thị trường).</p><p>' + lienKet('10-b04', 'Mở Bài 4') + ' <button type="button" class="btn" id="lai">Chơi lại</button></p></div>' + bang();
      noiKet(root); root.querySelector('#lai').addEventListener('click', bat);
    }
    bat();
  }

  // ---------------- 2. Kế hoạch tài chính cá nhân ----------------
  function taiChinh(box) {
    var THU = 1200, MUC = [
      { t: 'Ăn uống hằng ngày', v: 400, can: true }, { t: 'Sách vở, đồ dùng học tập', v: 100, can: true }, { t: 'Đi lại đến trường', v: 100, can: true }, { t: 'Cước điện thoại để học trực tuyến', v: 50, can: true },
      { t: 'Trà sữa, đồ ăn vặt', v: 150, can: false }, { t: 'Nạp thẻ chơi game', v: 100, can: false }, { t: 'Mua quần áo theo mốt', v: 120, can: false }, { t: 'Đi chơi, mua quà cùng bạn', v: 130, can: false }];
    var MT = [{ t: 'Mua quà sinh nhật tặng em trai', v: 300, th: 2 }, { t: 'Mua điện thoại cũ phục vụ học tập', v: 1800, th: 5 }, { t: 'Mua máy tính học tập', v: 3000, th: 8 }];
    var SU = [{ m: 2, t: 'Xe đạp bị hỏng, sửa hết', v: 150 }, { m: 4, t: 'Sinh nhật bạn thân, mua quà hết', v: 100 }, { m: 6, t: 'Cần mua sạc điện thoại mới, hết', v: 120 }];
    var s = {};
    var loai = function (th) { return th < 3 ? 'ngắn hạn (dưới 3 tháng)' : th <= 6 ? 'trung hạn (từ 3 đến 6 tháng)' : 'dài hạn (từ 6 tháng trở lên)'; };
    var root = box;

    function buoc1() {
      root.innerHTML = '<div class="card"><h3>Bước 1 · Xác định mục tiêu tài chính và thời hạn</h3><p>Em có <b>' + N(THU) + '</b>/tháng (tiền bố mẹ cho và tiền làm thêm, số giả định). Em chọn một mục tiêu:</p>' +
        MT.map(function (m, i) { return '<button type="button" class="opt" data-g="' + i + '"><b>' + E(m.t) + '</b><br><span class="mute">Cần ' + N(m.v) + ' trong ' + m.th + ' tháng → kế hoạch ' + loai(m.th) + '; trung bình phải để dành ' + N(Math.ceil(m.v / m.th)) + '/tháng</span></button>'; }).join('') +
        '<p class="mute">Phân loại ngắn hạn, trung hạn, dài hạn theo sách (với học sinh, thời gian ngắn hơn người đi làm). Ôn lại: Lớp 10 Bài 10.</p></div>';
      root.querySelectorAll('[data-g]').forEach(function (b) { b.addEventListener('click', function () { s = { g: MT[+b.dataset.g], ph: MUC.map(function () { return null; }) }; buoc2(); }); });
    }
    function buoc2() {
      root.innerHTML = '<div class="card"><h3>Bước 2 · Theo dõi và kiểm soát thu chi</h3><p>Mục tiêu: <b>' + E(s.g.t) + '</b>. Em ghi lại các khoản chi hằng tháng. Hãy phân loại mỗi khoản: <b>cần</b> (thiết yếu, thứ em cần) hay <b>muốn</b> (không thiết yếu, thứ em muốn).</p>' +
        '<table>' + MUC.map(function (m, i) {
          return '<tr><td>' + E(m.t) + '</td><td>' + N(m.v) + '</td><td><div class="tabs" style="margin:0" data-i="' + i + '"><button type="button" data-v="1">Cần</button><button type="button" data-v="0">Muốn</button></div></td></tr>';
        }).join('') + '</table><p id="b2kq" class="mute"></p><p><button type="button" class="btn" id="b2go">Kiểm tra và sang bước 3</button></p></div>';
      root.querySelectorAll('[data-i]').forEach(function (g) {
        g.querySelectorAll('button').forEach(function (b) {
          b.addEventListener('click', function () { s.ph[+g.dataset.i] = b.dataset.v === '1'; g.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); });
        });
      });
      root.querySelector('#b2go').addEventListener('click', function () {
        if (s.ph.some(function (x) { return x === null; })) { root.querySelector('#b2kq').textContent = 'Em chưa phân loại hết các khoản chi.'; return; }
        var sai = MUC.filter(function (m, i) { return s.ph[i] !== m.can; });
        s.dung = MUC.length - sai.length;
        root.querySelector('#b2kq').innerHTML = sai.length ? 'Em đúng ' + s.dung + '/' + MUC.length + '. Xem lại: ' + sai.map(function (m) { return '<b>' + E(m.t) + '</b> là khoản ' + (m.can ? 'cần' : 'muốn'); }).join('; ') + '.' : 'Đúng cả ' + MUC.length + '/' + MUC.length + '.';
        root.querySelector('#b2go').outerHTML = '<button type="button" class="btn" id="b2n">Sang bước 3</button>';
        root.querySelector('#b2n').addEventListener('click', buoc3);
      });
    }
    function buoc3() {
      var can = MUC.filter(function (m) { return m.can; }).reduce(function (a, m) { return a + m.v; }, 0), muon = THU - can, canThang = Math.ceil(s.g.v / s.g.th);
      root.innerHTML = '<div class="card"><h3>Bước 3 · Thiết lập quy tắc thu chi</h3><p>Thu nhập ' + N(THU) + '. Chi thiết yếu mỗi tháng: <b>' + N(can) + '</b>. Phần còn lại ' + N(muon) + ' em chia giữa <b>tiết kiệm</b> và <b>chi không thiết yếu</b>. Chi không được vượt số tiền đang có.</p>' +
        '<label for="tk">Tiết kiệm mỗi tháng: <b id="tkv"></b></label><input id="tk" type="range" min="0" max="' + muon + '" step="10" value="' + Math.min(muon, canThang) + '">' +
        '<p id="tkh"></p><p><button type="button" class="btn" id="b3go">Bắt đầu thực hiện kế hoạch (Bước 4)</button></p></div>';
      var tk = root.querySelector('#tk');
      function cap() {
        var v = +tk.value, kt = muon - v;
        root.querySelector('#tkv').textContent = N(v);
        root.querySelector('#tkh').innerHTML = 'Chi không thiết yếu còn <b>' + N(kt) + '</b>/tháng. Sau ' + s.g.th + ' tháng em để dành được <b>' + N(v * s.g.th) + '</b> (mục tiêu ' + N(s.g.v) + '). ' +
          (v * s.g.th >= s.g.v ? '<span style="color:var(--ok)">Đủ cho mục tiêu, chưa tính khoản chi đột xuất.</span>' : '<span style="color:var(--bad)">Chưa đủ: cần ít nhất ' + N(canThang) + '/tháng.</span>');
      }
      tk.addEventListener('input', cap); cap();
      root.querySelector('#b3go').addEventListener('click', function () { s.tk = +tk.value; s.muon = muon - s.tk; s.can = can; s.da = 0; s.no = 0; s.dich = []; thang(1); });
    }
    function thang(k) {
      if (k > s.g.th) return ketThuc();
      var sk = SU.filter(function (x) { return x.m === k; })[0];
      root.innerHTML = '<div class="card"><h3>Bước 4 · Tuân thủ kế hoạch · tháng ' + k + '/' + s.g.th + '</h3><p>Đã để dành: <b>' + N(s.da) + '</b>' + (s.no ? ' · đang nợ bạn: <b>' + N(s.no) + '</b>' : '') + '. Tháng này em chi thiết yếu ' + N(s.can) + ', chi không thiết yếu ' + N(s.muon) + ' và để dành ' + N(s.tk) + '.</p>' +
        (sk ? '<div class="fb"><b>Chi đột xuất:</b> ' + E(sk.t) + ' <b>' + N(sk.v) + '</b>. Em xử lí thế nào?</div>' +
          '<button type="button" class="opt" data-c="1">Cắt giảm các khoản chi không thiết yếu của tháng này để bù</button>' +
          '<button type="button" class="opt" data-c="2">Lấy từ tiền đã để dành</button>' +
          '<button type="button" class="opt" data-c="3">Vay bạn, hẹn tháng sau trả</button>'
          : '<p>Không có khoản chi đột xuất. Em giữ đúng kế hoạch.</p><p><button type="button" class="btn" id="tt">Sang tháng sau</button></p>') + '</div>';
      s.da += s.tk;
      if (!sk) { root.querySelector('#tt').addEventListener('click', function () { thang(k + 1); }); return; }
      root.querySelectorAll('[data-c]').forEach(function (b) {
        b.addEventListener('click', function () {
          var c = +b.dataset.c, ghi;
          if (c === 1) { var bu = Math.min(sk.v, s.muon); s.da -= (sk.v - bu); ghi = 'Em cắt giảm chi không thiết yếu ' + N(bu) + (sk.v > bu ? ', phần còn thiếu ' + N(sk.v - bu) + ' lấy từ tiền để dành' : '') + '.'; }
          else if (c === 2) { s.da -= sk.v; ghi = 'Em lấy ' + N(sk.v) + ' từ tiền đã để dành; mục tiêu bị lùi lại.'; }
          else { s.no += sk.v; ghi = 'Em vay bạn ' + N(sk.v) + '; sẽ phải trả lại và thành khoản nợ.'; }
          s.dich.push(c);
          root.querySelectorAll('[data-c]').forEach(function (x) { x.disabled = true; });
          b.classList.add('sel');
          root.querySelector('.card').insertAdjacentHTML('beforeend', '<div class="fb">' + ghi + '</div><p><button type="button" class="btn" id="tt">Sang tháng sau</button></p>');
          root.querySelector('#tt').addEventListener('click', function () { thang(k + 1); });
        });
      });
    }
    function ketThuc() {
      var rong = s.da - s.no, dat = rong >= s.g.v;
      root.innerHTML = '<div class="card"><h3>Kết quả sau ' + s.g.th + ' tháng</h3><p>Mục tiêu: <b>' + E(s.g.t) + '</b> (' + N(s.g.v) + ', ' + loai(s.g.th) + ').</p>' +
        '<p>Tiền để dành: ' + N(s.da) + (s.no ? ' · trừ nợ ' + N(s.no) + ' = <b>' + N(rong) + '</b>' : ' · không nợ') + '.</p>' +
        '<div class="fb">' + (dat ? '<b>Em đã đạt mục tiêu.</b>' : '<b>Chưa đạt mục tiêu</b>: còn thiếu ' + N(s.g.v - rong) + '.') + '</div><ul>' +
        '<li>Phân loại khoản chi: đúng ' + s.dung + '/' + MUC.length + ' (bước 2: tách chi thiết yếu và không thiết yếu để theo dõi).</li>' +
        '<li>Quy tắc thu chi: tiết kiệm ' + N(s.tk) + '/tháng, chi không thiết yếu ' + N(s.muon) + '/tháng (bước 3: phân bổ nguồn thu, chi không vượt số tiền đang có).</li>' +
        '<li>Chi đột xuất: ' + (s.dich.length ? s.dich.map(function (c) { return c === 1 ? 'cắt giảm khoản không cần thiết (đúng tinh thần kế hoạch)' : c === 2 ? 'lấy từ tiền để dành' : 'vay bạn (dễ thành nợ nần)'; }).join('; ') : 'không có') + ' (bước 4: nếu có chi đột xuất, cắt giảm các khoản chi không cần thiết để bù đắp).</li></ul>' +
        '<p class="mute">Số liệu giả định. Ôn lại: Lớp 10 Bài 10 (các bước lập kế hoạch tài chính cá nhân).</p><p>' + lienKet('10-b10', 'Mở Bài 10') + ' <button type="button" class="btn" id="lai">Chơi lại</button></p></div>';
      noiKet(root); root.querySelector('#lai').addEventListener('click', buoc1);
    }
    buoc1();
  }

  // ---------------- 3. Trả góp hay trả một lần ----------------
  function traGop(box) {
    box.innerHTML = '<div class="card"><h3>Trả góp hay trả một lần?</h3><p class="mute">Cùng một món hàng, mua trả góp thì hằng tháng trả một phần gốc cộng lãi tính trên số nợ còn lại. So với trả một lần, người mua trả góp phải mất thêm tiền lãi (Lớp 10 Bài 9). Lãi suất dưới đây là số giả định, không phải lãi suất thật của tổ chức nào.</p>' +
      '<div class="grid"><div><label for="tgp">Giá món hàng (triệu đồng)</label><input id="tgp" type="number" min="1" max="100" step="0.5" value="12"></div>' +
      '<div><label for="tgn">Số tháng trả góp</label><select id="tgn"><option>3</option><option>6</option><option selected>12</option><option>18</option><option>24</option></select></div>' +
      '<div><label for="tgr">Lãi suất giả định (%/năm)</label><input id="tgr" type="number" min="1" max="60" step="1" value="20"></div></div><div id="tgkq"></div></div>';
    function tinh() {
      var P = Math.max(0, +box.querySelector('#tgp').value) * 1000, n = +box.querySelector('#tgn').value, r = Math.max(0, +box.querySelector('#tgr').value) / 100 / 12, goc = P / n, tong = 0, hang = '', no = P;
      for (var k = 1; k <= n; k++) { var lai = no * r; tong += lai; if (k <= 6 || k === n) hang += '<tr><td>' + k + '</td><td>' + N(goc) + '</td><td>' + N(lai) + '</td><td>' + N(goc + lai) + '</td></tr>'; else if (k === 7) hang += '<tr><td colspan="4" class="mute">…</td></tr>'; no -= goc; }
      var kq = box.querySelector('#tgkq');
      kq.innerHTML = '<div class="grid"><div class="card stat"><b>' + N(P) + '</b>trả một lần (có tiền ngay)</div><div class="card stat"><b>' + N(P + tong) + '</b>tổng đã trả khi trả góp ' + n + ' tháng</div><div class="card stat"><b>' + N(tong) + '</b>tiền lãi phải thêm (' + (P ? Math.round(100 * tong / P * 10) / 10 : 0) + '% giá hàng)</div></div>' +
        '<p>Cách khác: để dành mỗi tháng ' + N(goc) + ' trong ' + n + ' tháng rồi mua một lần: không mất lãi nhưng phải chờ ' + n + ' tháng mới có hàng.</p>' +
        '<table><tr><th>Tháng</th><th>Trả gốc</th><th>Trả lãi</th><th>Tổng tháng này</th></tr>' + hang + '</table>' +
        '<h3>Em nghĩ gì?</h3><ul><li>Trả góp giúp có hàng sớm nhưng <b>tốn thêm chi phí lãi</b>; càng trả lâu, càng nhiều lãi.</li><li>Khi dùng tín dụng, phải tính nguồn trả nợ từ thu nhập, thanh toán đúng hạn, tránh nợ quá hạn.</li><li>Có nhu cầu thật sự cần thiết thì mới nên vay; nhu cầu "muốn" thì cân nhắc để dành trước.</li></ul>' +
        '<p class="mute">Công thức giả định: gốc chia đều mỗi tháng, lãi mỗi tháng = số nợ còn lại × lãi suất tháng. Mỗi tổ chức tính khác nhau, em luôn đọc kĩ hợp đồng.</p><p>' + lienKet('10-b09', 'Mở Bài 9 (Dịch vụ tín dụng)') + '</p>';
      noiKet(kq);
    }
    ['#tgp', '#tgn', '#tgr'].forEach(function (id) { box.querySelector(id).addEventListener('input', tinh); box.querySelector(id).addEventListener('change', tinh); });
    tinh();
  }
})();
