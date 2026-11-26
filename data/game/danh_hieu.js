/* Lớp học thông minh · DANH HIỆU của hai trò chơi (giai đoạn A, phần a — 23/11/2026). ✅ BẢN NHÁP — thầy/cô duyệt trước khi dùng.
   Danh hiệu TÍNH TỪ DỮ LIỆU ĐÃ LƯU TRÊN MÁY của từng trò: lan = số lần hoàn thành; tot = kết quả tốt nhất (%); ket = số kết cục đã mở.
   Mỗi bậc cần ĐỦ các điều kiện trong dk và các bậc xét theo thứ tự (không nhảy bậc). Không xếp hạng giữa học sinh, không tiền thưởng, không ghi vào điểm hồ sơ.
   Tên danh hiệu: ba tên của «Pháp luật quanh ta» lấy từ file thiết kế trò chơi của cô; ba tên của «Phòng kinh doanh ảo» do em ĐỀ XUẤT (chờ cô duyệt).
   Muốn đổi tên hay điều kiện: sửa tại đây, không cần sửa mã. Dữ liệu thuần, không có lệnh. */
SC.data.game = SC.data.game || {};
SC.data.game.danh_hieu = {
 "hinh": [
  { "id": "cao", "e": "🦊", "ten": "Cáo" },
  { "id": "gau_truc", "e": "🐼", "ten": "Gấu trúc" },
  { "id": "ho", "e": "🐯", "ten": "Hổ" },
  { "id": "cu", "e": "🦉", "ten": "Cú mèo" },
  { "id": "ca_heo", "e": "🐬", "ten": "Cá heo" },
  { "id": "rua", "e": "🐢", "ten": "Rùa" },
  { "id": "ky_lan", "e": "🦄", "ten": "Kỳ lân" },
  { "id": "sao", "e": "🌟", "ten": "Ngôi sao" }
 ],
 "tro": {
  "phong-kinh-doanh-ao": {
   "ten": "Phòng kinh doanh ảo",
   "bac": [
    { "ten": "Chủ cửa hàng tập sự", "nd": "Em đã điều hành trọn một năm kinh doanh.", "dk": { "lan": 1 } },
    { "ten": "Nhà quản lý vững vàng", "nd": "Điểm tổng hợp của em từ 65% trở lên: vừa có lãi vừa giữ được uy tín và tuân thủ.", "dk": { "lan": 1, "tot": 65 } },
    { "ten": "Doanh nhân có trách nhiệm", "nd": "Điểm tổng hợp từ 85% trở lên và em đã thử nhiều cách điều hành khác nhau.", "dk": { "lan": 1, "tot": 85, "ket": 3 } }
   ]
  },
  "phap-luat-quanh-ta": {
   "ten": "Pháp luật quanh ta",
   "bac": [
    { "ten": "Công dân hiểu biết", "nd": "Em đã đi hết một hành trình Pháp luật quanh ta.", "dk": { "lan": 1 } },
    { "ten": "Người bảo vệ quyền lợi", "nd": "Các quyết định của em đạt từ 65% trở lên.", "dk": { "lan": 1, "tot": 65 } },
    { "ten": "Chuyên gia pháp luật trẻ", "nd": "Các quyết định đạt từ 85% trở lên và em đã thử nhiều cách xử lí khác nhau.", "dk": { "lan": 1, "tot": 85, "ket": 3 } }
   ]
  }
 }
};
