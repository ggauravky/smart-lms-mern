import User from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import genToken from "../config/token.js"
import sendMail from "../config/sendMail.js"


export const signup = async (req, res) => {
    try {
        const { name,  email, password, role } = req.body
        let existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Invalid email" })
        }
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({ message: "Majboot password use kro bhai" })
        }
        let hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })
        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            security:false,
            sameSite: "Strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        return res.status(201).json(user)
    }catch (error) {
        return res.status(500).json({ message:`SignUp error. ${error.message}`})

    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }   
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
         let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            security:false,
            sameSite: "Strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        return res.status(200).json(user)
    }
    catch (error) {    
        return res.status(500).json({ message:`Login error. ${error.message}`})
    }
}

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({ message: "Logout successful" })
    }
    catch (error) {
        return res.status(500).json({ message:`Logout error. ${error.message}`})
    }
}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000) // OTP expires in 5 minutes
        user.resetOtp = otp
        user.otpExpires = otpExpires
        user.isOtpVerified = false
        await user.save()
        await sendMail(user.email, "Reset Your Password - Smart LMS", otp)
        return res.status(200).json({ message: "OTP sent successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Error sending OTP. ${error.message}` })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        if (user.resetOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" })
        }
        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({ message: "OTP verified successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Error verifying OTP. ${error.message}` })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        if (!user.isOtpVerified) {
            return res.status(400).json({ message: "OTP not verified" })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save()
        return res.status(200).json({ message: "Password reset successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: `Error resetting password. ${error.message}` })
    }
}

export const googleAuth = async (req, res) => {
    try {
        const { name, email , role } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            let hashedPassword = await bcrypt.hash(Math.random().toString(), 10)
            user = await User.create({ name, email, password: hashedPassword, role: role || "student" })
        }
        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            security: false,
            sameSite: "Strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        return res.status(200).json(user)
    }
    catch (error) {
        console.error("Google Auth Error:", error);
        return res.status(500).json({ message: `Google Auth error. ${error.message}` })
    }
}