async function submitScore(namaPeserta, skor) {
  const token = localStorage.getItem("auth_jwt");
  fetch("/.netlify/functions/submit-score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nama: namaPeserta, skor }),
  }).then((res) =>
    res.ok ? alert("Skor terkirim!") : alert("Gagal kirim skor")
  );
}
