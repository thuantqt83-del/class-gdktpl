/* Lớp học thông minh · BẢN ĐỒ KHU VỰC của «Pháp luật quanh ta» (giai đoạn B, 23/11/2026). ✅ BẢN NHÁP — thầy/cô duyệt trước khi dùng.
   Mỗi khu vực gom các cảnh (id trong data/game/hanhtrinh_pl.js) theo nơi xảy ra tình huống; mỗi cảnh thuộc ĐÚNG MỘT khu vực (kiểm bằng _cong-cu/game/kiem_hanhtrinh.js).
   Gợi ý ban đầu của file thiết kế có 7 khu vực (trường học, gia đình, chợ và siêu thị, công ty, không gian mạng, toà án, cơ quan công quyền); thêm «Khu phố và nhà ở» vì 5 cảnh (hàng xóm, nhà trọ, môi trường sống, của rơi) không thuộc 7 khu vực kia.
   Khu vực chưa có cảnh sẽ hiện «sắp có», không bịa nội dung. Việc xếp cảnh vào khu vực là của em, chờ cô duyệt. Dữ liệu thuần. */
SC.data.game = SC.data.game || {};
SC.data.game.khu_vuc = [
 { "id": "truong", "ten": "Trường học", "e": "🏫", "mo": "Quyền học tập, an toàn thân thể và danh dự của học sinh.", "canh": ["p4", "q5"] },
 { "id": "gia_dinh", "ten": "Gia đình", "e": "🏠", "mo": "Quyền và nghĩa vụ của các thành viên, hôn nhân, chăm sóc sức khoẻ.", "canh": ["r3", "r4"] },
 { "id": "nguoi_tieu_dung", "ten": "Chợ, siêu thị và mua sắm", "e": "🛒", "mo": "Người tiêu dùng thông minh khi mua bán, kể cả mua trên mạng.", "canh": ["c1"] },
 { "id": "cong_ty", "ten": "Cơ sở kinh doanh và nơi làm việc", "e": "🏭", "mo": "Tuyển dụng, bình đẳng trong lao động và trách nhiệm của cơ sở kinh doanh.", "canh": ["q3", "r5"] },
 { "id": "mang", "ten": "Không gian mạng", "e": "📱", "mo": "Thông tin trên mạng: tin đồn, tin chưa kiểm chứng, quyền riêng tư.", "canh": ["p5"] },
 { "id": "toa_an", "ten": "Toà án và giải quyết tranh chấp", "e": "⚖️", "mo": "Đi đúng cơ quan để giải quyết tranh chấp, hiểu vai trò của Toà án.", "canh": ["p3", "t1"] },
 { "id": "cong_quyen", "ten": "Cơ quan công quyền và bầu cử", "e": "🏛️", "mo": "Quy ước của khu phố, danh sách cử tri, lá phiếu và những lời mời gọi sai trái.", "canh": ["p2", "q1", "r6", "r7"] },
 { "id": "khu_pho", "ten": "Khu phố và nhà ở", "e": "🏘️", "mo": "Hàng xóm, nhà trọ, môi trường sống và đồ nhặt được.", "canh": ["p1", "q2", "q4", "r1", "r2"] }
];
