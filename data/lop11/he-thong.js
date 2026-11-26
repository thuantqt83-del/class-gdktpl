/* HỆ THỐNG KIẾN THỨC lớp 11 (dạng ô đánh số + GHI NHỚ, trình bày theo ảnh mẫu sếp gửi).
   Bài 1, 2, 4, 5 dùng luôn ảnh có sẵn (kho.js › HT_ANH). Các bài còn lại: mỗi ô lấy NGUYÊN các ý trong bài giảng của bài (các file bai-NN.js của lớp 11) theo chỉ số
   [mục nội dung, ý] — '*' là cả mục; câu dài được tách thành gạch đầu dòng ở dấu «;». Không thêm ý ngoài bài giảng; dòng GHI NHỚ chỉ nhắc cách xác định khi làm bài theo các ô.
   ✅ BẢN NHÁP — thầy/cô duyệt trước khi dùng */
SC.data.ht = SC.data.ht || {};
// o: [tiêu đề ô, biểu tượng, [[chỉ số mục nội dung, chỉ số ý | '*'], …]]
SC.data.ht['11-b03'] = { o: [
  ['KHÁI NIỆM VÀ ĐO LẠM PHÁT', '📈', [[0, '*']]],
  ['CÁC LOẠI HÌNH LẠM PHÁT', '📊', [[1, '*']]],
  ['NGUYÊN NHÂN', '🛢️', [[2, '*']]],
  ['HẬU QUẢ VÀ VAI TRÒ CỦA NHÀ NƯỚC', '🏛️', [[3, '*']]]
], nho: 'Gặp bài lạm phát, hãy xác định: giá chung tăng liên tục (đo bằng CPI) → thuộc loại nào theo tỉ lệ % → do nguyên nhân nào (chi phí, cầu, tiền) → hậu quả và biện pháp của Nhà nước.' };

SC.data.ht['11-b06'] = { o: [
  ['Ý TƯỞNG KINH DOANH', '💡', [[0, '*']]],
  ['CƠ HỘI KINH DOANH', '🚪', [[1, '*']]],
  ['NĂNG LỰC LÃNH ĐẠO – QUẢN LÍ', '👔', [[2, 0], [2, 1]]],
  ['NĂNG LỰC CHUYÊN MÔN – HỌC TẬP', '📚', [[2, 2], [2, 3]]]
], nho: 'Ý tưởng chỉ trở thành cơ hội khi bền vững, hấp dẫn và đúng thời điểm. Người kinh doanh cần bốn năng lực: lãnh đạo – quản lí – chuyên môn – học tập.' };

SC.data.ht['11-b07'] = { o: [
  ['SÁU QUY TẮC ĐẠO ĐỨC DOANH NHÂN', '📜', [[0, '*']]],
  ['KHÁI NIỆM ĐẠO ĐỨC KINH DOANH', '⚖️', [[1, 0]]],
  ['BIỂU HIỆN', '🤝', [[1, 1]]],
  ['VAI TRÒ', '🏆', [[2, '*']]]
], nho: 'Khi làm bài, hãy xác định: chủ thể – hành vi – hành vi đó thuộc quy tắc nào trong sáu quy tắc và biểu hiện nào của đạo đức kinh doanh.' };

SC.data.ht['11-b08'] = { o: [
  ['VAI TRÒ CỦA TIÊU DÙNG', '🛒', [[0, '*']]],
  ['VĂN HOÁ TIÊU DÙNG', '🎎', [[1, 0]]],
  ['VAI TRÒ CỦA VĂN HOÁ TIÊU DÙNG', '⭐', [[1, 1]]],
  ['ĐẶC ĐIỂM VÀ BIỆN PHÁP', '🌱', [[2, '*']]]
], nho: 'Tiêu dùng là động lực của sản xuất. Văn hoá tiêu dùng đẹp là kế thừa nét đẹp truyền thống, ưu tiên hàng chất lượng, hàng Việt và tiêu dùng có trách nhiệm.' };

