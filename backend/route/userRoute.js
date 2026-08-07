import express from 'express';
import { getCurrentUser } from '../controller/userController.js';
const userRouter = express.Router();

userRouter.get('/getCurrentUser', isAuth, getCurrentUser);

export default userRouter;