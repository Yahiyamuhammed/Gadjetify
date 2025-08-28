const User = require("../models/userModal");
const generateOTP = require("../utils/generateOTP");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateReferralCode = require("../utils/generateReferralCode ");

exports.signupUser = async ({
  email,
  name,
  password,
  mobileNo,
  referredBy,
}) => {
  const existing = await User.findOne({ email });

  if (existing) {
    if (existing.authType === "google") {
      return {
        status: 400,
        data: {
          message: "Email already registered with Google. Use Google login.",
        },
      };
    }
    return { status: 400, data: { message: "User already exists" } };
  }

  const otp = generateOTP();
  await sendMail(email, otp);
  const otpExpiresAt = new Date(Date.now() + 3 * 60 * 1000);
  const hashedPassword = await bcrypt.hash(password, 10);

  const referralCode = generateReferralCode(name);

  let referrer = null;
  if (referredBy) {
    referrer = await User.findOne({ referralCode: referredBy });
    if (!referrer) {
      return { status: 400, data: { message: "Invalid referral code" } };
    }
  }

  const user = new User({
    email,
    name,
    password: hashedPassword,
    mobileNo,
    otp,
    otpExpiresAt,
    authType: "local",
    referralCode,
    referredBy: referredBy || null,
  });

  await user.save();
  return { status: 200, data: { message: "OTP sent to email" } };
};

exports.verifyUserOtp = async ({ email, otp }) => {
  const user = await User.findOne({ email });
  if (!user) return { status: 404, data: { message: "User not found" } };

  if (user.otpExpiresAt && new Date() > user.otpExpiresAt) {
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();
    return {
      status: 400,
      data: { message: "OTP has expired. Please request a new one." },
    };
  }

  if (user.otp !== otp) {
    return { status: 400, data: { message: "Invalid OTP" } };
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  if (user.referredBy) {
    const referrer = await User.findOne({ referralCode: user.referredBy });
    if (referrer) {
      const bonus = 1000;

      // Create wallet transaction for referrer
      await WalletTransaction.create({
        userId: referrer._id,
        amount: bonus,
        type: "credit",
        description: `Referral bonus for inviting ${user.email}`,
      });

      // Update referrer wallet
      await User.findByIdAndUpdate(referrer._id, { $inc: { wallet: bonus } });

      // Create wallet transaction for new user
      await WalletTransaction.create({
        userId: user._id,
        amount: bonus,
        type: "credit",
        description: `Referral bonus for signing up with code ${user.referredBy}`,
      });

      // Update new user wallet
      user.wallet += bonus;
    }
  }

  await user.save();

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    status: 200,
    data: {
      message: "OTP verified. User registered successfully!",
      token,
      user: {
        email: user.email,
        name: user.name,
        // mobileNo: user.mobileNo,
      },
    },
  };
};

exports.resendUserOtp = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) return { status: 404, data: { message: "User not found" } };

  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

  user.otp = otp;
  user.otpExpiresAt = otpExpiresAt;
  await user.save();

  await sendMail(email, otp);

  return { status: 200, data: { message: "New OTP sent to your email" } };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return { status: 400, data: { message: "User not found" } };

  if (user.authType === "google") {
    return {
      status: 400,
      data: {
        message: "This email is registered with Google. Use Google login.",
      },
    };
  }

  if (!user.isVerified)
    return { status: 401, data: { message: "User not verified" } };
  if (user.isBlocked)
    return { status: 401, data: { message: "Your account is blocked" } };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { status: 401, data: { message: "Incorrect password" } };

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    status: 200,
    data: {
      message: "Login successful",
      token,
      user: {
        email: user.email,
        name: user.name,
        mobileNo: user.mobileNo,
      },
    },
  };
};

exports.googleAuthHandler = async ({ access_token }) => {
  if (!access_token) {
    return { status: 400, data: { message: "Missing Google token" } };
  }
  const googleRes = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!googleRes.ok) {
    return {
      status: 401,
      data: { message: "Failed to fetch user info from Google" },
    };
  }

  const profile = await googleRes.json();
  const { email, name, sub } = profile;

  // const decoded = jwtDecode(credential);
  // const { email, name, sub } = decoded;

  let user = await User.findOne({ googleId: sub });
  if (user) {
    if (user.isBlocked)
      return { status: 401, data: { message: "Your account is blocked" } };

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return {
      status: 200,
      data: {
        message: "Google login successful",
        token,
        user: { name: user.name, email: user.email, mobileNo: user.mobileNo },
      },
    };
  }

  const existingEmailUser = await User.findOne({ email });
  if (existingEmailUser) {
    return {
      status: 409,
      data: {
        message:
          "Email already registered with password login. Use password login instead.",
      },
    };
  }

  const newUser = await User.create({
    name,
    email,
    googleId: sub,
    authType: "google",
    isVerified: true,
  });

  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    status: 200,
    data: {
      message: "Google signup successful",
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
        mobileNo: newUser.mobileNo,
      },
    },
  };
};
