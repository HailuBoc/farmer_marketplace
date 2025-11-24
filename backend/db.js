// db.js
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "farmers_marketplace",
  password: process.env.DB_PASS || "Hailkasa#35",
  port: Number(process.env.DB_PORT) || 5432,
  ssl: { rejectUnauthorized: false },
});

// Optional: test the connection when the server starts
pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) =>
    console.error("❌ PostgreSQL connection error:", err.message)
  );

export default pool;
