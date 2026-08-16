import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "educator"],
        required: true,
    },
    photoUrl: {
        type: String,
        default: "",
    },
    enrolledCourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
    }],
    resetOtp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    isOtpVerified: {
        type: Boolean,
        default: false,
    },

},{timestamps: true})

const userModel = mongoose.model("User", userSchema);
export default userModel;