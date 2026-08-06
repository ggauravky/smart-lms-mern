import express from 'express';

const userRouter = express.Router();

export const getCurrentUser = async (req, res) => {
    try {
        const user  = await User.findById(req.user.id).select('-password');
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: 'Get current user error' });
    }   
}