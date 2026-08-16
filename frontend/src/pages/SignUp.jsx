import React,{useState} from 'react'
import google from '../assets/google.jpg'
import {IoEyeOutline} from 'react-icons/io5'
import {IoEye} from 'react-icons/io5'
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { ClipLoader } from "react-spinners";
import { serverUrl } from '../App';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';
import { FcGoogle } from 'react-icons/fc';
function SignUp() {
  const[show, setShow] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const [loading, setLoading] = useState(false)


  const handleSignup = async (e) => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        {
          name,
          email,
          password,
          role,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate ("/")
      toast.success("Signup successful!");

    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  // Google signup function
  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      let role = "student";

      const result = await axios.post(
        serverUrl + "/api/auth/googleauth", { name: name, email: email, role }, { withCredentials: true });
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Google signup successful!");

    } catch (error) {
      console.log(error);
      toast.error("Google signup failed. Please try again.");
    }
  };


  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
      <form
        className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* left div */}
        <div className="md:w-1/2 w-full h-full flex flex-col items-center justify-center gap-3">
          <div className="text-center mb-1">
            <h1 className="font-bold text-gray-900 text-3xl tracking-tight">
              Let's Get Started!
            </h1>
            <h2 className="text-gray-500 text-[15px] font-medium mt-1">Create your account to continue</h2>
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold text-gray-700 text-sm">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full h-[40px] border border-gray-300 rounded-md text-[14px] px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-gray-400 transition-all"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold text-gray-700 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full h-[40px] border border-gray-300 rounded-md text-[14px] px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-gray-400 transition-all"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold text-gray-700 text-sm">
              Password
            </label>
            <input
              id="password"
              type={show ? "text" : "password"}
              className="w-full h-[40px] border border-gray-300 rounded-md text-[14px] px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-gray-400 transition-all"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show ? (
              <IoEyeOutline
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10px] text-gray-500 hover:text-gray-800"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10px] text-gray-500 hover:text-gray-800"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <div className="flex md:w-[50%] w-[70%] items-center justify-between ">
            <span
              className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "student" ? "border-black" : ""}`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
            <span
              className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "educator" ? "border-black" : ""}`}
              onClick={() => setRole("educator")}
            >
              Educator
            </span>
          </div>
          <button
            className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="#ffffff" /> : "Sign Up"}
          </button>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or Continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div 
            className="w-[80%] h-[42px] border border-gray-300 hover:border-gray-400 bg-white shadow-sm rounded-[6px] flex items-center justify-center gap-3 cursor-pointer transition-all hover:bg-gray-50"
            onClick={googleSignup}
          >
            <FcGoogle className="w-[22px] h-[22px]" />
            <span className="text-[15px] font-semibold text-gray-700">
              Continue with Google
            </span>
          </div>
          <div className="text-[#6f6f6f]">
            {" "}
            Already Have an account?
            <span
              className="underline-offset-1 text-[black] underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              {" "}
              Login
            </span>{" "}
          </div>
        </div>

        {/* right div */}
        <div className="w-1/2 h-full rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col  hidden">
          <img
            src={logo}
            alt="Logo"
            className="w-75 h-75 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp