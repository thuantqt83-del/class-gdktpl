/* Lớp học thông minh · «VỤ VIỆC» (bản 3, lát L1, 23/11/2026) — bộ máy THAY CHO «chọn 1 trong 3 phương án viết sẵn».
   Học sinh: (1) nhận thẻ vai; (2) dùng «điểm sức» HỎI người liên quan và THU THẬP vật chứng (không đủ điểm làm hết); (3) LẬP KẾ HOẠCH XỬ LÍ bằng cách ghép nhiều ô;
   (4) KÝ quyết định kèm lí do; (5) nhận kết quả do MÁY TÍNH BẰNG LUẬT từ điều đã biết, đã giữ và cách ghép (không có nhãn «tốt/chưa tốt» gắn sẵn vào một phương án; không dùng AI).
   Dữ liệu: data/game/vuviec_pl.js (SC.data.game.vuviec[idHànhTrình][idCảnh]). Dùng trong lophoc_hanhtrinh.js: cảnh nào có dữ liệu ở đây thì chơi theo kiểu này, cảnh khác vẫn kiểu cũ.
   Phần TÍNH (tinh, ketQua) thuần, không đụng DOM, để script kiểm (_cong-cu/game/kiem_vuviec.js) chạy được trong Node. Chỉ lưu trên máy; không ghi vào điểm hồ sơ.
   Thiết kế: thiet-ke-moi/THIET-KE-GAME-NHAP-VAI-v3.md (M2 hỏi và ghi sổ, M3 soạn quyết định, M5 ký và giải trình). ✅ BẢN NHÁP — thầy/cô duyệt trước khi dùng. */
