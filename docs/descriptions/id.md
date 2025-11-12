# Deskripsi Chrome Web Store (Bahasa Indonesia)

## Deskripsi Singkat (132 karakter maks.)

```
Beralih grup tab via URL. Gunakan pintasan keyboard untuk pergantian instan dengan hotkey.
```

Jumlah karakter: 95 karakter

## Deskripsi Detail

```
Ekstensi Chrome yang memungkinkan pergantian grup tab berbasis pintasan keyboard menggunakan pemanggilan URL. Kombinasikan ekstensi ini dengan utilitas pintasan keyboard untuk beralih secara instan antara grup tab Chrome menggunakan hotkey favorit Anda.

【Mengapa Ekstensi Ini?】
Chrome tidak menyediakan pintasan keyboard asli untuk beralih antar grup tab. Ekstensi ini mengatasi masalah tersebut dengan memungkinkan Anda memicu pergantian grup tab melalui URL, yang kemudian dapat dipetakan ke pintasan keyboard menggunakan utilitas eksternal. Misalnya, tekan Cmd+1 untuk langsung ke grup "Kerja" Anda, Cmd+2 untuk "Pribadi", dan seterusnya.

【Fitur Utama】
✓ Integrasi Pintasan Keyboard
  Bekerja mulus dengan utilitas pintasan keyboard untuk menyediakan pergantian grup tab berbasis hotkey

✓ Pemicu Berbasis URL
  Navigasi ke https://extension.tabgroup-trigger/{nama-grup} untuk langsung beralih ke grup tab yang ditentukan

✓ Pop-up Daftar URL
  Klik ikon ekstensi untuk melihat semua grup tab dengan URL yang dikodekan, mudah disalin dengan satu klik

【Cara Menggunakan】
1. Buat grup tab di Chrome dan beri mereka nama
2. Klik ikon ekstensi untuk mendapatkan URL untuk setiap grup:
   - URL yang dikodekan ditampilkan secara otomatis
   - Klik tombol "Salin URL" untuk menyalin ke clipboard
   - Klik area tampilan URL untuk memilih teks untuk penyalinan manual
3. Atur tindakan pembukaan URL di utilitas pintasan keyboard Anda
   Contoh: Cmd+Shift+1 → https://extension.tabgroup-trigger/Work
4. Tekan hotkey yang dikonfigurasi untuk langsung beralih grup tab

【Contoh Utilitas Pintasan Keyboard】
• macOS: BetterTouchTool, Keyboard Maestro
• Windows: AutoHotkey, PowerToys (versi 0.79 atau lebih baru)

【Contoh Pengaturan (BetterTouchTool)】
1. Buat pintasan keyboard baru (mis.: Cmd+Shift+1)
2. Atur tindakan menjadi "Open URL"
3. Masukkan URL: https://extension.tabgroup-trigger/Work
4. Sekarang menekan Cmd+Shift+1 akan langsung beralih ke grup tab "Work" Anda

【Tips】
• Ekstensi mengingat tab mana yang terakhir aktif di setiap grup
• Saat Anda beralih ke grup, ekstensi akan mengaktifkan tab yang terakhir Anda lihat
• Jika tidak ada riwayat tab, ekstensi mengaktifkan tab pertama dalam grup

【Keterbatasan】
• Tidak dapat beralih ke grup tab yang disimpan (fitur "Simpan grup" Chrome yang menghapus semua tab tetapi mempertahankan label grup)
  Catatan: Grup tab yang diciutkan (di mana tab disembunyikan tetapi tidak dihapus) berfungsi dengan baik
• Karakter khusus dalam nama grup (?, /, #, %, dll.) memerlukan pengkodean URL
  Contoh: "Question?Answer" → https://extension.tabgroup-trigger/Question%3FAnswer
  Gunakan UI pop-up ekstensi untuk mendapatkan URL yang dikodekan secara otomatis
• Jika Anda melakukan 25+ pergantian grup tab berturut-turut, tab yang lebih lama mungkin tidak dapat dipulihkan melalui Cmd+Shift+T karena batasan riwayat sesi Chrome (chrome.sessions.MAX_SESSION_RESULTS = 25)

【Privasi】
Ekstensi ini tidak mengumpulkan data apa pun. Semua pemrosesan dilakukan secara lokal di perangkat Anda.

【Dukungan】
Jika Anda mengalami masalah atau memiliki permintaan fitur, silakan laporkan di halaman GitHub Issues kami.
https://github.com/archelon-inc/TabGroup-Trigger/issues

---
Catatan: Deskripsi ini diterjemahkan oleh Claude AI.
```
