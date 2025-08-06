import { updateUserProfile } from "../helpers/userHelper.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user._id;

    const updatedUser = await updateUserProfile(userId, name, email);

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
