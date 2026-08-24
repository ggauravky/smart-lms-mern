import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const course = await Course.create({
      title,
      description,
      creator: req.user._id,
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error creating course" });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate(
      "lectures reviews",
    );
    if (!courses) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get All  courses ${error}` });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get creator courses ${error}` });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
    } = req.body;
    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
      thumbnail,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.status(201).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to update course ${error}` });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Failed to get course ${error}` });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();
    return res.status(200).json({ message: "Course Removed Successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `Failed to remove course ${error}` });
  }
};
