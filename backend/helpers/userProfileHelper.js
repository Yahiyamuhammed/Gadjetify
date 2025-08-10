const User = require("../models/userModal");
const generateOTP = require("../utils/generateOTP");
const sendMail = require("../utils/sendMail");
const { verifyUserOtp } = require("./authHelper");


exports.getProfile = async (userId) => {
  const user = await User.findById(userId).select("name email");
  if (!user) {
    return { status: 404, message: "User not found" };
  }
  return { status: 200, message: "Profile fetched", data: user };
};


exports.updateProfile = async (userId, name, email) => {
  const user = await User.findById(userId);
  if (!user) {
    return { status: 404, message: "User not found" };
  }

  let emailChanged = false;

  if (name && name !== user.name) {
    user.name = name;
  }

  if (email && email !== user.email) {
    emailChanged = true;
    user.pendingEmail = email;

    user.otp = generateOTP();
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    sendMail(user.email,user.otp)

  }

  await user.save();

  if (emailChanged) {
    return {
      status: 200,
      message: "Name updated, OTP sent for email verification",
    };
  }

  return { status: 200, message: "Profile updated successfully" };
};

exports.verifyEmailOtp = async (userId, otp) => {
  const user = await User.findById(userId);
  if (!user) {
    return { status: 404, message: "User not found" };
  }

  if (
    !user.emailOtp ||
    user.emailOtp !== parseInt(otp) ||
    user.emailOtpExpires < Date.now()
  ) {
    return { status: 400, message: "Invalid or expired OTP" };
  }

  user.email = user.pendingEmail;
  user.pendingEmail = undefined;
  user.otp = undefined;
  user.otpExpiresAt = undefined;

  await user.save();

  return { status: 200, message: "Email updated successfully" };
};
