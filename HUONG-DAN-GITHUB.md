# Đưa Class GDKT&PL lên GitHub và bật trang web (GitHub Pages)

> ✅ BẢN NHÁP · 24/11/2026 · Thư mục này là **bản đóng gói hoàn chỉnh**: chép **nguyên cả thư mục** (không chép thư mục cha) lên GitHub.

## 1. Trước khi công khai (đọc kĩ)
1. **Bản quyền nội dung.** Một số câu hỏi lấy từ đề nguồn của cô và bám sách giáo khoa. Nếu chưa chắc được phép công khai, tạo repo ở chế độ **Private** (GitHub Pages cho repo Private cần gói trả phí) hoặc chỉ dùng nội bộ.
2. **Giấy phép.** Thêm file `LICENSE` nếu muốn cho người khác dùng lại (GitHub: Add file → Create new file → gõ `LICENSE` → chọn mẫu).
3. **Không bí mật trong repo.** File `assets/js/core/config.js` chỉ có địa chỉ dự án và khoá công khai. Đừng bao giờ thêm `service_role key`, mật khẩu cơ sở dữ liệu hay email thật vào repo.
4. **Đăng nhập (nếu dùng):** làm theo `HUONG-DAN-DANG-NHAP.md` ở máy chủ Supabase; các file SQL nằm ở thư mục làm việc (`_cong-cu/supabase/`), **không đưa lên GitHub** vì có file chứa đáp án.

## 2. Tạo repo
1. Vào github.com → **New repository** → đặt tên (ví dụ `class-gdktpl`) → chọn Public hoặc Private → **không** tick «Add a README» → **Create repository**.

## 3. Đưa file lên
Thư mục có hơn 100 file nên **không dùng ô «Upload files» của trình duyệt** (giới hạn khoảng 100 file mỗi lần). Chọn một trong hai cách:

**Cách A — GitHub Desktop (dễ nhất).** Cài GitHub Desktop → File → **Add local repository** → chọn thư mục này (nếu hỏi «create a repository», đồng ý) → **Commit to main** → **Publish repository**.

**Cách B — Git dòng lệnh.** Mở PowerShell trong thư mục này (thay `TEN-CUA-CO` và `class-gdktpl`):
```powershell
git init
git add .
git commit -m "Class GDKT&PL"
git branch -M main
git remote add origin https://github.com/TEN-CUA-CO/class-gdktpl.git
git push -u origin main
```

## 4. Bật trang web
Trên GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, thư mục `/ (root)` → Save**. Đợi 1–2 phút, trang hiện địa chỉ dạng `https://TEN-CUA-CO.github.io/class-gdktpl/`. Mở thử: trang chủ, Luyện thi, Quiz.

## 5. Cập nhật sau này
Khi có bản đóng gói mới (từ thư mục làm việc: `node tools/dong_goi_github.js`), chép đè vào thư mục repo, rồi GitHub Desktop → Commit → Push (hoặc `git add . ; git commit -m "..." ; git push`). Sau 1–2 phút trang web tự cập nhật; nếu thấy bản cũ, nhấn **Ctrl + F5**.

## 6. Nếu trang không lên
| Triệu chứng | Cách xử lí |
|---|---|
| Trang trắng hoặc thiếu hình, thiếu dữ liệu | Nhấn F12 → Console xem file nào báo 404; GitHub phân biệt chữ hoa/thường trong tên file (Windows thì không). Bộ đóng gói đã kiểm điều này. |
| Đăng nhập báo «Chưa kết nối máy chủ» | `config.js` trống hoặc sai; xem `HUONG-DAN-DANG-NHAP.md`. |
| Vẫn thấy bản cũ | Ctrl + F5, hoặc đợi vài phút. |

## 7. Chi phí và giới hạn (kiểm ngày 26/11/2026; số liệu của nhà cung cấp có thể đổi, xem lại trên trang giá chính thức)
**GitHub Pages:** miễn phí với kho **công khai** (gói GitHub Free); kho riêng tư cần gói trả phí. Giới hạn: trang ≤ 1 GB, băng thông mềm 100 GB/tháng, dựng tối đa khoảng 10 lần/giờ; không dùng để bán hàng/kinh doanh. App này nặng khoảng 10,7 MB, nên 220 học sinh tải lần đầu chỉ khoảng 2,4 GB. Không có hạn dùng, miễn là kho còn và không vi phạm điều khoản.

**Supabase gói Free ($0):** gọi API không giới hạn số lượt, 50.000 người dùng hoạt động/tháng, cơ sở dữ liệu 500 MB, truyền dữ liệu ra 5 GB/tháng, 1 GB tệp. Dữ liệu nạp sẵn của app dưới 1 MB. Cần biết:
- **Dự án Free bị tạm dừng khi ít hoạt động trong 7 ngày** (nghỉ hè, nghỉ Tết sẽ gặp). **Không có công tắc nào để tắt việc này ở gói Free**; chỉ gói Pro ($25/tháng, phải gắn thẻ) mới không bao giờ bị tạm dừng. Bị dừng thì vào bảng điều khiển bấm «Resume project» là có lại dữ liệu (tài liệu hiện hành ghi khôi phục được trong 1 năm kể từ khi dừng). Ba cách giữ cho khỏi bị dừng:
  1. **Có sẵn trong thư mục này:** tệp `.github/workflows/giu-hoat-dong-supabase.yml` làm GitHub gọi 3 lệnh đọc (bằng khoá công khai, không lộ dữ liệu) mỗi ngày lúc 10:17 giờ Việt Nam. Tài liệu Supabase nói vài lượt gọi mỗi ngày là đủ. Nó chỉ chạy sau khi cô đưa thư mục lên GitHub (kho công khai thì Actions miễn phí). Muốn tắt thì xoá tệp đó. **GitHub tự tắt lịch này nếu kho 60 ngày liền không có commit nào**; nhận mail báo thì vào tab Actions bấm Enable. Gọi thất bại (ví dụ dự án đã bị dừng) thì GitHub gửi mail báo cho chủ kho.
  2. **Thư cảnh báo của Supabase:** khoảng 1 tuần trước khi dừng, Supabase gửi mail cho chủ dự án; vào bảng điều khiển một lần là hết dừng.
  3. **Nâng lên Pro** nếu cần chắc chắn tuyệt đối (cô tự làm ở Billing, vì cần thẻ).
- **Gói Free không có sao lưu tự động.** Giữ file Excel danh sách lớp (nhập lại bằng nút «Nhập danh sách từ Excel») và nên xuất kết quả quan trọng ra máy.
- **Đăng nhập ẩn danh mặc định tối đa 30 lần mỗi giờ cho MỖI địa chỉ IP.** Cả lớp dùng chung wifi trường thì chỉ khoảng 30 bạn vào được trong một giờ. Dự án này đã được tăng lên **300 lần/giờ** ngày 26/11/2026 (Supabase → Authentication → Rate Limits → «Rate limit for anonymous users»); nếu nhiều lớp đăng nhập lần đầu cùng lúc thì tăng thêm ở đó. Mỗi máy chỉ đăng nhập ẩn danh một lần rồi giữ phiên.
- Trợ giảng trong app là bản soạn sẵn, không gọi dịch vụ AI nào, nên không phát sinh phí gọi AI.
