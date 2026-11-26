/* KHUNG chương trình — Phần 2 (15/11/2026). Tên bài, chủ đề, số trang lấy từ MỤC LỤC của 3 cuốn SGK đã nạp
   (đọc từ ảnh trang vì sách quét ảnh, không có lớp chữ). Bộ sách: Kết nối tri thức với cuộc sống (theo dấu mờ trên trang sách).
   trang_in = số trang IN trong sách; trang_pdf = trang trong file PDF (lệch: lớp 10 = +2, lớp 11 và 12 = +1).
   Trang cuối của bài tính bằng "trang đầu bài kế − 1" nên có thể dùng chung một trang với bài sau.
   trang_thai: "chua_soan" | "co_noi_dung" (em soạn, chờ duyệt) | "da_duyet" (giáo viên duyệt). */
(function () {
  var LECH = { 10: 2, 11: 1, 12: 1 };
  var SACH = 'SGK Giáo dục Kinh tế và Pháp luật {K} — Kết nối tri thức với cuộc sống';
  // [chủ đề số, tên chủ đề, bài số, tên bài, trang đầu]
  var KT = {
    10: [
      [1, 'Nền kinh tế và các chủ thể của nền kinh tế', 1, 'Các hoạt động kinh tế cơ bản trong đời sống xã hội', 6],
      [1, 'Nền kinh tế và các chủ thể của nền kinh tế', 2, 'Các chủ thể của nền kinh tế', 12],
      [2, 'Thị trường và cơ chế thị trường', 3, 'Thị trường', 18],
      [2, 'Thị trường và cơ chế thị trường', 4, 'Cơ chế thị trường', 23],
      [3, 'Ngân sách nhà nước và thuế', 5, 'Ngân sách nhà nước', 28],
      [3, 'Ngân sách nhà nước và thuế', 6, 'Thuế', 34],
      [4, 'Sản xuất kinh doanh và các mô hình sản xuất kinh doanh', 7, 'Sản xuất kinh doanh và các mô hình sản xuất kinh doanh', 43],
      [5, 'Tín dụng và cách sử dụng các dịch vụ tín dụng trong đời sống', 8, 'Tín dụng và vai trò của tín dụng trong đời sống', 53],
      [5, 'Tín dụng và cách sử dụng các dịch vụ tín dụng trong đời sống', 9, 'Dịch vụ tín dụng', 57],
      [6, 'Lập kế hoạch tài chính cá nhân', 10, 'Lập kế hoạch tài chính cá nhân', 67]
    ],
    11: [
      [1, 'Cạnh tranh, cung – cầu trong nền kinh tế thị trường', 1, 'Cạnh tranh trong nền kinh tế thị trường', 6],
      [1, 'Cạnh tranh, cung – cầu trong nền kinh tế thị trường', 2, 'Cung – cầu trong nền kinh tế thị trường', 11],
      [2, 'Lạm phát, thất nghiệp', 3, 'Lạm phát', 16],
      [2, 'Lạm phát, thất nghiệp', 4, 'Thất nghiệp', 22],
      [3, 'Thị trường lao động và việc làm', 5, 'Thị trường lao động và việc làm', 29],
      [4, 'Ý tưởng, cơ hội kinh doanh và các năng lực cần thiết của người kinh doanh', 6, 'Ý tưởng, cơ hội kinh doanh và các năng lực cần thiết của người kinh doanh', 36],
      [5, 'Đạo đức kinh doanh', 7, 'Đạo đức kinh doanh', 41],
      [6, 'Văn hoá tiêu dùng', 8, 'Văn hoá tiêu dùng', 45]
    ],
    12: [
      [1, 'Tăng trưởng và phát triển kinh tế', 1, 'Tăng trưởng và phát triển kinh tế', 6],
      [2, 'Hội nhập kinh tế quốc tế', 2, 'Hội nhập kinh tế quốc tế', 18],
      [3, 'Bảo hiểm và an sinh xã hội', 3, 'Bảo hiểm', 27],
      [3, 'Bảo hiểm và an sinh xã hội', 4, 'An sinh xã hội', 33],
      [4, 'Lập kế hoạch kinh doanh', 5, 'Lập kế hoạch kinh doanh', 39],
      [5, 'Trách nhiệm xã hội của doanh nghiệp', 6, 'Trách nhiệm xã hội của doanh nghiệp', 46],
      [6, 'Quản lí thu, chi trong gia đình', 7, 'Quản lí thu, chi trong gia đình', 52]
    ]
  };
  var PL = {
    10: [
      [7, 'Pháp luật nước Cộng hoà xã hội chủ nghĩa Việt Nam', 11, 'Khái niệm, đặc điểm và vai trò của pháp luật', 78],
      [7, 'Pháp luật nước Cộng hoà xã hội chủ nghĩa Việt Nam', 12, 'Hệ thống pháp luật và văn bản pháp luật Việt Nam', 84],
      [7, 'Pháp luật nước Cộng hoà xã hội chủ nghĩa Việt Nam', 13, 'Thực hiện pháp luật', 91],
      [8, 'Hiến pháp nước Cộng hoà xã hội chủ nghĩa Việt Nam', 14, 'Khái niệm, đặc điểm, vị trí của Hiến pháp nước Cộng hoà xã hội chủ nghĩa Việt Nam', 97],
      [8, 'Hiến pháp nước Cộng hoà xã hội chủ nghĩa Việt Nam', 15, 'Nội dung cơ bản của Hiến pháp về chế độ chính trị', 102],
      [8, 'Hiến pháp nước Cộng hoà xã hội chủ nghĩa Việt Nam', 16, 'Nội dung cơ bản của Hiến pháp về quyền con người, quyền và nghĩa vụ cơ bản của công dân', 109],
      [8, 'Hiến pháp nước Cộng hoà xã hội chủ nghĩa Việt Nam', 17, 'Nội dung cơ bản của Hiến pháp về kinh tế, văn hoá, xã hội, giáo dục, khoa học, công nghệ, môi trường', 114],
      [9, 'Hệ thống chính trị nước Cộng hoà xã hội chủ nghĩa Việt Nam', 18, 'Đặc điểm, cấu trúc và nguyên tắc hoạt động của hệ thống chính trị nước Cộng hoà xã hội chủ nghĩa Việt Nam', 120],
      [9, 'Hệ thống chính trị nước Cộng hoà xã hội chủ nghĩa Việt Nam', 19, 'Quốc hội, Chủ tịch nước và Chính phủ nước Cộng hoà xã hội chủ nghĩa Việt Nam', 130],
      [9, 'Hệ thống chính trị nước Cộng hoà xã hội chủ nghĩa Việt Nam', 20, 'Toà án nhân dân và Viện kiểm sát nhân dân', 137],
      [9, 'Hệ thống chính trị nước Cộng hoà xã hội chủ nghĩa Việt Nam', 21, 'Hội đồng nhân dân và Uỷ ban nhân dân', 144]
    ],
    11: [
      [7, 'Quyền bình đẳng của công dân trước pháp luật', 9, 'Quyền bình đẳng của công dân trước pháp luật', 54],
      [7, 'Quyền bình đẳng của công dân trước pháp luật', 10, 'Bình đẳng giới trong các lĩnh vực', 60],
      [7, 'Quyền bình đẳng của công dân trước pháp luật', 11, 'Quyền bình đẳng giữa các dân tộc', 68],
      [7, 'Quyền bình đẳng của công dân trước pháp luật', 12, 'Quyền bình đẳng giữa các tôn giáo', 75],
      [8, 'Một số quyền dân chủ cơ bản của công dân', 13, 'Quyền và nghĩa vụ của công dân trong tham gia quản lí nhà nước và xã hội', 81],
      [8, 'Một số quyền dân chủ cơ bản của công dân', 14, 'Quyền và nghĩa vụ của công dân về bầu cử và ứng cử', 86],
      [8, 'Một số quyền dân chủ cơ bản của công dân', 15, 'Quyền và nghĩa vụ của công dân về khiếu nại, tố cáo', 94],
      [8, 'Một số quyền dân chủ cơ bản của công dân', 16, 'Quyền và nghĩa vụ của công dân về bảo vệ Tổ quốc', 102],
      [9, 'Một số quyền tự do cơ bản của công dân', 17, 'Quyền bất khả xâm phạm về thân thể và quyền được pháp luật bảo hộ về tính mạng, sức khoẻ, danh dự, nhân phẩm của công dân', 108],
      [9, 'Một số quyền tự do cơ bản của công dân', 18, 'Quyền bất khả xâm phạm về chỗ ở của công dân', 117],
      [9, 'Một số quyền tự do cơ bản của công dân', 19, 'Quyền được bảo đảm an toàn và bí mật thư tín, điện thoại, điện tín của công dân', 122],
      [9, 'Một số quyền tự do cơ bản của công dân', 20, 'Quyền và nghĩa vụ của công dân về tự do ngôn luận, báo chí và tiếp cận thông tin', 128],
      [9, 'Một số quyền tự do cơ bản của công dân', 21, 'Quyền và nghĩa vụ của công dân về tự do tín ngưỡng và tôn giáo', 136]
    ],
    12: [
      [7, 'Một số quyền và nghĩa vụ của công dân về kinh tế', 8, 'Quyền và nghĩa vụ của công dân về kinh doanh và nộp thuế', 59],
      [7, 'Một số quyền và nghĩa vụ của công dân về kinh tế', 9, 'Quyền và nghĩa vụ của công dân về sở hữu tài sản và nghĩa vụ tôn trọng tài sản của người khác', 67],
      [8, 'Một số quyền và nghĩa vụ của công dân về văn hoá, xã hội', 10, 'Quyền và nghĩa vụ của công dân trong hôn nhân và gia đình', 74],
      [8, 'Một số quyền và nghĩa vụ của công dân về văn hoá, xã hội', 11, 'Quyền và nghĩa vụ của công dân trong học tập', 84],
      [8, 'Một số quyền và nghĩa vụ của công dân về văn hoá, xã hội', 12, 'Quyền và nghĩa vụ của công dân trong bảo vệ, chăm sóc sức khoẻ và bảo đảm an sinh xã hội', 90],
      [8, 'Một số quyền và nghĩa vụ của công dân về văn hoá, xã hội', 13, 'Quyền và nghĩa vụ của công dân trong bảo vệ di sản văn hoá, môi trường và tài nguyên thiên nhiên', 97],
      [9, 'Một số vấn đề cơ bản của luật quốc tế', 14, 'Một số vấn đề chung về pháp luật quốc tế', 103],
      [9, 'Một số vấn đề cơ bản của luật quốc tế', 15, 'Công pháp quốc tế về dân cư, lãnh thổ và chủ quyền quốc gia', 111],
      [9, 'Một số vấn đề cơ bản của luật quốc tế', 16, 'Nguyên tắc cơ bản của Tổ chức Thương mại Thế giới và hợp đồng thương mại quốc tế', 125]
    ]
  };
  // trang đầu Phần hai và trang đầu "Một số thuật ngữ" (để tính trang cuối của bài cuối mỗi phần)
  var BIEN = { 10: { pl: 77, het: 152 }, 11: { pl: 53, het: 143 }, 12: { pl: 58, het: 137 } };

  function dung(khoi, phan, list) {
    var out = [];
    list.forEach(function (r, i) {
      var cuoi = i + 1 < list.length ? list[i + 1][4] - 1 : (phan === 'kinh-te' ? BIEN[khoi].pl - 1 : BIEN[khoi].het - 1);
      out.push({
        id: khoi + '-b' + (r[2] < 10 ? '0' : '') + r[2], so: r[2], chu_de: 'Chủ đề ' + r[0] + ': ' + r[1], ten: r[3],
        trang_in: r[4] + '–' + cuoi, trang_pdf: (r[4] + LECH[khoi]) + '–' + (cuoi + LECH[khoi]),
        trang_thai: 'chua_soan'
      });
    });
    return out;
  }

  var muc = [];
  [10, 11, 12].forEach(function (k) {
    muc.push({ khoi: k, phan: 'kinh-te', sach: SACH.replace('{K}', k), bai: dung(k, 'kinh-te', KT[k]) });
    muc.push({ khoi: k, phan: 'phap-luat', sach: SACH.replace('{K}', k), bai: dung(k, 'phap-luat', PL[k]) });
  });

  SC.data.curriculum = {
    khoi: [10, 11, 12],
    phan: [{ id: 'kinh-te', ten: 'Kinh tế' }, { id: 'phap-luat', ten: 'Pháp luật' }],
    muc: muc
  };
  SC.data.bai = SC.data.bai || {};   // nội dung từng bài: SC.data.bai['10-b01'] = {...} (file data/lopXX/...)
})();

