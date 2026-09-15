const API = "https://jsonplaceholder.typicode.com/posts";
const LIMIT = 8;

const grid = document.getElementById("grid");
const countText = document.getElementById("countText");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const form = document.getElementById("postForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formMsg = document.getElementById("formMsg");
const refreshBtn = document.getElementById("refreshBtn");

let posts = [];
let editingId = null;

const PEN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg>';
const TRASH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>';

function setStatus(state, text){
  statusDot.className = "status-dot " + state;
  statusText.textContent = text;
}

function setFormMsg(text, type){
  formMsg.textContent = text || "";
  formMsg.className = "form-msg " + (type || "");
}

function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function render(){
  if(posts.length === 0){
    grid.innerHTML = '<div class="empty">Belum ada catatan. Tambahkan lewat form di kiri.</div>';
    return;
  }

  grid.innerHTML = posts.map(p => `
    <article class="note-row">
      <div class="note-content">
        <span class="id-tag">#${p.id}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.body)}</p>
      </div>
      <div class="note-actions">
        <button class="icon-btn edit" data-action="edit" data-id="${p.id}" aria-label="Edit" title="Edit">${PEN_ICON}</button>
        <button class="icon-btn delete" data-action="delete" data-id="${p.id}" aria-label="Hapus" title="Hapus">${TRASH_ICON}</button>
      </div>
    </article>
  `).join("");
}

async function loadPosts(){
  setStatus("", "menghubungkan ke API…");
  grid.innerHTML = '<div class="note-skeleton"></div><div class="note-skeleton"></div><div class="note-skeleton"></div><div class="note-skeleton"></div>';

  try{
    const res = await fetch(`${API}?_limit=${LIMIT}`);
    if(!res.ok) throw new Error("Status " + res.status);
    posts = await res.json();
    setStatus("ok", "terhubung — " + posts.length + " record ditampilkan dan dimuat");
    render();
  }catch(err){
    setStatus("err", "gagal memuat data (" + err.message + ")");
    grid.innerHTML = '<div class="empty">Gagal memuat data dari server. Coba klik "Muat ulang".</div>';
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  if(!title || !body) return;

  submitBtn.disabled = true;
  setFormMsg("mengirim…", "");

  try{
    if(editingId === null){
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, userId: 1 })
      });
      if(!res.ok) throw new Error("Status " + res.status);
      const created = await res.json();
      created.id = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
      posts = [created, ...posts];
      setFormMsg("Catatan berhasil ditambahkan (POST 201).", "ok");
    } else {
      const res = await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, title, body, userId: 1 })
      });
      if(!res.ok) throw new Error("Status " + res.status);
      posts = posts.map(p => p.id === editingId ? { ...p, title, body } : p);
      setFormMsg("Catatan #" + editingId + " berhasil diperbarui (PUT 200).", "ok");
      exitEditMode();
    }
    render();
    form.reset();
  }catch(err){
    setFormMsg("Gagal mengirim: " + err.message, "err");
  }finally{
    submitBtn.disabled = false;
  }
});

grid.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if(!btn) return;
  const id = Number(btn.dataset.id);
  const action = btn.dataset.action;

  if(action === "edit"){
    const target = posts.find(p => p.id === id);
    if(!target) return;
    enterEditMode(target);
    return;
  }

  if(action === "delete"){
    const original = posts;
    posts = posts.filter(p => p.id !== id);
    render();
    try{
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if(!res.ok) throw new Error("Status " + res.status);
    }catch(err){
      posts = original;
      render();
      setStatus("err", "gagal menghapus record #" + id);
    }
  }
});

function enterEditMode(post){
  editingId = post.id;
  titleInput.value = post.title;
  bodyInput.value = post.body;
  submitBtn.textContent = "Simpan Perubahan (PUT)";
  cancelBtn.style.display = "inline-block";
  setFormMsg("", "");
  titleInput.focus();
}

function exitEditMode(){
  editingId = null;
  submitBtn.textContent = "Simpan Catatan";
  cancelBtn.style.display = "none";
}

cancelBtn.addEventListener("click", () => {
  form.reset();
  exitEditMode();
  setFormMsg("", "");
});

refreshBtn.addEventListener("click", loadPosts);

loadPosts();