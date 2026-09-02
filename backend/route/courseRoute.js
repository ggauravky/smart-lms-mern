import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createCourse, editCourse, getCourseById,getCreatorCourses, getPublishedCourses, removeCourse } from "../controller/courseController.js"
import upload from "../middleware/multer.js"

let courseRouter = express.Router()

courseRouter.post("/create",isAuth,createCourse)
courseRouter.get("/getpublished",getPublishedCourses)
courseRouter.get("/getcreator",isAuth,getCreatorCourses)
courseRouter.get("/getcourse/:courseId",isAuth,getCourseById)
courseRouter.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editCourse)
courseRouter.delete("/remove/:courseId",isAuth,removeCourse)


export default courseRouter