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
        ) : userData.photoUrl ? (
          <img
            src={userData.photoUrl}
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
          <div className="px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">
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

      {/* Mobile View */}

      <RxHamburgerMenu
        className="w-[35px] h-[35px] cursor-pointer lg:hidden fill-black"
        onClick={() => setShowHam((prev) => !prev)}
      />

      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showHam ? "translate-x-[0] transition duration-600" : "translate-x-[-100%] transition duration-600"}`}
      >
        <IoClose
          className="w-[30px] h-[30px] fill-white absolute top-5 right-[4%] cursor-pointer"
          onClick={() => setShowHam((prev) => !prev)}
        />

        {!userData ? (
          <IoPersonCircle
            className="w-[50px] h-[50px] fill-black cursor-pointer"
            onClick={() => {
              navigate("/login");
              setShowHam(false);
            }}
          />
        ) : userData?.photoUrl ? (
          <img
            src={userData.photoUrl}
            className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            onClick={() => setShowHam((prev) => !prev)}
          />
        ) : (
          <div
            className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            onClick={() => setShowHam((prev) => !prev)}
          >
            {userData?.name?.slice(0, 1).toUpperCase()}
          </div>
        )}

        <div
          className="w-[200px] h-[65px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light flex items-center justify-center cursor-pointer"
          onClick={() => {
            navigate("/profile");
          }}
        >
          My Profile
        </div>
        <div className="w-[200px] h-[65px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light flex items-center justify-center cursor-pointer">
          My Courses
        </div>
        {userData?.role === "educator" && (
          <div className="w-[200px] h-[65px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light flex items-center justify-center cursor-pointer">
            Dashboard
          </div>
        )}
        {userData ? (
          <span
            className="w-[200px] h-[65px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light flex items-center justify-center cursor-pointer"
            onClick={handleLogout}
          >
            LogOut
          </span>
        ) : (
          <span
            className="w-[200px] h-[65px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        )}
      </div>
    </div>
  );
}

export default Nav;
