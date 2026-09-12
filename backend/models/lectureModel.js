import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
    {
        lectureTitle: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            default: "",
        },
        isPreviewFree: {
            type: Boolean,
            default: false,
        },

    },{timestamps: true})

    const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;