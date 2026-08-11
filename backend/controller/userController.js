import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user  = await User.findById(req.userId).select('-password');
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);

    } catch (error) {
        console.error("getCurrentUser error:", error);
        res.status(500).json({ message: 'Get current user error' });
    }   
}