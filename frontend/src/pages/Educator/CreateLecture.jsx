import React, { useState , useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../config";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSlice";

function CreateLecture() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  const handleCreateLecture = async (e) => {
    if (e) e.preventDefault();
    if (!lectureTitle.trim()) {
      toast.error("Please enter a lecture title");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + `/api/course/createlecture/${courseId}`,
        {
          lectureTitle,
        },
        { withCredentials: true }
      );
      console.log("Lecture created successfully:", result.data);
      toast.success(result.data?.message || "Lecture created successfully");
      if (result.data?.lecture) {
        dispatch(setLectureData([...(lectureData || []), result.data.lecture]));
      }
      setLectureTitle("");
      setLoading(false);
    } catch (error) {
      console.error("Error creating lecture:", error);
      toast.error(error.response?.data?.message || "Failed to create lecture");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCourseLectures = async () => {
      try {
        const result = await axios.get(
          serverUrl + `/api/course/getlectures/${courseId}`,
          { withCredentials: true }
        );
        dispatch(setLectureData(result.data.lectures || result.data || []));
      } catch (error) {
        console.error("Error fetching lectures:", error);
        toast.error(error.response?.data?.message || "Failed to fetch lectures");
      }
    };
    getCourseLectures();
  }, [courseId, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-6">
        {/* Header  */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Lets Create a New Lecture
          </h1>
          <p className="text-gray-600">
            Enter the title and add your video lecture to enhance your course
            content.
          </p>
        </div>

        {/* input area */}
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          placeholder="e.g. Introduction to React"
        />
        <div>
          {/* button  */}
          <div className="flex gap-4 mb-6">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium cursor-pointer"
              onClick={() => navigate(`/editcourse/${courseId}`)}
            >
              <FaArrowLeftLong />
              Back to Course
            </button>
            <button
              onClick={handleCreateLecture}
              disabled={loading}
              className="px-5 py-2 rounded-md bg-[black] text-white hover:bg-gray-600 transition-all text-sm font-medium shadow cursor-pointer disabled:opacity-60"
            >
              {loading ?<ClipLoader size={15} color="white" /> : "+ Create Lecture"}
            </button>
          </div>
          <div>
            {/* lecture List */}
            <div className="space-y-2">
              {lectureData?.map((lecture, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-md justify-between flex items-center border border-gray-200"
                >
                  <span className="font-medium text-gray-800">Lecture - {index + 1} : {lecture.lectureTitle}</span>
                    <FaEdit className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;