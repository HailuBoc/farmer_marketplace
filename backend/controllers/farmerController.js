import { createFarmer, getFarmers } from "../models/Farmer.js";

export async function addFarmer(req, res) {
  try {
    const farmer = await createFarmer(req.body);
    res.status(201).json({ message: "Farmer created", farmer });
  } catch (err) {
    console.error("Error saving farmer:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function fetchFarmers(req, res) {
  try {
    const farmers = await getFarmers();
    res.json(farmers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
