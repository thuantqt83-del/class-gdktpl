/* Lớp học thông minh · HÀNH TRÌNH «PHÁP LUẬT QUANH TA» — trò chơi pháp luật nhiều chương, đi xuyên Lớp 10 → 11 → 12.
   Em là một học sinh sống ở khu phố Hoà Bình; mỗi chương ứng với một lớp, kết thúc bằng lá phiếu đầu tiên lúc tròn 18 tuổi. Quyết định ở chương trước để lại «dấu vết» (cờ) làm thay đổi tình huống chương sau.
   Quy ước giống hanhtrinh_kt.js: tot 2/1/0; d = chỉ số; cd/xd = đặt/bỏ cờ; di = cảnh kế; them = kể thêm theo cờ; chuyen = lời nối chương; hau = «hậu vận» ở màn kết.
   Lời bình CHỈ dùng nguyên tắc có trong bài đã duyệt (ghi Lớp, Bài); không nêu mức phạt; tên người, địa danh trong truyện là tượng trưng.
   THIẾT KẾ LẠI 19/11/2026: mỗi cảnh có loi_dan (lời dẫn dụ của nhân vật = BẪY), bay {loai, mo}, goi_y (3 cấp, KHÔNG nêu đáp án); mỗi phương án không phải tốt nhất có loi_sai và rui_ro (Trợ giảng phân tích sau khi chọn).
   Phương án đúng KHÔNG được dài hay chi tiết hơn các phương án khác (kiểm bằng _cong-cu/game/kiem_hanhtrinh.js). */
