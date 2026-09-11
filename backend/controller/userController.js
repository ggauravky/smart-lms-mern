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
    const userId = req.userId; 
    const { name, description } = req.body;

    let updateData = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    // Upload image to Cloudinary only if an image file was attached
    if (req.file && req.file.path) {
      const photoUrl = await uploadOnCloudinary(req.file.path);
      if (photoUrl && typeof photoUrl === "string") {
        updateData.photoUrl = photoUrl;
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error updating profile: ${error.message}` });
  }
};
