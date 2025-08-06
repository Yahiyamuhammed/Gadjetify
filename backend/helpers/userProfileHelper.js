import User from "../models/userModel.js";

export const updateUserProfile = async (userId, name, email) => {
  const user = await User.findById(userId);
  if (!user) throw { status: 404, message: "User not found" };

  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw { status: 400, message: "Email already in use" };
  }

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };
};
