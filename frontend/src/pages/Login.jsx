import React, { useState } from "react";
import google from "../assets/google.jpg";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";


function Login() {
  const [show, setShow] = useState(false);
   const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
      const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogin=async()=>{
    setLoading(true)
    try{
      const result=await axios.post(serverUrl + "/api/auth/login", {email, password},{withCredentials:true})

      setLoading(false)
      toast.success("Login Successfully")
      dispatch(setUserData(result.data))
      navigate("/")

    }catch(error){
      console.log(error)
         setLoading(false)
         toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
      <form className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex" onSubmit={(e)=>e.preventDefault()}>
        {/* left div */}
        <div className="md:w-1/2 w-full h-full flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-[black] text-2xl">
              Hey, Welcome Back
            </h1>
            <h2 className="text-[#999797] text-[18px]">
              Login in your account
            </h2>
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="enter email" onChange={(e) => setEmail(e.target.value)} value={email}
            />
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type={show ? "text" : "password"}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="enter password" onChange={(e) => setPassword(e.target.value)} value={password}
            />
            {!show ? (
              <IoEyeOutline
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <button className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]" disabled={loading} onClick={handleLogin}>
           {loading ? <ClipLoader size={30} color='white'/>:"Login" }
          </button>
          <span className="text-[#6f6f6f] cursor-pointer" onClick={() => navigate("/forgot-password")}>
            Forget Password?
          </span>

          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or Continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>

          <div className="w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center">
            <img src={google} alt="oogle" className="w-[25px]" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>

          <div className="text-[#6f6f6f]">
            Create a new account?
            <span
              className="underline-offset-1 text-[black] cursor-pointer underline"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </div>
        </div>

        {/* right div */}
        <div className="w-1/2 h-full rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden">
          <img src={logo} alt="Logo" className="w-75 h-75" />
        </div>
      </form>
    </div>
  );
}

export default Login;