(function () {
  var E = SC.esc;
  function mang(x) { return x == null ? [] : (Object.prototype.toString.call(x) === '[object Array]' ? x : [x]); }
  function kho() { return (SC.data && SC.data.game && SC.data.game.vuviec) || {}; }
  function cua(hid, cid) { var a = kho()[hid]; return a && a[cid] ? a[cid] : null; }
  function tim(ds, id) { for (var i = 0; i < ds.length; i++) if (ds[i].id === id) return ds[i]; return null; }
  function co(A, k) { return A.indexOf(k) >= 0; }
  function cong(dich, nguon) { Object.keys(nguon || {}).forEach(function (k) { dich[k] = (dich[k] || 0) + nguon[k]; }); }
  function them(ds, x) { if (ds.indexOf(x) < 0) ds.push(x); }

  // ---------------- Trạng thái của một cảnh: {p: điểm sức còn, a: hành động theo thứ tự ('h:id' hỏi, 'v:id' giữ vật chứng), x: đã xong bước tìm hiểu, k: {ô: lựa chọn}, l: [lí do], r: {g} đã ký} ----------------
  function moi(cfg) { return { p: cfg.diem, a: [], x: false, k: {}, l: [], r: null }; }
  function khoiPhuc(cfg, t) {
    var s = moi(cfg); if (!t || typeof t !== 'object') return s;
    try {
      mang(t.a).forEach(function (k) {
        var m = /^([hv]):(.+)$/.exec(String(k)); if (!m) return;
        var ok = m[1] === 'h' ? tim(cfg.hoi, m[2]) : tim(cfg.vat, m[2]);
        if (ok && !co(s.a, k)) s.a.push(String(k));
      });
      s.p = Math.max(0, cfg.diem - s.a.length);
      s.x = !!t.x || !!t.r;
      cfg.o.forEach(function (o) { var id = t.k && t.k[o.id]; if (id && tim(o.chon, id)) s.k[o.id] = id; });
      mang(t.l).forEach(function (id) { if (tim(cfg.ly, id) && s.l.length < 2 && !co(s.l, id)) s.l.push(id); });
      if (t.r && typeof t.r === 'object') s.r = { g: +t.r.g || 0 };
    } catch (e) { return moi(cfg); }
    return s;
  }

  // ---------------- Điều kiện của một luật ----------------
  function khop(neu, A, ke) {
    var ok = true;
    mang(neu.co).forEach(function (k) { if (!co(A, k)) ok = false; });
    mang(neu.khong).forEach(function (k) { if (co(A, k)) ok = false; });
    if (neu.truoc) { var ia = A.indexOf(neu.truoc[0]), ib = A.indexOf(neu.truoc[1]); if (!(ia >= 0 && (ib < 0 || ia < ib))) ok = false; }   // a đã làm TRƯỚC b (hoặc chưa làm b)
    mang(neu.ke).forEach(function (k) { if (!co(ke, k)) ok = false; });
    mang(neu.khong_ke).forEach(function (k) { if (co(ke, k)) ok = false; });
    if (neu.ke_mot && !mang(neu.ke_mot).some(function (k) { return co(ke, k); })) ok = false;
    return ok;
  }

  // ---------------- TÍNH kết quả bằng luật ----------------
  // c (tùy chọn): cảnh kiểu cũ, dùng để chặn đổi chỉ số trong khoảng [kém nhất, tốt nhất] của cảnh đó (giữ nguyên cân bằng đã kiểm)
  function tinh(cfg, st, c) {
    var A = st.a || [], d = {}, cd = [], tran = 2, diem = 0, ghi = [], hq = [], ds = [], ke = [], blx = [], xau = null;
    cfg.o.forEach(function (o) {
      var ch = tim(o.chon, st.k && st.k[o.id]); if (!ch) return;
      ke.push(o.id + ':' + ch.id); ds.push({ o: o, ch: ch });
      diem += ch.diem; cong(d, ch.d); mang(ch.cd).forEach(function (f) { them(cd, f); });
      if (ch.tran != null) tran = Math.min(tran, ch.tran);
      if (ch.bl) blx.push(ch.bl);
      if (ch.kq) hq.push({ k: ch.diem >= 1 ? 'ok' : ch.diem < 0 ? 'bad' : 'warn', nd: ch.kq, s: o.ten, cb: !!ch.cb });
      if (ch.diem < 0 && ch.loi && (!xau || ch.diem < xau.diem)) xau = ch;
    });
    // 1) Mức hiểu tình huống: tỉ lệ người quan trọng đã hỏi
    var qt = cfg.hoi.filter(function (h) { return h.qt; }), qd = qt.filter(function (h) { return co(A, 'h:' + h.id); }).length;
    var hieu = qt.length ? (qd >= qt.length ? 2 : qd / qt.length >= 0.66 ? 1 : 0) : 0;
    diem += hieu;
    ghi.push({ k: hieu === 2 ? 'ok' : hieu === 1 ? 'ok' : 'warn', nd: hieu === 2 ? 'Vì em đã hỏi đủ ' + qd + '/' + qt.length + ' người quan trọng, em hiểu tình huống rõ trước khi quyết định.' : hieu === 1 ? 'Vì em đã hỏi ' + qd + '/' + qt.length + ' người quan trọng nên hiểu tình huống khá đầy đủ, còn thiếu một phần.' : 'Vì em mới hỏi ' + qd + '/' + qt.length + ' người quan trọng nên quyết định khi còn nhiều điều chưa biết.' });
    // 2) Chứng cứ: chỉ có giá trị khi kế hoạch DÙNG đến chứng cứ (có lựa chọn cb); thu thập mà không dùng thì không được điểm
    var can = cfg.vat.filter(function (v) { return v.loai === 'can'; }), got = can.filter(function (v) { return co(A, 'v:' + v.id); }).length;
    var dungBc = ds.filter(function (x) { return !!x.ch.cb; })[0];
    if (dungBc) {
      if (!got) { diem -= 3; ghi.push({ k: 'bad', nd: dungBc.ch.cb }); hq = hq.filter(function (x) { return !x.cb; }); }   // nói «sẽ đưa chứng cứ» mà chưa giữ gì: nặng hơn cách chỉ kể bằng lời, và không có «hệ quả tốt» của việc đưa chứng cứ
      else { var bc = got >= can.length ? 2 : 1; diem += bc; ghi.push({ k: 'ok', nd: got >= can.length ? 'Vì em đã giữ đủ ' + got + '/' + can.length + ' chứng cứ cần thiết nên kế hoạch có căn cứ vững.' : 'Vì em mới giữ ' + got + '/' + can.length + ' chứng cứ cần thiết nên kế hoạch có căn cứ nhưng chưa thật vững.' }); }
    }
    // 3) Vật không nên dùng: bị trừ điểm và không thể đạt «tốt trọn vẹn»; vật nhiễu: tốn một điểm sức và làm hồ sơ rối thêm
    cfg.vat.forEach(function (v) {
      if (!co(A, 'v:' + v.id)) return;
      if (v.loai === 'nguy') { diem -= 2; tran = Math.min(tran, 1); ghi.push({ k: 'bad', nd: 'Vì em đã chọn «' + v.ten + '»: ' + v.bl }); }
      else if (v.loai === 'nhieu') { diem -= 1; ghi.push({ k: 'warn', nd: 'Vì em giữ «' + v.ten + '», thứ không giúp ích gì: ' + v.bl }); }
    });
    // 4) Luật tương tác
    cfg.luat.forEach(function (r) {
      if (!khop(r.neu, A, ke)) return;
      var t = r.thi; diem += t.diem || 0; cong(d, t.d); mang(t.cd).forEach(function (f) { them(cd, f); });
      if (t.tran != null) tran = Math.min(tran, t.tran);
      if (t.ghi) ghi.push({ k: t.ghi.k, nd: t.ghi.nd });
    });
    var m = diem >= cfg.muc.hai ? 2 : diem >= cfg.muc.mot ? 1 : 0; m = Math.min(m, tran);
    if (c && c.chon) {
      Object.keys(d).forEach(function (k) {
        var lo = 0, hi = 0; c.chon.forEach(function (o) { var v = (o.d && o.d[k]) || 0; if (v < lo) lo = v; if (v > hi) hi = v; });
        d[k] = Math.max(lo, Math.min(hi, d[k]));
      });
    }
    Object.keys(d).forEach(function (k) { if (!d[k]) delete d[k]; });
    var kh = mang(st.l).map(function (id) {
      var ly = tim(cfg.ly, id), n = 0; if (!ly) return null;
      mang(ly.ung).forEach(function (x) { if (co(ke, x)) n++; });
      return { id: id, nhan: ly.nhan, khop: n >= 2, pb: ly.vung === false ? ly.pb : '' };
    }).filter(Boolean);
    return { m: m, diem: diem, d: d, cd: cd, tran: tran, ds: ds, ke: ke, hq: hq, ghi: ghi, bl: blx, loi: xau ? xau.loi : '', rr: xau ? (xau.rr || '') : '', khop: kh, bc: { got: got, can: can.length }, hieu: { qd: qd, qt: qt.length },
      nhan: ds.map(function (x) { return x.ch.nn; }).join(' · ') };
  }

  // Kết quả đầy đủ cho lophoc_hanhtrinh.js: {m, d, cd, nhan, ls, rr, html, noi, mau}
  function ketQua(cfg, st, c) {
    var r = tinh(cfg, st, c);
    return { m: r.m, d: r.d, cd: r.cd, nhan: r.nhan, ls: r.loi, rr: r.rr, html: ketHtml(cfg, r), noi: cfg.bl_muc[r.m], mau: cfg.mau, res: r };
  }
  function ketHtml(cfg, r) {
    var ico = { ok: '✔', warn: '⚠', bad: '✖' };
    function li(g) { return '<li class="vv-' + g.k + '"><span aria-hidden="true">' + ico[g.k] + '</span> ' + E(g.nd) + '</li>'; }
    var chinh = cfg.bl_muc[r.m] || '';   // bỏ câu nguyên tắc đã nằm trong lời bình chính (so sánh phần trước dấu trích dẫn «(Lớp …)»)
    var blx = r.bl.filter(function (b, i) { var loi = b.replace(/\s*\([^)]*\)\.?\s*$/, ''); return r.bl.indexOf(b) === i && b !== chinh && chinh.indexOf(loi) < 0; });
    return '<div class="vv-kq"><h4>📝 Kế hoạch em đã ký</h4><ol class="vv-ke">' + r.ds.map(function (x) { return '<li><span class="mute">' + E(x.o.ten) + ':</span> ' + E(x.ch.nhan) + '</li>'; }).join('') + '</ol>' +
      (r.hq.length ? '<h4>🔗 Hệ quả</h4><ul class="vv-ds2">' + r.hq.map(li).join('') + '</ul>' : '') +
      '<h4>🔎 Vì sao ra mức này</h4><ul class="vv-ds2">' + r.ghi.map(li).join('') + '</ul>' +
      '<h4>⚖️ Nguyên tắc</h4><p>' + E(cfg.bl_muc[r.m]) + '</p>' + blx.slice(0, 2).map(function (b) { return '<p class="mute">' + E(b) + '</p>'; }).join('') +
      (r.khop.length ? '<h4>🧾 Lí do em ký</h4><ul class="vv-ds2">' + r.khop.map(function (x) {
        var tot = x.khop && !x.pb;   // lí do khớp kế hoạch VÀ vững mới được đánh dấu tốt; lí do không vững thì kèm lời phản biện
        return '<li class="' + (tot ? 'vv-ok' : 'vv-warn') + '"><span aria-hidden="true">' + (tot ? '✔' : '⚠') + '</span> «' + E(x.nhan) + '» ' + (x.khop ? 'khớp với việc em làm' + (x.pb ? ', nhưng lí do này chưa vững.' : '.') : 'chưa khớp với kế hoạch em ký.') + (x.pb ? '<br><span class="mute">' + E(x.pb) + '</span>' : '') + '</li>';
      }).join('') + '</ul>' : '') + '</div>';
  }

  // ---------------- Giao diện (chạm để chọn; không kéo thả) ----------------
  var NH_VAT = { can: ['Cần thiết', ''], huu_ich: ['Hữu ích', ''], nhieu: ['Không giúp được', 'warn'], nguy: ['Không nên dùng', 'warn'] };
  function xao(a) { return (SC.shuffle ? SC.shuffle(a) : a); }
  function vaiHtml(cfg) {
    var v = cfg.vai;
    return '<details class="vv-vai" open><summary>🎭 Thẻ vai: <b>' + E(v.ten) + '</b></summary><p><b>Mục tiêu:</b> ' + E(v.muc_tieu) + '</p>' +
      '<div class="vv-vai2"><div><b>Em được làm</b><ul>' + v.duoc.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul></div>' +
      '<div><b>Em không được làm</b><ul>' + v.khong.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul></div></div></details>';
  }

  function dung(host, cfg, st, ctx) {
    ctx = ctx || {};
    var khoa = !!st.r, thuHoi = xao(cfg.hoi.map(function (h, i) { return i; })), thuVat = xao(cfg.vat.map(function (v, i) { return i; })), thuO = {};
    cfg.o.forEach(function (o) { thuO[o.id] = xao(o.chon.map(function (x, i) { return i; })); });
    function luu() { if (ctx.luu) ctx.luu(); }
    function sfx(t) { if (ctx.am && ctx.am.sfx) ctx.am.sfx(t); }
    function soVat() { return st.a.filter(function (k) { return k.charAt(0) === 'v'; }).length; }
    function html1() {
      var het = st.p <= 0, khoaTim = khoa || st.x;
      var h = '<div class="vv-sec"><h4>🔎 Bước 1 · Tìm hiểu <span class="vv-pts" aria-live="polite">Điểm sức: <b>' + st.p + '</b>/' + cfg.diem + '</span></h4>' +
        '<p class="mute">Mỗi lần hỏi một người hoặc giữ một thứ tốn <b>1 điểm sức</b>. Em không thể làm hết, nên hãy chọn điều cần biết trước khi quyết định; không hỏi cũng là một lựa chọn và có hệ quả.' + (khoaTim ? '' : ' Có thể giữ tối đa ' + cfg.vat_toi_da + ' thứ.') + '</p>' +
        '<h5>Hỏi ai, hỏi gì?</h5><div class="vv-ds" role="group" aria-label="Câu hỏi">' + thuHoi.map(function (i) {
          var q = cfg.hoi[i], da = co(st.a, 'h:' + q.id);
          return '<button type="button" class="vv-the' + (da ? ' on' : '') + '" data-vh="' + E(q.id) + '"' + (da || khoaTim || het ? ' disabled' : '') + '><b>' + E(q.ai) + '</b><span>«' + E(q.cau) + '»</span></button>';
        }).join('') + '</div>' +
        '<h5>Giữ lại thứ gì? <span class="mute">(' + soVat() + '/' + cfg.vat_toi_da + ')</span></h5><div class="vv-ds" role="group" aria-label="Vật chứng">' + thuVat.map(function (i) {
          var v = cfg.vat[i], da = co(st.a, 'v:' + v.id);
          return '<button type="button" class="vv-the' + (da ? ' on' : '') + '" data-vv="' + E(v.id) + '"' + (da || khoaTim || het || soVat() >= cfg.vat_toi_da ? ' disabled' : '') + '><b>' + E(v.ten) + '</b><span>' + E(v.mo) + '</span></button>';
        }).join('') + '</div>';
      var so = st.a.map(function (k) {
        var id = k.slice(2);
        if (k.charAt(0) === 'h') { var q = tim(cfg.hoi, id); return '<li><b>' + E(q.ai) + ':</b> «' + E(q.tra) + '»</li>'; }
        var v = tim(cfg.vat, id), nh = NH_VAT[v.loai]; return '<li><span class="tag ' + nh[1] + '">' + nh[0] + '</span> <b>' + E(v.ten) + '.</b> <span class="mute">' + E(v.bl) + '</span></li>';
      });
      h += '<h5>📒 Sổ ghi chép</h5>' + (so.length ? '<ul class="vv-so">' + so.join('') + '</ul>' : '<p class="mute">Chưa ghi gì.</p>') +
        (het && !khoaTim ? '<p class="mute"><b>Em đã dùng hết điểm sức.</b> Bây giờ phải quyết định với những gì em đã biết.</p>' : '') +
        (khoaTim ? '' : '<p class="row"><button type="button" class="btn" data-xong>Xong, lập kế hoạch' + (st.a.length ? '' : ' (chưa hỏi, chưa giữ gì)') + ' <span class="gm-tri" aria-hidden="true"></span></button></p>') + '</div>';
      return h;
    }
    function html2() {
      var ten = (SC.hs && SC.hs.doc) ? (SC.hs.doc().ten || '') : '';
      return '<div class="vv-sec"><h4>🧭 Bước 2 · Kế hoạch xử lí</h4><p class="mute">Chọn một cách ở <b>mỗi ô</b>. Kết quả phụ thuộc vào điều em đã biết, đã giữ và cách em ghép các ô lại với nhau; không có một «đáp án trọn gói».</p>' +
        cfg.o.map(function (o) {
          return '<fieldset class="vv-slot"><legend>' + E(o.ten) + '</legend><div class="vv-os" role="group" aria-label="' + E(o.ten) + '">' + thuO[o.id].map(function (i) {
            var ch = o.chon[i], on = st.k[o.id] === ch.id;
            return '<button type="button" class="vv-o' + (on ? ' on' : '') + '" data-s="' + E(o.id) + '" data-o="' + E(ch.id) + '" aria-pressed="' + on + '"' + (khoa ? ' disabled' : '') + '>' + E(ch.nhan) + '</button>';
          }).join('') + '</div></fieldset>';
        }).join('') +
        '<h5>Vì sao em quyết định như vậy? <span class="mute">(chọn 1–2 lí do để ký)</span></h5><div class="vv-ls" role="group" aria-label="Lí do">' + xao(cfg.ly.map(function (l, i) { return i; })).map(function (i) {
          var l = cfg.ly[i], on = co(st.l, l.id); return '<button type="button" class="vv-l' + (on ? ' on' : '') + '" data-l="' + E(l.id) + '" aria-pressed="' + on + '"' + (khoa ? ' disabled' : '') + '>' + E(l.nhan) + '</button>';
        }).join('') + '</div>' +
        (khoa ? '' : '<p class="row"><button type="button" class="btn" data-ky disabled>✍️ Ký tên và thực hiện kế hoạch</button> <span class="mute">' + (ten ? 'Em ký với biệt danh «' + E(ten) + '».' : 'Em chưa đặt biệt danh ở hồ sơ nhân vật; vẫn ký được.') + ' Sau khi ký, em không đổi được quyết định.</span></p>') + '</div>';
    }
    function ve1() { var el = host.querySelector('.vv-b1'); if (el) el.innerHTML = html1(); }
    function ve2() { var el = host.querySelector('.vv-b2'); if (el) { el.innerHTML = st.x ? html2() : ''; capNutKy(); } }
    function capNutKy() {
      var ky = host.querySelector('[data-ky]'); if (!ky) return;
      ky.disabled = !(cfg.o.every(function (o) { return !!st.k[o.id]; }) && st.l.length >= 1);
    }
    host.innerHTML = vaiHtml(cfg) + '<div class="vv-b1"></div><div class="vv-b2"></div>';
    ve1(); ve2();
    host.addEventListener('click', function (ev) {
      var b = ev.target.closest ? ev.target.closest('button') : null; if (!b || b.disabled || st.r) return;
      var ds = b.dataset;
      if (ds.vh) { if (st.x || st.p <= 0 || co(st.a, 'h:' + ds.vh)) return; st.a.push('h:' + ds.vh); st.p--; luu(); sfx('chon'); ve1(); var nb = host.querySelector('[data-vh="' + ds.vh + '"]'); if (nb) nb.focus(); return; }
      if (ds.vv) { if (st.x || st.p <= 0 || soVat() >= cfg.vat_toi_da || co(st.a, 'v:' + ds.vv)) return; st.a.push('v:' + ds.vv); st.p--; luu(); sfx('chon'); ve1(); return; }
      if (b.hasAttribute('data-xong')) { st.x = true; luu(); sfx('chon'); ve1(); ve2(); var b2 = host.querySelector('.vv-b2'); if (b2 && b2.scrollIntoView) b2.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      if (ds.s) {
        st.k[ds.s] = ds.o; luu(); sfx('chon');
        host.querySelectorAll('[data-s="' + ds.s + '"]').forEach(function (x) { var on = x.dataset.o === ds.o; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); });
        capNutKy(); return;
      }
      if (ds.l) {
        var k = st.l.indexOf(ds.l);
        if (k >= 0) st.l.splice(k, 1); else if (st.l.length < 2) st.l.push(ds.l); else { st.l.shift(); st.l.push(ds.l); }
        luu(); host.querySelectorAll('[data-l]').forEach(function (x) { var on = co(st.l, x.dataset.l); x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); });
        capNutKy(); return;
      }
      if (b.hasAttribute('data-ky')) {
        if (!cfg.o.every(function (o) { return !!st.k[o.id]; }) || !st.l.length) return;
        st.r = { g: 0 }; khoa = true;
        host.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
        var kyb = host.querySelector('[data-ky]'); if (kyb) kyb.hidden = true;
        if (ctx.ky) ctx.ky(st);
      }
    });
  }

  SC.vv = { cua: cua, moi: moi, khoiPhuc: khoiPhuc, tinh: tinh, ketQua: ketQua, ketHtml: ketHtml, dung: dung };
})();
