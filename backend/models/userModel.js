// backend/models/userModel.js
import { pool } from "../db.js";
import bcrypt from "bcrypt";

export async function createUser({ name, email, password, role, business }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  // For vendor, store business name; for purchaser, store full name.
  const query = `
    INSERT INTO users (name, email, password, role, business)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, role, business, created_at;
  `;
  const values = [name, email, hashedPassword, role, business || null];

  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getUserByEmail(email) {
  const query = "SELECT * FROM users WHERE email = $1";
  const { rows } = await pool.query(query, [email]);
  return rows[0];
}
