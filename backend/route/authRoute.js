import express from "express"
import {
  signup,
  login,
  logout,
  sendOtp,
  verifyOtp,
  resetPassword,
  googleAuth
} from "../controller/authController.js";

const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.post("/sendotp",sendOtp)
authRouter.post("/verifyotp", verifyOtp)
authRouter.post("/reset-password", resetPassword)
authRouter.post("/googleauth", googleAuth)


export default authRouter