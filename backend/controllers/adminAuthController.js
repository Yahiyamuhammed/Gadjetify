const Admin = require("../models/adminModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { adminId: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Admin login successful",
      admin: {
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Admin login failed", error: err.message });
  }
};

exports.adminLogout = async (req, res) => {
  try {
    // res.clearCookie("admin_token");
    res.clearCookie("admin_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    // .status(200)
    // .json({ message: "User logged out successfully" });
    res.status(200).json({ message: "admin logout successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.messsage || "something went wrong" });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;

    const existing = await Admin.findOne({});
    if (existing)
      return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashed });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create admin", error: err.message });
  }
};
