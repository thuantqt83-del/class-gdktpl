/* Lớp học thông minh · HÀNH TRÌNH «NGƯỜI TƯ VẤN» — vai thứ hai của «Pháp luật quanh ta» (giai đoạn D, 23/11/2026). ✅ BẢN NHÁP — thầy/cô duyệt trước khi dùng.
   Em là người tư vấn tập sự ở «Góc tư vấn pháp luật» của khu phố Hoà Bình (hoạt động của Câu lạc bộ pháp luật, có cô cố vấn; tên nơi chốn và nhân vật là TƯỢNG TRƯNG, không phải cơ quan thật).
   Mỗi cảnh là một vụ việc: có người đến nhờ tư vấn, em nghe, (có cảnh) lập «hồ sơ vụ việc» bằng bàn thu thập chứng cứ, rồi chọn lời khuyên. Lời khuyên để lại «dấu vết» (cờ): người được khuyên QUAY LẠI ở cảnh sau (them) và ở lời nối chương (chuyen), màn kết (hau) — em chịu trách nhiệm với lời khuyên của mình.
   Quy ước giống hanhtrinh_pl.js: tot 2/1/0; d = chỉ số; cd = đặt cờ; di = cảnh kế; them = kể thêm theo cờ; chuyen = lời nối chương; hau = «hậu vận» ở màn kết.
   Lời bình CHỈ dùng nguyên tắc có trong bài đã duyệt (ghi Lớp, Bài); không nêu điều luật cụ thể ngoài bài, không nêu mức phạt, không kết luận tội danh; số liệu, tên người, địa danh là giả định.
   Tư vấn ≠ quyết định: em chỉ nêu nguyên tắc, chỉ đúng nơi cần đến, không hứa kết quả, không bịa quy định, không giúp ai làm điều sai trái.
   Phương án đúng KHÔNG được dài hay chi tiết hơn các phương án khác (kiểm bằng _cong-cu/game/kiem_hanhtrinh.js). Dữ liệu thuần, không có lệnh. */
