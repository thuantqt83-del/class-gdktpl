/* Lớp học thông minh · SA BÀN 3D — dựng một «bối cảnh» hoạt hình 3D (hình khối đơn giản, tượng trưng) cho từng cảnh của hai hành trình.
   Cách làm theo dự án «Sa bàn số – Em là tham mưu»: một sa bàn tròn đặt trên bàn, nhân vật bước vào, nói lời dẫn dụ ở bong bóng thoại, em chọn quyết định ở màn hình,
   nhân vật phản ứng (mừng, lo, sợ, giận) kèm hiệu ứng. Dùng Three.js r149 (MIT) chép sẵn ở assets/js/vendor/three.min.js, chạy offline; nạp khi mở chế độ 3D lần đầu.
   Nếu máy không có WebGL: SB.ok = false và hành trình tự chơi bằng chữ như thường. Dữ liệu cảnh: sb {bo, nv, noi, tuy} trong data/game/hanhtrinh_*.js; thư viện: data/game/sb_thuvien.js.
   Hình ảnh chỉ mang tính minh hoạ; mọi tên người và địa danh là tượng trưng. */
(function () {
  var SB = SC.sb = { ok: null, hangDoi: null };
  var T, R, cvs, scene, cam, mat3d, clock;
  var G = null, khung = null, ov = null, bong = null, tamNhin, raf = 0;
  var nvs = [], hat = [], vong = [], neo = {}, nhan = [];
  var yaw = 0, keoX = 0, keoY = 0, dangKeo = false, rung = 0, dolly = 0, tuT = 0, rongCu = 0, caoCu = 0, mua = null, tuyDong = [];
  var matC = {}, geoC = {};
  var hienSom = null;
  var SLOT = { a: [-3.5, 2.6, 0.38], b: [0, 3.2, 0], c: [3.5, 2.6, -0.38] };
  var NOI_PU = { 2: 'Mình đã tỉnh táo, không mắc bẫy!', 1: 'Hmm, chưa trọn vẹn rồi…', 0: 'Ôi, mình bị dẫn dắt mất rồi!' };

  // ---------------- Nạp thư viện và khởi tạo ----------------
  SB.nap = function (cb) {
    if (SB.ok !== null) { cb(SB.ok); return; }
    if (SB.hangDoi) { SB.hangDoi.push(cb); return; }
    SB.hangDoi = [cb];
    function xong() { var q = SB.hangDoi; SB.hangDoi = null; q.forEach(function (f) { f(SB.ok); }); }
    if (window.THREE) { khoiTao(); xong(); return; }
    var s = document.createElement('script');
    s.src = 'assets/js/vendor/three.min.js';
    s.onload = function () { khoiTao(); xong(); };
    s.onerror = function () { SB.ok = false; xong(); };
    document.head.appendChild(s);
  };
  function khoiTao() {
    try {
      T = window.THREE;
      cvs = document.createElement('canvas'); cvs.className = 'sb-canvas'; cvs.setAttribute('aria-hidden', 'true');
      R = new T.WebGLRenderer({ canvas: cvs, antialias: true, alpha: false });
      R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      R.shadowMap.enabled = true; R.shadowMap.type = T.PCFSoftShadowMap;
      scene = new T.Scene(); scene.background = new T.Color('#cfe7fb'); scene.fog = new T.Fog('#cfe7fb', 34, 70);
      cam = new T.PerspectiveCamera(36, 16 / 9, 0.1, 150);
      scene.add(new T.HemisphereLight(0xffffff, 0x9fbad6, 0.62));
      var sun = new T.DirectionalLight(0xffffff, 0.58); sun.position.set(9, 17, 9); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
      var sc = sun.shadow.camera; sc.left = -17; sc.right = 17; sc.top = 15; sc.bottom = -15; sc.near = 2; sc.far = 55; sun.shadow.bias = -0.0008;
      scene.add(sun);
      clock = new T.Clock(); tamNhin = new T.Vector3();
      cvs.addEventListener('pointerdown', function (e) { dangKeo = true; cvs._x = e.clientX; cvs._y = e.clientY; try { cvs.setPointerCapture(e.pointerId); } catch (x) {} });
      cvs.addEventListener('pointermove', function (e) {
        if (!dangKeo) return;
        keoX = Math.max(-0.9, Math.min(0.9, keoX + (e.clientX - cvs._x) * 0.006)); keoY = Math.max(-0.18, Math.min(0.2, keoY + (e.clientY - cvs._y) * 0.002));
        cvs._x = e.clientX; cvs._y = e.clientY;
      });
      var thoi = function () { dangKeo = false; };
      cvs.addEventListener('pointerup', thoi); cvs.addEventListener('pointercancel', thoi);
      SB.ok = true;
    } catch (err) { SB.ok = false; }
  }

  // ---------------- Vật liệu, hình khối dùng chung (không cần giải phóng) ----------------
  function mat(c) { return matC[c] || (matC[c] = new T.MeshLambertMaterial({ color: c })); }
  function matS(c) { var k = 's' + c; return matC[k] || (matC[k] = new T.MeshLambertMaterial({ color: c, emissive: c, emissiveIntensity: 0.55 })); }
  function geo(k, f) { return geoC[k] || (geoC[k] = f()); }
  function gBox(w, h, d) { return geo('b' + w + ',' + h + ',' + d, function () { return new T.BoxGeometry(w, h, d); }); }
  function gCyl(a, b, h, n) { return geo('c' + a + ',' + b + ',' + h + ',' + n, function () { return new T.CylinderGeometry(a, b, h, n); }); }
  function gSph(r) { return geo('s' + r, function () { return new T.SphereGeometry(r, 14, 10); }); }
  function gCone(r, h, n) { return geo('k' + r + ',' + h + ',' + n, function () { return new T.ConeGeometry(r, h, n); }); }
  function mesh(g, m, x, y, z, ry, bong3) {
    var o = new T.Mesh(g, m); o.position.set(x, y, z); if (ry) o.rotation.y = ry; o.castShadow = bong3 !== false; o.receiveShadow = true; G.add(o); return o;
  }
  function B(w, h, d, c, x, y, z, ry) { return mesh(gBox(w, h, d), mat(c), x, y + h / 2, z, ry); }
  function C(rt, rb, h, c, x, y, z, n) { return mesh(gCyl(rt, rb, h, n || 14), mat(c), x, y + h / 2, z); }
  function S(r, c, x, y, z) { return mesh(gSph(r), mat(c), x, y, z); }
  function K(r, h, c, x, y, z, n, ry) { return mesh(gCone(r, h, n || 12), mat(c), x, y + h / 2, z, ry); }
  function banh(x, y, z, r) { var o = mesh(gCyl(r, r, 0.26, 14), mat('#222831'), x, y, z); o.rotation.z = Math.PI / 2; return o; }

  // ---------------- Vật dụng dựng sẵn ----------------
  function nen(c, r) { C(r || 14.5, (r || 14.5) + 0.5, 0.9, c, 0, -0.9, 0, 64); C((r || 14.5) + 0.6, (r || 14.5) + 0.8, 0.5, '#8a6a4f', 0, -1.4, 0, 64); }
  function nha(x, z, w, h, tuong, mai) {
    B(w, h, w, tuong, x, 0, z); K(w * 0.78, h * 0.55, mai, x, h, z, 4, Math.PI / 4);
    B(0.7, 1.2, 0.1, '#7a4b2a', x, 0, z + w / 2 + 0.03); B(0.8, 0.7, 0.1, '#bfe3ff', x + w * 0.27, h * 0.5, z + w / 2 + 0.03); B(0.8, 0.7, 0.1, '#bfe3ff', x - w * 0.27, h * 0.5, z + w / 2 + 0.03);
  }
  function cay(x, z, s) { s = s || 1; C(0.18 * s, 0.24 * s, 1.1 * s, '#7a5230', x, 0, z, 8); S(0.9 * s, '#4f9d5d', x, 1.7 * s, z); S(0.65 * s, '#5fb26d', x + 0.35 * s, 2.25 * s, z + 0.1 * s); }
  function den(x, z) { C(0.07, 0.09, 3.2, '#475569', x, 0, z, 8); S(0.22, '#fde68a', x, 3.3, z).material = matS('#fde68a'); }
  function co(x, z, cao) { C(0.05, 0.05, cao, '#9ca3af', x, 0, z, 8); B(1.1, 0.7, 0.04, '#d90429', x + 0.58, cao - 0.75, z); S(0.17, '#ffd166', x + 0.58, cao - 0.4, z + 0.03).material = matS('#ffd166'); }
  function quay(x, z, ao) {
    B(2.3, 0.1, 1.2, '#b08968', x, 0.75, z); B(0.1, 0.75, 0.1, '#7a5230', x - 1, 0, z - 0.45); B(0.1, 0.75, 0.1, '#7a5230', x + 1, 0, z - 0.45); B(0.1, 0.75, 0.1, '#7a5230', x - 1, 0, z + 0.45); B(0.1, 0.75, 0.1, '#7a5230', x + 1, 0, z + 0.45);
    B(0.08, 2.2, 0.08, '#7a5230', x - 1.1, 0, z - 0.55); B(0.08, 2.2, 0.08, '#7a5230', x + 1.1, 0, z - 0.55);
    var m = B(2.8, 0.1, 1.9, ao, x, 2.25, z - 0.1); m.rotation.x = 0.28; B(2.8, 0.18, 0.1, '#ffffff', x, 2.1, z + 0.78);
    for (var i = 0; i < 4; i++) { S(0.22, i % 2 ? '#3fa34d' : '#e63946', x - 0.8 + i * 0.52, 0.98, z); }
  }
  function xeMay(x, z, ry, c) {
    var g0 = G; var gr = new T.Group(); gr.position.set(x, 0, z); gr.rotation.y = ry || 0; G.add(gr); G = gr;
    B(1.5, 0.35, 0.5, c || '#e63946', 0, 0.55, 0); B(0.5, 0.2, 0.48, '#111827', -0.25, 0.9, 0); banh(0.7, 0.32, 0, 0.32); banh(-0.7, 0.32, 0, 0.32); B(0.08, 0.7, 0.5, '#9ca3af', 0.8, 0.6, 0); B(0.08, 0.1, 0.6, '#111827', 0.8, 1.25, 0);
    G = g0;
  }
  function tienChong(x, z) { for (var i = 0; i < 5; i++) C(0.32, 0.32, 0.1, '#fbbf24', x, i * 0.11, z, 16); B(0.8, 0.05, 0.45, '#4ade80', x + 0.7, 0, z + 0.2, 0.3); B(0.8, 0.05, 0.45, '#22c55e', x + 0.72, 0.06, z + 0.2, 0.1); }
  function giayChong(x, z) { C(0.6, 0.6, 0.6, '#c08457', x, 0, z, 6); for (var i = 0; i < 3; i++) B(0.7, 0.04, 0.5, '#ffffff', x, 0.62 + i * 0.045, z, i * 0.25 - 0.2); }
  function dtMay(x, y, z, ry, to) {
    var s = to || 1; B(0.7 * s, 1.3 * s, 0.1 * s, '#111827', x, y, z, ry); var m = B(0.6 * s, 1.1 * s, 0.04 * s, '#60a5fa', x, y + 0.08 * s, z + 0.06 * s, ry); m.material = matS('#60a5fa');
    return new T.Vector3(x, y + 1.45 * s, z);
  }

  // ---------------- Các bối cảnh ----------------
  var BO = {
    benh_vien: function () {
      nen('#cfe8d5'); B(10, 5.2, 3.4, '#f7fafc', 0, 0, -6); B(10.5, 0.4, 3.9, '#cbd5e1', 0, 5.2, -6);
      B(1.7, 0.5, 0.15, '#e11d48', 0, 3.55, -4.22); B(0.5, 1.7, 0.15, '#e11d48', 0, 3.0, -4.22); B(1.9, 2.2, 0.15, '#9ec5e8', 0, 0, -4.25);
      [-3.6, -2, 2, 3.6].forEach(function (x) { B(1, 1, 0.12, '#bfe0f7', x, 1.5, -4.25); B(1, 1, 0.12, '#bfe0f7', x, 3.1, -4.25); });
      B(2.4, 0.12, 0.7, '#8b5a2b', -6, 0.55, -1); B(0.1, 0.55, 0.5, '#6b4423', -7, 0, -1); B(0.1, 0.55, 0.5, '#6b4423', -5, 0, -1);
      cay(8, -3, 1.1); cay(-9, -3.5, 1);
      B(3, 1.3, 1.4, '#ffffff', 7.2, 0.35, 0.4); B(1.1, 0.9, 1.3, '#e5e7eb', 5.9, 0.35, 0.4); B(3, 0.2, 1.42, '#e11d48', 7.2, 0.8, 0.4); banh(6.2, 0.3, 1.1, 0.34); banh(8.2, 0.3, 1.1, 0.34); banh(6.2, 0.3, -0.3, 0.34); banh(8.2, 0.3, -0.3, 0.34);
      tuyDong.push({ o: S(0.18, '#3b82f6', 7.2, 1.75, 0.4), k: 'nhay' });
    },
    ngan_hang: function () {
      nen('#d9e2ec'); B(10, 4.6, 3.6, '#f1e8d6', 0, 0, -6); B(11, 0.5, 4.4, '#cbb994', 0, 4.6, -6); K(6.2, 1.2, '#b7a47a', 0, 5.1, -6, 4, Math.PI / 4).scale.set(1, 1, 0.5);
      [-3.6, -1.8, 0, 1.8, 3.6].forEach(function (x) { C(0.26, 0.26, 4.2, '#fffaf0', x, 0, -3.9, 12); });
      B(10.4, 0.25, 0.8, '#e5dcc3', 0, 0, -3.5); B(9.4, 0.25, 0.6, '#d8cdb0', 0, 0.25, -3.2);
      var c = C(0.7, 0.7, 0.18, '#fbbf24', 0, 6.0, -5.5, 20); c.rotation.x = Math.PI / 2; c.material = matS('#fbbf24');
      B(1.3, 2.4, 0.2, '#334155', -7.6, 0, -2.5); B(1.0, 0.8, 0.06, '#38bdf8', -7.6, 1.4, -2.38).material = matS('#38bdf8');
      den(8, -3); den(-8.8, -2.2); cay(9, -4, 1);
    },
    ngo_xom: function () {
      nen('#9aa5b1'); B(3.6, 0.04, 14, '#6b7280', 0, 0, 0, 0).position.y = 0.02; B(0.2, 0.05, 11, '#fef3c7', 0, 0.04, 0);
      nha(-6.4, -4.5, 3.6, 3.2, '#fbd38d', '#c0392b'); nha(-6.6, 0.8, 3.2, 2.8, '#bee3f8', '#9b2c2c'); nha(6.4, -4.2, 3.6, 3.4, '#c6f6d5', '#b7791f'); nha(6.6, 1.2, 3.2, 2.8, '#fed7e2', '#7b341e');
      den(-3.4, -2); den(3.6, -1.2); cay(-9.5, 5, 1); cay(9.5, 5, 1.1);
    },
    cho: function () {
      nen('#e8d9b8'); quay(-6, -3.6, '#ef4444'); quay(-2, -4, '#22c55e'); quay(2, -3.6, '#f59e0b'); quay(6, -4, '#3b82f6');
      for (var i = 0; i < 6; i++) { B(0.6, 0.45, 0.6, '#c08457', -7 + i * 2.7, 0, -1.8 + (i % 2) * 0.3); S(0.26, i % 2 ? '#3fa34d' : '#f97316', -7 + i * 2.7, 0.62, -1.8 + (i % 2) * 0.3); }
      for (var j = 0; j < 7; j++) { B(0.22, 0.14, 0.01, j % 2 ? '#f43f5e' : '#facc15', -8 + j * 2.6, 3.1 - (j % 2) * 0.12, -6.6); }
      cay(-10, -1, 1.1); den(9, -1);
    },
    nha: function () {
      nen('#e9d8b6', 14); B(15, 0.3, 11, '#c89b6d', 0, 0, -0.5); B(15, 5, 0.3, '#f3ead8', 0, 0.3, -6); B(0.3, 5, 11, '#efe3cb', -7.5, 0.3, -0.5);
      B(2.2, 1.7, 0.1, '#bfe3ff', 3, 2, -5.8); B(0.12, 1.7, 0.12, '#8b5a2b', 3, 2, -5.76); B(2.2, 0.12, 0.12, '#8b5a2b', 3, 2.8, -5.76);
      C(1.5, 1.5, 0.12, '#a47148', 0, 0.8, -2.2, 24); C(0.12, 0.2, 0.8, '#7a5230', 0, 0.3, -2.2, 10);
      [-1.8, 1.8].forEach(function (x) { C(0.38, 0.38, 0.45, '#8b5a2b', x, 0.3, -2.2, 12); });
      S(0.34, '#ffe08a', 0, 1.2, -2.2).material = matS('#ffe08a'); C(0.14, 0.14, 0.4, '#8b5a2b', 0, 0.92, -2.2, 8);
      B(2.6, 1, 1.1, '#ef9a9a', -5.2, 0.3, -5.1); B(2.6, 0.5, 0.3, '#c26666', -5.2, 1.3, -5.5);
      B(0.8, 1.0, 0.06, '#fef3c7', -3.5, 2.6, -5.8); B(0.65, 0.8, 0.04, '#a5b4fc', -3.5, 2.7, -5.74);
    },
    mang: function () {
      nen('#e0e7ff', 14);
      neo.dt = dtMay(0, 0.2, -3.2, 0, 3.2);
      var cols = ['#34d399', '#f472b6', '#fbbf24', '#60a5fa', '#a78bfa'];
      for (var i = 0; i < 8; i++) {
        var o = B(1.5, 0.75, 0.2, cols[i % 5], 0, 0, 0); o.material = matS(cols[i % 5]); o.castShadow = false;
        tuyDong.push({ o: o, k: 'quay', r: 5.4 + (i % 3) * 0.9, a: i * 0.785, h: 2.2 + (i % 4) * 0.8, v: 0.25 + (i % 3) * 0.06 });
      }
      for (var j = 0; j < 6; j++) { var s = S(0.2, j % 2 ? '#ef4444' : '#f97316', 0, 0, 0); s.material = matS(j % 2 ? '#ef4444' : '#f97316'); s.castShadow = false; tuyDong.push({ o: s, k: 'quay', r: 4.2 + (j % 3), a: j * 1.05 + 0.4, h: 3.4 + (j % 3) * 0.7, v: -0.3 }); }
    },
    cua_hang: function () {
      nen('#dff0d8'); B(7, 3.4, 3.6, '#f6f1e4', 0, 0, -5.8); B(7.6, 0.2, 4, '#2f9e44', 0, 3.4, -5.8); var aw = B(7.4, 0.12, 2.2, '#40c057', 0, 2.6, -3.6); aw.rotation.x = 0.35;
      B(1.5, 2.1, 0.12, '#8b5a2b', 2, 0, -3.95); B(2.8, 1.3, 0.1, '#e8f7ff', -1.8, 0.9, -3.97);
      S(0.45, '#2f9e44', 0, 4.1, -5.8); S(0.3, '#69db7c', 0.4, 4.35, -5.8);
      for (var i = 0; i < 5; i++) { B(0.8, 0.5, 0.7, '#c08457', -5.4 + (i % 3) * 0.95, (i > 2) ? 0.5 : 0, -2.6 + (i > 2 ? 0.1 : 0)); S(0.33, '#40c057', -5.4 + (i % 3) * 0.95, ((i > 2) ? 0.5 : 0) + 0.65, -2.6); }
      xeMay(6.6, -1.6, 0.4, '#2f9e44'); cay(-9, -2, 1.2); cay(9.5, -4, 1);
    },
    kho_xuong: function () {
      nen('#dde3ea'); B(12, 4.4, 4.2, '#9fb3c8', 0, 0, -6); B(12.6, 0.4, 4.6, '#6b7f95', 0, 4.4, -6); B(4.6, 3.4, 0.15, '#d1d9e0', 0, 0, -3.85);
      for (var i = 0; i < 6; i++) B(4.6, 0.12, 0.2, '#b8c2cc', 0, 0.4 + i * 0.55, -3.77);
      B(1.2, 1, 1, '#c08457', -7.2, 0, -2.5); B(1.2, 1, 1, '#d9a066', -7.2, 1, -2.5); B(1.2, 1, 1, '#c08457', -5.9, 0, -2.4);
      xeMay(5.8, -1.2, 0.2, '#38b000'); xeMay(7.6, 0.6, -0.5, '#fb8500'); xeMay(-7.4, 0.8, 0.6, '#3a86ff');
      cay(9.5, -4.2, 1);
    },
    van_phong: function () {
      nen('#dbe7f3', 14); B(15, 0.3, 11, '#c9ced6', 0, 0, -0.5); B(15, 5, 0.3, '#f4f6f9', 0, 0.3, -6);
      B(5.4, 3, 0.1, '#ffffff', -3.5, 1.5, -5.8); for (var i = 0; i < 5; i++) B(0.5, 0.35 + i * 0.35, 0.06, ['#38bdf8', '#22c55e', '#f59e0b', '#ef4444', '#a78bfa'][i], -5.4 + i * 0.85, 1.9, -5.72);
      B(5, 0.18, 2, '#a47148', 3.2, 0.85, -3.6); [-1.8, 1.8].forEach(function (x) { B(0.12, 0.85, 0.12, '#7a5230', 3.2 + x, 0, -3.6); });
      B(1.2, 0.08, 0.8, '#1f2937', 3.2, 1.03, -3.7); B(1.1, 0.8, 0.06, '#60a5fa', 3.2, 1.1, -4.1).material = matS('#60a5fa'); B(0.9, 0.05, 0.6, '#ffffff', 5, 1.03, -3.5, 0.2);
      co(7.2, -5.2, 3.4); cay(-7.2, -4.8, 0.9);
    },
    uy_ban: function () {
      nen('#d7e3d3'); B(11, 4.2, 3.6, '#f7e7b6', 0, 0, -6.2); B(11.6, 0.4, 4.2, '#c0392b', 0, 4.2, -6.2); B(1.8, 2.4, 0.15, '#7a4b2a', 0, 0, -4.35);
      [-3.8, -2.2, 2.2, 3.8].forEach(function (x) { B(1.1, 1.1, 0.12, '#bfe3ff', x, 1.5, -4.35); });
      B(3, 0.5, 0.1, '#1d4ed8', 0, 3.2, -4.3).material = matS('#2563eb'); co(-7.2, -3.4, 5.2);
      B(2, 1.3, 0.1, '#fff7e6', 7, 1.2, -2.4); B(0.1, 1.2, 0.1, '#7a5230', 6.2, 0, -2.4); B(0.1, 1.2, 0.1, '#7a5230', 7.8, 0, -2.4);
      for (var i = 0; i < 4; i++) B(0.7, 0.35, 0.02, '#ffffff', 6.5 + (i % 2) * 0.9, 1.9 + Math.floor(i / 2) * 0.5 - 0.5, -2.33);
      cay(-9.6, -1, 1.1); cay(9.7, -4, 1.2);
    },
    truong: function () {
      nen('#d7e8c7'); B(13, 4.6, 3.2, '#fde8c2', 0, 0, -6.4); B(13.6, 0.4, 3.6, '#e76f51', 0, 4.6, -6.4);
      for (var i = 0; i < 6; i++) { B(1.1, 1.1, 0.12, '#bfe3ff', -5.4 + i * 2.15, 1.3, -4.78); B(1.1, 1.1, 0.12, '#bfe3ff', -5.4 + i * 2.15, 3, -4.78); }
      B(2, 2.2, 0.15, '#8b5a2b', 0, 0, -4.78); co(-8.4, -3.2, 5); C(0.07, 0.07, 3, '#94a3b8', 8, 0, -1, 8); B(1.2, 0.8, 0.08, '#fff7ed', 8, 3, -1);
      B(2.6, 0.1, 0.6, '#8b5a2b', -7, 0.5, 0.5); cay(9.5, -4.5, 1.2); cay(-9.8, -1.5, 1);
    },
    tro: function () {
      nen('#e6dcc9'); B(11, 6, 3.4, '#f1d9b5', 0, 0, -6); B(11.6, 0.4, 3.9, '#8d5a3a', 0, 6, -6);
      for (var i = 0; i < 4; i++) { B(1.1, 1.9, 0.12, '#8b5a2b', -4.2 + i * 2.8, 0, -4.26); B(1.1, 1.9, 0.12, '#8b5a2b', -4.2 + i * 2.8, 3.0, -4.26); B(1, 0.7, 0.1, '#bfe3ff', -4.2 + i * 2.8, 1.1, -4.27); }
      B(11.4, 0.18, 1, '#cbb994', 0, 2.9, -4.1); B(0.1, 1, 0.1, '#7a5230', -5.5, 2.9, -3.7); B(0.1, 1, 0.1, '#7a5230', 5.5, 2.9, -3.7); B(10.6, 0.08, 0.08, '#7a5230', 0, 3.85, -3.7);
      cay(-9, -2, 1); cay(9.2, -3, 1.1); den(7.5, -1);
    },
    tram_xe: function () {
      nen('#cfd6df'); B(26, 0.04, 5, '#4b5563', 0, 0, -4.8).position.y = 0.02; B(24, 0.06, 0.2, '#fef3c7', 0, 0.05, -4.8);
      B(7, 0.2, 2.2, '#2563eb', 0, 3.2, -1.2); B(0.16, 3.2, 0.16, '#94a3b8', -3.3, 0, -2.1); B(0.16, 3.2, 0.16, '#94a3b8', 3.3, 0, -2.1); B(6.4, 2, 0.08, '#bfe3ff', 0, 1.1, -2.2);
      B(3.2, 0.14, 0.8, '#8b5a2b', 0, 0.62, -1.4); B(0.12, 0.62, 0.7, '#6b4423', -1.4, 0, -1.4); B(0.12, 0.62, 0.7, '#6b4423', 1.4, 0, -1.4);
      C(0.07, 0.07, 3.6, '#94a3b8', 5.2, 0, 0, 8); B(1.1, 0.7, 0.08, '#16a34a', 5.2, 3.2, 0); cay(-9, -3, 1.1); den(9, 0.5);
    },
    phong_bau: function () {
      nen('#ead9c0', 14); B(15, 0.3, 11, '#c8b59a', 0, 0, -0.5); B(15, 5, 0.3, '#f7efe0', 0, 0.3, -6); B(7.5, 0.7, 0.06, '#d90429', 0, 3.9, -5.8); S(0.3, '#ffd166', 0, 4.25, -5.7).material = matS('#ffd166');
      for (var i = 0; i < 3; i++) { B(1.4, 1.6, 1.1, '#ffffff', -5.5 + i * 1.8, 0, -4.6); B(1.5, 0.12, 1.2, '#d90429', -5.5 + i * 1.8, 1.6, -4.6); }
      B(1.5, 1.4, 1.5, '#dc2626', 5.2, 0, -3.5); B(0.8, 0.06, 0.12, '#111827', 5.2, 1.42, -3.5); B(0.9, 0.06, 0.8, '#ffffff', 5.2, 1.4, -3.9); co(8, -5, 3.8);
      B(2.6, 0.12, 1.1, '#a47148', 1.5, 0.8, -3.6); B(0.1, 0.8, 0.1, '#7a5230', 0.4, 0, -3.6); B(0.1, 0.8, 0.1, '#7a5230', 2.6, 0, -3.6);
    },
    xuong_nhuom: function () {
      nen('#d9d3c7'); B(8, 4, 4, '#a9b4bf', -1, 0, -6); B(8.4, 0.3, 4.4, '#6b7280', -1, 4, -6); C(0.55, 0.7, 6.4, '#8d6e63', 2.2, 0, -6.4, 14); B(1.2, 2, 0.15, '#6b7280', -3, 0, -3.95);
      var rv = B(26, 0.04, 2.4, '#1e3a8a', 0, 0, -1.6); rv.position.y = 0.05; rv.material = new T.MeshLambertMaterial({ color: '#254f9e' }); tuyDong.push({ o: rv, k: 'nuoc' });
      B(3, 0.5, 0.5, '#6b7280', -4.6, 0.45, -3.4); C(0.22, 0.22, 1.6, '#6b7280', -6.5, 0.15, -3.4, 10).rotation.z = Math.PI / 2;
      for (var i = 0; i < 6; i++) { var k = S(0.5 + (i % 3) * 0.12, '#9ca3af', 2.2, 7 + i * 0.4, -6.4); k.castShadow = false; tuyDong.push({ o: k, k: 'khoi', h0: 7, i: i }); }
      nha(8.4, -4.4, 3, 2.6, '#fbd38d', '#c0392b'); cay(-9.6, -3, 1.1);
    }
  };

  // ---------------- Vật phụ theo «tuy» ----------------
  var TUY = {
    tien: function () { tienChong(5.6, 3.4); },
    giay: function () { giayChong(-5.6, 3.3); },
    vi: function () { B(0.7, 0.14, 0.5, '#7c4a24', 0, 0, 4.5); B(0.5, 0.04, 0.2, '#e5e7eb', 0, 0.14, 4.5); var r = new T.Mesh(new T.TorusGeometry(0.6, 0.05, 8, 24), matS('#fde047')); r.rotation.x = Math.PI / 2; r.position.set(0, 0.1, 4.5); G.add(r); tuyDong.push({ o: r, k: 'nhip' }); },
    dien_thoai: function () { neo.dt = dtMay(-5.6, 0.0, 3.4, 0.4, 1.4); },
    xe_may: function () { xeMay(-7.5, -1.2, 0.5, '#e63946'); },
    mua: function () {
      mua = [];
      for (var i = 0; i < 140; i++) { var o = new T.Mesh(gBox(0.03, 0.55, 0.03), matS('#93c5fd')); o.position.set((Math.random() - 0.5) * 24, Math.random() * 12, (Math.random() - 0.5) * 20); o.castShadow = false; G.add(o); mua.push(o); }
      var c = S(2.2, '#94a3b8', -3, 12, -4); c.scale.set(2.4, 0.7, 1.2); S(1.8, '#a0aec0', 2.5, 12.3, -3).scale.set(2, 0.7, 1.2);
    },
    rac: function () { for (var i = 0; i < 14; i++) B(0.5 + (i % 3) * 0.2, 0.35, 0.45, ['#7c6f64', '#4b5563', '#a8a29e', '#65a30d'][i % 4], 5.2 + (i % 4) * 0.55 - 0.8, Math.floor(i / 5) * 0.34, -1.2 + (i % 3) * 0.5, i * 0.7); tuyDong.push({ o: S(0.1, '#111827', 5.4, 1.4, -1), k: 'ruoi' }); },
    rao: function () { for (var i = 0; i < 8; i++) { B(0.12, 1.2, 0.12, '#8b5a2b', -3.6 + i * 1.0, 0, -1.2); } B(7.2, 0.1, 0.08, '#a47148', 0, 0.9, -1.2); B(7.2, 0.1, 0.08, '#a47148', 0, 0.45, -1.2); },
    kinh_vo: function () { B(0.1, 1.8, 1.4, '#bfe3ff', -6, 0.3, 2.6).material = new T.MeshLambertMaterial({ color: '#bfe3ff', transparent: true, opacity: 0.5 }); for (var i = 0; i < 6; i++) { var o = B(0.35, 0.03, 0.25, '#e0f2fe', -5.4 + i * 0.25, 0, 2.9 + (i % 3) * 0.2, i); o.castShadow = false; } S(0.3, '#f8fafc', 3.6, 0.3, 4.1); },
    camera: function () { C(0.07, 0.07, 3.4, '#475569', -4.6, 0, -1, 8); B(0.5, 0.3, 0.3, '#1f2937', -4.6, 3.4, -0.9); tuyDong.push({ o: S(0.08, '#ef4444', -4.6, 3.55, -0.7), k: 'nhay' }); }
  };

  // ---------------- Nhân vật hình khối ----------------
  function bp(cha, w, h, d, c, px, py, pz) { var p = new T.Group(); p.position.set(px, py, pz); var m = new T.Mesh(gBox(w, h, d), mat(c)); m.position.y = -h / 2; m.castShadow = true; p.add(m); cha.add(p); return p; }
  function nguoi(v) {
    var g = new T.Group(), da = '#f2c9a0', cao = v.cao || 1;
    var th = new T.Mesh(gBox(0.7, 0.85, 0.4), mat(v.ao)); th.position.y = 1.2; th.castShadow = true; g.add(th);
    var l1 = bp(g, 0.28, 0.85, 0.28, v.quan, -0.17, 0.85, 0), l2 = bp(g, 0.28, 0.85, 0.28, v.quan, 0.17, 0.85, 0);
    var a1 = bp(g, 0.22, 0.8, 0.22, v.ao, -0.47, 1.58, 0), a2 = bp(g, 0.22, 0.8, 0.22, v.ao, 0.47, 1.58, 0);
    [a1, a2].forEach(function (a) { var h = new T.Mesh(gSph(0.12), mat(da)); h.position.y = -0.82; a.add(h); });
    var dau = new T.Group(); dau.position.y = 1.95; g.add(dau);
    var m = new T.Mesh(gSph(0.3), mat(da)); m.castShadow = true; dau.add(m);
    var toc = new T.Mesh(geo('toc', function () { return new T.SphereGeometry(0.325, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55); }), mat(v.toc)); toc.position.y = 0.02; toc.rotation.x = -0.25; dau.add(toc);
    if (v.toc_dai) { var td = new T.Mesh(gBox(0.62, 0.62, 0.2), mat(v.toc)); td.position.set(0, -0.12, -0.2); dau.add(td); }
    [-0.1, 0.1].forEach(function (x) { var e = new T.Mesh(gSph(0.035), mat('#111827')); e.position.set(x, 0.03, 0.28); dau.add(e); });
    var mo = new T.Mesh(gBox(0.12, 0.035, 0.03), mat('#9b2c2c')); mo.position.set(0, -0.1, 0.29); dau.add(mo);
    if (v.mu) { var mu = new T.Mesh(gCyl(0.3, 0.32, 0.16, 16), mat(v.mu)); mu.position.y = 0.3; dau.add(mu); var vm = new T.Mesh(gCyl(0.42, 0.42, 0.03, 16), mat(v.mu)); vm.position.y = 0.22; dau.add(vm); }
    if (v.kinh) { [-0.1, 0.1].forEach(function (x) { var k = new T.Mesh(gBox(0.15, 0.1, 0.02), mat('#1f2937')); k.position.set(x, 0.05, 0.3); dau.add(k); }); }
    if (v.gay) { var st = new T.Mesh(gCyl(0.03, 0.03, 1.3, 6), mat('#7a5230')); st.position.set(0.5, 0.65, 0.3); g.add(st); }
    g.scale.setScalar(cao);
    return { g: g, th: th, l1: l1, l2: l2, a1: a1, a2: a2, dau: dau, mo: mo, cao: cao };
  }

  function datNv(id, ten, slotKey, k) {
    var look = (SC.data.game.sb.vai[id]) || SC.data.game.sb.vai.em, s = SLOT[slotKey] || SLOT.b;
    var o = nguoi(look); o.id = id; o.ten = ten || look.ten; o.st = 'di'; o.t = Math.random() * 3; o.dx = s[0]; o.dz = s[1]; o.ry = s[2]; o.noi = false;
    o.g.position.set(s[0] + (k % 2 ? 11 : -11), 0, s[1] + 1); o.g.rotation.y = s[0] > 0 ? -1.2 : 1.2; G.add(o.g);
    var el = document.createElement('div'); el.className = 'sb-ten'; el.textContent = o.ten; ov.appendChild(el); o.el = el;
    nvs.push(o); return o;
  }
  function tuThe(o, dt) {
    o.t += dt; var t = o.t, st = o.st, g = o.g, s = Math.sin;
    var r = { l1: 0, l2: 0, a1x: 0, a2x: 0, a1z: 0, a2z: 0, dx: s(t * 0.8) * 0.12, dy: 0, nx: 0, gy: 0, gz: 0, mo: 1 };
    if (st === 'di') {
      var ex = o.dx - g.position.x, ez = o.dz - g.position.z, kc = Math.sqrt(ex * ex + ez * ez);
      if (kc < 0.12) { o.st = 'idle'; g.rotation.y = o.ry; } else { var sp = Math.min(kc, 3.6 * dt); g.position.x += ex / kc * sp; g.position.z += ez / kc * sp; g.rotation.y = Math.atan2(ex, ez); }
      r.l1 = s(t * 10) * 0.7; r.l2 = -r.l1; r.a1x = -r.l1 * 0.7; r.a2x = -r.l2 * 0.7; r.dy = Math.abs(s(t * 10)) * 0.06;
    } else if (st === 'noi') {
      r.nx = s(t * 7) * 0.07; r.a1x = -0.9 + s(t * 5) * 0.45; r.a2x = -0.2; r.mo = 1 + Math.abs(s(t * 14)) * 2.4; r.dx = s(t * 2) * 0.2;
    } else if (st === 'vui') {
      r.dy = Math.abs(s(t * 6)) * 0.55; r.a1z = 2.5; r.a2z = -2.5; r.mo = 2.2;
    } else if (st === 'so') {
      g.rotation.z = s(t * 32) * 0.05; r.a1x = -2.3; r.a2x = -2.3; r.nx = -0.2; r.mo = 2.6; r.dy = 0;
    } else if (st === 'gian') {
      r.dy = Math.abs(s(t * 11)) * 0.12; r.a1z = 0.9; r.a2z = -0.9; r.nx = 0.15; r.mo = 0.5;
    } else if (st === 'nghi') {
      r.a1x = -2.1; r.a1z = -0.25; r.nx = 0.1; r.dx = 0.35 + s(t) * 0.08;
    } else if (st === 'cuoi') {
      r.dy = Math.abs(s(t * 5)) * 0.1; r.a1z = 0.7; r.a2z = -0.7; r.nx = s(t * 9) * 0.08; r.mo = 1.8;
    }
    if (st !== 'so') g.rotation.z = 0;
    g.position.y = r.dy; o.l1.rotation.x = r.l1; o.l2.rotation.x = r.l2; o.a1.rotation.x = r.a1x; o.a2.rotation.x = r.a2x; o.a1.rotation.z = r.a1z; o.a2.rotation.z = r.a2z;
    o.dau.rotation.y = r.dx; o.dau.rotation.x = r.nx; o.mo.scale.y = r.mo; o.th.rotation.x = 0;
  }

  // ---------------- Hạt, vòng sáng ----------------
  function phao(mau, n, x, z) {
    for (var i = 0; i < n; i++) {
      var o = new T.Mesh(gSph(0.12), matS(mau[i % mau.length])); o.position.set(x, 1.8, z); o.castShadow = false; G.add(o);
      var a = Math.random() * 6.283, v = 1.5 + Math.random() * 3;
      hat.push({ o: o, vx: Math.cos(a) * v, vy: 4 + Math.random() * 4, vz: Math.sin(a) * v, l: 1.4 + Math.random() * 0.6 });
    }
  }
  function vongSang(mau, x, z) {
    var r = new T.Mesh(geo('ring', function () { return new T.TorusGeometry(1, 0.06, 8, 40); }), matS(mau)); r.rotation.x = Math.PI / 2; r.position.set(x, 0.08, z); r.castShadow = false; G.add(r); vong.push({ o: r, l: 1.6 });
  }

  // ---------------- Dựng một cảnh ----------------
  // opt.cho = true: bong bóng thoại chờ giọng đọc (Trợ giảng/nhân vật) gọi SB.hienBong(thờiLượng) mới hiện và gõ chữ theo nhịp giọng
  SB.hienBong = function (giay) { if (bong) { bong.t0 = 0; bong.toc = Math.max(18, bong.full.length / Math.max(1.2, giay)); } else hienSom = giay; };
  SB.datLai = function () { hienSom = null; };
  SB.dung = function (el, d, loiDan, opt) {
    if (!SB.ok || !d || !BO[d.bo]) return false;
    SB.tam(); xoaCanh();
    khung = el; el.appendChild(cvs); ov = document.createElement('div'); ov.className = 'sb-ov'; el.appendChild(ov);
    G = new T.Group(); scene.add(G); nvs = []; hat = []; vong = []; neo = {}; tuyDong = []; mua = null; keoX = 0; keoY = 0; rung = 0; dolly = 0; tuT = 0; rongCu = 0; caoCu = 0;
    BO[d.bo]();
    (d.tuy || []).forEach(function (k) { if (TUY[k]) TUY[k](); });
    var slots = ['a', 'b', 'c'];
    (d.nv || []).forEach(function (s, i) { var p = String(s).split('|'); datNv(p[0], p[1], slots[i] || 'b', i); });
    // bong bóng thoại
    bong = null;
    if (loiDan && d.noi) {
      var ten = loiDan.ai, nd = loiDan.nd, b = document.createElement('div'); b.className = 'sb-bong'; b.innerHTML = '<b></b><span></span>'; b.firstChild.textContent = ten + ': ';
      ov.appendChild(b); bong = { el: b, txt: b.lastChild, full: '«' + nd + '»', n: 0, who: d.noi, t0: (opt && opt.cho) ? 1e9 : 1.6, hien: false, toc: 70 };
      if (opt && opt.cho && hienSom !== null) { bong.t0 = 0; bong.toc = Math.max(18, bong.full.length / Math.max(1.2, hienSom)); }
      hienSom = null;
    }
    ov.style.opacity = '1';
    clock.getDelta(); raf = requestAnimationFrame(ve);
    return true;
  };
  function xoaCanh() { if (G) { scene.remove(G); G = null; } if (ov && ov.parentNode) ov.parentNode.removeChild(ov); ov = null; bong = null; nvs = []; hat = []; vong = []; }
  SB.tam = function () { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

  // Phản ứng sau khi em chọn: tot = 2 / 1 / 0
  SB.phanUng = function (tot) {
    if (!SB.ok || !G) return;
    var em = nvs.filter(function (o) { return o.id === 'em'; })[0]; if (!em) return;
    var nguoiNoi = bong && nvs.filter(function (o) { return o.id === bong.who; })[0];
    var px = em.g.position.x, pz = em.g.position.z;
    nvs.forEach(function (o) { if (o !== em) o.st = tot === 2 ? 'vui' : tot === 1 ? 'nghi' : 'idle'; });
    if (nguoiNoi) nguoiNoi.st = tot === 2 ? 'gian' : tot === 1 ? 'nghi' : 'cuoi';
    em.st = tot === 2 ? 'vui' : tot === 1 ? 'nghi' : 'so';
    if (tot === 2) { phao(['#22c55e', '#fde047', '#38bdf8'], 36, px, pz); vongSang('#22c55e', px, pz); dolly = 1.2; }
    else if (tot === 1) { phao(['#fde047', '#fb923c'], 18, px, pz); vongSang('#f59e0b', px, pz); }
    else { phao(['#ef4444', '#6b7280'], 30, px, pz); vongSang('#ef4444', px, pz); rung = 0.8; }
    if (bong) { bong.el.classList.add('pu'); bong.el.firstChild.textContent = em.ten + ': '; bong.full = '«' + NOI_PU[tot] + '»'; bong.n = 0; bong.t0 = 0; bong.toc = 70; bong.who = 'em'; bong.hien = true; }
    if (ov) ov.setAttribute('data-pu', String(tot));
  };

  // ---------------- Vòng lặp vẽ ----------------
  var v3 = null;
  function ve() {
    raf = requestAnimationFrame(ve);
    if (!khung || !document.body.contains(khung)) { SB.tam(); return; }
    khungHinh(Math.min(0.05, clock.getDelta()));
  }
  // Chạy n khung hình với bước thời gian dt (dùng khi kiểm thử, vì trình duyệt ẩn giảm tốc độ vẽ)
  SB._chay = function (dt, n) { for (var i = 0; i < n; i++) khungHinh(dt); };
  function khungHinh(dt) {
    tuT += dt;
    var w = khung.clientWidth, h = khung.clientHeight;
    if (w && (w !== rongCu || h !== caoCu)) { rongCu = w; caoCu = h; R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
    if (!w) return;
    nvs.forEach(function (o) { tuThe(o, dt); });
    if (bong) {
      if (bong.t0 > 0) bong.t0 -= dt;
      else {
        if (!bong.hien) { bong.hien = true; bong.el.classList.add('hien'); var nn = nvs.filter(function (o) { return o.id === bong.who; })[0]; if (nn && nn.st === 'idle') nn.st = 'noi'; }
        if (bong.n < bong.full.length) { bong.n = Math.min(bong.full.length, bong.n + dt * (bong.toc || 70)); bong.txt.textContent = bong.full.slice(0, Math.floor(bong.n)); bong.el.classList.add('hien'); }
        else { var nw = nvs.filter(function (o) { return o.id === bong.who; })[0]; if (nw && nw.st === 'noi') nw.st = 'idle'; }
      }
    }
    for (var i = hat.length - 1; i >= 0; i--) { var p = hat[i]; p.l -= dt; p.vy -= 9 * dt; p.o.position.x += p.vx * dt; p.o.position.y += p.vy * dt; p.o.position.z += p.vz * dt; p.o.scale.setScalar(Math.max(0.01, Math.min(1, p.l))); if (p.l <= 0 || p.o.position.y < 0) { G.remove(p.o); hat.splice(i, 1); } }
    for (var j = vong.length - 1; j >= 0; j--) { var q = vong[j]; q.l -= dt; var sc = 0.8 + (1.6 - q.l) * 2.4; q.o.scale.set(sc, sc, sc); q.o.material.opacity = 1; if (q.l <= 0) { G.remove(q.o); vong.splice(j, 1); } }
    tuyDong.forEach(function (a) {
      if (a.k === 'quay') { var ag = a.a + tuT * a.v; a.o.position.set(Math.cos(ag) * a.r * 0.62, a.h, -2 + Math.sin(ag) * a.r * 0.5); a.o.rotation.y = -ag + 1.57; }
      else if (a.k === 'nhay') a.o.visible = Math.floor(tuT * 2.4) % 2 === 0;
      else if (a.k === 'nhip') { var z = 1 + Math.sin(tuT * 4) * 0.12; a.o.scale.set(z, z, z); }
      else if (a.k === 'khoi') { var ph = (tuT * 0.5 + a.i * 0.4) % 2.4; a.o.position.y = a.h0 + ph * 1.1; a.o.position.x = 2.2 + ph * 0.5; var sk = 0.4 + ph * 0.35; a.o.scale.setScalar(sk); }
      else if (a.k === 'nuoc') a.o.material.color.setHSL(0.6 + Math.sin(tuT * 0.6) * 0.03, 0.6, 0.38);
      else if (a.k === 'ruoi') { a.o.position.set(5.4 + Math.cos(tuT * 3) * 0.6, 1.4 + Math.sin(tuT * 4) * 0.2, -1 + Math.sin(tuT * 3) * 0.6); }
    });
    if (mua) mua.forEach(function (o) { o.position.y -= 14 * dt; if (o.position.y < 0) o.position.y = 12; });
    // máy quay: xoay nhẹ quanh sa bàn, kéo chuột để xoay
    var asp = w / h, rad = 14.8 / Math.min(1, asp * 1.1) - dolly * 1.2; if (dolly > 0) dolly = Math.max(0, dolly - dt * 0.6);
    var ya = yaw + Math.sin(tuT * 0.25) * 0.1 + keoX, cx = Math.sin(ya) * rad, cz = Math.cos(ya) * rad, cy = 8.6 + keoY * 20;
    var sx = 0, sy = 0; if (rung > 0) { rung -= dt; sx = (Math.random() - 0.5) * 0.35 * rung; sy = (Math.random() - 0.5) * 0.35 * rung; }
    cam.position.set(cx + sx, cy + sy, cz); cam.lookAt(0, 1.7, 0.6);
    R.render(scene, cam);
    // nhãn tên và bong bóng thoại bám theo đầu nhân vật
    if (!v3) v3 = new T.Vector3();
    nvs.forEach(function (o) { chieu(o.el, o.g.position.x, 2.7 * o.cao + o.g.position.y, o.g.position.z, w, h, false); });
    if (bong) {
      var nn2 = nvs.filter(function (o) { return o.id === bong.who; })[0];
      if (nn2) chieu(bong.el, nn2.g.position.x, 3.0 * nn2.cao + nn2.g.position.y, nn2.g.position.z, w, h, true);
      else if (neo.dt) chieu(bong.el, neo.dt.x, neo.dt.y, neo.dt.z, w, h, true);
    }
  }
  function chieu(el, x, y, z, w, h, kep) {
    v3.set(x, y, z).project(cam);
    if (v3.z > 1) { el.style.visibility = 'hidden'; return; }
    el.style.visibility = ''; var px = (v3.x * 0.5 + 0.5) * w, py = (-v3.y * 0.5 + 0.5) * h;
    if (kep && w < 520) { el.style.transform = 'translate(' + Math.round(w / 2) + 'px,8px) translate(-50%,0)'; return; }   // màn hẹp: bong bóng thoại cố định ở đầu khung, không che nhân vật
    if (kep) { var hw = Math.min(el.offsetWidth, w) / 2 + 6; px = Math.max(hw, Math.min(w - hw, px)); py = Math.max(el.offsetHeight + 8, py); }
    el.style.transform = 'translate(' + Math.round(px) + 'px,' + Math.round(py) + 'px) translate(-50%,-100%)';
  }
})();
