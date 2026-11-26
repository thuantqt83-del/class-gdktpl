/* «Đưa thêm đề»: đọc một đề thi từ file Word (.docx), Excel/CSV theo mẫu, hoặc văn bản dán vào, ngay trên trình duyệt (không gửi đi đâu), rồi phân tích thành câu hỏi để giáo viên XEM TRƯỚC và sửa đáp án trước khi lưu.
   Quy ước nhận diện (giống đề của cô): «Câu N.» mở câu; phương án «A. B. C. D.» (trắc nghiệm) hoặc «a) b) c) d)» (đúng/sai); «PHẦN I / PHẦN II» chia phần.
   Đáp án đúng được nhận theo thứ tự: (1) chữ TÔ ĐỎ / GẠCH CHÂN / TÔ NỀN ở phương án; (2) chữ ĐẬM ở đúng một phương án; (3) «(Đúng)/(Sai)» sau ý; (4) bảng «Đáp án» cuối đề (1-A 2-B …; Câu 1: a Đ, b S …). Câu nào không nhận được đáp án thì để trống cho cô chọn.
   API:  SC.nhapde.docTep(arrayBuffer, tenTep) -> Promise<{cau:[…], canhBao:[…], loi:[…], ten, khoi}>      SC.nhapde.tuVanBan(chuoi) -> như trên (văn bản dán)
         SC.nhapde.dungDe(cau, {ten, khoi, thoi_gian}) -> đề {id, ten, cau:[{id, dang:'tn4'|'dung_sai', q, o, a}], …}      SC.nhapde.mauCSV() -> chuỗi CSV mẫu (UTF-8 có BOM)
   Câu: {dang, q, o:[4 chuỗi], a: số 0–3 (tn4) | [4 bool] (dung_sai) | null, nguon:'mau|dam|ghi chu|bang|bang tinh|thieu', ghi:[cảnh báo]} */
