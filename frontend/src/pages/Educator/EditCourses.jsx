import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import img from "../../assets/empty.jpg";
import { FaEdit } from "react-icons/fa";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";
import { ClipLoader } from "react-spinners";

const EditCourses = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isPublished, setIsPublished] = useState(false);
  const thumb = useRef();
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState(0);
  const [frontendImage, setFrontendImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const getCourseById = async () => {
    try {
      const result = await axios.get(
        serverUrl + `/api/course/getcourse/${courseId}`,
        { withCredentials: true }
      );
      setSelectCourse(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "");
      setSubTitle(selectCourse.subTitle || "");
      setDescription(selectCourse.description || "");
      setCategory(selectCourse.category || "");
      setLevel(selectCourse.level || "");
      setPrice(selectCourse.price || 0);
      setIsPublished(selectCourse.isPublished || false);
      setFrontendImage(selectCourse.thumbnail || img);
    }
  }, [selectCourse]);

  useEffect(() => {
    getCourseById();
  }, [courseId]);

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    if (backendImage) {
      formData.append("thumbnail", backendImage);
    }
    formData.append("isPublished", isPublished);

    try {
      const result = await axios.post(
        serverUrl + `/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      const updateData = result.data;
      const currentCourses = courseData || [];

      if (updateData.isPublished) {
        const updatedCourses = currentCourses.map((c) =>
          c._id === courseId ? updateData : c
        );
        if (!currentCourses.some((c) => c._id === courseId)) {
          updatedCourses.push(updateData);
        }
        dispatch(setCourseData(updatedCourses));
      } else {
        const filteredCourses = currentCourses.filter((c) => c._id !== courseId);
        dispatch(setCourseData(filteredCourses));
      }

      setLoading(false);
      toast.success("Course Updated Successfully");
      navigate("/courses");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response?.data?.message || "Error while updating course");
    }
  };

  const handleRemoveCourse = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(
        serverUrl + `/api/course/remove/${courseId}`,
        { withCredentials: true }
      );
      console.log(result.data);
      const filteredCourses = (courseData || []).filter((c) => c._id !== courseId);
      dispatch(setCourseData(filteredCourses));
      setLoading1(false);
      toast.success("Course Removed Successfully");
      navigate("/courses");
    } catch (err) {
      console.log(err);
      setLoading1(false);
      toast.error(err.response?.data?.message || "Error while removing course");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <FaArrowLeftLong
              className="w-5 h-5 cursor-pointer text-gray-700 hover:text-black transition"
              onClick={() => navigate("/courses")}
            />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Add Detail Information regarding the Course
            </h2>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm cursor-pointer">
            Go to lecture page
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-gray-50 p-6 rounded-md">
          <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>

          {/* Publish / Unpublish / Remove Buttons */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {!isPublished ? (
              <button
                type="button"
                className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-md border border-green-300 font-medium cursor-pointer transition text-sm"
                onClick={() => setIsPublished((prev) => !prev)}
              >
                Click to Publish
              </button>
            ) : (
              <button
                type="button"
                className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-4 py-2 rounded-md border border-yellow-300 font-medium cursor-pointer transition text-sm"
                onClick={() => setIsPublished((prev) => !prev)}
              >
                Click to UnPublish
              </button>
            )}
            <button
              type="button"
              className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-md border border-red-300 font-medium cursor-pointer transition text-sm"
              onClick={handleRemoveCourse}
              disabled={loading1}
            >
              {loading1 ? "Removing..." : "Remove Course"}
            </button>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full border border-gray-300 bg-white px-4 py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Course Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            {/* Subtitle */}
            <div>
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subtitle
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                className="w-full border border-gray-300 bg-white px-4 py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Course Subtitle"
                onChange={(e) => setSubTitle(e.target.value)}
                value={subTitle}
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full border border-gray-300 bg-white px-4 py-2 rounded-md h-24 focus:ring-2 focus:ring-black focus:outline-none resize-none"
                placeholder="Course Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            {/* Category / Level / Price */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              {/* Category */}
              <div className="flex flex-col flex-1">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="w-full border border-gray-300 bg-white px-4 py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="">Select category</option>
                  <option value="App Development">App Development</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="AI Tools">AI Tools</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Ethical Hacking">Ethical Hacking</option>
                  <option value="UI UX Designing">UI UX Designing</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Level */}
              <div className="flex flex-col flex-1">
                <label
                  htmlFor="level"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Level
                </label>
                <select
                  name="level"
                  id="level"
                  onChange={(e) => setLevel(e.target.value)}
                  value={level}
                  className="w-full border border-gray-300 bg-white px-4 py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Price */}
              <div className="flex flex-col flex-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Course Price (INR)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full border border-gray-300 bg-white px-4 py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Course Price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                hidden
                ref={thumb}
                accept="image/*"
                onChange={handleThumbnail}
              />
              <div className="relative w-[300px] h-[170px] border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={frontendImage ? frontendImage : img}
                  alt="Course Thumbnail"
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => thumb.current.click()}
                />
                <div
                  className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow cursor-pointer hover:bg-white transition"
                  onClick={() => thumb.current.click()}
                >
                  <FaEdit className="w-4 h-4 text-gray-700" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-start gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-black border border-gray-300 cursor-pointer px-5 py-2 rounded-md font-medium transition text-sm"
                onClick={() => navigate("/courses")}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 cursor-pointer font-medium transition flex items-center justify-center min-w-[130px] text-sm"
                onClick={handleEditCourse}
                disabled={loading}
              >
                {loading ? <ClipLoader size={18} color="white" /> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourses;
