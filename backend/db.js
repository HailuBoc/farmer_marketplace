// db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Loads .env or .env.production automatically

const { Pool } = pkg;

const sslSetting =
  process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432,
  ssl: sslSetting,
});

// Test connection
pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) =>
    console.error("❌ PostgreSQL connection error:", err.message)
  );

export default pool;
