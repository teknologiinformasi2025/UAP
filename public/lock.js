// lock.js

// Cek apakah user sudah pernah memuat halaman sebelumnya
if (sessionStorage.getItem("quizStarted")) {
  // Jika iya (berarti halaman direfresh), blok akses
  document.body.innerHTML = `
    <h2 style="color: red; text-align: center; margin-top: 20vh;">
      ❌ Akses diblokir.<br>Anda tidak dapat mengulang kuis setelah refresh.
    </h2>
  `;
} else {
  // Tandai bahwa kuis sudah dimulai
  sessionStorage.setItem("quizStarted", "true");
}
