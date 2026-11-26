/* Lớp lưu trữ. Pha A: localStorage trên máy này. Phần 5 sẽ thay phần ruột bằng Supabase, giữ nguyên tên hàm. */
SC.storage = {
  get: function (k, fallback) {
    try { var v = localStorage.getItem('scgdktpl:' + k); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  },
  set: function (k, v) {
    try { localStorage.setItem('scgdktpl:' + k, JSON.stringify(v)); return true; }
    catch (e) { return false; }
  },
  remove: function (k) { try { localStorage.removeItem('scgdktpl:' + k); } catch (e) {} }
};
