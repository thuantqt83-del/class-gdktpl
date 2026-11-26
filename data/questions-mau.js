/* CÂU MẪU KỸ THUẬT — chỉ để thử máy chấm và giao diện, KHÔNG gắn bài nào, KHÔNG phải nội dung chính thức.
   Số liệu là số giả định. Câu thật đưa vào từ Phần 2 (từ SGK đã nạp, giáo viên duyệt). status: "mau" | "cho_duyet" | "da_duyet".
   Cấu trúc: tn4 {o:[4], a:chỉ số} · dung_sai {q: tình huống, o:[các ý], a:[true/false...]} · tra_loi_ngan {a:[đáp án chấp nhận]} */
SC.data.questions = [
  { id: 'MAU-001', khoi: null, phan: 'kinh-te', chu_de: 'chung', muc_do: 1, dang: 'tn4', status: 'mau',
    q: 'Khi cầu về một hàng hóa tăng lên mà cung không đổi thì giá cả của hàng hóa đó thường:',
    o: ['giảm xuống', 'tăng lên', 'không thay đổi', 'bằng không'], a: 1,
    e: 'Cầu tăng trong khi cung giữ nguyên thì hàng hóa trở nên khan hiếm tương đối, giá có xu hướng tăng.',
    nguon: 'Câu mẫu kỹ thuật' },
  { id: 'MAU-002', khoi: null, phan: 'kinh-te', chu_de: 'chung', muc_do: 2, dang: 'tn4', status: 'mau',
    q: 'Một cửa hàng có doanh thu 500 triệu đồng và tổng chi phí 380 triệu đồng (số giả định). Lợi nhuận trước thuế là:',
    o: ['120 triệu đồng', '880 triệu đồng', '380 triệu đồng', '500 triệu đồng'], a: 0,
    e: 'Lợi nhuận = doanh thu − tổng chi phí = 500 − 380 = 120 (triệu đồng).',
    nguon: 'Câu mẫu kỹ thuật' },
  { id: 'MAU-003', khoi: null, phan: 'kinh-te', chu_de: 'chung', muc_do: 3, dang: 'tn4', status: 'mau',
    q: 'Cửa hàng A tăng giá 20% nhưng lượng bán giảm mạnh vì khách chuyển sang cửa hàng khác bán hàng tương tự (tình huống giả định). Nguyên nhân hợp lí nhất là:',
    o: ['cầu ít co giãn và không có hàng thay thế', 'cầu co giãn mạnh vì có nhiều hàng thay thế', 'cung của thị trường giảm đột ngột', 'khách hàng không quan tâm đến giá'], a: 1,
    e: 'Khách dễ chuyển sang nơi khác khi có nhiều hàng thay thế nên chỉ cần giá tăng là lượng mua giảm mạnh.',
    nguon: 'Câu mẫu kỹ thuật' },
  { id: 'MAU-004', khoi: null, phan: 'kinh-te', chu_de: 'chung', muc_do: 2, dang: 'dung_sai', status: 'mau',
    q: 'Một cửa hàng trong tháng có doanh thu 200 triệu đồng và tổng chi phí 150 triệu đồng (số giả định).',
    o: ['Lợi nhuận trước thuế của tháng là 50 triệu đồng.',
        'Nếu tổng chi phí tăng lên 210 triệu đồng với doanh thu không đổi thì cửa hàng bị lỗ 10 triệu đồng.',
        'Lợi nhuận được tính bằng doanh thu cộng với tổng chi phí.',
        'Nếu doanh thu không đổi và chi phí giảm thì lợi nhuận giảm.'],
    a: [true, true, false, false],
    e: 'a) 200 − 150 = 50. b) 200 − 210 = −10 nên lỗ 10. c) Sai: lợi nhuận = doanh thu − chi phí. d) Sai: chi phí giảm thì lợi nhuận tăng.',
    nguon: 'Câu mẫu kỹ thuật' },
  { id: 'MAU-005', khoi: null, phan: 'kinh-te', chu_de: 'chung', muc_do: 2, dang: 'tra_loi_ngan', status: 'mau',
    q: 'Doanh thu là 300 triệu đồng, tổng chi phí là 240 triệu đồng (số giả định). Lợi nhuận trước thuế là bao nhiêu triệu đồng? (chỉ ghi số)',
    o: [], a: ['60'],
    e: 'Lợi nhuận = 300 − 240 = 60 (triệu đồng).',
    nguon: 'Câu mẫu kỹ thuật' }
];
