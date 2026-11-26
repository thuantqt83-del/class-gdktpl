/* Quy tắc GIỌNG ĐỌC dùng chung cho trình chơi (lophoc_am.js) và công cụ thu giọng (tools/giong/). KHÔNG dùng DOM, để chạy được cả trong Node.
   Mỗi câu đọc có «hồ sơ giọng» (id): 'ke' = người kể (nam), 'tg' = Trợ giảng (nữ), 'dt' = tin nhắn trên điện thoại, 'nv_<vai>' = nhân vật theo giới tính và tông trong data/game/sb_thuvien.js.
   Khoá file = FNV(id + '|' + văn bản) ở dạng 8 số hex → file assets/audio/vo/<khoá>.mp3. Sửa văn bản thì khoá đổi, file cũ tự thành «mồ côi» và trình chơi dùng giọng dự phòng của trình duyệt. */
SC.vo = {
  GIONG: { nam: 'vi-VN-NamMinhNeural', nu: 'vi-VN-HoaiMyNeural' },
  // hồ sơ cố định
  HOSO: {
    ke: { g: 'nam', ts: 0, tc: -4 },
    tg: { g: 'nu', ts: 0, tc: -2 },
    dt: { g: 'nu', ts: 10, tc: 6 }
  },
  // Chọn hồ sơ: kieu = 'ke' | 'tg' | 'nv' ; vai = id nhân vật ('dt' = tin nhắn điện thoại)
  hoSo: function (kieu, vai) {
    if (kieu === 'nv') return vai === 'dt' ? 'dt' : 'nv_' + vai;
    return kieu === 'tg' ? 'tg' : 'ke';
  },
  thongSo: function (id) {
    var h = SC.vo.HOSO[id], v;
    if (!h && id.indexOf('nv_') === 0) {
      v = (SC.data.game.sb.vai || {})[id.slice(3)] || { gt: 'nam', ts: 0, tc: 0 };
      h = { g: v.gt || 'nam', ts: v.ts || 0, tc: v.tc || 0 };
    }
    h = h || SC.vo.HOSO.ke;
    return { voice: SC.vo.GIONG[h.g], rate: (h.tc >= 0 ? '+' : '') + h.tc + '%', pitch: (h.ts >= 0 ? '+' : '') + h.ts + 'Hz' };
  },
  khoa: function (id, text) { return ('00000000' + SC.hashStr(id + '|' + String(text).replace(/\s+/g, ' ').trim()).toString(16)).slice(-8); },
  // Văn bản đọc sau khi em chọn: lỗi sai + rủi ro (chỉ có ở phương án chưa tốt)
  phanTich: function (o) { return o.loi_sai ? 'Lỗi sai của lựa chọn: ' + o.loi_sai + ' Rủi ro em có thể gặp: ' + o.rui_ro : ''; },
  // Kết cục: tên + lời kể
  ketCuc: function (k) { return k.ten + '. ' + k.nd; },
  // Liệt kê MỌI câu có thể được đọc của một hành trình: [{ id, text, kieu }]
  liet: function (h) {
    var out = [];
    function them(kieu, vai, text) { if (text && String(text).trim()) out.push({ id: SC.vo.hoSo(kieu, vai), text: String(text).replace(/\s+/g, ' ').trim(), kieu: kieu }); }
    h.chuong.forEach(function (ch) {
      them('ke', null, ch.mo);
      Object.keys(ch.canh).forEach(function (cid) {
        var c = ch.canh[cid];
        them('ke', null, c.nd);
        (c.them || []).forEach(function (b) { them('ke', null, b.nd); });
        if (c.loi_dan && c.sb) them('nv', c.sb.noi, c.loi_dan.nd);
        (c.goi_y || []).forEach(function (g) { them('tg', null, g); });
        c.chon.forEach(function (o) { them('tg', null, o.bl); them('tg', null, SC.vo.phanTich(o)); });
      });
      (ch.chuyen || []).forEach(function (b) { them('ke', null, b.nd); });
    });
    h.ket.forEach(function (k) { them('ke', null, SC.vo.ketCuc(k)); });
    Object.keys(h.ket_som).forEach(function (k) { them('ke', null, SC.vo.ketCuc(h.ket_som[k])); });
    (h.hq_lai || []).forEach(function (r) { them('ke', null, r.nd); (r.kp || []).forEach(function (k) { them('tg', null, k.bl); }); });   // hậu quả quay lại (L2)
    return out;
  },
  // Liệt kê mọi câu có thể được đọc của «Phòng kinh doanh ảo» (data/game/kdao.js). Câu động (lãi tháng này…) KHÔNG nằm trong danh sách: dùng giọng dự phòng của trình duyệt.
  lietKd: function (K) {
    var out = [];
    function them(kieu, vai, text) { if (text && String(text).trim()) out.push({ id: SC.vo.hoSo(kieu, vai), text: String(text).replace(/\s+/g, ' ').trim(), kieu: kieu }); }
    function canh(t) {   // một «tình huống»: Tháng 0, sự cố giữa tháng hoặc tình huống cuối tháng
      them('ke', null, t.nd);
      if (t.loi_dan) them('nv', t.sb ? t.sb.noi : null, t.loi_dan.nd);
      (t.goi_y || []).forEach(function (g) { them('tg', null, g); });
      t.chon.forEach(function (o) { them('tg', null, o.bl); them('tg', null, SC.vo.phanTich(o)); });
    }
    if (K.thang0) canh(K.thang0);
    K.thang.forEach(function (m) {
      them('ke', null, m.tin_tuc);
      if (m.dan) them('nv', m.sb ? m.sb.noi : m.dan.vai, m.dan.nd);
      (m.goi_y || []).forEach(function (g) { them('tg', null, g); });
      if (m.su_co) canh(m.su_co);
      if (m.hop) { them('ke', null, m.hop.nd); (m.hop.goi_y || []).forEach(function (g) { them('tg', null, g); }); m.hop.viec.forEach(function (v) { them('ke', null, v.nd); v.cach.concat([v.bo]).forEach(function (o) { them('tg', null, o.bl); them('tg', null, SC.vo.phanTich(o)); }); }); }   // hộp thư (L3)
      canh(m.tinh_huong);
    });
    K.hau_qua.forEach(function (h) { them('ke', null, h.nd); });
    K.ket.forEach(function (k) { them('ke', null, SC.vo.ketCuc(k)); });
    Object.keys(K.ket_som).forEach(function (k) { them('ke', null, SC.vo.ketCuc(K.ket_som[k])); });
    return out;
  }
};
