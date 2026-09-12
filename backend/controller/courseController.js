import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
import Lecture from "../models/lectureModel.js";


export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const course = await Course.create({
      title,
      category,
      creator: req.userId,
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error creating course" });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });
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
    };

    if (req.file && req.file.path) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult && typeof uploadResult === "string") {
        updateData.thumbnail = uploadResult;
      }
    }

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.status(200).json(course);
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


// For lecture 

export const createLecture = async (req, res) => {
  try {
    const {lectureTitle} = req.body;
    const { courseId } = req.params;
    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "lecture title is required" });
    }
    const lecture = await Lecture.create({lectureTitle});
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.lectures.push(lecture._id);
    await course.populate("lectures");
    await course.save();
    return res.status(201).json({lecture, course, message: "Lecture created successfully"});
  } catch (error) {
    return res.status(500).json({ message: `Failed to create lecture ${error}` });
  }
}

export const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({ lectures: course.lectures || [] });
  } catch (error) {
    return res.status(500).json({ message: `Failed to get course lectures ${error}` });
  }
};

export const editLecture = async (req, res) => {
  try {
    const {lectureId} = req.params;
    const {lectureTitle, isPreviewFree} = req.body;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    if (!lectureTitle && isPreviewFree === undefined && !req.file) {
      return res.status(400).json({ message: "At least one field is required for update" });
    }
    let videoUrl;
    if (req.file && req.file.path) {
      videoUrl = await uploadOnCloudinary(req.file.path);
      lecture.videoUrl = videoUrl;
    }
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    if (isPreviewFree !== undefined) {
      lecture.isPreviewFree = isPreviewFree === "true" || isPreviewFree === true;
    }
    await lecture.save();
    return res.status(200).json(lecture);
  } catch (error) {
    return res.status(500).json({ message: `Failed to edit lecture ${error}` });
  }
}

export const removeLecture = async (req, res) => {
  try {
    const {lectureId, courseId} = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    await Course.findByIdAndUpdate(courseId, {
      $pull: { lectures: lectureId }
    });
    return res.status(200).json({ message: "Lecture Removed Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Failed to remove lecture ${error}` });
  }
}