# Hướng dẫn đăng nhập mới: học sinh chỉ gõ tên, giáo viên chỉ nhập mật khẩu

> ✅ BẢN NHÁP — cô duyệt trước khi dùng · 24/11/2026 · **Tình trạng:** `schema_buoc5.sql` (mục B.1) **đã chạy xong trên Supabase thật ngày 24/11/2026**, kết quả «TẤT CẢ ĐÚNG». **Tài khoản giáo viên đã tạo ngày 25/11/2026 (mục A)**; **Anonymous sign-ins đã bật** (kiểm 25/11/2026). **Đăng nhập học sinh bằng tên đã thử trên máy chủ thật ngày 26/11/2026** (lớp thử và tên thử, đã tự dọn): 14 kiểm tra đạt, gồm cả giao diện. Danh sách tên của 5 lớp (220 học sinh) đã nhập cùng ngày. Phần giao diện đã thử bằng máy chủ giả.

**Nguyên tắc:** cô tự đặt và giữ mật khẩu. **Đừng gửi mật khẩu, `service_role key` hay mật khẩu cơ sở dữ liệu cho ai**, và đừng dán chúng vào file nào của app (file `config.js` được đưa công khai lên GitHub).

## Nếu chưa muốn bật gì ở máy chủ
App vẫn chạy đầy đủ phần học, luyện đề, Quiz và trò chơi, kết quả lưu trên trình duyệt của máy. Các mục A, B chỉ cần khi cô muốn có lớp, bài cô giao, thống kê và xếp hạng.

## A. Giáo viên chỉ nhập mật khẩu (làm một lần)
App tự điền sẵn «email nội bộ» của tài khoản giáo viên (mặc định `giaovien@example.com`, đặt ở `assets/js/core/config.js`, mục `giaoVienEmail`). Địa chỉ này **không cần có thật và không nhận thư**; cô chỉ cần tạo tài khoản mang đúng địa chỉ đó.

**Cách nhanh (khuyên dùng):** trong thư mục app chạy `python -X utf8 _cong-cu/supabase/tao_giao_vien.py --host … --user …` (giống `chay_sql.py`); script hỏi mật khẩu cơ sở dữ liệu và mật khẩu giáo viên mới (gõ hai lần, không hiện ra màn hình), tạo tài khoản, cấp quyền giáo viên và đăng nhập thử. Đổi mật khẩu sau này: thêm `--dat-lai`.

**Hoặc làm tay:**
1. Supabase → **Authentication → Users → Add user → Create new user**: Email `giaovien@example.com` (hoặc địa chỉ khác cô chọn, rồi sửa cùng địa chỉ ở `config.js`), **Password** do cô tự đặt, bật **Auto Confirm User**.
2. **SQL Editor**: mở `_cong-cu/supabase/them_giao_vien.sql`, thay `EMAIL_CUA_CO` bằng `giaovien@example.com`, bấm Run. Phải ra đúng **1 dòng** (hoặc thêm dòng nếu cô đã có tài khoản giáo viên cũ).
3. Vào app → **Đăng nhập → Giáo viên** → chỉ gõ mật khẩu.

**Nếu cô đã có lớp tạo bằng tài khoản giáo viên cũ (đăng nhập bằng email thật):** lớp thuộc về tài khoản cũ nên tài khoản mới không thấy. Có hai cách: (1) vẫn dùng tài khoản cũ bằng mục gập «Đăng nhập bằng email (chủ dự án)» ở trang Đăng nhập; hoặc (2) chuyển lớp sang tài khoản mới trong SQL Editor: `update lop set giao_vien_id = (select id from auth.users where email = 'giaovien@example.com') where giao_vien_id = (select id from auth.users where email = 'EMAIL_CŨ_CỦA_CÔ');`. **Đừng ghi email thật của cô vào `config.js`.**

Lưu ý: dùng chung một tài khoản giáo viên nghĩa là **ai biết mật khẩu đều vào được phần quản lý**. Đặt mật khẩu dài, đừng chia sẻ cho học sinh.