(function (goc) {
  'use strict';
  var SC = goc.SC = goc.SC || { pages: {}, data: {} };
  var N = SC.nhapde = {};

  function boDau(s) { return String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/\s+/g, ' ').trim(); }
  function giaMa(s) {
    return String(s).replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, function (m, e) {
      e = e.toLowerCase();
      if (e === 'amp') return '&'; if (e === 'lt') return '<'; if (e === 'gt') return '>'; if (e === 'quot') return '"'; if (e === 'apos') return "'";
      var n = e.charAt(1) === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return isFinite(n) ? String.fromCodePoint(n) : m;
    });
  }
  function gon(s) { return String(s == null ? '' : s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim(); }

  /* ================= Đọc đoạn văn trong .docx ================= */
  function bat(rPr, tag) {
    var m = new RegExp('<w:' + tag + '(?:\\s+w:val="([^"]*)")?\\s*/>').exec(rPr);
    if (!m) return false;
    return !(m[1] === '0' || m[1] === 'false' || m[1] === 'off' || m[1] === 'none');
  }
  function laDo(hex) {
    var r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
    return r >= 0xB0 && g <= 0x70 && b <= 0x70;
  }
  function docDoanDocx(xml) {
    var out = [], re = /<w:p\b[^>]*?(?:\/>|>([\s\S]*?)<\/w:p>)/g, m;
    while ((m = re.exec(xml))) {
      var body = m[1] || '', seg = [], num = null;
      var mn = /<w:numPr>([\s\S]*?)<\/w:numPr>/.exec(body);
      if (mn) { var id = /<w:numId\s+w:val="(\d+)"/.exec(mn[1]); if (id && id[1] !== '0') num = id[1]; }
      var rr = /<w:r\b[^>]*>([\s\S]*?)<\/w:r>/g, r;
      while ((r = rr.exec(body))) {
        var rb = r[1], pr = (/<w:rPr>([\s\S]*?)<\/w:rPr>/.exec(rb) || [0, ''])[1];
        var mau = /<w:color\s+w:val="([0-9A-Fa-f]{6})"/.exec(pr), hl = /<w:highlight\s+w:val="(\w+)"/.exec(pr);
        var cf = { dam: bat(pr, 'b'), do_: !!(mau && laDo(mau[1])), gach: bat(pr, 'u'), nen: !!(hl && hl[1] !== 'none') };
        var tk = /<w:t\b[^>]*>([\s\S]*?)<\/w:t>|<w:tab\s*\/>|<w:br\b[^>]*\/>|<m:t\b[^>]*>([\s\S]*?)<\/m:t>/g, k, t = '';
        while ((k = tk.exec(rb))) t += k[1] != null ? giaMa(k[1]) : k[2] != null ? giaMa(k[2]) : ' ';
        if (t) seg.push({ t: t, dam: cf.dam, do_: cf.do_, gach: cf.gach, nen: cf.nen });
      }
      var txt = seg.map(function (s) { return s.t; }).join('');
      if (gon(txt)) out.push({ t: txt, seg: seg, num: num });
    }
    return out;
  }

  /* ================= Phân tích thành câu hỏi ================= */
  var RX_CAU = /^\s*(?:Câu|CÂU|Cau|Question)\s*(\d+)\s*[.:)\-–]?\s*(.*)$/;
  var RX_PHAN = /^\s*PHẦN\s*(III|II|I|1|2|3)\b/i;
  var RX_OPT_TN = /^\s*([A-D])\s*[.)]\s*(.*)$/;
  var RX_OPT_DS = /^\s*([a-d])\s*[.)]\s*(.*)$/;
  var RX_BANG = /^\s*(?:BẢNG\s+)?(?:ĐÁP\s*ÁN|HƯỚNG\s*DẪN\s*CHẤM|ĐÁP\s*ÁN\s*VÀ)/i;

  // dấu «đánh dấu đáp án» của một đoạn: đỏ / gạch chân / tô nền (không tính chữ cái nhãn «A.» đầu dòng); trả về {manh, dam}
  function dauDoan(p) {
    var manh = false, damChu = false, dai = 0, damDai = 0, pos = 0;
    var tho = p.seg.map(function (s) { return s.t; }).join(''), bo = (/^\s*[A-Da-d]\s*[.)]\s*/.exec(tho) || [''])[0].length;   // bỏ nhãn «A.» đầu dòng khỏi phần xét dấu
    p.seg.forEach(function (s) {
      var phan = s.t, cat = Math.max(0, Math.min(phan.length, bo - pos));
      pos += phan.length;
      var noiDung = phan.slice(cat);
      if (!/\S/.test(noiDung)) return;
      dai += noiDung.replace(/\s/g, '').length;
      if (s.do_ || s.gach || s.nen) manh = true;
      if (s.dam) damDai += noiDung.replace(/\s/g, '').length;
    });
    damChu = dai > 0 && damDai >= dai * 0.6;
    return { manh: manh, dam: damChu };
  }

  function tachOption(dong, loai) {   // một dòng có thể chứa nhiều phương án «A. … B. … C. … D. …»: tách theo thứ tự chữ cái
    var rx = loai === 'ds' ? /(^|\s)([a-d])\s*[.)]\s+/g : /(^|\s)([A-D])\s*[.)]\s+/g, hits = [], m, exp = null;
    while ((m = rx.exec(dong))) {
      var c = m[2].toUpperCase();
      if (exp === null ? (m.index === 0 || m[1] === '') : c === exp) { hits.push({ c: m[2], i: m.index + m[1].length, fin: m.index + m[0].length }); exp = String.fromCharCode(c.charCodeAt(0) + 1); }
    }
    if (hits.length < 2) return null;
    return hits.map(function (h, k) { var den = k + 1 < hits.length ? hits[k + 1].i : dong.length; return { c: h.c, t: gon(dong.slice(h.fin, den)), i: h.i, fin: h.fin, den: den }; });
  }

  // Bản đồ dấu theo từng ký tự của một đoạn (đã gọn khoảng trắng như gon()): tô đỏ/gạch chân/tô nền = «mạnh», in đậm = «đậm». Cho phép xét dấu RIÊNG từng phương án khi một dòng có 2–4 phương án.
  function banDo(seg) {
    var t = '', mc = [], dm = [], cuoiCach = true;
    seg.forEach(function (s) {
      var manh = !!(s.do_ || s.gach || s.nen), dam = !!s.dam;
      for (var i = 0; i < s.t.length; i++) {
        var c = s.t.charAt(i);
        if (/\s/.test(c)) { if (!cuoiCach) { t += ' '; mc.push(false); dm.push(false); cuoiCach = true; } }
        else { t += c; mc.push(manh); dm.push(dam); cuoiCach = false; }
      }
    });
    if (t.length && t.charAt(t.length - 1) === ' ') { t = t.slice(0, -1); mc.pop(); dm.pop(); }
    return { t: t, mc: mc, dm: dm };
  }
  function dauKhoang(b, tu, den) {
    var manh = false, dem = 0, dam = 0;
    for (var i = tu; i < den && i < b.t.length; i++) { if (b.t.charAt(i) === ' ') continue; dem++; if (b.mc[i]) manh = true; if (b.dm[i]) dam++; }
    return { manh: manh, dam: dem > 0 && dam >= dem * 0.6 };
  }

  function phanTichDong(dong) {
    var cau = [], canhBao = [], cur = null, phan = null, dsBang = [], bang = false, daThuPhan3 = false, het = false;
    var ngCanh = null;   // đoạn thông tin dùng chung cho nhiều câu: «Đọc thông tin và trả lời câu 17, 18, 19: …» → ghép vào đầu các câu đó
    function dong1() { if (cur) { cau.push(cur); cur = null; } }
    function laSo(s) {
      var kq = [], rg = /(\d+)\s*(?:-|–|đến)\s*(\d+)/g, m;
      while ((m = rg.exec(s))) for (var k = +m[1]; k <= +m[2] && k - +m[1] < 40; k++) kq.push(k);
      (s.replace(rg, ' ').match(/\d+/g) || []).forEach(function (x) { kq.push(+x); });
      return kq;
    }
    function nhanCanh(t) {
      var hd = /(?:trả lời|dựa vào|căn cứ|dựa trên|xét)[^.:]{0,80}?câu(?:\s*hỏi)?\s*(\d[\d\s,;\-–và]*)/i.exec(t);
      if (hd && (!ngCanh || !ngCanh.dong.length)) {
        ngCanh = { dong: [], so: laSo(hd[1]) };
        var con = gon(t.slice(hd.index + hd[0].length).replace(/^[\s.:;,-]+/, ''));
        if (con.length >= 20) ngCanh.dong.push(con);
        return;
      }
      if (!ngCanh) ngCanh = { dong: [], so: [] };
      ngCanh.dong.push(t);
    }
    function moi(so, nd, dang) {
      dong1();
      var qd = gon(nd);
      if (ngCanh && ngCanh.dong.length) {
        var ap = ngCanh.so.length ? ngCanh.so.indexOf(so) >= 0 : true;
        if (ap) qd = gon(ngCanh.dong.join(' ') + ' ' + qd);
        if (!ngCanh.so.length || so >= Math.max.apply(null, ngCanh.so)) ngCanh = null;
      }
      cur = { so: so, dang: dang || (phan === 'ds' ? 'dung_sai' : 'tn4'), q: qd, o: [], dauO: [], dam: [], nhan: [], a: null, nguon: 'thieu', ghi: [], tienToDa: 0 };
    }
    var demNhan = 0;   // đếm phương án khi đoạn dùng danh sách tự đánh số (không có chữ A. B. trong văn bản)
    dong.forEach(function (p) {
      var t = gon(p.t), m;
      if (!t || het) return;
      if (/^[\s\-–—_*=~.]*HẾT\b/i.test(t)) { het = true; dong1(); return; }   // «--- HẾT ---»: hết đề, chữ phía sau không phải của câu hỏi
      if ((cau.length || cur) && t.length <= 80 && RX_BANG.test(t)) { bang = true; cur && dong1(); }   // «BẢNG ĐÁP ÁN» cuối đề (tiêu đề đề thi mở đầu bằng «ĐÁP ÁN – …» không tính)
      if (bang) { dsBang.push(t); return; }
      if ((m = RX_PHAN.exec(t))) {
        var so = m[1].toUpperCase();
        phan = (so === 'I' || so === '1') ? 'tn' : (so === 'II' || so === '2') ? 'ds' : 'tl';
        dong1(); ngCanh = null;
        if (phan === 'tl' && !daThuPhan3) { daThuPhan3 = true; canhBao.push('Có «PHẦN III» (trả lời ngắn): app chưa hỗ trợ dạng này nên các câu của phần đó được bỏ qua.'); }
        return;
      }
      if (phan === 'tl') return;
      if ((m = RX_CAU.exec(t))) { moi(+m[1], m[2], null); demNhan = 0; return; }
      if (!cur) { if (cau.length || ngCanh || /(?:trả lời|dựa vào|căn cứ)[^.:]{0,80}?câu/i.test(t)) nhanCanh(t); return; }   // chưa có câu đang mở: đoạn thông tin dùng chung, hoặc (trước câu đầu tiên) tiêu đề đề thi
      var tach = tachOption(t, cur.dang === 'dung_sai' || phan === 'ds' ? 'ds' : 'tn');
      if (!tach && (m = (cur.dang === 'dung_sai' || phan === 'ds' ? RX_OPT_DS : RX_OPT_TN).exec(t))) tach = [{ c: m[1], t: gon(m[2]), i: 0, fin: t.length - m[2].length, den: t.length }];
      if (tach) {
        // đủ nhãn trong chữ: nếu là phương án đầu của một câu chưa rõ dạng thì dạng theo chữ hoa/thường
        if (!cur.o.length && /^[a-d]$/.test(tach[0].c)) cur.dang = 'dung_sai';
        var bd = banDo(p.seg), khop = bd.t === t;   // xét dấu từng phương án theo vị trí chữ (bỏ nhãn «A.»); không khớp bản đồ thì không suy đáp án từ dấu
        tach.forEach(function (x) {
          var dd = khop ? dauKhoang(bd, x.fin, x.den) : { manh: false, dam: false }, dn = khop ? dauKhoang(bd, x.i, x.fin) : { manh: false };   // dn: dấu chỉ ở chữ cái nhãn «A.» (một số đề chỉ gạch chân/tô đỏ chữ A, B, C, D)
          cur.o.push(x.t); cur.nhan.push(x.c); cur.dauO.push(dd.manh); cur.dam.push(dd.dam); (cur.dauN = cur.dauN || []).push(dn.manh);
          var kqDS = /\((Đúng|Sai|Đ|S)\)\s*$/i.exec(x.t);
          if (kqDS) { cur.o[cur.o.length - 1] = gon(x.t.replace(/\((Đúng|Sai|Đ|S)\)\s*$/i, '')); (cur.dsGhi = cur.dsGhi || {})[cur.o.length - 1] = /^(Đúng|Đ)$/i.test(kqDS[1]); }
          else if (/^[a-d]$/.test(x.c) && khop && x.t.length > 8 && /\s(Đ|S)$/.test(x.t)) {   // ý đúng/sai kết thúc bằng chữ «Đ»/«S» tô đỏ hoặc in đậm (cách ghi đáp án thường gặp)
            var vt = x.den - 1; while (vt > 0 && bd.t.charAt(vt) === ' ') vt--;
            if (bd.mc[vt] || bd.dm[vt]) { cur.o[cur.o.length - 1] = gon(x.t.replace(/\s(Đ|S)$/, '')); (cur.dsGhi = cur.dsGhi || {})[cur.o.length - 1] = /Đ$/.test(x.t); }
          }
        });
        return;
      }
      // đoạn không có nhãn trong chữ: phương án của danh sách Word tự đánh số (A. B. C. D. do Word sinh), hoặc phần nối tiếp
      if (p.num && cur.o.length < 4 && cur.q) {
        var kiem = cur.dang === 'dung_sai' || phan === 'ds', d2 = dauDoan(p);
        cur.o.push(t); cur.nhan.push((kiem ? 'abcd' : 'ABCD')[cur.o.length - 1]); cur.dauO.push(d2.manh); cur.dam.push(d2.dam);
        return;
      }
      var c0 = t.charAt(0), tiepNoi = /[(,;.)]/.test(c0) || (c0.toLowerCase() === c0 && c0.toUpperCase() !== c0);   // viết tiếp câu trước (dấu câu hoặc chữ thường)
      if (cur.o.length >= 4 && !tiepNoi) { dong1(); nhanCanh(t); return; }   // đủ 4 phương án rồi mà còn chữ không nhãn, không viết tiếp bằng chữ thường: đoạn thông tin dùng chung của các câu sau
      if (cur.o.length) { cur.o[cur.o.length - 1] = gon(cur.o[cur.o.length - 1] + ' ' + t); }   // dòng tiếp của phương án cuối
      else cur.q = gon(cur.q + ' ' + t);
    });
    dong1();
    return { cau: cau, canhBao: canhBao, dsBang: dsBang };
  }

  function docBangDapAn(dsBang) {
    var tn = {}, ds = {}, mode = 'tn', txt = dsBang.join('\n');
    if (/PHẦN\s*II\b|ĐÚNG\s*\/?\s*SAI/i.test(txt)) {
      var cut = txt.search(/PHẦN\s*II\b|Đúng\s*\/?\s*Sai|ĐÚNG\s*\/?\s*SAI/i);
      var a = cut > 0 ? txt.slice(0, cut) : txt, b = cut > 0 ? txt.slice(cut) : '';
      scanTN(a, tn); scanDS(b, ds);
    } else { scanTN(txt, tn); scanDS(txt, ds); }
    function scanTN(s, o) { var rx = /(?:^|[^\d])(\d{1,2})\s*[-.:)]?\s*([ABCD])(?![A-Za-zÀ-ỹ])/g, m; while ((m = rx.exec(s))) if (!o[m[1]]) o[m[1]] = m[2]; }
    function scanDS(s, o) {
      var rx = /Câu\s*(\d+)\s*[:.)]?\s*((?:[a-dA-D]\s*[-.:)]?\s*(?:Đúng|Sai|Đ|S)\s*[,;\s·-]*){2,4})/gi, m;
      while ((m = rx.exec(s))) {
        var ys = /([a-dA-D])\s*[-.:)]?\s*(Đúng|Sai|Đ|S)(?![A-Za-zÀ-ỹ])/gi, y, kq = [null, null, null, null];
        while ((y = ys.exec(m[2]))) kq['abcd'.indexOf(y[1].toLowerCase())] = /^(Đúng|Đ)$/i.test(y[2]);
        if (kq.every(function (v) { return v !== null; })) o[m[1]] = kq;
      }
    }
    return { tn: tn, ds: ds, co: Object.keys(tn).length + Object.keys(ds).length };
  }

  function hoanThien(kq, tenGoiY) {
    var cau = kq.cau, canhBao = kq.canhBao.slice(), loi = [], bang = docBangDapAn(kq.dsBang || []), tn = 0, ds = 0, i;
    var dsq = [];
    cau.forEach(function (c) {
      var q = { dang: c.dang, q: c.q, o: c.o.slice(0, 4), a: null, nguon: 'thieu', ghi: [] };
      if (c.o.length !== 4) { q.ghi.push('Có ' + c.o.length + ' phương án (cần đúng 4).'); while (q.o.length < 4) q.o.push(''); }
      if (!c.q) q.ghi.push('Chưa có nội dung câu hỏi.');
      var stt = c.dang === 'dung_sai' ? ++ds : ++tn, key = String(stt);
      if (c.dang === 'tn4') {
        var m = []; c.dauO.forEach(function (x, k) { if (x) m.push(k); });
        var mn = []; (c.dauN || []).forEach(function (x, k) { if (x) mn.push(k); });
        if (m.length === 1) { q.a = m[0]; q.nguon = 'mau'; }
        else if (!m.length && mn.length === 1) { q.a = mn[0]; q.nguon = 'mau'; }   // chỉ chữ cái nhãn của một phương án bị gạch chân/tô đỏ
        else {
          var d = []; c.dam.forEach(function (x, k) { if (x) d.push(k); });
          if (!m.length && d.length === 1) { q.a = d[0]; q.nguon = 'dam'; }
          else if (m.length > 1) q.ghi.push('Có ' + m.length + ' phương án bị tô/gạch: chọn lại đáp án.');
        }
        if (q.a === null && bang.tn[key]) { q.a = 'ABCD'.indexOf(bang.tn[key]); q.nguon = 'bang'; }
      } else {
        var g = c.dsGhi || {}, dem = Object.keys(g).length;
        if (dem === 4) { q.a = [0, 1, 2, 3].map(function (k) { return !!g[k]; }); q.nguon = 'ghi chu'; }
        else {
          var tomau = c.dauO.filter(Boolean).length;
          if (tomau > 0 && tomau < 4) { q.a = [0, 1, 2, 3].map(function (k) { return !!c.dauO[k]; }); q.nguon = 'mau'; q.ghi.push('Đáp án đúng/sai suy ra từ ý bị tô/gạch (ý tô = Đúng): kiểm lại.'); }
          else if (bang.ds[key]) { q.a = bang.ds[key]; q.nguon = 'bang'; }
        }
      }
      if (q.a === null) q.ghi.push('Chưa nhận được đáp án: chọn ở bước xem trước.');
      dsq.push(q);
    });
    if (!dsq.length) loi.push('Không thấy câu hỏi nào. Đề cần có dòng «Câu 1.», «Câu 2.» … và phương án «A. B. C. D.».');
    if (tn && tn !== 24 && ds) canhBao.push('Số câu khác cấu trúc 24 trắc nghiệm + 4 đúng/sai; app vẫn lưu được, thang điểm theo QĐ 764.');
    return { cau: dsq, canhBao: canhBao, loi: loi, demTN: tn, demDS: ds, ten: tenGoiY || '', khoi: null };
  }

  function doanKhoi(tx) { var m = /(?:lớp|khối|LỚP|KHỐI)\s*(1[0-2])\b/.exec(tx); return m ? +m[1] : null; }

  N.tuDong = function (dong, tenGoiY) {
    var r = hoanThien(phanTichDong(dong), tenGoiY);
    var dau = dong.slice(0, 8).map(function (p) { return gon(p.t); }).join(' ');
    r.khoi = doanKhoi(dau) || doanKhoi(tenGoiY || '');
    if (!r.ten || r.ten === tenGoiY) {   // tên đề: dòng tiêu đề đầu tiên có «Đề … số»; không có thì lấy tên tệp
      for (var i = 0; i < Math.min(dong.length, 10); i++) {
        var d1 = gon(dong[i].t);
        if (RX_CAU.test(d1) || RX_PHAN.test(d1)) break;
        if (/(?:ĐỀ|Đề)\s*(?:số|SỐ)?\s*\d+/.test(d1) && d1.length <= 100) { r.ten = d1; break; }
      }
    }
    return r;
  };

  N.tuVanBan = function (chuoi, tenGoiY) {
    var dong = String(chuoi || '').replace(/\r/g, '').split('\n').map(function (t) { return { t: t, seg: [{ t: t, dam: false, do_: false, gach: false, nen: false }], num: null }; }).filter(function (p) { return gon(p.t); });
    return N.tuDong(dong, tenGoiY);
  };

  /* ================= Bảng (Excel/CSV theo mẫu) ================= */
  function tuBang(hang) {
    var h = -1, cot = {}, i, j;
    for (i = 0; i < Math.min(hang.length, 15) && h < 0; i++) {
      var c = {};
      hang[i].forEach(function (v, k) { var x = boDau(v); if (x === 'loai' || x === 'dang') c.loai = k; else if (/^(cau hoi|noi dung|cau)$/.test(x)) c.q = k; else if (/^(a|b|c|d)$/.test(x)) c[x] = k; else if (/^dap an/.test(x)) c.dap = k; });
      if (c.q != null && c.a != null && c.b != null && c.c != null && c.d != null && c.dap != null) { h = i; cot = c; }
    }
    if (h < 0) return null;
    var cau = [];
    for (i = h + 1; i < hang.length; i++) {
      var r = hang[i], q = gon(r[cot.q]);
      if (!q) continue;
      var lo = boDau(cot.loai != null ? r[cot.loai] : ''), o = [r[cot.a], r[cot.b], r[cot.c], r[cot.d]].map(gon), da = gon(r[cot.dap]);
      var ds = /^(ds|dung sai|dung\/sai|d\/s|dung-sai)$/.test(lo) || (lo === '' && /^[DSdsĐđ1-4 ,;.\-]{4,}$/.test(da) && !/^[ABCD]$/i.test(da));
      var q1 = { dang: ds ? 'dung_sai' : 'tn4', q: q, o: o, a: null, nguon: 'bang tinh', ghi: [] };
      if (ds) {
        var v = da.replace(/[\s,;.\-]/g, '').toUpperCase().replace(/ĐÚNG/g, 'Đ').replace(/SAI/g, 'S').replace(/TRUE/g, 'Đ').replace(/FALSE/g, 'S').replace(/1/g, 'Đ').replace(/0/g, 'S').replace(/D/g, 'Đ');
        if (/^[ĐS]{4}$/.test(v)) q1.a = v.split('').map(function (x) { return x === 'Đ'; });
      } else { var k = 'ABCD'.indexOf(da.toUpperCase().charAt(0)); if (da.length <= 2 && k >= 0) q1.a = k; }
      if (q1.a === null) q1.ghi.push('Chưa nhận được đáp án: chọn ở bước xem trước.');
      if (o.some(function (x) { return !x; })) q1.ghi.push('Có phương án trống.');
      cau.push(q1);
    }
    return cau;
  }
  N._tuBang = tuBang;

  /* ================= Đọc tệp ================= */
  N.docTep = function (ab, tenTep) {
    var B = SC.bangtinh;
    if (!B) return Promise.reject(new Error('Chưa nạp bộ đọc bảng tính.'));
    var tenGoiY = String(tenTep || '').replace(/\.[^.]*$/, '');
    var b = ab instanceof Uint8Array ? ab : new Uint8Array(ab);
    function tuSheets(sheets) {
      for (var i = 0; i < sheets.length; i++) { var c = tuBang(sheets[i].hang); if (c) return xong(c); }
      return null;
    }
    function xong(cau) {
      var tn = cau.filter(function (q) { return q.dang === 'tn4'; }).length;
      return { cau: cau, canhBao: [], loi: cau.length ? [] : ['Bảng không có câu nào.'], demTN: tn, demDS: cau.length - tn, ten: tenGoiY, khoi: doanKhoi(tenGoiY) };
    }
    if (B.laZip(b)) {
      return B.docTepZip(b, 'word/document.xml').then(function (xml) {
        if (xml) return N.tuDong(docDoanDocx(xml), tenGoiY);
        return B.docTep(b, tenTep).then(function (sheets) { var r = tuSheets(sheets); if (r) return r; throw new Error('Tệp Excel này không đúng mẫu (cần các cột: Loại, Câu hỏi, A, B, C, D, Đáp án). Bấm «Tải file mẫu» để xem mẫu.'); });
      });
    }
    if (b.length > 4 && b[0] === 0xD0 && b[1] === 0xCF && b[2] === 0x11 && b[3] === 0xE0) {
      return B.docTep(b, tenTep).then(function (sheets) { var r = tuSheets(sheets); if (r) return r; throw new Error('Tệp .doc/.xls cũ không đọc được dạng đề. Mở bằng Word rồi lưu thành .docx, hoặc dùng mẫu Excel.'); });
    }
    return B.docTep(b, tenTep).then(function (sheets) {
      var r = tuSheets(sheets);
      if (r) return r;
      var txt; try { txt = new TextDecoder('utf-8').decode(b); } catch (e) { txt = ''; }
      return N.tuVanBan(txt, tenGoiY);
    });
  };

  /* ================= Đề hoàn chỉnh, mẫu CSV, sao lưu ================= */
  N.dungDe = function (cau, meta) {
    meta = meta || {};
    var id = 'cuatoi-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 1296).toString(36), tn = 0, ds = 0;
    var ds1 = cau.map(function (q) {
      var stt = q.dang === 'dung_sai' ? ++ds : ++tn;
      return { id: id + '-' + (q.dang === 'dung_sai' ? 'ds' : 'tn') + stt, dang: q.dang, q: q.q, o: q.o.slice(0, 4), a: q.dang === 'dung_sai' ? q.a.slice(0, 4) : q.a, muc_do: 2, bai: '' };
    });
    // đề đúng thứ tự: phần I (tn4) rồi phần II (dung_sai), giữ thứ tự trong từng phần
    ds1 = ds1.filter(function (q) { return q.dang === 'tn4'; }).concat(ds1.filter(function (q) { return q.dang === 'dung_sai'; }));
    return { id: id, loai: 'cua-toi', khoi: meta.khoi || null, ten: String(meta.ten || 'Đề của tôi').slice(0, 120), pham_vi: 'Đề do giáo viên thêm', thoi_gian: +meta.thoi_gian || 50, status: 'giao_vien_them', tao_luc: new Date().toISOString(), cau: ds1 };
  };
  N.kiemDe = function (cau) {   // lỗi chặn lưu: trả mảng chuỗi (rỗng = lưu được)
    var loi = [];
    cau.forEach(function (q, i) {
      var t = 'Câu ' + (i + 1) + ': ';
      if (!gon(q.q)) loi.push(t + 'chưa có nội dung.');
      if (q.o.length !== 4 || q.o.some(function (x) { return !gon(x); })) loi.push(t + 'cần đủ 4 phương án có chữ.');
      if (q.dang === 'tn4' ? !(typeof q.a === 'number' && q.a >= 0 && q.a <= 3) : !(Array.isArray(q.a) && q.a.length === 4 && q.a.every(function (v) { return typeof v === 'boolean'; }))) loi.push(t + 'chưa chọn đáp án.');
    });
    return loi;
  };
  N.mauCSV = function () {
    return '﻿Loại;Câu hỏi;A;B;C;D;Đáp án\r\n' +
      'TN;Thị trường là gì?;Nơi diễn ra hoạt động mua bán;Một loại thuế;Một loại tiền tệ;Một ngân hàng;A\r\n' +
      'TN;Chức năng nào sau đây là của tiền tệ?;Thước đo giá trị;Làm tăng giá hàng hoá;Giảm số lượng hàng hoá;Cấm trao đổi;A\r\n' +
      'DS;Cho thông tin: Doanh nghiệp X sản xuất bàn ghế. Nhận định nào đúng?;X tạo ra giá trị sử dụng;X không cần quan tâm chi phí;X chịu cạnh tranh trên thị trường;X được bán bất kỳ giá nào;ĐSĐS\r\n';
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = N;
})(typeof window !== 'undefined' ? window : globalThis);