SC.data.game = SC.data.game || {};
SC.data.game.hanhtrinh = SC.data.game.hanhtrinh || [];
SC.data.game.hanhtrinh.push({
 "id": "nguoi-tu-van",
 "nhom": "pl",
 "ten": "Người tư vấn",
 "mau": "#1f8a70",
 "cap_nhat": "23/11/2026",
 "duyet": "chưa",
 "icon": "users",
 "khau_hieu": "Một lời khuyên đúng giúp được một người; một lời khuyên vội có thể hại họ",
 "gioi_thieu": "Em ngồi ở Góc tư vấn pháp luật của khu phố Hoà Bình cùng cô cố vấn. Bà con, bạn bè đến hỏi chuyện thật của họ: lá đơn khiếu nại, chiếc điện thoại của con, bài đăng trên mạng, gói hàng lạ, ngành học, cái quầy hàng, chiếc bình cổ… Em không phải luật sư và không thay cơ quan nhà nước quyết định. Việc của em là nghe cho kĩ, nêu đúng nguyên tắc, chỉ đúng nơi cần đến, và chịu trách nhiệm với lời khuyên của mình, vì lời khuyên nào cũng sẽ quay lại ở chương sau.",
 "vai": "Vai của em: người tư vấn tập sự ở Góc tư vấn pháp luật. Nhiệm vụ: nghe người đến hỏi, hỏi thêm sự việc, nêu nguyên tắc có trong bài học, hướng dẫn đúng nơi cần đến. Không hứa kết quả, không bịa quy định, không giúp ai làm điều sai trái.",
 "thoi_luong": "khoảng 10–15 phút",
 "chi_so": [
  { "id": "ql", "ten": "Quyền lợi của người được tư vấn", "dau": 50 },
  { "id": "nt", "ten": "Niềm tin của người dân", "dau": 50 },
  { "id": "dq", "ten": "Đúng quy định", "dau": 50 }
 ],
 "chuong": [
  {
   "khoi": 11,
   "ten": "Nghe cho kĩ rồi mới khuyên",
   "thoi_gian": "Lớp 11",
   "mo": "Lớp 11. Em vào Câu lạc bộ pháp luật của trường. Cuối tuần, em ngồi ở Góc tư vấn của nhà văn hoá khu phố, bên cạnh cô cố vấn. Người ta tìm đến em vì tin, nhưng em không phải luật sư và không biết hết mọi quy định. Việc đầu tiên là nghe cho kĩ, rồi mới khuyên.",
   "bai": ["11-b15", "11-b19", "11-b20", "11-b17", "11-b09", "12-b10", "12-b09"],
   "co_mac_dinh": [],
   "bat_dau": "tv1",
   "canh": {
    "tv1": {
     "tieu_de": "Lá đơn «nặng ký»",
     "nd": "Chú Tám, chủ quán nước đầu ngõ, cầm đến Góc tư vấn một quyết định của Uỷ ban nhân dân phường buộc chú dỡ phần mái che lấn ra vỉa hè. Chú bực vì nhà bên lấn nhiều hơn mà chưa ai nhắc. Chú muốn viết đơn khiếu nại, và thêm cả chuyện «nghe nói ông cán bộ nhận quà của nhà bên».",
     "chon": [
      {
       "nhan": "Giúp chú tách khiếu nại khỏi tố cáo; chỉ nêu điều có giấy tờ, gửi đúng nơi, trong lúc chờ vẫn chấp hành quyết định.",
       "tot": 2, "d": { "ql": 6, "nt": 6, "dq": 8 }, "cd": ["khieu_nai_dung"],
       "bl": "Khiếu nại là đề nghị xem xét lại quyết định hành chính theo thủ tục luật định: phải gửi đúng người có thẩm quyền, trình bày trung thực, cung cấp chứng cứ và chấp hành quyết định trong thời gian khiếu nại. Việc tố cáo hành vi vi phạm của người khác cũng phải có căn cứ (Lớp 11 Bài 15).",
       "di": "tv2"
      },
      {
       "nhan": "Viết thêm chuyện «nghe nói» về cán bộ vào đơn cho nặng ký, rồi khuyên chú cứ giữ nguyên mái che đến khi có kết quả để khỏi chịu thua.",
       "tot": 0, "d": { "ql": -8, "nt": -6, "dq": -12 }, "cd": ["don_them_chuyen"],
       "bl": "Người khiếu nại, tố cáo phải trình bày trung thực và chịu trách nhiệm trước pháp luật; cố ý tố cáo sai sự thật có thể phải bồi thường. Trong thời gian khiếu nại vẫn phải chấp hành quyết định bị khiếu nại, trừ khi quyết định bị tạm đình chỉ (Lớp 11 Bài 15).",
       "di": "tv2",
       "loi_sai": "Đưa tin chưa kiểm chứng vào đơn và khuyên chú không chấp hành quyết định.",
       "rui_ro": "Chú có thể phải chịu trách nhiệm vì trình bày không trung thực, mái che vẫn bị buộc dỡ, và lá đơn mất sức thuyết phục."
      },
      {
       "nhan": "Giúp chú viết đúng đơn khiếu nại, gửi đúng nơi, kèm giấy tờ, nhưng không nhắc việc vẫn phải chấp hành quyết định trong lúc chờ.",
       "tot": 1, "d": { "ql": -3, "nt": -2, "dq": -5 }, "cd": ["khieu_nai_thieu"],
       "bl": "Đơn đúng thẩm quyền và có chứng cứ là điều cần, nhưng người khiếu nại còn phải chấp hành quyết định bị khiếu nại trong thời gian khiếu nại, trừ khi quyết định bị tạm đình chỉ (Lớp 11 Bài 15).",
       "di": "tv2",
       "loi_sai": "Bỏ sót nghĩa vụ chấp hành quyết định trong lúc khiếu nại.",
       "rui_ro": "Chú để nguyên mái che, bị coi là không chấp hành, làm yếu chính lá đơn khiếu nại đúng của mình."
      }
     ],
     "chung_cu": {
      "mo": "Chú Tám đã quyết khiếu nại. Trước khi giúp chú viết, em cân nhắc nên đính kèm những gì vào hồ sơ.",
      "toi_da": 3,
      "vat": [
       { "id": "quyet_dinh", "ten": "Quyết định của Uỷ ban nhân dân phường", "mo": "Bản quyết định chú nhận được, có ngày tháng, nội dung và người ký.", "loai": "can", "bl": "Là đối tượng của khiếu nại; phải nêu rõ quyết định nào, ban hành khi nào thì mới có người xem xét lại." },
       { "id": "giay_to", "ten": "Giấy tờ chú có liên quan đến mái che", "mo": "Biên nhận, ảnh quán từ trước, thoả thuận với người cho thuê nhà (nếu có).", "loai": "can", "bl": "Chứng cứ cho điều chú trình bày; khiếu nại phải trung thực và cung cấp chứng cứ (Lớp 11 Bài 15)." },
       { "id": "anh_nha_ben", "ten": "Ảnh chụp phần mái che nhà bên cạnh", "mo": "Ảnh chụp từ lề đường, thấy rõ mức lấn ra vỉa hè.", "loai": "huu_ich", "bl": "Giúp nêu rõ cảm giác bị đối xử không đồng đều, nhưng chỉ là phần bổ sung; việc nhà bên cần do cơ quan có thẩm quyền xem xét riêng." },
       { "id": "tin_don", "ten": "Chuyện «nghe nói ông cán bộ nhận quà»", "mo": "Lời đồn từ vài người quen, không ai nhớ mình nghe từ đâu.", "loai": "nhieu", "bl": "Tin đồn chưa kiểm chứng không phải chứng cứ; đưa vào đơn làm lá đơn thiếu trung thực và loãng phần chính." },
       { "id": "anh_gia_dinh", "ten": "Ảnh gia đình và trang cá nhân của cán bộ ký quyết định", "mo": "Chú tìm được trên mạng, định in kèm «cho họ biết chú không sợ».", "loai": "nguy", "bl": "Đưa thông tin riêng của người khác ra để gây áp lực là xâm phạm danh dự, nhân phẩm (Lớp 11 Bài 17)." }
      ]
     },
     "loi_dan": { "ai": "Chú Tám", "nd": "Em cứ thêm mấy chuyện người ta đồn vào đơn cho nặng ký, họ mới sợ. Còn cái mái che thì để nguyên, khiếu nại xong rồi tính, dỡ bây giờ là chịu thua." },
     "bay": { "loai": "cam_xuc", "mo": "Bực tức vì thấy bất công khiến em muốn viết cho «nặng ký» chứ không viết cho đúng." },
     "goi_y": [
      "Trong lá đơn của chú, đâu là phần xin xem lại quyết định, đâu là phần nói về hành vi của người khác, và điều nào có giấy tờ chứng minh?",
      "Ôn Lớp 11 Bài 15: khiếu nại và tố cáo khác nhau thế nào, và người khiếu nại có những nghĩa vụ gì trong lúc chờ giải quyết?",
      "«Chuyện người ta đồn» và «bất công nên không chịu chấp hành» đều đang đẩy lá đơn ra xa khỏi điều có căn cứ."
     ],
     "sb": { "bo": "van_phong", "nv": ["em", "chu_tam", "co_van"], "noi": "chu_tam", "tuy": ["giay"] }
    },
    "tv2": {
     "tieu_de": "Điện thoại của Vy",
     "nd": "Chị hàng xóm, mẹ của Vy (lớp 11), ngồi xuống Góc tư vấn, giọng lo lắng. Dạo này Vy hay úp điện thoại xuống bàn, nhắn tin đến khuya. Chị muốn lén đọc tin nhắn của con và nhờ em chỉ cách cài phần mềm theo dõi cho «yên tâm».",
     "chon": [
      {
       "nhan": "Nói rõ tin nhắn riêng được giữ bí mật; gợi ý chị trò chuyện cởi mở với Vy, cùng đặt quy tắc dùng điện thoại, và nhờ trường hỗ trợ khi cần.",
       "tot": 2, "d": { "ql": 6, "nt": 8, "dq": 6 }, "cd": ["me_tro_chuyen"],
       "bl": "Thư tín, điện thoại và các hình thức trao đổi thông tin riêng tư được bảo đảm bí mật; việc kiểm soát chỉ thực hiện khi pháp luật quy định. Cha mẹ có nghĩa vụ và quyền thương yêu, tôn trọng ý kiến, chăm lo và bảo vệ con, nên trò chuyện và cùng đặt quy tắc là cách phù hợp (Lớp 11 Bài 19; Lớp 12 Bài 10).",
       "di": "tv3"
      },
      {
       "nhan": "Chỉ cho chị cách cài phần mềm theo dõi lén tin nhắn của Vy, vì chị là mẹ, đang lo cho con và cần biết con nhắn tin với ai mỗi ngày.",
       "tot": 0, "d": { "ql": -8, "nt": -12, "dq": -6 }, "cd": ["me_theo_doi"],
       "bl": "Tin nhắn, điện thoại riêng được bảo đảm bí mật; việc kiểm soát chỉ thực hiện trong trường hợp pháp luật quy định, theo đúng trình tự. Học sinh cũng cần tôn trọng quyền này của người khác (Lớp 11 Bài 19).",
       "di": "tv3",
       "loi_sai": "Hướng dẫn xem lén tin nhắn riêng của con.",
       "rui_ro": "Xâm phạm bí mật tin nhắn của Vy, mất niềm tin giữa hai mẹ con, mà chị vẫn không biết điều con thật sự gặp phải."
      },
      {
       "nhan": "Khuyên chị đừng hỏi han hay làm gì cả vì Vy có quyền riêng tư, cứ chờ khi nào con muốn tự kể cho chị nghe thì tính tiếp.",
       "tot": 1, "d": { "ql": -3, "nt": -5, "dq": -2 }, "cd": ["me_mac_ke"],
       "bl": "Quyền bí mật tin nhắn của con cần được tôn trọng, nhưng cha mẹ vẫn có nghĩa vụ chăm lo, bảo vệ con chưa thành niên; vì vậy cần trò chuyện và nhờ nhà trường hoặc cơ quan có thẩm quyền khi có dấu hiệu nguy hiểm (Lớp 11 Bài 19; Lớp 12 Bài 10).",
       "di": "tv3",
       "loi_sai": "Bỏ mặc nỗi lo của người mẹ, chỉ nhấn mạnh quyền riêng tư.",
       "rui_ro": "Nếu Vy thật sự gặp nguy hiểm thì không ai biết; chị tiếp tục lo và có thể làm điều vội vàng."
      }
     ],
     "loi_dan": { "ai": "Mẹ của Vy", "nd": "Chị là mẹ, con còn nhỏ thì chị có quyền biết hết. Em cứ chỉ cách cài lén cho chị, con không biết thì có sao đâu." },
     "bay": { "loai": "uy_quyen", "mo": "«Là mẹ thì có quyền» khiến em muốn xuôi theo thay vì nêu nguyên tắc." },
     "goi_y": [
      "Nỗi lo của người mẹ là gì, và còn cách nào làm chị yên lòng mà không phải đọc lén tin nhắn của con?",
      "Ôn Lớp 11 Bài 19 và Lớp 12 Bài 10: tin nhắn riêng được bảo vệ thế nào, và cha mẹ có những nghĩa vụ gì với con chưa thành niên?",
      "«Là mẹ thì có quyền» mới nhìn một phía của câu chuyện, còn «cứ để con yên» thì nhìn phía ngược lại."
     ],
     "sb": { "bo": "van_phong", "nv": ["em", "chi_hx|Mẹ của Vy", "co_van"], "noi": "chi_hx", "tuy": ["dien_thoai"] }
    },
    "tv3": {
     "tieu_de": "Bài cảnh báo chưa kiểm chứng",
     "nd": "Minh, bạn cùng Câu lạc bộ, nhờ em duyệt bài trước khi đăng lên trang của lớp: «Cảnh báo: quán chè đầu ngõ bán đồ ôi, Lan ăn xong đau bụng phải đi viện!». Em hỏi lại thì Lan chỉ đau bụng nhẹ, chưa ai biết do món nào. Minh định gắn luôn tên quán và ảnh chủ quán «cho cả khu phố biết».",
     "chon": [
      {
       "nhan": "Đề nghị Minh hỏi lại Lan và gia đình, chưa đăng; có căn cứ thì phản ánh tới cơ quan có thẩm quyền, không nêu tên hay ảnh chủ quán.",
       "tot": 2, "d": { "ql": 6, "nt": 6, "dq": 8 }, "cd": ["kiem_chung_truoc_dang"],
       "bl": "Công dân có quyền phản ánh, tố cáo nhưng phải trung thực, chịu trách nhiệm về thông tin mình đưa ra và kiểm tra thông tin trước khi chia sẻ; bịa đặt hoặc loan truyền điều sai sự thật làm tổn hại danh dự người khác là vi phạm (Lớp 11 Bài 20, Bài 17).",
       "di": "tv4"
      },
      {
       "nhan": "Cho Minh đăng ngay như bản nháp, vì mục đích cảnh báo là tốt, rồi nếu sau này sai thì gỡ bài và xin lỗi chủ quán cũng chưa muộn.",
       "tot": 0, "d": { "ql": -8, "nt": -8, "dq": -12 }, "cd": ["dang_sai"],
       "bl": "Thông tin sai sự thật hoặc xúc phạm danh dự, nhân phẩm người khác bị cấm; người đăng phải chịu trách nhiệm về điều mình đăng. Danh dự, nhân phẩm, uy tín của cá nhân được pháp luật bảo hộ (Lớp 11 Bài 20, Bài 17).",
       "di": "tv4",
       "loi_sai": "Cho đăng thông tin chưa kiểm chứng, kèm tên và ảnh người khác.",
       "rui_ro": "Có thể làm sai lệch sự thật và tổn hại danh dự chủ quán; Minh phải chịu trách nhiệm, và gỡ bài cũng khó xoá hết ảnh hưởng."
      },
      {
       "nhan": "Cho đăng nhưng bỏ ảnh chủ quán và thêm chữ «nghe nói» ở đầu bài, cho nhẹ hơn mà vẫn kịp cảnh báo mọi người trong khu phố.",
       "tot": 1, "d": { "ql": -2, "nt": -3, "dq": -5 }, "cd": ["dang_nghe_noi"],
       "bl": "Bỏ ảnh là bớt xâm phạm, nhưng thông tin vẫn chưa được kiểm chứng. Cần kiểm tra thông tin trước khi chia sẻ và chịu trách nhiệm về điều mình đăng (Lớp 11 Bài 20).",
       "di": "tv4",
       "loi_sai": "Thêm chữ «nghe nói» và tưởng như thế là đủ an toàn.",
       "rui_ro": "Tin chưa kiểm chứng vẫn lan ra, quán vẫn bị ảnh hưởng và Minh vẫn có thể phải chịu trách nhiệm."
      }
     ],
     "loi_dan": { "ai": "Minh", "nd": "Đăng ngay đi, chậm là còn người ăn phải đấy! Mà bài giật gân thì mới nhiều người chia sẻ. Sai thì xoá bài là xong." },
     "bay": { "loai": "thoi_gian", "mo": "Sức ép «phải đăng ngay kẻo hại người khác» khiến em bỏ qua bước kiểm chứng." },
     "goi_y": [
      "Ai đã xác nhận Lan đau bụng vì quán chè? Nếu chưa ai xác nhận thì bài viết đang khẳng định điều gì?",
      "Ôn Lớp 11 Bài 20 và Bài 17: người đăng bài phải chịu trách nhiệm gì, và danh dự của chủ quán được bảo vệ ra sao?",
      "«Chậm là hại người» và «sai thì xoá» đều coi nhẹ việc kiểm tra trước khi đăng."
     ],
     "sb": { "bo": "mang", "nv": ["em", "minh"], "noi": "minh", "tuy": [] }
    },
    "tv4": {
     "tieu_de": "Bị giữ lại sau tiệm",
     "nd": "Chiều thứ bảy, điện thoại ở Góc tư vấn rung lên: Tuấn, bạn cùng khối đang làm thêm ở tiệm trà sữa, nhắn gấp. Tuấn làm rơi vỡ chiếc ấm của tiệm. Chủ tiệm đóng cửa sau lại, nói không đền xong thì không cho về và đòi giữ luôn điện thoại của Tuấn.",
     "chon": [
      {
       "nhan": "Khuyên Tuấn bình tĩnh, nhận đền theo thiệt hại thực tế nhưng nói rõ không ai được giữ người; gọi người thân, vẫn bị giữ thì báo công an.",
       "tot": 2, "d": { "ql": 8, "nt": 6, "dq": 6 }, "cd": ["giu_nguoi_dung"],
       "bl": "Mọi người có quyền bất khả xâm phạm về thân thể, không ai bị bắt hay giữ người nếu không đúng quy định pháp luật; đồng thời người làm hư hỏng tài sản của người khác phải tự chịu trách nhiệm sửa chữa, bồi thường (Lớp 11 Bài 17, Bài 9; Lớp 12 Bài 9).",
       "di": "ket"
      },
      {
       "nhan": "Khuyên Tuấn cứ ở lại, đưa hết số tiền có để đền ngay và để chủ tiệm giữ điện thoại cho đến khi xong, kẻo làm to chuyện lên thì mất cả việc làm thêm.",
       "tot": 0, "d": { "ql": -12, "nt": -6, "dq": -8 }, "cd": ["chiu_giu_nguoi"],
       "bl": "Giữ người trái pháp luật xâm phạm quyền bất khả xâm phạm về thân thể của công dân; việc bồi thường phải theo thiệt hại thực tế và đúng trình tự, không phải do một bên tự ý ép buộc (Lớp 11 Bài 17; Lớp 12 Bài 9).",
       "di": "ket",
       "loi_sai": "Chấp nhận bị giữ người và giữ điện thoại để cho nhanh.",
       "rui_ro": "Không ai kiểm tra thiệt hại thật là bao nhiêu; Tuấn có thể đền quá mức và vẫn bị giữ cho đến khi chủ tiệm cho phép."
      },
      {
       "nhan": "Khuyên Tuấn nói chủ tiệm không có quyền giữ mình rồi bỏ về ngay; chuyện đền tính sau hoặc không đền, vì Tuấn đâu có cố ý làm rơi vỡ.",
       "tot": 1, "d": { "ql": -5, "nt": -2, "dq": -3 }, "cd": ["bo_ve_khong_den"],
       "bl": "Không ai được giữ người trái quy định, nhưng người làm hư hỏng tài sản của người khác vẫn phải sửa chữa, bồi thường; hai việc này đi cùng nhau chứ không loại trừ nhau (Lớp 11 Bài 17, Bài 9; Lớp 12 Bài 9).",
       "di": "ket",
       "loi_sai": "Chỉ nhìn quyền của Tuấn, quên trách nhiệm với chiếc ấm vỡ.",
       "rui_ro": "Tuấn thoát được nhưng nghĩa vụ sửa chữa, bồi thường nếu có lỗi vẫn còn; tranh chấp có thể kéo dài và căng hơn."
      }
     ],
     "loi_dan": { "ai": "Tuấn (nhắn qua điện thoại)", "nd": "Cậu nói nhanh giúp mình, chủ tiệm bảo 5 phút nữa không đền là gọi cho bố mẹ mình. Chắc mình cứ ở lại đền hết cho xong, đừng làm to chuyện." },
     "bay": { "loai": "thoi_gian", "mo": "Sức ép «5 phút» khiến em khuyên vội theo cách nhanh nhất thay vì cách đúng." },
     "goi_y": [
      "Chủ tiệm đang làm hai việc: đòi đền chiếc ấm và giữ Tuấn lại. Mỗi việc đó có đúng không?",
      "Ôn Lớp 11 Bài 17, Bài 9 và Lớp 12 Bài 9: ai được quyền giữ một người, và người làm hỏng đồ của người khác phải làm gì?",
      "Tuấn đang bị hối thúc từng phút; hãy tách «việc phải đền» ra khỏi «việc bị giữ lại»."
     ],
     "sb": { "bo": "van_phong", "nv": ["em", "co_van"], "noi": "dt", "tuy": ["dien_thoai"] }
    }
   },
   "chuyen": [
    { "nd": "Hết lớp 11. Góc tư vấn có thêm tên em trong sổ tiếp nhận. Có người cảm ơn, có người vẫn chưa hiểu hết lời em nói. Lên lớp 12, những người em từng khuyên bắt đầu quay lại, và em nhận ra mỗi lời khuyên đều có người phải sống với kết quả của nó." },
    { "co": "khieu_nai_dung", "nd": "Chú Tám nộp đơn đúng nơi, dỡ mái che theo quyết định và chờ kết quả. Chú ghé Góc tư vấn, bảo: «Làm đúng cửa thấy nhẹ người»." },
    { "co": "don_them_chuyen", "nd": "Lá đơn thêm chuyện «nghe nói» bị trả lại vì không có căn cứ, chú Tám còn bị nhắc nhở. Chú ngại gặp em từ đó." },
    { "co": "khieu_nai_thieu", "nd": "Chú Tám nộp đơn nhưng để nguyên mái che chờ kết quả, bị nhắc thêm một lần vì chưa chấp hành quyết định." },
    { "co": "me_tro_chuyen", "nd": "Mẹ Vy chọn nói chuyện với con. Hai mẹ con thống nhất quy tắc dùng điện thoại, Vy bớt giấu giếm." },
    { "co": "me_theo_doi", "nd": "Vy phát hiện mẹ cài phần mềm xem tin nhắn. Hai mẹ con cãi nhau, Vy hầu như không còn kể gì ở nhà." },
    { "co": "me_mac_ke", "nd": "Mẹ Vy vẫn lo mà không biết mở lời. Hai mẹ con ngày càng im lặng với nhau." },
    { "co": "kiem_chung_truoc_dang", "nd": "Minh hỏi lại và biết Lan đau bụng vì chuyện khác. Bài đăng không ra đời; quán chè vẫn bán, Minh bớt nóng vội." },
    { "co": "dang_sai", "nd": "Bài đăng của Minh lan nhanh, nhưng Lan nói đau bụng vì ăn quà vặt ở chỗ khác. Chủ quán chè đòi gỡ bài và xin lỗi, Minh bị nhà trường nhắc nhở." },
    { "co": "dang_nghe_noi", "nd": "Bài «nghe nói» vẫn lan trong nhóm lớp, quán chè vắng khách mấy ngày rồi Minh phải gỡ bài." },
    { "co": "giu_nguoi_dung", "nd": "Tuấn bình tĩnh nói chuyện, gọi bố mẹ, hai bên thoả thuận mức đền hợp lí và điện thoại được trả lại." },
    { "co": "chiu_giu_nguoi", "nd": "Tuấn ở lại đền hết số tiền có. Về nhà, bố mẹ Tuấn mới biết chuyện và rất bức xúc." },
    { "co": "bo_ve_khong_den", "nd": "Tuấn bỏ về, chủ tiệm gọi đến nhà đòi đền và hai nhà căng thẳng suốt mấy tuần." }
   ]
  },
  {
   "khoi": 12,
   "ten": "Lời khuyên có người nhận lấy hậu quả",
   "thoi_gian": "Lớp 12",
   "mo": "Lớp 12. Góc tư vấn đông hơn. Người ta tin em nhiều hơn, và vì tin nên có người muốn em nói đúng điều họ muốn nghe. Em cũng nhận ra lời khuyên của mình không biến mất sau buổi tư vấn: nó theo người nghe về nhà.",
   "bai": ["12-b08", "11-b08", "12-b11", "12-b10", "12-b13", "12-b09"],
   "co_mac_dinh": [],
   "bat_dau": "tv5",
   "canh": {
    "tv5": {
     "tieu_de": "Đơn hàng bất thường",
     "nd": "Bác Hải chìa điện thoại cho em xem: có người xưng là nhân viên giao hàng, nói bác có một đơn «con trai đặt» đang chờ giao, phải chuyển khoản ngay và đọc mã trong tin nhắn thì mới được giao hoặc huỷ. Bác không biết con trai có đặt gì không, con bác đang đi làm xa.",
     "chon": [
      {
       "nhan": "Khuyên bác chưa chuyển tiền hay đọc mã; hỏi lại con, giữ lại tin nhắn và cuộc gọi; nghi bị lừa thì báo cơ quan có thẩm quyền.",
       "tot": 2, "d": { "ql": 8, "nt": 6, "dq": 4 }, "cd": ["tu_van_than_trong"],
       "bl": "Người tiêu dùng thông minh tìm hiểu kĩ thông tin trước khi mua và chi tiền, nên cần kiểm tra thông tin trước khi làm theo. Khi nghi có hành vi vi phạm, công dân có quyền tố cáo với cơ quan có thẩm quyền và cung cấp thông tin trung thực (Lớp 11 Bài 8, Bài 20, Bài 15).",
       "di": "tv6"
      },
      {
       "nhan": "Khuyên bác chuyển khoản ngay cho kịp, mất ít tiền thôi còn hơn mang tiếng nhận hàng của con rồi bùng đơn, để người ta nói ra nói vào.",
       "tot": 0, "d": { "ql": -12, "nt": -8, "dq": -4 }, "cd": ["mat_tien"],
       "bl": "Chi tiền khi chưa tìm hiểu kĩ thông tin là trái với thói quen tiêu dùng thông minh; thông tin nhận được cần được kiểm tra trước khi làm theo (Lớp 11 Bài 8, Bài 20).",
       "di": "tv6",
       "loi_sai": "Làm theo yêu cầu gấp của người lạ mà chưa kiểm tra.",
       "rui_ro": "Bác có thể mất tiền oan, và thông tin cá nhân có thể bị lợi dụng cho những lần sau."
      },
      {
       "nhan": "Khuyên bác không nhận gói hàng rồi thôi, không cần giữ lại tin nhắn hay báo ai cho đỡ phiền phức và mất thời gian thêm.",
       "tot": 1, "d": { "ql": -5, "nt": -3, "dq": -2 }, "cd": ["bo_qua_don"],
       "bl": "Từ chối làm theo là đúng, nhưng công dân có quyền và trách nhiệm tố cáo hành vi nghi vi phạm, cung cấp thông tin trung thực cho cơ quan có thẩm quyền (Lớp 11 Bài 15, Bài 17).",
       "di": "tv6",
       "loi_sai": "Từ chối đúng nhưng không giữ thông tin và không báo ai.",
       "rui_ro": "Những người khác cũng có thể bị gọi như thế; nếu bác bị liên lạc lại, không còn thông tin nào để làm căn cứ."
      }
     ],
     "chung_cu": {
      "mo": "Bác Hải muốn báo cho cơ quan có thẩm quyền. Em hướng dẫn bác giữ lại những gì?",
      "toi_da": 3,
      "vat": [
       { "id": "lich_su_goi", "ten": "Số điện thoại, giờ gọi và lịch sử cuộc gọi", "mo": "Bác còn lưu các cuộc gọi nhỡ và số gọi đến.", "loai": "can", "bl": "Giúp cơ quan có thẩm quyền lần theo đúng số và thời điểm thay vì chỉ nghe kể lại." },
       { "id": "tin_nhan", "ten": "Tin nhắn có mã đơn và yêu cầu chuyển khoản", "mo": "Tin nhắn người gọi gửi, ghi mã đơn và số tiền cần chuyển.", "loai": "can", "bl": "Là nội dung chính của việc đáng ngờ; giữ nguyên để làm căn cứ." },
       { "id": "loi_ke", "ten": "Lời bác kể lại từng câu người gọi nói", "mo": "Bác nhớ khá rõ vài câu hối thúc và đã ghi ra giấy.", "loai": "huu_ich", "bl": "Bổ sung cho bằng chứng chính; ghi lại thời điểm và nội dung càng chính xác càng tốt." },
       { "id": "chuyen_hang_xom", "ten": "Chuyện «hàng xóm cũng bị như vậy»", "mo": "Chị bán rau bảo nghe nói có người cũng bị gọi, không nhớ là ai.", "loai": "nhieu", "bl": "Tin truyền miệng chưa kiểm chứng không phải chứng cứ; mang theo chỉ làm phần chính loãng đi." },
       { "id": "anh_giay_to", "ten": "Ảnh giấy tờ cá nhân và mã xác thực của bác", "mo": "Người gọi nói cần «xác minh» nên xin bác chụp gửi lại.", "loai": "nguy", "bl": "Giấy tờ và mã xác thực là thông tin riêng tư, không nên đưa cho người chưa xác minh được danh tính (Lớp 11 Bài 19)." }
      ]
     },
     "loi_dan": { "ai": "Người xưng là nhân viên giao hàng (gọi điện)", "nd": "Bác phải chuyển khoản và đọc mã trong tin nhắn ngay, hết 10 phút là đơn bị huỷ và bác mất phí. Con bác đặt rồi, bác không nhận thì ai chịu?" },
     "bay": { "loai": "so_mat", "mo": "Nỗi lo mất tiền và sợ làm phiền con khiến bác, và cả em, muốn làm cho xong." },
     "goi_y": [
      "Bác không nhớ con có đặt hàng. Ai có thể xác nhận điều đó, và người gọi đang hối bác làm gì trước khi xác nhận?",
      "Ôn Lớp 11 Bài 8: người tiêu dùng thông minh làm gì trước khi trả tiền? Và Bài 15: khi nghi có vi phạm thì thông tin được gửi đến ai?",
      "Con số «10 phút» không đến từ bác, mà đến từ người muốn bác không kịp hỏi ai."
     ],
     "sb": { "bo": "van_phong", "nv": ["em", "bac_hh|Bác Hải", "co_van"], "noi": "dt", "tuy": ["dien_thoai"] }
    },
    "tv6": {
     "tieu_de": "Ngành học của Vy",
     "nd": "Vy, bây giờ đã lớp 12, tìm em ở góc sân trường. Bố mẹ muốn Vy thi ngành tài chính cho «dễ xin việc», còn Vy thích học thiết kế. Hạn đăng kí nguyện vọng chỉ còn mấy tuần, và Vy định lén đăng kí ngành mình thích mà không nói với bố mẹ.",
     "them": [
      { "co": "me_theo_doi", "nd": "Vy kể thêm: từ hôm biết mẹ cài phần mềm xem tin nhắn, Vy không còn muốn kể gì với bố mẹ nữa." },
      { "co": "me_tro_chuyen", "nd": "Vy nhớ lần mẹ chọn nói chuyện thay vì đọc lén, nên Vy tin rằng vẫn còn cách để nói với bố mẹ." },
      { "co": "me_mac_ke", "nd": "Vy thấy mẹ vẫn lo mà không hỏi gì, hai mẹ con ngại mở lời với nhau." }
     ],
     "chon": [
      {
       "nhan": "Khuyên Vy tìm hiểu kĩ ngành mình chọn rồi nói chuyện thẳng thắn với bố mẹ; nhờ thầy cô hoặc người thân làm cầu nối nếu cần.",
       "tot": 2, "d": { "ql": 6, "nt": 8, "dq": 4 }, "cd": ["vy_noi_chuyen"],
       "bl": "Công dân có quyền học ngành, nghề phù hợp với sở thích, năng khiếu, khả năng và điều kiện của mình; cha mẹ có nghĩa vụ và quyền tôn trọng ý kiến của con, chăm lo việc học tập, giáo dục của con (Lớp 12 Bài 11, Bài 10).",
       "di": "tv7"
      },
      {
       "nhan": "Khuyên Vy cứ lén đăng kí ngành mình thích, đến khi có kết quả bố mẹ sẽ phải chấp nhận, chuyện nói ra tính sau cũng được.",
       "tot": 0, "d": { "ql": -8, "nt": -12, "dq": -6 }, "cd": ["vy_len_lut"],
       "bl": "Quyền chọn ngành học đi cùng sự trao đổi, tôn trọng lẫn nhau giữa cha mẹ và con; đặt bố mẹ trước việc đã rồi làm mất sự trao đổi ấy (Lớp 12 Bài 10, Bài 11).",
       "di": "tv7",
       "loi_sai": "Khuyên giấu bố mẹ để đặt họ trước việc đã rồi.",
       "rui_ro": "Bố mẹ mất niềm tin, mâu thuẫn gay gắt hơn; Vy có thể phải đối mặt một mình nếu kết quả không như ý."
      },
      {
       "nhan": "Khuyên Vy nghe theo bố mẹ vì bố mẹ lo cho tương lai của Vy; ước mơ riêng thì để sau này tính.",
       "tot": 1, "d": { "ql": -3, "nt": -5, "dq": -2 }, "cd": ["vy_chieu_theo"],
       "bl": "Bố mẹ lo cho tương lai là điều đáng trân trọng, nhưng công dân có quyền học ngành, nghề phù hợp với sở thích, năng khiếu, khả năng, và cha mẹ cần tôn trọng ý kiến của con (Lớp 12 Bài 11, Bài 10).",
       "di": "tv7",
       "loi_sai": "Bỏ qua quyền chọn ngành phù hợp của chính Vy.",
       "rui_ro": "Vy học ngành không hợp, dễ chán nản, và ý kiến của Vy không bao giờ được lắng nghe."
      }
     ],
     "loi_dan": { "ai": "Vy", "nd": "Nói ra bố mẹ lại cấm thôi. Cứ lén đăng kí cho xong, mấy bạn lớp mình cũng làm thế, đến lúc có kết quả bố mẹ đành chịu." },
     "bay": { "loai": "so_dong", "mo": "«Bạn nào cũng làm thế» khiến việc lén lút trông như cách làm bình thường." },
     "goi_y": [
      "Điều bố mẹ lo và điều Vy muốn có thể được nói chung với nhau bằng cách nào mà không ai bị bất ngờ?",
      "Ôn Lớp 12 Bài 11 và Bài 10: quyền học ngành nghề của công dân và nghĩa vụ của cha mẹ nói gì về việc lắng nghe con?",
      "«Bạn nào cũng lén làm» chỉ cho biết người ta hay làm vậy, chưa nói cách đó có đúng không."
     ],
     "sb": { "bo": "truong", "nv": ["em", "lan|Vy"], "noi": "lan", "tuy": [] }
    },
    "tv7": {
     "tieu_de": "Quầy hàng của chú Tám",
     "nd": "Chú Tám định mở thêm quầy ăn sáng cạnh quán nước và thuê hai người phụ. Chú nói: «Quầy nhỏ thôi, không cần đăng kí, không viết hoá đơn cho đỡ phiền, còn thuế thì khai thấp xuống một chút». Chú hỏi em làm sao cho «khôn».",
     "them": [
      { "co": "khieu_nai_dung", "nd": "Chú Tám nhắc: «Lần trước nhờ cháu chỉ đúng cửa khiếu nại, nên lần này chú hỏi cháu trước khi làm»." },
      { "co": "don_them_chuyen", "nd": "Chú Tám vẫn ngại làm việc với phường sau chuyện lá đơn thêm lời đồn, nên chỉ muốn làm cho gọn, khỏi qua ai." },
      { "co": "khieu_nai_thieu", "nd": "Chú Tám vẫn nghĩ «cứ làm theo ý mình, bị nhắc thì tính» từ lần để nguyên mái che." }
     ],
     "chon": [
      {
       "nhan": "Khuyên chú hỏi cơ quan quản lí về đăng kí kinh doanh và nghĩa vụ thuế; kê khai trung thực, lập hoá đơn, giữ quyền lợi người làm thuê.",
       "tot": 2, "d": { "ql": 4, "nt": 6, "dq": 8 }, "cd": ["kinh_doanh_dung"],
       "bl": "Công dân có quyền tự do kinh doanh trong ngành nghề pháp luật không cấm, đồng thời phải đáp ứng điều kiện kinh doanh, đăng kí, kê khai trung thực, nộp thuế, lập hoá đơn và bảo đảm quyền lợi hợp pháp của người lao động (Lớp 12 Bài 8).",
       "di": "tv8"
      },
      {
       "nhan": "Khuyên chú khai doanh thu thấp xuống và không lập hoá đơn cho đỡ thuế, còn hai người làm thuê thì thoả thuận miệng cho gọn, đỡ giấy tờ.",
       "tot": 0, "d": { "ql": -6, "nt": -8, "dq": -12 }, "cd": ["tron_thue"],
       "bl": "Kê khai trung thực, nộp thuế đúng quy định, lập và giao hoá đơn khi bán hàng là nghĩa vụ; cố tình kê khai không đầy đủ, ghi giá trị thấp hơn thực hoặc bán hàng không lập hoá đơn là hành vi bị nghiêm cấm (Lớp 12 Bài 8).",
       "di": "tv8",
       "loi_sai": "Giúp chú tính cách khai thấp và né hoá đơn.",
       "rui_ro": "Chú vi phạm nghĩa vụ kê khai trung thực và lập hoá đơn, bị kiểm tra thì thiệt nhiều hơn; người làm thuê không có gì bảo đảm."
      },
      {
       "nhan": "Khuyên chú cứ bán nhỏ lẻ không đăng kí, khi nào đông khách thì làm giấy tờ sau; hai người làm thuê thì trả công đều là được.",
       "tot": 1, "d": { "ql": -2, "nt": -3, "dq": -5 }, "cd": ["lam_giay_to_sau"],
       "bl": "Tự do kinh doanh đi cùng nghĩa vụ đăng kí, kê khai trung thực và bảo đảm quyền lợi người lao động ngay từ khi hoạt động, không phải để đến khi đông khách mới làm (Lớp 12 Bài 8).",
       "di": "tv8",
       "loi_sai": "Hoãn nghĩa vụ đăng kí và kê khai đến khi «đông khách».",
       "rui_ro": "Chú hoạt động khi chưa làm đủ thủ tục, càng để lâu càng khó sửa, người làm thuê cũng thiếu bảo đảm."
      }
     ],
     "loi_dan": { "ai": "Chú Tám", "nd": "Cháu đừng làm khó chú. Ngõ này ai bán cũng không hoá đơn, khai đủ thì chú lỗ chết. Cháu chỉ chú cách nào cho khôn là được." },
     "bay": { "loai": "so_dong", "mo": "«Ai cũng làm thế» khiến điều pháp luật yêu cầu bị coi như chuyện có cũng được, không có cũng xong." },
     "goi_y": [
      "Chú Tám có quyền gì khi mở quầy, và đi kèm quyền đó là những việc gì chú phải làm với cơ quan quản lí và với người làm thuê?",
      "Ôn Lớp 12 Bài 8: quyền tự do kinh doanh đi cùng những nghĩa vụ nào, và hành vi nào bị nghiêm cấm?",
      "«Ai cũng làm thế» và «khôn» đang nói đến cái lợi trước mắt, chưa nói đến điều pháp luật yêu cầu."
     ],
     "sb": { "bo": "cho", "nv": ["em", "chu_tam"], "noi": "chu_tam", "tuy": ["tien"] }
    },
    "tv8": {
     "tieu_de": "Chiếc bình dưới móng nhà",
     "nd": "Anh Dũng đào móng để xây nhà bếp thì lộ ra một chiếc bình sứ cũ, hoa văn lạ, còn nguyên miệng. Một người sưu tầm nghe tin đã nhắn trả «giá rất cao» và bảo anh bán nhanh trước khi ai biết. Anh Dũng đến hỏi em có nên bán không.",
     "chon": [
      {
       "nhan": "Khuyên anh thông báo nơi phát hiện và giao nộp cho cơ quan có thẩm quyền, giữ ảnh chụp lúc phát hiện làm căn cứ.",
       "tot": 2, "d": { "ql": 4, "nt": 6, "dq": 8 }, "cd": ["giao_nop_co_vat"],
       "bl": "Công dân có nghĩa vụ tôn trọng, bảo vệ di sản văn hoá, thông báo địa điểm phát hiện và giao nộp di vật, cổ vật do mình tìm được cho cơ quan nhà nước có thẩm quyền (Lớp 12 Bài 13); nhặt được của rơi cũng phải thông báo, trao trả (Lớp 12 Bài 9).",
       "di": "ket"
      },
      {
       "nhan": "Khuyên anh nhận lời bán ngay cho người sưu tầm trước khi ai biết, khỏi bị giữ lại, tiền chia đều cho anh em cùng đào móng.",
       "tot": 0, "d": { "ql": -6, "nt": -12, "dq": -10 }, "cd": ["ban_co_vat"],
       "bl": "Người tìm được di vật, cổ vật phải thông báo, giao nộp cho cơ quan có thẩm quyền; tự ý bán là trái nghĩa vụ bảo vệ di sản văn hoá và có thể bị xử lí tuỳ mức độ (Lớp 12 Bài 13).",
       "di": "ket",
       "loi_sai": "Bán cổ vật tìm được thay vì giao nộp.",
       "rui_ro": "Làm trái nghĩa vụ giao nộp, di vật có thể thất thoát vĩnh viễn, anh Dũng có thể bị xử lí và hối hận."
      },
      {
       "nhan": "Khuyên anh cất kĩ chiếc bình trong nhà, chờ xem giá trị thật là bao nhiêu rồi mới quyết định giao hay bán.",
       "tot": 1, "d": { "ql": -2, "nt": -3, "dq": -5 }, "cd": ["cat_giu"],
       "bl": "Thông báo và giao nộp cho cơ quan có thẩm quyền là nghĩa vụ của người tìm được; không nên chờ biết giá trị rồi mới quyết định (Lớp 12 Bài 13).",
       "di": "ket",
       "loi_sai": "Tự giữ lại và chờ «xem giá trị» rồi mới quyết định.",
       "rui_ro": "Chậm thông báo, chiếc bình có thể hư hại hoặc bị người khác để ý; nếu rồi cũng phải giao nộp thì mất thêm thời gian và niềm tin."
      }
     ],
     "chung_cu": {
      "mo": "Anh Dũng muốn làm đúng. Em hướng dẫn anh giữ lại những gì trước khi gặp cơ quan có thẩm quyền?",
      "toi_da": 3,
      "vat": [
       { "id": "anh_vi_tri", "ten": "Ảnh chụp vị trí và hố móng lúc phát hiện", "mo": "Ảnh hố móng, độ sâu, có giờ chụp.", "loai": "can", "bl": "Giúp cơ quan có thẩm quyền biết đúng nơi và hoàn cảnh phát hiện (Lớp 12 Bài 13: thông báo địa điểm phát hiện)." },
       { "id": "loi_ke", "ten": "Lời kể: ai phát hiện, ngày giờ, ai có mặt", "mo": "Anh Dũng và hai người thợ nhớ khá rõ.", "loai": "can", "bl": "Thông tin trung thực, đầy đủ về người và thời điểm phát hiện giúp cơ quan xác minh." },
       { "id": "anh_binh", "ten": "Ảnh chiếc bình và hoa văn", "mo": "Chụp nhiều mặt, nguyên trạng lúc lấy lên.", "loai": "huu_ich", "bl": "Cho thấy hiện vật trông thế nào lúc phát hiện, bổ sung cho phần chính." },
       { "id": "tin_don", "ten": "Lời đồn «bình này giá cả tỉ»", "mo": "Vài người trong xóm đoán giá, không ai có căn cứ.", "loai": "nhieu", "bl": "Lời đồn về giá không giúp xác định nơi phát hiện hay ai đã tìm thấy; không phải chứng cứ." },
       { "id": "rao_ban", "ten": "Tin rao bán kèm ảnh trên mạng", "mo": "Anh định đăng thử xem ai trả giá cao hơn.", "loai": "nguy", "bl": "Rao bán trái với nghĩa vụ giao nộp cổ vật cho cơ quan có thẩm quyền (Lớp 12 Bài 13)." }
      ]
     },
     "loi_dan": { "ai": "Người sưu tầm (nhắn tin)", "nd": "Giá cao thế này thì cả nhà anh đỡ khổ. Có ai biết đâu mà báo, báo rồi anh mất trắng chứ được gì. Bán đi, chú lo hết." },
     "bay": { "loai": "loi_truoc_mat", "mo": "Món tiền lớn trước mắt khiến nghĩa vụ giao nộp trông như chuyện thiệt thòi." },
     "goi_y": [
      "Chiếc bình nằm dưới đất nhà anh Dũng, nhưng ai có trách nhiệm với một món đồ có thể là di sản văn hoá?",
      "Ôn Lớp 12 Bài 13: người tìm được di vật, cổ vật phải làm gì, và với ai?",
      "«Có ai biết đâu» và «giá cao» chỉ nói về cái lợi trước mắt, chưa nói về nghĩa vụ của người tìm được."
     ],
     "sb": { "bo": "nha", "nv": ["em", "anh_dung"], "noi": "dt", "tuy": ["dien_thoai"] }
    }
   },
   "chuyen": []
  }
 ],
 "ket": [
  { "tu": 85, "ten": "Người tư vấn đáng tin", "nd": "Em nghe kĩ, hỏi thêm, nêu đúng nguyên tắc và chỉ đúng nơi cần đến. Người đến Góc tư vấn thấy mình được tôn trọng và đi đúng đường. Em hiểu rằng một lời khuyên tốt là lời khuyên mà người nghe làm theo được và không phải hối hận." },
  { "tu": 65, "ten": "Người tư vấn vững tay", "nd": "Phần lớn lời khuyên của em đúng nguyên tắc. Vài lần em nói vội hoặc chiều ý người hỏi, để lại vết xước nhỏ. Hãy nghe kĩ hơn và dám nói điều người ta chưa muốn nghe." },
  { "tu": 45, "ten": "Còn nhiều điều phải học", "nd": "Em nhiều lần xuôi theo lời người hỏi, nói vội hoặc bỏ sót nghĩa vụ. Người tư vấn phải chịu trách nhiệm với hậu quả của lời khuyên; hãy thử lại và khuyên theo cách khác." },
  { "tu": 0, "ten": "Bài học từ những lời khuyên sai", "nd": "Nhiều lời khuyên của em khiến người nghe thiệt hại hoặc làm trái quy định. Người tư vấn không phải luật sư nhưng vẫn phải chịu trách nhiệm với điều mình nói. Hãy chơi lại và chọn cách khác." }
 ],
 "ket_som": {
  "ql": { "ten": "Người được tư vấn chịu thiệt", "nd": "Những lời khuyên của em khiến nhiều người bị thiệt: mất tiền, mất quyền riêng tư, mất niềm tin. Tư vấn là giúp người ta bảo vệ quyền của mình, không phải đẩy họ vào rủi ro (Lớp 11 Bài 17)." },
  "nt": { "ten": "Mất niềm tin của người dân", "nd": "Người dân không còn tìm đến Góc tư vấn vì lời khuyên của em nhiều lần không đúng hoặc chỉ nói điều họ muốn nghe. Niềm tin được xây từ những lần nói đúng và nói thật." },
  "dq": { "ten": "Tư vấn trái quy định", "nd": "Em liên tục khuyên làm điều trái quy định hoặc bỏ sót nghĩa vụ. Cô cố vấn buộc phải dừng buổi tư vấn của em. Tuân thủ pháp luật là kiềm chế không làm điều pháp luật cấm và chủ động làm điều pháp luật yêu cầu (Lớp 10 Bài 13)." }
 },
 "hau": [
  { "co": "khieu_nai_dung", "nd": "Chú Tám nhận được trả lời đúng hạn và vẫn giữ được quán nước, nhờ làm đúng cửa." },
  { "co": "don_them_chuyen", "nd": "Lá đơn thêm chuyện «nghe nói» của chú Tám vẫn là điều em ân hận vì đã giúp viết." },
  { "co": "khieu_nai_thieu", "nd": "Chú Tám vẫn hay hỏi: «Khiếu nại rồi, có phải cứ làm theo ý mình không?». Em nhớ mình đã quên dặn chú." },
  { "co": "me_tro_chuyen", "nd": "Mẹ con Vy nói chuyện được với nhau; Vy kể với mẹ cả chuyện ở trường." },
  { "co": "me_theo_doi", "nd": "Vy vẫn nhớ chuyện mẹ đọc lén tin nhắn, và em vẫn nhớ mình đã chỉ cách." },
  { "co": "me_mac_ke", "nd": "Mẹ con Vy vẫn ngại mở lời, và em tự hỏi nếu hôm đó em gợi ý cuộc trò chuyện thì sao." },
  { "co": "kiem_chung_truoc_dang", "nd": "Minh bây giờ luôn kiểm chứng trước khi đăng và hay hỏi em: «Chắc chưa?»." },
  { "co": "dang_sai", "nd": "Minh vẫn nợ chủ quán chè một lời xin lỗi, và em nợ Minh một lời khuyên đúng." },
  { "co": "dang_nghe_noi", "nd": "Chữ «nghe nói» không giúp bài đăng của Minh bớt tổn hại cho quán chè." },
  { "co": "giu_nguoi_dung", "nd": "Tuấn vẫn làm thêm, và biết mình có quyền gọi người lớn khi bị đối xử không đúng." },
  { "co": "chiu_giu_nguoi", "nd": "Tuấn nhớ mãi buổi chiều bị giữ lại, và em nhớ mình đã khuyên cậu ở lại." },
  { "co": "bo_ve_khong_den", "nd": "Chuyện chiếc ấm vỡ giữa nhà Tuấn và tiệm trà sữa kéo dài lâu hơn cần thiết." },
  { "co": "tu_van_than_trong", "nd": "Bác Hải không mất đồng nào và kể chuyện cuộc gọi lạ cho cả xóm để mọi người cẩn thận." },
  { "co": "mat_tien", "nd": "Bác Hải mất tiền vì một đơn hàng không có thật; bác không trách em nhưng em nhớ mãi." },
  { "co": "bo_qua_don", "nd": "Bác Hải không mất tiền, nhưng số điện thoại lạ ấy vẫn đi gọi những người khác." },
  { "co": "vy_noi_chuyen", "nd": "Vy học ngành mình chọn, bố mẹ dần ủng hộ sau cuộc nói chuyện thẳng thắn." },
  { "co": "vy_len_lut", "nd": "Vy lén đăng kí; khi bố mẹ biết, cả nhà cãi nhau và Vy phải nhờ cô chủ nhiệm hoà giải." },
  { "co": "vy_chieu_theo", "nd": "Vy học ngành bố mẹ chọn và ít khi nhắc lại ước mơ thiết kế." },
  { "co": "kinh_doanh_dung", "nd": "Quầy ăn sáng của chú Tám có đủ giấy tờ, hai người làm thuê yên tâm, chú ngủ ngon." },
  { "co": "tron_thue", "nd": "Quầy của chú Tám bị nhắc nhở vì không có hoá đơn; chú trách em mấy tháng." },
  { "co": "lam_giay_to_sau", "nd": "Chú Tám phải chạy làm giấy tờ vội khi quầy đông khách, và nhắc em: «Biết thế làm từ đầu»." },
  { "co": "giao_nop_co_vat", "nd": "Chiếc bình dưới móng nhà anh Dũng được cơ quan có thẩm quyền tiếp nhận và giữ gìn." },
  { "co": "ban_co_vat", "nd": "Chiếc bình ra khỏi khu phố mà không ai biết nó đi đâu; anh Dũng không còn nhìn thẳng vào mắt em." },
  { "co": "cat_giu", "nd": "Chiếc bình cất trong nhà anh Dũng thêm mấy tháng chưa ai biết, và em tự hỏi vì sao mình không giục anh." }
 ]
});