## B. Học sinh chỉ gõ tên (làm một lần ở máy chủ)
1. Chạy file `_cong-cu/supabase/schema_buoc5.sql` **một lần**. Cách 1 (khuyên dùng): trong thư mục app, chạy `python -X utf8 _cong-cu/supabase/chay_sql.py --host … --user … --chi schema_buoc5.sql` (script hỏi mật khẩu cơ sở dữ liệu, không lưu lại). Cách 2: chép toàn bộ nội dung file vào **SQL Editor** rồi Run. Chạy lại nhiều lần cũng được.
2. Vào app bằng tài khoản giáo viên → **Quản lý giáo viên → Lớp và mã học sinh**. Có ba cách thêm tên:
   - **Nút «Nhập danh sách từ Excel…» (nhanh nhất, dùng được nhiều lần):** chọn file `.xls`, `.xlsx` hoặc `.csv` có cột «Họ và tên» (hoặc «Họ đệm» + «Tên»), mỗi sheet một lớp. App đọc file ngay trên máy cô (không gửi file đi), chỉ lấy họ tên (không lấy mã học sinh, ngày sinh, điểm), cho xem trước từng lớp rồi mới nhập; lớp chưa có thì tự tạo, tên đã có thì bỏ qua. Hai bạn trùng họ tên trong một lớp thì bạn sau được thêm số («… 2») và app báo ở màn xem trước.
   - **Nút «Xóa danh sách lớp …»:** xóa hết học sinh của lớp đang chọn (lớp và mã lớp giữ nguyên) để nhập lại danh sách mới; phải gõ đúng tên lớp để xác nhận, không hoàn tác được.
   - Gõ tay: chọn lớp → ô **«Học sinh vào lớp bằng tên»**: gõ danh sách tên, mỗi dòng một tên → **Thêm tên**.
   - Nhập hàng loạt bằng dòng lệnh (đã dùng ngày 26/11/2026 cho 10A7, 10A8, 10A9, 12A7, 12A8): `python -X utf8 _cong-cu/supabase/nhap_ten_hs.py --tep <sổ điểm.xls> --sheet <tiền tố sheet> --lop 10A7,10A8 --host … --user …` (thêm `--xem` để xem trước, không cần mật khẩu).
3. Học sinh vào app → **Đăng nhập → Học sinh** → gõ tên (có dấu hay không dấu đều được). Nếu có hai bạn cùng tên ở hai lớp, app hỏi «Em học lớp nào?».

Những điều cần biết:
- **Tên lưu trên máy chủ của cô** (bảng `hoc_sinh`); chỉ cô và chính bạn đó xem được. Xếp hạng và đấu trường vẫn chỉ hiện **mã**, không hiện tên. **Nên dùng tên gọi ở lớp hoặc biệt danh**, không nhập họ tên đầy đủ, ngày sinh, số điện thoại.
- **Một tên chỉ dùng ở một máy** (như mã cũ). Đổi máy: cô bấm **«Cho đăng nhập lại»** ở danh sách học sinh.
- **Rủi ro nói thẳng:** tên dễ đoán hơn mã, nên bạn nào gõ đúng tên trước thì giữ được tên đó. Nếu một bạn bị người khác vào trước, cô bấm «Cho đăng nhập lại» cho tên ấy. Mỗi máy được thử sai tối đa 8 lần trong 10 phút.
- Hai bạn cùng tên **trong một lớp** thì phải đổi một tên cho khác nhau (ví dụ «Lan A», «Lan B»); hệ thống bỏ qua tên trùng khi nhập.
- Cách cũ (**mã lớp + mã học sinh**) vẫn dùng được, nằm ở mục gập «Vào bằng mã lớp + mã học sinh».

## C. Nếu gặp lỗi
| Thông báo | Nghĩa là |
|---|---|
| «Máy chủ chưa có chức năng đăng nhập bằng tên (cô cần chạy schema_buoc5.sql)» | chưa làm mục B.1 |
| «Mật khẩu chưa đúng» | sai mật khẩu, hoặc chưa tạo tài khoản ở mục A.1 với đúng địa chỉ trong `config.js` |
| «Tài khoản này chưa được cấp quyền giáo viên» | chưa chạy `them_giao_vien.sql` cho đúng địa chỉ (mục A.2) |
| «Chưa thấy tên này trong lớp nào» | cô chưa nhập tên đó, hoặc gõ khác chữ cái |
| «Tên này đã được dùng ở một máy khác» | cô bấm «Cho đăng nhập lại» cho tên đó |
| «Máy chủ chưa cho học sinh đăng nhập» | chưa bật **Anonymous sign-ins** (xem HUONG-DAN-BUOC-1.md, mục C) |

## C. Đề của tôi cho học sinh làm và giao bài (làm một lần ở máy chủ)
Chạy file `_cong-cu/supabase/schema_buoc6.sql` **một lần** (chạy lại được): `python -X utf8 _cong-cu/supabase/chay_sql.py --host … --user … --chi schema_buoc6.sql`. **Đã chạy ngày 26/11/2026 trên Supabase thật** (kèm 44 kiểm tra, xem `thu_that_de.py`).

Cách dùng: tab «Đề của tôi» → bấm **«Đưa lên máy chủ để giao bài»** (đề đã đưa lên thì không sửa; muốn đổi thì thêm đề mới) → tab «Giao bài» → chọn nhóm «Đề của tôi (đã đưa lên máy chủ)». Học sinh làm ở «Bài cô giao»; **đáp án chỉ nằm ở máy chủ**, máy chủ chấm điểm và chỉ hiện đáp án theo ô «Cho xem đáp án» của bài giao. Muốn gỡ đề khỏi máy chủ: xoá bài giao trước, rồi bấm «Gỡ khỏi máy chủ».

Giới hạn: tối đa 100 câu/đề, 300 KB/đề, 100 đề/giáo viên; đề chỉ có chữ (chưa có hình), dạng trắc nghiệm 4 phương án và đúng/sai 4 ý. Học sinh cần có mạng để lấy đề.
