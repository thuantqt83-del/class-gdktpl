/* Kết nối máy chủ (Supabase) — BƯỚC 1 (nền). Chỉ bật khi SC.config có Project URL (https) và anon key; không có thì SC.cloud.bat() = false
   và app chạy chế độ trên máy như trước, KHÔNG gọi mạng.
   Học sinh: đăng nhập ẩn danh rồi gõ TÊN (hàm máy chủ tham_gia_theo_ten, schema_buoc5.sql; từ 24/11/2026) hoặc mã lớp + mã học sinh (tham_gia_lop, cách cũ). Giáo viên: chỉ nhập MẬT KHẨU (email nội bộ lấy ở SC.config.giaoVienEmail; tài khoản do chủ dự án tạo
   và cấp quyền bằng them_giao_vien.sql). Không lưu mật khẩu, không lưu tên thật; phiên đăng nhập do thư viện Supabase giữ trong localStorage.
   Thư viện chép sẵn ở assets/vendor (supabase-js 2.45.4, MIT), chỉ nạp khi cần. */
SC.cloud = (function () {
  var LIB = 'assets/vendor/supabase-js-2.45.4.umd.js';
  var client = null, dangNap = null;
  var phien = { vaiTro: null, email: '', lop: null, hs: null, thieuQuyen: false };
  var nguoiNghe = [];

  var THONG_BAO = {
    sai_ma: 'Mã lớp hoặc mã học sinh chưa đúng. Kiểm tra lại mã cô đã phát.',
    thu_qua_nhieu: 'Bạn đã nhập sai nhiều lần. Đợi khoảng 10 phút rồi thử lại.',
    lop_tam_khoa: 'Lớp này đang bị khoá tạm vì có quá nhiều lần nhập sai. Báo cô giáo và thử lại sau ít phút.',
    ma_da_dung_o_may_khac: 'Mã học sinh này đã được dùng ở một máy khác. Nhờ cô bấm «cho đăng nhập lại» cho mã này rồi thử lại.',
    chua_dang_nhap: 'Chưa đăng nhập được với máy chủ. Tải lại trang rồi thử lại.',
    sai_ten: 'Chưa thấy tên này trong lớp nào. Gõ đúng tên cô đã nhập (có dấu hay không dấu đều được) hoặc hỏi cô.',
    ten_ngan: 'Nhập tên của em (từ 2 đến 40 ký tự).',
    trung_ten: 'Có bạn cùng tên ở các lớp khác nhau. Em học lớp nào?',
    trung_ten_lop: 'Có hai bạn cùng tên trong lớp này. Nhờ cô đổi một tên cho khác nhau (ví dụ thêm chữ cái).',
    ten_da_dung_o_may_khac: 'Tên này đã được dùng ở một máy khác. Nếu đó là em, nhờ cô bấm «Cho đăng nhập lại» rồi thử lại.'
  };

  function bat() {
    var c = window.SC && SC.config || {};
    return !!(c.supabaseUrl && c.supabaseAnonKey && /^https:\/\/\S+$/.test(String(c.supabaseUrl)));
  }

  function baoDoi() {
    nguoiNghe.forEach(function (f) { try { f(phien); } catch (e) {} });
  }
  function datPhien(vaiTro, them) {
    phien = { vaiTro: vaiTro, email: '', lop: null, hs: null, thieuQuyen: false };
    if (them) for (var k in them) if (Object.prototype.hasOwnProperty.call(them, k)) phien[k] = them[k];
    baoDoi();
    return phien;
  }

  function taiThuVien() {
    return new Promise(function (ok, loi) {
      if (window.supabase && window.supabase.createClient) { ok(); return; }
      var s = document.createElement('script');
      s.src = LIB; s.async = true;
      s.onload = function () { (window.supabase && window.supabase.createClient) ? ok() : loi(new Error('Thư viện kết nối không đúng.')); };
      s.onerror = function () { loi(new Error('Không tải được thư viện kết nối.')); };
      document.head.appendChild(s);
    });
  }

  // Trả về client Supabase (nạp thư viện lần đầu). Từ chối nếu chưa cấu hình.
  function sanSang() {
    if (client) return Promise.resolve(client);
    if (!bat()) return Promise.reject(new Error('Chưa cấu hình máy chủ.'));
    if (!dangNap) {
      dangNap = taiThuVien().then(function () {
        client = window.supabase.createClient(SC.config.supabaseUrl, SC.config.supabaseAnonKey,
          { auth: { persistSession: true, autoRefreshToken: true, storageKey: 'scgdktpl:auth' } });
        return client;
      }).catch(function (e) { dangNap = null; throw e; });
    }
    return dangNap;
  }

  function loiMang(e) {
    var m = (e && e.message) || '';
    if (/Failed to fetch|NetworkError|Load failed/i.test(m)) return 'Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.';
    return m || 'Có lỗi khi kết nối máy chủ.';
  }

  // Đọc vai trò thật từ máy chủ (RLS): ẩn danh + có dòng hoc_sinh => học sinh; tài khoản email + có dòng giao_vien => giáo viên.
  function docVaiTro(user) {
    var c = client;
    if (!user) return Promise.resolve(datPhien(null));
    if (user.is_anonymous) {
      var cot = 'ma_hs, lop:lop_id(ma_lop, ten_lop, khoi, nam_hoc, cho_xep_hang)';
      return Promise.resolve(c.from('hoc_sinh').select('ten, ' + cot).limit(1)).then(function (r) {
        if (r && r.error) return Promise.resolve(c.from('hoc_sinh').select(cot).limit(1));   // máy chủ chưa chạy schema_buoc5.sql (chưa có cột ten)
        return r;
      }).then(function (r) {
        var d = r && r.data && r.data[0];
        return d ? datPhien('hs', { hs: { ma_hs: d.ma_hs, ten: d.ten || '' }, lop: d.lop }) : datPhien(null);
      });
    }
    return Promise.resolve(c.from('giao_vien').select('id').eq('id', user.id).limit(1)).then(function (r) {
      var co = r && r.data && r.data.length;
      return co ? datPhien('gv', { email: user.email || '' }) : datPhien(null, { thieuQuyen: true, email: user.email || '' });
    });
  }

  // Gọi khi mở app: khôi phục phiên cũ (nếu có). Lỗi mạng thì giữ chế độ trên máy.
  function khoiPhuc() {
    return sanSang().then(function (c) { return c.auth.getSession(); }).then(function (r) {
      var s = r && r.data && r.data.session;
      return s ? docVaiTro(s.user) : datPhien(null);
    }).catch(function () { return datPhien(null); });
  }

  function chuanMa(s) { return String(s == null ? '' : s).trim().toUpperCase().replace(/\s+/g, ''); }

  // Học sinh vào lớp. Trả {ok:true} hoặc {ok:false, thongBao}.
  function hocSinhVao(maLop, maHs) {
    var ml = chuanMa(maLop), mh = chuanMa(maHs);
    if (ml.length < 3 || mh.length < 3 || ml.length > 12 || mh.length > 12) return Promise.resolve({ ok: false, thongBao: 'Nhập đủ mã lớp và mã học sinh.' });
    var c;
    return sanSang().then(function (cl) {
      c = cl; return c.auth.getSession();
    }).then(function (r) {
      var s = r && r.data && r.data.session;
      if (s && !s.user.is_anonymous) throw { thongBao: 'Máy này đang đăng nhập bằng tài khoản giáo viên. Hãy thoát trước khi vào lớp (đăng nhập bằng tên).' };
      if (s) return s;
      return Promise.resolve(c.auth.signInAnonymously()).then(function (r2) {
        if (r2.error) throw { thongBao: 'Máy chủ chưa cho học sinh đăng nhập (chưa bật «Anonymous sign-ins»). Báo cô giáo.' };
        return r2.data.session;
      });
    }).then(function () {
      return c.rpc('tham_gia_lop', { p_ma_lop: ml, p_ma_hs: mh });
    }).then(function (r) {
      if (r.error) throw { thongBao: 'Máy chủ chưa sẵn sàng (chưa chạy schema.sql?). ' + (r.error.message || '') };
      var d = r.data || {};
      if (!d.ok) return { ok: false, thongBao: THONG_BAO[d.ly_do] || 'Không vào được lớp.' };
      return Promise.resolve(c.auth.getUser()).then(function (u) { return docVaiTro(u.data && u.data.user); }).then(function () { return { ok: true }; });
    }).catch(function (e) {
      return { ok: false, thongBao: (e && e.thongBao) || loiMang(e) };
    });
  }

  // Học sinh vào lớp bằng TÊN (24/11/2026). lop (tuỳ chọn) = tên lớp, dùng khi trùng tên giữa hai lớp. Trả {ok:true} hoặc {ok:false, ly_do, thongBao, lop?}.
  function hocSinhVaoTen(ten, lop) {
    var t = String(ten == null ? '' : ten).normalize('NFC').replace(/\s+/g, ' ').trim();
    if (t.length < 2 || t.length > 40) return Promise.resolve({ ok: false, ly_do: 'ten_ngan', thongBao: THONG_BAO.ten_ngan });
    var c;
    return sanSang().then(function (cl) {
      c = cl; return c.auth.getSession();
    }).then(function (r) {
      var s = r && r.data && r.data.session;
      if (s && !s.user.is_anonymous) throw { thongBao: 'Máy này đang đăng nhập bằng tài khoản giáo viên. Hãy thoát trước khi vào lớp.' };
      if (s) return s;
      return Promise.resolve(c.auth.signInAnonymously()).then(function (r2) {
        if (r2.error) throw { thongBao: 'Máy chủ chưa cho học sinh đăng nhập (chưa bật «Anonymous sign-ins»). Báo cô giáo.' };
        return r2.data.session;
      });
    }).then(function () {
      return c.rpc('tham_gia_theo_ten', { p_ten: t, p_lop: lop ? String(lop) : null });
    }).then(function (r) {
      if (r.error) throw { thongBao: 'Máy chủ chưa có chức năng đăng nhập bằng tên (cô cần chạy schema_buoc5.sql). ' + (r.error.message || '') };
      var d = r.data || {};
      if (!d.ok) return { ok: false, ly_do: d.ly_do, lop: d.lop || null, thongBao: THONG_BAO[d.ly_do] || 'Không vào được lớp.' };
      return Promise.resolve(c.auth.getUser()).then(function (u) { return docVaiTro(u.data && u.data.user); }).then(function () { return { ok: true }; });
    }).catch(function (e) {
      return { ok: false, thongBao: (e && e.thongBao) || loiMang(e) };
    });
  }

  // Giáo viên chỉ nhập MẬT KHẨU: email nội bộ của tài khoản giáo viên lấy ở SC.config.giaoVienEmail (không cần có thật, không nhận thư).
  function emailGV() { var c = window.SC && SC.config || {}; return String(c.giaoVienEmail || 'giaovien@example.com').trim(); }
  function dangNhapGVMatKhau(matKhau) {
    if (!matKhau) return Promise.resolve({ ok: false, thongBao: 'Nhập mật khẩu.' });
    return dangNhapGV(emailGV(), matKhau).then(function (r) {
      if (!r.ok && /Email hoặc mật khẩu chưa đúng/.test(r.thongBao || '')) r.thongBao = 'Mật khẩu chưa đúng. (Lần đầu: chủ dự án cần tạo tài khoản giáo viên theo HUONG-DAN-DANG-NHAP.md.)';
      return r;
    });
  }

  // Giáo viên đăng nhập (đầy đủ email + mật khẩu; dùng cho chủ dự án). Trả {ok:true} hoặc {ok:false, thongBao}.
  function dangNhapGV(email, matKhau) {
    var em = String(email == null ? '' : email).trim();
    if (!em || !matKhau) return Promise.resolve({ ok: false, thongBao: 'Nhập email và mật khẩu.' });
    var c;
    return sanSang().then(function (cl) {
      c = cl; return c.auth.signInWithPassword({ email: em, password: matKhau });
    }).then(function (r) {
      if (r.error) throw { thongBao: /invalid login/i.test(r.error.message || '') ? 'Email hoặc mật khẩu chưa đúng.' : 'Không đăng nhập được: ' + (r.error.message || 'lỗi không rõ') };
      return docVaiTro(r.data.user);
    }).then(function (p) {
      if (p.vaiTro === 'gv') return { ok: true };
      return Promise.resolve(c.auth.signOut()).then(function () {
        datPhien(null);
        return { ok: false, thongBao: 'Tài khoản này chưa được cấp quyền giáo viên. Chủ dự án cần chạy them_giao_vien.sql cho email này.' };
      });
    }).catch(function (e) {
      return { ok: false, thongBao: (e && e.thongBao) || loiMang(e) };
    });
  }

  // Thoát. Với học sinh, thoát làm MẤT gắn kết mã với máy này (cô phải bấm «cho đăng nhập lại» nếu muốn vào lại).
  function dangXuat() {
    return sanSang().then(function (c) { return c.auth.signOut(); }).then(function () { datPhien(null); return { ok: true }; })
      .catch(function (e) { return { ok: false, thongBao: loiMang(e) }; });
  }

  // ===== BƯỚC 2: lưu lượt làm, máy chủ chấm điểm, hồ sơ tiến bộ, huy hiệu, xếp hạng =====
  var TEN_HUY_HIEU = {
    CHAM_CHI_7: 'Chăm chỉ 7 ngày', BA_BAI_8: 'Ba bài từ 8 điểm', DUNG_HAN_5: 'Nộp đúng hạn 5 bài', CHINH_PHUC_BAI: 'Chinh phục một bài',
    TIEN_BO_2: 'Tiến bộ 2 điểm', DUNG_LIEN_10: 'Đúng liên tiếp 10 câu', DU_BO_DE: 'Làm đủ một bộ đề', HANG_NHAT_TUAN: 'Hạng nhất tuần của lớp'
  };
  var LY_DO_LUOT = {
    chua_vao_lop: 'Chưa vào lớp (đăng nhập bằng tên).', khong_co_bai_giao: 'Không tìm thấy bài giao này.', chua_mo: 'Bài này chưa mở.',
    het_han: 'Bài này đã hết hạn nộp.', het_luot: 'Bạn đã dùng hết số lượt làm bài này.', ds_cau_khong_hop_le: 'Danh sách câu không hợp lệ.',
    cau_khong_hop_le: 'Có câu chưa có trên máy chủ (chưa nạp đáp án?).', khong_co_de: 'Đề này chưa có trên máy chủ (chưa nạp đáp án?).',
    khong_co_luot: 'Không tìm thấy lượt làm.', da_nop: 'Lượt làm này đã nộp rồi.', dap_an_khong_hop_le: 'Dữ liệu bài làm không hợp lệ.', khong_co_cau: 'Đề không có câu nào trên máy chủ.'
  };
  function laHS() { return bat() && phien.vaiTro === 'hs'; }
  function goi(ten, args) {
    return sanSang().then(function (c) { return c.rpc(ten, args || {}); }).then(function (r) {
      if (r.error) throw { thongBao: 'Máy chủ chưa sẵn sàng hoặc chưa cập nhật (' + (r.error.message || ten) + '). Báo cô giáo.' };
      return r.data;
    });
  }
  function batDauLuot(maDe, tuyChon) {
    tuyChon = tuyChon || {};
    if (!laHS()) return Promise.resolve({ ok: false, boQua: true });
    return goi('bat_dau_luot', { p_ma_de: maDe, p_ds_cau: tuyChon.dsCau || null, p_bai_giao: tuyChon.baiGiao || null }).then(function (d) {
      d = d || {};
      return d.ok ? { ok: true, luotId: d.luot_id, gioiHanGiay: d.gioi_han_giay, soCau: d.so_cau } : { ok: false, thongBao: LY_DO_LUOT[d.ly_do] || 'Không bắt đầu được lượt làm.' };
    }).catch(function (e) { return { ok: false, thongBao: (e && e.thongBao) || loiMang(e) }; });
  }
  function nopBai(luotId, dapAn, goiY) {
    return goi('nop_bai', { p_luot: luotId, p_dap_an: dapAn || {}, p_goi_y: goiY || {} }).then(function (d) {
      d = d || {};
      if (!d.ok) return { ok: false, thongBao: LY_DO_LUOT[d.ly_do] || 'Không nộp được bài lên máy chủ.' };
      return { ok: true, diem: d.diem, tong: d.tong, diem10: d.diem_10, soCau: d.so_cau, soCauDung: d.so_cau_dung, trangThai: d.trang_thai,
               huyHieuMoi: (d.huy_hieu_moi || []).map(function (m) { return TEN_HUY_HIEU[m] || m; }), dapAn: d.dap_an || {} };
    }).catch(function (e) { return { ok: false, thongBao: (e && e.thongBao) || loiMang(e) }; });
  }
  function doc(ten) {
    if (!laHS()) return Promise.resolve({ ok: false, thongBao: 'Chưa vào lớp (đăng nhập bằng tên).' });
    return goi(ten).then(function (d) { return { ok: true, du_lieu: d || [] }; }).catch(function (e) { return { ok: false, thongBao: (e && e.thongBao) || loiMang(e) }; });
  }
  // Vẽ kết quả lưu máy chủ vào phần tử hop (textContent/innerHTML đã escape).
  function hienKetQua(hop, r) {
    if (!hop) return;
    if (!r || r.boQua) { hop.textContent = ''; return; }
    if (!r.ok) { hop.innerHTML = '⚠️ Chưa lưu được lên máy chủ: ' + SC.esc(r.thongBao || 'lỗi không rõ') + ' (kết quả vẫn lưu trên máy này).'; return; }
    var f = function (x) { return String(Math.round(x * 100) / 100).replace('.', ','); };
    hop.innerHTML = '☁️ Đã lưu lên máy chủ · <b>điểm máy chủ chấm: ' + f(r.diem) + '/' + f(r.tong) + '</b> (' + r.soCauDung + '/' + r.soCau + ' câu đúng hoàn toàn)' +
      (r.trangThai === 'het_gio' ? ' · <b>nộp quá giờ</b>' : '') +
      (r.huyHieuMoi.length ? '<br>🏅 Huy hiệu mới: <b>' + r.huyHieuMoi.map(SC.esc).join(', ') + '</b>' : '');
  }
  // Lưu một lượt làm: luotP = kết quả batDauLuot (Promise); cards = các thẻ câu hỏi (QuestionCard); hop = phần tử hiện thông báo.
  function luuKetQua(luotP, cards, hop) {
    if (!luotP) return;
    if (hop) hop.textContent = 'Đang lưu kết quả lên máy chủ…';
    var ans = {}, goiY = {};
    cards.forEach(function (cd) {
      if (cd.q.dang === 'tn4' || cd.q.dang === 'dung_sai') {
        ans[cd.q.id] = cd.getAnswer();
        var lv = cd.hintLevel ? cd.hintLevel() : 0; if (lv) goiY[cd.q.id] = lv;
      }
    });
    luotP.then(function (r) { return r.ok ? nopBai(r.luotId, ans, goiY) : r; }).then(function (r) { hienKetQua(hop, r); });
  }

  // ===== BƯỚC 3: giáo viên (thống kê, quản lý lớp) và học sinh xem bài được giao =====
  LY_DO_LUOT.so_cau_khong_dung = 'Số câu của lượt làm không đúng với bài cô giao.';
  function laGV() { return bat() && phien.vaiTro === 'gv'; }
  // Gọi hàm máy chủ trả bảng: {ok:true, du_lieu:[…]} hoặc {ok:false, thongBao}
  function danhSach(ten, args) {
    return goi(ten, args || {}).then(function (d) { return { ok: true, du_lieu: d || [] }; })
      .catch(function (e) { return { ok: false, thongBao: (e && e.thongBao) || loiMang(e) }; });
  }

  // ===== BƯỚC 4: đấu trường trực tuyến (Phân hệ 4). Máy chủ giữ phòng, chấm từng câu, tự chuyển câu theo đồng hồ máy chủ =====
  var LY_DO_DAU = {
    chua_vao_lop: 'Chưa vào lớp (đăng nhập bằng tên).', bo_cau_khong_hop_le: 'Bộ câu hỏi không hợp lệ.', thoi_gian_khong_hop_le: 'Thời gian mỗi câu không hợp lệ.',
    cau_khong_hop_le: 'Có câu chưa có trên máy chủ (chưa nạp đáp án?).', khong_sinh_duoc_ma: 'Chưa tạo được mã phòng, thử lại.',
    khong_co_phong: 'Không có phòng nào của lớp bạn với mã này (hoặc phòng đã bị xoá).', phong_da_bat_dau: 'Phòng này đã bắt đầu đấu, không vào thêm được.',
    phong_day: 'Phòng đã đủ 10 người.', khong_phai_chu_phong: 'Chỉ chủ phòng mới bắt đầu được.', chua_du_nguoi: 'Cần ít nhất 2 người trong phòng để bắt đầu.',
    khong_trong_phong: 'Bạn không còn ở trong phòng này.', khong_dang_dau: 'Phòng này hiện không trong ván đấu.', sai_cau: 'Đã chuyển sang câu khác.',
    chua_den_gio: 'Câu này chưa mở.', het_gio: 'Hết giờ câu này.', dap_an_khong_hop_le: 'Lựa chọn không hợp lệ.', da_tra_loi: 'Bạn đã trả lời câu này rồi.'
  };
  // Gọi một hàm phòng đấu: ok => ham(d) (đối tượng kết quả); không ok => {ok:false, thongBao}
  function goiDau(ten, args, ham) {
    if (!laHS()) return Promise.resolve({ ok: false, thongBao: 'Cần vào lớp (đăng nhập bằng tên) để dùng đấu trường trực tuyến.' });
    return goi(ten, args).then(function (d) {
      d = d || {};
      if (!d.ok) return { ok: false, lyDo: d.ly_do, thongBao: LY_DO_DAU[d.ly_do] || 'Không thực hiện được.' };
      return ham ? ham(d) : { ok: true };
    }).catch(function (e) { return { ok: false, lyDo: 'mang', thongBao: (e && e.thongBao) || loiMang(e) }; });
  }
  function phongMoi(d) { return { ok: true, phongId: d.phong_id, maPhong: d.ma_phong }; }
  var dau = {
    tao: function (boCau, giay) { return goiDau('tao_phong', { p_bo_cau: boCau, p_giay: giay }, phongMoi); },
    vao: function (ma) { return goiDau('vao_phong', { p_ma: chuanMa(ma) }, phongMoi); },
    roi: function (phongId) { return goiDau('roi_phong', { p_phong: phongId }); },
    batDau: function (phongId) { return goiDau('dau_bat_dau', { p_phong: phongId }); },
    traLoi: function (phongId, maCau, chon) { return goiDau('dau_tra_loi', { p_phong: phongId, p_ma_cau: maCau, p_chon: chon }); },
    trangThai: function (phongId) {
      return goiDau('dau_trang_thai', { p_phong: phongId }, function (d) { return { ok: true, phong: d.phong, nguoi: d.nguoi || [], ketQuaCau: d.ket_qua_cau || null, tongKet: d.tong_ket || null }; });
    },
    phongCuaToi: function () { return goiDau('phong_cua_toi', {}, function (d) { return { ok: true, phongId: d.phong_id || null, maPhong: d.ma_phong || null }; }); },
    // Nghe Realtime (phòng/người chơi đổi) để máy khách hỏi lại ngay; trả hàm dừng nghe. Lỗi Realtime không ảnh hưởng: máy khách vẫn tự hỏi định kỳ.
    nghe: function (phongId, f) {
      var c = client, kenh = null;
      if (!c || !c.channel) return function () {};
      try {
        kenh = c.channel('dau-' + phongId)
          .on('postgres_changes', { event: '*', schema: 'public', table: 'phong_dau', filter: 'id=eq.' + phongId }, function () { f(); })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'phong_dau_nguoi', filter: 'phong_id=eq.' + phongId }, function () { f(); })
          .subscribe();
      } catch (e) { kenh = null; }
      return function () { try { if (kenh && c.removeChannel) c.removeChannel(kenh); } catch (e) {} kenh = null; };
    }
  };

  return {
    dau: dau,
    goi: goi,
    danhSach: danhSach,
    laGV: laGV,
    client: sanSang,
    baiGiaoCuaToi: function () { return doc('bai_giao_cua_toi'); },
    batDauLuot: batDauLuot,
    nopBai: nopBai,
    luuKetQua: luuKetQua,
    hienKetQua: hienKetQua,
    tienBoTuan: function () { return doc('tien_bo_tuan'); },
    nangLuc: function () { return doc('nang_luc_theo_bai'); },
    xepHang: function () { return doc('xep_hang_lop'); },
    huyHieu: function () { return doc('huy_hieu_cua_toi'); },
    laHS: laHS,
    bat: bat,
    sanSang: sanSang,
    khoiPhuc: khoiPhuc,
    hocSinhVao: hocSinhVao,
    hocSinhVaoTen: hocSinhVaoTen,
    dangNhapGV: dangNhapGV,
    dangNhapGVMatKhau: dangNhapGVMatKhau,
    emailGV: emailGV,
    dangXuat: dangXuat,
    phien: function () { return phien; },
    vaiTro: function () { return phien.vaiTro; },
    nghe: function (f) { nguoiNghe.push(f); },
    _datClient: function (c) { client = c; }   // chỉ để kiểm thử bằng máy chủ giả
  };
})();
