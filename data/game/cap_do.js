/* CẤP ĐỘ của hai trò chơi tình huống (24/11/2026, chị yêu cầu: «để lại các tình huống đã có trong game chia làm cấp độ: Khởi nghiệp, Điều hành, Xử lý khủng hoảng, Doanh nghiệp bền vững; Pháp luật quanh ta cũng làm tương tự»).
   Tên 4 cấp độ của Phòng kinh doanh ảo lấy đúng «1.3. Các cấp độ chơi» trong bản thiết kế gốc (thiết kế trò chơi KTPL.docx). Chị ghi «5 cấp độ» nhưng chỉ nêu 4 tên, nên làm 4; muốn thêm cấp 5 chỉ cần thêm một dòng ở đây
   (và chia lại tháng/chương). NỘI DUNG TÌNH HUỐNG KHÔNG ĐỔI: chỉ xếp các tình huống đã có vào cấp độ.
   - 'kinh-doanh': mỗi cấp độ gồm các THÁNG liền nhau, thang = [từ, đến] tính từ 0 (tháng 1 = 0); cấp 1 có thêm «Tháng 0 · chia vốn» (z). Các tháng của cấp độ này phải nối đúng với cấp độ trước và phủ hết 8 tháng.
   - 'phap-luat': mỗi cấp độ ứng với MỘT chương của hành trình «Pháp luật quanh ta» theo đúng thứ tự (chương 3 Lớp 12 được tách làm hai: r1–r4 và r5–r7). Tên cấp độ trùng tên chương trong hanhtrinh_pl.js.
   mota = mô tả ngắn hiện ở thẻ cấp độ; muc_tieu = em học được gì. Danh sách tình huống trong thẻ lấy từ dữ liệu thật, không gõ tay. ✅ BẢN NHÁP — thầy/cô duyệt lời mô tả. Kiểm bằng _cong-cu/game/kiem_capdo.js. */
SC.data.game = SC.data.game || {};
SC.data.game.capdo = {
  'kinh-doanh': [
    { so: 1, ten: 'Khởi nghiệp', thang: [0, 0], z: true,
      mota: 'Chia vốn khởi nghiệp, lập kế hoạch kinh doanh và khai trương cơ sở rau sạch.',
      muc_tieu: 'Chia vốn hợp lí, lập kế hoạch có căn cứ, chọn giá bán và lượng nhập đầu tiên.' },
    { so: 2, ten: 'Điều hành', thang: [1, 2],
      mota: 'Giá nhập biến động, đối thủ khuyến mãi, khách phản ánh hàng héo: điều hành hàng hoá, doanh thu và chi phí mỗi tháng.',
      muc_tieu: 'Điều hành theo thị trường: cân đối giá bán với lượng nhập, đối phó với đối thủ, xử lí phản ánh của khách.' },
    { so: 3, ten: 'Xử lý khủng hoảng', thang: [3, 4],
      mota: 'Mùa cao điểm, lô rau không rõ nguồn gốc, nhãn «hữu cơ»: giữ uy tín và tuân thủ pháp luật khi áp lực lớn.',
      muc_tieu: 'Giữ uy tín và tuân thủ pháp luật khi gặp sự cố; không đánh đổi sự trung thực lấy lợi trước mắt.' },
    { so: 4, ten: 'Doanh nghiệp bền vững', thang: [5, 7],
      mota: 'Đăng kí và kê khai, trả đủ tiền công, vốn để mở rộng, kế hoạch thu chi: kinh doanh lâu dài, đúng pháp luật, có trách nhiệm.',
      muc_tieu: 'Kinh doanh bền vững: nghĩa vụ với người lao động và Nhà nước, mở rộng có tính toán, quản lí thu chi.' }
  ],
  'phap-luat': [
    { so: 1, ten: 'Luật chơi chung',
      mota: 'Những chuyện nhỏ ở khu phố và nhà trường: trách nhiệm khi gây thiệt hại, quy ước khu phố, giải quyết tranh chấp đúng cách, quyền học tập, tin đồn về «luật mới».',
      muc_tieu: 'Hiểu mỗi chuyện bé đều có luật của nó và biết giải quyết đúng cách.' },
    { so: 2, ten: 'Quyền đi cùng nghĩa vụ',
      mota: 'Lá phiếu, nhà trọ, bình đẳng trong tuyển dụng, mua bán trên mạng, kiến nghị đúng cách và bạo lực học đường.',
      muc_tieu: 'Biết quyền của mình luôn đi cùng nghĩa vụ với người khác và cách bảo vệ quyền đúng pháp luật.' },
    { so: 3, ten: 'Công dân trưởng thành',
      mota: 'Quyết định của người sắp thành niên: nhặt được của rơi, thuê nhà, tuổi kết hôn, bảo hiểm y tế.',
      muc_tieu: 'Tự chịu trách nhiệm với những quyết định của mình về tài sản, hợp đồng, hôn nhân và sức khoẻ.' },
    { so: 4, ten: 'Công dân có trách nhiệm',
      mota: 'Trách nhiệm với cộng đồng và đất nước: phản ánh ô nhiễm môi trường, sửa sai danh sách cử tri, từ chối phong bì mua phiếu bầu.',
      muc_tieu: 'Thực hiện quyền và nghĩa vụ công dân về môi trường và bầu cử.' }
  ]
};
