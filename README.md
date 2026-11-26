# Class GDKT&PL

**Trang web: https://thuantqt83-del.github.io/class-gdktpl/** (GitHub Pages; mở bằng trình duyệt, không cần cài đặt).

**Hướng dẫn cho học sinh (PDF):** [huong-dan/HUONG-DAN-HOC-SINH.pdf](huong-dan/HUONG-DAN-HOC-SINH.pdf) · mã QR và áp phích để in: thư mục [huong-dan](huong-dan).

Ứng dụng học tập môn **Giáo dục Kinh tế và Pháp luật** lớp 10 – 11 – 12. Viết bằng HTML và JavaScript thuần, **chạy ngay trên trình duyệt, không cần cài đặt**; phần học và luyện đề chạy được khi không có mạng.

> Nội dung là **bản nháp chờ giáo viên duyệt**. Số tiền, giá, số liệu trong các trò mô phỏng là **số giả định**. Trợ giảng trong app là bản soạn sẵn, **chưa phải AI thật**.

## Có gì trong app
- **Kho kiến thức:** 58 bài của lớp 10, 11, 12 có hệ thống kiến thức, ví dụ thực tiễn và câu tự kiểm tra.
- **Luyện đề:** chọn lớp 10, 11 hoặc 12, rồi chọn trên một thanh cuộn: giữa kì 1, cuối kì 1 (học kì 1), giữa kì 2, cuối kì 2 (học kì 2); mỗi bộ 10 đề, bấm giờ 50 phút, chấm thang 10. Có thêm đề luyện thi tốt nghiệp.
- **Ôn luyện học sinh giỏi lớp 12:** các đề bấm giờ, chấm quy về thang 20.
- **Trò chơi Quiz tính điểm:** hai phòng «Kinh doanh ảo» và «Pháp luật quanh ta»; bấm «Chơi ngay» là chơi 10 câu ngắn, tự lưu và tự tính điểm; có thi đấu online cùng lớp.
- **Tình huống theo 4 cấp độ** trong mỗi phòng: Kinh doanh ảo (Khởi nghiệp, Điều hành, Xử lý khủng hoảng, Doanh nghiệp bền vững) và Pháp luật quanh ta (Luật chơi chung, Quyền đi cùng nghĩa vụ, Công dân trưởng thành, Công dân có trách nhiệm).
- **Giáo viên:** tạo lớp, nhập danh sách học sinh từ Excel (và xóa danh sách khi cần), giao bài, xem thống kê, xuất đề in, **tải đề ra file Word** (bản học sinh; bản giáo viên tô đỏ đậm đáp án), **«Đề của tôi»**: tự thêm đề từ file Word, Excel/CSV hoặc văn bản dán (xem trước và chọn lại đáp án trước khi lưu; đề lưu trong trình duyệt, có sao lưu .json) và **đưa lên máy chủ để giao bài**: học sinh làm bấm giờ trong «Bài cô giao», đáp án nằm ở máy chủ (không có trên máy học sinh), máy chủ chấm điểm và chỉ hiện đáp án theo cài đặt của bài giao. **Hồ sơ học tập** và **Trợ giảng** cho học sinh.

## Chạy thử
- Mở `index.html` bằng trình duyệt (hoặc bật **GitHub Pages**, xem `HUONG-DAN-GITHUB.md`). Địa chỉ trong app dùng dấu `#` nên không cần máy chủ riêng.
- Không cần tài khoản để học và luyện đề; kết quả lưu trên trình duyệt của máy.

## Đăng nhập (tuỳ chọn, cần máy chủ Supabase)
- **Học sinh:** chỉ gõ **tên** (do giáo viên nhập trước cho lớp).
- **Giáo viên:** chỉ nhập **mật khẩu**.
- Muốn bật: xem `HUONG-DAN-DANG-NHAP.md`. Chưa cấu hình máy chủ thì app vẫn chạy đầy đủ ở chế độ trên máy.
- `assets/js/core/config.js` chỉ chứa địa chỉ dự án và **khoá công khai** (publishable key, an toàn khi đã bật phân quyền RLS). **Tuyệt đối không** đưa `service_role key`, mật khẩu cơ sở dữ liệu hay email thật của giáo viên vào repo.

## Cấu trúc thư mục
```
index.html          trang chính
assets/css          giao diện
assets/js           mã chương trình (core, pages, services, components, vendor)
assets/audio        giọng đọc thu sẵn
assets/img          hình hệ thống kiến thức
assets/vendor       thư viện supabase-js (MIT)
data/               nội dung: bài học theo lớp, đề, trò chơi, kho câu hỏi
```

## Quyền riêng tư
Không thu thập họ tên, ngày sinh, số điện thoại. Học sinh dùng **tên gọi ở lớp hoặc biệt danh**. Xếp hạng và đấu trường chỉ hiện mã, không hiện tên.

## Giấy phép và bản quyền
Chưa chọn giấy phép: chủ repo cần chọn trước khi công khai. Một số câu hỏi lấy từ đề nguồn của giáo viên và bám sách giáo khoa; **hãy kiểm tra quyền sử dụng trước khi đặt repo ở chế độ công khai**. Thư viện bên thứ ba: supabase-js (MIT, `assets/vendor`), three.js (MIT, `assets/js/vendor`).
