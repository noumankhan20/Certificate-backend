import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

// Admin Login Route
router.post("/login", async (req, res) => {
  console.log("Login API hit"); // ✅ Debugging
  console.log("Request Body:", req.body); // ✅ Debugging

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("Admin not found"); // ✅ Debugging
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("Password does not match"); // ✅ Debugging
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Login successful!"); // ✅ Debugging
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(`Error: ${error.message}`); // ✅ Debugging
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
