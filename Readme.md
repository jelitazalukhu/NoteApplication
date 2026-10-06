<div align="center">

# 📝 Note Application

**Prototype Client Web — Consume Public REST API**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![REST API](https://img.shields.io/badge/REST-API-informational?style=flat)

</div>

---

## 📖 Deskripsi

**Note Application** adalah prototipe aplikasi client web yang dikembangkan untuk memenuhi tugas mata kuliah E-App. Aplikasi ini dibangun dengan konsep **client-server**, yaitu menghubungkan sisi client (browser) dengan sebuah server melalui Public REST API, guna mendemonstrasikan implementasi operasi **CRUD** (Create, Read, Update, Delete) secara langsung.

Secara fungsional, aplikasi ini berperan sebagai aplikasi pencatat (note-taking application) sederhana, di mana pengguna dapat membuat, mengubah, dan menghapus catatan melalui antarmuka yang disediakan. Seluruh data yang ditampilkan diperoleh secara real-time dari server melalui permintaan HTTP.

## 🔗 Demo

<div align="center">

**[🚀 Buka Demo Aplikasi](https://jelitazalukhu.github.io/NoteApplication/)**

</div>

## ✨ Fitur

Aplikasi ini mengimplementasikan keempat operasi CRUD secara penuh terhadap data pada server:

| Operasi | Method HTTP | Keterangan |
|---|---|---|
| 🟢 Create | `POST` | Menambahkan catatan baru melalui form yang tersedia |
| 🔵 Read | `GET` | Menampilkan seluruh catatan yang diambil dari server saat aplikasi dimuat |
| 🟡 Update | `PUT` | Mengubah catatan yang sudah ada melalui fitur edit |
| 🔴 Delete | `DELETE` | Menghapus catatan, disertai mekanisme rollback otomatis apabila permintaan ke server gagal diproses |

Fitur pendukung lainnya:
- ✅ Indikator status koneksi ke server (terhubung/gagal)
- ✅ Penanganan kesalahan (error handling) saat permintaan ke server tidak berhasil
- ✅ Tata letak responsif yang menyesuaikan pada perangkat dengan ukuran layar berbeda

## 🌐 API yang Digunakan

Aplikasi ini mengonsumsi **[JSONPlaceholder](https://jsonplaceholder.typicode.com/posts)**, yaitu REST API dummy yang lazim digunakan untuk keperluan pengujian dan pengembangan prototipe, serta merupakan salah satu opsi API yang ditetapkan dalam ketentuan tugas.

```
Base URL: https://jsonplaceholder.typicode.com/posts
```

## 🛠️ Teknologi yang Digunakan

| Teknologi | Fungsi |
|---|---|
| HTML5 | Struktur halaman dengan elemen semantik |
| CSS3 (Flexbox & Grid) | Tata letak yang responsif |
| JavaScript (Vanilla JS) | Logika aplikasi & komunikasi dengan API melalui Fetch API, tanpa framework tambahan |

## 📁 Struktur Proyek

```
noteApplication/
├── index.html       Struktur halaman utama
├── css/
│   └── style.css    Tampilan dan tata letak
├── js/
│   └── script.js    Logika aplikasi dan integrasi API
└── README.md
```

## ▶️ Cara Menjalankan

Berkas `index.html` dapat dibuka secara langsung melalui peramban (browser), atau dijalankan melalui live server untuk hasil yang lebih optimal.

## ⚠️ Keterbatasan Aplikasi

JSONPlaceholder merupakan API simulasi sehingga permintaan `POST`, `PUT`, dan `DELETE` tidak benar-benar menyimpan perubahan secara permanen pada server. Perubahan data pada operasi tersebut disinkronkan secara lokal pada sisi client agar tampilan tetap konsisten selama satu sesi penggunaan, namun akan kembali ke kondisi awal apabila halaman dimuat ulang.

---