SC.data.ht['11-b09'] = { o: [
  ['BÌNH ĐẲNG VỀ QUYỀN VÀ NGHĨA VỤ', '⚖️', [[0, '*']]],
  ['BÌNH ĐẲNG VỀ TRÁCH NHIỆM PHÁP LÍ', '🏛️', [[1, '*']]],
  ['Ý NGHĨA', '🌟', [[2, '*']]]
], nho: 'Bình đẳng không có nghĩa là giống nhau: mọi công dân đều hưởng quyền, thực hiện nghĩa vụ và chịu trách nhiệm pháp lí như nhau khi đủ điều kiện hoặc khi vi phạm.' };

SC.data.ht['11-b10'] = { o: [
  ['KHÁI NIỆM BÌNH ĐẲNG GIỚI', '👫', [[1, 0]]],
  ['CHÍNH TRỊ – KINH TẾ – LAO ĐỘNG', '🏢', [[0, 0], [0, 1], [0, 2]]],
  ['GIÁO DỤC – GIA ĐÌNH', '🏠', [[0, 3], [0, 4]]],
  ['Ý NGHĨA VÀ BIỆN PHÁP', '🌈', [[1, 1]]]
], nho: 'Bình đẳng giới: nam – nữ cùng có vị trí, vai trò ngang nhau và cơ hội phát huy năng lực ở năm lĩnh vực (chính trị, kinh tế, lao động, giáo dục – đào tạo, gia đình). Biện pháp ưu tiên cho nữ không bị coi là phân biệt đối xử về giới.' };

SC.data.ht['11-b11'] = { o: [
  ['CHÍNH TRỊ', '🗳️', [[0, 0]]],
  ['KINH TẾ', '💰', [[0, 1]]],
  ['VĂN HOÁ – GIÁO DỤC', '🎓', [[0, 2]]],
  ['Ý NGHĨA', '🤝', [[1, '*']]]
], nho: 'Bình đẳng giữa các dân tộc thể hiện ở chính trị, kinh tế, văn hoá – giáo dục; là cơ sở của đoàn kết các dân tộc và đại đoàn kết toàn dân.' };

SC.data.ht['11-b12'] = { o: [
  ['BÌNH ĐẲNG VỀ QUYỀN', '🕊️', [[0, 0]]],
  ['BÌNH ĐẲNG VỀ NGHĨA VỤ', '📘', [[0, 1]]],
  ['BÌNH ĐẲNG VỀ TRÁCH NHIỆM PHÁP LÍ', '⚖️', [[0, 2]]],
  ['Ý NGHĨA', '🌸', [[1, '*']]]
], nho: 'Bình đẳng giữa các tôn giáo gồm ba mặt: quyền, nghĩa vụ, trách nhiệm pháp lí. Mọi người có quyền theo hoặc không theo một tôn giáo; mọi hành vi lợi dụng tôn giáo vi phạm pháp luật đều bị xử lí.' };

SC.data.ht['11-b13'] = { o: [
  ['QUYỀN', '🗳️', [[0, '*']]],
  ['NGHĨA VỤ', '📘', [[1, '*']]],
  ['HẬU QUẢ CỦA HÀNH VI VI PHẠM', '⚠️', [[2, '*']]]
], nho: 'Khi làm bài, hãy xác định: công dân đang thực hiện quyền hay nghĩa vụ nào → căn cứ (Hiến pháp Điều 28, Điều 46…) → hành vi vi phạm gây hậu quả gì và bị xử lí thế nào.' };

SC.data.ht['11-b14'] = { o: [
  ['QUYỀN BẦU CỬ VÀ ỨNG CỬ', '🗳️', [[0, '*']]],
  ['NGHĨA VỤ', '📘', [[1, '*']]],
  ['HẬU QUẢ CỦA HÀNH VI VI PHẠM', '⚠️', [[2, '*']]]
], nho: 'Nhớ mốc: đủ 18 tuổi có quyền bầu cử, đủ 21 tuổi có quyền ứng cử; khiếu nại sai sót danh sách cử tri trong 30 ngày kể từ ngày niêm yết; cử tri phải tự mình đi bầu.' };

SC.data.ht['11-b15'] = { o: [
  ['KHIẾU NẠI', '📝', [[0, 0]]],
  ['TỐ CÁO', '📢', [[0, 1]]],
  ['NGHĨA VỤ', '📘', [[1, '*']]],
  ['HẬU QUẢ CỦA HÀNH VI VI PHẠM', '⚠️', [[2, '*']]]
], nho: 'Phân biệt: khiếu nại là đề nghị xem xét lại quyết định, hành vi khi cho rằng xâm phạm quyền, lợi ích hợp pháp của mình; tố cáo là báo cho cơ quan có thẩm quyền biết hành vi vi phạm pháp luật gây thiệt hại hoặc đe doạ gây thiệt hại.' };

