/* Đọc bảng tính (Excel .xls cũ, .xlsx, bảng HTML lưu thành .xls, .csv/.txt) NGAY TRÊN TRÌNH DUYỆT: không dùng thư viện ngoài, không gửi tệp đi đâu.
   Dùng cho nút «Nhập danh sách từ Excel» ở trang giáo viên và cho dòng lệnh _cong-cu/supabase/doc_excel.js (cùng một mã, nên kiểm một lần là đủ).
   API:  SC.bangtinh.docTep(arrayBuffer, tenTep) -> Promise<[{ten, hang:[[ô,…],…]}]>      (mỗi sheet là một bảng các hàng)
         SC.bangtinh.timDanhSach(sheets)         -> [{lop:'10A7', khoi:10, sheet, ten:[họ tên,…], bo_qua:n, dong:n, doi:[tên đã thêm số]}]   (chỉ lấy cột «Họ và tên»; KHÔNG lấy ngày sinh, điểm, mã học sinh; tên trùng trong lớp được thêm « 2», « 3»)
   Xếp hạng chắc chắn: .xls dạng BIFF8 (Excel 97–2003 và các bản sau lưu .xls), .xlsx, HTML, CSV. Excel 5.0/95 và tệp có mật khẩu thì báo lỗi rõ ràng. */
