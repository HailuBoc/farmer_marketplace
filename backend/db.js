import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER, // From .env.production
  host: process.env.DB_HOST, // Render host
  database: process.env.DB_NAME, // Render database name
  password: process.env.DB_PASS, // Render password
  port: process.env.DB_PORT, // Usually 5432
  ssl:
    process.env.DB_SSL === "true" // Use SSL for Render in production
      ? { rejectUnauthorized: false }
      : false,
});
