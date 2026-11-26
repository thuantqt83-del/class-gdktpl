/* Tiện ích dùng chung. Mọi file khác dùng không gian tên SC. */
window.SC = window.SC || { pages: {}, data: {} };

// Chống chèn mã: mọi chuỗi đưa vào HTML đều phải đi qua SC.esc
SC.esc = function (s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};

// Chuẩn hóa để so sánh câu trả lời ngắn: bỏ dấu, hoa/thường, khoảng trắng; số thập phân dùng dấu chấm
SC.norm = function (s) {
  return String(s == null ? '' : s).trim().toLowerCase()
    .replace(/[–—−]/g, '-').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
    .replace(/(\d),(\d)/g, '$1.$2').replace(/\s+/g, ' ');
};

SC.sameAnswer = function (user, accepted) {
  var u = SC.norm(user);
  if (!u) return false;
  return accepted.some(function (a) {
    var n = SC.norm(a);
    if (n === u) return true;
    var isNum = /^-?\d+(\.\d+)?$/;
    return isNum.test(u) && isNum.test(n) && parseFloat(u) === parseFloat(n);
  });
};

SC.shuffle = function (arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
};

// Số ngẫu nhiên có hạt giống: «Tình huống của ngày» (và các bộ câu theo ngày) giống nhau trên mọi máy trong cùng ngày
SC.hashStr = function (s) {
  var h = 2166136261;
  for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};
SC.rng = function (seed) {
  var a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
SC.shuffleBy = function (arr, rnd) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
};
// Tiền giả định trong trò chơi: 1234567 -> "1.234.567 đ"
SC.tien = function (n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ'; };
// Mở một bài trong Kho kiến thức từ trang khác
SC.moBai = function (id) {
  var m = null;
  SC.data.curriculum.muc.forEach(function (x) { x.bai.forEach(function (b) { if (b.id === id) m = x; }); });
  if (!m) return;
  SC.pages.kho.khoi = m.khoi; SC.pages.kho.phan = m.phan; SC.pages.kho.bai = id;
  if (location.hash === '#/kho') SC.pages.kho.render(document.getElementById('app')); else location.hash = '#/kho';
  window.scrollTo(0, 0);
};
// Câu đủ điều kiện dùng trong trò chơi/thử thách: trắc nghiệm 4 lựa chọn, gắn bài, không phụ thuộc đoạn dẫn đã mất
SC.RX_THAMCHIEU = /(thông tin|đoạn|bảng|trường hợp|tình huống|biểu đồ|văn bản|nội dung|câu chuyện)\s+(trên|ở trên|đã nêu)|^\s*Đọc|nêu trên|nói trên|như trên|trên đây|câu hỏi\s*\d/i;
SC.RX_NGUOI = /\b(?:[Aa]nh|[Cc]hị|[Bb]à|[Ôô]ng|[Bb]ạn|[Cc]ô|[Cc]ông ty|[Cc]ông ti|[Dd]oanh nghiệp|[Gg]ia đình|[Nn]hóm|[Cc]ơ sở|[Vv]ợ chồng|[Tt]rường)\s+[A-ZĐ][a-z]?\b/;
SC.cauChoi = function (q) {
  if (q.dang !== 'tn4' || !q.bai || q.status === 'mau') return false;
  var t = String(q.q || '').normalize('NFC').trim();
  if (t.length > 450 || SC.RX_THAMCHIEU.test(t)) return false;
  if (SC.RX_NGUOI.test(t) && t.replace(/[?.:]+$/, '').indexOf('.') < 0 && t.length < 160) return false;   // nhân vật chữ cái mà không có tình huống đi kèm
  return new Set(q.o.map(function (x) { return x.trim(); })).size === 4;
};

// Câu có TÌNH HUỐNG thật (đoạn dẫn ≥ 2 câu, có nhân vật/chủ thể, không phải câu hỏi định nghĩa) — dùng để ưu tiên câu cho đấu trường.
SC.RX_DINHNGHIA = /^\s*(?:Khái niệm|Theo (?:SGK|quy định|Điều)|Nội dung nào sau đây|Đâu là|Điều nào sau đây|.{0,60}\blà gì\b)/i;
SC.RX_CHUTHE = /\b(?:anh|chị|bà|ông|bạn|cô|chú|em|cậu|công ty|doanh nghiệp|cửa hàng|hộ gia đình|gia đình|nhà máy|trường|học sinh|công dân|người dân|ủy ban|uỷ ban|ngân hàng)\b/i;
SC.cauTinhHuong = function (q) {
  if (!SC.cauChoi(q)) return false;
  var t = String(q.q || '').normalize('NFC').replace(/\s+/g, ' ').trim();
  if (t.length < 150 || SC.RX_DINHNGHIA.test(t)) return false;
  return t.split(/(?<=[.!?])\s+/).filter(Boolean).length >= 2 && SC.RX_CHUTHE.test(t);
};

// Lời giải gọn để hiện sau chữ "Đáp án: X.": bỏ phần "Đáp án X." và đoạn chép lại nguyên phương án ở đầu lời giải của câu kho
SC.loiGiai = function (q) {
  var e = String(q.e || '').replace(/^Đáp án\s+[A-D]\.\s*/, '').trim();
  if (q.dang === 'tn4' && q.o && q.o[q.a]) { var o = String(q.o[q.a]).trim(); if (e.indexOf(o) === 0) e = e.slice(o.length).replace(/^[\s.]+/, ''); }
  return SC.sach(e);
};

// Làm sạch chữ HIỂN THỊ (không sửa dữ liệu gốc): nội dung đã được duyệt nên bỏ các chỗ nhắc «SGK», số trang sách và nhãn nháp/chờ duyệt.
SC.sach = function (s) {
  var t = String(s == null ? '' : s);
  t = t.replace(/\(\s*(?:SGK|sách giáo khoa)\s+(trích[^)]*)\)/gi, '($1)');                  // (SGK trích Bộ luật…) → (trích Bộ luật…)
  t = t.replace(/\s*\(\s*(?:SGK|sách giáo khoa)[^)]*\)/gi, '');                              // (SGK tr.28–33), (SGK 12, Bài 5, tr.20)
  t = t.replace(/\s*Đối chiếu\s+(?:SGK|sách giáo khoa)[^.(]*(?:\([^)]*\))?\.?/gi, '');        // Đối chiếu SGK Bài 5 (tr.28–33).
  t = t.replace(/\s*[;,—-]?\s*\(?\s*(?:em soạn mới|em soạn)[^)]*chờ giáo viên duyệt\s*\)?/gi, '');
  t = t.replace(/(^|[\s,;:(])(?:ở|tại)\s+(?:SGK|sách giáo khoa)\s+tr\.\s*[\d–,\s-]*\d/gi, '$1trong bài');
  t = t.replace(/\s*(?:SGK|sách giáo khoa)\s+tr\.\s*[\d–,\s-]*\d(?=\s*[:;,.)]|\s*$)/gi, '');     // «Tài liệu SGK tr.10–11:» → «Tài liệu:»
  t = t.replace(/(^|[\s,;:(])(trong|theo|của|từ)\s+(?:SGK|sách giáo khoa)\b/gi, '$1$2 bài học');
  t = t.replace(/\b(?:SGK|sách giáo khoa)\b(?:\s+tr\.\s*[\d–,\s-]*\d)?\s*/gi, '');
  return t.replace(/\s{2,}/g, ' ').replace(/\s+([.,;:])/g, '$1').trim();
};

