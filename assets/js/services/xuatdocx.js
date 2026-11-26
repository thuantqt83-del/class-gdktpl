/* Xuất đề thi ra tệp Word (.docx) NGAY TRÊN TRÌNH DUYỆT: không thư viện ngoài, không gửi gì đi đâu. Dùng cho nút «Tải Word» ở trang giáo viên (tab «Xuất đề in» và «Đề của tôi») và cho kiểm thử bằng Node.
   Hai bản: học sinh (không đáp án, có dòng Họ tên / Lớp / SBD) và giáo viên (đáp án đúng TÔ ĐỎ ĐẬM như bản «đề có đáp án» của cô, chữ cái A–D và số câu in đậm, có bảng đáp án).
   API:  SC.xuatdocx.dungDocx(d, coDapAn, tuyChon) -> Uint8Array (tệp .docx)      d = đề {ten, thoi_gian, cau:[{dang:'tn4'|'dung_sai', q, o:[…], a}]}
         tuyChon = {ten:'tên hiển thị', cham:{tong, tn, ds:[0,1ý,2ý,3ý,4ý]}, ghiChuCuoi:'…'}
         SC.xuatdocx.taiXuong(u8, tenTep)    -> bấm tải về (chỉ trong trình duyệt)      SC.xuatdocx.tenTep(chuoi) -> tên tệp an toàn */
