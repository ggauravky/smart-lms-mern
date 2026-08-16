import express from 'express';
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser, updateProfile } from "../controller/userController.js";
import multer from 'multer';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.get('/getCurrentUser', isAuth, getCurrentUser);
userRouter.post('/Profile', isAuth, upload.single('photo'), updateProfile);


export default userRouter;