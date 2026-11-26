/* Lớp học thông minh · PHÒNG KINH DOANH ẢO — trò chơi điều hành doanh nghiệp ảo «Rau sạch Nhà em» 8 tháng (lophoc_kdao.js).
   Mỗi tháng: (1) bản tin thị trường + lời dẫn dụ (bẫy) → em chọn GIÁ BÁN và LƯỢNG NHẬP → xem lãi lỗ (mô hình cầu – cung ở mo_hinh); (2) một tình huống cuối tháng (cảnh tái dùng từ «Ông chủ trẻ») có 3 phương án với tác động tiền / uy tín / tuân thủ.
   Gợi ý 3 bậc (Quan sát – Nguyên tắc – Cách nghĩ) không nêu đáp án; Trợ giảng phân tích lỗi sai và rủi ro (soạn sẵn, chưa phải AI thật). Đơn vị tiền: NGHÌN ĐỒNG. MỌI SỐ LIỆU LÀ SỐ GIẢ ĐỊNH để học cách suy nghĩ; không dùng mức thuế, lãi suất hay mức phạt thật. */
SC.data.game = SC.data.game || {};
SC.data.game.kdao = {
 "id": "phong-kinh-doanh-ao",
 "ten": "Phòng kinh doanh ảo",
 "mau": "#159a8c",
 "cap_nhat": "23/11/2026",
 "duyet": "chưa",
 "icon": "bulb",
 "khau_hieu": "Điều hành «Rau sạch Nhà em» một năm: mỗi tháng một thị trường, một lời dụ, một quyết định",
 "gioi_thieu": "Em là chủ một cơ sở bán rau sạch giao tận nhà với 60 triệu đồng vốn (số giả định). Mỗi tháng em đọc bản tin thị trường, chọn giá bán và lượng nhập hàng, xem lãi lỗ thật, rồi xử lí một tình huống kinh doanh có người nói rất thuyết phục để kéo em vào bẫy. Một năm sau, doanh nghiệp của em ra sao?",
 "mo_hinh": {
  "D0": 900,
  "C0": 18,
  "F": 9000,
  "GIA": [
   28,
   35,
   44
  ],
  "NHAP": [
   600,
   900,
   1300
  ],
  "f": {
   "28": 1.45,
   "35": 1,
   "44": 0.6
  },
  "TIEN_DAU": 60000,
  "TIN_DAU": 50,
  "CT_DAU": 50,
  "MUC_TIEU": 50000
 },
 "gia_ten": [
  "Thấp",
  "Vừa",
  "Cao"
 ],
 "nhap_ten": [
  "Ít",
  "Vừa",
  "Nhiều"
 ],
 "chi_so": [
  {
   "id": "tien",
   "ten": "Tiền mặt"
  },
  {
   "id": "tin",
   "ten": "Uy tín"
  },
  {
   "id": "ct",
   "ten": "Tuân thủ và trách nhiệm"
  }
 ],
 "thang0": {
  "tieu_de": "Chia vốn khởi nghiệp",
  "nd": "Trước ngày khai trương, em có 60 triệu đồng (số giả định) để thuê mặt bằng nhỏ trong chung cư, nhập lô hàng đầu, mua tủ mát và dụng cụ, chạy quảng cáo và giữ một khoản dự phòng. Cô cố vấn ở trung tâm hỗ trợ khởi nghiệp hỏi: «Em định chia vốn thế nào, và vì sao chia như vậy?»",
  "loi_dan": {
   "ai": "Bạn học",
   "nd": "Dồn hết vào hàng với quảng cáo cho khai trương hoành tráng, dự phòng làm gì cho phí vốn! Hàng bán hết là có tiền ngay."
  },
  "bay": {
   "loai": "loi_truoc_mat",
   "mo": "Hình dung khai trương thật rôm rả khiến em quên rằng tháng đầu chưa chắc bán hết hàng và vẫn có khoản phát sinh."
  },
  "goi_y": [
   "Nếu tháng đầu khách ít hơn dự tính hoặc có khoản phát sinh bất ngờ, em lấy tiền ở đâu để xoay xở mà không phải vay vội?",
   "Ôn Lớp 12 Bài 5 (bước đánh giá cơ hội, rủi ro và biện pháp xử lí) và Lớp 10 Bài 10: kế hoạch tài chính nói gì về cân đối thu – chi và các khoản chi phát sinh?",
   "«Bán hết là có tiền ngay» chỉ đúng khi bán hết thật. Hãy hỏi: khoản chi nào thật sự cần để bán được hàng, khoản nào chỉ để cho đẹp mắt?"
  ],
  "bai": [
   "12-b05",
   "10-b10"
  ],
  "sb": {
   "bo": "van_phong",
   "nv": [
    "em",
    "ban|Bạn học",
    "co_van"
   ],
   "noi": "ban",
   "tuy": [
    "giay",
    "tien"
   ]
  },
  "chon": [
   {
    "nhan": "Chia cân đối: mặt bằng 15 triệu, hàng đợt đầu 20, tủ mát và dụng cụ 10, quảng cáo 4, giữ lại 11 triệu làm quỹ dự phòng và ghi lí do từng khoản.",
    "tot": 2,
    "d": {
     "tien": -500,
     "tin": 4,
     "ct": 6
    },
    "bl": "Kế hoạch kinh doanh cần cân đối thu – chi và đánh giá rủi ro cùng biện pháp xử lí, trong đó có lập nguồn dự trữ để xoay xở khi phát sinh (Lớp 12 Bài 5); kế hoạch tài chính giúp tránh thâm hụt, nợ nần (Lớp 10 Bài 10).",
    "cd": [
     "quy_du_phong"
    ]
   },
   {
    "nhan": "Dồn vốn cho hàng 30 triệu và quảng cáo 12 để khai trương rôm rả; mặt bằng, thiết bị gộp 15, chỉ để dự phòng 3 triệu vì tin tháng đầu bán chạy.",
    "tot": 1,
    "d": {
     "tien": -1500,
     "tin": 2,
     "ct": -2
    },
    "bl": "Phần chiến lược, tài chính của kế hoạch không chỉ tính doanh thu kì vọng mà còn phải tính điểm hoà vốn và rủi ro; nguồn dự trữ quá mỏng thì chỉ cần bán chậm là phải xoay xở gấp (Lớp 12 Bài 5).",
    "loi_sai": "Dồn gần hết vốn cho hàng và quảng cáo, quỹ dự phòng quá mỏng.",
    "rui_ro": "Tháng đầu bán chậm hoặc phát sinh chi phí là thiếu tiền xoay xở, phải vay vội.",
    "cd": [
     "het_quy"
    ]
   },
   {
    "nhan": "Thuê mặt bằng mặt đường 22 triệu, mua tủ mát và dụng cụ loại sang 20, hàng 12, quảng cáo 3, dự phòng 3 triệu cho chuyên nghiệp ngay từ đầu.",
    "tot": 0,
    "d": {
     "tien": -3000,
     "tin": -2,
     "ct": -4
    },
    "bl": "Kế hoạch kinh doanh phải xuất phát từ điều kiện thực tế của cơ sở: chi phí cố định không vượt khả năng, đủ vốn để vận hành và có biện pháp xử lí rủi ro (Lớp 12 Bài 5; Lớp 10 Bài 10).",
    "loi_sai": "Chi quá nhiều cho mặt bằng và thiết bị, bỏ quên vốn lưu động.",
    "rui_ro": "Thiếu tiền nhập hàng và chạy quảng cáo, chi phí cố định cao đè lên lãi từng tháng.",
    "cd": [
     "het_quy"
    ]
   }
  ]
 },
 "thang": [
  {
   "ten": "Khai trương",
   "tin_tuc": "Tuần đầu mở cửa, nhiều cư dân trong chung cư tò mò đặt thử túi rau sạch. Rau tươi chỉ giữ được trong ngày, nên hàng nhập thừa sẽ phải bỏ đi.",
   "k": 1.15,
   "cf": 1,
   "gia": null,
   "dan": {
    "vai": "quan",
    "ai": "Quân",
    "nd": "Khai trương phải thật hoành tráng! Nhập thật nhiều cho đầy kho, bán rẻ cho khách đông, chịu lỗ tháng đầu rồi tính sau!"
   },
   "bay": {
    "loai": "loi_truoc_mat",
    "mo": "Nghe «nhập đầy kho, bán rẻ cho đông» rất hấp dẫn, nhưng che đi chi phí thật và việc rau tươi không để qua ngày được."
   },
   "goi_y": [
    "Bản tin cho biết điều gì về lượng khách? Rau nhập về mà không bán hết trong tháng thì chuyện gì xảy ra với số tiền đã bỏ ra?",
    "Ôn Lớp 10 Bài 4 (giá cả thị trường) và Lớp 11 Bài 2: khi giá tăng hay giảm thì người mua nhiều lên hay ít đi, và khi hàng nhiều hơn người mua thì sao?",
    "Hãy tự tính lãi trên mỗi túi ở từng mức giá, rồi hỏi: bán thật nhiều túi lãi mỏng hay ít túi lãi dày, cách nào còn lại nhiều tiền hơn sau khi trừ hàng ế?"
   ],
   "bai": [
    "10-b04",
    "11-b02"
   ],
   "sb": {
    "bo": "cua_hang",
    "nv": [
     "em",
     "khach",
     "quan"
    ],
    "noi": "quan",
    "tuy": [
     "tien"
    ]
   },
   "tinh_huong": {
    "tieu_de": "Bản kế hoạch kinh doanh",
    "nd": "Cuối tháng đầu, em muốn đăng kí kinh doanh chính thức và có kế hoạch rõ ràng cho cả năm. Cô cố vấn ở trung tâm hỗ trợ khởi nghiệp mỉm cười: «Cho cô xem kế hoạch kinh doanh của em nhé».",
    "loi_dan": {
     "ai": "Bạn học",
     "nd": "Kế hoạch dài dòng làm gì, ai chả đọc lướt. Ghi con số thật to cho đẹp, hoặc chép của quán nổi tiếng, nhanh gọn!"
    },
    "bay": {
     "loai": "loi_truoc_mat",
     "mo": "Cách nhanh và đẹp trên giấy làm em bỏ qua bước phân tích khó nhưng cần thiết."
    },
    "goi_y": [
     "Người cho em vay vốn sẽ hỏi những gì về kế hoạch: khách hàng, tiền, rủi ro?",
     "Ôn Lớp 12 Bài 5: năm bước lập kế hoạch kinh doanh gồm những bước nào?",
     "Phương án nhanh và đẹp trên giấy chưa chắc phản ánh cơ sở của em. Hãy hỏi: số liệu này lấy từ đâu?"
    ],
    "sb": {
     "bo": "van_phong",
     "nv": [
      "em",
      "ban|Bạn học",
      "co_van"
     ],
     "noi": "ban",
     "tuy": [
      "giay"
     ]
    },
    "chon": [
     {
      "nhan": "Lập kế hoạch đủ phần: khách, mục tiêu, đối thủ, chiến lược, thu chi, điểm hoà vốn và rủi ro.",
      "tot": 2,
      "d": {
       "tien": -1500,
       "tin": 6,
       "ct": 8
      },
      "bl": "Kế hoạch kinh doanh gồm xác định ý tưởng, mục tiêu, phân tích điều kiện thực hiện, chiến lược (có tài chính, điểm hoà vốn) và đánh giá rủi ro cùng biện pháp xử lí (Lớp 12 Bài 5)."
     },
     {
      "nhan": "Viết một trang ý tưởng và doanh thu kì vọng thật lớn để cô cố vấn thấy được tham vọng của em.",
      "tot": 1,
      "d": {
       "tien": 0,
       "tin": -2,
       "ct": -4
      },
      "bl": "Thiếu phân tích điều kiện, tài chính và rủi ro thì kế hoạch chưa đủ sức thuyết phục; cần mục tiêu cụ thể, khả thi và biện pháp xử lí rủi ro (Lớp 12 Bài 5).",
      "loi_sai": "Chỉ ghi ý tưởng và con số lạc quan.",
      "rui_ro": "Thiếu phân tích điều kiện, điểm hoà vốn, rủi ro; khó thuyết phục người cho vay."
     },
     {
      "nhan": "Lấy kế hoạch của quán nổi tiếng trên mạng, đổi tên và con số cho nhanh, khỏi mất cả tuần.",
      "tot": 0,
      "d": {
       "tien": -1000,
       "tin": -6,
       "ct": -8
      },
      "bl": "Kế hoạch phải xuất phát từ ý tưởng, khách hàng và điều kiện của chính mình. Kế hoạch sao chép không phản ánh được thực tế của cơ sở em (Lớp 12 Bài 5).",
      "loi_sai": "Sao chép kế hoạch của người khác.",
      "rui_ro": "Không khớp với khách hàng và vốn thật của em, dễ lỗ."
     }
    ]
   }
  },
  {
   "ten": "Mưa kéo dài",
   "tin_tuc": "Mưa kéo dài làm rau ngoài ruộng hư hỏng: giá nhập tăng mạnh. Khách ít ra đường nhưng vẫn cần rau tươi giao tận nhà.",
   "k": 0.95,
   "cf": 1.3,
   "gia": null,
   "dan": {
    "vai": "chu_quay",
    "ai": "Chủ quầy rau",
    "nd": "Rau đang khan, giá lên vù vù! Em nhập thật nhiều rồi nâng giá lên cao, ai cần thì phải mua!"
   },
   "bay": {
    "loai": "loi_truoc_mat",
    "mo": "Cảm giác «hàng khan thì cứ lợi tối đa» che đi chuyện chi phí nhập đã tăng và khách quen có thể rời đi."
   },
   "goi_y": [
    "Giá vốn mỗi túi tháng này khác tháng trước thế nào? Khách đang mua nhiều hay ít hơn?",
    "Ôn Lớp 11 Bài 2 và Bài 3: khi chi phí đầu vào tăng, người bán nên làm gì với giá, và tích trữ chờ giá lên có rủi ro gì?",
    "Dù hàng khan, khách vẫn so sánh với nơi khác. Hãy hỏi: nếu nhập nhiều mà bán không hết thì chi phí đó ai chịu?"
   ],
   "bai": [
    "11-b02",
    "11-b03"
   ],
   "sb": {
    "bo": "cho",
    "nv": [
     "em",
     "chu_quay|Chủ quầy rau",
     "khach"
    ],
    "noi": "chu_quay",
    "tuy": []
   },
   "tinh_huong": {
    "xh": 1,
    "tieu_de": "Mưa lớn, rau lên giá",
    "nd": "Cuối tháng mưa, giá rau ở chợ vẫn gần gấp đôi. Khách quen than đắt. Chủ quầy rau, nhà cung cấp của em, rỉ tai: «Tích thật nhiều, chờ giá lên nữa mới bán».",
    "loi_dan": {
     "ai": "Chủ quầy rau",
     "nd": "Rau khan thế này, tích thật nhiều chờ lên gấp ba mới bán. Chợ nào cũng làm vậy, em đừng khờ."
    },
    "bay": {
     "loai": "loi_truoc_mat",
     "mo": "Cơ hội lời lớn trước mắt làm em quên khách quen và rủi ro hàng hỏng."
    },
    "goi_y": [
     "Cung đang nhỏ hơn cầu: điều đó giải thích gì về giá, và khách quen của mẹ nghĩ gì khi giá tăng quá mạnh?",
     "Ôn Lớp 11 Bài 2 và Bài 3: tích trữ chờ giá tăng gây hậu quả gì?",
     "Hai trong ba cách nghĩ cùng dựa vào «hàng khan nên cứ lợi tối đa». Hãy hỏi: khách quen có quay lại không?"
    ],
    "sb": {
     "bo": "cho",
     "nv": [
      "em",
      "chu_quay|Chủ quầy rau",
      "khach"
     ],
     "noi": "chu_quay",
     "tuy": []
    },
    "chon": [
     {
      "nhan": "Tính lại giá theo giá nhập mới, giữ lãi vừa phải, tìm thêm nguồn hàng và giải thích cho khách.",
      "tot": 2,
      "d": {
       "tien": 3000,
       "tin": 6,
       "ct": 4
      },
      "bl": "Cung nhỏ hơn cầu thì giá tăng. Người kinh doanh căn cứ giá và thông tin thị trường để điều chỉnh mà vẫn giữ uy tín với khách (Lớp 11 Bài 2; Lớp 10 Bài 4)."
     },
     {
      "nhan": "Giữ hàng chưa bán, chờ giá lên gấp ba rồi bán một lượt thì lời chắc hơn nhiều, chủ quầy khác cũng đang làm vậy.",
      "tot": 0,
      "d": {
       "tien": -9000,
       "tin": -6,
       "ct": -3
      },
      "bl": "Đầu cơ, tích trữ là hệ quả làm giá bị đẩy lên và gây thiệt hại cho đời sống; rau tươi để lâu còn hư hỏng, mất vốn (Lớp 11 Bài 3).",
      "loi_sai": "Tích trữ, đầu cơ chờ giá.",
      "rui_ro": "Rau tươi hư hỏng mất vốn, khách quen tìm chỗ khác."
     },
     {
      "nhan": "Nâng giá gấp ba ngay hôm nay vì hàng đang khan, ai cần thì mua, không thì thôi.",
      "tot": 0,
      "d": {
       "tien": 4000,
       "tin": -10,
       "ct": -6
      },
      "bl": "Lợi dụng khó khăn của khách để trục lợi làm mất niềm tin. Đạo đức kinh doanh đòi hỏi trung thực, công bằng (Lớp 11 Bài 7).",
      "loi_sai": "Nâng giá quá mức lúc khan hiếm.",
      "rui_ro": "Mất niềm tin của khách quen, bị coi là chặt chém."
     }
    ]
   }
  },
  {
   "ten": "Đối thủ khuyến mãi",
   "tin_tuc": "Rau Xanh Plus mở cùng chung cư, giảm giá mạnh để giành khách. Nhiều khách của em hỏi vì sao giá bên em cao hơn.",
   "k": 1,
   "cf": 1,
   "gia": {
    "28": 1.05,
    "35": 0.88,
    "44": 0.7
   },
   "dan": {
    "vai": "ban",
    "ai": "Bạn trong nhóm",
    "nd": "Họ giảm giá thì mình giảm sâu hơn nữa, bán lỗ cũng phải giữ khách cho bằng được!"
   },
   "bay": {
    "loai": "cam_xuc",
    "mo": "Cơn tức vì bị cướp khách làm em muốn đáp trả bằng giá thay vì tính toán."
   },
   "goi_y": [
    "Khách đang so sánh điều gì giữa hai bên: chỉ giá, hay cả chất lượng và độ tin cậy? Giá của em còn lãi bao nhiêu trên mỗi túi?",
    "Ôn Lớp 11 Bài 1: cạnh tranh lành mạnh dựa vào đâu, và khi có nhiều người bán thì cầu nhạy với giá hơn hay kém đi?",
    "Giảm giá mạnh chỉ có lợi khi mỗi túi vẫn còn lãi và bán thêm đủ nhiều. Hãy thử so tổng lãi ở từng mức giá thay vì chỉ so số khách."
   ],
   "bai": [
    "11-b01"
   ],
   "sb": {
    "bo": "cua_hang",
    "nv": [
     "em",
     "ban|Bạn trong nhóm"
    ],
    "noi": "ban",
    "tuy": [
     "dien_thoai"
    ]
   },
   "tinh_huong": {
    "tieu_de": "Cuộc đua giá",
    "nd": "Cuối tháng, «Rau Xanh Plus» còn nhắn vào nhóm cư dân: «Rau của bạn kia không biết nguồn ở đâu đâu nhé!». Khách của em bắt đầu hỏi.",
    "loi_dan": {
     "ai": "Bạn trong nhóm",
     "nd": "Họ đang cướp khách của em đấy! Hạ giá nữa đi, hoặc nhắn cho cả nhóm biết họ bán rau gì, cho họ biết tay."
    },
    "bay": {
     "loai": "cam_xuc",
     "mo": "Cơn tức vì bị cướp khách làm em muốn trả đũa thay vì tính toán."
    },
    "goi_y": [
     "Khách của em đang so sánh điều gì: chỉ giá, hay cả chất lượng lẫn độ tin cậy?",
     "Ôn Lớp 11 Bài 1: cạnh tranh lành mạnh khác cạnh tranh không lành mạnh ở điểm nào?",
     "Hai cách đáp trả đều xuất phát từ cơn tức. Hãy hỏi: cách nào em còn làm được sau ba tháng?"
    ],
    "sb": {
     "bo": "cua_hang",
     "nv": [
      "em",
      "ban|Bạn trong nhóm"
     ],
     "noi": "ban",
     "tuy": [
      "dien_thoai"
     ]
    },
    "chon": [
     {
      "nhan": "Giữ giá hợp lí, giao đúng giờ, ghi nguồn gốc từng loại rau và trả lời khách bằng thông tin thật.",
      "tot": 2,
      "d": {
       "tien": 1500,
       "tin": 8,
       "ct": 4
      },
      "bl": "Cạnh tranh lành mạnh dựa trên chất lượng, dịch vụ và sự trung thực; gièm pha đối thủ là biểu hiện của cạnh tranh không lành mạnh (Lớp 11 Bài 1)."
     },
     {
      "nhan": "Hạ giá xuống dưới giá vốn một thời gian để giữ khách, chịu lỗ vài tuần rồi bù lại khi đối thủ bỏ cuộc.",
      "tot": 1,
      "d": {
       "tien": -6000,
       "tin": 2,
       "ct": 0
      },
      "bl": "Hạ giá có thể giữ khách nhưng bán lỗ kéo dài làm cạn vốn; phải phân tích chi phí và lợi thế của mình (Lớp 11 Bài 1).",
      "loi_sai": "Bán dưới giá vốn kéo dài để giữ khách.",
      "rui_ro": "Cạn vốn trước khi đối thủ chịu thua, khách chỉ ở lại vì giá rẻ."
     },
     {
      "nhan": "Nhắn vào nhóm cư dân kể «Rau Xanh Plus» hay dùng rau tồn, để họ mất khách như mình.",
      "tot": 0,
      "d": {
       "tien": 0,
       "tin": -10,
       "ct": -8
      },
      "bl": "Gièm pha đối thủ là hành vi cạnh tranh không lành mạnh, gây thiệt hại cho cả người sản xuất lẫn người tiêu dùng (Lớp 10 Bài 4; Lớp 11 Bài 1).",
      "loi_sai": "Gièm pha đối thủ khi chưa có căn cứ.",
      "rui_ro": "Khách nghi ngờ cả hai bên, em bị coi là cạnh tranh không lành mạnh.",
      "cd": [
       "giem_pha"
      ]
     }
    ]
   },
   "hop": {
    "tieu_de": "Hộp thư giữa tháng",
    "nd": "Giữa tháng, ba tin nhắn đến cùng một lúc: chị khách quen gửi ảnh túi rau héo, nhà vườn báo có lô rau mới cần trả lời trong ngày, và «Rau Xanh Plus» nhắn vào nhóm cư dân. Em chỉ còn đủ sức làm một phần: mỗi cách xử lí tốn một số điểm sức, và việc nào để lại thì có thể leo thang sang tháng sau.",
    "diem": 5,
    "xh": 1,
    "bay": {
     "loai": "thoi_gian",
     "mo": "Nhiều việc đến cùng lúc làm em muốn xử lí qua loa hoặc xử lí theo cảm xúc thay vì ưu tiên việc quan trọng."
    },
    "goi_y": [
     "Ba tin nhắn đến cùng lúc mà em chỉ có 5 điểm sức. Việc nào để chậm thì chuyện xấu đi, việc nào để lại cũng không sao? Với mỗi việc, em đã biết gì và cần biết thêm gì?",
     "Ôn Lớp 12 Bài 5, Bài 6 và Lớp 11 Bài 1, Bài 7: lập kế hoạch có cân nhắc cơ hội và rủi ro, bảo đảm chất lượng và quyền lợi người tiêu dùng, trung thực, cạnh tranh lành mạnh.",
     "Xử lí kĩ một việc thì tốn nhiều sức; xử lí nhanh nhiều việc thì dễ để lại lỗi gốc. Hãy hỏi: việc nào để lại sẽ leo thang, việc nào xử lí qua loa sẽ lặp lại, việc nào cần biết sự thật trước khi quyết?"
    ],
    "bai": [
     "12-b05",
     "12-b06",
     "11-b01",
     "11-b07"
    ],
    "viec": [
     {
      "id": "khieu_nai",
      "ai": "Chị khách quen",
      "tieu_de": "Chị khách quen trả lại túi rau héo",
      "nd": "Chị khách quen nhắn kèm ảnh: túi rau giao sáng nay có mấy bó héo và dập, chị muốn đổi hoặc hoàn tiền. Em nhớ hôm đó giao muộn vì trời nóng và chỗ để hàng chưa che nắng. Cả nhóm cư dân đang chờ xem em xử lí ra sao.",
      "loi_dan": {
       "ai": "Bạn trong nhóm",
       "nd": "Cứ bảo rau do nhà vườn, mình đâu có lỗi! Trả tiền một lần là khách đòi hoài, đừng chiều khách quá!"
      },
      "cach": [
       {
        "id": "tim_hieu",
        "ts": 3,
        "nhan": "Xin lỗi chị, đổi túi rau mới trong ngày, xem lại khâu che nắng và giao muộn, rồi nhắn cho chị biết em đã sửa điều gì.",
        "tot": 2,
        "d": {
         "tien": -500,
         "tin": 6,
         "ct": 6
        },
        "cd": [
         "tan_goc"
        ],
        "bl": "Người kinh doanh có trách nhiệm bảo đảm chất lượng sản phẩm và quyền lợi người tiêu dùng; trung thực, tôn trọng con người và gắn kết lợi ích doanh nghiệp – khách hàng là biểu hiện của đạo đức kinh doanh (Lớp 12 Bài 6; Lớp 11 Bài 7, Bài 8)."
       },
       {
        "id": "hoan_nhanh",
        "ts": 1,
        "nhan": "Hoàn tiền ngay cho nhanh gọn nhưng không hỏi thêm gì, vì em cho là chuyện nhỏ, lần sau dặn bạn giao cẩn thận hơn là xong.",
        "tot": 1,
        "d": {
         "tien": -800,
         "tin": 1,
         "ct": 0
        },
        "cd": [
         "loi_lap"
        ],
        "bl": "Giải quyết cho khách là cần, nhưng không tìm nguyên nhân thì lỗi dễ lặp lại; bảo đảm chất lượng sản phẩm là trách nhiệm thường xuyên chứ không chỉ xử lí từng lần (Lớp 12 Bài 6; Lớp 11 Bài 7).",
        "loi_sai": "Chỉ hoàn tiền, không tìm nguyên nhân.",
        "rui_ro": "Rau héo tái diễn, khách quen dần bỏ đi mà em không biết lí do."
       },
       {
        "id": "doi_loi",
        "ts": 1,
        "nhan": "Nhắn lại rằng rau do nhà vườn giao tươi, lỗi là do trời nóng chứ không phải do em, và từ chối đổi vì «cư dân khác không ai chê».",
        "tot": 0,
        "d": {
         "tien": 500,
         "tin": -10,
         "ct": -8
        },
        "cd": [
         "bo_khach"
        ],
        "bl": "Từ chối trách nhiệm, đổ lỗi cho người khác và phớt lờ phản hồi là thiếu trung thực, thiếu tôn trọng khách và không bảo đảm quyền lợi người tiêu dùng (Lớp 11 Bài 7, Bài 8; Lớp 12 Bài 6).",
        "loi_sai": "Đổ lỗi và từ chối đổi cho khách.",
        "rui_ro": "Khách kể lại trong nhóm cư dân, em mất uy tín và mất cả khách quen."
       }
      ],
      "bo": {
       "tot": 0,
       "d": {
        "tin": -5
       },
       "cd": [
        "khieu_nai_leo"
       ],
       "bl": "Người kinh doanh có trách nhiệm bảo đảm quyền lợi người tiêu dùng và tôn trọng khách hàng; bỏ mặc phản hồi của khách là đi ngược trách nhiệm đó (Lớp 12 Bài 6; Lớp 11 Bài 7, Bài 8).",
       "loi_sai": "Để lại khiếu nại của khách quen, không ai trả lời.",
       "rui_ro": "Chị đăng ảnh lên nhóm cư dân, nhiều hộ bắt đầu nghi ngờ rau của em."
      }
     },
     {
      "id": "nha_vuon",
      "ai": "Nhà vườn",
      "tieu_de": "Nhà vườn báo có lô rau mới giá tốt",
      "nd": "Nhà vườn quen nhắn: «Có lô rau mới thu hoạch, giá tốt hơn tuần trước, chiều nay em trả lời giúp chị để chị còn giữ cho em, không thì chị bán cho nơi khác». Em chưa biết lô này có giấy tờ nguồn gốc hay không.",
      "loi_dan": {
       "ai": "Nhà vườn",
       "nd": "Rau tươi lắm, em cứ chốt đi, giấy tờ để chị gửi sau, chậm là hết đấy!"
      },
      "cach": [
       {
        "id": "xem_lo",
        "ts": 2,
        "nhan": "Hẹn ghé xem lô rau, hỏi giấy tờ nguồn gốc và so giá với tuần trước rồi mới chốt.",
        "tot": 2,
        "d": {
         "tien": 800,
         "tin": 2,
         "ct": 2
        },
        "cd": [
         "nhap_co_nguon"
        ],
        "bl": "Bảo đảm chất lượng sản phẩm từ khâu nhập nguyên liệu, tìm hiểu nguồn gốc và so sánh giá trước khi quyết định là cách kinh doanh có kế hoạch, cân nhắc cơ hội và rủi ro (Lớp 12 Bài 5, Bài 6; Lớp 11 Bài 7)."
       },
       {
        "id": "chot_dt",
        "ts": 1,
        "nhan": "Chốt luôn qua điện thoại cho kịp lô rau, nhờ nhà vườn gửi giấy tờ sau.",
        "tot": 1,
        "d": {
         "tien": 300,
         "ct": -2
        },
        "cd": [
         "chot_khong_xem"
        ],
        "bl": "Chốt nhanh giúp không lỡ lô rau, nhưng chưa kiểm tra nguồn gốc thì chất lượng sản phẩm chưa được bảo đảm ngay từ đầu (Lớp 12 Bài 6; Lớp 11 Bài 7).",
        "loi_sai": "Nhập hàng khi chưa xem giấy tờ nguồn gốc.",
        "rui_ro": "Nếu lô rau có vấn đề, em phải chịu trách nhiệm với khách; nhà vườn cũng quen việc em không kiểm tra."
       }
      ],
      "bo": {
       "tot": 1,
       "d": {
        "tien": -300
       },
       "cd": [
        "bo_lo_tot"
       ],
       "bl": "Để lại việc này thì em không gặp rủi ro về nguồn gốc nhưng mất cơ hội nhập lô rau tốt giá tốt; lập kế hoạch kinh doanh là cân nhắc cả cơ hội lẫn rủi ro (Lớp 12 Bài 5).",
       "loi_sai": "Không trả lời nhà vườn trong ngày.",
       "rui_ro": "Lô rau tốt bán cho nơi khác, vào cao điểm em phải nhập rau với giá cao hơn."
      }
     },
     {
      "id": "doi_thu",
      "ai": "Rau Xanh Plus",
      "tieu_de": "«Rau Xanh Plus» nhắn vào nhóm cư dân",
      "nd": "«Rau Xanh Plus» nhắn vào nhóm cư dân: «Rau bên kia giá cao mà chất lượng cũng thường thôi». Vài hộ nhắn riêng hỏi lại em.",
      "loi_dan": {
       "ai": "Bạn trong nhóm",
       "nd": "Họ nói xấu mình trước thì mình nói lại cho họ biết tay, cứ đăng luôn chuyện họ hay dùng rau tồn!"
      },
      "cach": [
       {
        "id": "tra_loi_that",
        "ts": 1,
        "nhan": "Trả lời ngắn, lịch sự, kèm thông tin thật về nguồn gốc và giá rau của em, không nhắc gì đến đối thủ.",
        "tot": 2,
        "d": {
         "tin": 5,
         "ct": 2
        },
        "cd": [],
        "bl": "Cạnh tranh lành mạnh dựa vào chất lượng, giá cả và uy tín, không dùng thủ đoạn làm giảm uy tín đối thủ; trả lời khách bằng thông tin trung thực là biểu hiện của đạo đức kinh doanh (Lớp 11 Bài 1, Bài 7)."
       },
       {
        "id": "dap_tra",
        "ts": 1,
        "nhan": "Nhắn lại ngay vào nhóm: «Rau bên kia hay dùng rau tồn», để cư dân biết ai mới là người tử tế.",
        "tot": 0,
        "d": {
         "tin": -6,
         "ct": -4
        },
        "cd": [
         "cai_nhau_mang"
        ],
        "bl": "Nói xấu đối thủ bằng thông tin chưa kiểm chứng là cạnh tranh không lành mạnh và làm mất uy tín của chính mình (Lớp 11 Bài 1, Bài 7).",
        "loi_sai": "Đáp trả bằng lời nói xấu trong nhóm cư dân.",
        "rui_ro": "Tin nhắn bị chụp màn hình và lan đi, cư dân nghi ngờ cả hai bên."
       }
      ],
      "bo": {
       "tot": 1,
       "d": {
        "tin": -1
       },
       "cd": [],
       "bl": "Không đáp lại thì tránh được cãi vã, nhưng em bỏ lỡ cơ hội để khách thấy thông tin thật về rau của mình; cạnh tranh lành mạnh dựa vào chất lượng và uy tín (Lớp 11 Bài 1).",
       "loi_sai": "Chưa trả lời khách đang thắc mắc.",
       "rui_ro": "Vài hộ vẫn nghi ngờ, em mất cơ hội giữ khách bằng thông tin thật."
      }
     }
    ]
   }
  },
  {
   "ten": "Cao điểm lễ",
   "tin_tuc": "Dịp lễ, nhiều gia đình đặt rau để nấu cỗ: lượng đặt tăng mạnh, nhưng chỉ kéo dài vài ngày.",
   "k": 1.4,
   "cf": 1,
   "gia": null,
   "dan": {
    "vai": "co_van",
    "ai": "Cô tư vấn",
    "nd": "Lễ đông khách thế này mà thiếu hàng thì tiếc lắm! Nhập hết cỡ cho an tâm, giữ giá như thường cho khách khỏi chê!"
   },
   "bay": {
    "loai": "so_mat",
    "mo": "Nỗi sợ «thiếu hàng, mất khách» thúc em nhập theo cảm giác thay vì theo số liệu."
   },
   "goi_y": [
    "Lượng đặt tháng này so với tháng thường tăng khoảng bao nhiêu? Em có thể tự ước lượng số túi sẽ bán được không?",
    "Ôn Lớp 11 Bài 2: cầu tăng thì cung nên điều chỉnh ra sao, và cung nhỏ hơn cầu thì ảnh hưởng gì đến doanh thu và giá?",
    "Sợ thiếu hàng và sợ ế hàng đều là sợ mất tiền. Hãy so xem mỗi túi thiếu và mỗi túi thừa làm em mất bao nhiêu."
   ],
   "bai": [
    "11-b02"
   ],
   "sb": {
    "bo": "kho_xuong",
    "nv": [
     "em",
     "co_van|Cô tư vấn",
     "nv_giao"
    ],
    "noi": "co_van",
    "tuy": [
     "xe_may"
    ]
   },
   "su_co": {
    "xh": 1,
    "tieu_de": "Lô rau lạ giữa cao điểm",
    "nd": "Đang cao điểm lễ, nhà cung cấp chào em một lô rau giá rẻ hơn thường lệ nhưng không có giấy tờ nguồn gốc: vài bó có mùi lạ và lá lốm đốm. Đơn hàng đang đổ về ào ào, kho thì sắp hết rau.",
    "loi_dan": {
     "ai": "Nhà cung cấp",
     "nd": "Lô này chỉ lốm đốm bên ngoài thôi, rửa kĩ là ăn được. Cao điểm thế này em không lấy thì có người khác lấy ngay, lấy rẻ còn lãi dày!"
    },
    "bay": {
     "loai": "loi_truoc_mat",
     "mo": "Giá rẻ và áp lực sắp hết hàng khiến em quên rằng người ăn rau mới là người chịu rủi ro."
    },
    "goi_y": [
     "Ai sẽ là người ăn số rau này, và nếu có khách bị ảnh hưởng thì ai phải chịu trách nhiệm trước tiên?",
     "Ôn Lớp 11 Bài 7 và Lớp 12 Bài 6: nguyên liệu và sản phẩm đưa ra thị trường cần bảo đảm điều gì, và lợi nhuận được đặt ở đâu so với an toàn của khách?",
     "«Rửa kĩ là ăn được» và «có người khác lấy ngay» đều là sức ép chứ chưa phải bằng chứng rau an toàn. Hãy hỏi: em có giấy tờ hay cách kiểm nào để biết chắc?"
    ],
    "bai": [
     "11-b07",
     "12-b06",
     "11-b08"
    ],
    "sb": {
     "bo": "kho_xuong",
     "nv": [
      "em",
      "ncc|Nhà cung cấp",
      "nv_giao"
     ],
     "noi": "ncc",
     "tuy": [
      "xe_may"
     ]
    },
    "chon": [
     {
      "nhan": "Không nhận lô không rõ nguồn gốc, yêu cầu xem giấy tờ, tạm tìm nguồn khác và báo khách một số loại có thể về chậm.",
      "tot": 2,
      "d": {
       "tien": -3000,
       "tin": 4,
       "ct": 8
      },
      "bl": "Bảo đảm chất lượng sản phẩm và quyền lợi người tiêu dùng là trách nhiệm của người kinh doanh; không đưa vào bán nguyên liệu không bảo đảm dù hấp dẫn về giá, và minh bạch với khách là biểu hiện của đạo đức kinh doanh (Lớp 12 Bài 6; Lớp 11 Bài 7, Bài 8)."
     },
     {
      "nhan": "Nhận lô nhưng chỉ bán cho nhóm khách ít kén chọn với giá giảm, kèm lời dặn khách rửa kĩ rau trước khi dùng cho yên tâm.",
      "tot": 1,
      "d": {
       "tien": 2000,
       "tin": -4,
       "ct": -6
      },
      "bl": "Dặn khách rửa kĩ không thay được trách nhiệm bảo đảm sản phẩm an toàn từ đầu; người tiêu dùng cần thông tin rõ ràng để lựa chọn (Lớp 12 Bài 6; Lớp 11 Bài 8).",
      "loi_sai": "Bán hàng chưa rõ an toàn kèm lời dặn.",
      "rui_ro": "Khách vẫn có thể bị ảnh hưởng sức khoẻ, em phải chịu trách nhiệm và mất uy tín."
     },
     {
      "nhan": "Nhận cả lô, trộn lẫn với rau tốt để khách khó phát hiện, giá bán giữ như thường vì dịp lễ ai cũng cần rau.",
      "tot": 0,
      "d": {
       "tien": 5000,
       "tin": -10,
       "ct": -14
      },
      "bl": "Che giấu chất lượng và trộn hàng không bảo đảm vào sản phẩm bán ra là thiếu trung thực, đi ngược trách nhiệm pháp lí và đạo đức với người tiêu dùng (Lớp 11 Bài 7; Lớp 12 Bài 6).",
      "loi_sai": "Trộn lô rau không rõ nguồn với rau tốt.",
      "rui_ro": "Khách có thể bị ảnh hưởng sức khoẻ, bị phát hiện thì mất uy tín cả cơ sở.",
      "cd": [
       "tron_hang"
      ]
     }
    ]
   },
   "tinh_huong": {
    "xh": 1,
    "tieu_de": "Đội giao hàng đầu tiên",
    "nd": "Đơn hàng tăng, em tuyển ba bạn giao hàng và một chị đóng gói. Chị đóng gói hỏi nhỏ: «Em có kí hợp đồng và đóng bảo hiểm cho chị không?».",
    "loi_dan": {
     "ai": "Cô tư vấn",
     "nd": "Mới mở thì cứ gọn nhẹ thôi: bảo hiểm, hợp đồng để sau, trả công theo ngày cho đỡ tốn. Đơn đang ào ào, bỏ sao được."
    },
    "bay": {
     "loai": "loi_truoc_mat",
     "mo": "Tiết kiệm trước mắt khiến em đẩy rủi ro sang cho người lao động."
    },
    "goi_y": [
     "Người lao động của em cần được bảo đảm những điều gì khi làm việc, kể cả hôm mưa bão?",
     "Ôn Lớp 12 Bài 6 và Bài 3: trách nhiệm pháp lí, đạo đức của doanh nghiệp và vai trò của bảo hiểm.",
     "«Để sau cho gọn» thường là để người khác chịu rủi ro thay em. Hãy hỏi: ai chịu thiệt nếu có tai nạn?"
    ],
    "sb": {
     "bo": "kho_xuong",
     "nv": [
      "em",
      "co_van|Cô tư vấn",
      "nv_giao"
     ],
     "noi": "co_van",
     "tuy": [
      "mua"
     ]
    },
    "chon": [
     {
      "nhan": "Kí hợp đồng ghi rõ việc, giờ làm, tiền công và đóng bảo hiểm cho người lao động theo quy định.",
      "tot": 2,
      "d": {
       "tien": -5000,
       "tin": 8,
       "ct": 10
      },
      "bl": "Doanh nghiệp có trách nhiệm pháp lí và đạo đức với người lao động: bảo đảm an toàn, quyền lợi. Bảo hiểm giúp chuyển giao rủi ro cho cả hai phía (Lớp 12 Bài 6, Bài 3, Bài 8).",
      "cd": [
       "bao_hiem_lao_dong"
      ]
     },
     {
      "nhan": "Thoả thuận miệng, trả công theo ngày; đợi cơ sở ổn định, có lãi rồi hãy tính hợp đồng và bảo hiểm cho đỡ tốn.",
      "tot": 1,
      "d": {
       "tien": 1000,
       "tin": -4,
       "ct": -8
      },
      "bl": "Thoả thuận không rõ ràng dễ gây tranh chấp và thiệt cho người lao động; bảo đảm quyền, lợi ích hợp pháp của họ là nghĩa vụ của người kinh doanh (Lớp 12 Bài 8, Bài 6).",
      "loi_sai": "Thoả thuận miệng, hoãn bảo hiểm.",
      "rui_ro": "Tranh chấp tiền công, không có bảo hiểm khi tai nạn, mất niềm tin của người lao động.",
      "cd": [
       "thieu_bao_ve"
      ]
     },
     {
      "nhan": "Cho các bạn tăng ca cả hôm mưa bão để kịp đơn lớn, vẫn trả công như thường là hợp lí.",
      "tot": 0,
      "d": {
       "tien": 3000,
       "tin": -8,
       "ct": -12
      },
      "bl": "Bắt người lao động làm quá sức, bất chấp an toàn và không trả công tương xứng là đi ngược trách nhiệm pháp lí và đạo đức của doanh nghiệp (Lớp 12 Bài 6).",
      "loi_sai": "Ép tăng ca, bỏ qua an toàn.",
      "rui_ro": "Nguy cơ tai nạn, người lao động nghỉ việc, em phải chịu trách nhiệm.",
      "cd": [
       "thieu_bao_ve"
      ]
     }
    ]
   }
  },
  {
   "ten": "Mùa chuộng hữu cơ",
   "tin_tuc": "Báo chí nói nhiều về rau sạch, hữu cơ: khách sẵn lòng trả cao hơn cho loại rau họ tin tưởng.",
   "k": 1.1,
   "cf": 1,
   "gia": {
    "28": 0.95,
    "35": 1,
    "44": 1.25
   },
   "dan": {
    "vai": "chu_quay",
    "ai": "Chủ quầy rau",
    "nd": "Cứ định giá thật cao và gắn chữ hữu cơ lên, khách chịu trả hết, ai kiểm tra làm gì!"
   },
   "bay": {
    "loai": "so_dong",
    "mo": "Cả chợ cùng làm khiến việc tăng giá nhờ cái nhãn trông như điều bình thường."
   },
   "goi_y": [
    "Khách tháng này sẵn lòng trả thêm vì điều gì? Rau của em có điều đó thật không?",
    "Ôn Lớp 11 Bài 8: người tiêu dùng chọn mua theo yếu tố nào, và điều gì làm họ tin vào sản phẩm?",
    "Tăng giá chỉ bền khi khách thấy xứng đáng. Hãy hỏi: nếu khách biết rõ nguồn gốc rau của em, họ còn trả mức giá đó không?"
   ],
   "bai": [
    "11-b08",
    "11-b07"
   ],
   "sb": {
    "bo": "cho",
    "nv": [
     "em",
     "chu_quay|Chủ quầy rau",
     "khach"
    ],
    "noi": "chu_quay",
    "tuy": []
   },
   "tinh_huong": {
    "xh": 1,
    "tieu_de": "Nhãn «hữu cơ»",
    "nd": "Mùa này khách chuộng rau «hữu cơ». Nhà vườn quen của em chưa có chứng nhận hữu cơ nhưng trồng sạch và cẩn thận. Một khách hỏi thẳng: «Rau của em có phải hữu cơ không?».",
    "loi_dan": {
     "ai": "Chủ quầy rau",
     "nd": "Dán chữ hữu cơ lên là bán gấp đôi, người ta có kiểm tra đâu. Cả chợ ai cũng dán, em nói thật làm gì cho thiệt."
    },
    "bay": {
     "loai": "so_dong",
     "mo": "Cả chợ cùng làm khiến việc nói sai trông như luật ngầm của nghề."
    },
    "goi_y": [
     "Khách hỏi một câu hỏi thẳng. Câu trả lời của em cho khách biết điều gì và giấu điều gì?",
     "Ôn Lớp 11 Bài 7 và Bài 8: đạo đức kinh doanh và người tiêu dùng cần được cung cấp thông tin thế nào?",
     "Lí lẽ «rau thật sự sạch, chỉ thiếu giấy» nghe có lí. Hãy hỏi: chữ trên nhãn nói với người mua điều gì?"
    ],
    "sb": {
     "bo": "cho",
     "nv": [
      "em",
      "chu_quay|Chủ quầy rau",
      "khach"
     ],
     "noi": "chu_quay",
     "tuy": []
    },
    "chon": [
     {
      "nhan": "Nói thật: rau trồng sạch, chưa có chứng nhận hữu cơ; cho khách xem thông tin nhà vườn.",
      "tot": 2,
      "d": {
       "tien": 0,
       "tin": 8,
       "ct": 6
      },
      "bl": "Trung thực, minh bạch là biểu hiện của đạo đức kinh doanh. Người tiêu dùng thông minh chọn sản phẩm gắn với chất lượng và nguồn gốc rõ ràng (Lớp 11 Bài 7, Bài 8)."
     },
     {
      "nhan": "Dán nhãn «hữu cơ» như các hàng khác, vì rau nhà vườn này trồng sạch thật, chỉ thiếu tờ giấy.",
      "tot": 0,
      "d": {
       "tien": 4000,
       "tin": -4,
       "ct": -12
      },
      "bl": "Gắn nhãn không đúng sự thật là thiếu trung thực, vi phạm đạo đức kinh doanh và làm khách hiểu nhầm (Lớp 11 Bài 7).",
      "loi_sai": "Gắn nhãn khi chưa có chứng nhận, tự coi mình sạch là đủ.",
      "rui_ro": "Bị khách hoặc đối thủ vạch trần, mất uy tín cả thương hiệu.",
      "cd": [
       "gian_nhan"
      ]
     },
     {
      "nhan": "Trả lời lửng «Rau nhà trồng, ăn là biết», rồi chuyển sang khoe độ tươi của rau để khách quên hỏi.",
      "tot": 1,
      "d": {
       "tien": 0,
       "tin": -3,
       "ct": -4
      },
      "bl": "Không nói sai nhưng cũng không cung cấp thông tin đầy đủ. Người tiêu dùng cần thông tin rõ ràng để lựa chọn (Lớp 11 Bài 8).",
      "loi_sai": "Né tránh, không nói sai mà cũng không nói thật.",
      "rui_ro": "Khách vẫn hiểu nhầm, mất lòng tin khi biết sự thật."
     }
    ]
   }
  },
  {
   "ten": "Bình lặng",
   "tin_tuc": "Tháng bình lặng: khách quen vẫn đặt đều nhưng ít người mới, giá nhập bình thường.",
   "k": 0.75,
   "cf": 1,
   "gia": null,
   "dan": {
    "vai": "chu_tiem",
    "ai": "Chủ tiệm bên cạnh",
    "nd": "Bình lặng thì cứ để nguyên mọi thứ như tháng trước, đừng nghĩ ngợi làm gì cho mệt!"
   },
   "bay": {
    "loai": "so_dong",
    "mo": "Người xung quanh bảo «cứ để nguyên» làm em bỏ qua việc tự tính lại số liệu."
   },
   "goi_y": [
    "Tháng trước em bán được bao nhiêu túi và còn dư bao nhiêu? Con số đó nói gì về mức nhập tháng này?",
    "Ôn Lớp 12 Bài 5: kế hoạch kinh doanh cần theo dõi những chỉ số nào, và điểm hoà vốn là gì?",
    "Tháng bình lặng vẫn có mức giá và mức nhập cho lãi nhiều hơn các mức khác. Hãy so lãi của vài cách thay vì cứ làm theo thói quen."
   ],
   "bai": [
    "12-b05"
   ],
   "sb": {
    "bo": "van_phong",
    "nv": [
     "em",
     "chu_tiem|Chủ tiệm bên cạnh"
    ],
    "noi": "chu_tiem",
    "tuy": [
     "giay"
    ]
   },
   "su_co": {
    "xh": 1,
    "tieu_de": "Tiền công chưa trả đủ",
    "nd": "Cuối tháng bình lặng, một bạn giao hàng nhắn riêng: tiền công tuần trước thiếu mấy đơn, bạn tính là bị trừ oan. Em nhớ sổ ghi tay có thể sót đơn. Nếu em im lặng, bạn ấy đang rủ thêm hai bạn khác nghỉ.",
    "loi_dan": {
     "ai": "Chủ tiệm bên cạnh",
     "nd": "Sổ ghi tay thì ai biết thiếu hay đủ! Cứ bảo bạn ấy nhớ nhầm, trả thêm là họ đòi mãi. Bạn nào làm khó thì cho nghỉ, đầy người xin việc."
    },
    "bay": {
     "loai": "uy_quyen",
     "mo": "Là chủ cơ sở, em dễ nghĩ «mình nói sao cũng được» nên bỏ qua việc kiểm tra sổ sách trước khi trả lời người lao động."
    },
    "goi_y": [
     "Số đơn bạn giao hàng nói và sổ ghi tay của em chênh nhau ở đâu? Có cách kiểm tra khách quan nào để cả hai cùng thấy rõ?",
     "Ôn Lớp 12 Bài 6 và Bài 8: quyền, lợi ích hợp pháp của người lao động và trách nhiệm của người sử dụng họ được nói thế nào?",
     "«Họ nhớ nhầm» và «cho nghỉ» là cách nghĩ của người đứng trên. Hãy hỏi: nếu sổ của em sót thật thì ai chịu thiệt, và người lao động còn tin em không?"
    ],
    "bai": [
     "12-b06",
     "12-b08"
    ],
    "sb": {
     "bo": "kho_xuong",
     "nv": [
      "em",
      "nv_giao",
      "chu_tiem|Chủ tiệm bên cạnh"
     ],
     "noi": "chu_tiem",
     "tuy": [
      "giay",
      "tien"
     ]
    },
    "chon": [
     {
      "nhan": "Cùng bạn đối chiếu tin nhắn đặt đơn với sổ ghi tay, trả đủ phần còn thiếu nếu đúng, rồi chuyển sang ghi sổ có hai bên xác nhận.",
      "tot": 2,
      "d": {
       "tien": -1500,
       "tin": 6,
       "ct": 8
      },
      "bl": "Bảo đảm quyền, lợi ích hợp pháp của người lao động là nghĩa vụ của người kinh doanh; trả công tương xứng là biểu hiện của trách nhiệm kinh tế, và thoả thuận rõ ràng, minh bạch giúp tránh tranh chấp (Lớp 12 Bài 8, Bài 6)."
     },
     {
      "nhan": "Trả thêm phần chênh cho bạn ngay để êm chuyện nhưng không đối chiếu sổ, vì em ngại mất thời gian kiểm lại từng đơn.",
      "tot": 1,
      "d": {
       "tien": -1500,
       "tin": 0,
       "ct": -2
      },
      "bl": "Trả đủ là đúng hướng nhưng không đối chiếu thì chưa tìm ra chỗ thiếu của sổ sách, và lần sau lại có thể tranh chấp; thoả thuận cần rõ ràng, minh bạch (Lớp 12 Bài 8).",
      "loi_sai": "Trả cho xong mà không tìm lỗi của sổ sách.",
      "rui_ro": "Chênh lệch lặp lại, người lao động vẫn thấy không minh bạch."
     },
     {
      "nhan": "Nói bạn nhớ nhầm, giữ nguyên khoản đã trả và cảnh báo ai làm khó thì cho nghỉ để cả nhóm biết điều.",
      "tot": 0,
      "d": {
       "tien": 1500,
       "tin": -10,
       "ct": -12
      },
      "bl": "Phủ nhận khoản tiền công mà chưa kiểm tra và doạ cho nghỉ là xâm phạm quyền, lợi ích hợp pháp của người lao động, trái trách nhiệm pháp lí và đạo đức của doanh nghiệp (Lớp 12 Bài 6, Bài 8).",
      "loi_sai": "Phủ nhận khoản tiền công mà chưa kiểm tra, doạ cho nghỉ.",
      "rui_ro": "Người lao động nghỉ việc và kể lại, em mất người và mất uy tín.",
      "cd": [
       "ep_nguoi_lao_dong"
      ]
     }
    ]
   },
   "tinh_huong": {
    "tieu_de": "Đăng kí và kê khai",
    "nd": "«Rau sạch Nhà em» chính thức đăng kí hộ kinh doanh. Cuối tháng, cô tư vấn nhắc chuyện sổ sách, hoá đơn và thuế.",
    "loi_dan": {
     "ai": "Chủ tiệm bên cạnh",
     "nd": "Bán tiền mặt thì để ngoài sổ hết, em kê khai đủ thì lãi đâu mà sống! Ai làm ăn nhỏ cũng vậy."
    },
    "bay": {
     "loai": "so_dong",
     "mo": "Cả nghề cùng né thuế khiến việc kê khai thiếu trông như chuyện thường."
    },
    "goi_y": [
     "Nghĩa vụ nộp thuế của người kinh doanh gồm những việc gì, và em có quyền được ai giúp?",
     "Ôn Lớp 12 Bài 8 và Lớp 10 Bài 6: hành vi nào bị nghiêm cấm trong quản lí thuế?",
     "Lí lẽ «ai cũng làm vậy» nói về số đông, chưa nói về điều pháp luật cho phép."
    ],
    "sb": {
     "bo": "van_phong",
     "nv": [
      "em",
      "chu_tiem|Chủ tiệm bên cạnh",
      "can_bo|Cán bộ thuế"
     ],
     "noi": "chu_tiem",
     "tuy": [
      "giay",
      "tien"
     ]
    },
    "chon": [
     {
      "nhan": "Ghi đủ doanh thu và chi phí, kê khai trung thực, nộp đúng hạn, chỗ chưa rành thì hỏi cơ quan thuế.",
      "tot": 2,
      "d": {
       "tien": -2500,
       "tin": 4,
       "ct": 10
      },
      "bl": "Nộp thuế theo luật định là nghĩa vụ của mọi người; người nộp thuế phải khai chính xác, trung thực, đầy đủ, nộp đúng hạn và có quyền được hỗ trợ, hướng dẫn (Lớp 12 Bài 8; Lớp 10 Bài 6).",
      "cd": [
       "ke_khai_dung"
      ]
     },
     {
      "nhan": "Chỉ kê khai phần chuyển khoản, tiền mặt để ngoài sổ, vì chủ cơ sở nhỏ nào cũng làm vậy và khó bị kiểm tra.",
      "tot": 0,
      "d": {
       "tien": 3000,
       "tin": -4,
       "ct": -14
      },
      "bl": "Cố tình không kê khai hoặc kê khai không đầy đủ, chính xác là hành vi bị nghiêm cấm trong quản lí thuế (Lớp 12 Bài 8).",
      "loi_sai": "Giấu một phần doanh thu.",
      "rui_ro": "Bị coi là kê khai không đầy đủ, chịu xử lí, mất uy tín với ngân hàng và đối tác.",
      "cd": [
       "tron_thue"
      ]
     },
     {
      "nhan": "Mua một xấp hoá đơn đầu vào cho đẹp sổ sách và giảm thuế, nhiều tiệm nhỏ vẫn làm thế.",
      "tot": 0,
      "d": {
       "tien": 3500,
       "tin": -6,
       "ct": -18
      },
      "bl": "Lập khống hoá đơn, ghi giá trị khác thực tế để giảm thuế là trốn thuế, bị nghiêm cấm trong quản lí thuế (Lớp 12 Bài 8).",
      "loi_sai": "Lập khống hoá đơn.",
      "rui_ro": "Vi phạm nặng, sổ sách thiếu trung thực, có thể bị xử lí và khó vay vốn.",
      "cd": [
       "tron_thue"
      ]
     }
    ]
   }
  },
  {
   "ten": "Cơ hội mở rộng",
   "tin_tuc": "Vào mùa thu hoạch, giá nhập giảm nhẹ, và một khu chung cư mới mở bán làm nhu cầu tăng.",
   "k": 1.25,
   "cf": 0.9,
   "gia": null,
   "dan": {
    "vai": "quan",
    "ai": "Quân",
    "nd": "Chung cư mới đông khách lắm, nhập thật nhiều đón đầu đi, thừa thì tặng khách cũng được!"
   },
   "bay": {
    "loai": "loi_truoc_mat",
    "mo": "Muốn đón đầu khiến em nhập theo cảm giác mà chưa tính việc rau tươi không để được lâu."
   },
   "goi_y": [
    "Giá nhập tháng này rẻ hơn, nhu cầu cũng tăng. Hai điều đó cùng tác động thế nào đến lượng nhập và giá bán của em?",
    "Ôn Lớp 10 Bài 4 và Lớp 11 Bài 2: chi phí giảm và cầu tăng ảnh hưởng gì đến lợi nhuận mỗi túi và tổng lợi nhuận?",
    "Nhập thật nhiều vì «rẻ» có thể thành ế nếu cầu không tăng đủ. Hãy ước lượng cầu trước, rồi mới chọn lượng nhập."
   ],
   "bai": [
    "11-b02",
    "11-b06"
   ],
   "sb": {
    "bo": "cua_hang",
    "nv": [
     "em",
     "quan"
    ],
    "noi": "quan",
    "tuy": [
     "xe_may"
    ]
   },
   "tinh_huong": {
    "tieu_de": "Vốn để mở rộng",
    "nd": "Mùa thu hoạch sắp tới, em cần thêm khoảng 15 triệu đồng để mua xe lạnh, thuê kho nhỏ và tuyển thêm người. Em mang kế hoạch đến ngân hàng xin vay.",
    "loi_dan": {
     "ai": "Quân",
     "nd": "Vay ngân hàng lằng nhằng lắm! Góp vốn với tụi tớ đi, bạn bè cả, chia đều là xong, cần gì giấy tờ."
    },
    "bay": {
     "loai": "uy_quyen",
     "mo": "«Người quen, bạn bè» khiến em tin mà bỏ qua việc ghi rõ quyền và nghĩa vụ."
    },
    "goi_y": [
     "Mỗi cách huy động vốn khác nhau ở: ai chịu rủi ro, ai có quyền, và mọi thứ có được ghi rõ không?",
     "Ôn Lớp 10 Bài 9 và Bài 7: vay ngân hàng và góp vốn với người khác khác nhau ở điểm nào?",
     "Lí lẽ «người quen thì khỏi cần thủ tục» đang bỏ qua điều gì khi có tranh chấp?"
    ],
    "sb": {
     "bo": "ngan_hang",
     "nv": [
      "em",
      "quan",
      "can_bo|Cán bộ ngân hàng"
     ],
     "noi": "quan",
     "tuy": []
    },
    "chon": [
     {
      "nhan": "Xin vay ngân hàng theo kế hoạch đã lập, vay vừa sức và bàn kĩ với bố mẹ về hình thức vay.",
      "tot": 2,
      "d": {
       "tien": 12000,
       "tin": 3,
       "ct": 6
      },
      "bl": "Vay ở tổ chức tín dụng chính thức, dựa trên kế hoạch và khả năng trả nợ, là cách vay có lòng tin và kì hạn rõ ràng. Tuỳ hình thức tín chấp hay thế chấp mà số tiền, lãi suất và rủi ro khác nhau (Lớp 10 Bài 9).",
      "cd": [
       "vay_ngan_hang"
      ]
     },
     {
      "nhan": "Rủ hai bạn thân cùng góp vốn, nói miệng chia đều lợi nhuận cho khỏi lằng nhằng giấy tờ.",
      "tot": 1,
      "d": {
       "tien": 8000,
       "tin": -2,
       "ct": -4
      },
      "bl": "Góp vốn cần thoả thuận rõ phần vốn góp, quyền và nghĩa vụ; mỗi mô hình (hộ kinh doanh, công ty…) có mức chịu trách nhiệm khác nhau (Lớp 10 Bài 7).",
      "loi_sai": "Góp vốn bằng lời hứa, không ghi quyền và nghĩa vụ.",
      "rui_ro": "Tranh chấp tiền và quyền quyết định, mất cả bạn lẫn vốn.",
      "cd": [
       "gop_von_mieng"
      ]
     },
     {
      "nhan": "Gọi lại người cho vay nóng quen biết, vì họ đưa tiền ngay và đã hiểu hoàn cảnh nhà em.",
      "tot": 0,
      "d": {
       "tien": 15000,
       "tin": -6,
       "ct": -10
      },
      "bl": "Quay lại vay ngoài kênh chính thức tiềm ẩn rủi ro lớn; tín dụng bền vững cần lòng tin, kì hạn và hoàn trả rõ ràng (Lớp 10 Bài 8, Bài 9).",
      "loi_sai": "Quay lại vay ngoài kênh chính thức chỉ vì nhanh.",
      "rui_ro": "Rơi lại vòng nợ cũ, lãi chồng lãi, uy tín và gia đình bị ảnh hưởng.",
      "cd": [
       "vay_nong"
      ]
     }
    ]
   }
  },
  {
   "ten": "Cuối năm",
   "tin_tuc": "Cận Tết, mua sắm tăng vọt nhưng giá nhập cũng nhích lên.",
   "k": 1.5,
   "cf": 1.15,
   "gia": null,
   "dan": {
    "vai": "quan",
    "ai": "Quân",
    "nd": "Tết lời to! Nhập đầy xe, tăng giá thật cao, kiếm một mẻ rồi năm sau ngồi chơi!"
   },
   "bay": {
    "loai": "cam_xuc",
    "mo": "Niềm hứng khởi cuối năm khiến em muốn kiếm thật nhiều mà quên cân nhắc cầu và chi phí."
   },
   "goi_y": [
    "Cầu tăng mạnh nhưng giá nhập cũng tăng. Lãi trên mỗi túi còn lại bao nhiêu ở từng mức giá?",
    "Ôn Lớp 12 Bài 5 và Bài 7: một kế hoạch tốt tính đến lợi nhuận, rủi ro và khoản dự phòng ra sao?",
    "Tăng giá quá cao có thể làm mất khách quen, còn nhập quá ít thì bỏ lỡ cầu. Hãy thử vài tổ hợp rồi so tổng lãi."
   ],
   "bai": [
    "12-b05",
    "12-b07"
   ],
   "sb": {
    "bo": "cua_hang",
    "nv": [
     "em",
     "khach",
     "quan"
    ],
    "noi": "quan",
    "tuy": [
     "tien"
    ]
   },
   "tinh_huong": {
    "tieu_de": "Kế hoạch thu chi của cả nhà",
    "nd": "Cuối năm, «Rau sạch Nhà em» có lãi. Cả nhà ngồi lại bên mâm cơm. Mẹ hỏi: «Tiền lãi này tính sao con? Nhà còn nợ, em sắp thi đại học, bố cũng cần được chăm sóc sức khoẻ».",
    "loi_dan": {
     "ai": "Quân",
     "nd": "Cuối năm có lãi mà không ăn mừng thì làm ăn gì! Chia nhau tiêu cho thoải mái đi, sang năm kiếm lại."
    },
    "bay": {
     "loai": "cam_xuc",
     "mo": "Niềm vui có lãi làm em muốn tiêu ngay mà quên các khoản phải lo."
    },
    "goi_y": [
     "Cả nhà có những mục tiêu tiền bạc nào (nợ, học phí, sức khoẻ), mỗi mục cần bao nhiêu?",
     "Ôn Lớp 12 Bài 7: quản lí thu, chi trong gia đình gồm những bước nào, và chia tỉ lệ ra sao?",
     "Cả «dồn hết» lẫn «tiêu hết» đều bỏ quên khoản dự phòng. Điều gì xảy ra nếu năm sau có biến cố?"
    ],
    "sb": {
     "bo": "nha",
     "nv": [
      "em",
      "me",
      "quan"
     ],
     "noi": "quan",
     "tuy": [
      "tien"
     ]
    },
    "chon": [
     {
      "nhan": "Cùng bố mẹ lập kế hoạch thu chi: trả nợ, học phí, quỹ dự phòng; mua bảo hiểm y tế đủ cho cả nhà.",
      "tot": 2,
      "d": {
       "tien": -4000,
       "tin": 3,
       "ct": 8
      },
      "bl": "Quản lí thu, chi gia đình gồm xác định mục tiêu, nguồn thu, khoản chi thiết yếu và không thiết yếu, tỉ lệ phân chia, rồi ghi chép và điều chỉnh khi thu nhập thay đổi (Lớp 12 Bài 7; Bảo hiểm: Lớp 12 Bài 3)."
     },
     {
      "nhan": "Dồn hết tiền lãi vào mở rộng kinh doanh để lớn nhanh, còn nợ cũ và các khoản khác để sau hãy tính.",
      "tot": 1,
      "d": {
       "tien": -1000,
       "tin": 0,
       "ct": -4
      },
      "bl": "Mở rộng là tốt, nhưng bỏ qua nợ và quỹ dự phòng làm gia đình thiếu an toàn tài chính; cần cân bằng giữa chi, tiết kiệm và dự phòng (Lớp 12 Bài 7).",
      "loi_sai": "Dồn hết vào kinh doanh.",
      "rui_ro": "Gia đình thiếu quỹ dự phòng, nợ cũ kéo dài, một cú sốc làm đổ vỡ cả hai."
     },
     {
      "nhan": "Chia tiền cho cả nhà tiêu thoải mái ăn mừng, cả năm vất vả rồi, sang năm tính tiếp.",
      "tot": 0,
      "d": {
       "tien": -9000,
       "tin": -2,
       "ct": -6
      },
      "bl": "Chi tiêu không theo kế hoạch dễ thâm hụt, làm mất khả năng ứng phó rủi ro (Lớp 12 Bài 7).",
      "loi_sai": "Tiêu hết trong niềm vui ăn mừng.",
      "rui_ro": "Không dự phòng, không trả nợ, năm sau thiếu tiền học phí."
     }
    ]
   }
  }
 ],
 "hau_qua": [
  {
   "co": "het_quy",
   "thang": 3,
   "d": {
    "tien": -3000,
    "tin": -2
   },
   "nd": "Quỹ dự phòng quá mỏng nên khi giá nhập nhích lên và một đơn hàng bị trả lại, em phải rút gấp tiền vốn để xoay xở (số giả định)."
  },
  {
   "co": "quy_du_phong",
   "thang": 3,
   "d": {
    "tin": 2
   },
   "nd": "Nhờ giữ quỹ dự phòng từ đầu, em xoay xở được khoản phát sinh trong tháng mà không phải vay vội hay bán gấp (số giả định)."
  },
  {
   "co": "bo_khach",
   "thang": 4,
   "d": {
    "tien": -2000,
    "tin": -8
   },
   "nd": "Chị khách quen kể chuyện bị từ chối đổi rau trong nhóm cư dân: vài hộ chuyển sang nơi khác, đơn tháng này giảm (số giả định)."
  },
  {
   "co": "tron_hang",
   "thang": 6,
   "d": {
    "tien": -7000,
    "tin": -10,
    "ct": -10
   },
   "nd": "Có khách bị đau bụng sau khi dùng rau và phản ánh lên nhóm cư dân: em phải hoàn tiền, xin lỗi và tạm dừng bán một số loại (số giả định)."
  },
  {
   "co": "ep_nguoi_lao_dong",
   "thang": 8,
   "d": {
    "tien": -4000,
    "tin": -6,
    "ct": -6
   },
   "nd": "Hai bạn giao hàng nghỉ cùng lúc và kể chuyện bị trừ công oan: em phải tuyển lại gấp và mất thêm khách (số giả định)."
  },
  {
   "co": "giem_pha",
   "thang": 4,
   "d": {
    "tin": -6
   },
   "nd": "Tin nhắn nói xấu đối thủ bị chụp màn hình và lan trong nhóm cư dân: nhiều người nghi ngờ cả hai bên."
  },
  {
   "co": "thieu_bao_ve",
   "thang": 6,
   "d": {
    "tien": -6000,
    "tin": -8,
    "ct": -8
   },
   "nd": "Một bạn giao hàng bị ngã khi giao lúc mưa. Vì không có hợp đồng và bảo hiểm, em phải tự trả viện phí và bồi thường (số giả định); bạn nghỉ việc và kể lại với nhiều người."
  },
  {
   "co": "gian_nhan",
   "thang": 7,
   "d": {
    "tin": -12
   },
   "nd": "Khách phát hiện nhãn «hữu cơ» không có chứng nhận và đăng lên nhóm cư dân: uy tín giảm, nhiều khách bỏ đi.",
   "k": 0.88
  },
  {
   "co": "tron_thue",
   "thang": 8,
   "d": {
    "tien": -9000,
    "ct": -12
   },
   "nd": "Cơ quan thuế đối chiếu và thấy số liệu của em thiếu: em phải nộp bổ sung và chịu xử lí (số giả định)."
  },
  {
   "co": "vay_nong",
   "thang": 8,
   "d": {
    "tien": -12000,
    "tin": -8,
    "ct": -8
   },
   "nd": "Chủ nợ vay nóng tìm đến đòi lãi chồng lãi và nhắn tin đe doạ (số giả định)."
  },
  {
   "co": "vay_ngan_hang",
   "thang": 8,
   "d": {
    "tien": -1500
   },
   "nd": "Em trả lãi và một phần gốc cho ngân hàng đúng hạn (số giả định)."
  },
  {
   "co": "gop_von_mieng",
   "thang": 8,
   "d": {
    "tien": -6000,
    "tin": -4
   },
   "nd": "Hai bạn góp vốn bằng lời hứa cãi nhau về phần chia lãi vì chưa ghi rõ: em phải bù tiền để giữ quan hệ (số giả định)."
  },
  {
   "co": "loi_lap",
   "thang": 4,
   "d": {
    "tien": -1500,
    "tin": -4
   },
   "nd": "Vì lần trước em chỉ hoàn tiền mà không tìm nguyên nhân, khâu che nắng và giờ giao vẫn như cũ: giữa cao điểm lễ, rau lại héo ở vài túi và hai khách phàn nàn (số giả định)."
  },
  {
   "co": "khieu_nai_leo",
   "thang": 4,
   "d": {
    "tien": -2000,
    "tin": -8
   },
   "nd": "Vì khiếu nại của chị khách quen không được trả lời, chị đăng ảnh túi rau héo lên nhóm cư dân: vài hộ chuyển sang nơi khác, đơn tháng này giảm (số giả định)."
  },
  {
   "co": "cai_nhau_mang",
   "thang": 4,
   "d": {
    "tin": -5
   },
   "nd": "Vì em đáp trả công khai trong nhóm cư dân nên tin nhắn bị chụp màn hình và lan đi: nhiều người nghi ngờ cả hai bên (số giả định)."
  },
  {
   "co": "chot_khong_xem",
   "thang": 4,
   "d": {
    "ct": -3
   },
   "nd": "Vì em quen chốt hàng mà không xem giấy tờ nguồn gốc nên khi nhà cung cấp chào lô rau giá rẻ không giấy tờ giữa cao điểm, em dễ dao động hơn (số giả định)."
  },
  {
   "co": "bo_lo_tot",
   "thang": 4,
   "d": {
    "tien": -800
   },
   "nd": "Vì em chưa kịp trả lời nhà vườn nên lô rau tốt đã bán cho nơi khác; vào cao điểm lễ em phải nhập rau với giá cao hơn (số giả định)."
  },
  {
   "co": "tan_goc",
   "thang": 4,
   "d": {
    "tin": 3
   },
   "nd": "Nhờ che nắng và đổi giờ giao sau lần khách phàn nàn, rau đến tay khách tươi hơn trong cao điểm lễ; khách quen kể lại điều đó trong nhóm cư dân (số giả định)."
  },
  {
   "co": "nhap_co_nguon",
   "thang": 4,
   "d": {
    "ct": 1
   },
   "nd": "Nhờ lần trước em xem kĩ giấy tờ nguồn gốc, nhà vườn quen vẫn ưu tiên giữ rau tốt có giấy tờ rõ ràng cho em trong cao điểm lễ, nên em đỡ phải nhập từ nguồn không rõ (số giả định)."
  }
 ],
 "ket": [
  {
   "tu": 85,
   "ten": "Chủ doanh nghiệp giỏi và đáng tin",
   "nd": "Sau một năm, «Rau sạch Nhà em» có lãi lớn, giữ được uy tín và làm đúng quy định. Em điều hành bằng số liệu và không để những lời dẫn dụ kéo đi."
  },
  {
   "tu": 65,
   "ten": "Làm ăn có lãi, còn nhiều bài học",
   "nd": "Doanh nghiệp của em vẫn đứng vững và có lãi, nhưng vài quyết định điều hành hoặc đạo đức còn vấp. Xem nhật kí để biết chỗ nên làm khác."
  },
  {
   "tu": 45,
   "ten": "Một năm lên xuống thất thường",
   "nd": "Nhiều tháng em quyết định theo cảm giác hoặc theo lời người khác, nên lãi lỗ thất thường. Chơi lại và so số liệu trước khi chọn sẽ khác hẳn."
  },
  {
   "tu": 0,
   "ten": "Qua được năm nhưng trả giá đắt",
   "nd": "Doanh nghiệp còn đó nhưng với cái giá lớn về tiền bạc, uy tín và pháp lí. Kinh doanh bằng cảm giác và lời dụ hiếm khi đi được đường dài."
  }
 ],
 "ket_som": {
  "tien": {
   "ten": "Cạn vốn, phải đóng cửa",
   "nd": "Tiền mặt không còn để xoay xở nên em phải dừng kinh doanh. Tính chi phí, lãi trên mỗi túi và hàng ế trước khi nhập là điều cần làm kĩ hơn (Lớp 12 Bài 5; Lớp 10 Bài 4)."
  },
  "tin": {
   "ten": "Mất uy tín, khách quay lưng",
   "nd": "Khách không còn tin nên cơ sở vắng dần. Trung thực và trách nhiệm là vốn quý nhất của người kinh doanh (Lớp 11 Bài 7)."
  },
  "ct": {
   "ten": "Bị đình chỉ vì vi phạm",
   "nd": "Những vi phạm chồng chất khiến em bị xử lí và phải dừng kinh doanh. Người kinh doanh luôn phải thực hiện nghĩa vụ theo quy định (Lớp 12 Bài 8)."
  }
 },
 "hau": [
  {
   "co": "het_quy",
   "nd": "Quỹ dự phòng quá mỏng từ đầu năm khiến em nhiều lần phải xoay xở gấp."
  },
  {
   "co": "quy_du_phong",
   "nd": "Quỹ dự phòng giữ từ đầu năm giúp em bình tĩnh trước những khoản phát sinh."
  },
  {
   "co": "bo_khach",
   "nd": "Việc từ chối đổi rau cho khách quen làm một số hộ không quay lại."
  },
  {
   "co": "tron_hang",
   "nd": "Việc trộn lô rau không rõ nguồn với rau tốt vẫn là vết xước trên uy tín của em."
  },
  {
   "co": "ep_nguoi_lao_dong",
   "nd": "Việc phủ nhận tiền công của bạn giao hàng làm em mất người và mất lòng tin."
  },
  {
   "co": "ke_khai_dung",
   "nd": "Sổ sách rõ ràng giúp em yên tâm khi làm việc với cơ quan thuế."
  },
  {
   "co": "tron_thue",
   "nd": "Chuyện kê khai không trung thực khiến em phải nộp bổ sung và luôn lo bị kiểm tra."
  },
  {
   "co": "bao_hiem_lao_dong",
   "nd": "Đội giao hàng gắn bó với em vì được kí hợp đồng, có bảo hiểm và được bảo đảm an toàn."
  },
  {
   "co": "thieu_bao_ve",
   "nd": "Việc không có hợp đồng và bảo hiểm cho người lao động khiến em phải trả giá khi có tai nạn."
  },
  {
   "co": "gian_nhan",
   "nd": "Vụ dán nhãn «hữu cơ» không đúng sự thật vẫn là vết xước trên tên thương hiệu của em."
  },
  {
   "co": "giem_pha",
   "nd": "Tin nhắn nói xấu đối thủ làm cư dân nghi ngờ cả em."
  },
  {
   "co": "vay_nong",
   "nd": "Khoản vay nóng khiến em mất tiền và mất bình yên."
  },
  {
   "co": "vay_ngan_hang",
   "nd": "Khoản vay ngân hàng có kế hoạch giúp em mở rộng mà vẫn trả nợ đúng hạn."
  },
  {
   "co": "tan_goc",
   "nd": "Việc tìm đúng nguyên nhân rau héo và sửa tận gốc giúp em giữ được khách quen."
  },
  {
   "co": "loi_lap",
   "nd": "Chỉ hoàn tiền mà không tìm nguyên nhân khiến lỗi rau héo lặp lại đúng lúc cao điểm."
  },
  {
   "co": "khieu_nai_leo",
   "nd": "Việc bỏ mặc khiếu nại của khách quen khiến chuyện nhỏ thành chuyện lớn trong nhóm cư dân."
  },
  {
   "co": "cai_nhau_mang",
   "nd": "Cuộc đáp trả nhau trong nhóm cư dân làm người ta nghi ngờ cả hai bên."
  },
  {
   "co": "chot_khong_xem",
   "nd": "Thói quen chốt hàng mà không xem giấy tờ nguồn gốc khiến em dễ dao động trước lô rau giá rẻ."
  },
  {
   "co": "bo_lo_tot",
   "nd": "Để lỡ lô rau tốt của nhà vườn khiến em phải nhập giá cao ở cao điểm."
  },
  {
   "co": "nhap_co_nguon",
   "nd": "Thói quen xem giấy tờ nguồn gốc trước khi nhập giúp em có nguồn rau đáng tin."
  }
 ]
};
