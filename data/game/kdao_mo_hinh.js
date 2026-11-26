/* PHÒNG KINH DOANH ẢO — mô hình kinh tế của một tháng (hàm thuần, không dùng DOM; dùng cả trong trình chơi lophoc_kdao.js và bộ kiểm _cong-cu/game/kiem_kdao.js).
   Cầu = cầu gốc × hệ số theo GIÁ × hệ số của THÁNG (bản tin) × hệ số UY TÍN (0,8 → 1,2). Bán được = min(cầu, lượng nhập). Rau tươi KHÔNG để qua tháng: hàng thừa bỏ đi.
   Lãi = giá × bán − giá vốn × lượng nhập − chi phí cố định. Đơn vị tiền: nghìn đồng; mọi số liệu là SỐ GIẢ ĐỊNH để học cách suy nghĩ (Lớp 10 Bài 4; Lớp 11 Bài 1, Bài 2, Bài 3; Lớp 12 Bài 5). */
SC.kd = {
  // Kết quả của một tháng nếu chọn giá gi (0..2) và lượng nhập nh (0..2); kPhu = hệ số phụ do hậu quả quyết định cũ (mặc định 1)
  thang: function (K, t, gi, nh, tin, kPhu) {
    var M = K.mo_hinh, m = K.thang[t], p = M.GIA[gi], q = M.NHAP[nh];
    var fp = M.f[p] * ((m.gia && m.gia[p]) || 1), u = 0.8 + 0.4 * (tin / 100);
    var cau = Math.round(M.D0 * fp * m.k * u * (kPhu || 1)), ban = Math.min(cau, q), c = Math.round(M.C0 * m.cf * 10) / 10;
    var dt = p * ban, cp = Math.round(c * q), ln = Math.round(dt - cp - M.F);
    return { gia: p, nhap: q, cau: cau, ban: ban, dt: dt, cp: cp, cf: M.F, ln: ln, du: q - ban, thieu: Math.max(0, cau - q), giaVon: c, laiTui: Math.round((p - c) * 10) / 10 };
  },
  // Chấm phần điều hành: so lãi đã chọn với tổ hợp tốt nhất của tháng. tot: 2 gần tối ưu · 1 chấp nhận được · 0 xa tối ưu
  cham: function (K, t, gi, nh, tin, kPhu) {
    var best = null, r = SC.kd.thang(K, t, gi, nh, tin, kPhu), g, n;
    for (g = 0; g < 3; g++) for (n = 0; n < 3; n++) { var x = SC.kd.thang(K, t, g, n, tin, kPhu); if (!best || x.ln > best.ln) best = { g: g, n: n, ln: x.ln, kq: x }; }
    var gap = best.ln - r.ln, ab = Math.abs(best.ln);
    var tot = gap <= Math.max(600, 0.1 * ab) ? 2 : gap <= Math.max(2500, 0.4 * ab) ? 1 : 0;
    return { kq: r, best: best, gap: gap, tot: tot };
  }
};