(function (goc) {
  'use strict';
  var SC = goc.SC = goc.SC || { pages: {}, data: {} };
  var X = SC.xuatdocx = {};

  /* ---------- zip tối thiểu (lưu nguyên, không nén; có CRC32 nên Word và mọi trình đọc đều mở được) ---------- */
  var BANG = null;
  function crc32(b) {
    if (!BANG) { BANG = []; for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); BANG.push(c >>> 0); } }
    var x = 0xFFFFFFFF;
    for (var i = 0; i < b.length; i++) x = BANG[(x ^ b[i]) & 0xFF] ^ (x >>> 8);
    return (x ^ 0xFFFFFFFF) >>> 0;
  }
  function utf8(s) {
    if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(s);
    return new Uint8Array(Buffer.from(s, 'utf8'));
  }
  function w16(a, v) { a.push(v & 255, (v >>> 8) & 255); }
  function w32(a, v) { a.push(v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255); }
  function zipLuu(tep) {
    var out = [], tt = [], off = 0, i, j;
    var gio = (12 << 11) | (0 << 5), ngay = ((2026 - 1980) << 9) | (11 << 5) | 26;
    tep.forEach(function (f) {
      var ten = utf8(f.ten), nd = utf8(f.nd), crc = crc32(nd), h = [];
      w32(h, 0x04034B50); w16(h, 20); w16(h, 0x0800); w16(h, 0); w16(h, gio); w16(h, ngay); w32(h, crc); w32(h, nd.length); w32(h, nd.length); w16(h, ten.length); w16(h, 0);
      out.push(Uint8Array.from(h), ten, nd);
      tt.push({ ten: ten, crc: crc, n: nd.length, off: off });
      off += h.length + ten.length + nd.length;
    });
    var cd = [];
    tt.forEach(function (e) {
      var h = [];
      w32(h, 0x02014B50); w16(h, 20); w16(h, 20); w16(h, 0x0800); w16(h, 0); w16(h, gio); w16(h, ngay); w32(h, e.crc); w32(h, e.n); w32(h, e.n); w16(h, e.ten.length); w16(h, 0); w16(h, 0); w16(h, 0); w16(h, 0); w32(h, 0); w32(h, e.off);
      cd.push(Uint8Array.from(h), e.ten);
    });
    var cdLen = 0; cd.forEach(function (x) { cdLen += x.length; });
    var eo = []; w32(eo, 0x06054B50); w16(eo, 0); w16(eo, 0); w16(eo, tt.length); w16(eo, tt.length); w32(eo, cdLen); w32(eo, off); w16(eo, 0);
    var all = out.concat(cd, [Uint8Array.from(eo)]), tong = 0;
    all.forEach(function (x) { tong += x.length; });
    var kq = new Uint8Array(tong), p = 0;
    for (i = 0; i < all.length; i++) { kq.set(all[i], p); p += all[i].length; }
    return kq;
  }
  X._zip = zipLuu; X._crc32 = crc32;

  /* ---------- XML của Word ---------- */
  function E(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ''); }
  function run(t, o) {
    o = o || {};
    var pr = (o.b ? '<w:b/>' : '') + (o.i ? '<w:i/>' : '') + (o.mau ? '<w:color w:val="' + o.mau + '"/>' : '') + (o.co ? '<w:sz w:val="' + o.co + '"/><w:szCs w:val="' + o.co + '"/>' : '');
    return '<w:r>' + (pr ? '<w:rPr>' + pr + '</w:rPr>' : '') + '<w:t xml:space="preserve">' + E(t) + '</w:t></w:r>';
  }
  function para(runs, o) {
    o = o || {};
    var pr = (o.giu ? '<w:keepNext/>' : '') + (o.ngat ? '<w:pageBreakBefore/>' : '') +
      '<w:spacing w:before="' + (o.truoc == null ? 0 : o.truoc) + '" w:after="' + (o.sau == null ? 60 : o.sau) + '"/>' + (o.thut ? '<w:ind w:left="' + o.thut + '"/>' : '') + (o.can ? '<w:jc w:val="' + o.can + '"/>' : '');
    return '<w:p><w:pPr>' + pr + '</w:pPr>' + (Array.isArray(runs) ? runs.join('') : runs) + '</w:p>';
  }
  var DO = 'C00000';
  var CHU = 'ABCD', chu = 'abcd';
  function so(x) { return String(Math.round(x * 100) / 100).replace('.', ','); }

  X.dungDocx = function (d, coDapAn, tuyChon) {
    tuyChon = tuyChon || {};
    var ten = tuyChon.ten || d.ten || 'Đề thi', c = tuyChon.cham || d.cham || { tong: 10, tn: 0.25, ds: [0, 0.1, 0.25, 0.5, 1.0] };
    var tn = d.cau.filter(function (q) { return q.dang === 'tn4'; }), ds = d.cau.filter(function (q) { return q.dang === 'dung_sai'; });
    var b = [];
    b.push(para([run(ten + (coDapAn ? ' — BẢN GIÁO VIÊN (CÓ ĐÁP ÁN)' : ''), { b: 1, co: 30 })], { can: 'center', sau: 80 }));
    b.push(para([run('Môn: Giáo dục kinh tế và pháp luật · Thời gian làm bài: ' + d.thoi_gian + ' phút (không kể thời gian phát đề) · Thang điểm ' + c.tong)], { can: 'center', sau: 120 }));
    if (!coDapAn) b.push(para([run('Họ và tên: ................................................ Lớp: ............ Số báo danh: ............')], { sau: 160 }));
    b.push(para([run('PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (' + tn.length + ' câu; mỗi câu đúng ' + so(c.tn) + ' điểm)', { b: 1 })], { giu: 1, truoc: 120, sau: 80 }));
    tn.forEach(function (q, i) {
      b.push(para([run('Câu ' + (i + 1) + '. ', { b: 1 }), run(String(q.q).trim())], { giu: 1, truoc: 80, sau: 30 }));
      q.o.forEach(function (o, k) {
        var dung = coDapAn && k === q.a;
        b.push(para([run(CHU[k] + '. ', { b: 1, mau: dung ? DO : null }), run(o, dung ? { b: 1, mau: DO } : null)], { thut: 340, sau: 20 }));
      });
    });
    if (ds.length) {
      b.push(para([run('PHẦN II. Câu trắc nghiệm đúng/sai (' + ds.length + ' câu; mỗi câu bốn ý a, b, c, d; điểm theo số ý đúng: 1 ý ' + so(c.ds[1]) + ' · 2 ý ' + so(c.ds[2]) + ' · 3 ý ' + so(c.ds[3]) + ' · 4 ý ' + so(c.ds[4]) + ')', { b: 1 })], { giu: 1, truoc: 200, sau: 80 }));
      ds.forEach(function (q, i) {
        b.push(para([run('Câu ' + (i + 1) + '. ', { b: 1 }), run(String(q.q).trim())], { giu: 1, truoc: 80, sau: 30 }));
        q.o.forEach(function (o, k) {
          var r = [run(chu[k] + ') ', { b: 1 }), run(o)];
          if (coDapAn) r.push(run(' (' + (q.a[k] ? 'Đúng' : 'Sai') + ')', { b: 1, mau: DO }));
          b.push(para(r, { thut: 340, sau: 20 }));
        });
      });
    }
    if (coDapAn) {
      b.push(para([run('BẢNG ĐÁP ÁN', { b: 1 })], { ngat: 1, can: 'center', sau: 100 }));
      b.push(para([run('Phần I: ', { b: 1 }), run(tn.map(function (q, i) { return (i + 1) + '-' + CHU[q.a]; }).join(' · '), { b: 1, mau: DO })]));
      if (ds.length) b.push(para([run('Phần II: ', { b: 1 }), run(ds.map(function (q, i) { return 'Câu ' + (i + 1) + ': ' + q.a.map(function (v, k) { return chu[k] + ' ' + (v ? 'Đ' : 'S'); }).join(', '); }).join(' · '), { b: 1, mau: DO })]));
    }
    b.push(para([run('— HẾT —', { b: 1 })], { can: 'center', truoc: 200, sau: 60 }));
    b.push(para([run(tuyChon.ghiChuCuoi || 'Đề luyện, không phải đề chính thức.', { i: 1, co: 20 })], { truoc: 60 }));

    var NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
    var doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ' + NS + '><w:body>' + b.join('') +
      '<w:sectPr><w:footerReference w:type="default" r:id="rId2"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1418" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>';
    var styles = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ' + NS + '><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="Times New Roman" w:cs="Times New Roman"/><w:sz w:val="24"/><w:szCs w:val="24"/><w:lang w:val="vi-VN"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="60" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style></w:styles>';
    var footer = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr ' + NS + '><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:t xml:space="preserve">Trang </w:t></w:r><w:fldSimple w:instr=" PAGE "><w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:t>1</w:t></w:r></w:fldSimple></w:p></w:ftr>';
    var ct = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/></Types>';
    var rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
    var drels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>';
    return zipLuu([{ ten: '[Content_Types].xml', nd: ct }, { ten: '_rels/.rels', nd: rels }, { ten: 'word/document.xml', nd: doc }, { ten: 'word/_rels/document.xml.rels', nd: drels }, { ten: 'word/styles.xml', nd: styles }, { ten: 'word/footer1.xml', nd: footer }]);
  };

  X.tenTep = function (s) {
    return String(s || 'de').replace(/[\\\/:*?"<>|\u0000-\u001F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 110) || 'de';
  };
  X.taiXuong = function (u8, tenTep) {
    var blob = new Blob([u8], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = tenTep; a.style.display = 'none'; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = X;
})(typeof window !== 'undefined' ? window : globalThis);
