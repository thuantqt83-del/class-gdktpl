/* Lớp học thông minh · «VỤ VIỆC» bản 3 — kiểu chơi KHÔNG còn chọn đáp án trọn gói (lát L1, 23/11/2026). ✅ BẢN NHÁP — thầy/cô duyệt trước khi dùng.
   Áp dụng cho 3 cảnh của «Pháp luật quanh ta»: q5 «Đoạn clip ở sân sau trường», r5 «Dòng nước đổi màu», p3 «Đi đúng cửa». Các cảnh còn lại vẫn là kiểu cũ (data/game/hanhtrinh_pl.js).
   Một cảnh bản 3 có 5 phần (thiết kế: thiet-ke-moi/THIET-KE-GAME-NHAP-VAI-v3.md):
   (1) vai: thẻ vai (mục tiêu, việc được làm, việc không được làm).
   (2) hoi, vat: «điểm sức» (diem) để HỎI người liên quan (qt = 1 nếu câu trả lời quan trọng) và THU THẬP vật chứng (loai: can | huu_ich | nhieu | nguy). Mỗi lần tốn 1 điểm; không đủ điểm hỏi hết, bỏ qua cũng là một quyết định.
   (3) o: các «ô» của kế hoạch xử lí; mỗi ô có vài lựa chọn ngắn: diem (−5…2), d (đổi chỉ số), cd (cờ), tran (trần mức kết quả 0|1), kq (hệ quả), bl (nguyên tắc, ghi Lớp–Bài), loi/rr (lỗi sai, rủi ro), cb (cần chứng cứ: câu nói khi chưa có).
   (4) luat: luật tương tác giữa hành động đã làm và kế hoạch: neu { co | khong (hành động h:id, v:id), truoc [a, b], ke | khong_ke | ke_mot (ô:lựa chọn) } → thi { diem, d, cd, tran, ghi }.
   (5) ly: thẻ lí do để KÝ (chọn tối đa 2); ung = các lựa chọn mà lí do này giải thích được; vung:false + pb = lí do không vững và lời phản biện.
   Kết quả do máy TÍNH BẰNG LUẬT (lophoc_vuviec.js), không có nhãn «tốt/chưa tốt» gắn vào lựa chọn; không dùng AI. muc.hai / muc.mot = ngưỡng điểm cho mức 2 / mức 1.
   Lời bình CHỈ dùng nguyên tắc có trong bài đã duyệt (ghi Lớp, Bài); không nêu mức phạt, số điều, tội danh; tên người và nơi chốn là giả định.
   Số bài dùng: Lớp 11 Bài 17 (q5); Lớp 12 Bài 13, Lớp 11 Bài 13, Lớp 10 Bài 21 (r5); Lớp 10 Bài 11, 13, 20, 21 (p3). Đã đọc từng bài trước khi viết.
   Dữ liệu thuần, không có lệnh. */
