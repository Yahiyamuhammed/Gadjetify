const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    authType: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String, default: null },
    wallet: { type: Number, default: 0 },
    pendingEmail: { type: String, unique: true },
    referralCode: { type: String, unique: true },
    referredBy: { type: String, default: null },
    isResetOtpVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
