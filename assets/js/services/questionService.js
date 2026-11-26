/* Lớp câu hỏi. Phần 2 nạp thêm câu từ data/lopXX/...; Phần 4 thêm nhập Excel; Phần 5 đọc từ máy chủ. */
SC.questions = {
  all: function () { return SC.data.questions || []; },
  // chỉ lấy câu theo bộ lọc: { muc_do, dang }; null = tất cả
  filter: function (f) {
    f = f || {};
    return this.all().filter(function (q) {
      return (!f.muc_do || q.muc_do === f.muc_do) && (!f.dang || q.dang === f.dang) &&
        (!f.bai || q.bai === f.bai) && (!f.khoi || q.khoi === f.khoi);
    });
  },
  pick: function (n, f) { return SC.shuffle(this.filter(f)).slice(0, n); },
  // Tìm câu theo mã, cả trong ngân hàng bài lẫn trong các đề thi thử (để phân tích lỗi sai từ lịch sử làm bài)
  byId: function (id) {
    if (!this._map) {
      var m = {};
      this.all().forEach(function (q) { m[q.id] = q; });
      ['lop10', 'lop11', 'lop12', 'l10n', 'l11n', 'l12n', 'tn', 'hsg25'].forEach(function (k) {
        ((SC.data.de && SC.data.de[k]) || []).forEach(function (d) { d.cau.forEach(function (q) { m[q.id] = q; }); });
      });
      this._map = m;
    }
    return this._map[id] || null;
  },
  // Chấm một câu. Trả về { dung: true|false, diem: 0..1, chi_tiet }
  // Phần 1 chấm ngay trên trình duyệt để THỬ. Phần 5 chuyển chấm chính thức lên máy chủ.
  cham: function (q, ans) {
    if (q.dang === 'tn4') {
      var ok = ans === q.a;
      return { dung: ok, diem: ok ? 1 : 0 };
    }
    if (q.dang === 'dung_sai') {
      var arr = Array.isArray(ans) ? ans : [];
      var n = 0;
      q.a.forEach(function (v, i) { if (arr[i] === v) n++; });
      return { dung: n === q.a.length, diem: n / q.a.length, so_y_dung: n };
    }
    var okk = SC.sameAnswer(ans, q.a);
    return { dung: okk, diem: okk ? 1 : 0 };
  }
};