// Biểu tượng SVG nét đơn (dùng currentColor nên tự đổi màu theo giao diện sáng/tối)
SC.ICON = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
  book: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/><path d="M9 7.5h6"/>',
  exam: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m9 13 2 2 4-4"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H4.5A3 3 0 0 0 8 10M16 6h3.5A3 3 0 0 1 16 10"/><path d="M12 13v4M10 17h4M8.5 20.5h7"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.6"/><path d="M16 14.2A5 5 0 0 1 21.5 19"/>',
  chart: '<path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
  chat: '<path d="M20.5 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.3A8 8 0 1 1 20.5 11.5z"/><path d="M9 11.5h6M9 14.5h3.5"/>',
  list: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r=".8"/><circle cx="4" cy="12" r=".8"/><circle cx="4" cy="18" r=".8"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  steps: '<path d="M4 20h5v-5h5v-5h6"/><path d="M4 20V4"/>',
  store: '<path d="M4 9.5 5.5 4h13L20 9.5"/><path d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0"/><path d="M5 12v8h14v-8"/><path d="M10 20v-4.5h4V20"/>',
  scale: '<path d="M12 4v16"/><path d="M7.5 20h9"/><path d="M5 7h14"/><path d="m5 7-2.6 6.2a3 3 0 0 0 5.2 0z"/><path d="m19 7-2.6 6.2a3 3 0 0 0 5.2 0z"/>',
  bolt: '<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'
};
SC.icon = function (ten) {
  return '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (SC.ICON[ten] || '') + '</svg>';
};

// Tên bộ đề hiển thị: «8 tuần học kì I» → Giữa kì 1, «học kì I» → Cuối kì 1 (chỉ đổi chữ hiển thị; mã bộ 8T1/HK1/8T2/HK2 giữ nguyên)
SC.tenBo = function (s) {
  return String(s == null ? '' : s)
    .replace(/8 tuần\s+học kì\s+II\b/gi, 'Giữa kì 2').replace(/8 tuần\s+học kì\s+I\b/gi, 'Giữa kì 1')
    .replace(/học kì\s+II\b/gi, 'Cuối kì 2').replace(/học kì\s+I\b/gi, 'Cuối kì 1');
};
SC.pct = function (a, b) { return b ? Math.round(100 * a / b) : 0; };
SC.LETTERS = ['A', 'B', 'C', 'D'];
SC.MUC = { 1: 'Nhận biết', 2: 'Thông hiểu', 3: 'Vận dụng' };
SC.DANG = { tn4: 'Trắc nghiệm 4 lựa chọn', dung_sai: 'Đúng/sai nhiều ý', tra_loi_ngan: 'Trả lời ngắn' };
