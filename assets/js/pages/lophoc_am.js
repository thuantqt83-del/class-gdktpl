/* Lớp học thông minh · ÂM THANH cho hai hành trình: nhạc nền ngũ cung tự tổng hợp (WebAudio, không cần file), hiệu ứng âm thanh, và GIỌNG ĐỌC.
   Cách làm theo «Sa bàn số – Em là tham mưu»: giọng đọc dựng sẵn bằng Microsoft Edge Neural (Nam Minh = người kể và nhân vật nam, Hoài My = Trợ giảng và nhân vật nữ)
   lưu ở assets/audio/vo/<khoá>.mp3 (danh sách ở data/game/vo_manifest.js, quy tắc khoá ở data/game/vo_quy_tac.js); câu nào chưa có file thì dùng giọng tiếng Việt của trình duyệt
   (nếu có), nếu không có nữa thì bỏ qua giọng (trò chơi vẫn chạy bình thường). Nhạc tự hạ nhỏ khi có giọng đọc. Trình duyệt chỉ cho phát âm thanh sau lần bấm đầu tiên của người dùng
   (SC.am.mo() gọi trong các nút bấm). Cài đặt (bật/tắt, âm lượng nhạc và giọng) lưu trên máy ở khoá scgdktpl:am. */
(function () {
  var E = SC.esc;
  var luu = SC.storage.get('am', null) || {};
  var bat = luu.bat !== false, nhacV = typeof luu.nhac === 'number' ? luu.nhac : 0.5, giongV = typeof luu.giong === 'number' ? luu.giong : 1;
  var ctx = null, bus = null, sfxBus = null, ben = null, ồn = null, hat = null;
  var cauHinh = null, buoc = 0, tamThoi = 0, hen = null, moodHienTai = null, ha = false, nhacTong = 1;
  var hangDoi = [], tok = 0, dangDoc = null;
  var AM = SC.am = {};

  function ghi() { SC.storage.set('am', { bat: bat, nhac: nhacV, giong: giongV }); }
  function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }

  // ---------------- Khởi tạo (sau lần bấm đầu tiên) ----------------
  AM.mo = function () {
    try {
      if (!ctx) {
        var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
        ctx = new AC();
        var nen = ctx.createDynamicsCompressor(); nen.connect(ctx.destination);
        bus = ctx.createGain(); bus.gain.value = 0; bus.connect(nen);
        sfxBus = ctx.createGain(); sfxBus.gain.value = 0.6; sfxBus.connect(nen);
        var n = ctx.sampleRate; ồn = ctx.createBuffer(1, n, n); var d = ồn.getChannelData(0); for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
        document.addEventListener('visibilitychange', function () { if (!ctx) return; if (document.hidden) ctx.suspend(); else if (bat) ctx.resume(); });
        ben = setInterval(canhGac, 1500);
      }
      if (ctx.state === 'suspended' && bat) ctx.resume();
      return true;
    } catch (e) { ctx = null; return false; }
  };
  AM.dangBat = function () { return bat && giongV > 0; };
  AM.coAmThanh = function () { return bat; };
  // Tự dừng nhạc và giọng khi người chơi rời khỏi màn chơi (đổi tab, đổi trang)
  function canhGac() { if (!document.querySelector('#lh-body .gm-play, #lh-body .gm-end, #lh-body .gm-hero')) { AM.dung(); AM.nhac(null); } }

  // ---------------- Cài đặt ----------------
  AM.datBat = function (v) { bat = !!v; ghi(); if (!bat) { AM.dung(); AM.nhac(null); } else if (ctx && ctx.state === 'suspended') ctx.resume(); if (bat && moodHienTai) { var m = moodHienTai; moodHienTai = null; AM.nhac(m); } };
  AM.datNhac = function (v) { nhacV = Math.max(0, Math.min(1, v)); ghi(); apDungNhac(); };
  AM.datGiong = function (v) { giongV = Math.max(0, Math.min(1, v)); ghi(); if (dangDoc && dangDoc.a) dangDoc.a.volume = giongV; };
  AM.lay = function () { return { bat: bat, nhac: nhacV, giong: giongV }; };
  function apDungNhac() { if (!ctx || !bus) return; var g = bat && moodHienTai ? nhacV * 0.9 * (ha ? 0.3 : 1) : 0; bus.gain.setTargetAtTime(g, ctx.currentTime, 0.25); }

  // Khối điều khiển cho trang giới thiệu (hộp tick + hai thanh âm lượng)
  AM.dieuKhien = function () {
    return '<div class="gm-am-ct"><label class="gm-che"><input type="checkbox" id="am-bat"' + (bat ? ' checked' : '') + '> Bật <b>nhạc nền và giọng đọc</b></label>' +
      '<label class="gm-am-t">Nhạc <input type="range" id="am-nhac" min="0" max="100" value="' + Math.round(nhacV * 100) + '" aria-label="Âm lượng nhạc"></label>' +
      '<label class="gm-am-t">Giọng <input type="range" id="am-giong" min="0" max="100" value="' + Math.round(giongV * 100) + '" aria-label="Âm lượng giọng đọc"></label></div>';
  };
  AM.noiDieuKhien = function (goc) {
    var a = goc.querySelector('#am-bat'), n = goc.querySelector('#am-nhac'), g = goc.querySelector('#am-giong');
    if (a) a.addEventListener('change', function () { AM.mo(); AM.datBat(a.checked); });
    if (n) n.addEventListener('input', function () { AM.datNhac(n.value / 100); });
    if (g) g.addEventListener('input', function () { AM.datGiong(g.value / 100); });
  };

  // ---------------- Nhạc nền ----------------
  var MOODS = {
    khoi: { bpm: 96, scale: [0, 2, 4, 7, 9], root: 60, chords: [0, 3, 4, 2], arp: 0.62, pad: 0.1, tick: 0, ngan: 1 },     // tươi sáng, bắt đầu
    tam: { bpm: 78, scale: [0, 2, 5, 7, 9], root: 55, chords: [0, 2, 3, 1], arp: 0.46, pad: 0.12, tick: 0, ngan: 0 },     // điệu Nam, suy tư
    cang: { bpm: 108, scale: [0, 3, 5, 7, 10], root: 52, chords: [0, 0, 3, 2], arp: 0.5, pad: 0.08, tick: 1, ngan: 0 },  // căng thẳng, có nhịp tích tắc
    vui: { bpm: 118, scale: [0, 2, 4, 7, 9], root: 62, chords: [0, 4, 3, 4], arp: 0.82, pad: 0.1, tick: 0, ngan: 1 },    // chiến thắng
    buon: { bpm: 62, scale: [0, 3, 5, 7, 10], root: 53, chords: [0, 3, 1, 0], arp: 0.34, pad: 0.14, tick: 0, ngan: 0 }   // trầm lắng
  };
  function bac(c, d) { var n = c.scale.length; return c.root + c.scale[((d % n) + n) % n] + 12 * Math.floor(d / n); }
  function nota(f, t, dur, loai, g, dich) {
    var o = ctx.createOscillator(), a = ctx.createGain(); o.type = loai; o.frequency.setValueAtTime(f, t);
    a.gain.setValueAtTime(0.0001, t); a.gain.linearRampToValueAtTime(g, t + 0.012); a.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(a); a.connect(dich || bus); o.start(t); o.stop(t + dur + 0.05);
  }
  function ruoc(t, dur, g, tanSo, dich, loai) {
    var s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), a = ctx.createGain(); s.buffer = ồn; f.type = loai || 'bandpass'; f.frequency.value = tanSo; f.Q.value = 2;
    a.gain.setValueAtTime(g, t); a.gain.exponentialRampToValueAtTime(0.0001, t + dur); s.connect(f); f.connect(a); a.connect(dich || bus); s.start(t); s.stop(t + dur + 0.03);
  }
  var mel = 5;
  function lichBuoc(c, st, t) {
    var chord = c.chords[Math.floor(st / 16) % c.chords.length], dur16 = 60 / c.bpm / 4;
    if (st % 16 === 0) {      // nền hợp âm kéo dài một ô nhịp
      [0, 2, 4].forEach(function (k) { nota(mtof(bac(c, chord + k) - 12), t, dur16 * 15, 'sine', c.pad, bus); });
    }
    if (st % 8 === 0) nota(mtof(bac(c, chord) - 24), t, dur16 * 6, 'triangle', 0.2, bus);               // bass
    if (c.tick && st % 4 === 0) ruoc(t, 0.05, st % 16 === 0 ? 0.16 : 0.09, 2200, bus);                    // nhịp tích tắc (căng thẳng)
    if (c.ngan && st % 4 === 2) ruoc(t, 0.04, 0.035, 7000, bus, 'highpass');                              // shaker nhẹ
    if (st % 2 === 0 && Math.random() < c.arp) {                                                           // đàn gảy: đi bộ ngẫu nhiên quanh hợp âm
      mel += [-2, -1, -1, 1, 1, 2][Math.floor(Math.random() * 6)]; mel = Math.max(chord + 2, Math.min(chord + 9, mel));
      nota(mtof(bac(c, mel) + 12), t, dur16 * 3.2, 'triangle', 0.13, bus);
    }
  }
  function canhNhac() {
    if (!ctx || !cauHinh) return;
    var dur16 = 60 / cauHinh.bpm / 4;
    if (tamThoi < ctx.currentTime) tamThoi = ctx.currentTime + 0.05;
    while (tamThoi < ctx.currentTime + 0.18) { lichBuoc(cauHinh, buoc, tamThoi); buoc++; tamThoi += dur16; }
  }
  AM.nhac = function (mood) {
    if (!bat || !ctx) { moodHienTai = mood || null; return; }
    if (mood === moodHienTai && (hen || !mood)) return;
    moodHienTai = mood || null;
    if (hen) { clearInterval(hen); hen = null; }
    if (!mood) { cauHinh = null; apDungNhac(); return; }
    cauHinh = MOODS[mood]; buoc = 0; tamThoi = 0; mel = cauHinh.root > 55 ? 14 : 12;
    hen = setInterval(canhNhac, 40); apDungNhac();
  };

  // ---------------- Hiệu ứng âm thanh ----------------
  AM.sfx = function (ten) {
    if (!bat || !ctx) return; if (ctx.state === 'suspended') ctx.resume();
    var t = ctx.currentTime + 0.01, d = sfxBus;
    if (ten === 'chon') { nota(660, t, 0.12, 'triangle', 0.25, d); nota(880, t + 0.06, 0.14, 'triangle', 0.2, d); }
    else if (ten === 'dung') { [523, 659, 784, 1047].forEach(function (f, i) { nota(f, t + i * 0.08, 0.45, 'sine', 0.28, d); }); }
    else if (ten === 'nghi') { nota(440, t, 0.25, 'triangle', 0.25, d); nota(392, t + 0.16, 0.35, 'triangle', 0.22, d); }
    else if (ten === 'sai') { [330, 247, 185].forEach(function (f, i) { nota(f, t + i * 0.13, 0.4, 'sawtooth', 0.12, d); }); ruoc(t, 0.3, 0.06, 300, d); }
    else if (ten === 'goi_y') { nota(1318, t, 0.7, 'sine', 0.22, d); nota(1760, t + 0.05, 0.6, 'sine', 0.14, d); }
    else if (ten === 'vao') { ruoc(t, 0.45, 0.3, 900, d); }
    else if (ten === 'chuong') { [392, 523, 659].forEach(function (f, i) { nota(f, t + i * 0.12, 0.6, 'triangle', 0.22, d); }); }
  };

  // ---------------- Giọng đọc ----------------
  function uoc(text) { return Math.max(1.2, String(text).length / 14); }
  function viVoice() {
    if (!window.speechSynthesis) return null;
    var vs = speechSynthesis.getVoices().filter(function (v) { return /^vi/i.test(v.lang); });
    return vs[0] || null;
  }
  function ha3(b) { ha = b; apDungNhac(); }
  // list: [{ id: hồ sơ giọng, text, bd(thờiLượngGiây), kt() }] — đọc lần lượt; gọi lại sẽ thay danh sách đang đọc
  AM.noi = function (list) {
    AM.dung(); if (!AM.dangBat()) return; tok++; hangDoi = list.slice(); AM.mo(); tiep(tok);
  };
  function tiep(t) {
    if (t !== tok) return;
    var it = hangDoi.shift(); if (!it) { ha3(false); dangDoc = null; return; }
    var xong = false, key = SC.vo.khoa(it.id, it.text), co = SC.data.game.vo && SC.data.game.vo[key], dd = { a: null };
    dangDoc = dd;
    function ket() { if (xong) return; xong = true; if (dangDoc === dd) dangDoc = null; if (it.kt) it.kt(); tiep(t); }
    dd.ket = ket; var bdXong = false;
    function bd(g) { if (bdXong) return; bdXong = true; if (it.bd) it.bd(g); }
    function duPhong() {
      var v = viVoice();
      if (!v) { bd(uoc(it.text)); setTimeout(ket, 350); return; }
      try {
        var th = SC.vo.thongSo(it.id), u = new SpeechSynthesisUtterance(it.text); u.lang = 'vi-VN'; u.voice = v; u.volume = giongV;
        u.rate = 1 + parseInt(th.rate, 10) / 100; u.pitch = th.voice.indexOf('HoaiMy') >= 0 ? 1.15 : 0.9;
        u.onstart = function () { ha3(true); bd(uoc(it.text)); }; u.onend = ket; u.onerror = ket;
        speechSynthesis.cancel(); speechSynthesis.speak(u);
      } catch (e) { bd(uoc(it.text)); setTimeout(ket, 350); }
    }
    if (!co) { duPhong(); return; }
    var a = new Audio('assets/audio/vo/' + key + '.mp3'); a.volume = giongV; dd.a = a;
    a.onloadedmetadata = function () { bd(a.duration || uoc(it.text)); };
    a.onended = ket;
    a.onerror = function () { if (!xong) { dd.a = null; duPhong(); } };
    var p = a.play();
    if (p && p.then) p.then(function () { ha3(true); bd(a.duration || uoc(it.text)); }).catch(function () { if (!xong) { dd.a = null; duPhong(); } });
  }
  AM.dung = function () {
    tok++; hangDoi = [];
    if (dangDoc && dangDoc.a) { try { dangDoc.a.pause(); } catch (e) {} }
    dangDoc = null; if (window.speechSynthesis) { try { speechSynthesis.cancel(); } catch (e) {} }
    ha3(false);
  };
  // Bỏ qua câu đang đọc, sang câu kế tiếp
  AM.boQua = function () { if (dangDoc && dangDoc.ket) { if (dangDoc.a) { try { dangDoc.a.pause(); } catch (e) {} } if (window.speechSynthesis) { try { speechSynthesis.cancel(); } catch (e) {} } dangDoc.ket(); } };
  AM.dangDoc = function () { return !!dangDoc; };
  // Kiểm thử: gắn bộ phân tích vào đường ra của nhạc và hiệu ứng để đo xem có tín hiệu âm thanh hay không
  AM._dobus = function () { if (!ctx) return null; var an = ctx.createAnalyser(); an.fftSize = 512; bus.connect(an); sfxBus.connect(an); return { an: an, trangThai: ctx.state }; };
})();