/* Lộ trình ôn tập 8 tuần theo đề xuất (mục 4). Chỉ là khung; nhiệm vụ cụ thể điền ở Phần 3. */
SC.data.lotrinh = {
  hk1: [
    { tuan: '1–2', nd: 'Ôn tập kiến thức nền tảng lớp 10' },
    { tuan: '3–4', nd: 'Ôn tập kiến thức trọng tâm lớp 11' },
    { tuan: '5–6', nd: 'Hệ thống kiến thức lớp 12' },
    { tuan: '7',   nd: 'Ôn tập tổng hợp, kết nối kiến thức ba khối' },
    { tuan: '8',   nd: 'Kiểm tra đánh giá, phân tích kết quả và điều chỉnh kế hoạch' }
  ],
  hk2: [
    { tuan: '1', nd: 'Củng cố chủ đề trọng tâm lớp 10' },
    { tuan: '2', nd: 'Củng cố chủ đề trọng tâm lớp 11' },
    { tuan: '3', nd: 'Củng cố chủ đề trọng tâm lớp 12' },
    { tuan: '4', nd: 'Luyện câu hỏi cơ bản' },
    { tuan: '5', nd: 'Luyện câu hỏi nâng cao' },
    { tuan: '6', nd: 'Luyện tình huống kinh tế và pháp luật' },
    { tuan: '7', nd: 'Luyện đề tốt nghiệp tổng hợp' },
    { tuan: '8', nd: 'Đánh giá, rà soát lỗ hổng kiến thức và lập kế hoạch tiếp theo' }
  ],
  cuoi_nam: [
    { ten: 'Lộ trình thi tốt nghiệp', nd: 'Ôn theo chủ đề, dạng câu hỏi, đề tổng hợp, thi thử và mục tiêu điểm số.' },
    { ten: 'Lộ trình học sinh giỏi', nd: 'Kiến thức kinh tế nâng cao, pháp luật chuyên sâu, tình huống phức hợp, liên hệ thực tiễn, rèn lập luận và đánh giá.' }
  ]
};

