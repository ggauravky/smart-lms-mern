import React, { useEffect, useState, useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../config";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSlice";

function EditLecture() {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { lectureData } = useSelector((state) => state.lecture);
  const selectedLecture = lectureData?.find(
    (lecture) => lecture._id === lectureId
  );

  const [lectureTitle, setLectureTitle] = useState("selectedLecture ? selectedLecture.lectureTitle : \"\"");
  const [videoFile, setVideoFile] = useState(null);
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const fileInputRef = useRef(null);

  // Initialize data from Redux or fetch if refreshed
  useEffect(() => {
    if (selectedLecture) {
      setLectureTitle(selectedLecture.lectureTitle || "");
      setIsPreviewFree(selectedLecture.isPreviewFree || false);
    } else if (courseId) {
      const fetchLectures = async () => {
        try {
          const res = await axios.get(
            `${serverUrl}/api/course/getlectures/${courseId}`,
            { withCredentials: true }
          );
          const list = res.data.lectures || res.data || [];
          dispatch(setLectureData(list));
          const found = list.find((lec) => lec._id === lectureId);
          if (found) {
            setLectureTitle(found.lectureTitle || "");
            setIsPreviewFree(found.isPreviewFree || false);
          }
        } catch (err) {
          console.error("Error fetching lecture:", err);
        }
      };
      fetchLectures();
    }
  }, [selectedLecture, courseId, lectureId, dispatch]);

  // Update Lecture Handler
  const handleUpdateLecture = async (e) => {
    e.preventDefault();
    if (!lectureTitle.trim()) {
      toast.error("Please provide a lecture title");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("lectureTitle", lectureTitle.trim());
    formData.append("isPreviewFree", isPreviewFree);
    if (videoFile) {
      formData.append("videoUrl", videoFile);
    }

    try {
      await axios.post(
        `${serverUrl}/api/course/editlecture/${lectureId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success("Lecture updated successfully!");
      navigate(`/createlecture/${courseId}`);
    } catch (error) {
      console.error("Error updating lecture:", error);
      toast.error(error.response?.data?.message || "Failed to update lecture");
    } finally {
      setLoading(false);
    }
  };

  // Remove Lecture Handler
  const handleRemoveLecture = async () => {
    if (!window.confirm("Are you sure you want to remove this lecture?")) return;
    setRemoving(true);
    try {
      await axios.delete(
        `${serverUrl}/api/course/removelecture/${lectureId}/${courseId}`,
        { withCredentials: true }
      );
      toast.success("Lecture removed successfully");
      navigate(`/createlecture/${courseId}`);
    } catch (error) {
      console.error("Error removing lecture:", error);
      toast.error(error.response?.data?.message || "Failed to remove lecture");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <FaArrowLeftLong
            className="w-5 h-5 text-gray-700 hover:text-black cursor-pointer transition"
            onClick={() => navigate(`/createlecture/${courseId}`)}
          />
          <h2 className="text-2xl font-bold text-gray-800">
            Update Your Lecture
          </h2>
        </div>

        {/* Remove Lecture Button */}
        <div>
          <button
            type="button"
            onClick={handleRemoveLecture}
            disabled={removing}
            className="px-5 py-2.5 bg-[#d90429] hover:bg-[#b00020] text-white rounded-lg text-sm font-semibold transition cursor-pointer disabled:opacity-60"
          >
            {removing ? "Removing..." : "Remove Lecture"}
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleUpdateLecture} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Introduction to Backend"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
          </div>

          {/* Video * */}
          <div>
            <label
              htmlFor="video"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Video *
            </label>
            <div className="w-full border border-gray-300 rounded-lg p-2 flex items-center">
              <input
                type="file"
                id="video"
                accept="video/*"
                ref={fileInputRef}
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#2b3945] file:text-white hover:file:bg-[#1e293b] cursor-pointer"
              />
            </div>
            {selectedLecture?.videoUrl && !videoFile && (
              <p className="text-xs text-green-600 mt-1.5 font-medium">
                ✓ Video is already uploaded. Choosing a new file will replace it.
              </p>
            )}
            {videoFile && (
              <p className="text-xs text-blue-600 mt-1.5 font-medium">
                Selected: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* Is this video FREE checkbox */}
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="isPreviewFree"
              checked={isPreviewFree}
              onChange={(e) => setIsPreviewFree(e.target.checked)}
              className="w-4 h-4 accent-black rounded cursor-pointer"
            />
            <label
              htmlFor="isPreviewFree"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              Is this video FREE
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer text-sm shadow flex items-center justify-center min-h-[44px] disabled:opacity-70"
          >
            {loading ? (
              <ClipLoader size={18} color="white" />
            ) : (
              "Update Lecture"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditLecture;