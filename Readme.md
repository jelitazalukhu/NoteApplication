<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Prototype client web CRUD yang mengonsumsi Public REST API JSONPlaceholder, dibuat untuk tugas Pemrograman Client-Server D3 TI Kelompok 1.">
<title>Tugas Client-Server - Kelompok 1</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header>
  <div class="title">Aplikasi Elektronik <span>D3 TI</span></div>
  <div class="meta">
    D3 TI &middot; Pemrograman Client-Server &middot; Kelompok 1<br>
    <span class="status-dot" id="statusDot"></span><span id="statusText">menghubungkan ke API&hellip;</span><br>
    GET &middot; POST &middot; PUT &middot; DELETE &mdash; jsonplaceholder.typicode.com/posts
  </div>
</header>

<main>
  <section class="panel">
    <h2 id="formTitle">Tambah Record</h2>
    <p class="hint">Kirim data baru ke server, atau pilih "Edit" pada sebuah kartu untuk memperbaruinya.</p>

    <form id="postForm">
      <label for="titleInput">judul</label>
      <input id="titleInput" type="text" placeholder="Judul singkat&hellip;" required maxlength="120">

      <label for="bodyInput">isi</label>
      <textarea id="bodyInput" placeholder="Isi konten&hellip;" required maxlength="500"></textarea>

      <div class="btn-row">
        <button type="submit" class="btn-primary" id="submitBtn">Kirim (POST)</button>
        <button type="button" class="btn-ghost" id="cancelBtn" style="display:none;">Batal</button>
      </div>
      <div class="form-msg" id="formMsg" role="status" aria-live="polite"></div>
    </form>
  </section>

  <section>
    <div class="toolbar">
      <span id="countText">memuat data&hellip;</span>
      <button class="btn-ghost" id="refreshBtn">&#8635; Muat ulang</button>
    </div>
    <div class="grid" id="grid">
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
    </div>
  </section>
</main>

<script src="js/script.js"></script>

</body>
</html>