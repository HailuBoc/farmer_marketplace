import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  approveProduct,
} from "../models/productModel.js";

// ✅ Helper: format image URLs
const formatProductImage = (product) => {
  if (!product) return null;
  return {
    ...product,
    image: product.image
      ? product.image.startsWith("http")
        ? product.image
        : `http://localhost:5000${product.image}`
      : null,
  };
};

// ✅ GET all products
export async function getProducts(req, res) {
  try {
    const products = await getAllProducts();
    const formatted = products.map(formatProductImage);
    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

// ✅ GET single product
export async function getProduct(req, res) {
  try {
    const { id } = req.params;
    console.log("🔹 Received product ID:", id); // Add this

    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      console.warn(`⚠️ Invalid product ID type: ${id}`);
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await getProductById(parsedId);

    if (!product) {
      console.warn(`⚠️ Product not found: ID ${parsedId}`);
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(formatProductImage(product));
  } catch (err) {
    console.error("🔥 Error fetching product:", err.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}

// ✅ CREATE product
export async function addProduct(req, res) {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const newProduct = await createProduct(data);
    res.status(201).json(formatProductImage(newProduct));
  } catch (err) {
    console.error("❌ Error creating product:", err.message);
    res.status(500).json({ error: "Failed to create product" });
  }
}

// ✅ UPDATE product
export async function editProduct(req, res) {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const updated = await updateProduct(id, data);

    if (!updated) {
      console.warn(`⚠️ Update failed - product not found: ID ${id}`);
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(formatProductImage(updated));
  } catch (err) {
    console.error("❌ Error updating product:", err.message);
    res.status(500).json({ error: "Failed to update product" });
  }
}

// ✅ DELETE product
export async function removeProduct(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteProduct(id);

    if (!result) {
      console.warn(`⚠️ Delete failed - product not found: ID ${id}`);
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
}

// ✅ APPROVE product
export async function approveProductController(req, res) {
  try {
    const { id } = req.params;
    const approved = await approveProduct(id);

    if (!approved) {
      console.warn(`⚠️ Approve failed - product not found: ID ${id}`);
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(formatProductImage(approved));
  } catch (err) {
    console.error("❌ Error approving product:", err.message);
    res.status(500).json({ error: "Failed to approve product" });
  }
}
