import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createCourse, editCourse, getCourseById,getCreatorCourses, getPublishedCourses, removeCourse } from "../controller/courseController.js"
import upload from "../middleware/multer.js"

let courseRouter = express.Router()

courseRouter.post("/create",isAuth,createCourse)
courseRouter.get("/getpublishedcoures",getPublishedCourses)
courseRouter.get("/getcreator",isAuth,getCreatorCourses)
courseRouter.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editCourse)
courseRouter.get("/getcourse/:courseId",isAuth,getCourseById)
courseRouter.delete("/remove/:courseId",isAuth,removeCourse)


export default courseRouter