(function (goc) {
  'use strict';
  var SC = goc.SC = goc.SC || { pages: {}, data: {} };
  var B = SC.bangtinh = {};

  function u16(b, o) { return b[o] | (b[o + 1] << 8); }
  function u32(b, o) { return (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0; }
  function f64(b, o) { return new DataView(b.buffer, b.byteOffset + o, 8).getFloat64(0, true); }
  function chuoi16(b, o, n) { var s = ''; for (var i = 0; i < n; i++) s += String.fromCharCode(u16(b, o + 2 * i)); return s; }
  function chuoi8(b, o, n) { var s = ''; for (var i = 0; i < n; i++) s += String.fromCharCode(b[o + i]); return s; }
  function laSo(v) { return typeof v === 'number' || (typeof v === 'string' && /^\s*\d+([.,]\d+)?\s*$/.test(v)); }
  function boDau(s) { return String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/\s+/g, ' ').trim(); }
  function giaMa(s) {
    return String(s).replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, function (m, e) {
      e = e.toLowerCase();
      if (e === 'amp') return '&'; if (e === 'lt') return '<'; if (e === 'gt') return '>'; if (e === 'quot') return '"'; if (e === 'apos') return "'"; if (e === 'nbsp') return ' ';
      var n = e.charAt(1) === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return isFinite(n) ? String.fromCodePoint(n) : m;
    });
  }

  /* ================= .xls: vùng chứa OLE2 (CFB) ================= */
  function docCFB(b) {
    var ky = [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1], i, v;
    for (i = 0; i < 8; i++) if (b[i] !== ky[i]) throw new Error('Không phải tệp Excel .xls.');
    var ss = 1 << u16(b, 30), mss = 1 << u16(b, 32), dir0 = u32(b, 48), cut = u32(b, 56), mf0 = u32(b, 60), dif0 = u32(b, 68), nDif = u32(b, 72);
    function sec(id) { var o = (id + 1) * ss; return b.subarray(o, o + ss); }
    var fatIds = [];
    for (i = 0; i < 109; i++) { v = u32(b, 76 + 4 * i); if (v < 0xFFFFFFFA) fatIds.push(v); }
    var d = dif0, g = 0, s;
    while (d < 0xFFFFFFFA && g++ < nDif + 2) { s = sec(d); for (i = 0; i < ss / 4 - 1; i++) { v = u32(s, 4 * i); if (v < 0xFFFFFFFA) fatIds.push(v); } d = u32(s, ss - 4); }
    var fat = [];
    fatIds.forEach(function (id) { var x = sec(id); for (var k = 0; k + 4 <= x.length; k += 4) fat.push(u32(x, k)); });
    function chuoi(start) { var out = [], id = start, n = 0; while (id < 0xFFFFFFFA && n++ < fat.length + 5) { out.push(id); id = fat[id]; } return out; }
    function docDai(start, size) {
      var ids = chuoi(start), out = new Uint8Array(ids.length * ss);
      ids.forEach(function (id, k) { out.set(sec(id), k * ss); });
      return size != null ? out.subarray(0, Math.min(size, out.length)) : out;
    }
    var dirb = docDai(dir0), ent = [];
    for (i = 0; i + 128 <= dirb.length; i += 128) {
      var nl = u16(dirb, i + 64);
      ent.push({ ten: chuoi16(dirb, i, Math.max(0, nl / 2 - 1)), loai: dirb[i + 66], start: u32(dirb, i + 116), size: u32(dirb, i + 120) });
    }
    var goc0 = ent[0], mini = null, minifat = null;
    function lay(e) {
      if (e.size < cut) {
        if (!mini) { mini = docDai(goc0.start, goc0.size); var mb = docDai(mf0); minifat = []; for (var k = 0; k + 4 <= mb.length; k += 4) minifat.push(u32(mb, k)); }
        var out = new Uint8Array(e.size), id = e.start, n = 0, gg = 0;
        while (id < 0xFFFFFFFA && n < e.size && gg++ < 200000) { var o = id * mss, take = Math.min(mss, e.size - n); out.set(mini.subarray(o, o + take), n); n += take; id = minifat[id]; }
        return out;
      }
      return docDai(e.start, e.size);
    }
    return { ent: ent, lay: lay };
  }

  // Bảng chuỗi dùng chung (SST); chuỗi dài có thể bị cắt sang bản ghi CONTINUE, byte đầu của đoạn nối là cờ 8/16 bit.
  function docSST(chunks) {
    var ci = 0, cur = chunks[0], p = 8, uniq = u32(cur, 4), out = [];
    function nhay() { while (p >= cur.length) { ci++; if (ci >= chunks.length) return false; cur = chunks[ci]; p = 0; } return true; }
    function byte() { nhay(); return cur[p++]; }
    for (var k = 0; k < uniq; k++) {
      if (!nhay()) break;
      var cch = byte() | (byte() << 8), fl = byte(), hi = fl & 1, ext = fl & 4, rich = fl & 8;
      var cRun = rich ? (byte() | (byte() << 8)) : 0;
      var cbExt = ext ? ((byte() | (byte() << 8) | (byte() << 16) | (byte() << 24)) >>> 0) : 0;
      var s = '', con = cch;
      while (con > 0) {
        if (p >= cur.length) { ci++; if (ci >= chunks.length) break; cur = chunks[ci]; p = 0; hi = cur[p++] & 1; }
        var w = hi ? 2 : 1, co = Math.floor((cur.length - p) / w), lay = Math.min(con, co);
        if (lay <= 0) { p = cur.length; continue; }
        s += hi ? chuoi16(cur, p, lay) : chuoi8(cur, p, lay);
        p += lay * w; con -= lay;
      }
      var bo = cRun * 4 + cbExt;
      while (bo > 0) { if (p >= cur.length) { ci++; if (ci >= chunks.length) break; cur = chunks[ci]; p = 0; } var t = Math.min(bo, cur.length - p); p += t; bo -= t; }
      out.push(s);
    }
    return out;
  }

  function rk(v) {
    var n;
    if (v & 2) n = v >> 2;
    else { var dv = new DataView(new ArrayBuffer(8)); dv.setUint32(4, (v & 0xFFFFFFFC) >>> 0, true); n = dv.getFloat64(0, true); }
    return (v & 1) ? n / 100 : n;
  }
  function chuoiXL(w, o) { var cch = u16(w, o), fl = w[o + 2]; return (fl & 1) ? chuoi16(w, o + 3, cch) : chuoi8(w, o + 3, cch); }

  function docSheetXLS(w, start, sst) {
    var pos = start, depth = 0, hang = [], maxc = 0, cho = null;
    function dat(r, c, v) { (hang[r] = hang[r] || [])[c] = v; if (c > maxc) maxc = c; }
    while (pos + 4 <= w.length) {
      var t = u16(w, pos), len = u16(w, pos + 2), o = pos + 4, i;
      pos = o + len;
      if (t === 0x809 || t === 0x009 || t === 0x209 || t === 0x409) { depth++; continue; }
      if (t === 0x0A) { depth--; if (depth <= 0) break; continue; }
      if (depth !== 1) continue;
      if (t === 0xFD) dat(u16(w, o), u16(w, o + 2), sst[u32(w, o + 6)] || '');
      else if (t === 0x204) dat(u16(w, o), u16(w, o + 2), chuoiXL(w, o + 6));
      else if (t === 0x203) dat(u16(w, o), u16(w, o + 2), f64(w, o + 6));
      else if (t === 0x27E) dat(u16(w, o), u16(w, o + 2), rk(u32(w, o + 6)));
      else if (t === 0xBD) { var r0 = u16(w, o), c1 = u16(w, o + 2), n = Math.floor((len - 6) / 6); for (i = 0; i < n; i++) dat(r0, c1 + i, rk(u32(w, o + 6 + 6 * i))); }
      else if (t === 0x06) {
        var r = u16(w, o), c = u16(w, o + 2);
        if (w[o + 12] === 0xFF && w[o + 13] === 0xFF) {
          if (w[o + 6] === 0) cho = { r: r, c: c };
          else if (w[o + 6] === 1) dat(r, c, !!w[o + 8]);
          else dat(r, c, '');
        } else dat(r, c, f64(w, o + 6));
      }
      else if (t === 0x207) { if (cho) { dat(cho.r, cho.c, chuoiXL(w, o)); cho = null; } }
      else if (t === 0x205) { if (!w[o + 7]) dat(u16(w, o), u16(w, o + 2), !!w[o + 6]); }
    }
    var out = [];
    for (var r2 = 0; r2 < hang.length; r2++) { var row = hang[r2] || [], x = []; for (var c2 = 0; c2 <= maxc; c2++) x.push(row[c2] == null ? '' : row[c2]); out.push(x); }
    return out;
  }

  function docXLS(b) {
    var c = docCFB(b), e = null, i;
    for (i = 0; i < c.ent.length; i++) if (c.ent[i].loai === 2 && (c.ent[i].ten === 'Workbook' || c.ent[i].ten === 'Book')) { e = c.ent[i]; break; }
    if (!e) throw new Error('Không thấy bảng tính trong tệp .xls.');
    var w = c.lay(e), pos = 0, depth = 0, sst = [], ds = [];
    while (pos + 4 <= w.length) {
      var t = u16(w, pos), len = u16(w, pos + 2), o = pos + 4;
      pos = o + len;
      if (t === 0x809 || t === 0x009 || t === 0x209 || t === 0x409) {
        depth++;
        if (depth === 1 && t === 0x809 && u16(w, o) < 0x0600) throw new Error('Tệp Excel quá cũ (5.0/95). Mở bằng Excel rồi lưu lại thành .xlsx hoặc .xls rồi thử lại.');
        continue;
      }
      if (t === 0x0A) { depth--; if (depth <= 0) break; continue; }
      if (t === 0x2F) throw new Error('Tệp Excel có đặt mật khẩu. Mở bằng Excel, bỏ mật khẩu, lưu bản khác rồi thử lại.');
      if (t === 0x85) { var cch = w[o + 6], fl = w[o + 7]; ds.push({ vt: u32(w, o), loai: w[o + 5], ten: (fl & 1) ? chuoi16(w, o + 8, cch) : chuoi8(w, o + 8, cch) }); }
      else if (t === 0xFC) {
        var chunks = [w.subarray(o, o + len)];
        while (pos + 4 <= w.length && u16(w, pos) === 0x3C) { var l2 = u16(w, pos + 2); chunks.push(w.subarray(pos + 4, pos + 4 + l2)); pos += 4 + l2; }
        sst = docSST(chunks);
      }
    }
    return ds.filter(function (s) { return s.loai === 0; }).map(function (s) { return { ten: s.ten, hang: docSheetXLS(w, s.vt, sst) }; });
  }

  /* ================= .xlsx: tệp zip chứa XML ================= */
  function giaiNenRaw(u8) {
    if (typeof process !== 'undefined' && process.versions && process.versions.node && typeof require === 'function') {
      try { return Promise.resolve(new Uint8Array(require('zlib').inflateRawSync(Buffer.from(u8)))); } catch (e) { return Promise.reject(e); }
    }
    if (typeof DecompressionStream === 'undefined') return Promise.reject(new Error('Trình duyệt này chưa mở được tệp .xlsx. Dùng Chrome/Edge bản mới, hoặc mở bằng Excel rồi lưu thành .xls hoặc .csv.'));
    var st = new Blob([u8]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Response(st).arrayBuffer().then(function (ab) { return new Uint8Array(ab); });
  }
  function docZip(b) {
    var i = b.length - 22, kq = {};
    while (i >= 0 && u32(b, i) !== 0x06054B50) i--;
    if (i < 0) throw new Error('Tệp .xlsx bị hỏng (không thấy danh mục zip).');
    var n = u16(b, i + 10), p = u32(b, i + 16);
    for (var k = 0; k < n; k++) {
      if (u32(b, p) !== 0x02014B50) break;
      var pt = u16(b, p + 10), cs = u32(b, p + 20), nl = u16(b, p + 28), el = u16(b, p + 30), cl = u16(b, p + 32), lo = u32(b, p + 42);
      kq[chuoi8(b, p + 46, nl)] = { pt: pt, cs: cs, lo: lo };
      p += 46 + nl + el + cl;
    }
    return kq;
  }
  function lay1(b, z, ten) {
    var e = z[ten]; if (!e) return Promise.resolve(null);
    var d = e.lo + 30 + u16(b, e.lo + 26) + u16(b, e.lo + 28), raw = b.subarray(d, d + e.cs);
    var p = e.pt === 0 ? Promise.resolve(raw) : giaiNenRaw(raw);
    return p.then(function (u) { return new TextDecoder('utf-8').decode(u); });
  }
  function thuocTinh(th, ten) { var m = new RegExp('(?:^|\\s)' + ten + '="([^"]*)"').exec(th); return m ? giaMa(m[1]) : ''; }
  function chuT(x) {
    x = x.replace(/<rPh\b[\s\S]*?<\/rPh>/g, '');
    var s = '', re = /<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g, m;
    while ((m = re.exec(x))) s += m[1];
    return giaMa(s);
  }
  function cotTuTen(r) { var m = /^([A-Z]+)/.exec(r), c = 0; if (!m) return 0; for (var i = 0; i < m[1].length; i++) c = c * 26 + m[1].charCodeAt(i) - 64; return c - 1; }
  function hangTuTen(r) { var m = /(\d+)$/.exec(r); return m ? parseInt(m[1], 10) - 1 : 0; }

  function docXLSX(b) {
    var z = docZip(b);
    return Promise.all([lay1(b, z, 'xl/workbook.xml'), lay1(b, z, 'xl/_rels/workbook.xml.rels'), lay1(b, z, 'xl/sharedStrings.xml')]).then(function (kq) {
      if (!kq[0]) throw new Error('Tệp .xlsx không có bảng tính.');
      var sst = [], m, re = /<si\b[^>]*?(?:\/>|>([\s\S]*?)<\/si>)/g;
      if (kq[2]) while ((m = re.exec(kq[2]))) sst.push(m[1] ? chuT(m[1]) : '');
      var dich = {}; re = /<Relationship\b([^>]*)>/g;
      if (kq[1]) while ((m = re.exec(kq[1]))) dich[thuocTinh(m[1], 'Id')] = thuocTinh(m[1], 'Target');
      var ds = []; re = /<sheet\b([^>]*)>/g;
      while ((m = re.exec(kq[0]))) { var t = dich[thuocTinh(m[1], 'r:id')] || ''; ds.push({ ten: thuocTinh(m[1], 'name'), tep: t.charAt(0) === '/' ? t.slice(1) : 'xl/' + t }); }
      return Promise.all(ds.map(function (s) { return lay1(b, z, s.tep); })).then(function (xml) {
        return ds.map(function (s, k) {
          var hang = [], maxc = 0, x = xml[k] || '', rr = /<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g, mm;
          while ((mm = rr.exec(x))) {
            var th = mm[1], nd = mm[2] || '', ref = thuocTinh(th, 'r'), ty = thuocTinh(th, 't'), v = '';
            var mv = /<v>([\s\S]*?)<\/v>/.exec(nd);
            if (ty === 'inlineStr') v = chuT(nd);
            else if (mv) { v = giaMa(mv[1]); if (ty === 's') v = sst[parseInt(v, 10)] || ''; else if (ty === 'b') v = v === '1'; else if (ty !== 'str' && ty !== 'e' && v !== '' && isFinite(+v)) v = +v; }
            if (v === '') continue;
            var r = hangTuTen(ref), c = cotTuTen(ref);
            (hang[r] = hang[r] || [])[c] = v; if (c > maxc) maxc = c;
          }
          var out = [];
          for (var i = 0; i < hang.length; i++) { var row = hang[i] || [], y = []; for (var j = 0; j <= maxc; j++) y.push(row[j] == null ? '' : row[j]); out.push(y); }
          return { ten: s.ten, hang: out };
        });
      });
    });
  }

  /* ================= HTML (nhiều hệ thống xuất «.xls» thực chất là bảng HTML) và CSV ================= */
  function docHTML(txt) {
    var hang = [], rr = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi, m, maxc = 0;
    while ((m = rr.exec(txt))) {
      var row = [], rc = /<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi, c;
      while ((c = rc.exec(m[1]))) row.push(giaMa(c[1].replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim());
      if (row.length > maxc) maxc = row.length;
      hang.push(row);
    }
    hang.forEach(function (r) { while (r.length < maxc) r.push(''); });
    return [{ ten: 'Bảng 1', hang: hang }];
  }
  function docCSV(txt, ten) {
    txt = txt.replace(/^﻿/, '');
    var dong = txt.split(/\r?\n/).slice(0, 5).join('\n'), dem = { ',': 0, ';': 0, '\t': 0 };
    for (var ch in dem) dem[ch] = dong.split(ch).length - 1;
    var ph = dem[';'] > dem[','] && dem[';'] >= dem['\t'] ? ';' : (dem['\t'] > dem[','] ? '\t' : ',');
    var hang = [], row = [], cur = '', q = false, i, maxc = 0;
    function dongXong() { row.push(cur); cur = ''; if (row.length > maxc) maxc = row.length; hang.push(row); row = []; }
    for (i = 0; i < txt.length; i++) {
      var x = txt.charAt(i);
      if (q) { if (x === '"') { if (txt.charAt(i + 1) === '"') { cur += '"'; i++; } else q = false; } else cur += x; }
      else if (x === '"') q = true;
      else if (x === ph) { row.push(cur); cur = ''; }
      else if (x === '\n') dongXong();
      else if (x !== '\r') cur += x;
    }
    if (cur !== '' || row.length) dongXong();
    hang.forEach(function (r) { while (r.length < maxc) r.push(''); });
    return [{ ten: (ten || 'CSV').replace(/\.[^.]*$/, ''), hang: hang.map(function (r) { return r.map(function (v) { return v.trim(); }); }) }];
  }
  function chuyenChu(u8) {
    try { return new TextDecoder('utf-8', { fatal: true }).decode(u8); } catch (e) { return new TextDecoder('windows-1252').decode(u8); }
  }

  // Lấy nội dung chữ của MỘT tệp trong tệp zip (.docx/.xlsx), ví dụ 'word/document.xml'; không có thì trả null. Dùng cho bộ đọc đề Word (nhapde.js).
  B.docTepZip = function (ab, tenTrong) {
    try { var b = ab instanceof Uint8Array ? ab : new Uint8Array(ab); return lay1(b, docZip(b), tenTrong); } catch (e) { return Promise.reject(e); }
  };
  B.laZip = function (ab) { var b = ab instanceof Uint8Array ? ab : new Uint8Array(ab); return b.length > 4 && b[0] === 0x50 && b[1] === 0x4B; };

  B.docTep = function (ab, tenTep) {
    try {
      var b = ab instanceof Uint8Array ? ab : new Uint8Array(ab);
      if (b.length < 8) return Promise.reject(new Error('Tệp trống.'));
      if (b[0] === 0xD0 && b[1] === 0xCF && b[2] === 0x11 && b[3] === 0xE0) return Promise.resolve(docXLS(b));
      if (b[0] === 0x50 && b[1] === 0x4B) return docXLSX(b);
      var txt = chuyenChu(b);
      if (/<table\b/i.test(txt.slice(0, 200000))) return Promise.resolve(docHTML(txt));
      return Promise.resolve(docCSV(txt, tenTep));
    } catch (e) { return Promise.reject(e); }
  };

  /* ================= tìm danh sách «Họ và tên» ================= */
  var RX_HOTEN = /^(ho va ten|ho ten|ho va ten hoc sinh|ho ten hoc sinh|ten hoc sinh|hoc sinh)$/;
  var RX_HODEM = /^(ho|ho dem|ho va ten dem|ho va dem|ho lot|ho va chu lot)$/;
  var RX_STT = /^(stt|so tt|tt|so thu tu)$/;
  var RX_TONG = /^(tong|thong ke|so luong|ghi chu|cong|ti le|si so|sĩ số)\b/;

  function doanLop(sheet) {
    var h = sheet.hang, m, r, c, v;
    for (r = 0; r < Math.min(h.length, 14); r++) for (c = 0; c < h[r].length; c++) {
      v = String(h[r][c] == null ? '' : h[r][c]);
      m = /(?:^|[^a-zA-ZÀ-ỹ])l[oớ]p\s*[:\-]?\s*(\d{1,2}\s*[A-Za-z][A-Za-z0-9]*)/i.exec(v.normalize('NFC'));
      if (m) return m[1].replace(/\s+/g, '').toUpperCase();
    }
    m = /(1[0-2])\s*[_\-. ]?\s*([A-Za-z]{1,3}\s*\d{1,2})/.exec(sheet.ten || '');
    return m ? (m[1] + m[2].replace(/\s+/g, '')).toUpperCase() : '';
  }

  function timMotSheet(sheet) {
    var h = sheet.hang, hdr = -1, cHT = -1, cHD = -1, cT = -1, cSTT = -1, r, c, k, row;
    for (r = 0; r < Math.min(h.length, 40) && hdr < 0; r++) {
      row = h[r]; var a = -1, hd = -1, t = -1, s = -1;
      for (c = 0; c < row.length; c++) {
        k = boDau(row[c]);
        if (!k) continue;
        if (RX_HOTEN.test(k) && a < 0) a = c;
        else if (RX_HODEM.test(k) && hd < 0) hd = c;
        else if (k === 'ten' && t < 0) t = c;
        if (RX_STT.test(k) && s < 0) s = c;
      }
      if (a >= 0 || (hd >= 0 && t >= 0)) { hdr = r; cHT = a; cHD = hd; cT = t; cSTT = s; }
    }
    if (hdr < 0) return null;
    var cot = [];
    if (cHT >= 0) {
      var cuoi = cHT + 1;
      for (c = cHT + 1; c < h[hdr].length && c < cHT + 3; c++) { if (String(h[hdr][c] == null ? '' : h[hdr][c]).trim() === '') cuoi = c + 1; else break; }
      for (c = cHT; c < cuoi; c++) cot.push(c);
    } else cot = [cHD, cT];
    var ten = [], boQua = 0, dong = 0;
    for (r = hdr + 1; r < h.length; r++) {
      row = h[r];
      if (cSTT >= 0 && !laSo(row[cSTT])) continue;
      var phan = [];
      cot.forEach(function (cc) { var v = String(row[cc] == null ? '' : row[cc]).trim(); if (v && /[A-Za-zÀ-ỹ]/.test(v)) phan.push(v); });
      var nm = phan.join(' ').replace(/\s+/g, ' ').trim();
      if (!nm || RX_TONG.test(boDau(nm))) continue;
      dong++;
      if (nm.length > 40) { boQua++; continue; }
      ten.push(nm);
    }
    // Hai học sinh cùng họ tên trong một lớp: máy chủ coi là một người (so khớp không dấu) nên bạn sau được THÊM SỐ (« 2», « 3»…), cô báo cho các bạn biết.
    var dem = {}, ra = [], doi = [];
    ten.forEach(function (t) {
      var k = boDau(t), n = (dem[k] || 0) + 1;
      dem[k] = n;
      if (n === 1) { ra.push(t); return; }
      var t2 = t + ' ' + n;
      while (dem[boDau(t2)]) { n++; t2 = t + ' ' + n; }
      dem[boDau(t2)] = 1; ra.push(t2); doi.push(t2);
    });
    var lop = doanLop(sheet), kh = /^(1[0-2])/.exec(lop);
    return { lop: lop, khoi: kh ? +kh[1] : null, sheet: sheet.ten, ten: ra, bo_qua: boQua, dong: dong, doi: doi };
  }

  B.timDanhSach = function (sheets) {
    var kq = [];
    sheets.forEach(function (s) { var x = timMotSheet(s); if (x && x.ten.length) kq.push(x); });
    return kq;
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = B;
})(typeof window !== 'undefined' ? window : globalThis);
