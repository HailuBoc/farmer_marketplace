import express from "express";
import multer from "multer";
import {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
  approveProductController,
} from "../controllers/productController.js";

const router = express.Router();

// 🧩 Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

// 🛣️ Routes
router.get("/", getProducts); // get all
router.get("/:id", getProduct); // get single
router.post("/", upload.single("image"), addProduct); // add
router.put("/:id", upload.single("image"), editProduct); // update
router.delete("/:id", removeProduct); // delete
router.patch("/:id/approve", approveProductController); // approve

export default router;