SC.data.game = SC.data.game || {};
SC.data.game.vuviec = SC.data.game.vuviec || {};
SC.data.game.vuviec['phap-luat-quanh-ta'] = {

 /* ============ q5 · Đoạn clip ở sân sau trường (Lớp 11 Bài 17) ============ */
 q5: {
  vai: {
   ten: 'Công dân · bạn thân của Minh',
   muc_tieu: 'Giúp Minh được bảo vệ mà không làm cậu bị tổn thương thêm.',
   duoc: ['Ở bên Minh, nghe và ghi lại sự việc', 'Giữ bằng chứng và đưa cho người có trách nhiệm', 'Báo cho thầy cô và bố mẹ'],
   khong: ['Tự «xử» nhóm kia', 'Phát tán clip hoặc ảnh của Minh', 'Kết luận ai đúng ai sai thay người có trách nhiệm']
  },
  diem: 5, vat_toi_da: 3,
  hoi: [
   { id: 'minh', ai: 'Minh', cau: 'Cậu còn đau không? Cậu muốn mình làm gì?', tra: 'Tay tớ vẫn đau, sáng nay còn thâm hơn. Tớ sợ nhất là clip bị đưa lên mạng. Tớ muốn có người lớn giúp, nhưng đừng để tớ bị gọi tên trước cả lớp.', qt: 1 },
   { id: 'luc', ai: 'Minh', cau: 'Chuyện xảy ra lúc nào, có ai nhìn thấy không?', tra: 'Giờ ra chơi hôm qua, ở sân sau gần nhà kho. Có một bạn lớp mình đứng xa nhìn thấy, nhưng bạn ấy cũng sợ.', qt: 1 },
   { id: 'co', ai: 'Cô chủ nhiệm', cau: 'Cô ơi, nếu có bạn bị bắt nạt thì mình báo như thế nào ạ?', tra: 'Em cứ kể đủ cho cô, cô sẽ gặp riêng bạn bị ảnh hưởng và phụ huynh. Có ảnh chụp hay tin nhắn thì em giữ nguyên rồi đưa cô, đừng tự đăng lên mạng.', qt: 1 },
   { id: 'nhom', ai: 'Nhóm lớp bên', cau: 'Các bạn làm gì Minh vậy?', tra: 'Đùa thôi mà! Bọn tớ xoá clip rồi, đừng làm to chuyện.', qt: 0 }
  ],
  vat: [
   { id: 've_thuong', ten: 'Ảnh vết bầm kèm ghi chú ngày, giờ, nơi xảy ra', mo: 'Chụp khi Minh đồng ý, ghi chú ngay để khỏi nhầm lẫn.', loai: 'can', bl: 'Ghi nhận hậu quả và thời điểm giúp người có trách nhiệm xác minh đúng sự việc.' },
   { id: 'tin_nhan_doa', ten: 'Tin nhắn doạ «đưa clip lên mạng»', mo: 'Chưa xoá, còn thấy tên tài khoản gửi.', loai: 'can', bl: 'Lời đe doạ là bằng chứng quan trọng và cho thấy Minh cần được bảo vệ sớm.' },
   { id: 'nguoi_thay', ten: 'Tên bạn đã nhìn thấy sự việc, em ghi lại', mo: 'Em chưa đi nói chuyện hay ép ai thay Minh.', loai: 'huu_ich', bl: 'Người chứng kiến có thể giúp xác minh; việc làm việc với họ để người có trách nhiệm đảm nhận.' },
   { id: 'binh_luan', ten: 'Ảnh chụp bình luận cười cợt trong nhóm lớp bên', mo: 'Vài bạn lớp bên nhắn «đùa thôi mà», không nói gì về sự việc.', loai: 'nhieu', bl: 'Không cho biết chuyện gì đã xảy ra và ai làm; mang theo không giúp xác minh.' },
   { id: 'sao_clip', ten: 'Sao chép clip về máy em để «dùng khi cần»', mo: 'Em đang giữ một bản clip do bạn gửi.', loai: 'nguy', bl: 'Giữ riêng một bản clip để chia sẻ lại có thể dẫn tới phát tán, làm Minh bị xâm phạm danh dự thêm một lần nữa; clip chỉ nên đưa cho người có trách nhiệm (Lớp 11 Bài 17).' }
  ],
  o: [
   { id: 'viec', ten: 'Việc đầu tiên em làm', chon: [
    { id: 'ben_minh', nn: 'Ở bên Minh trước', nhan: 'Ở bên Minh, nghe cậu kể hết và ghi lại ngày, giờ, nơi xảy ra.', diem: 1, d: { tc: 3, dd: 2 }, kq: 'Minh thấy mình được lắng nghe nên bớt sợ và dám nói thêm.' },
    { id: 'bao_ngay', nn: 'Báo ngay hôm nay', nhan: 'Cùng Minh đến gặp người có trách nhiệm ngay hôm nay, không để qua đêm.', diem: 1, d: { pl: 3, dd: 1 }, kq: 'Người có trách nhiệm biết sớm nên Minh sớm được bảo vệ.' },
    { id: 'gap_nhom', nn: 'Tự gặp nhóm kia', nhan: 'Tự đến gặp nhóm kia, bắt họ xoá clip và xin lỗi Minh.', diem: -2, d: { pl: -2, tc: -2 }, kq: 'Nhóm kia biết có người đang để ý và có thể xoá hoặc giấu bằng chứng.', loi: 'Tự đi giải quyết với nhóm kia.', rr: 'Xung đột có thể leo thang, Minh thêm nguy hiểm.' },
    { id: 'cho', nn: 'Chờ vài ngày', nhan: 'Chờ vài ngày xem nhóm kia có tự dừng lại không.', diem: -3, tran: 1, d: { tc: -2, pl: -2 }, kq: 'Minh vẫn một mình với nỗi sợ và vết thương chưa ai biết.', loi: 'Giấu vụ việc vì sợ và chờ đợi.', rr: 'Nhóm kia tiếp tục, Minh vẫn bị đe doạ, em chưa bảo vệ được bạn.' }
   ] },
   { id: 'bao', ten: 'Em báo cho ai', chon: [
    { id: 'co_cn', nn: 'Cô chủ nhiệm', nhan: 'Cô chủ nhiệm, người có thể gặp riêng Minh và phụ huynh.', diem: 1, d: { pl: 1, tc: 1 }, kq: 'Cô chủ nhiệm nắm được sự việc và gặp riêng Minh.' },
    { id: 'ca_hai', nn: 'Cô chủ nhiệm và bố mẹ Minh', nhan: 'Cô chủ nhiệm và cả bố mẹ Minh.', diem: 2, d: { pl: 2, tc: 2, dd: 1 }, kq: 'Nhà trường và gia đình cùng biết nên Minh có người lớn ở cả hai nơi.' },
    { id: 'ban_be', nn: 'Vài bạn thân', nhan: 'Nhắn cho vài bạn thân trong lớp để cùng lo cho Minh.', diem: -1, d: { dd: -1, tc: -2 }, kq: 'Tin lan nhanh trong lớp, Minh thấy ai cũng biết chuyện của mình.', loi: 'Kể cho người không có trách nhiệm xử lí.', rr: 'Minh bị bàn tán thêm, em chưa đưa việc đến người có trách nhiệm.' },
    { id: 'khong_ai', nn: 'Chưa báo ai', nhan: 'Chưa báo ai, tự lo cho Minh cùng các bạn.', diem: -3, tran: 1, d: { pl: -2, tc: -2 }, kq: 'Chưa có người lớn nào biết, Minh vẫn có thể bị đe doạ tiếp.', loi: 'Giấu vụ việc vì sợ.', rr: 'Nhóm kia tiếp tục, Minh vẫn bị đe doạ, em không bảo vệ được bạn.' }
   ] },
   { id: 'chung', ten: 'Em làm gì với ảnh, clip, tin nhắn', chon: [
    { id: 'giu_dua', nn: 'Giữ nguyên, đưa người có trách nhiệm', nhan: 'Giữ nguyên ảnh và tin nhắn, chỉ đưa cho người có trách nhiệm.', diem: 2, d: { pl: 2, dd: 1, tc: 1 }, kq: 'Người có trách nhiệm có căn cứ để xác minh.', cb: 'Vì em nói sẽ giữ và đưa bằng chứng nhưng chưa giữ ảnh vết bầm hay tin nhắn doạ, nên khi báo em chưa có gì để đưa kèm.' },
    { id: 'chi_ke', nn: 'Chỉ kể bằng lời', nhan: 'Không giữ gì, chỉ kể lại bằng lời cho nhớ.', diem: 0, kq: 'Lời kể chưa có gì kèm theo nên người có trách nhiệm cần thêm thời gian xác minh.' },
    { id: 'xoa', nn: 'Xoá hết', nhan: 'Xoá hết ảnh, tin nhắn cho khỏi rắc rối.', diem: -2, d: { pl: -2, tc: -1 }, kq: 'Mất căn cứ nên việc xác minh khó hơn.', loi: 'Xoá bằng chứng vì sợ rắc rối.', rr: 'Người có trách nhiệm khó xác minh, Minh khó được bảo vệ.' },
    { id: 'dang', nn: 'Đăng lên nhóm lớp', nhan: 'Đăng clip lên nhóm lớp để mọi người biết nhóm kia làm gì.', diem: -4, tran: 0, d: { pl: -5, dd: -4, tc: -2 }, kq: 'Clip lan ra, Minh bị xâm phạm danh dự thêm một lần nữa.', loi: 'Phát tán clip của bạn.', rr: 'Minh bị xâm phạm danh dự thêm một lần nữa và chính em cũng làm sai.', bl: 'Phát tán clip kèm lời xúc phạm là xâm phạm danh dự, nhân phẩm của người bị quay; người bị xâm phạm có quyền yêu cầu gỡ bỏ, cải chính (Lớp 11 Bài 17).' }
   ] },
   { id: 'nhom', ten: 'Với nhóm lớp bên', chon: [
    { id: 'de_nguoi', nn: 'Để người có trách nhiệm làm việc', nhan: 'Không tự làm gì với nhóm kia, để người có trách nhiệm làm việc với họ.', diem: 2, d: { pl: 2, dd: 2, tc: 1 }, kq: 'Người có trách nhiệm làm việc với nhóm kia, em không bị cuốn vào xung đột.', bl: 'Học sinh có trách nhiệm đấu tranh, phê phán và báo hành vi vi phạm đến người có thẩm quyền (Lớp 11 Bài 17).' },
    { id: 'xin_xoa', nn: 'Chỉ nhắn họ xoá clip', nhan: 'Chỉ nhắn họ xoá clip rồi thôi, không báo ai.', diem: -1, tran: 1, d: { pl: -1, tc: -2 }, kq: 'Nhóm kia vẫn biết Minh sợ mách nên có thể tiếp tục.', loi: 'Giải quyết kín vì sợ làm to chuyện.', rr: 'Nhóm kia tiếp tục, Minh vẫn bị đe doạ.' },
    { id: 'nhan_doa', nn: 'Nhắn lại doạ họ', nhan: 'Nhắn tin cảnh cáo, doạ lại cho họ sợ.', diem: -3, tran: 1, d: { pl: -3, dd: -2 }, kq: 'Tin nhắn của em có thể bị dùng để quay lại chống em.', loi: 'Dùng lời doạ đáp trả lời doạ.', rr: 'Em cũng bị coi là đe doạ người khác, xung đột leo thang.' },
    { id: 'chan', nn: 'Rủ bạn chặn lại', nhan: 'Rủ vài bạn chặn nhóm kia lại để họ biết thế nào là sợ.', diem: -5, tran: 0, d: { pl: -8, dd: -5, tc: -3 }, kq: 'Xung đột leo thành đánh nhau, Minh thêm nguy hiểm.', loi: 'Dùng bạo lực đáp trả bạo lực.', rr: 'Em cũng vi phạm và bị kỉ luật; xung đột leo thang, Minh thêm nguy hiểm.', bl: 'Dùng bạo lực đáp trả bạo lực là xâm phạm thân thể người khác và khiến chính em phải chịu trách nhiệm (Lớp 11 Bài 17).' }
   ] }
  ],
  luat: [
   { neu: { co: ['v:nguoi_thay'], ke_mot: ['bao:co_cn', 'bao:ca_hai'] }, thi: { diem: 1, ghi: { k: 'ok', nd: 'Vì em đã ghi tên bạn nhìn thấy sự việc nên khi báo, cô chủ nhiệm có thêm một người để hỏi xác minh.' } } },
   { neu: { khong: ['h:minh'], ke: ['bao:ca_hai'] }, thi: { diem: -1, d: { tc: -3 }, ghi: { k: 'warn', nd: 'Vì em chưa hỏi Minh muốn gì mà đã báo cả bố mẹ, Minh thấy bị ép và sợ bị gọi tên.' } } },
   { neu: { khong: ['h:minh'], ke: ['viec:bao_ngay'] }, thi: { diem: -1, d: { tc: -2 }, ghi: { k: 'warn', nd: 'Vì em chưa hỏi Minh muốn gì mà đưa cậu đi báo ngay, Minh thấy mình bị dẫn đi chứ chưa được lắng nghe.' } } },
   { neu: { co: ['h:minh'], ke: ['viec:ben_minh'] }, thi: { diem: 1, d: { tc: 1 }, ghi: { k: 'ok', nd: 'Vì em hỏi Minh rồi ở bên cậu trước, Minh dám kể thêm điều cậu chưa nói.' } } },
   { neu: { co: ['h:minh'], ke: ['viec:bao_ngay'] }, thi: { diem: 1, d: { pl: 1 }, ghi: { k: 'ok', nd: 'Vì em biết Minh muốn có người lớn giúp nên việc báo ngay đúng với mong muốn của cậu.' } } },
   { neu: { truoc: ['h:nhom', 'v:tin_nhan_doa'] }, thi: { diem: -2, d: { pl: -1 }, ghi: { k: 'bad', nd: 'Vì em hỏi nhóm kia khi chưa giữ tin nhắn doạ, họ biết em đang để ý và có thể xoá tin nhắn, em mất một căn cứ quan trọng.' } } },
   { neu: { ke: ['bao:khong_ai'], co: ['v:ve_thuong'] }, thi: { diem: -1, ghi: { k: 'warn', nd: 'Vì em đã chụp ảnh vết bầm mà chưa báo ai, bằng chứng nằm yên trong máy em và Minh vẫn một mình.' } } },
   { neu: { ke_mot: ['bao:co_cn', 'bao:ca_hai'], khong_ke: ['chung:dang', 'chung:xoa', 'nhom:chan', 'nhom:nhan_doa', 'nhom:xin_xoa'] }, thi: { cd: ['bao_vao_dung_cach'] } }
  ],
  ly: [
   { id: 'ly1', nhan: 'Vì quyền được bảo vệ của Minh là trên hết.', ung: ['viec:ben_minh', 'viec:bao_ngay', 'bao:co_cn', 'bao:ca_hai', 'chung:giu_dua', 'nhom:de_nguoi'] },
   { id: 'ly2', nhan: 'Vì em muốn Minh vẫn tin em và thấy mình được tôn trọng.', ung: ['viec:ben_minh', 'bao:co_cn', 'bao:ca_hai', 'chung:giu_dua'] },
   { id: 'ly3', nhan: 'Vì chuyện này nên để người có trách nhiệm xử lí, em giữ bằng chứng và ở bên bạn.', ung: ['nhom:de_nguoi', 'chung:giu_dua', 'bao:co_cn', 'bao:ca_hai', 'viec:ben_minh'] },
   { id: 'ly4', nhan: 'Vì em sợ bị nhóm kia trả thù nếu làm to chuyện.', ung: ['viec:cho', 'bao:khong_ai', 'nhom:xin_xoa', 'chung:xoa', 'chung:chi_ke'], vung: false, pb: 'Nỗi sợ này có thật, nhưng người có trách nhiệm bảo vệ được Minh và em tốt hơn khi em lên tiếng; học sinh có trách nhiệm báo hành vi vi phạm đến người có thẩm quyền (Lớp 11 Bài 17).' },
   { id: 'ly5', nhan: 'Vì nhóm kia cần biết thế nào là sợ.', ung: ['viec:gap_nhom', 'nhom:chan', 'nhom:nhan_doa', 'chung:dang'], vung: false, pb: 'Làm người khác sợ không thay cho việc đưa vụ việc đến người có trách nhiệm; cách đó khiến chính em xâm phạm người khác (Lớp 11 Bài 17).' }
  ],
  muc: { hai: 9, mot: 0 },
  bl_muc: {
   2: 'Mọi người có quyền bất khả xâm phạm về thân thể, được bảo hộ về sức khoẻ, danh dự, nhân phẩm; học sinh có trách nhiệm đấu tranh, phê phán và báo hành vi vi phạm đến người có thẩm quyền (Lớp 11 Bài 17).',
   1: 'Em muốn giúp Minh, nhưng kế hoạch còn thiếu sót nên Minh chưa được bảo vệ trọn vẹn: cần tìm hiểu, giữ bằng chứng và nhờ người có trách nhiệm (Lớp 11 Bài 17).',
   0: 'Dùng bạo lực, lời doạ hay phát tán clip để đáp trả là xâm phạm thân thể, danh dự của người khác và khiến chính em phải chịu trách nhiệm (Lớp 11 Bài 17).'
  },
  mau: 'Hỏi Minh muốn gì, giữ ảnh vết bầm và tin nhắn doạ, ở bên Minh rồi cùng cậu báo cô chủ nhiệm và bố mẹ, không đăng clip, để người có trách nhiệm làm việc với nhóm kia.'
 },

 /* ============ r5 · Dòng nước đổi màu (Lớp 12 Bài 13; Lớp 11 Bài 13; Lớp 10 Bài 21) ============ */
 r5: {
  vai: {
   ten: 'Công dân · đại diện thanh niên của xóm',
   muc_tieu: 'Bảo vệ sức khoẻ và quyền được sống trong môi trường trong lành của bà con theo đúng cách.',
   duoc: ['Ghi lại hiện trạng, hỏi bà con', 'Tìm thông tin về môi trường', 'Cùng bà con phản ánh đến nơi có thẩm quyền'],
   khong: ['Chặn cổng, gây rối', 'Lén vào cơ sở lấy mẫu', 'Nhận quà đổi lấy sự im lặng']
  },
  diem: 5, vat_toi_da: 3,
  hoi: [
   { id: 'bac_sau', ai: 'Bác Sáu', cau: 'Bác ơi, nhà nào đang bị ho, ngứa? Đã có ai hỏi cơ sở chưa?', tra: 'Có sáu nhà ho và ngứa da từ hôm mương đổi màu. Chủ cơ sở chỉ cho người đến biếu quà, chưa giải thích gì về nước thải.', qt: 1 },
   { id: 'ong_tu', ai: 'Ông Tư', cau: 'Mương đổi màu từ bao giờ, vào lúc nào trong ngày?', tra: 'Từ hôm cơ sở chạy máy, thường vào chiều tối. Nước xanh đen, mùi hắc, sáng ra lại nhạt hơn.', qt: 1 },
   { id: 'thong_tin', ai: 'Thông tin của xã', cau: 'Em tìm xem xã có thông báo gì về môi trường và nơi tiếp nhận phản ánh không.', tra: 'Có thông báo về nơi tiếp nhận phản ánh, kiến nghị của người dân ở Uỷ ban nhân dân xã. Chưa thấy thông tin nào về việc xử lí nước thải của cơ sở này.', qt: 1 },
   { id: 'chu', ai: 'Chủ cơ sở', cau: 'Cơ sở mình xử lí nước thải thế nào ạ?', tra: 'Chú làm đúng hết! Ai nói gì cũng là nói xấu. Chú gửi quà để bà con thông cảm thôi.', qt: 0 }
  ],
  vat: [
   { id: 'anh_muong', ten: 'Ảnh và video dòng mương đổi màu, ghi ngày giờ và vị trí', mo: 'Quay từ ngoài ngõ, nơi ai cũng đứng được.', loai: 'can', bl: 'Hình ảnh có ngày giờ, vị trí là bằng chứng trực quan để cơ quan có thẩm quyền xem xét.' },
   { id: 'ds_nha', ten: 'Danh sách các nhà bị ảnh hưởng và triệu chứng bà con kể', mo: 'Ghi tên nhà (không cần ghi hồ sơ bệnh án), triệu chứng ho, ngứa da.', loai: 'can', bl: 'Cho thấy mức ảnh hưởng đến đời sống và sức khoẻ của cả khu, giúp việc phản ánh có trọng lượng.' },
   { id: 'tin_don_xuong', ten: 'Chuyện đồn «cơ sở này làm ăn gian dối từ lâu»', mo: 'Nghe vài người nói, không ai đưa ra giấy tờ nào.', loai: 'nhieu', bl: 'Lời đồn không có căn cứ không giúp cơ quan có thẩm quyền xác minh việc xả thải.' },
   { id: 'lay_mau_len', ten: 'Lén vào trong cơ sở để lấy mẫu nước thải và quay lại', mo: 'Em thấy có một lỗ hở ở hàng rào phía sau.', loai: 'nguy', bl: 'Lén vào cơ sở của người khác là cách làm không theo quy định và khiến chính em có thể vi phạm; quyền phản ánh phải thực hiện theo quy định (Lớp 12 Bài 13; Lớp 11 Bài 13).' }
  ],
  o: [
   { id: 'viec', ten: 'Việc đầu tiên em làm', chon: [
    { id: 'ghi_nhan', nn: 'Ghi nhận trước', nhan: 'Ghi lại hiện trạng, hỏi kĩ bà con rồi mới tính bước tiếp.', diem: 1, d: { pl: 1, tc: 2, dd: 1 }, kq: 'Em hiểu rõ ai bị ảnh hưởng và ảnh hưởng thế nào trước khi lên tiếng.' },
    { id: 'bao_ngay', nn: 'Phản ánh ngay', nhan: 'Cùng bác Sáu đi phản ánh ngay hôm nay, không chờ gom thêm.', diem: 1, d: { pl: 3, tc: 1 }, kq: 'Vụ việc được đưa đến nơi tiếp nhận sớm, nước thải sớm được xem xét.' },
    { id: 'gap_chu', nn: 'Gặp thẳng chủ cơ sở', nhan: 'Đến gặp thẳng chủ cơ sở, yêu cầu dừng xả nước ngay.', diem: -1, d: { pl: -1, tc: -1 }, kq: 'Chủ cơ sở biết có người để ý nhưng chưa ai xem xét việc xả nước đúng cách.', loi: 'Đi giải quyết riêng khi chưa có căn cứ.', rr: 'Chủ cơ sở có cớ phản ứng, việc ô nhiễm chưa được xem xét đúng cách.' },
    { id: 'chan_cong', nn: 'Chặn cổng cơ sở', nhan: 'Rủ thanh niên trong xóm chặn cổng, không cho xe ra vào.', diem: -5, tran: 0, d: { pl: -8, dd: -4, tc: -3 }, kq: 'Xóm bị coi là gây rối, chủ cơ sở có cớ phản ứng.', loi: 'Chặn cổng, gây rối trật tự.', rr: 'Em và bà con vi phạm, chủ cơ sở có cớ phản ứng, vấn đề môi trường bị lu mờ.', bl: 'Chặn cổng, gây rối làm mất trật tự và khiến chính mình vi phạm; quyền phản ánh phải thực hiện theo quy định (Lớp 12 Bài 13; Lớp 11 Bài 13).' }
   ] },
   { id: 'noi', ten: 'Em phản ánh ở đâu', chon: [
    { id: 'xa', nn: 'Uỷ ban nhân dân xã', nhan: 'Uỷ ban nhân dân xã, nơi quản lí các việc ở cơ sở.', diem: 2, d: { pl: 2, tc: 2, dd: 1 }, kq: 'Phản ánh đến đúng nơi có thẩm quyền ở cơ sở.', bl: 'Uỷ ban nhân dân cấp xã trực tiếp quản lí đời sống dân cư, quản lí nhà nước trên nhiều lĩnh vực trong đó có môi trường (Lớp 10 Bài 21).' },
    { id: 'chu_rieng', nn: 'Chỉ nói với chủ cơ sở', nhan: 'Chỉ nói chuyện riêng với chủ cơ sở, không báo cho ai khác.', diem: -1, d: { tc: -1 }, kq: 'Việc xả nước thải chưa đến nơi có thẩm quyền.', loi: 'Không đưa việc đến nơi có thẩm quyền.', rr: 'Nước vẫn có thể bị xả, sức khoẻ bà con vẫn bị ảnh hưởng.' },
    { id: 'mang', nn: 'Đăng lên mạng', nhan: 'Đăng lên mạng xã hội để mọi người cùng phản đối cơ sở.', diem: -2, d: { dd: -2, tc: -1 }, kq: 'Tin lan nhanh nhưng chưa đến nơi có thẩm quyền, có thể bị thổi phồng.', loi: 'Đưa lên mạng khi chưa phản ánh đúng nơi.', rr: 'Tin có thể bị thổi phồng và em chưa đưa việc đến nơi có thẩm quyền.' },
    { id: 'cho', nn: 'Chưa phản ánh', nhan: 'Chưa phản ánh ở đâu, chờ xem nước có đổi không.', diem: -3, tran: 1, d: { pl: -2, tc: -2 }, kq: 'Nước vẫn đổi màu, bà con vẫn ho và ngứa da.', loi: 'Im lặng và chờ đợi.', rr: 'Nước vẫn bị xả, sức khoẻ bà con tiếp tục bị ảnh hưởng.' }
   ] },
   { id: 'bc', ten: 'Em đưa gì kèm phản ánh', chon: [
    { id: 'co_can_cu', nn: 'Ảnh, danh sách nhà bị ảnh hưởng', nhan: 'Ảnh có ngày giờ, danh sách nhà bị ảnh hưởng, nói rõ điều chưa biết.', diem: 2, d: { pl: 2, dd: 2 }, kq: 'Nơi tiếp nhận có căn cứ rõ để xem xét.', cb: 'Vì em nói sẽ kèm ảnh và danh sách nhưng chưa thu thập gì, nơi tiếp nhận có rất ít căn cứ để xem xét.' },
    { id: 'bang_loi', nn: 'Chỉ kể bằng lời', nhan: 'Chỉ kể bằng lời cho nhanh, không mang theo ảnh hay giấy tờ gì cả.', diem: 0, d: { pl: -1 }, kq: 'Phản ánh chưa có gì kèm theo nên nơi tiếp nhận khó xác minh.' },
    { id: 'don_them', nn: 'Kể cả điều nghe đồn', nhan: 'Kể thêm cả những điều nghe đồn cho phản ánh có sức nặng hơn.', diem: -2, d: { pl: -2, dd: -1 }, kq: 'Lời đồn làm giảm niềm tin vào phản ánh của em và bà con.', loi: 'Dùng tin đồn không có căn cứ.', rr: 'Lời đồn làm giảm niềm tin vào phản ánh của em và bà con.' }
   ] },
   { id: 'qua', ten: 'Món quà của chủ cơ sở', chon: [
    { id: 'tra_lai', nn: 'Từ chối quà', nhan: 'Từ chối quà và nói với bà con vì sao không nên nhận.', diem: 2, d: { dd: 3, tc: 2, pl: 1 }, kq: 'Bà con thấy em không bị mua chuộc nên tin em hơn.', bl: 'Quyền sống trong môi trường trong lành không thể đem đánh đổi lấy quà; che giấu hành vi gây ô nhiễm là hành vi bị nghiêm cấm (Lớp 12 Bài 13).' },
    { id: 'de_bac', nn: 'Để bác Sáu lo', nhan: 'Để bác Sáu quyết định chuyện quà, em không can dự.', diem: 0, kq: 'Món quà vẫn là việc chưa ai nói rõ với bà con.' },
    { id: 'nhan_roi', nn: 'Nhận quà rồi vẫn phản ánh', nhan: 'Nhận quà thăm hỏi cho đỡ mất lòng rồi vẫn phản ánh.', diem: -2, tran: 1, d: { dd: -3, tc: -2 }, kq: 'Phản ánh của em bị nghi ngờ vì em đã nhận quà từ bên bị phản ánh.', loi: 'Nhận quà của bên bị phản ánh.', rr: 'Phản ánh mất sức nặng, chủ cơ sở coi như đã được bỏ qua.' },
    { id: 'nhan_im', nn: 'Nhận quà, khuyên bà con thôi', nhan: 'Nhận quà và khuyên bà con thôi cho yên chuyện.', diem: -5, tran: 0, d: { pl: -6, dd: -8, tc: -6 }, kq: 'Việc xả nước bị bỏ qua, sức khoẻ bà con vẫn bị ảnh hưởng.', loi: 'Nhận quà để bỏ qua ô nhiễm.', rr: 'Tiếp tay che giấu hành vi gây ô nhiễm, sức khoẻ bà con vẫn bị ảnh hưởng.', bl: 'Đổi sự im lặng lấy tiền là tiếp tay che giấu hành vi gây ô nhiễm; quyền sống trong môi trường trong lành không thể đem đánh đổi (Lớp 12 Bài 13).' }
   ] }
  ],
  luat: [
   { neu: { truoc: ['h:chu', 'v:anh_muong'] }, thi: { diem: -2, d: { pl: -1 }, ghi: { k: 'bad', nd: 'Vì em hỏi chủ cơ sở khi chưa ghi hình dòng mương, họ biết có người để ý nên chiều đó nước tạm nhạt đi và ảnh em chụp sau không còn thuyết phục.' } } },
   { neu: { khong: ['h:bac_sau'], ke: ['viec:bao_ngay'] }, thi: { diem: -1, d: { tc: -1 }, ghi: { k: 'warn', nd: 'Vì em chưa hỏi bác Sáu nhà nào bị ảnh hưởng mà đã đi phản ánh, nội dung còn chung chung.' } } },
   { neu: { co: ['h:ong_tu'], ke: ['noi:xa'] }, thi: { diem: 1, ghi: { k: 'ok', nd: 'Vì em biết nước đổi màu vào chiều tối nên phản ánh nêu được thời điểm cụ thể để người có thẩm quyền kiểm tra.' } } },
   { neu: { co: ['h:thong_tin'], ke: ['noi:xa'] }, thi: { diem: 1, ghi: { k: 'ok', nd: 'Vì em đã xem thông tin của xã nên biết nơi nhận phản ánh và biết cơ sở chưa có thông tin xử lí nước thải được công bố.' } } },
   { neu: { ke: ['noi:xa'], khong_ke: ['viec:chan_cong', 'qua:nhan_im', 'qua:nhan_roi', 'bc:don_them'] }, thi: { cd: ['phan_anh_moi_truong'] } }
  ],
  ly: [
   { id: 'ly1', nhan: 'Vì bà con có quyền được sống trong môi trường trong lành và được tiếp cận thông tin.', ung: ['viec:ghi_nhan', 'viec:bao_ngay', 'noi:xa', 'bc:co_can_cu', 'qua:tra_lai'] },
   { id: 'ly2', nhan: 'Vì phản ánh cần có căn cứ để nơi có thẩm quyền xem xét.', ung: ['bc:co_can_cu', 'noi:xa', 'viec:ghi_nhan'] },
   { id: 'ly3', nhan: 'Vì quyền phản ánh phải thực hiện đúng theo quy định.', ung: ['noi:xa', 'viec:ghi_nhan', 'viec:bao_ngay', 'qua:tra_lai', 'bc:co_can_cu'] },
   { id: 'ly4', nhan: 'Vì không muốn mất lòng chủ cơ sở và làm xóm giềng căng thẳng.', ung: ['noi:chu_rieng', 'qua:nhan_roi', 'qua:nhan_im', 'viec:gap_chu', 'noi:cho', 'qua:de_bac'], vung: false, pb: 'Giữ hoà khí là điều tốt, nhưng sức khoẻ và quyền của cả xóm không thể đem đánh đổi; em có thể vừa lịch sự vừa phản ánh đúng nơi (Lớp 12 Bài 13).' },
   { id: 'ly5', nhan: 'Vì phải cho chủ cơ sở biết tay thì họ mới chịu sửa.', ung: ['viec:chan_cong', 'noi:mang', 'bc:don_them'], vung: false, pb: 'Làm chủ cơ sở sợ không thay cho việc đưa vụ việc đến nơi có thẩm quyền; cách đó còn khiến chính em vi phạm (Lớp 12 Bài 13; Lớp 11 Bài 13).' }
  ],
  muc: { hai: 9, mot: 0 },
  bl_muc: {
   2: 'Mọi người có quyền được sống trong môi trường trong lành, được tiếp cận thông tin về môi trường, khiếu nại, tố cáo hành vi vi phạm; xả nước thải chưa đạt quy chuẩn ra môi trường là hành vi bị nghiêm cấm (Lớp 12 Bài 13).',
   1: 'Em đã nghĩ đến sức khoẻ của bà con nhưng kế hoạch còn thiếu căn cứ hoặc chưa đúng cách; quyền phản ánh phải thực hiện theo quy định (Lớp 12 Bài 13; Lớp 11 Bài 13).',
   0: 'Chặn cổng, nhận quà để bỏ qua ô nhiễm hay lén vào cơ sở đều là cách làm sai quy định và khiến chính em vi phạm; quyền phản ánh phải thực hiện theo quy định (Lớp 12 Bài 13; Lớp 11 Bài 13).'
  },
  mau: 'Hỏi bác Sáu và ông Tư, ghi hình dòng mương và danh sách nhà bị ảnh hưởng, từ chối quà, rồi cùng bà con gửi phản ánh kèm căn cứ đến Uỷ ban nhân dân xã.'
 },

 /* ============ p3 · Đi đúng cửa (Lớp 10 Bài 11, 13, 20, 21) ============ */
 p3: {
  vai: {
   ten: 'Công dân · cháu của bà ngoại',
   muc_tieu: 'Giúp bà giải quyết chuyện hàng rào đúng cách, không để bà làm điều sai trong lúc đang giận.',
   duoc: ['Nghe bà, hỏi các bên, tìm giấy tờ', 'Hỏi để biết nên đến cơ quan nào', 'Đưa việc đến nơi có thẩm quyền'],
   khong: ['Tự phá hàng rào', 'Nhờ người quen «dẹp» giúp', 'Kết luận nhà bên lấn đất khi chưa ai xác định']
  },
  diem: 5, vat_toi_da: 3,
  hoi: [
   { id: 'ba', ai: 'Bà ngoại', cau: 'Bà ơi, bà có giấy tờ đất không? Nhà bên xây từ bao giờ?', tra: 'Bà có giấy tờ đất cất trong tủ. Nhà bên xây hồi đầu tháng, bà thấy hàng rào lấn sang chừng ba chục phân.', qt: 1 },
   { id: 'xom', ai: 'Nhà hàng xóm', cau: 'Cô chú xây hàng rào theo mốc nào ạ?', tra: 'Cô chú tưởng đó là ranh đất nhà mình, chưa ai đo lại cả.', qt: 1 },
   { id: 'to_truong', ai: 'Bác tổ trưởng', cau: 'Bác ơi, chuyện ranh giới đất nhà ở thì nhờ ai ạ?', tra: 'Chuyện đất đai thì bà cháu đến Uỷ ban nhân dân xã, phường: ở đó hướng dẫn thủ tục và xem xét giải quyết. Nhớ mang giấy tờ đất theo nhé.', qt: 1 },
   { id: 'co', ai: 'Cô giáo', cau: 'Cô ơi, Viện kiểm sát và Toà án khác nhau thế nào ạ?', tra: 'Toà án xét xử các vụ án, trong đó có vụ án dân sự. Viện kiểm sát thực hành quyền công tố và kiểm sát hoạt động tư pháp, không phải nơi nhận giải quyết tranh chấp ranh đất.', qt: 1 }
  ],
  vat: [
   { id: 'giay_dat', ten: 'Giấy tờ đất của nhà bà', mo: 'Bà cất trong tủ, em chụp lại một bản để khỏi làm mất.', loai: 'can', bl: 'Giấy tờ đất là căn cứ để nơi có thẩm quyền xem xét ranh giới của hai nhà.' },
   { id: 'anh_rao', ten: 'Ảnh hàng rào và ranh giới, ghi ngày giờ', mo: 'Chụp từ phía nhà bà, khi chưa ai sửa gì.', loai: 'can', bl: 'Ảnh có ngày giờ cho thấy hiện trạng lúc chưa ai thay đổi gì.' },
   { id: 'loi_ba', ten: 'Lời bà kể: nhà bên xây hồi nào, ai nhìn thấy', mo: 'Em ghi lại cho đủ, chưa nói chuyện với ai.', loai: 'huu_ich', bl: 'Giúp người xem xét hiểu diễn biến, nhưng chưa phải căn cứ để xác định ranh giới.' },
   { id: 'tin_don', ten: 'Chuyện đồn nhà bên «hay lấn chiếm» từ trước', mo: 'Nghe vài người trong xóm nói, không ai đưa ra giấy tờ nào.', loai: 'nhieu', bl: 'Lời đồn không giúp xác định ranh giới đất của hai nhà.' }
  ],
  o: [
   { id: 'viec', ten: 'Việc đầu tiên với bà', chon: [
    { id: 'diu_ba', nn: 'Xin bà bình tĩnh', nhan: 'Nghe bà kể, xin bà chưa làm gì tối nay, cùng bà tìm giấy tờ.', diem: 2, d: { pl: 2, tc: 2, dd: 1 }, kq: 'Bà bớt giận, chưa làm gì vội và cùng em chuẩn bị giấy tờ.' },
    { id: 'sang_noi', nn: 'Sang nói thẳng với nhà bên', nhan: 'Sang nói thẳng với nhà bên rằng họ xây lấn, yêu cầu dỡ ngay.', diem: -1, d: { pl: -1, tc: -2 }, kq: 'Hai nhà căng thẳng thêm, việc chưa đến nơi có thẩm quyền.', loi: 'Kết luận nhà bên sai khi chưa ai đo đạc.', rr: 'Hai nhà cãi vã, quan hệ hàng xóm căng thẳng thêm.' },
    { id: 'nho_quen', nn: 'Nhờ người quen «dẹp» giúp', nhan: 'Gọi người quen có chức quyền nhờ «dẹp» giúp cho nhanh.', diem: -2, tran: 1, d: { pl: -3, dd: -2 }, kq: 'Việc nhờ quen biết không đi qua thủ tục nên vụ việc vẫn chưa được giải quyết đúng cách.', loi: 'Nhờ người quen thay vì đi đúng nơi.', rr: 'Mất công bằng, nhà bên phản ứng, vụ việc vẫn chưa được giải quyết đúng thủ tục.', bl: 'Pháp luật áp dụng với mọi người như nhau, không phân biệt địa vị hay quen biết (Lớp 10 Bài 11).' },
    { id: 'cat_rao', nn: 'Cùng bà cắt hàng rào', nhan: 'Cùng bà cắt hàng rào tối nay cho xong.', diem: -5, tran: 0, cd: ['pha_rao'], d: { pl: -8, dd: -5, tc: -5 }, kq: 'Hàng rào bị phá, hai nhà thành xung đột và nhà bên có lí do phản ứng.', loi: 'Tự phá hàng rào khi đang giận.', rr: 'Bà và em vi phạm, có thể phải bồi thường, quan hệ hàng xóm tan vỡ.', bl: 'Tự giải quyết bằng cách xâm phạm tài sản người khác là vi phạm; pháp luật là phương tiện để giải quyết tranh chấp và bảo vệ quyền, lợi ích hợp pháp (Lớp 10 Bài 11, Bài 13).' }
   ] },
   { id: 'cua', ten: 'Đưa việc đến đâu', chon: [
    { id: 'uy_ban', nn: 'Uỷ ban nhân dân xã, phường', nhan: 'Uỷ ban nhân dân xã, phường nơi có nhà đất.', diem: 2, d: { pl: 3, tc: 1 }, kq: 'Việc đến đúng nơi trực tiếp quản lí đời sống dân cư và thủ tục đất đai ở cơ sở.', bl: 'Uỷ ban nhân dân cấp xã trực tiếp quản lí đời sống dân cư và giải quyết thủ tục hành chính như đất đai, hộ tịch (Lớp 10 Bài 21).' },
    { id: 'toa_an', nn: 'Toà án nhân dân', nhan: 'Làm đơn gửi thẳng Toà án nhân dân, bỏ qua cấp xã.', diem: 0, d: { tc: -1 }, kq: 'Toà án giải quyết các vụ án, nhưng em chưa nhờ cấp xã hướng dẫn nên chưa biết mình đã đi đủ các bước hay chưa.', bl: 'Toà án nhân dân xét xử, giải quyết các vụ án hình sự, hành chính, dân sự… (Lớp 10 Bài 20).' },
    { id: 'vien_ks', nn: 'Viện kiểm sát nhân dân', nhan: 'Làm đơn gửi Viện kiểm sát nhân dân, cơ quan lớn nhất.', diem: -1, d: { pl: -1, tc: -2 }, kq: 'Đơn gửi nhầm nơi nên có thể bị chuyển đi hoặc không được giải quyết.', loi: 'Gửi nhầm cơ quan.', rr: 'Đơn bị chuyển đi hoặc không được giải quyết, tranh chấp kéo dài.', bl: 'Viện kiểm sát thực hành quyền công tố và kiểm sát hoạt động tư pháp, không phải nơi nhận giải quyết tranh chấp ranh đất (Lớp 10 Bài 20).' },
    { id: 'cho', nn: 'Chưa đi đâu', nhan: 'Chưa đi đâu, chờ nhà bên tự sửa.', diem: -3, tran: 1, d: { pl: -2, tc: -2 }, kq: 'Tranh chấp vẫn nằm đó và cơn giận của bà chưa có chỗ nào giải toả.', loi: 'Để tranh chấp không có người giải quyết.', rr: 'Bà dễ làm liều, tranh chấp kéo dài.' }
   ] },
   { id: 'mang', ten: 'Em mang theo gì', chon: [
    { id: 'giay_anh', nn: 'Giấy tờ đất và ảnh', nhan: 'Giấy tờ đất của bà và ảnh hiện trạng có ngày giờ.', diem: 2, d: { pl: 2, dd: 1 }, kq: 'Nơi tiếp nhận có giấy tờ và hiện trạng để xem xét.', cb: 'Vì em nói sẽ mang giấy tờ đất và ảnh nhưng chưa chuẩn bị, nên khi đến nơi tiếp nhận em chưa có gì để họ xem xét.' },
    { id: 'chi_noi', nn: 'Chỉ kể bằng lời', nhan: 'Chỉ kể bằng lời, không mang theo giấy tờ hay ảnh cho nhẹ người.', diem: 0, d: { pl: -1 }, kq: 'Chưa có giấy tờ hay ảnh nên nơi tiếp nhận khó xem xét.' }
   ] },
   { id: 'cach', ten: 'Cách em nói với bà và nhà bên', chon: [
    { id: 'binh_tinh', nn: 'Giải thích, cùng nhờ xã', nhan: 'Giải thích với bà vì sao đi đúng cửa; báo nhà bên hai nhà cùng nhờ xã.', diem: 2, d: { tc: 2, dd: 1 }, kq: 'Bà hiểu vì sao phải đi đúng cửa, nhà bên thấy hai nhà cùng nhờ một nơi xem xét.' },
    { id: 'im_lang', nn: 'Không nói với nhà bên', nhan: 'Không nói gì với nhà bên, chỉ lặng lẽ đi làm giấy tờ cho xong.', diem: 0, kq: 'Nhà bên chưa biết gì, có thể bất ngờ khi nhận được thông báo.' },
    { id: 'doa_kien', nn: 'Nói «chúng tôi sẽ kiện»', nhan: 'Nói với nhà bên «nếu không dỡ thì lần sau chúng tôi kiện».', diem: -1, d: { tc: -2 }, kq: 'Lời doạ làm hai nhà đối đầu hơn, khó cùng ngồi lại.', loi: 'Dùng lời doạ thay cho thủ tục.', rr: 'Hai nhà đối đầu, khó cùng nhờ nơi có thẩm quyền xem xét.' }
   ] }
  ],
  luat: [
   { neu: { khong: ['h:xom'], ke: ['viec:sang_noi'] }, thi: { diem: -1, d: { tc: -1 }, ghi: { k: 'warn', nd: 'Vì em chưa hỏi nhà bên xây theo mốc nào mà đã nói họ xây lấn, hoá ra họ cũng chưa biết ranh đúng ở đâu, cuộc nói chuyện thành cãi vã.' } } },
   { neu: { co: ['h:co'], ke: ['cua:vien_ks'] }, thi: { diem: -2, ghi: { k: 'bad', nd: 'Vì cô đã giải thích Viện kiểm sát làm việc gì mà em vẫn gửi đơn đến đó.' } } },
   { neu: { co: ['v:loi_ba'], ke: ['cua:uy_ban'] }, thi: { diem: 1, ghi: { k: 'ok', nd: 'Vì em đã ghi lại lời bà kể nên khi trình bày ở xã, phường, em kể được nhà bên xây hồi nào và diễn biến ra sao.' } } },
   { neu: { co: ['h:xom'], ke: ['cach:binh_tinh'] }, thi: { diem: 1, d: { tc: 1 }, ghi: { k: 'ok', nd: 'Vì em biết nhà bên cũng chưa rõ ranh nên lời đề nghị cùng nhờ xã xem lại nghe hợp lí với họ.' } } },
   { neu: { co: ['h:to_truong'], ke: ['cua:uy_ban'] }, thi: { diem: 1, ghi: { k: 'ok', nd: 'Vì em đã hỏi bác tổ trưởng nên biết xã, phường hướng dẫn thủ tục và xem xét việc đất đai.' } } },
   { neu: { ke: ['cua:uy_ban'], khong_ke: ['viec:cat_rao', 'viec:nho_quen'] }, thi: { cd: ['dung_cua'] } }
  ],
  ly: [
   { id: 'ly1', nhan: 'Vì tranh chấp phải được giải quyết theo pháp luật, ở nơi có thẩm quyền.', ung: ['cua:uy_ban', 'viec:diu_ba', 'mang:giay_anh', 'cach:binh_tinh'] },
   { id: 'ly2', nhan: 'Vì em muốn bà bình tĩnh và hai nhà vẫn là hàng xóm của nhau.', ung: ['viec:diu_ba', 'cach:binh_tinh', 'cach:im_lang'] },
   { id: 'ly3', nhan: 'Vì mỗi cơ quan làm một việc khác nhau, cần đến đúng nơi.', ung: ['cua:uy_ban', 'cua:toa_an', 'mang:giay_anh', 'viec:diu_ba'] },
   { id: 'ly4', nhan: 'Vì cơ quan càng lớn thì càng chắc chắn được giải quyết.', ung: ['cua:vien_ks', 'cua:toa_an'], vung: false, pb: 'Cơ quan lớn hơn chưa chắc là nơi có thẩm quyền với việc này: mỗi cơ quan làm việc khác nhau (Lớp 10 Bài 20, Bài 21).' },
   { id: 'ly5', nhan: 'Vì đất của bà thì bà muốn làm gì cũng được.', ung: ['viec:cat_rao'], vung: false, pb: 'Có quyền với đất của mình không có nghĩa là được tự phá tài sản của người khác; tranh chấp cần giải quyết theo pháp luật (Lớp 10 Bài 11, Bài 13).' },
   { id: 'ly6', nhan: 'Vì có người quen thì việc chắc xong nhanh.', ung: ['viec:nho_quen'], vung: false, pb: 'Pháp luật áp dụng với mọi người như nhau, không phân biệt địa vị hay quen biết (Lớp 10 Bài 11).' }
  ],
  muc: { hai: 9, mot: 0 },
  bl_muc: {
   2: 'Uỷ ban nhân dân cấp xã trực tiếp quản lí đời sống dân cư và giải quyết thủ tục hành chính như đất đai, hộ tịch; Toà án nhân dân giải quyết các vụ án dân sự, bảo vệ quyền và lợi ích hợp pháp (Lớp 10 Bài 20, Bài 21).',
   1: 'Em đã tìm cách giải quyết nhưng kế hoạch còn thiếu sót hoặc chưa đi đúng cửa; mỗi cơ quan làm một việc, chọn đúng nơi thì việc mới được giải quyết nhanh và đúng thẩm quyền (Lớp 10 Bài 20, Bài 21).',
   0: 'Tự giải quyết bằng cách xâm phạm tài sản người khác là vi phạm; pháp luật là phương tiện để giải quyết tranh chấp và bảo vệ quyền, lợi ích hợp pháp (Lớp 10 Bài 11, Bài 13).'
  },
  mau: 'Xin bà bình tĩnh, hỏi nhà bên và bác tổ trưởng, mang giấy tờ đất và ảnh đến Uỷ ban nhân dân xã, phường nhờ hướng dẫn và xem xét; giải thích cho bà và báo nhà bên là hai nhà cùng nhờ xã xem lại ranh giới.'
 }
};
