import User from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import genToken from "../config/token.js"

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