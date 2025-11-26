// db.js
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER || "farmers_marketplace_database_user",
  host: process.env.DB_HOST || "dpg-d4i817n5r7bs73ca8k20-a",
  database: process.env.DB_NAME || "farmers_marketplace_database",
  password: process.env.DB_PASS || "EYuqv5QFXJ1zM0WK1ElrvGsad4fy7XQK",
  port: Number(process.env.DB_PORT) || 5432,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Optional: test the connection when the server starts
pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) =>
    console.error("❌ PostgreSQL connection error:", err.message)
  );

export default pool;
