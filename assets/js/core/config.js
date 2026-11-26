/* Cấu hình kết nối máy chủ (Supabase). ĐỂ TRỐNG thì app chạy chế độ trên máy như trước (không gọi mạng nào).
   Có đủ hai giá trị thì app bật đăng nhập (trang «Đăng nhập») và kết nối máy chủ.
   CHỈ dán Project URL và anon key (khoá CÔNG KHAI, lấy ở Supabase → Project Settings → API).
   TUYỆT ĐỐI KHÔNG dán service_role key, mật khẩu hay khoá bí mật vào file này: file này được đưa lên GitHub Pages cho mọi người xem. */
window.SC = window.SC || { pages: {}, data: {} };
SC.config = {
  supabaseUrl: 'https://nrknwplyjrtbbgapwdsq.supabase.co',      // dự án «Smart Class GDKT&PL» (đã nối 17/11/2026)
  supabaseAnonKey: 'sb_publishable_ciBfi0gKODgaku1JqtOjBg_CTc--HB4',   // khoá CÔNG KHAI (publishable), an toàn khi RLS đã bật
  giaoVienEmail: 'giaovien@example.com'   // địa chỉ NỘI BỘ của tài khoản giáo viên dùng chung (không cần có thật, không nhận thư): giáo viên chỉ nhập MẬT KHẨU. Đổi sang địa chỉ khác nếu chị tạo tài khoản với địa chỉ khác (xem HUONG-DAN-DANG-NHAP.md); KHÔNG ghi email thật của chị vào đây vì file này công khai trên GitHub
};
