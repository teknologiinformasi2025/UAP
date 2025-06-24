const { Client } = require("pg");
const fetch = require("node-fetch");

const STYTCH_SECRET = process.env.STYTCH_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;

// Fungsi untuk verifikasi session_jwt dari frontend
async function verifyStytchJWT(jwt) {
  const response = await fetch(
    "https://api.stytch.com/v1/sessions/authenticate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(`${STYTCH_SECRET}:`).toString("base64"),
      },
      body: JSON.stringify({ session_jwt: jwt }),
    }
  );

  if (!response.ok) {
    throw new Error("JWT verification failed");
  }

  return await response.json(); // Akan berisi user_id dan detail lain
}

exports.handler = async (event) => {
  try {
    // Pastikan method POST
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method not allowed" };
    }

    const authHeader = event.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return { statusCode: 401, body: "No session token provided" };
    }

    // Verifikasi JWT via Stytch
    const session = await verifyStytchJWT(token);
    const user_id = session.user_id;

    // Ambil data dari body
    const { nama, skor } = JSON.parse(event.body);

    if (!nama || typeof skor !== "number") {
      return { statusCode: 400, body: "Invalid input" };
    }

    // Koneksi ke PostgreSQL
    const client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    // Simpan data skor
    await client.query(
      "INSERT INTO leaderboard (user_id, nama, skor, waktu_submit) VALUES ($1, $2, $3, NOW())",
      [user_id, nama, skor]
    );

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Skor berhasil disimpan" }),
    };
  } catch (err) {
    console.error("Error submit-score:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
