import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import img from "../../assets/empty.jpg";
import { FaEdit } from "react-icons/fa";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../server";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const EditCourses = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isPublished, setIsPublished] = useState(false);
  const thumb = useRef();
  const [selectCourse, setSelectCourse] = useState(null)
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState(0);
  const [frontendImage, setFrontendImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }


  const getCourseById = async () => {
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/$courseId`, { withCredentials: true });
      setSelectCourse(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "");
      setSubtitle(selectCourse.subtitle || "");
      setDescription(selectCourse.description || "");
      setCategory(selectCourse.category || "");
      setLevel(selectCourse.level || "");
      setPrice(selectCourse.price || 0);
      setIsPublished(selectCourse.isPublished);
      setFrontendImage(selectCourse.thumbnail || img);
    }
  }, [selectCourse]);

  useEffect(() => {
    getCourseById();
  }, [])

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);
    try {
      const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`, formData, { withCredentials: true });
      console.log(result);
      setLoading(false);
      toast.success("Course Updated Successfully");
      navigate("/courses");

    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Error while updating course");
    }
  }
  const handleRemoveCourse = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`, { withCredentials: true });
      console.log(result);
      setLoading1(false);
      toast.success("Course Removed Successfully");
      navigate("/courses");

    } catch (err) {
      console.log(err);
      setLoading1(false);
      toast.error("Error while removing course");
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* Top Bar */}
      <div className="flex flex-col items-center justify-center gap-[20px] md:justify-between md:flex-row mb-6 relative">
        <FaArrowLeftLong
          className="top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-2xl font-semibold md:pl-[60px]">
          Add Detail Information regarding the Course
        </h2>
        <div className="space-x-2 space-y-2">
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Go to lecture page
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
        <div className="space-x-2 space-y-2 mb-6">
          {!isPublished ? (
            <button
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border cursor-pointer"
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              className="bg-red-100 text-red-600 px-4 py-2 rounded-md border cursor-pointer"
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to UnPublish
            </button>
          )}
          <button className="bg-red-100 text-red-600 px-4 py-2 rounded-md border cursor-pointer" onClick={handleRemoveCourse}>
            Remove Course
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Course Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
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
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Course Subtitle"
              onChange={(e) => setSubtitle(e.target.value)}
              value={subtitle}
            />
          </div>
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
              className="w-full border px-4 py-2 rounded-md h-24"
              placeholder="Course Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

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
                className="w-full border px-4 py-2 rounded-md"
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
                className="w-full border px-4 py-2 rounded-md"
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
                className="w-full border px-4 py-2 rounded-md"
                placeholder="Course Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
          </div>
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
          </div>
          <div className="relative w-[300px] h-[170px]">
            <img
              src={frontendImage ? frontendImage : img}
              alt="Course Thumbnail"
              className="w-[100%] border-1 border-black rounded-[5px]"
              onClick={() => thumb.current.click()}
            />
            <FaEdit className="w-[20px] h-[20px] absolute top-2 right-2" onClick={() => thumb.current.click()} />
          </div>
          <div className="flex items-center justify-start gap-[15px]">
            <button
              className="bg-[#e9e8e8] hover:bg-red-200 text-black border border-black cursor-pointer px-4 py-2 rounded-md"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>
            <button className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer" onClick={handleEditCourse} disabled={loading}>
              {loading ? <ClipLoader size={30} color="white" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourses;