SC.data.ht['11-b16'] = { o: [
  ['QUYỀN', '🛡️', [[0, '*']]],
  ['NGHĨA VỤ', '📘', [[1, '*']]],
  ['HẬU QUẢ CỦA HÀNH VI VI PHẠM', '⚠️', [[2, '*']]]
], nho: 'Bảo vệ Tổ quốc vừa là nghĩa vụ thiêng liêng vừa là quyền cao quý của công dân; phản bội Tổ quốc là tội nặng nhất.' };

SC.data.ht['11-b17'] = { o: [
  ['QUYỀN BẤT KHẢ XÂM PHẠM VỀ THÂN THỂ', '🧍', [[0, 0], [0, 1]]],
  ['QUYỀN ĐƯỢC BẢO HỘ VỀ TÍNH MẠNG, SỨC KHOẺ, DANH DỰ, NHÂN PHẨM', '❤️', [[1, 0]]],
  ['HẬU QUẢ CỦA HÀNH VI VI PHẠM', '⚠️', [[0, 2], [1, 1]]],
  ['TRÁCH NHIỆM CỦA HỌC SINH', '🎒', [[2, '*']]]
], nho: 'Không ai bị bắt nếu không có quyết định của Toà án hoặc phê chuẩn của Viện kiểm sát (trừ trường hợp phạm tội quả tang); nghiêm cấm tra tấn, bức cung, nhục hình.' };

SC.data.ht['11-b18'] = { o: [
  ['QUY ĐỊNH CƠ BẢN', '🏠', [[0, '*']]],
  ['HẬU QUẢ CỦA HÀNH VI VI PHẠM', '⚠️', [[1, '*']]],
  ['TRÁCH NHIỆM CỦA HỌC SINH', '🎒', [[2, '*']]]
], nho: 'Không ai được tự ý vào chỗ ở của người khác nếu không được người đó đồng ý; việc khám xét chỗ ở chỉ được làm khi có căn cứ và theo đúng thủ tục luật định.' };

SC.data.ht['11-b19'] = { o: [
  ['QUY ĐỊNH CƠ BẢN', '✉️', [[0, '*']]],
  ['HẬU QUẢ CỦA HÀNH VI VI PHẠM', '⚠️', [[1, '*']]],
  ['TRÁCH NHIỆM CỦA HỌC SINH', '🎒', [[2, '*']]]
], nho: 'Thư tín, điện thoại, điện tín được bảo đảm an toàn và bí mật; việc kiểm soát chỉ thực hiện khi luật quy định, có quyết định của cơ quan có thẩm quyền và theo đúng trình tự, thủ tục.' };

SC.data.ht['11-b20'] = { o: [
  ['QUYỀN', '🗣️', [[0, '*']]],
  ['NGHĨA VỤ VÀ ĐIỀU BỊ CẤM', '📘', [[1, '*']]],
  ['HẬU QUẢ CỦA HÀNH VI VI PHẠM', '⚠️', [[2, 0]]],
  ['TRÁCH NHIỆM CỦA HỌC SINH', '🎒', [[2, 1]]]
], nho: 'Tự do ngôn luận đi đôi với trách nhiệm: thông tin trung thực, không vu khống, không lợi dụng quyền để xâm phạm an ninh quốc gia, trật tự xã hội; kiểm tra thông tin trước khi chia sẻ.' };

SC.data.ht['11-b21'] = { o: [
  ['QUYỀN', '🕊️', [[0, '*']]],
  ['NGHĨA VỤ', '📘', [[1, '*']]],
  ['HẬU QUẢ CỦA HÀNH VI VI PHẠM', '⚠️', [[2, 0]]],
  ['TRÁCH NHIỆM CỦA HỌC SINH', '🎒', [[2, 1]]]
], nho: 'Mọi người có quyền theo hoặc không theo một tôn giáo; tôn trọng quyền của người khác, không cản trở, không lợi dụng tín ngưỡng, tôn giáo để vi phạm pháp luật.' };
