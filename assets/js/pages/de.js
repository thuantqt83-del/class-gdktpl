/* Đề thi thử có bấm giờ: 18 đề theo khối 10, 11, 12 (24 trắc nghiệm + 4 đúng/sai, 50 phút), 24 đề luyện thi TỐT NGHIỆP nguyên văn từ đề nguồn và các đề luyện HSG lớp 12.
   Chấm tại trình duyệt chỉ để thử; chấm chính thức chuyển lên máy chủ ở Phần 5.
   Thang điểm lấy theo đề (d.cham):
   - Khối 10–12 và Tốt nghiệp: QĐ 764/QĐ-BGDĐT — Phần I 0,25 đ/câu; Phần II mỗi câu: đúng 1 ý 0,1 · 2 ý 0,25 · 3 ý 0,5 · 4 ý 1,0; tổng 10 điểm.
   - HSG: cấu trúc Sở GDĐT Ninh Bình (CV 1229/SGDĐT-QLCL) — Phần I 0,4 đ/câu (30 câu); Phần II mỗi câu: đúng 1 ý 0,3 · 2 ý 0,6 · 3 ý 1,0 · 4 ý 1,6; tổng 20 điểm. */
SC.pages.de = {
  title: 'Đề thi thử',
  khoi: 11,
  CHAM_764: { tong: 10, tn: 0.25, ds: [0, 0.1, 0.25, 0.5, 1.0] },
  danhSach: function (k) {
    var D = SC.data.de || {};
    return (k === 'tn' ? D.tn : k === 'hsg' ? D.hsg25 : (D['l' + k + 'n'] || D['lop' + k])) || [];
  },
  chamCua: function (d) { return d.cham || this.CHAM_764; },
  // Mọi đề (Bước 3: giáo viên giao bài/xuất đề in, học sinh làm bài được giao): [{nhom, d}]
  tatCa: function () {
    var self = this, kq = [];
    [[10, 'Lớp 10'], [11, 'Lớp 11'], [12, 'Lớp 12'], ['tn', 'Tốt nghiệp'], ['hsg', 'HSG']].forEach(function (g) {
      self.danhSach(g[0]).forEach(function (d) { kq.push({ nhom: g[1], d: d }); });
    });
    return kq;
  },
  timDe: function (id) { var t = this.tatCa().filter(function (x) { return x.d.id === id; })[0]; return t ? t.d : null; },
  fmt: function (x) { return String(Math.round(x * 100) / 100).replace('.', ','); },
  bo: '8T1',   // bộ đề đang chọn ở thanh cuộn (Giữa kì 1 · Cuối kì 1 · Giữa kì 2 · Cuối kì 2)
  // GIAO DIỆN (24/11/2026): chọn lớp 10/11/12 → MỘT THANH CUỘN NGANG gồm bốn bộ đề (giữa kì 1, cuối kì 1 = học kì 1, giữa kì 2, cuối kì 2 = học kì 2) → lưới ô đề gọn, bấm «Làm đề» để vào làm có bấm giờ.
  render: function (el, role) {
    var self = this, E = SC.esc, gv = role === 'gv', de = this.danhSach(this.khoi);
    var BO = [['8T1', 'Giữa kì 1', 'Đề giữa kì 1'], ['HK1', 'Cuối kì 1', 'Đề học kì 1'], ['8T2', 'Giữa kì 2', 'Đề giữa kì 2'], ['HK2', 'Cuối kì 2', 'Đề học kì 2']];
    function soDe(d) { return d.so_de || ((String(d.ten).match(/Đề\s*(\d+)/i) || [0, ''])[1]) || ''; }
    function o(d) {   // ô đề gọn
      var c = self.chamCua(d), nTn = d.cau.filter(function (q) { return q.dang === 'tn4'; }).length, nDs = d.cau.filter(function (q) { return q.dang === 'dung_sai'; }).length;
      var tt = d.tom_tat ? '<p class="mute">' + E(d.tom_tat) + '</p>' : '';
      var kh = d.khoa ? '<p class="mute">Khoá: ' + ['khớp 2 nguồn', '1 nguồn', 'đã giải lại, khớp khoá', 'đã tự giải lại'].filter(function (x) { return d.khoa[x]; }).map(function (x) { return d.khoa[x] + ' câu ' + (x === 'đã tự giải lại' ? '<b>' + x + '</b>' : x); }).join(' · ') + '</p>' : '';
      var gvInfo = gv ? '<details class="de-gv"><summary class="mute">Nguồn đề (giáo viên)</summary><p class="mute">' + E(d.pham_vi || '') + '</p>' + tt + kh + (d.sua ? '<p class="mute">' + E(d.sua) + '</p>' : '') + '</details>' : '';
      return '<div class="de-o"><b class="de-so">' + (soDe(d) ? 'Đề ' + E(soDe(d)) : E(SC.tenBo(d.ten))) + '</b><span class="mute">' + nTn + ' TN' + (nDs ? ' + ' + nDs + ' Đ/S' : '') + ' · ' + d.thoi_gian + ' phút · ' + c.tong + ' điểm</span>' +
        '<button class="btn" type="button" data-de="' + E(d.id) + '" aria-label="Làm ' + E(SC.tenBo(d.ten)) + ' (bấm giờ)">Làm đề</button>' + gvInfo + '</div>';
    }
    var NHAN = { 10: 'Lớp 10', 11: 'Lớp 11', 12: 'Lớp 12', tn: 'Tốt nghiệp' };
    var tabs = [10, 11, 12, 'tn'].map(function (k) { return '<button type="button" data-k="' + k + '" class="' + (String(k) === String(self.khoi) ? 'on' : '') + '">' + NHAN[k] + ' <span class="mute">(' + self.danhSach(k).length + ')</span></button>'; }).join('');
    var mota, thanDe = '', thanh = '';
    if (this.khoi === 'tn') {
      mota = 'Đề luyện thi tốt nghiệp THPT môn Giáo dục kinh tế và pháp luật: ' + de.length + ' đề, mỗi đề 24 câu trắc nghiệm và 4 câu đúng/sai (mỗi câu 4 ý), 50 phút, thang 10 điểm theo cấu trúc định dạng QĐ 764/QĐ-BGDĐT.';
      thanDe = '<div class="de-luoi">' + (de.map(o).join('') || '<div class="empty">Chưa có đề.</div>') + '</div>';
    } else if (SC.data.de['l' + this.khoi + 'n']) {
      if (!BO.some(function (b) { return b[0] === self.bo; })) this.bo = BO[0][0];
      var cur = BO.filter(function (b) { return b[0] === self.bo; })[0], xs = de.filter(function (d) { return d.bo === self.bo; });
      var pv = xs.length && /^Bài/.test(xs[0].pham_vi || '') ? String(xs[0].pham_vi).split(' · ')[0].replace(/\s*\(.*$/, '') : '';
      thanh = '<div class="bo-bar" role="tablist" aria-label="Chọn bộ đề (cuộn ngang)">' + BO.map(function (b) {
        var n = de.filter(function (d) { return d.bo === b[0]; }).length, on = b[0] === self.bo;
        return '<button type="button" role="tab" aria-selected="' + on + '" class="bo-chip' + (on ? ' on' : '') + '" data-bo="' + b[0] + '" title="' + E(b[2]) + '"><b>' + E(b[1]) + '</b><span>' + n + ' đề</span></button>';
      }).join('') + '</div>';
      mota = 'Lớp ' + this.khoi + ' · ' + cur[1] + (pv ? ' · ' + pv : '') + ' · ' + xs.length + ' đề. Mỗi đề 24 câu trắc nghiệm và 4 câu đúng/sai (mỗi câu 4 ý), 50 phút, thang 10 điểm theo QĐ 764/QĐ-BGDĐT. Cuối kì 1 là đề học kì 1, cuối kì 2 là đề học kì 2.';
      thanDe = '<div class="de-luoi">' + (xs.map(o).join('') || '<div class="empty">Chưa có đề.</div>') + '</div>';
    } else {
      mota = 'Mỗi đề gồm 24 câu trắc nghiệm 4 lựa chọn và 4 câu đúng/sai (mỗi câu 4 ý), 50 phút, thang 10 điểm theo QĐ 764/QĐ-BGDĐT.';
      thanDe = '<div class="de-luoi">' + (de.map(o).join('') || '<div class="empty">Chưa có đề.</div>') + '</div>';
    }
    el.innerHTML = '<div class="card"><h2>Luyện đề thi thử (có bấm giờ)</h2><div class="tabs tabs-cuon" role="group" aria-label="Chọn lớp">' + tabs + '</div>' + thanh +
      '<p class="mute">' + mota + '</p></div><div class="card">' + thanDe + '</div><div id="run"></div>';
    el.querySelectorAll('.tabs [data-k]').forEach(function (b) { b.addEventListener('click', function () { var v = b.dataset.k; self.khoi = (v === 'tn' || v === 'hsg') ? v : +v; self.render(el, role); }); });
    el.querySelectorAll('.bo-chip').forEach(function (b) { b.addEventListener('click', function () { self.bo = b.dataset.bo; self.render(el, role); }); });
    var on = el.querySelector('.bo-chip.on'); if (on && on.scrollIntoView) { try { on.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (e) {} }
    el.querySelectorAll('button[data-de]').forEach(function (b) {
      b.addEventListener('click', function () {
        var d = de.filter(function (x) { return x.id === b.getAttribute('data-de'); })[0];
        if (d) SC.pages.de.lam(el.querySelector('#run'), d);
      });
    });
  },
  lam: function (run, d, tuyChon) {   // tuyChon.baiGiao: mã bài giao (Bước 3) — lượt làm gắn với bài cô giao
    var E = SC.esc, self = this, timer = null, done = false, left = d.thoi_gian * 60, c = this.chamCua(d);
    run.innerHTML = '<div class="card"><h2>' + E(SC.tenBo(d.ten)) + '</h2><p>Thời gian còn lại: <b id="tg"></b></p></div>';
    var cards = d.cau.map(function (q, i) { var cd = SC.QuestionCard(q, i + 1); run.appendChild(cd.el); return cd; });   // đề thi: không có gợi ý
    var luotP = SC.cloud && SC.cloud.laHS() ? SC.cloud.batDauLuot(d.id, { baiGiao: tuyChon && tuyChon.baiGiao }) : null;   // Bước 2: học sinh đã vào lớp => lượt làm lưu trên máy chủ
    var bar = document.createElement('div'); bar.className = 'row';
    bar.innerHTML = '<button class="btn" type="button" id="nop">Nộp bài</button>'; run.appendChild(bar);
    var tg = run.querySelector('#tg');
    function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r; }
    // Đề «kiểu mù đáp án» (d.mu, đề của giáo viên đưa lên máy chủ): máy học sinh KHÔNG có đáp án, nên không chấm tại máy.
    // Nộp lên máy chủ chấm; máy chủ chỉ trả đáp án khi bài giao cho phép (ngay / sau hạn / không). Nộp lỗi thì giữ nguyên bài và cho nộp lại.
    function nopMu() {
      if (done) return; clearInterval(timer);
      var ans = {}; cards.forEach(function (cd) { ans[cd.q.id] = cd.getAnswer(); cd.freeze(); });
      bar.innerHTML = '<div class="card" style="flex:1"><p role="status">Đang nộp bài lên máy chủ…</p></div>';
      Promise.resolve(luotP).then(function (r) {
        if (!r || !r.ok) throw { thongBao: (r && r.thongBao) || 'Chưa bắt đầu được lượt làm trên máy chủ. Cần vào lớp (đăng nhập bằng tên) và làm đề từ mục «Bài cô giao».' };
        return SC.cloud.nopBai(r.luotId, ans, {});
      }).then(function (kq) {
        if (!kq.ok) throw { thongBao: kq.thongBao };
        done = true;
        var dap = kq.dapAn || {}, co = Object.keys(dap).length > 0;
        cards.forEach(function (cd) {
          if (co && dap[cd.q.id] !== undefined) { cd.q.a = dap[cd.q.id]; cd.lock(SC.questions.cham(cd.q, cd.getAnswer())); } else cd.lock({ kin: true });
        });
        SC.progress.add({ id: 'D' + Date.now(), ts: new Date().toISOString(), so_cau: kq.soCau, so_dung: kq.soCauDung, diem10: kq.diem10, chi_tiet: [] });   // chỉ ghi điểm máy chủ chấm
        bar.innerHTML = '<div class="card" style="flex:1"><h3>Kết quả</h3><p><b>' + kq.soCauDung + '/' + kq.soCau + '</b> câu đúng hoàn toàn · <b>điểm máy chủ chấm ' + self.fmt(kq.diem) + '/' + self.fmt(kq.tong) + '</b> (thang 10: <b>' + self.fmt(kq.diem10) + '</b>)' +
          (kq.trangThai === 'het_gio' ? ' · <b>nộp quá giờ</b>' : '') + '</p>' +
          (co ? '<p class="mute">Đáp án từng câu đã hiện ở trên.</p>' : '<p class="mute">Đáp án sẽ hiện sau hạn nộp bài (theo cài đặt của cô): vào lại mục «Bài cô giao» sau hạn để xem điểm.</p>') +
          (kq.huyHieuMoi && kq.huyHieuMoi.length ? '<p>🏅 Huy hiệu mới: <b>' + kq.huyHieuMoi.map(SC.esc).join(', ') + '</b></p>' : '') +
          '<a class="btn" href="#/hoso">Xem hồ sơ học tập</a> <a class="btn alt" href="#/baigiao">Về «Bài cô giao»</a></div>';
        bar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }).catch(function (e) {
        bar.innerHTML = '<div class="card" style="flex:1"><p role="alert">⚠️ ' + E((e && e.thongBao) || (e && e.message) || 'Không nộp được bài.') + '</p><p class="mute">Bài của em vẫn còn trên màn hình. Kiểm tra mạng rồi bấm «Nộp lại».</p><p><button class="btn" type="button" id="nop-lai">Nộp lại</button></p></div>';
        bar.querySelector('#nop-lai').addEventListener('click', nopMu);
      });
    }
    function nop() {
      if (d.mu) { nopMu(); return; }
      if (done) return; done = true; clearInterval(timer);
      var chi = [], tn = 0, ds = 0;
      cards.forEach(function (cd) {
        var r = SC.questions.cham(cd.q, cd.getAnswer()); cd.lock(r);
        var x = { qid: cd.q.id, muc_do: cd.q.muc_do, dang: cd.q.dang, dung: r.dung, diem: r.diem, bai: cd.q.bai };
        if (cd.q.dang === 'dung_sai') { x.so_y = r.so_y_dung; ds += c.ds[r.so_y_dung || 0] || 0; } else tn += r.diem * c.tn;
        chi.push(x);
      });
      var soDung = chi.filter(function (x) { return x.dung; }).length, tong = Math.round((tn + ds) * 100) / 100;
      var diem10 = Math.round(tong / c.tong * 1000) / 100;   // quy về thang 10 để ghi vào Hồ sơ học tập
      SC.progress.add({ id: (d.loai === 'hsg' ? 'H' : d.loai === 'tn' ? 'N' : 'D') + Date.now(), ts: new Date().toISOString(), so_cau: cards.length, so_dung: soDung, diem10: diem10, chi_tiet: chi });
      bar.innerHTML = '<div class="card" style="flex:1"><h3>Kết quả</h3><p><b>' + soDung + '/' + cards.length + '</b> câu đúng hoàn toàn · điểm thử <b>' + self.fmt(tong) + '/' + c.tong + '</b>' +
        ' (Phần I ' + self.fmt(Math.round(tn * 100) / 100) + ' · Phần II ' + self.fmt(Math.round(ds * 100) / 100) + ')</p>' +
        '<p class="mute">Cách tính: Phần I ' + self.fmt(c.tn) + ' điểm mỗi câu đúng; Phần II mỗi câu theo số ý đúng: 1 ý ' + self.fmt(c.ds[1]) + ' · 2 ý ' + self.fmt(c.ds[2]) + ' · 3 ý ' + self.fmt(c.ds[3]) + ' · 4 ý ' + self.fmt(c.ds[4]) +
        (d.loai === 'hsg' ? ' (quy về thang 20, theo tỉ lệ cấu trúc Sở GDĐT Ninh Bình, CV 1229)' : ' (QĐ 764/QĐ-BGDĐT)') + '.</p>' +
        '<p class="mute" id="cloud-kq" aria-live="polite"></p><a class="btn" href="#/hoso">Xem hồ sơ học tập</a> <a class="btn alt" href="#/ai" onclick="SC.pages.ai.tab=\'phantich\'">Phân tích lỗi sai</a></div>';
      if (SC.cloud) SC.cloud.luuKetQua(luotP, cards, bar.querySelector('#cloud-kq'));
      bar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    bar.querySelector('#nop').addEventListener('click', nop);
    function tick() { if (!run.isConnected) { clearInterval(timer); return; } tg.textContent = fmt(left); if (left <= 0) { nop(); return; } left--; }
    tick(); timer = setInterval(tick, 1000);
    run.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