SC.data.game = SC.data.game || {};
SC.data.game.hanhtrinh = SC.data.game.hanhtrinh || [];
SC.data.game.hanhtrinh.push({
 "id": "phap-luat-quanh-ta",
 "nhom": "pl",
 "ten": "Pháp luật quanh ta",
 "mau": "#7a3fc4",
 "cap_nhat": "23/11/2026",
 "duyet": "chưa",
 "icon": "users",
 "khau_hieu": "Từ tấm kính vỡ năm lớp 10 đến lá phiếu đầu tiên lúc 18 tuổi",
 "gioi_thieu": "Khu phố Hoà Bình nhỏ thôi, nhưng chuyện gì cũng có: tấm kính vỡ, cái hàng rào, bản quy ước, tin đồn, bãi rác, nhà trọ… Qua ba năm, em chọn cách đứng trước từng chuyện, và pháp luật hiện ra không phải trong sách mà trong cuộc sống.",
 "chi_so": [
  {
   "id": "pl",
   "ten": "Tuân thủ pháp luật",
   "dau": 50
  },
  {
   "id": "dd",
   "ten": "Danh dự và uy tín",
   "dau": 50
  },
  {
   "id": "tc",
   "ten": "Sự tin cậy của mọi người",
   "dau": 50
  }
 ],
 "chuong": [
  {
   "khoi": 10,
   "ten": "Luật chơi chung",
   "thoi_gian": "Lớp 10",
   "mo": "Lớp 10. Em ở khu phố Hoà Bình cùng bà ngoại và bố mẹ. Chuyện ở đây bé thôi: một tấm kính vỡ, một cái hàng rào, một bản quy ước, một tin đồn. Nhưng em sắp hiểu mỗi chuyện bé đều có luật của nó.",
   "bai": [
    "10-b11",
    "10-b12",
    "10-b13",
    "10-b16",
    "10-b20",
    "10-b21"
   ],
   "co_mac_dinh": [],
   "bat_dau": "p1",
   "canh": {
    "p1": {
     "tieu_de": "Quả bóng và tấm kính",
     "nd": "Chiều chủ nhật, Quân, con chủ nhà hàng lớn trong khu mà ai cũng nể, đá bóng làm vỡ kính cửa hàng tạp hoá của bác Sáu. Quân kéo em ra góc: «Bố tao sẽ đền tiền, mày mà nói ra thì liệu hồn». Bác Sáu hỏi cả nhóm: «Đứa nào làm vỡ?».",
     "chon": [
      {
       "nhan": "Nói thật với bác Sáu ai làm vỡ, khuyên Quân nhận lỗi; nếu còn bị doạ thì kể với thầy cô.",
       "tot": 2,
       "d": {
        "pl": 6,
        "dd": 6,
        "tc": 8
       },
       "cd": [
        "noi_that"
       ],
       "bl": "Pháp luật áp dụng cho mọi người như nhau, không phân biệt địa vị; người gây thiệt hại phải tự chịu trách nhiệm về nghĩa vụ của mình. Nói thật và giải quyết đúng cách vừa công bằng vừa giữ được tình làng nghĩa xóm (Lớp 10 Bài 11; Lớp 11 Bài 9).",
       "di": "p2"
      },
      {
       "nhan": "Im lặng, không nói gì; chuyện này người lớn sẽ tự giải quyết với nhau, mình đừng dính vào.",
       "tot": 1,
       "d": {
        "tc": -4,
        "dd": -2,
        "pl": -2
       },
       "cd": [
        "im_lang"
       ],
       "bl": "Sợ hãi là dễ hiểu, nhưng im lặng để người gây thiệt hại không phải chịu trách nhiệm là bỏ qua tính công bằng của pháp luật. Bị đe doạ thì nên báo cho người có trách nhiệm (Lớp 10 Bài 11; Lớp 11 Bài 9).",
       "di": "p2",
       "loi_sai": "Im lặng vì sợ bị Quân trả thù.",
       "rui_ro": "Người gây thiệt hại không phải chịu trách nhiệm, bác Sáu chịu thiệt, em vẫn bị Quân nhắm tới."
      },
      {
       "nhan": "Nói là có một bạn lạ đi ngang qua làm vỡ, vừa không hại Quân vừa không phải dính vào.",
       "tot": 0,
       "d": {
        "tc": -10,
        "dd": -8,
        "pl": -4
       },
       "cd": [
        "noi_doi"
       ],
       "bl": "Khai gian để che cho người khác làm sai lệch sự thật, khiến việc xác định trách nhiệm không công bằng. Mọi người đều có nghĩa vụ tuân thủ pháp luật như nhau (Lớp 10 Bài 11, Bài 13).",
       "di": "p2",
       "loi_sai": "Nói dối để che cho người khác.",
       "rui_ro": "Làm sai sự thật, có thể bị lộ, mất niềm tin của bác Sáu và cả khu phố."
      }
     ],
     "loi_dan": {
      "ai": "Bạn cùng nhóm",
      "nd": "Thôi bỏ qua đi, nói ra là Quân ghét mày cả năm đấy. Bố nó sẽ đền, đâu ai thiệt gì."
     },
     "bay": {
      "loai": "so_mat",
      "mo": "Sợ bị Quân trả thù khiến em muốn né tránh thay vì nói sự thật."
     },
     "goi_y": [
      "Nếu em nói thật hoặc im lặng, ai sẽ phải chịu trách nhiệm về tấm kính, và bác Sáu nghĩ gì?",
      "Ôn Lớp 10 Bài 11 và Lớp 11 Bài 9: pháp luật áp dụng với mọi người như thế nào, dù người đó là con của ai?",
      "Nỗi sợ bị trả thù đang đẩy cả hai cách nghĩ về phía né tránh. Còn cách nào giữ em an toàn mà không bao che?"
     ],
     "sb": {
      "bo": "ngo_xom",
      "nv": [
       "em",
       "quan",
       "ban|Bạn cùng nhóm"
      ],
      "noi": "ban",
      "tuy": [
       "kinh_vo"
      ]
     }
    },
    "p2": {
     "tieu_de": "Bản quy ước khu phố",
     "nd": "Tổ dân phố họp soạn quy ước mới. Một điều khiến mọi người xôn xao: «Người từ nơi khác đến thuê nhà dưới sáu tháng phải được tổ trưởng đồng ý mới được ở». Bác Sáu, tổ trưởng, mời em, đại diện thanh niên của khu, góp ý.",
     "chon": [
      {
       "nhan": "Góp ý đề nghị bỏ điều đó, vì quy ước không được trái quyền tự do cư trú trong Hiến pháp.",
       "tot": 2,
       "d": {
        "pl": 6,
        "dd": 6,
        "tc": 6
       },
       "cd": [
        "gop_y_dung"
       ],
       "bl": "Văn bản do cấp dưới ban hành phải phù hợp, không trái Hiến pháp và văn bản cấp trên; Hiến pháp ghi nhận quyền tự do đi lại, cư trú và quyền có nơi ở hợp pháp (Lớp 10 Bài 11, Bài 16).",
       "di": "p3"
      },
      {
       "nhan": "Ngồi im, vì mình còn nhỏ, người lớn đã bàn thì mình không nên xen vào làm gì.",
       "tot": 1,
       "d": {
        "tc": -2,
        "dd": -2
       },
       "bl": "Công dân có quyền tham gia thảo luận, kiến nghị về vấn đề của cơ sở; học sinh nên chủ động tìm hiểu quy định và góp ý đúng mực (Lớp 11 Bài 13; Lớp 10 Bài 16).",
       "di": "p3",
       "loi_sai": "Im lặng trước quy định có vấn đề.",
       "rui_ro": "Điều khoản vẫn được thông qua, người thuê nhà bị hạn chế quyền."
      },
      {
       "nhan": "Vỗ tay ủng hộ, ai lạ thì cấm cho khu phố an ninh, bác tổ trưởng chắc chắn có lí do.",
       "tot": 0,
       "d": {
        "pl": -6,
        "dd": -4,
        "tc": -4
       },
       "bl": "Hạn chế quyền cư trú của người khác bằng quy định tự đặt là trái Hiến pháp. Quyền con người, quyền công dân được pháp luật thừa nhận và bảo vệ (Lớp 10 Bài 16, Bài 11).",
       "di": "p3",
       "loi_sai": "Ủng hộ quy định hạn chế quyền cư trú.",
       "rui_ro": "Quy định trái Hiến pháp tồn tại, em góp phần làm sai pháp luật."
      }
     ],
     "loi_dan": {
      "ai": "Bác Sáu",
      "nd": "Quy ước này là vì an ninh khu phố. Cháu còn nhỏ, người lớn bàn kĩ rồi, cháu cứ giơ tay là được."
     },
     "bay": {
      "loai": "uy_quyen",
      "mo": "Người có chức vụ nói «cứ gật» khiến em tin vào người nói mà không xét điều được nói."
     },
     "goi_y": [
      "Điều khoản này giới hạn quyền của ai, và ai có thẩm quyền quyết định điều đó?",
      "Ôn Lớp 10 Bài 11 và Bài 16: văn bản cấp dưới có được trái Hiến pháp không, Hiến pháp ghi nhận quyền gì về cư trú?",
      "Lí lẽ «người lớn đã bàn, cháu cứ gật» dựa vào ai nói, không dựa vào việc điều đó có đúng hay không."
     ],
     "sb": {
      "bo": "uy_ban",
      "nv": [
       "em",
       "bac_sau"
      ],
      "noi": "bac_sau",
      "tuy": [
       "giay"
      ]
     }
    },
    "p3": {
     "tieu_de": "Đi đúng cửa",
     "nd": "Bà ngoại cãi nhau với nhà hàng xóm chuyện hàng rào: nhà bên xây lấn sang ranh giới mấy chục phân. Bà giận run: «Mai bà phá rào cho xong!». Em nhớ cô giáo từng kể về các cơ quan nhà nước và hiểu rằng chuyện này phải đi đúng cửa.",
     "chon": [
      {
       "nhan": "Cùng bà gom giấy tờ đất, đến Uỷ ban nhân dân xã, phường nhờ hướng dẫn và xem xét giải quyết.",
       "tot": 2,
       "d": {
        "pl": 8,
        "tc": 4,
        "dd": 2
       },
       "cd": [
        "dung_cua"
       ],
       "bl": "Uỷ ban nhân dân cấp xã trực tiếp quản lí đời sống dân cư và giải quyết thủ tục hành chính như đất đai, hộ tịch; Toà án nhân dân giải quyết các vụ án dân sự, bảo vệ quyền và lợi ích hợp pháp (Lớp 10 Bài 20, Bài 21).",
       "di": "t1"
      },
      {
       "nhan": "Làm đơn gửi thẳng Viện kiểm sát nhân dân, cơ quan to nhất, chắc chắn sẽ có người giải quyết.",
       "tot": 1,
       "d": {
        "pl": 2,
        "tc": -2
       },
       "bl": "Viện kiểm sát thực hành quyền công tố và kiểm sát hoạt động tư pháp, không phải nơi nhận giải quyết tranh chấp ranh đất. Chọn đúng cơ quan giúp việc được giải quyết nhanh và đúng thẩm quyền (Lớp 10 Bài 20).",
       "di": "t1",
       "loi_sai": "Gửi nhầm cơ quan.",
       "rui_ro": "Đơn bị chuyển đi hoặc không được giải quyết, tranh chấp kéo dài."
      },
      {
       "nhan": "Cùng bà phá hàng rào tối nay cho xong, đất nhà mình mà, bà ở đây cả đời rồi còn gì.",
       "tot": 0,
       "d": {
        "pl": -10,
        "dd": -6,
        "tc": -6
       },
       "cd": [
        "pha_rao"
       ],
       "bl": "Tự giải quyết bằng cách xâm phạm tài sản người khác là vi phạm. Pháp luật là phương tiện để giải quyết tranh chấp và bảo vệ quyền, lợi ích hợp pháp (Lớp 10 Bài 11, Bài 13).",
       "di": "t1",
       "loi_sai": "Tự phá hàng rào khi đang giận.",
       "rui_ro": "Bà và em vi phạm, phải bồi thường, quan hệ hàng xóm tan vỡ."
      }
     ],
     "loi_dan": {
      "ai": "Bà ngoại",
      "nd": "Nó lấn thì bà phá rào, cần gì giấy tờ! Bà ở đây cả đời rồi, ai dám nói đất này không phải của bà."
     },
     "bay": {
      "loai": "cam_xuc",
      "mo": "Cơn giận và thương bà làm em muốn giải quyết ngay bằng cách đơn giản nhất."
     },
     "goi_y": [
      "Tranh chấp ranh giới đất thuộc cơ quan nào giải quyết trước, và em cần mang theo gì?",
      "Ôn Lớp 10 Bài 20 và Bài 21: Viện kiểm sát, Toà án và Uỷ ban nhân dân cấp xã mỗi nơi làm việc gì?",
      "Cơ quan «to hơn» chưa chắc là cơ quan đúng, và cơn giận chưa chắc có lợi cho bà."
     ],
     "sb": {
      "bo": "ngo_xom",
      "nv": [
       "em",
       "ba|Bà ngoại"
      ],
      "noi": "ba",
      "tuy": [
       "rao"
      ]
     }
    },
    "t1": {
     "tieu_de": "Phiên toà công khai",
     "nd": "Cô giáo tổ chức cho cả lớp dự một phiên toà dân sự xét xử công khai ở Toà án nhân dân khu vực: ông N kiện một công ty vì không bàn giao nhà đúng hạn như đã cam kết (tên tượng trưng). Đứng chờ ở sân toà, Quân khoe: «Bố mình quen một người trong toà, nhờ một tiếng là bên nào cũng thắng được». Cả nhóm quay sang nhìn em.",
     "chon": [
      {
       "nhan": "Nói với Quân là Toà án xét xử dựa vào pháp luật và chứng cứ, rồi cùng nhóm vào theo dõi xem thủ tục diễn ra thế nào.",
       "tot": 2,
       "d": {
        "pl": 6,
        "dd": 4,
        "tc": 6
       },
       "cd": [
        "tin_phap_luat"
       ],
       "bl": "Toà án nhân dân là cơ quan xét xử, bảo vệ công lí, quyền con người, quyền công dân; vụ án dân sự được hoà giải, thu thập chứng cứ, xét xử công khai và tuyên án căn cứ pháp luật, còn pháp luật áp dụng với mọi người như nhau (Lớp 10 Bài 20, Bài 11).",
       "di": "p4"
      },
      {
       "nhan": "Không nói gì, vì chuyện nhà Quân chẳng liên quan đến mình, chỉ chăm chú ghi chép bài cô giao khi vào phiên toà theo dõi.",
       "tot": 1,
       "d": {
        "tc": -2,
        "dd": -2
       },
       "bl": "Im lặng thì không sai trực tiếp, nhưng cách nghĩ «quen một tiếng là xong» không được góp ý sẽ tiếp tục lan; hiểu đúng vai trò của Toà án giúp nhóm không hiểu lầm về công lí (Lớp 10 Bài 20).",
       "di": "p4",
       "loi_sai": "Im lặng trước cách nghĩ sai về Toà án.",
       "rui_ro": "Cả nhóm có thể tin rằng quan hệ quyết định kết quả vụ án."
      },
      {
       "nhan": "Hùa theo Quân, hỏi xin cách nhờ người quen để lần sau nhà mình có việc cũng nhờ cho chắc, khỏi mất công chuẩn bị gì.",
       "tot": 0,
       "d": {
        "pl": -8,
        "dd": -6,
        "tc": -6
       },
       "cd": [
        "tin_quen_biet"
       ],
       "bl": "Nhờ quan hệ để tác động đến kết quả vụ án đi ngược nguyên tắc Toà án bảo vệ công lí và áp dụng pháp luật như nhau với mọi người; chuẩn bị chứng cứ và theo đúng thủ tục mới là cách làm đúng (Lớp 10 Bài 20, Bài 11).",
       "di": "p4",
       "loi_sai": "Tin vào quen biết thay vì thủ tục và chứng cứ.",
       "rui_ro": "Em hiểu sai về công lí, có thể rơi vào việc làm sai pháp luật khi gặp chuyện thật."
      }
     ],
     "loi_dan": {
      "ai": "Quân",
      "nd": "Cứ nhờ người quen là xong, chứng cứ với thủ tục chỉ là hình thức thôi! Nhà mình toàn làm vậy, ai cũng biết."
     },
     "bay": {
      "loai": "uy_quyen",
      "mo": "Người có «quen biết» nói như chuyện hiển nhiên khiến em tin vào quan hệ hơn là vào thủ tục và chứng cứ."
     },
     "goi_y": [
      "Trong một phiên toà, ông N và công ty đưa ra điều gì để được xem xét, và ai có thể ngồi nghe một phiên toà công khai?",
      "Ôn Lớp 10 Bài 20 và Bài 11: Toà án làm những việc gì để giải quyết một vụ án dân sự, và pháp luật được áp dụng với mọi người như thế nào?",
      "«Quen một tiếng là xong» chỉ nói về quan hệ, không nói gì về chứng cứ hay pháp luật. Hãy hỏi: nếu mọi chuyện do quan hệ quyết định thì ai bảo vệ người không có quan hệ?"
     ],
     "sb": {
      "bo": "uy_ban",
      "nv": [
       "em",
       "quan",
       "ban|Bạn cùng nhóm"
      ],
      "noi": "quan",
      "tuy": [
       "giay"
      ]
     }
    },
    "p4": {
     "tieu_de": "Chiếc cặp của Lan",
     "nd": "Lan, bạn thân của em, nói nhỏ: bố mẹ bảo cuối kì này Lan nghỉ học đi làm phụ giúp gia đình, vì «con gái học nhiều làm gì». Lan khóc: «Tớ không biết phải làm sao nữa».",
     "chon": [
      {
       "nhan": "Cùng Lan nhờ cô chủ nhiệm gặp bố mẹ Lan, nói về quyền học tập và các hỗ trợ cho học sinh khó khăn.",
       "tot": 2,
       "d": {
        "pl": 4,
        "dd": 4,
        "tc": 8
       },
       "cd": [
        "giup_lan"
       ],
       "bl": "Học tập vừa là quyền vừa là nghĩa vụ của công dân; nam, nữ bình đẳng về quyền. Nhờ người có trách nhiệm cùng giải quyết là cách thực hiện quyền đúng cách (Lớp 10 Bài 16; Lớp 12 Bài 11).",
       "di": "p5"
      },
      {
       "nhan": "Khuyên Lan nghe lời bố mẹ, vì đó là chuyện của gia đình bạn, mình là người ngoài không nên can thiệp vào.",
       "tot": 1,
       "d": {
        "tc": -2,
        "dd": -2
       },
       "bl": "Gia đình có quyền chăm lo con, nhưng quyền học tập của Lan vẫn được pháp luật bảo vệ. Một lời khuyên vội vã có thể làm bạn mất cơ hội (Lớp 10 Bài 16).",
       "di": "p5",
       "loi_sai": "Né tránh vì cho đó là chuyện riêng.",
       "rui_ro": "Lan có thể phải nghỉ học thật, em mất cơ hội giúp bạn."
      },
      {
       "nhan": "Đăng ẩn danh lên mạng kể chuyện nhà Lan để mọi người cùng góp ý, biết đâu bố mẹ bạn ấy sẽ nghe theo.",
       "tot": 0,
       "d": {
        "dd": -6,
        "tc": -8,
        "pl": -4
       },
       "bl": "Công kích cá nhân trên mạng xâm phạm danh dự, nhân phẩm người khác và không giải quyết được vấn đề. Mọi người đều được pháp luật bảo hộ về danh dự, nhân phẩm (Lớp 10 Bài 16).",
       "di": "p5",
       "loi_sai": "Công khai chuyện riêng của bạn trên mạng.",
       "rui_ro": "Xâm phạm đời tư của Lan, bố mẹ bạn thêm giận, vấn đề không được giải quyết."
      }
     ],
     "loi_dan": {
      "ai": "Bố Lan",
      "nd": "Con gái học cho lắm cũng thế, chú lo cho nó. Cháu đừng xen vào chuyện nhà chú, ai cũng biết con gái nên sớm đỡ đần."
     },
     "bay": {
      "loai": "uy_quyen",
      "mo": "Lời của người lớn trong nhà khiến em nghĩ mình không có quyền can dự."
     },
     "goi_y": [
      "Lan có quyền gì về học tập, và ai có thể cùng em giúp bạn một cách an toàn?",
      "Ôn Lớp 10 Bài 16: quyền học tập và bình đẳng giữa nam và nữ.",
      "«Chuyện nhà người ta» và «đưa lên mạng cho mọi người phán xét» đều là cách tránh ngồi nói chuyện trực tiếp."
     ],
     "sb": {
      "bo": "truong",
      "nv": [
       "em",
       "lan",
       "bo_lan"
      ],
      "noi": "bo_lan",
      "tuy": []
     }
    },
    "p5": {
     "tieu_de": "Luật mới «từ ngày mai»",
     "nd": "Nhóm chat lớp rần rần: ảnh chụp màn hình «Luật mới: từ ngày mai học sinh bị cấm dùng điện thoại ngoài giờ học, vi phạm sẽ bị phạt». Ảnh không ghi cơ quan ban hành, không có số hiệu văn bản. Minh nhắn: «Chia sẻ đi, kẻo mọi người không biết!».",
     "chon": [
      {
       "nhan": "Chưa chia sẻ; tìm văn bản gốc trên nguồn chính thống, không thấy thì nhắn nhóm là chưa có căn cứ.",
       "tot": 2,
       "d": {
        "pl": 4,
        "dd": 4,
        "tc": 8
       },
       "cd": [
        "kiem_chung"
       ],
       "bl": "Văn bản pháp luật phải do cơ quan có thẩm quyền ban hành theo trình tự, thủ tục, hình thức luật định; vì vậy cần kiểm tra nguồn trước khi tin hoặc chia sẻ (Lớp 10 Bài 11, Bài 12).",
       "di": "ket"
      },
      {
       "nhan": "Tin là thật, nhắn nhóm «cẩn thận kẻo bị phạt» nhưng chưa chuyển tấm ảnh cho ai khác để khỏi sai sót.",
       "tot": 1,
       "d": {
        "tc": -4,
        "dd": -2
       },
       "bl": "Tin vào thông tin không có nguồn dễ làm mình và người khác hiểu sai. Một quy định chỉ có hiệu lực khi được ban hành đúng thẩm quyền và hình thức (Lớp 10 Bài 11).",
       "di": "ket",
       "loi_sai": "Tin vào nội dung chưa kiểm chứng.",
       "rui_ro": "Gây hoang mang, lan truyền tin sai khi người khác hỏi lại, em mất uy tín."
      },
      {
       "nhan": "Chia sẻ ngay cho cả khối, cả lớp đều share rồi, chậm một chút thì mọi người bị phạt oan.",
       "tot": 0,
       "d": {
        "tc": -8,
        "dd": -6,
        "pl": -4
       },
       "bl": "Chia sẻ thông tin chưa kiểm chứng làm tin sai lan rộng. Học sinh cần kiểm tra thông tin trước khi chia sẻ (Lớp 10 Bài 11, Bài 12; Lớp 11 Bài 20).",
       "di": "ket",
       "loi_sai": "Chia sẻ tin sai theo số đông.",
       "rui_ro": "Tin giả lan rộng, em là một mắt xích, mất uy tín và có thể bị nhà trường nhắc nhở."
      }
     ],
     "loi_dan": {
      "ai": "Minh",
      "nd": "Share đi! Ai cũng share rồi, chậm là mọi người bị phạt oan đấy. Cứ chia sẻ trước, đúng sai tính sau."
     },
     "bay": {
      "loai": "so_dong",
      "mo": "Thấy ai cũng chia sẻ nên em coi tin đó là đáng tin."
     },
     "goi_y": [
      "Tấm ảnh thiếu những thông tin nào mà một văn bản pháp luật thật phải có?",
      "Ôn Lớp 10 Bài 11 và Bài 12: văn bản pháp luật do ai ban hành, theo trình tự nào?",
      "Số đông chia sẻ không làm cho tin trở thành thật. Hãy hỏi: ai đã kiểm tra nguồn?"
     ],
     "sb": {
      "bo": "mang",
      "nv": [
       "em",
       "minh"
      ],
      "noi": "minh",
      "tuy": []
     }
    }
   },
   "chuyen": [
    {
     "nd": "Hết lớp 10. Tấm kính được thay mới, hàng rào được đo lại, tin đồn lặng dần. Em hiểu ra pháp luật không chỉ nằm trong sách mà nằm trong từng chuyện nhỏ ở khu phố. Lên lớp 11, những chuyện ấy lớn hơn."
    },
    {
     "co": "noi_that",
     "nd": "Bác Sáu nhìn em bằng ánh mắt khác: «Thằng bé này nói thật». Cả khu phố đều biết điều đó."
    },
    {
     "co": "noi_doi",
     "nd": "Chuyện em nói dối về tấm kính vỡ vẫn lẩn khuất đâu đó, dù chưa ai nhắc."
    },
    {
     "co": "giup_lan",
     "nd": "Lan vẫn đi học đều, và luôn nhớ ơn em."
    }
   ]
  },
  {
   "khoi": 11,
   "ten": "Quyền đi cùng nghĩa vụ",
   "thoi_gian": "Lớp 11",
   "mo": "Lớp 11. Em biết nhiều hơn, và người trong khu phố bắt đầu hỏi em: «Cháu học pháp luật, vậy chuyện này làm sao?». Lời hỏi ấy vừa vui vừa nặng, vì mỗi lời khuyên của em có thể thay đổi cuộc sống của người khác.",
   "bai": [
    "11-b14",
    "11-b18",
    "11-b10",
    "11-b13",
    "11-b17",
    "11-b08"
   ],
   "co_mac_dinh": [],
   "bat_dau": "q1",
   "canh": {
    "q1": {
     "tieu_de": "Lá phiếu của bà",
     "nd": "Ngày bầu cử ở phường. Bà ngoại em hơn tám mươi tuổi, mắt kém, không biết chữ. Bà dúi thẻ cử tri vào tay em: «Con đi bầu giùm bà, bà biết bầu ai rồi». Em chưa đủ tuổi bầu cử.",
     "chon": [
      {
       "nhan": "Dắt bà đến điểm bầu cử, nhờ người của tổ bầu cử viết giúp, để bà tự tay bỏ phiếu.",
       "tot": 2,
       "d": {
        "pl": 6,
        "tc": 6,
        "dd": 2
       },
       "cd": [
        "ba_tu_bo_phieu"
       ],
       "bl": "Cử tri phải tự mình đi bầu; người không tự viết được phiếu có thể nhờ người khác viết hộ nhưng phải tự bỏ phiếu (Lớp 11 Bài 14).",
       "di": "q2"
      },
      {
       "nhan": "Cầm thẻ của bà đi bầu thay, ghi đúng ý bà đã dặn, để bà khỏi vất vả đi lại.",
       "tot": 0,
       "d": {
        "pl": -10,
        "dd": -6,
        "tc": -4
       },
       "cd": [
        "bau_thay"
       ],
       "bl": "Nhờ người khác bỏ phiếu thay là trái nguyên tắc cử tri tự mình đi bầu; mọi hành vi gian lận trong bầu cử có thể bị xử lí (Lớp 11 Bài 14).",
       "di": "q2",
       "loi_sai": "Bỏ phiếu thay người khác.",
       "rui_ro": "Vi phạm nguyên tắc cử tri tự mình đi bầu, phiếu có thể bị coi là gian lận, em liên quan trách nhiệm."
      },
      {
       "nhan": "Để bà ở nhà năm nay vì bà yếu, nhà mình thiếu một phiếu cũng chẳng ảnh hưởng gì.",
       "tot": 1,
       "d": {
        "tc": -2
       },
       "bl": "Bầu cử là quyền quan trọng của công dân. Nếu gặp khó khăn, nên tìm hiểu cách thực hiện đúng quy định thay vì bỏ lỡ quyền (Lớp 11 Bài 14).",
       "di": "q2",
       "loi_sai": "Để bà bỏ lỡ quyền bầu cử.",
       "rui_ro": "Bà không thực hiện được quyền dù có cách được giúp đúng quy định."
      }
     ],
     "loi_dan": {
      "ai": "Bà ngoại",
      "nd": "Bà biết bầu ai rồi. Con cầm thẻ đi bầu giùm bà cho nhanh, bà đi lại khó, ra đó đông người mệt lắm."
     },
     "bay": {
      "loai": "cam_xuc",
      "mo": "Thương bà và muốn tiện cho cả nhà khiến em làm thay quyền của bà."
     },
     "goi_y": [
      "Quyền bỏ phiếu của bà thuộc về ai, và bà cần được giúp ở khâu nào?",
      "Ôn Lớp 11 Bài 14: cử tri phải làm gì khi không tự viết được phiếu?",
      "Thương bà và tiện cho cả nhà đang dẫn đến hai cách làm thay hoặc bỏ qua quyền của bà."
     ],
     "sb": {
      "bo": "phong_bau",
      "nv": [
       "em",
       "ba|Bà ngoại"
      ],
      "noi": "ba",
      "tuy": [
       "giay"
      ]
     }
    },
    "q2": {
     "tieu_de": "Chiếc chìa khoá thứ hai",
     "nd": "Anh Dũng, người thân của em, thuê phòng trọ của chị Mai. Hôm nay anh gọi, giọng bực: chị chủ trọ đã dùng chìa khoá dự phòng tự mở cửa vào phòng khi anh đi vắng «để kiểm tra điện nước», và lắp một chiếc camera ngay đối diện cửa phòng anh. Anh hỏi: «Chị ấy làm vậy có được không?».",
     "them": [
      {
       "co": "noi_that",
       "nd": "Chị Mai biết em từ vụ tấm kính vỡ năm xưa nên chị nể lời em hơn."
      }
     ],
     "chon": [
      {
       "nhan": "Cùng anh Dũng nói rõ với chị Mai: không ai tự ý vào phòng khi chưa được đồng ý, bàn lại cách kiểm tra.",
       "tot": 2,
       "d": {
        "pl": 6,
        "tc": 6,
        "dd": 4
       },
       "cd": [
        "bao_ve_cho_o"
       ],
       "bl": "Mọi người có quyền bất khả xâm phạm về chỗ ở; không ai được tự ý vào chỗ ở của người khác nếu người đó chưa đồng ý (Lớp 11 Bài 18).",
       "di": "q3"
      },
      {
       "nhan": "Lén thay ổ khoá, không nói với chị Mai, để chị không còn vào phòng được nữa là xong chuyện, đỡ cãi nhau.",
       "tot": 1,
       "d": {
        "pl": -2,
        "tc": -2
       },
       "bl": "Bảo vệ chỗ ở của mình là cần thiết, nhưng làm lén và không trao đổi dễ gây mâu thuẫn và vi phạm thoả thuận thuê; nên nói rõ và thoả thuận lại trước (Lớp 11 Bài 18).",
       "di": "q3",
       "loi_sai": "Đổi khoá lén, không trao đổi.",
       "rui_ro": "Mâu thuẫn leo thang, chị Mai có thể coi là vi phạm thoả thuận thuê, anh Dũng mất chỗ trọ."
      },
      {
       "nhan": "Rủ anh Dũng vào phòng chị Mai lúc chị vắng xem chị giấu gì, cho chị biết thế nào là khó chịu.",
       "tot": 0,
       "d": {
        "pl": -10,
        "dd": -6,
        "tc": -6
       },
       "bl": "Tự ý xâm nhập chỗ ở của người khác là hành vi bị cấm, dù người kia sai trước; trả đũa chỉ khiến mình vi phạm theo (Lớp 11 Bài 18).",
       "di": "q3",
       "loi_sai": "Xâm nhập chỗ ở của người khác để trả đũa.",
       "rui_ro": "Em và anh Dũng cũng vi phạm, mất lợi thế, có thể bị xử lí."
      }
     ],
     "loi_dan": {
      "ai": "Anh Dũng",
      "nd": "Chị Mai là chủ nhà, chắc có quyền vào kiểm tra. Mình cố chịu thôi, nói ra lỡ chị đuổi thì mất chỗ trọ."
     },
     "bay": {
      "loai": "so_mat",
      "mo": "Sợ mất chỗ trọ khiến anh em chấp nhận việc không đúng."
     },
     "goi_y": [
      "Phòng anh Dũng đang thuê có được coi là chỗ ở của anh ấy không, và ai được phép vào?",
      "Ôn Lớp 11 Bài 18: quyền bất khả xâm phạm về chỗ ở nói gì về việc vào chỗ ở của người khác?",
      "«Chủ nhà thì có quyền» và «trả đũa cho hả giận» đều bỏ qua việc trao đổi và thoả thuận rõ ràng."
     ],
     "sb": {
      "bo": "tro",
      "nv": [
       "em",
       "anh_dung"
      ],
      "noi": "anh_dung",
      "tuy": [
       "camera"
      ]
     }
    },
    "q3": {
     "tieu_de": "Tin tuyển dụng «chỉ nhận nam»",
     "nd": "Chị Hà, chị họ em, vừa tốt nghiệp. Chị đưa em xem tin tuyển nhân viên kinh doanh: «Chỉ nhận nam; nữ làm được nhưng lương thấp hơn». Chị buồn: «Chắc ngành này vậy đó em».",
     "chon": [
      {
       "nhan": "Nói với chị Hà là nam nữ bình đẳng khi tuyển dụng; cùng lưu tin và gửi phản ánh đến cơ quan có thẩm quyền.",
       "tot": 2,
       "d": {
        "pl": 4,
        "dd": 4,
        "tc": 6
       },
       "cd": [
        "binh_dang"
       ],
       "bl": "Nam, nữ bình đẳng về tiêu chuẩn tuyển dụng, về việc làm và tiền công; công việc có giá trị như nhau được trả lương như nhau. Phản ánh hành vi vi phạm đến cơ quan có thẩm quyền là cách làm đúng (Lớp 11 Bài 10, Bài 15).",
       "di": "c1"
      },
      {
       "nhan": "Khuyên chị nộp hồ sơ và chịu mức lương thấp hơn, vì ngành nào cũng thế, kêu ca chỉ mất việc và mất lòng người ta.",
       "tot": 1,
       "d": {
        "tc": -2,
        "dd": -2
       },
       "bl": "Chấp nhận sự bất bình đẳng làm nó tiếp diễn. Mọi người có quyền được đối xử bình đẳng trong lao động (Lớp 11 Bài 10).",
       "di": "c1",
       "loi_sai": "Chấp nhận bất bình đẳng vì cho rằng phổ biến.",
       "rui_ro": "Chị Hà chịu thiệt, hành vi sai tiếp tục với những người khác."
      },
      {
       "nhan": "Đăng bài nêu tên công ty và chửi người tuyển dụng lên mạng cho cả thế giới cùng biết.",
       "tot": 0,
       "d": {
        "dd": -8,
        "pl": -6,
        "tc": -6
       },
       "bl": "Bất bình là chính đáng, nhưng lăng mạ người khác xâm phạm danh dự, nhân phẩm; phản ánh phải đúng cách và có căn cứ (Lớp 11 Bài 17, Bài 20).",
       "di": "c1",
       "loi_sai": "Phản ứng bằng lời lẽ xúc phạm.",
       "rui_ro": "Xâm phạm danh dự người khác, bài đăng có thể bị xử lí, vấn đề chính vẫn nguyên."
      }
     ],
     "chung_cu": {
      "mo": "Chị Hà muốn phản ánh việc tuyển dụng này. Trước khi trao đổi với chị, em cân nhắc nên giữ lại những gì.",
      "toi_da": 3,
      "vat": [
       {
        "id": "anh_tin",
        "ten": "Ảnh chụp màn hình tin tuyển dụng",
        "mo": "Thấy rõ dòng «Chỉ nhận nam; nữ lương thấp hơn», tên đơn vị đăng và ngày đăng.",
        "loai": "can",
        "bl": "Nội dung gây tranh cãi nằm ngay trong tin: giữ nguyên bản gốc làm căn cứ khi phản ánh."
       },
       {
        "id": "duong_dan",
        "ten": "Đường dẫn và nơi đăng tin",
        "mo": "Địa chỉ trang hoặc nhóm đã đăng, để người có thẩm quyền tìm lại được.",
        "loai": "can",
        "bl": "Giúp người có thẩm quyền xác minh đúng nguồn thay vì chỉ nghe kể lại."
       },
       {
        "id": "loi_chi",
        "ten": "Lời kể của chị Hà khi gọi hỏi nhà tuyển dụng",
        "mo": "Chị đã gọi hỏi và được trả lời tương tự, nhớ được khoảng thời gian.",
        "loai": "huu_ich",
        "bl": "Bổ sung cho bằng chứng chính; ghi lại thời điểm và nội dung càng chính xác càng tốt."
       },
       {
        "id": "tin_don",
        "ten": "Chuyện «nghe nói công ty ấy hay thế»",
        "mo": "Lời đồn từ vài người quen, không ai nhớ rõ ai nói.",
        "loai": "nhieu",
        "bl": "Tin đồn không kiểm chứng không phải chứng cứ; mang theo chỉ làm phần chính rõ ràng bị loãng đi."
       },
       {
        "id": "trang_ca_nhan",
        "ten": "Trang mạng và ảnh cá nhân của người đăng tin",
        "mo": "Em tìm thấy trang riêng của người phụ trách tuyển dụng.",
        "loai": "nguy",
        "bl": "Đưa thông tin riêng của người khác ra để gây áp lực là xâm phạm danh dự, nhân phẩm; phản ánh phải đúng cách và có căn cứ (Lớp 11 Bài 17, Bài 20)."
       }
      ]
     },
     "loi_dan": {
      "ai": "Chị Hà",
      "nd": "Chắc ngành nào cũng thế thôi em ạ. Chị nộp cho xong, kêu ca chỉ mất cơ hội, người ta tuyển nam từ lâu rồi."
     },
     "bay": {
      "loai": "so_dong",
      "mo": "«Ngành nào cũng vậy» khiến sự bất bình đẳng trông như điều đương nhiên."
     },
     "goi_y": [
      "Tin tuyển dụng này đối xử với nam và nữ khác nhau ở điểm nào, và điều đó liên quan đến quyền nào?",
      "Ôn Lớp 11 Bài 10: bình đẳng giới trong lao động nói gì về tuyển dụng và tiền công?",
      "«Ngành nào cũng vậy» chỉ nói về thói quen, chưa nói về điều pháp luật cho phép."
     ],
     "sb": {
      "bo": "nha",
      "nv": [
       "em",
       "chi_ha"
      ],
      "noi": "chi_ha",
      "tuy": [
       "dien_thoai"
      ]
     }
    },
    "c1": {
     "tieu_de": "Chiếc điện thoại giá bất ngờ",
     "nd": "Em dành dụm được một khoản để mua điện thoại mới cho kì học tới. Trên mạng có người bán đúng mẫu máy em thích với giá rẻ hơn cửa hàng gần một phần ba, kèm lời nhắn: «Chỉ còn hai máy, chuyển khoản trong hôm nay để giữ giá». Trang của người bán mới mở được vài ngày.",
     "chon": [
      {
       "nhan": "Chưa chuyển tiền: tìm hiểu người bán, so giá với nơi khác và hỏi người lớn, ưu tiên nơi có thông tin rõ ràng rồi mới quyết định.",
       "tot": 2,
       "d": {
        "pl": 4,
        "dd": 4,
        "tc": 6
       },
       "cd": [
        "mua_than_trong"
       ],
       "bl": "Tiêu dùng thông minh là chi tiêu có kế hoạch, tìm hiểu kĩ thông tin sản phẩm và ưu tiên sản phẩm chất lượng; quyết định sau khi có đủ thông tin giúp tránh thiệt hại (Lớp 11 Bài 8).",
       "di": "q4"
      },
      {
       "nhan": "Xin thêm ảnh thật của máy rồi chuyển một nửa tiền để giữ máy, nửa còn lại trả khi nhận hàng, vì em thấy vậy là đủ an toàn.",
       "tot": 1,
       "d": {
        "pl": -2,
        "tc": -2
       },
       "bl": "Hỏi thêm thông tin là đúng hướng nhưng chuyển tiền khi chưa biết rõ người bán vẫn là quyết định vội; cần tìm hiểu kĩ thông tin trước khi chi tiền (Lớp 11 Bài 8).",
       "di": "q4",
       "loi_sai": "Chuyển một phần tiền khi chưa kiểm tra người bán.",
       "rui_ro": "Vẫn có thể mất khoản đã chuyển nếu người bán không giao hàng."
      },
      {
       "nhan": "Chuyển toàn bộ tiền ngay để giữ giá rẻ, rủ thêm một bạn cùng mua vì «cơ hội hiếm», còn kiểm tra gì thì tính sau khi nhận hàng.",
       "tot": 0,
       "d": {
        "pl": -4,
        "dd": -4,
        "tc": -6
       },
       "cd": [
        "mat_tien_online"
       ],
       "bl": "Mua vội dưới áp lực «chỉ còn vài máy» làm em bỏ qua việc tìm hiểu thông tin sản phẩm và người bán, trái với cách tiêu dùng thông minh (Lớp 11 Bài 8).",
       "di": "q4",
       "loi_sai": "Chuyển toàn bộ tiền vì sợ lỡ giá.",
       "rui_ro": "Có thể mất tiền mà không nhận được hàng, kéo theo cả bạn học cùng mua."
      }
     ],
     "loi_dan": {
      "ai": "Người bán (tin nhắn)",
      "nd": "Chỉ còn hai máy thôi bạn ơi. Chuyển khoản trong hôm nay để giữ giá, mai là về giá cũ. Bạn cứ tin mình, nhiều người mua rồi!"
     },
     "bay": {
      "loai": "thoi_gian",
      "mo": "Lời giục «chỉ còn hai máy, trong hôm nay» tạo áp lực thời gian để em bỏ qua bước tìm hiểu thông tin."
     },
     "goi_y": [
      "Điều gì ở lời chào bán này làm em muốn quyết định thật nhanh, và em đã biết chắc những gì về người bán?",
      "Ôn Lớp 11 Bài 8: người tiêu dùng thông minh chi tiêu có kế hoạch và tìm hiểu thông tin sản phẩm như thế nào trước khi mua?",
      "Giá rẻ và lời giục đều làm em khó nghĩ kĩ. Hãy hỏi: nếu mất thêm một ngày để tìm hiểu thì em mất gì, còn nếu chuyển tiền rồi mới nghi ngờ thì em mất gì?"
     ],
     "sb": {
      "bo": "mang",
      "nv": [
       "em",
       "ban|Bạn cùng lớp"
      ],
      "noi": "dt",
      "tuy": [
       "dien_thoai"
      ]
     }
    },
    "q4": {
     "tieu_de": "Bãi rác cuối ngõ",
     "nd": "Bãi rác tạm ở cuối ngõ ngày càng bốc mùi, nước thải chảy tràn ra ngõ. Bà con bức xúc. Trên mạng có người rủ: «Chủ nhật này kéo ra chặn xe rác, không cần xin phép ai!». Bác Sáu gọi em: «Cháu biết chữ, giúp bác soạn giấy tờ nhé».",
     "them": [
      {
       "co": "gop_y_dung",
       "nd": "Bác Sáu nhớ lần em góp ý bản quy ước năm ngoái: «Lần trước cháu nói chí lí, lần này nhờ cháu nữa»."
      }
     ],
     "chon": [
      {
       "nhan": "Cùng bác Sáu soạn đơn kiến nghị gửi Uỷ ban nhân dân, kèm ảnh, số hộ bị ảnh hưởng và có kí tên.",
       "tot": 2,
       "d": {
        "pl": 6,
        "tc": 8,
        "dd": 6
       },
       "cd": [
        "kien_nghi_dung"
       ],
       "bl": "Công dân có quyền tham gia thảo luận và kiến nghị với cơ quan nhà nước về vấn đề của địa phương. Hội đồng nhân dân là cầu nối với cử tri, Uỷ ban nhân dân quản lí môi trường ở cơ sở (Lớp 11 Bài 13; Lớp 10 Bài 21).",
       "di": "q5"
      },
      {
       "nhan": "Cùng mọi người kéo ra chặn xe rác chủ nhật này, đông thì mới được nghe, giấy tờ ai thèm đọc.",
       "tot": 0,
       "d": {
        "pl": -8,
        "dd": -6,
        "tc": -4
       },
       "cd": [
        "chan_duong"
       ],
       "bl": "Quyền tự do ngôn luận, hội họp phải thực hiện theo quy định của pháp luật; chặn xe gây mất trật tự, ảnh hưởng người khác và làm vụ việc khó giải quyết hơn (Lớp 11 Bài 20, Bài 13).",
       "di": "q5",
       "loi_sai": "Chặn xe, gây rối trật tự.",
       "rui_ro": "Vi phạm quy định, bà con bị nhắc nhở, vụ việc mất sự cảm thông."
      },
      {
       "nhan": "Đăng bài kèm ảnh cũ viết «bãi rác làm nhiều người bệnh nặng» để mọi người sốt ruột mà vào cuộc.",
       "tot": 0,
       "d": {
        "pl": -6,
        "dd": -8,
        "tc": -8
       },
       "bl": "Thông tin sai sự thật làm mất uy tín và có thể bị xử lí. Công dân phải kiểm tra thông tin trước khi đăng, chia sẻ (Lớp 11 Bài 20).",
       "di": "q5",
       "loi_sai": "Đăng tin sai kèm ảnh cũ.",
       "rui_ro": "Thông tin sai sự thật, mất uy tín, có thể bị xử lí; vấn đề chính bị lu mờ."
      }
     ],
     "loi_dan": {
      "ai": "Tài khoản trên mạng",
      "nd": "Chủ nhật này kéo ra chặn xe rác! Hàng trăm người ủng hộ rồi, kiến nghị giấy tờ chẳng ai đọc đâu."
     },
     "bay": {
      "loai": "so_dong",
      "mo": "Đám đông trên mạng làm em tưởng cách mạnh tay mới có hiệu quả."
     },
     "goi_y": [
      "Bà con muốn ai giải quyết vấn đề, làm sao để người đó biết, và có bằng chứng gì?",
      "Ôn Lớp 11 Bài 13 và Lớp 10 Bài 21: công dân có quyền kiến nghị với cơ quan nào, Hội đồng nhân dân giữ vai trò gì?",
      "Hai cách làm đều dựa vào «gây áp lực nhanh». Hãy hỏi: cách nào còn giữ được uy tín và bằng chứng nếu có người kiểm tra?"
     ],
     "sb": {
      "bo": "ngo_xom",
      "nv": [
       "em",
       "bac_sau"
      ],
      "noi": "dt",
      "tuy": [
       "rac",
       "dien_thoai"
      ]
     }
    },
    "q5": {
     "tieu_de": "Đoạn clip ở sân sau trường",
     "nd": "Minh, bạn thân của em, đến lớp với vết bầm ở tay và đôi mắt đỏ hoe. Cuối cùng cậu kể: một nhóm bạn lớp bên chặn Minh ở sân sau, đánh và quay clip, doạ «đưa lên mạng nếu mày mách thầy cô».",
     "chon": [
      {
       "nhan": "Ở bên Minh, giữ bằng chứng, không phát tán clip; cùng Minh kể với cô chủ nhiệm và bố mẹ.",
       "tot": 2,
       "d": {
        "pl": 6,
        "dd": 6,
        "tc": 8
       },
       "cd": [
        "bao_vao_dung_cach"
       ],
       "bl": "Mọi người có quyền bất khả xâm phạm về thân thể, được bảo hộ về sức khoẻ, danh dự, nhân phẩm; học sinh có trách nhiệm đấu tranh, phê phán và báo hành vi vi phạm đến người có thẩm quyền (Lớp 11 Bài 17).",
       "di": "ket"
      },
      {
       "nhan": "Xin nhóm kia xoá clip rồi thôi, chưa báo thầy cô vì sợ bị trả thù và làm to chuyện.",
       "tot": 1,
       "d": {
        "tc": -2,
        "pl": -2
       },
       "bl": "Em muốn giúp bạn, nhưng giữ kín khiến vụ việc không được giải quyết và Minh vẫn bị đe doạ; cần nhờ người có trách nhiệm (Lớp 11 Bài 17).",
       "di": "ket",
       "loi_sai": "Giấu vụ việc vì sợ.",
       "rui_ro": "Nhóm kia tiếp tục, Minh vẫn bị đe doạ, em không bảo vệ được bạn."
      },
      {
       "nhan": "Rủ vài bạn chặn nhóm kia lại để dạy cho một bài học, cho chúng nó biết thế nào là sợ.",
       "tot": 0,
       "d": {
        "pl": -10,
        "dd": -8,
        "tc": -6
       },
       "bl": "Dùng bạo lực đáp trả bạo lực là xâm phạm thân thể người khác và khiến chính em phải chịu trách nhiệm (Lớp 11 Bài 17).",
       "di": "ket",
       "loi_sai": "Dùng bạo lực đáp trả bạo lực.",
       "rui_ro": "Em cũng vi phạm và bị kỉ luật; xung đột leo thang, Minh thêm nguy hiểm."
      }
     ],
     "chung_cu": {
      "mo": "Minh đang rất sợ. Em cùng Minh nghĩ xem nên giữ lại những gì trước khi báo với người có trách nhiệm.",
      "toi_da": 3,
      "vat": [
       {
        "id": "ve_thuong",
        "ten": "Ảnh vết bầm kèm ghi chú ngày, giờ, nơi xảy ra",
        "mo": "Chụp khi Minh đồng ý, ghi chú ngay để khỏi nhầm lẫn.",
        "loai": "can",
        "bl": "Ghi nhận hậu quả và thời điểm giúp người có trách nhiệm xác minh đúng sự việc."
       },
       {
        "id": "tin_nhan_doa",
        "ten": "Tin nhắn doạ «đưa clip lên mạng»",
        "mo": "Chưa xoá, còn thấy tên tài khoản gửi.",
        "loai": "can",
        "bl": "Lời đe doạ là bằng chứng quan trọng và cho thấy Minh cần được bảo vệ sớm."
       },
       {
        "id": "loi_ke",
        "ten": "Lời kể của Minh và tên bạn nhìn thấy sự việc (nếu có)",
        "mo": "Ghi lại cho đủ, em chưa đi nói chuyện hay ép ai thay Minh.",
        "loai": "huu_ich",
        "bl": "Người chứng kiến có thể giúp xác minh; việc làm việc với họ để người có trách nhiệm đảm nhận."
       },
       {
        "id": "binh_luan",
        "ten": "Ảnh chụp bình luận cười cợt trong nhóm lớp bên",
        "mo": "Vài bạn lớp bên nhắn «đùa thôi mà», không nói gì về sự việc.",
        "loai": "nhieu",
        "bl": "Không cho biết chuyện gì đã xảy ra và ai làm; mang theo không giúp xác minh."
       },
       {
        "id": "dang_clip",
        "ten": "Tự đăng clip lên nhóm lớp để mọi người biết nhóm kia làm gì",
        "mo": "Em đang giữ một bản clip do bạn gửi.",
        "loai": "nguy",
        "bl": "Phát tán clip làm Minh bị xâm phạm danh dự thêm một lần nữa và chính em cũng làm sai; clip chỉ nên đưa cho người có trách nhiệm (Lớp 11 Bài 17)."
       }
      ]
     },
     "loi_dan": {
      "ai": "Nhóm lớp bên",
      "nd": "Mày mách thầy cô thì clip lên mạng ngay. Đừng làm to chuyện, bọn tao chỉ đùa thôi."
     },
     "bay": {
      "loai": "so_mat",
      "mo": "Lời doạ làm Minh và em sợ hậu quả nên muốn im lặng hoặc đáp trả bằng sức mạnh."
     },
     "goi_y": [
      "Minh đang bị đe doạ những gì, và ai có trách nhiệm bảo vệ Minh?",
      "Ôn Lớp 11 Bài 17: học sinh có trách nhiệm gì khi biết có hành vi xâm phạm thân thể, danh dự người khác?",
      "Sợ bị trả thù và muốn trả đũa đều là phản ứng từ cảm xúc. Cách nào bảo vệ được Minh lâu dài?"
     ],
     "sb": {
      "bo": "truong",
      "nv": [
       "em",
       "minh",
       "nhom_la"
      ],
      "noi": "nhom_la",
      "tuy": []
     }
    }
   },
   "chuyen": [
    {
     "nd": "Hết lớp 11. Khu phố Hoà Bình vẫn ồn ào như thường, nhưng em đã khác: người ta bắt đầu nhờ em những việc nghiêm túc. Năm cuối cấp mở ra với những quyết định mà em phải tự chịu trách nhiệm."
    },
    {
     "co": "kien_nghi_dung",
     "nd": "Bãi rác cuối ngõ đã được xử lí sau khi kiến nghị của bà con được trả lời."
    },
    {
     "co": "chan_duong",
     "nd": "Bãi rác vẫn còn đó, và vụ chặn đường vẫn khiến bà con còn tiếng xì xào."
    },
    {
     "co": "ba_tu_bo_phieu",
     "nd": "Bà hay nhắc: «Lá phiếu đầu tiên của con, con nhớ tự mình đi nhé»."
    }
   ]
  },
  {
   "khoi": 12,
   "ten": "Công dân trưởng thành",
   "thoi_gian": "Lớp 12",
   "mo": "Lớp 12. Còn vài tháng nữa là sinh nhật 18 tuổi, và kì thi cuối cấp ở ngay trước mặt. Em sắp bước vào đời với đầy đủ quyền và nghĩa vụ của một công dân.",
   "bai": [
    "12-b09",
    "12-b10",
    "12-b12"
   ],
   "co_mac_dinh": [],
   "bat_dau": "r1",
   "canh": {
    "r1": {
     "tieu_de": "Chiếc ví ở trạm xe buýt",
     "nd": "Trên băng ghế trạm xe buýt có một chiếc ví da: bên trong là 5 triệu đồng và giấy tờ tuỳ thân của một người lạ. Xung quanh không ai nhìn thấy.",
     "chon": [
      {
       "nhan": "Liên hệ chủ ví theo giấy tờ; nếu không được thì giao ví cho công an phường để trả lại người mất.",
       "tot": 2,
       "d": {
        "pl": 6,
        "dd": 8,
        "tc": 8
       },
       "cd": [
        "tra_vi"
       ],
       "bl": "Nhặt được của rơi phải trả lại người đánh mất hoặc thông báo cho cơ quan có trách nhiệm (Lớp 12 Bài 9).",
       "di": "r2"
      },
      {
       "nhan": "Chụp ảnh giấy tờ trong ví rồi đăng lên mạng nhờ mọi người chia sẻ để tìm được chủ ví nhanh nhất có thể.",
       "tot": 1,
       "d": {
        "dd": -2,
        "tc": -2,
        "pl": -2
       },
       "bl": "Có thiện ý, nhưng đăng giấy tờ tuỳ thân làm lộ thông tin cá nhân của người khác; nên giao cho cơ quan có trách nhiệm xử lí (Lớp 12 Bài 9; Lớp 11 Bài 20: bí mật cá nhân).",
       "di": "r2",
       "loi_sai": "Đăng giấy tờ tuỳ thân lên mạng.",
       "rui_ro": "Lộ thông tin cá nhân của người mất ví, có thể bị kẻ xấu lợi dụng."
      },
      {
       "nhan": "Lấy 5 triệu rồi để ví lại ghế như ví tự rơi; không ai thấy, coi như của trời cho.",
       "tot": 0,
       "d": {
        "pl": -10,
        "dd": -10,
        "tc": -8
       },
       "bl": "Chiếm giữ tài sản của người khác là xâm phạm quyền sở hữu; công dân phải tôn trọng tài sản của người khác (Lớp 12 Bài 9).",
       "di": "r2",
       "loi_sai": "Lấy tiền trong ví của người khác.",
       "rui_ro": "Chiếm giữ tài sản người khác, vi phạm, mất uy tín nếu bị phát hiện."
      }
     ],
     "loi_dan": {
      "ai": "Bạn đi cùng",
      "nd": "Ví rơi là của trời cho đấy, 5 triệu cơ mà! Lấy đi, đằng nào cũng chẳng ai thấy mình."
     },
     "bay": {
      "loai": "loi_truoc_mat",
      "mo": "Món tiền lớn và «không ai thấy» làm việc sai trông như không có hậu quả."
     },
     "goi_y": [
      "Chiếc ví thuộc về ai, và ai có trách nhiệm giúp nó trở về người đó?",
      "Ôn Lớp 12 Bài 9: nhặt được của rơi phải làm gì?",
      "Câu «không ai thấy» chỉ nói về nguy cơ bị phát hiện, chưa nói về việc đúng hay sai."
     ],
     "sb": {
      "bo": "tram_xe",
      "nv": [
       "em",
       "ban|Bạn đi cùng"
      ],
      "noi": "ban",
      "tuy": [
       "vi"
      ]
     }
    },
    "r2": {
     "tieu_de": "Căn phòng trọ gần trường",
     "nd": "Em đỗ đại học và đi xem phòng trọ gần trường. Chủ nhà nói: «Cọc một tháng, kí cho nhanh, chị còn nhiều người hỏi». Căn phòng có vết nứt ở tường và cái cửa sổ lỏng bản lề.",
     "chon": [
      {
       "nhan": "Đọc kĩ hợp đồng, thoả thuận rõ cọc, thời hạn, sửa chữa; kí văn bản và chụp hiện trạng phòng.",
       "tot": 2,
       "d": {
        "pl": 6,
        "dd": 4,
        "tc": 4
       },
       "cd": [
        "hop_dong_ro"
       ],
       "bl": "Người thuê phải sử dụng đúng công dụng, bảo quản và trả lại đúng thời hạn; làm hư hỏng thì phải sửa chữa, bồi thường (Lớp 12 Bài 9). Thoả thuận rõ và lưu bằng chứng là kinh nghiệm giúp tránh tranh chấp.",
       "di": "r3"
      },
      {
       "nhan": "Kí ngay không cần đọc kĩ vì chị còn nhiều người hỏi, mất phòng thì lỡ cả học kì, thiệt hơn nhiều.",
       "tot": 0,
       "d": {
        "pl": -4,
        "dd": -4,
        "tc": -2
       },
       "bl": "Kí mà không đọc kĩ dễ phát sinh tranh chấp về tiền cọc, sửa chữa, thời hạn; mỗi bên cần hiểu rõ nghĩa vụ của mình (Lớp 12 Bài 9).",
       "di": "r3",
       "loi_sai": "Kí mà không đọc vì sợ mất phòng.",
       "rui_ro": "Phát sinh điều khoản bất lợi, mất cọc, tranh chấp sửa chữa."
      },
      {
       "nhan": "Nói miệng với chị về tiền cọc và thời hạn rồi nhận phòng luôn, không ghi chép gì cả.",
       "tot": 1,
       "d": {
        "pl": -2,
        "tc": -2
       },
       "bl": "Thoả thuận miệng vẫn có thể đúng, nhưng khó chứng minh khi có tranh chấp; ghi lại thoả thuận là cách bảo vệ cả hai bên (Lớp 12 Bài 9).",
       "di": "r3",
       "loi_sai": "Thoả thuận miệng, không ghi chép.",
       "rui_ro": "Khó chứng minh khi tranh chấp, dễ bị đổ lỗi cho hư hỏng có sẵn."
      }
     ],
     "loi_dan": {
      "ai": "Chủ nhà",
      "nd": "Kí cho nhanh đi em, chị còn nhiều người hỏi. Đọc làm gì cho mất thời gian, hợp đồng nào cũng như nhau."
     },
     "bay": {
      "loai": "thoi_gian",
      "mo": "Hạn chót «còn nhiều người hỏi» ép em quyết định trước khi kịp đọc."
     },
     "goi_y": [
      "Nếu sau này có tranh cãi về tiền cọc hay hư hỏng, em có bằng chứng nào?",
      "Ôn Lớp 12 Bài 9: người thuê phải làm gì khi sử dụng và trả lại tài sản đi thuê?",
      "Câu «còn nhiều người hỏi» khiến em muốn quyết định thật nhanh. Hãy hỏi: chuyện gì xảy ra nếu em dành mười lăm phút để đọc?"
     ],
     "sb": {
      "bo": "tro",
      "nv": [
       "em",
       "chi_mai|Chủ nhà"
      ],
      "noi": "chi_mai",
      "tuy": [
       "giay"
      ]
     }
    },
    "r3": {
     "tieu_de": "Đám cưới của chị Thu",
     "nd": "Chị Thu, chị họ em, mới 17 tuổi. Gia đình chị định gả chị cho một người hơn chị mười tuổi «để nhẹ gánh lo cho nhà». Chị khóc: «Chị chưa muốn, nhưng không ai nghe chị cả».",
     "chon": [
      {
       "nhan": "Nói chuyện với chị Thu và người lớn trong họ về tuổi kết hôn; nếu vẫn bị ép thì báo chính quyền.",
       "tot": 2,
       "d": {
        "pl": 6,
        "dd": 6,
        "tc": 8
       },
       "cd": [
        "cuu_chi_thu"
       ],
       "bl": "Hôn nhân theo nguyên tắc tự nguyện; nữ từ đủ 18 tuổi, nam từ đủ 20 tuổi mới được kết hôn và phải đăng kí. Tảo hôn, cưỡng ép kết hôn là hành vi bị cấm (Lớp 12 Bài 10).",
       "di": "r4"
      },
      {
       "nhan": "Im lặng, vì đây là chuyện của gia đình chị Thu và mình là em họ, chẳng có quyền xen vào việc người lớn.",
       "tot": 1,
       "d": {
        "tc": -4,
        "dd": -4
       },
       "bl": "Công dân có trách nhiệm ngăn chặn hoặc báo hành vi vi phạm; im lặng có thể khiến chị Thu chịu thiệt (Lớp 12 Bài 10; Lớp 11 Bài 17).",
       "di": "r4",
       "loi_sai": "Đứng ngoài chuyện cưỡng ép kết hôn.",
       "rui_ro": "Chị Thu phải kết hôn khi chưa tự nguyện và chưa đủ tuổi, ảnh hưởng lâu dài đến cuộc sống chị."
      },
      {
       "nhan": "Khuyên chị khai tăng tuổi trên giấy tờ để làm cho xong, nhiều nhà ở quê vẫn làm thế.",
       "tot": 0,
       "d": {
        "pl": -12,
        "dd": -8,
        "tc": -6
       },
       "bl": "Khai gian tuổi để kết hôn là kê khai giả mạo, vi phạm điều kiện kết hôn; việc kết hôn phải tự nguyện, đủ điều kiện và đăng kí đúng quy định (Lớp 12 Bài 10).",
       "di": "r4",
       "loi_sai": "Khai gian tuổi để kết hôn.",
       "rui_ro": "Giấy tờ giả, hôn nhân trái luật, em và gia đình chị Thu cùng vi phạm."
      }
     ],
     "loi_dan": {
      "ai": "Bác trong họ",
      "nd": "Con gái lớn thì phải lấy chồng. Khai tăng tuổi cho đúng giấy là xong, họ hàng nhà nào chẳng làm thế."
     },
     "bay": {
      "loai": "so_dong",
      "mo": "Thấy nhiều nhà làm vậy khiến việc khai gian tuổi trông như bình thường."
     },
     "goi_y": [
      "Điều kiện để kết hôn hợp pháp gồm những gì, và chị Thu đang thiếu điều kiện nào?",
      "Ôn Lớp 12 Bài 10: điều kiện kết hôn, và hành vi nào bị cấm?",
      "«Nhiều nhà vẫn làm thế» và «chuyện nhà người ta» đều khiến em đứng ngoài. Hãy hỏi: nếu là chị, em cần ai giúp?"
     ],
     "sb": {
      "bo": "nha",
      "nv": [
       "em",
       "chi_thu",
       "bac_hh|Bác trong họ"
      ],
      "noi": "bac_hh",
      "tuy": []
     }
    },
    "r4": {
     "tieu_de": "Chiếc thẻ bảo hiểm của bà",
     "nd": "Em sốt cao đột ngột và phát hiện mình để quên thẻ bảo hiểm y tế ở nhà. Chiếc ví của bà đang ngay đây, trong đó có thẻ bảo hiểm y tế của bà.",
     "chon": [
      {
       "nhan": "Khai đúng thông tin của mình, nhờ người nhà mang thẻ đến hoặc hỏi thủ tục khi quên thẻ.",
       "tot": 2,
       "d": {
        "pl": 6,
        "dd": 4,
        "tc": 2
       },
       "cd": [
        "the_dung_chu"
       ],
       "bl": "Người tham gia bảo hiểm y tế có nghĩa vụ sử dụng thẻ đúng mục đích và khai báo trung thực; cung cấp trung thực thông tin về sức khoẻ cũng là nghĩa vụ của người bệnh (Lớp 12 Bài 12).",
       "di": "ket"
      },
      {
       "nhan": "Dùng thẻ của bà để khỏi tốn viện phí, một nhà với nhau, ai biết mà kiểm tra, bà cũng đồng ý rồi.",
       "tot": 0,
       "d": {
        "pl": -10,
        "dd": -8,
        "tc": -4
       },
       "bl": "Dùng thẻ của người khác là sử dụng sai mục đích, lợi dụng quyền để trục lợi, đi ngược nghĩa vụ trong bảo đảm an sinh xã hội (Lớp 12 Bài 12).",
       "di": "ket",
       "loi_sai": "Dùng thẻ của người khác.",
       "rui_ro": "Sử dụng sai mục đích, bị từ chối hoặc xử lí, bà mất quyền lợi."
      },
      {
       "nhan": "Không đi khám, tự nằm nghỉ uống nước cho đỡ tốn tiền, sốt rồi cũng sẽ hết thôi.",
       "tot": 1,
       "d": {
        "tc": -2
       },
       "bl": "Mọi người có quyền được bảo vệ, chăm sóc sức khoẻ và có nghĩa vụ thực hiện quy định về khám, chữa bệnh; bỏ qua cơn sốt cao có thể nguy hiểm (Lớp 12 Bài 12).",
       "di": "ket",
       "loi_sai": "Bỏ khám khi đang sốt cao.",
       "rui_ro": "Bệnh có thể nặng hơn, tốn kém và nguy hiểm hơn về sau."
      }
     ],
     "loi_dan": {
      "ai": "Mẹ",
      "nd": "Dùng thẻ của bà đi, đằng nào cũng một nhà, đỡ tốn tiền. Ai kiểm tra làm gì, sốt thôi mà."
     },
     "bay": {
      "loai": "loi_truoc_mat",
      "mo": "Tiết kiệm tiền trước mắt làm em coi nhẹ việc dùng sai thẻ hoặc bỏ khám."
     },
     "goi_y": [
      "Thẻ bảo hiểm y tế thuộc về ai, và dùng thế nào mới đúng mục đích?",
      "Ôn Lớp 12 Bài 12: người tham gia có nghĩa vụ gì khi dùng thẻ và khi khai về sức khoẻ?",
      "Hai lí do «đỡ tốn tiền» đều bỏ qua một câu hỏi: có cách nào vừa đúng quy định vừa không bỏ khám bệnh?"
     ],
     "sb": {
      "bo": "benh_vien",
      "nv": [
       "em",
       "me"
      ],
      "noi": "me",
      "tuy": [
       "giay"
      ]
     }
    }
   },
   "chuyen": [
    {
     "nd": "Hết những quyết định riêng của người sắp thành niên: của rơi nhặt được, phòng trọ, chuyện hôn nhân của chị Thu, chiếc thẻ bảo hiểm của bà. Nhưng em sắp tròn 18 tuổi, và những việc chung của khu phố đang chờ đến em."
    }
   ]
  },
  {
   "khoi": 12,
   "ten": "Công dân có trách nhiệm",
   "thoi_gian": "Lớp 12",
   "mo": "Lớp 12, những tháng cuối cấp. Chuyện riêng em đã tự lo được; giờ đến những việc chung của khu phố và của đất nước: dòng nước ở cuối ngõ, tên em trong danh sách cử tri, lá phiếu đầu tiên.",
   "bai": [
    "12-b13",
    "11-b14"
   ],
   "co_mac_dinh": [],
   "bat_dau": "r5",
   "canh": {
    "r5": {
     "tieu_de": "Dòng nước đổi màu",
     "nd": "Một cơ sở nhuộm vải mới mở cạnh nhà em. Dòng mương trước ngõ bỗng chuyển màu xanh đen, bốc mùi hắc. Nhiều nhà bắt đầu ho và ngứa da.",
     "them": [
      {
       "co": "kien_nghi_dung",
       "nd": "Bác Sáu gọi em ngay: «Lần trước mình kiến nghị đúng cách nên được trả lời đàng hoàng. Lần này làm giống thế nhé!»."
      },
      {
       "co": "chan_duong",
       "nd": "Bác Sáu lắc đầu: «Lần trước chặn đường làm bà con bị nhắc nhở, giờ ai còn dám đứng ra nữa?»."
      },
      {
       "co": "dung_cua",
       "nd": "Em nhớ rõ cách đi đúng cửa từ chuyện hàng rào của bà ngoại ngày trước."
      }
     ],
     "chon": [
      {
       "nhan": "Ghi lại bằng chứng, tìm thông tin về môi trường, cùng bà con gửi phản ánh đến cơ quan có thẩm quyền.",
       "tot": 2,
       "d": {
        "pl": 6,
        "tc": 8,
        "dd": 6
       },
       "cd": [
        "phan_anh_moi_truong"
       ],
       "bl": "Mọi người có quyền được sống trong môi trường trong lành, được tiếp cận thông tin về môi trường, khiếu nại, tố cáo hành vi vi phạm; xả nước thải chưa đạt quy chuẩn ra môi trường là hành vi bị nghiêm cấm (Lớp 12 Bài 13).",
       "di": "r6"
      },
      {
       "nhan": "Rủ thanh niên trong xóm chặn cổng cơ sở, không cho xe ra vào, cho chủ biết tay và ép họ phải sửa ngay.",
       "tot": 0,
       "d": {
        "pl": -10,
        "dd": -6,
        "tc": -4
       },
       "bl": "Chặn cổng, gây rối làm mất trật tự và khiến chính mình vi phạm; quyền phản ánh phải thực hiện theo quy định (Lớp 12 Bài 13; Lớp 11 Bài 13).",
       "di": "r6",
       "loi_sai": "Chặn cổng, gây rối trật tự.",
       "rui_ro": "Em và bà con vi phạm, chủ cơ sở có cớ phản ứng, vấn đề môi trường bị lu mờ."
      },
      {
       "nhan": "Nhận phần quà thăm hỏi của chủ cơ sở rồi bảo bà con thôi, nhà nào cũng được chút lợi, đỡ mất lòng nhau.",
       "tot": 0,
       "d": {
        "pl": -8,
        "dd": -10,
        "tc": -8
       },
       "bl": "Đổi sự im lặng lấy tiền là tiếp tay che giấu hành vi gây ô nhiễm; quyền sống trong môi trường trong lành không thể đem đánh đổi (Lớp 12 Bài 13).",
       "di": "r6",
       "loi_sai": "Nhận quà để bỏ qua ô nhiễm.",
       "rui_ro": "Tiếp tay che giấu hành vi gây ô nhiễm, sức khoẻ bà con vẫn bị ảnh hưởng."
      }
     ],
     "chung_cu": {
      "mo": "Nhiều nhà trong ngõ bắt đầu ho và ngứa da. Em cùng bác Sáu bàn nên ghi lại và thu thập gì trước khi phản ánh.",
      "toi_da": 3,
      "vat": [
       {
        "id": "anh_muong",
        "ten": "Ảnh và video dòng mương đổi màu, ghi ngày giờ và vị trí",
        "mo": "Quay từ ngoài ngõ, nơi ai cũng đứng được.",
        "loai": "can",
        "bl": "Hình ảnh có ngày giờ, vị trí là bằng chứng trực quan để cơ quan có thẩm quyền xem xét."
       },
       {
        "id": "ds_nha",
        "ten": "Danh sách các nhà bị ảnh hưởng và triệu chứng bà con kể",
        "mo": "Ghi tên nhà (không cần ghi hồ sơ bệnh án), triệu chứng ho, ngứa da.",
        "loai": "can",
        "bl": "Cho thấy mức ảnh hưởng đến đời sống và sức khoẻ của cả khu, giúp việc phản ánh có trọng lượng."
       },
       {
        "id": "thong_tin_mt",
        "ten": "Thông tin về môi trường của khu vực do cơ quan công bố",
        "mo": "Em tìm xem có thông báo nào về xử lí nước thải của cơ sở không.",
        "loai": "huu_ich",
        "bl": "Mọi người có quyền được tiếp cận thông tin về môi trường (Lớp 12 Bài 13): tìm hiểu trước giúp phản ánh chính xác."
       },
       {
        "id": "tin_don_xuong",
        "ten": "Chuyện đồn «cơ sở này làm ăn gian dối từ lâu»",
        "mo": "Nghe vài người nói, không ai đưa ra giấy tờ nào.",
        "loai": "nhieu",
        "bl": "Lời đồn không có căn cứ không giúp cơ quan có thẩm quyền xác minh việc xả thải."
       },
       {
        "id": "lay_mau_len",
        "ten": "Lén vào trong cơ sở để lấy mẫu nước thải và quay lại",
        "mo": "Em thấy có một lỗ hở ở hàng rào phía sau.",
        "loai": "nguy",
        "bl": "Lén vào cơ sở của người khác là cách làm không theo quy định và khiến chính em có thể vi phạm; quyền phản ánh phải thực hiện theo quy định (Lớp 12 Bài 13; Lớp 11 Bài 13)."
       }
      ]
     },
     "loi_dan": {
      "ai": "Chủ cơ sở nhuộm",
      "nd": "Chú gửi mỗi nhà chút quà thăm hỏi, bà con thông cảm giùm. Đừng báo cáo làm gì, ai cũng thiệt."
     },
     "bay": {
      "loai": "loi_truoc_mat",
      "mo": "Món quà nhỏ trước mắt làm em coi nhẹ sức khoẻ và quyền của cả xóm."
     },
     "goi_y": [
      "Dòng nước và sức khoẻ của bà con thuộc quyền nào, và cơ quan nào có trách nhiệm kiểm tra?",
      "Ôn Lớp 12 Bài 13: quyền được sống trong môi trường trong lành và hành vi nào bị nghiêm cấm với nước thải?",
      "Món quà và việc chặn cổng đều là cách giải quyết nhanh bằng lợi ích hoặc sức mạnh, bỏ qua bằng chứng và quy trình."
     ],
     "sb": {
      "bo": "xuong_nhuom",
      "nv": [
       "em",
       "bac_sau",
       "chu_xuong"
      ],
      "noi": "chu_xuong",
      "tuy": [
       "tien"
      ]
     }
    },
    "r6": {
     "tieu_de": "Tên em trong danh sách",
     "nd": "Em đã tròn 18 tuổi. Danh sách cử tri được niêm yết ở nhà văn hoá khu phố. Em tìm thấy tên mình, nhưng ngày sinh bị ghi sai một năm, khiến em «chưa đủ tuổi bầu cử».",
     "chon": [
      {
       "nhan": "Làm đơn đề nghị điều chỉnh với cơ quan lập danh sách, kèm giấy tờ ngày sinh, rồi theo dõi.",
       "tot": 2,
       "d": {
        "pl": 6,
        "dd": 4,
        "tc": 6
       },
       "cd": [
        "kiem_tra_danh_sach"
       ],
       "bl": "Công dân có quyền kiểm tra danh sách cử tri và khiếu nại sai sót trong 30 ngày kể từ ngày niêm yết; cơ quan lập danh sách giải quyết trong 5 ngày (Lớp 11 Bài 14).",
       "di": "r7"
      },
      {
       "nhan": "Bỏ qua, đến ngày bầu cử mang giấy tờ đến xin bỏ phiếu, chắc là họ sẽ cho bầu thôi.",
       "tot": 1,
       "d": {
        "pl": -2,
        "tc": -2
       },
       "bl": "Không chủ động sửa sai sót có thể khiến em không được bỏ phiếu đúng quyền; cần dùng quyền khiếu nại đúng thời hạn (Lớp 11 Bài 14).",
       "di": "r7",
       "loi_sai": "Chờ đến ngày bầu cử mới giải quyết.",
       "rui_ro": "Có thể không được bỏ phiếu vì danh sách đã chốt, mất quyền của mình."
      },
      {
       "nhan": "Nhờ anh quen chỉnh giấy tờ ngày sinh cho khớp với danh sách, khỏi làm đơn từ lằng nhằng.",
       "tot": 0,
       "d": {
        "pl": -12,
        "dd": -8,
        "tc": -6
       },
       "bl": "Làm giả, sửa giấy tờ là hành vi vi phạm; khi có sai sót phải khiếu nại theo đúng thủ tục luật định (Lớp 11 Bài 14, Bài 15).",
       "di": "r7",
       "loi_sai": "Chỉnh sửa giấy tờ.",
       "rui_ro": "Làm giả giấy tờ, vi phạm pháp luật, ảnh hưởng đến quyền bầu cử và uy tín."
      }
     ],
     "loi_dan": {
      "ai": "Anh quen",
      "nd": "Làm đơn từ lằng nhằng làm gì! Để anh nhờ người quen chỉnh ngày sinh trên giấy cho khớp, nhanh gọn."
     },
     "bay": {
      "loai": "uy_quyen",
      "mo": "Người quen «lo giúp» khiến em bỏ qua thủ tục đúng và tin vào đường tắt."
     },
     "goi_y": [
      "Sai sót nằm ở đâu, nơi nào lập danh sách, và thời hạn để sửa là bao lâu?",
      "Ôn Lớp 11 Bài 14: công dân kiểm tra danh sách cử tri và khiếu nại thế nào?",
      "«Nhờ người quen cho nhanh» và «để ngày bầu cử tính» đều bỏ qua thủ tục khiếu nại đúng hạn."
     ],
     "sb": {
      "bo": "uy_ban",
      "nv": [
       "em",
       "anh_quen"
      ],
      "noi": "anh_quen",
      "tuy": [
       "giay"
      ]
     }
    },
    "r7": {
     "tieu_de": "Phong bì trước ngày bầu cử",
     "nd": "Chiều hôm trước ngày bầu cử, một người lạ gõ cửa, đưa em chiếc phong bì mỏng: «Em bầu cho ông A giúp chú nhé, đây là chút quà cho em và cả nhà». Bà ngoại ngồi cạnh, im lặng nhìn em.",
     "them": [
      {
       "co": "ba_tu_bo_phieu",
       "nd": "Em nhớ buổi sáng bà tự tay bỏ phiếu năm nào: bà nói lá phiếu là của mình, không ai được làm thay, cũng không ai được mua."
      },
      {
       "co": "bau_thay",
       "nd": "Em chợt nhớ năm nào mình từng cầm thẻ của bà đi bầu thay, và hiểu rằng không được phạm lỗi như thế lần nữa."
      }
     ],
     "chon": [
      {
       "nhan": "Từ chối, nói em tự lựa chọn theo ý mình; báo tổ bầu cử hoặc chính quyền về việc đưa tiền.",
       "tot": 2,
       "d": {
        "pl": 8,
        "dd": 8,
        "tc": 8
       },
       "cd": [
        "tu_choi_qua"
       ],
       "bl": "Cử tri bỏ phiếu theo ý chí tự do của mình; lừa gạt, mua chuộc, cưỡng ép cử tri là hành vi bị cấm, có thể bị xử lí. Công dân có quyền tố cáo, giám sát việc bầu cử (Lớp 11 Bài 14).",
       "di": "ket"
      },
      {
       "nhan": "Nhận phong bì cho phải phép, rồi vào phòng phiếu vẫn bầu theo ý mình, ai mà biết được.",
       "tot": 0,
       "d": {
        "pl": -10,
        "dd": -10,
        "tc": -6
       },
       "bl": "Nhận lợi ích liên quan đến việc bầu là tiếp tay cho hành vi mua chuộc cử tri; lá phiếu phải xuất phát từ ý chí tự do của mình (Lớp 11 Bài 14).",
       "di": "ket",
       "loi_sai": "Nhận lợi ích liên quan đến việc bầu.",
       "rui_ro": "Tiếp tay cho hành vi mua chuộc cử tri, có thể bị xử lí, mất niềm tin của bà ngoại."
      },
      {
       "nhan": "Từ chối nhưng không báo ai, chuyện nhỏ, báo ra lại thêm rắc rối với người ta.",
       "tot": 1,
       "d": {
        "pl": 2,
        "tc": -2,
        "dd": -2
       },
       "bl": "Từ chối là đúng, nhưng công dân còn có quyền và trách nhiệm giám sát, tố cáo hành vi vi phạm để bảo vệ tính công bằng của bầu cử (Lớp 11 Bài 14).",
       "di": "ket",
       "loi_sai": "Từ chối nhưng im lặng.",
       "rui_ro": "Hành vi vi phạm tiếp diễn, người khác bị mua chuộc, em bỏ lỡ quyền tố cáo."
      }
     ],
     "loi_dan": {
      "ai": "Người lạ",
      "nd": "Chú chỉ nhờ em bầu cho ông A thôi, đây là chút quà. Bà con ai cũng nhận, bầu theo ý mình thì có sao đâu."
     },
     "bay": {
      "loai": "so_dong",
      "mo": "«Ai cũng nhận» làm việc nhận lợi ích để bầu trông như phép lịch sự."
     },
     "goi_y": [
      "Lá phiếu của em thuộc về ai, và ai được quyền quyết định em bầu cho ai?",
      "Ôn Lớp 11 Bài 14: hành vi nào bị cấm trong bầu cử, và công dân có quyền gì khi thấy vi phạm?",
      "«Bà con ai cũng nhận» và «bầu theo ý mình thì không sao» đều bỏ qua việc nhận lợi ích liên quan đến lá phiếu."
     ],
     "sb": {
      "bo": "nha",
      "nv": [
       "em",
       "ba|Bà ngoại",
       "nguoi_la"
      ],
      "noi": "nguoi_la",
      "tuy": [
       "tien"
      ]
     }
    }
   },
   "chuyen": []
  }
 ],
 "ket": [
  {
   "tu": 85,
   "ten": "Công dân trẻ vững vàng",
   "nd": "Từ cậu học trò chứng kiến một tấm kính vỡ, em trở thành người biết nói thật, biết đi đúng cửa, biết bảo vệ quyền của mình và tôn trọng quyền của người khác. Lá phiếu đầu tiên của em được bỏ bằng sự tự do và trách nhiệm."
  },
  {
   "tu": 65,
   "ten": "Người công dân đáng tin",
   "nd": "Em đã đi một quãng đường tốt: hiểu pháp luật và biết cư xử đúng ở nhiều ngã rẽ. Vài lần chọn vội vẫn để lại vết xước, và đó là những bài học cho em khi bước vào đời."
  },
  {
   "tu": 45,
   "ten": "Còn nhiều điều phải học",
   "nd": "Hành trình của em nhiều lần chệch hướng: sợ hãi, nóng giận hoặc làm theo đám đông. Pháp luật bảo vệ cả quyền lẫn trách nhiệm, và em còn cơ hội để chơi lại với những lựa chọn khác."
  },
  {
   "tu": 0,
   "ten": "Những bài học đắt giá",
   "nd": "Nhiều quyết định của em xâm phạm quyền người khác hoặc bỏ qua cách giải quyết đúng pháp luật. Mỗi người phải chịu trách nhiệm về hành vi của mình, hãy thử lại và chọn cách khác."
  }
 ],
 "ket_som": {
  "pl": {
   "ten": "Vướng vòng lao lí",
   "nd": "Những vi phạm chồng chất khiến em phải chịu trách nhiệm trước pháp luật. Tuân thủ pháp luật là kiềm chế không làm điều pháp luật cấm và chủ động làm điều pháp luật yêu cầu (Lớp 10 Bài 13)."
  },
  "dd": {
   "ten": "Danh dự tổn hại",
   "nd": "Cách hành xử của em làm uy tín và danh dự bị tổn hại nặng. Mọi người đều được pháp luật bảo hộ về danh dự, nhân phẩm, và mình cũng phải tôn trọng điều đó ở người khác (Lớp 11 Bài 17)."
  },
  "tc": {
   "ten": "Mất niềm tin của mọi người",
   "nd": "Bạn bè, hàng xóm không còn tin lời em. Sự tin cậy được xây từ những lần nói thật và làm đúng, nhưng có thể mất đi bởi vài lần nói dối hay làm sai."
  }
 },
 "hau": [
  {
   "co": "noi_that",
   "nd": "Cả khu phố nhớ em là người nói thật từ vụ tấm kính vỡ năm lớp 10."
  },
  {
   "co": "noi_doi",
   "nd": "Chuyện nói dối về tấm kính vỡ vẫn là điều em chưa dám kể với ai.",
   "khong": [
    "sua_hq_noi_doi"
   ]
  },
  {
   "co": "gop_y_dung",
   "nd": "Bản quy ước khu phố được sửa lại sau lời góp ý của em."
  },
  {
   "co": "dung_cua",
   "nd": "Em biết mỗi chuyện thuộc cơ quan nào giải quyết, nên bà con hay nhờ em chỉ đường."
  },
  {
   "co": "pha_rao",
   "nd": "Vụ phá rào năm nào vẫn khiến hai nhà hàng xóm ngại chào nhau.",
   "khong": [
    "sua_hq_pha_rao"
   ]
  },
  {
   "co": "giup_lan",
   "nd": "Lan vẫn đi học và đã thi đỗ trường mà bạn mơ ước."
  },
  {
   "co": "kiem_chung",
   "nd": "Nhóm chat lớp tin em hơn tin vào mọi ảnh chụp màn hình truyền tay."
  },
  {
   "co": "ba_tu_bo_phieu",
   "nd": "Bà tự tay bỏ phiếu và rất tự hào."
  },
  {
   "co": "bao_ve_cho_o",
   "nd": "Anh Dũng sống yên ổn trong phòng trọ của mình."
  },
  {
   "co": "binh_dang",
   "nd": "Chị Hà tìm được công việc ở nơi biết tôn trọng người lao động nữ."
  },
  {
   "co": "kien_nghi_dung",
   "nd": "Bãi rác cuối ngõ được xử lí sau kiến nghị đúng cách của bà con."
  },
  {
   "co": "bao_vao_dung_cach",
   "nd": "Minh không còn bị bắt nạt và vẫn là bạn thân của em."
  },
  {
   "co": "tra_vi",
   "nd": "Người đánh mất ví gửi em một tấm thiệp cảm ơn, em giữ đến tận bây giờ."
  },
  {
   "co": "hop_dong_ro",
   "nd": "Hợp đồng thuê trọ rõ ràng giúp em yên tâm học hành."
  },
  {
   "co": "cuu_chi_thu",
   "nd": "Chị Thu tiếp tục đi học và chưa phải lấy chồng sớm."
  },
  {
   "co": "phan_anh_moi_truong",
   "nd": "Dòng mương dần trong lại sau khi cơ quan có thẩm quyền vào cuộc."
  },
  {
   "co": "tu_choi_qua",
   "nd": "Em đã bỏ lá phiếu đầu tiên của mình bằng sự tự do và niềm tự hào."
  },
  {
   "co": "tin_phap_luat",
   "nd": "Từ buổi dự phiên toà ở sân toà, em tin rằng chứng cứ và thủ tục mới là điều bảo vệ mình."
  },
  {
   "co": "tin_quen_biet",
   "nd": "Cái hùa theo chuyện «quen một tiếng là xong» vẫn làm em ngại mỗi lần nhắc đến Toà án.",
   "khong": [
    "sua_hq_tin_quen_biet"
   ]
  },
  {
   "co": "mua_than_trong",
   "nd": "Thói quen tìm hiểu kĩ trước khi chuyển tiền giúp em tránh được một vụ lừa trên mạng."
  },
  {
   "co": "mat_tien_online",
   "nd": "Chuyện chuyển khoản vội cho người bán lạ vẫn là một bài học đắt giá của em.",
   "khong": [
    "sua_hq_mat_tien_online"
   ]
  },
  {
   "co": "sua_hq_noi_doi",
   "nd": "Em đã tìm cách sửa lại chuyện khai gian về tấm kính vỡ; niềm tin chưa trở lại như cũ, nhưng em không còn trốn tránh nó."
  },
  {
   "co": "sua_hq_pha_rao",
   "nd": "Em đã tìm cách làm lành sau vụ phá rào; chuyện cũ vẫn còn trong trí nhớ hai nhà."
  },
  {
   "co": "sua_hq_im_lang",
   "nd": "Em đã học cách không im lặng khi bị doạ; em vẫn nhớ có lúc mình từng quay đi."
  },
  {
   "co": "sua_hq_mat_tien_online",
   "nd": "Em đã sửa thói quen kí và chuyển tiền vội; chuyện mất tiền năm nào vẫn là bài học của em."
  },
  {
   "co": "sua_hq_chan_duong",
   "nd": "Em đã nhận phần của mình về vụ chặn xe và cùng bà con phản ánh đúng cách; bà con vẫn nhớ vụ chặn xe."
  },
  {
   "co": "sua_hq_tin_quen_biet",
   "nd": "Em đã sửa thói quen «quen một tiếng là xong» bằng cách tự làm đúng thủ tục; em vẫn nhớ mình từng hùa theo."
  },
  {
   "co": "sua_hq_bau_thay",
   "nd": "Em đã nói với bà về chuyện bầu thay năm trước và làm đúng ở lần sau; bà vẫn nhớ chuyện cũ."
  }
 ],
 "hq_lai": [
  {
   "id": "hq_noi_doi",
   "co": "noi_doi",
   "canh": "q2",
   "nd": "Vì năm lớp 10 em đã khai gian về tấm kính vỡ nên khi em đứng ra nói giúp anh Dũng, chị Mai khựng lại: «Em nói vậy, mà hồi đó em có nói thật đâu?». Lời của em nặng ít hơn trước.",
   "d": {
    "tc": -6,
    "dd": -3
   },
   "kp": [
    {
     "nhan": "Tìm gặp bác Sáu và chị Mai, kể thật chuyện tấm kính năm xưa và xin lỗi",
     "d": {
      "dd": -2,
      "tc": 5
     },
     "bl": "Nói thật dù muộn là cách sửa công bằng nhất: người gây ra chuyện phải tự chịu trách nhiệm, và pháp luật áp dụng cho mọi người như nhau (Lớp 10 Bài 11; Lớp 11 Bài 9). Em mất chút thể diện nhưng lấy lại được phần lớn niềm tin."
    },
    {
     "nhan": "Chỉ nói thêm với chị Mai rằng ngày đó em sợ nên không nói đúng",
     "d": {
      "tc": 2
     },
     "bl": "Người gây thiệt hại phải tự chịu trách nhiệm; nói với một người thì bác Sáu, người thật sự chịu thiệt, vẫn chưa nghe được sự thật (Lớp 10 Bài 11; Lớp 11 Bài 9)."
    }
   ]
  },
  {
   "id": "hq_pha_rao",
   "co": "pha_rao",
   "canh": "q4",
   "nd": "Vì em và bà từng cùng phá hàng rào nhà bên nên khi tổ dân phố đi lấy chữ kí kiến nghị về bãi rác, nhà bên cạnh quay đi: «Hồi đó nhà tôi có được ai xin lỗi đâu». Thiếu một chữ kí, thiếu một người đứng cùng.",
   "d": {
    "tc": -5,
    "dd": -3
   },
   "kp": [
    {
     "nhan": "Cùng bà sang xin lỗi nhà bên và đưa chuyện ranh giới về đúng nơi giải quyết",
     "d": {
      "dd": -1,
      "tc": 4,
      "pl": 2
     },
     "bl": "Tự phá hàng rào là xâm phạm tài sản của người khác; sửa sai là xin lỗi và đưa tranh chấp về đúng nơi giải quyết, Uỷ ban nhân dân cấp xã (Lớp 10 Bài 11, Bài 21). Hai nhà vẫn nhớ chuyện cũ."
    },
    {
     "nhan": "Nhờ người trong tổ dân phố sang nói giúp",
     "d": {
      "tc": 2
     },
     "bl": "Người gây thiệt hại phải tự chịu trách nhiệm về việc mình làm; nhờ người khác nói giúp chỉ gỡ được một phần (Lớp 10 Bài 11)."
    }
   ]
  },
  {
   "id": "hq_im_lang",
   "co": "im_lang",
   "canh": "q5",
   "nd": "Vì lần tấm kính vỡ em đã chọn im lặng khi bị doạ nên khi nhóm lớp bên doạ Minh, em thấy chính mình cũng đang muốn quay đi: «Chuyện của bọn nó, mình đừng dính vào». Em mất mấy phút do dự quý giá.",
   "d": {
    "dd": -2,
    "tc": -2
   },
   "kp": [
    {
     "nhan": "Tự nhắc mình: bị doạ thì phải kể với người có trách nhiệm, và nói với Minh em sẽ đi cùng",
     "d": {
      "dd": 1,
      "tc": 1
     },
     "bl": "Bị đe doạ thì nên báo cho người có trách nhiệm thay vì im lặng; im lặng làm người gây thiệt hại không phải chịu trách nhiệm (Lớp 10 Bài 11; Lớp 11 Bài 9). Em lấy lại một phần sự vững vàng, nhưng những phút do dự thì không lấy lại được."
    },
    {
     "nhan": "Hít một hơi dài rồi mới nghe Minh kể tiếp",
     "d": {
      "dd": 1
     },
     "bl": "Bình tĩnh giúp em nghe đủ, nhưng nếu chỉ dừng ở đó thì em vẫn chưa làm điều pháp luật khuyên: báo cho người có trách nhiệm (Lớp 10 Bài 11; Lớp 11 Bài 9)."
    }
   ]
  },
  {
   "id": "hq_mat_tien_online",
   "co": "mat_tien_online",
   "canh": "r2",
   "nd": "Vì em từng chuyển tiền vội cho người bán lạ và mất tiền nên bạn thân nhìn em cầm bản hợp đồng thuê trọ, trêu nhẹ: «Lại định kí vội à?». Chủ nhà thấy em ngập ngừng liền hối: «Cọc đi, còn người khác hỏi đấy».",
   "d": {
    "dd": -3
   },
   "kp": [
    {
     "nhan": "Nói với chủ nhà em cần đọc kĩ và hỏi người lớn rồi mới kí",
     "d": {
      "dd": 2
     },
     "bl": "Tiêu dùng thông minh là tìm hiểu kĩ thông tin và quyết định sau khi có đủ thông tin để tránh thiệt hại (Lớp 11 Bài 8). Chuyện mất tiền năm trước vẫn là bài học của em."
    },
    {
     "nhan": "Nhờ bạn thân đọc giúp một lượt rồi mới kí",
     "d": {
      "dd": 1
     },
     "bl": "Có thêm người đọc giúp thì thông tin đầy đủ hơn, nhưng quyết định vẫn là của em (Lớp 11 Bài 8)."
    }
   ]
  },
  {
   "id": "hq_chan_duong",
   "co": "chan_duong",
   "canh": "r5",
   "nd": "Vì lần trước em cùng mọi người chặn xe rác nên khi dòng mương đổi màu, bà con ngại đứng ra phản ánh: «Lần trước bị nhắc nhở rồi, ai còn dám làm?». Em phải thuyết phục lại từ đầu.",
   "d": {
    "tc": -5,
    "dd": -3
   },
   "kp": [
    {
     "nhan": "Nhận phần của mình với bà con và rủ mọi người cùng kí đơn phản ánh đúng cách lần này",
     "d": {
      "dd": -1,
      "tc": 4
     },
     "bl": "Công dân có quyền kiến nghị với cơ quan nhà nước về vấn đề của địa phương, nhưng phải thực hiện theo quy định của pháp luật (Lớp 11 Bài 13, Bài 20). Bà con tin lại dần, nhưng chuyện chặn xe vẫn còn trong trí nhớ."
    },
    {
     "nhan": "Nhờ bác Sáu đứng ra thay em",
     "d": {
      "tc": 2
     },
     "bl": "Nhờ người khác đứng ra thì em chưa sửa được lòng tin của bà con; quyền kiến nghị vẫn phải thực hiện theo đúng quy định (Lớp 11 Bài 13, Bài 20)."
    }
   ]
  },
  {
   "id": "hq_tin_quen_biet",
   "co": "tin_quen_biet",
   "canh": "r6",
   "nd": "Vì em từng hùa theo chuyện «quen một tiếng là xong» nên khi thấy ngày sinh trong danh sách cử tri bị ghi sai, điều đầu tiên em nghĩ đến là nhờ một người quen ở phường «nói giúp một tiếng». Em mất mấy ngày chờ tin mà chưa có giấy tờ nào.",
   "d": {
    "pl": -4,
    "dd": -2
   },
   "kp": [
    {
     "nhan": "Dừng lại, hỏi nơi phụ trách về thủ tục chính thức và mang theo giấy tờ tuỳ thân",
     "d": {
      "pl": 3,
      "dd": 1
     },
     "bl": "Làm đúng thủ tục và có chứng cứ mới là cách bảo vệ quyền của mình; pháp luật áp dụng với mọi người như nhau, không nhờ quen biết (Lớp 10 Bài 20, Bài 11). Mấy ngày đã mất thì không lấy lại được."
    },
    {
     "nhan": "Nhờ người quen hỏi giúp xem cần giấy tờ gì",
     "d": {
      "pl": 1
     },
     "bl": "Hỏi cho rõ thủ tục là đúng hướng, nhưng em vẫn chưa tự mình làm đúng thủ tục (Lớp 10 Bài 20, Bài 11)."
    }
   ]
  },
  {
   "id": "hq_bau_thay",
   "co": "bau_thay",
   "canh": "r7",
   "nd": "Vì năm trước em đã cầm thẻ đi bầu thay bà nên bà ngoại nhìn em hồi lâu rồi nói khẽ: «Lần này con tự đi, và con nhớ lá phiếu không ai được làm thay». Bà vẫn buồn về chuyện năm trước.",
   "d": {
    "tc": -4,
    "dd": -2
   },
   "kp": [
    {
     "nhan": "Nói với bà: năm trước em làm chưa đúng, năm nay em tự đi bầu và cùng bà tìm cách đúng cho lần sau",
     "d": {
      "dd": -1,
      "tc": 3
     },
     "bl": "Cử tri phải tự mình đi bầu; người không tự viết được phiếu có thể nhờ người khác viết hộ nhưng phải tự bỏ phiếu (Lớp 11 Bài 14). Bà nguôi dần, nhưng chuyện năm trước vẫn còn đó."
    },
    {
     "nhan": "Hứa với bà là năm nay em sẽ làm đúng",
     "d": {
      "tc": 1
     },
     "bl": "Lời hứa chưa đủ: điều sửa được sai là tự mình thực hiện đúng nguyên tắc cử tri tự đi bầu (Lớp 11 Bài 14)."
    }
   ]
  }
 ]
});
