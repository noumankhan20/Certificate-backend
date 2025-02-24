import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    const email = "admin@example.com";
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("yourpassword", 10);
    await Admin.create({ email, password: hashedPassword });

    console.log("✅ Admin created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
