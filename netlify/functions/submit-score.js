const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { nama, skor } = JSON.parse(event.body);

    if (!nama || typeof skor !== "number") {
      return { statusCode: 400, body: "Invalid input" };
    }

    await pool.query("INSERT INTO leaderboard (nama, skor) VALUES ($1, $2)", [
      nama,
      skor,
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Skor berhasil dikirim" }),
    };
  } catch (error) {
    console.error("Error saat insert:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gagal menyimpan skor" }),
    };
  }
};
