/* Hồ sơ học tập: lịch sử các lượt làm bài. Chỉ lưu mã câu và kết quả, không lưu tên học sinh. */
SC.progress = {
  KEY: 'attempts',
  list: function () { return SC.storage.get(this.KEY, []); },
  add: function (att) {
    var l = this.list();
    l.unshift(att);
    SC.storage.set(this.KEY, l.slice(0, 200));
  },
  clear: function () { SC.storage.remove(this.KEY); },
  // Tổng hợp: số lượt, số câu, độ chính xác, theo mức độ, câu sai (để đề xuất ôn lại)
  summary: function () {
    var l = this.list(), soCau = 0, diem = 0, byMuc = { 1: [0, 0], 2: [0, 0], 3: [0, 0] }, sai = {};
    l.forEach(function (a) {
      a.chi_tiet.forEach(function (c) {
        soCau++; diem += c.diem;
        if (byMuc[c.muc_do]) { byMuc[c.muc_do][1]++; byMuc[c.muc_do][0] += c.diem; }
        if (!c.dung) sai[c.qid] = (sai[c.qid] || 0) + 1;
      });
    });
    return { luot: l.length, soCau: soCau, chinhXac: SC.pct(diem, soCau), byMuc: byMuc, sai: sai };
  }
};
