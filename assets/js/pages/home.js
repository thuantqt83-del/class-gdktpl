/* Trang chủ «Class GDKT&PL» (giao diện v2, 23/11/2026): hero có hình minh hoạ, dải số liệu, các phân hệ học và luyện, trò chơi Quiz, giáo viên và tiến bộ.
   Số liệu «bài học, đề, câu hỏi» đếm từ dữ liệu thật của app (không gõ tay); nội dung các thẻ lấy từ data/phanhe.js. */
SC.pages.home = {
  title: 'Trang chủ',
  render: function (el, role) {
    var s = SC.progress.summary(), E = SC.esc, I = SC.icon, gv = role === 'gv';
    var nBai = 0; SC.data.curriculum.muc.forEach(function (m) { nBai += m.bai.length; });
    var D = SC.data.de || {}, len = function (k) { return (D[k] || []).length; };
    var nDe = len('l10n') + len('l11n') + len('l12n') + len('tn'), nHsg = len('hsg25'), nCau = (SC.data.questions || []).length;
    var TG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 5.2v13.6a.6.6 0 0 0 .9.5l11-6.8a.6.6 0 0 0 0-1l-11-6.8a.6.6 0 0 0-.9.5z"/></svg>';
    var ART = '<svg viewBox="0 0 420 320" role="presentation" focusable="false" aria-hidden="true">' +
      '<defs><linearGradient id="ha-g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd166"/><stop offset="1" stop-color="#ff9f43"/></linearGradient>' +
      '<linearGradient id="ha-g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5eead4"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs>' +
      '<rect x="30" y="26" width="236" height="170" rx="26" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.38)"/>' +
      '<g transform="translate(66 46) scale(4.4)" fill="none" stroke="#fff" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">' + SC.ICON.scale + '</g>' +
      '<rect x="150" y="116" width="240" height="172" rx="26" fill="rgba(255,255,255,.22)" stroke="rgba(255,255,255,.45)"/>' +
      '<rect x="176" y="222" width="30" height="46" rx="8" fill="url(#ha-g2)"/><rect x="218" y="196" width="30" height="72" rx="8" fill="url(#ha-g2)"/>' +
      '<rect x="260" y="170" width="30" height="98" rx="8" fill="url(#ha-g1)"/><rect x="302" y="140" width="30" height="128" rx="8" fill="url(#ha-g1)"/>' +
      '<path d="M172 226 214 202 254 214 340 144" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/>' +
      '<circle cx="352" cy="64" r="32" fill="url(#ha-g1)"/><circle cx="352" cy="64" r="23" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="3"/>' +
      '<path d="M352 50v28M343 58h13a5 5 0 0 1 0 10h-13" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M96 232l3.6 9.4 9.4 3.6-9.4 3.6-3.6 9.4-3.6-9.4-9.4-3.6 9.4-3.6z" fill="#fff" opacity=".9"/><path d="M318 22l2.6 6.4 6.4 2.6-6.4 2.6-2.6 6.4-2.6-6.4-6.4-2.6 6.4-2.6z" fill="#ffd166"/></svg>';
    var card = function (p, ex) {
      return '<a class="fcard" href="#/' + p.id + '" style="--band:' + E(p.band || '#2355d6') + '" aria-label="Mở ' + E(p.ten) + '">' +
        '<span class="fc-ic">' + I(p.icon || 'book') + '</span><div class="fc-b"><h4>' + E(p.ten) + (ex ? ' <span class="fc-tag">' + E(ex) + '</span>' : '') + '</h4>' +
        '<p>' + E(p.mota) + '</p><ul class="ck">' + (p.y || []).slice(0, 3).map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul></div>' +
        '<span class="fc-go" aria-hidden="true">' + TG + '</span></a>';
    };
    var game = function (p, cls, g1, g2, nhan, nut) {   // thẻ một PHÒNG của trò chơi Quiz tính điểm
      return '<a class="gcard ' + cls + '" href="#/' + p.id + '" style="--g1:' + g1 + ';--g2:' + g2 + '" aria-label="Chơi ' + E(p.ten) + '">' +
        '<span class="gc-k">' + E(nhan) + '</span><h4>' + E(p.ten) + '</h4><p>' + E(p.mota) + '</p>' +
        '<ul class="gc-y">' + (p.y || []).slice(0, 3).map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul>' +
        '<span class="gc-go">' + E(nut) + '</span></a>';
    };
    var P = function (id) { return SC.phanhe(id); };
    var h = '<section class="hero"><div class="hero-txt"><span class="hero-k">' + (gv ? 'Dành cho giáo viên' : 'Giáo dục Kinh tế và Pháp luật · Lớp 10 – 11 – 12') + '</span>' +
      '<h2>' + (gv ? 'Quản lý lớp, giao bài, theo dõi tiến bộ' : 'Học chắc kiến thức, luyện đề tự tin') + '</h2>' +
      '<p>' + (gv ? 'Tạo lớp, giao bài, xem thống kê và xuất đề in cho học sinh; mọi nội dung học tập và trò chơi Quiz tính điểm đều dùng được ngay.'
                  : 'Học bài có sơ đồ, luyện đề thi thử bấm giờ, rồi thi đua Quiz tính điểm: câu ngắn, bấm là chơi, hệ thống tự chấm điểm và tự lưu kết quả trên máy của em.') + '</p>' +
      '<div class="row">' + (gv ? '<a class="btn" href="#/giaovien">Quản lý lớp ' + I('arrow') + '</a><a class="btn alt" href="#/de">Xem đề thi thử</a>'
                                : '<a class="btn" href="#/luyen">Luyện tập ngay ' + I('arrow') + '</a><a class="btn alt" href="#/de">Làm đề thi thử</a>') + '</div>' +
      '<div class="pillars"><span>Tri thức kinh tế</span><span>Hiểu biết pháp luật</span><span>Chinh phục kỳ thi</span></div></div>' +
      '<div class="hero-art">' + ART + '</div></section>';
    h += '<section class="stats" aria-label="Quy mô nội dung">' + [
      [I('book'), nBai, 'bài học có sơ đồ và câu tự kiểm tra'], [I('exam'), nDe, 'đề luyện thi giữa kì, cuối kì, tốt nghiệp'],
      [I('trophy'), nHsg, 'đề ôn luyện học sinh giỏi lớp 12'], [I('list'), nCau, 'câu hỏi trong kho']
    ].map(function (x) { return '<div class="stat2"><span class="st-ic">' + x[0] + '</span><b>' + x[1] + '</b><span>' + E(x[2]) + '</span></div>'; }).join('') + '</section>';
    h += '<div class="sec-t"><h3>Học và luyện tập</h3></div><div class="grid wide">' + card(P('kho')) + card(P('luyenthi')) + card(P('hsg')) + card(P('ai'), 'Soạn sẵn') + '</div>';
    h += '<div class="sec-t"><h3>Trò chơi Quiz tính điểm</h3><span class="mute">Câu ngắn gọn · đúng được 100 điểm, nhanh thêm tối đa 50 · tự chấm điểm, tự lưu</span></div>' +
      '<div class="games">' + game(P('kinhdoanh'), 'gc-kd', '#f59e0b', '#dc2626', 'Quiz · Kinh tế', 'Vào phòng chơi') + game(P('phapluat'), 'gc-pl', '#c2358f', '#4f46e5', 'Quiz · Pháp luật', 'Vào phòng chơi') + '</div>';
    h += '<div class="sec-t"><h3>Tiến bộ của em</h3></div><div class="grid">' +
      '<div class="card kpi"><span class="kico">' + I('exam') + '</span><div><b>' + s.luot + '</b><span>lượt làm bài</span></div></div>' +
      '<div class="card kpi"><span class="kico">' + I('list') + '</span><div><b>' + s.soCau + '</b><span>câu đã làm</span></div></div>' +
      '<div class="card kpi"><span class="kico">' + I('target') + '</span><div><b>' + (s.soCau ? s.chinhXac + '%' : '—') + '</b><span>mức chính xác</span></div></div></div>' +
      '<div class="grid wide">' + card(P('giaovien')) + card(P('hoso')) + '</div>';
    el.innerHTML = h;
  }
};
