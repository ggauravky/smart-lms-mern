import { React, useState } from "react";
import logo from "../assets/logo.png";
import { IoPersonCircle } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

function Nav() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      console.log(result.data);
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="relative w-full h-[86px] bg-[#b9b9b9] flex items-center justify-between px-[50px]">
      <img
        src={logo}
        alt="Logo"
        className="w-[70px] h-[60px] object-contain rounded-[6px] border-2 border-white cursor-pointer"
        onClick={() => navigate("/")}
      />

      <div className="flex items-center justify-center gap-4 hidden lg:flex">
        {!userData ? (
          <IoPersonCircle
            className="w-[50px] h-[50px] fill-black cursor-pointer"
            onClick={() => navigate("/login")}
          />
        ) : userData?.photoUrl ? (
          <img
            src={userData?.photoUrl}
            className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          />
        ) : (
          <div
            className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            {userData?.name?.slice(0, 1).toUpperCase()}
          </div>
        )}


        {userData?.role === "educator" && (
          <div className="px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer" onClick={()=>navigate("/dashboard")}>
            Dashboard
          </div>
        )}

        {userData ? (
          <span
            className="px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer"
            onClick={handleLogout}
          >
            LogOut
          </span>
        ) : (
          <span
            className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        )}

        {show && userData && (
          <div className="absolute top-[90px] right-[50px] z-50 flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black shadow-xl">
            <span
              className="w-full text-center bg-black text-white px-[30px] py-[10px] rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors"
              onClick={() => {
                navigate("/profile");
                setShow(false);
              }}
            >
              My Profile
            </span>
            <span
              className="w-full text-center bg-black text-white px-[30px] py-[10px] rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors"
              onClick={() => {
                navigate("/my-courses");
                setShow(false);
              }}
            >
              My Courses
            </span>
          </div>
        )}
      </div>

      {/* Mobile View Hamburger Icon */}
      <RxHamburgerMenu
        className="w-[35px] h-[35px] cursor-pointer lg:hidden fill-black"
        onClick={() => setShowHam((prev) => !prev)}
      />

      {/* Mobile Menu Fullscreen Overlay */}
      <div
        className={`fixed inset-0 w-screen h-screen bg-black/95 backdrop-blur-md flex items-center justify-center flex-col gap-4 z-[999] lg:hidden transition-all duration-300 ${
          showHam ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-full"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="absolute top-6 right-6 p-2 text-white hover:bg-white/10 rounded-full transition cursor-pointer"
          onClick={() => setShowHam(false)}
        >
          <IoClose className="w-7 h-7 text-white" />
        </button>

        {!userData ? (
          <IoPersonCircle
            className="w-16 h-16 fill-white cursor-pointer hover:opacity-80 transition"
            onClick={() => {
              navigate("/login");
              setShowHam(false);
            }}
          />
        ) : userData?.photoUrl ? (
          <img
            src={userData.photoUrl}
            alt="Profile"
            className="w-16 h-16 rounded-full text-white flex items-center justify-center border-2 border-white cursor-pointer object-cover"
            onClick={() => setShowHam(false)}
          />
        ) : (
          <div
            className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold border-2 border-white bg-gray-800 cursor-pointer"
            onClick={() => setShowHam(false)}
          >
            {userData?.name?.slice(0, 1).toUpperCase()}
          </div>
        )}

        <button
          type="button"
          className="w-[200px] h-[55px] border-2 border-white text-white bg-black hover:bg-gray-800 rounded-[10px] text-[18px] font-medium flex items-center justify-center cursor-pointer transition"
          onClick={() => {
            navigate("/profile");
            setShowHam(false);
          }}
        >
          My Profile
        </button>

        <button
          type="button"
          className="w-[200px] h-[55px] border-2 border-white text-white bg-black hover:bg-gray-800 rounded-[10px] text-[18px] font-medium flex items-center justify-center cursor-pointer transition"
          onClick={() => {
            navigate("/allcourses");
            setShowHam(false);
          }}
        >
          My Courses
        </button>

        {userData?.role === "educator" && (
          <button
            type="button"
            className="w-[200px] h-[55px] border-2 border-white text-white bg-black hover:bg-gray-800 rounded-[10px] text-[18px] font-medium flex items-center justify-center cursor-pointer transition"
            onClick={() => {
              navigate("/dashboard");
              setShowHam(false);
            }}
          >
            Dashboard
          </button>
        )}

        {userData ? (
          <button
            type="button"
            className="w-[200px] h-[55px] border-2 border-white text-white bg-black hover:bg-gray-800 rounded-[10px] text-[18px] font-medium flex items-center justify-center cursor-pointer transition"
            onClick={() => {
              handleLogout();
              setShowHam(false);
            }}
          >
            LogOut
          </button>
        ) : (
          <button
            type="button"
            className="w-[200px] h-[55px] border-2 border-white text-white bg-black hover:bg-gray-800 rounded-[10px] text-[18px] font-medium flex items-center justify-center cursor-pointer transition"
            onClick={() => {
              navigate("/login");
              setShowHam(false);
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
