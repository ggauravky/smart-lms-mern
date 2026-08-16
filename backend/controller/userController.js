import User from "../models/userModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("getCurrentUser error:", error);
    res.status(500).json({ message: "Get current user error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, description } = req.body;
    let photoUrl;
    if (req.file && req.file.path) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, description, photo: photoUrl },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error updating profile. ${error.message}` });
  }
};