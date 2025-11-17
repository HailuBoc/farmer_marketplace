// models/Farmer.js
import { pool } from "../db.js";

export const createFarmer = async (farmerData) => {
  const {
    businessName,
    ownerName,
    email,
    phone,
    city,
    products,
    bankDetails,
    website,
    photo,
  } = farmerData;

  try {
    const query = `
    INSERT INTO farmers_application (
      businessname,
      owner_name,
      email,
      phone,
      city,
      products,
      bank_details,
      website,
      photo
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *;
  `;

    const values = [
      businessName,
      ownerName,
      email,
      phone || null,
      city,
      products,
      bankDetails || null,
      website || null,
      photo || null,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (err) {
    console.error("Error saving farmer:", err);
    throw err;
  }
};
export const getFarmers = async () => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM farmers ORDER BY created_at DESC"
    );
    return rows;
  } catch (err) {
    console.error("Error fetching farmers:", err);
    throw err;
  }
};
