import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState(userData.name || "");
  const [description, setDescription] = useState(userData.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formData = new FormData();
  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (photoUrl) {
        formData.append("photo", photoUrl); 
      }

      const result = await axios.post(
        serverUrl + "/api/user/profile",
        formData,
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate("/profile");
      toast.success("Profile updated successfully!");
    } catch (err) {
      setLoading(false);
      console.error("Error updating profile:", err);
      toast.error(err.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <FaArrowLeftLong
          className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Edit Profile
        </h2>
        <form action="" className="space-y-5" onSubmit={(e) => {
          e.preventDefault();
          handleEditProfile();
        }}>
          <div className="flex flex-col items-center text-center">
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                className="w-24 h-24 rounded-full object-cover border-4 border-[black]"
                alt="Profile"
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white">
                {userData?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              Select Avatar
            </label>
            <input
              type="file"
              id="image"
              name="photoUrl"
              placeholder="Select Avatar"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-md text-sm"
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />
          </div>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={userData?.name}
              className="w-full px-4 py-2 border rounded-md text-sm"
              onChange={(e) => setName(e.target.value)} value={name}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              readOnly
              type="text"
              id="email"
              name="email"
              placeholder={userData?.email}
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label
              className="text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              name="description"
              placeholder='Tell us about yourself...'
              rows={3}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[black]"
              onChange={(e) => setDescription(e.target.value)} value={description}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[black] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[black]" onClick={handleEditProfile} disabled={loading}
          > {loading ? <ClipLoader size={30} color="white" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