/* Bảng tiến độ 8 phần (cập nhật mỗi khi xong một phần) */
SC.data.tiendo = [
  { p: 1, ten: 'Khung app, luyện tập 3 dạng câu, hồ sơ học tập, lộ trình (khung)', tt: 'xong', can: '—' },
  { p: 2, ten: 'Phân hệ 1 — Kho kiến thức: nội dung từng bài (bài giảng, sơ đồ, tình huống, câu hỏi ôn tập). Đã xong 58/58 bài (lớp 10 Bài 1–21, lớp 11 Bài 1–21, lớp 12 Bài 1–16). Thêm 6 đề thi thử lớp 11 (trang Đề thi thử)', tt: 'xong', can: 'Sếp duyệt 58 bài và câu em soạn mới (xem CAN-DUYET.md)' },
  { p: 3, ten: 'Luyện đề, thi thử tốt nghiệp và HSG, điền lộ trình 8 tuần', tt: 'cho', can: 'Phần 2 đủ câu; văn bản ma trận thi hiện hành' },
  { p: 4, ten: 'Giáo viên: bảng điều khiển, ngân hàng câu hỏi (Excel), giao bài, báo cáo', tt: 'cho', can: 'Phần 2–3' },
  { p: 5, ten: 'Tài khoản, phân quyền, Supabase + RLS, chấm điểm phía máy chủ', tt: 'cho', can: 'Sếp quyết định hạ tầng và kinh phí' },
  { p: 6, ten: 'Trợ giảng AI có kiểm soát (Phân hệ 3). Đã xong bản chạy trên máy, CHƯA nối AI thật: hỏi đáp từ kho, gợi ý 3 cấp khi làm bài, phân tích lỗi sai, bài luyện cá nhân. Còn: AI thật qua máy chủ, trợ giúp giáo viên, hỏi đáp pháp luật nguồn chính thống', tt: 'dang', can: 'Phần 5 (khóa API đặt ở máy chủ) cho AI thật; sếp duyệt bản trên máy' },
  { p: 7, ten: 'Lớp học thông minh: gọn lại còn 2 trò chơi (21/11/2026) — Phòng kinh doanh ảo (điều hành 8 tháng, có tab «Thực hành nhanh» 3 mô phỏng) và Pháp luật quanh ta (3 chương, lớp 10–11–12); cả hai có bẫy, gợi ý 3 bậc, 3D, nhạc và giọng đọc. Còn: thu đủ giọng đọc, thêm tình huống, giáo viên tự soạn tình huống', tt: 'dang', can: 'Sếp duyệt nội dung hai trò chơi, số liệu giả định của Phòng kinh doanh ảo, và nghe thử giọng đọc' },
  { p: 8, ten: 'Kiểm thử, rà bảo mật, chạy thử với lớp, triển khai', tt: 'cho', can: 'Các phần trước' }
];
