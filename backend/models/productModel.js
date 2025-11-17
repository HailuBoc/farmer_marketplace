import { pool } from "../db.js";

// Get all products
export async function getAllProducts() {
  const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
  return result.rows;
}

// Get single product
export async function getProductById(id) {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
}

// Create new product
export async function createProduct(data) {
  const { name, category, price, stock, image } = data;
  const priceNum = Number(price);
  const stockNum = Number(stock);

  if (!name || !category || isNaN(priceNum) || isNaN(stockNum)) {
    throw new Error("Invalid product data");
  }

  const result = await pool.query(
    `INSERT INTO products (name, category, price, stock, image, approved, created_at)
     VALUES ($1, $2, $3, $4, $5, FALSE, NOW())
     RETURNING *`,
    [name, category, priceNum, stockNum, image || null]
  );

  return result.rows[0];
}

// Update existing product
export async function updateProduct(id, data) {
  const { name, category, price, stock, image } = data;
  const priceNum = Number(price);
  const stockNum = Number(stock);

  if (!name || !category || isNaN(priceNum) || isNaN(stockNum)) {
    throw new Error("Invalid product data");
  }

  // Include image even if it's null, simplifies query
  const result = await pool.query(
    `UPDATE products
     SET name=$1, category=$2, price=$3, stock=$4, image=$5
     WHERE id=$6
     RETURNING *`,
    [name, category, priceNum, stockNum, image || null, id]
  );

  return result.rows[0];
}

// Delete product
export async function deleteProduct(id) {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
  return { message: "Deleted successfully" };
}

// Approve product
export async function approveProduct(id) {
  const result = await pool.query(
    "UPDATE products SET approved=TRUE WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
}
