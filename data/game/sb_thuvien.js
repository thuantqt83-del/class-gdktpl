/* Thư viện cho SA BÀN 3D (lophoc_sb3d.js): danh sách «bối cảnh» (bo) và «nhân vật» (vai) mà các cảnh trong hanhtrinh_*.js được phép dùng.
   Mỗi cảnh khai báo sb: { bo, nv: ['em', 'me|Mẹ', ...], noi, tuy: [...] } — nv xếp lần lượt vào 3 vị trí a, b, c; noi = nhân vật đang nói lời dẫn dụ ('dt' = tin nhắn trên điện thoại).
   Hình dáng nhân vật chỉ là hình khối đơn giản (tượng trưng, không phải người thật): ao = màu áo, quan = màu quần, toc = màu tóc, cao = tỉ lệ chiều cao,
   toc_dai = tóc dài, mu = màu mũ, kinh = đeo kính, gay = người lớn tuổi có gậy. Tên người trong truyện là tên tượng trưng.
   Giọng đọc (lophoc_am.js, data/game/vo_quy_tac.js): gt = nam|nu (chọn giọng Nam Minh hoặc Hoài My), ts = lệch cao độ (Hz), tc = lệch tốc độ (%). */
SC.data.game = SC.data.game || {};
SC.data.game.sb = {
  bo: {
    benh_vien: 'Bệnh viện', ngan_hang: 'Ngân hàng', ngo_xom: 'Ngõ xóm', cho: 'Chợ', nha: 'Nhà', mang: 'Mạng xã hội', cua_hang: 'Cửa hàng rau sạch',
    kho_xuong: 'Kho giao hàng', van_phong: 'Văn phòng', uy_ban: 'Uỷ ban nhân dân', truong: 'Sân trường', tro: 'Nhà trọ', tram_xe: 'Trạm xe buýt',
    phong_bau: 'Điểm bầu cử', xuong_nhuom: 'Cơ sở nhuộm'
  },
  tuy: ['tien', 'giay', 'vi', 'dien_thoai', 'xe_may', 'mua', 'rac', 'rao', 'kinh_vo', 'camera'],
  vai: {
    em:       { ten: 'Em', gt: 'nu', ts: 0, tc: 0,            ao: '#2f80ed', quan: '#243b63', toc: '#2b2118', cao: 1 },
    me:       { ten: 'Mẹ', gt: 'nu', ts: 0, tc: -2,            ao: '#e8788a', quan: '#6b5b95', toc: '#2b2118', toc_dai: 1, cao: 0.95 },
    bo:       { ten: 'Bố', gt: 'nam', ts: -4, tc: -2,            ao: '#6d8b74', quan: '#3d4a5c', toc: '#1f1a16', cao: 1.08 },
    ba:       { ten: 'Bà', gt: 'nu', ts: -10, tc: -12,            ao: '#b08968', quan: '#5b4636', toc: '#e6e6e6', cao: 0.9, gay: 1 },
    chu_tam:  { ten: 'Chú Tám', gt: 'nam', ts: -14, tc: -6,       ao: '#242424', quan: '#151515', toc: '#111111', mu: '#1a1a1a', kinh: 1, cao: 1.1 },
    quan:     { ten: 'Quân', gt: 'nam', ts: 10, tc: 4,          ao: '#ff8a3d', quan: '#2d3e50', toc: '#4a3320', cao: 1 },
    chi_hx:   { ten: 'Chị hàng xóm', gt: 'nu', ts: 6, tc: 2,  ao: '#9b5de5', quan: '#3c3c54', toc: '#2b2118', toc_dai: 1, cao: 0.96 },
    chu_quay: { ten: 'Chủ quầy', gt: 'nam', ts: 2, tc: 4,      ao: '#f2c14e', quan: '#5a4a32', toc: '#3b2a1c', mu: '#c0392b', cao: 1.05 },
    khach:    { ten: 'Khách quen', gt: 'nu', ts: 2, tc: 0,    ao: '#4fb3a5', quan: '#3a4a58', toc: '#3b2a1c', toc_dai: 1, cao: 0.95 },
    co_van:   { ten: 'Cô cố vấn', gt: 'nu', ts: -2, tc: -2,     ao: '#2a9d8f', quan: '#264653', toc: '#1f1a16', toc_dai: 1, kinh: 1, cao: 0.97 },
    can_bo:   { ten: 'Cán bộ', gt: 'nu', ts: -4, tc: -2,        ao: '#f5f5f5', quan: '#1d3557', toc: '#2b2118', cao: 1.02 },
    ban:      { ten: 'Bạn', gt: 'nam', ts: 8, tc: 2,           ao: '#ef476f', quan: '#2b2d42', toc: '#3b2a1c', cao: 1 },
    minh:     { ten: 'Minh', gt: 'nam', ts: 12, tc: 2,          ao: '#06b6d4', quan: '#23395b', toc: '#2b2118', cao: 1 },
    lan:      { ten: 'Lan', gt: 'nu', ts: 10, tc: 2,           ao: '#fb7185', quan: '#3f3d56', toc: '#2b2118', toc_dai: 1, cao: 0.95 },
    bo_lan:   { ten: 'Bố Lan', gt: 'nam', ts: -6, tc: -2,        ao: '#7f5539', quan: '#2f2f2f', toc: '#1f1a16', cao: 1.08 },
    bac_sau:  { ten: 'Bác Sáu', gt: 'nam', ts: -10, tc: -10,       ao: '#8d6e63', quan: '#37474f', toc: '#d0d0d0', cao: 1.02, kinh: 1 },
    anh_dung: { ten: 'Anh Dũng', gt: 'nam', ts: 2, tc: 0,      ao: '#43aa8b', quan: '#33415c', toc: '#1f1a16', cao: 1.05 },
    chi_mai:  { ten: 'Chị Mai', gt: 'nu', ts: 4, tc: 2,       ao: '#f9844a', quan: '#4d4d4d', toc: '#2b2118', toc_dai: 1, cao: 0.96 },
    chi_ha:   { ten: 'Chị Hà', gt: 'nu', ts: -2, tc: 0,        ao: '#577590', quan: '#2b2d42', toc: '#1f1a16', toc_dai: 1, cao: 0.97 },
    chi_thu:  { ten: 'Chị Thu', gt: 'nu', ts: 8, tc: 0,       ao: '#f4a6c0', quan: '#5c4d7d', toc: '#2b2118', toc_dai: 1, cao: 0.94 },
    bac_hh:   { ten: 'Bác', gt: 'nam', ts: -8, tc: -8,           ao: '#a47148', quan: '#3b3b3b', toc: '#bdbdbd', cao: 1.03 },
    nhom_la:  { ten: 'Nhóm lớp bên', gt: 'nam', ts: 14, tc: 6,  ao: '#e63946', quan: '#1d3557', toc: '#111111', cao: 1.04 },
    nguoi_la: { ten: 'Người lạ', gt: 'nam', ts: -8, tc: 0,      ao: '#4b5563', quan: '#1f2937', toc: '#1f1a16', mu: '#374151', kinh: 1, cao: 1.05 },
    chu_xuong:{ ten: 'Chủ cơ sở', gt: 'nam', ts: -12, tc: -4,     ao: '#264653', quan: '#1b263b', toc: '#2b2118', cao: 1.08, kinh: 1 },
    anh_quen: { ten: 'Anh quen', gt: 'nam', ts: 6, tc: 2,      ao: '#c77dff', quan: '#2b2d42', toc: '#2b2118', cao: 1.04 },
    chu_tiem: { ten: 'Chủ tiệm', gt: 'nu', ts: 0, tc: 2,      ao: '#e9c46a', quan: '#4a4e69', toc: '#3b2a1c', cao: 1.02 },
    ncc:      { ten: 'Nhà cung cấp', gt: 'nam', ts: 4, tc: 2,  ao: '#52b788', quan: '#2d3a3a', toc: '#2b2118', mu: '#1b4332', cao: 1.03 },
    doi_tac:  { ten: 'Đối tác', gt: 'nam', ts: -2, tc: -2,       ao: '#1d3557', quan: '#14213d', toc: '#c9a66b', cao: 1.1, kinh: 1 },
    nv_giao:  { ten: 'Bạn giao hàng', gt: 'nam', ts: 10, tc: 4, ao: '#38b000', quan: '#25421a', toc: '#2b2118', mu: '#1b4332', cao: 1 }
  }
};
