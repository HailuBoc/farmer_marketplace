import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import farmerRoutes from "./routes/farmerRoutes.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://farmer-marketplace-kappa.vercel.app", // ← FIXED
      "https://farmer-marketplace-skir.onrender.com", // ← Add your backend
    ],
    credentials: true,
  })
);

const __dirname = path.resolve(); // required for ES modules

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: "10mb" })); // allow base64 images

app.use("/products", productRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/api/users", userRoutes);

app.use("/farmers", farmerRoutes);

app.get("/", (req, res) => {
  res.send("LocalFarm API running...");
});
app.listen(PORT, () => {
  console.log("server is running on port 5000");
});
server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000;
