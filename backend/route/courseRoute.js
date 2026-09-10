import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createCourse, editCourse, getCourseById,getCreatorCourses, getPublishedCourses, removeCourse , createLecture , editLecture , removeLecture , getCourseLectures } from "../controller/courseController.js"
import upload from "../middleware/multer.js"

// for course routes

let courseRouter = express.Router()

courseRouter.post("/create",isAuth,createCourse)
courseRouter.get("/getpublished",getPublishedCourses)
courseRouter.get("/getcreator",isAuth,getCreatorCourses)
courseRouter.get("/getcourse/:courseId",isAuth,getCourseById)
courseRouter.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editCourse)
courseRouter.delete("/remove/:courseId",isAuth,removeCourse)

// For lecture routes

courseRouter.post("/createlecture/:courseId",isAuth,upload.single("video"),createLecture)
courseRouter.get("/courselecture/:courseId",isAuth,getCourseLectures)
courseRouter.post("/editlecture/:lectureId",isAuth,upload.single("videoUrl"),editLecture)
courseRouter.delete("/removetelecture/:lectureId/:courseId",isAuth,removeLecture)


export default courseRouter