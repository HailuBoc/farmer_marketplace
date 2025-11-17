import express from "express";
import {
  fetchTestimonials,
  createTestimonial,
} from "../controllers/testimonialController.js";

const router = express.Router();

router.get("/", fetchTestimonials);
router.post("/", createTestimonial);

export default router;
