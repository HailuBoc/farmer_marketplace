import express from "express";
import { addFarmer, fetchFarmers } from "../controllers/farmerController.js";

const router = express.Router();

router.post("/", addFarmer);
router.get("/", fetchFarmers);

export default router;
