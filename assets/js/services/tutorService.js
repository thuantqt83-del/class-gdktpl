/* Trợ giảng học tập (Phân hệ 3, bản chạy trên máy). KHÔNG phải AI sinh văn bản: mọi nội dung hiện ra đều lấy từ các bài đã soạn trong app
   (tìm đoạn liên quan, gợi ý 3 cấp khi làm bài, phân tích lỗi sai theo mẫu làm bài, chọn câu luyện cá nhân).
   Phần 6 sẽ nối AI thật qua máy chủ (khoá AI không đặt ở trình duyệt); trang chỉ gọi SC.tutor nên đổi ruột không phải sửa trang. */
SC.tutor = (function () {
  // Hai không gian từ khoá: CÓ DẤU (chính xác: "thẻ" khác "thể") và BỎ DẤU (khi người dùng gõ không dấu)
  var STOP_A = {}, STOP_S = {};
  ('là và của các những một cho để có không được trong với nào này do khi thì mà từ cũng sẽ đã như theo về đến trên dưới sau trước đúng sai ' +
   'nhận định phát biểu câu hỏi nội dung đây hay hoặc cả ra vào lên xuống bị ở ấy nó họ tôi em bạn').split(' ')
    .forEach(function (w) { STOP_A[w] = 1; if (w !== 'đúng') STOP_S[SC.norm(w)] = 1; });
  var CO_DAU = /[^\x00-\x7F]/;

  // strip = true: bỏ dấu; false: giữ dấu. Bỏ từ một chữ cái và từ đệm.
  function tokens(s, strip) {
    var t = strip ? SC.norm(s).replace(/[^a-z0-9\s]/g, ' ') : String(s == null ? '' : s).normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ');
    var stop = strip ? STOP_S : STOP_A;
    return t.split(/\s+/).filter(function (x) { return x.length > 1 && !stop[x]; });
  }

  var blocks = null, df = null, N = 0, info = {};

  function trangTu(tieuDe, mac) { var m = /\(tr\.([^)]+)\)/.exec(tieuDe || ''); return m ? m[1] : mac; }
  function dua(base, loai, tieuDe, text) {
    var tf = {}, ts = {}, n = 0;
    tokens(text).concat(tokens(tieuDe), tokens(tieuDe)).forEach(function (t) { tf[t] = (tf[t] || 0) + 1; n++; });   // từ trong tiêu đề tính gấp ba
    tokens(text, true).concat(tokens(tieuDe, true), tokens(tieuDe, true)).forEach(function (t) { ts[t] = (ts[t] || 0) + 1; });
    blocks.push({ bai: base.bai, khoi: base.khoi, phan: base.phan, so: base.so, ten_bai: base.ten_bai, loai: loai, tieu_de: tieuDe, text: text,
                  trang: trangTu(tieuDe, base.trang), tf: tf, ts: ts, n: n, norm: SC.norm(text + ' ' + tieuDe) });
  }
  function build() {
    if (blocks) return;
    blocks = []; info = {};
    SC.data.curriculum.muc.forEach(function (m) {
      m.bai.forEach(function (b) {
        var d = SC.data.bai[b.id]; if (!d) return;
        var base = { bai: b.id, khoi: m.khoi, phan: m.phan, so: b.so, ten_bai: b.ten, trang: b.trang_in };
        info[b.id] = base;
        (d.noi_dung || []).forEach(function (n) { dua(base, 'Nội dung trọng tâm', n.tieu_de, n.y.join(' ')); });
        (d.vi_du || []).forEach(function (v, i) { dua(base, 'Ví dụ thực tiễn', 'Ví dụ ' + (i + 1), v); });
        (d.tinh_huong || []).forEach(function (t) { dua(base, 'Tình huống', t.ten, t.mo_ta + ' ' + (t.cau_hoi || []).join(' ')); });
      });
    });
    df = { a: {}, s: {} }; N = blocks.length;
    blocks.forEach(function (b) {
      Object.keys(b.tf).forEach(function (t) { df.a[t] = (df.a[t] || 0) + 1; });
      Object.keys(b.ts).forEach(function (t) { df.s[t] = (df.s[t] || 0) + 1; });
    });
  }
  function idf(t, strip) { var d = (strip ? df.s : df.a)[t] || 0; return Math.log(1 + (N - d + 0.5) / (d + 0.5)); }

  // Điểm khớp giữa một đoạn và tập từ khoá (kiểu BM25 rút gọn); ưu tiên nội dung trọng tâm hơn phần mục tiêu, ví dụ
  var TRONG_SO = { 'Ví dụ thực tiễn': 0.85 };
  function diem(b, qt, strip) {
    var s = 0, khop = 0, m = strip ? b.ts : b.tf;
    qt.forEach(function (t) {
      var f = m[t];
      if (f) { khop++; s += idf(t, strip) * (f * 2.2) / (f + 1.2 * (0.25 + 0.75 * b.n / 40)); }
    });
    return qt.length ? s * (0.5 + 0.5 * khop / qt.length) * (TRONG_SO[b.loai] || 1) : 0;
  }
  function uniq(a) { var seen = {}; return a.filter(function (x) { if (seen[x]) return false; seen[x] = 1; return true; }); }

  // Câu trích: lấy 1–2 câu có nhiều từ khoá nhất
  function trich(text, qt, strip) {
    var cau = text.split(/(?<=[.;:])\s+/), set = {}, best = 0, bi = 0;
    qt.forEach(function (t) { set[t] = 1; });
    cau.forEach(function (c, i) {
      var k = tokens(c, strip).filter(function (t) { return set[t]; }).length;
      if (k > best) { best = k; bi = i; }
    });
    var out = cau[bi] + (cau[bi + 1] && cau[bi].length < 160 ? ' ' + cau[bi + 1] : '');
    return out.length > 380 ? out.slice(0, 377).replace(/\s+\S*$/, '') + '…' : out;
  }
  // Đánh dấu từ khoá trong đoạn trích (trả về HTML đã chống chèn mã)
  function danhDau(text, qt, strip) {
    var set = {}; qt.forEach(function (t) { set[t] = 1; });
    var raw = text.replace(/[\p{L}\p{N}]+/gu, function (w) {
      var k = strip ? SC.norm(w) : w.normalize('NFC').toLowerCase();
      return set[k] ? '\u0001' + w + '\u0002' : w;
    });
    return SC.esc(raw).replace(/\u0001/g, '<mark>').replace(/\u0002/g, '</mark>');
  }
  // Văn bản pháp luật được nhắc trong đoạn (chỉ liệt kê tên như SGK ghi, chưa đối chiếu văn bản gốc)
  function vanBan(text) {
    var kq = [], m, re = /(?:Bộ luật|Luật|Hiến pháp|Nghị định|Thông tư)(?:\s+(?!(?:quy|ghi|được|có|là|nêu|ban|thì|để|do|và|nhằm|cho|đã|sẽ|không|cấm|của|bảo đảm|khẳng)\b)[^\s.,;:()]+){0,6}|Điều\s+\d+/g;
    while ((m = re.exec(text)) && kq.length < 8) { var v = m[0].trim(); if (!/^(Bộ luật|Luật|Nghị định|Thông tư)$/.test(v)) kq.push(v); }
    return uniq(kq).slice(0, 6);
  }

  // ---- 1. Hỏi đáp từ kho ----
  function search(query, o) {
    build(); o = o || {};
    var strip = !CO_DAU.test(query), qt = uniq(tokens(query, strip));
    if (!qt.length) return { qt: qt, kq: [] };
    var chuan = SC.norm(query).replace(/\s+/g, ' ').trim(), rs = [];
    blocks.forEach(function (b) {
      if (o.khoi && b.khoi !== o.khoi) return;
      if (o.phan && b.phan !== o.phan) return;
      if (o.bai && b.bai !== o.bai) return;
      if (o.loai && b.loai !== o.loai) return;
      var s = diem(b, qt, strip);
      if (chuan.length > 6 && b.norm.indexOf(chuan) >= 0) s += 4;   // cụm nguyên văn
      if (s > 0) rs.push({ b: b, s: s });
    });
    rs.sort(function (a, b) { return b.s - a.s; });
    var kq = rs.slice(0, o.n || 8).map(function (r) {
      return { bai: r.b.bai, khoi: r.b.khoi, phan: r.b.phan, so: r.b.so, ten_bai: r.b.ten_bai, loai: r.b.loai, tieu_de: r.b.tieu_de, trang: r.b.trang,
               html: danhDau(trich(r.b.text, qt, strip), qt, strip), van_ban: vanBan(r.b.text), diem: r.s };
    });
    return { qt: qt, kq: kq };
  }

  // ---- 2. Gợi ý 3 cấp khi làm bài ----
  function coGoiY(q) { build(); return !!(q && q.bai && SC.data.bai[q.bai] && info[q.bai]); }
  function hint(q) {
    build();
    if (!coGoiY(q)) return null;
    var qt = uniq(tokens(q.q + ' ' + (q.dang === 'tra_loi_ngan' ? '' : q.o.join(' '))));
    var best = null, bs = 0;
    blocks.forEach(function (b) {
      if (b.bai !== q.bai || b.loai !== 'Nội dung trọng tâm') return;
      var s = diem(b, qt, false);
      if (s > bs) { bs = s; best = b; }
    });
    var d = SC.data.bai[q.bai], loai = null;
    if (q.dang === 'tn4') {   // loại một phương án sai: phương án ít trùng từ với đoạn sách nhất (không có đoạn thì lấy phương án sai đầu tiên)
      var toi = 1e9;
      q.o.forEach(function (t, i) {
        if (i === q.a) return;
        var tk = uniq(tokens(t)), trung = best ? tk.filter(function (x) { return best.tf[x]; }).length / Math.max(1, tk.length) : 0;
        if (trung < toi) { toi = trung; loai = i; }
      });
    }
    var y = best ? d.noi_dung.filter(function (n) { return n.tieu_de === best.tieu_de; })[0] : null;
    return { bai: info[q.bai], doan: y ? { tieu_de: best.tieu_de, trang: best.trang, y: y.y } : null, loai: loai };
  }
  function batGoiY() { return SC.storage.get('goiy', true) !== false; }
  function datGoiY(v) { SC.storage.set('goiy', !!v); }

  // ---- 3. Phân tích lỗi sai từ lịch sử làm bài trên máy ----
  function phanTich() {
    build();
    var l = SC.progress.list(), byBai = {}, byMuc = { 1: [0, 0], 2: [0, 0], 3: [0, 0] }, byPhan = {}, dsMotPhan = 0, soSai = 0, xemLG = 0, tong = 0, diemTong = 0, sai = {};
    l.forEach(function (a) {
      a.chi_tiet.forEach(function (c) {
        var q = SC.questions.byId(c.qid), bai = c.bai || (q && q.bai);
        tong++; diemTong += c.diem;
        if (byMuc[c.muc_do]) { byMuc[c.muc_do][1]++; byMuc[c.muc_do][0] += c.diem; }
        if (bai && info[bai]) {
          var x = byBai[bai] = byBai[bai] || { bai: bai, tong: 0, diem: 0, sai: 0 };
          x.tong++; x.diem += c.diem; if (!c.dung) x.sai++;
          var ph = info[bai].phan, y = byPhan[ph] = byPhan[ph] || [0, 0]; y[1]++; y[0] += c.diem;
        }
        if (!c.dung) { sai[c.qid] = (sai[c.qid] || 0) + 1; soSai++; if (c.dang === 'dung_sai' && c.diem > 0) dsMotPhan++; }
        if (c.goi_y >= 3) xemLG++;
      });
    });
    var ds = Object.keys(byBai).map(function (k) {
      var x = byBai[k], i = info[k]; return { bai: k, khoi: i.khoi, phan: i.phan, so: i.so, ten: i.ten_bai, tong: x.tong, pct: SC.pct(x.diem, x.tong), sai: x.sai };
    });
    var yeu = ds.filter(function (x) { return x.tong >= 3 && x.pct < 75; }).sort(function (a, b) { return a.pct - b.pct || b.tong - a.tong; });
    var pm = function (m) { return byMuc[m][1] ? SC.pct(byMuc[m][0], byMuc[m][1]) : null; };
    var pm3 = function (m) { return byMuc[m][1] >= 3 ? pm(m) : null; };   // quy tắc nhận xét chỉ dùng khi mức đó có từ 3 câu trở lên
    var nn = [];
    if (tong && tong < 10) nn.push('Mới làm ' + tong + ' câu nên nhận xét dưới đây chưa chắc chắn; làm thêm khoảng 20 câu để phân tích rõ hơn.');
    if (pm3(1) !== null && pm3(1) < 60) nn.push('Sai nhiều ở các câu cơ bản (' + pm3(1) + '%): có thể chưa nắm chắc khái niệm. Nên đọc lại bài giảng, ghi lại định nghĩa và ví dụ.');
    if (pm3(1) !== null && pm3(3) !== null && pm3(1) - pm3(3) >= 25) nn.push('Làm tốt các câu cơ bản (' + pm3(1) + '%) nhưng yếu các câu khó, có tình huống (' + pm3(3) + '%): biết khái niệm nhưng chưa quen áp dụng vào tình huống. Luyện câu có tình huống, gạch từ khoá trong đề trước khi chọn.');
    if (soSai && dsMotPhan / soSai >= 0.3) nn.push('Nhiều câu đúng/sai mới đúng một phần số ý: có thể nhầm một vài ý. Đọc kĩ từng ý a, b, c, d, chú ý các từ như "chỉ", "mọi", "luôn".');
    if (tong && xemLG / tong >= 0.2) nn.push('Hay xem giải thích ngay (cấp 3): thử dừng ở gợi ý cấp 1–2 và tự chọn trước.');
    var kt = byPhan['kinh-te'], pl = byPhan['phap-luat'];
    if (kt && pl && kt[1] >= 5 && pl[1] >= 5 && Math.abs(SC.pct(kt[0], kt[1]) - SC.pct(pl[0], pl[1])) >= 20)
      nn.push((SC.pct(kt[0], kt[1]) < SC.pct(pl[0], pl[1]) ? 'Phần Kinh tế' : 'Phần Pháp luật') + ' đang yếu hơn hẳn phần còn lại; ưu tiên ôn phần này.');
    if (!nn.length && tong >= 10) nn.push('Chưa thấy mẫu sai nổi bật. Tiếp tục luyện đều và tăng dần câu khó.');
    var hay = Object.keys(sai).sort(function (a, b) { return sai[b] - sai[a]; }).slice(0, 5)
      .map(function (id) { return { q: SC.questions.byId(id), lan: sai[id] }; }).filter(function (x) { return x.q; });
    return { luot: l.length, tong: tong, chinhXac: SC.pct(diemTong, tong), byMuc: { 1: pm(1), 2: pm(2), 3: pm(3) }, byMuc3: { 1: pm3(1), 2: pm3(2), 3: pm3(3) }, byPhan: byPhan, yeu: yeu,
             byBai: ds.sort(function (a, b) { return a.pct - b.pct; }), nguyenNhan: nn, hay: hay, sai: sai };
  }

  // ---- 4. Bài luyện cá nhân theo chỗ yếu ----
  function mucDeXuat(p) {
    for (var m = 1; m <= 3; m++) if (p.byMuc3[m] !== null && p.byMuc3[m] < 70) return m;
    return p.tong >= 10 ? 3 : 1;
  }
  // o: { n, muc, bai, khoi, phan }. Không chọn bài thì lấy tối đa 3 bài yếu nhất; chưa có dữ liệu thì lấy cả ngân hàng.
  function luyenCaNhan(o) {
    build(); o = o || {};
    var p = phanTich(), baiYeu = o.bai ? [o.bai] : p.yeu.slice(0, 3).map(function (x) { return x.bai; });
    var muc = o.muc || mucDeXuat(p), tu = [muc, Math.min(3, muc + 1)];
    var pool = SC.questions.all().filter(function (q) { return q.bai && q.dang !== 'tra_loi_ngan' && (!baiYeu.length || baiYeu.indexOf(q.bai) >= 0); });
    if (o.khoi) pool = pool.filter(function (q) { return q.khoi === o.khoi; });
    if (o.phan) pool = pool.filter(function (q) { return q.phan === o.phan; });
    var sai = p.sai, n = o.n || 10, nua = Math.ceil(n / 2);
    var a = SC.shuffle(pool.filter(function (q) { return sai[q.id]; })).slice(0, nua),
        b = SC.shuffle(pool.filter(function (q) { return !sai[q.id] && tu.indexOf(q.muc_do) >= 0; })),
        c = SC.shuffle(pool.filter(function (q) { return !sai[q.id] && tu.indexOf(q.muc_do) < 0; }));
    return { cau: SC.shuffle(a.concat(b).concat(c).slice(0, n)), bai: baiYeu, muc: muc, coDuLieu: p.tong > 0, soCauSaiLai: a.length };
  }

  return { search: search, hint: hint, coGoiY: coGoiY, batGoiY: batGoiY, datGoiY: datGoiY, phanTich: phanTich, luyenCaNhan: luyenCaNhan, mucDeXuat: mucDeXuat,
           baiInfo: function (id) { build(); return info[id] || null; } };
})();
