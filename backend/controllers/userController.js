// backend/controllers/userController.js
import { createUser, getUserByEmail } from "../models/userModel.js";

export async function registerUser(req, res) {
  try {
    const { name, business, email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = await createUser({
      name,
      business,
      email,
      password,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}
