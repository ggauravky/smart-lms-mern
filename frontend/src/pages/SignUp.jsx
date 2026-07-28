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

function SignUp() {
  const[show, setShow] = useState(false)
  const navigate = useNavigate()

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
      console.log(result.data);
      setLoading(false);

      navigate ("/")
      toast.success("Signup successful! Please log in.");


    } catch (error) {
      console.log(error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
   <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
    <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex' onSubmit ={(e) => {
      e.preventDefault();
    }}>
        {/* left div */}
       <div className="md:w-1/2 w-full h-full flex flex-col items-center justify-center gap-3">
       <div>
        <h1 className='font-semibold text-[black] text-2xl'>let's get started</h1>
        <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
        </div>
        <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
        <label htmlFor="name" className='font-semibold'>Name</label>
        <input id='name' type="text" className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]" placeholder='enter name' onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
        <label htmlFor="email" className='font-semibold'>Email</label>
        <input id='email' type="email" className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]" placeholder='enter email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
        <label htmlFor="password" className='font-semibold'>Password</label>
        <input id='password' type={show ? "text" : "password"} className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]" placeholder='enter password' onChange={(e) => setPassword(e.target.value)} value={password} />
        { !show ? (
          <IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={() => setShow(prev => !prev)} />
        ) : (
          <IoEye className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={() => setShow(prev => !prev)} />
        )}
        </div>
        
        <div className='flex md:w-[50%] w-[70%] items-center justify-between '>
        <span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "student" ? "border-black" : ""}`} onClick={() => setRole("student")}>Student</span>
        <span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "educator" ? "border-black" : ""}`} onClick={() => setRole("educator")}>Educator</span>
        </div>
        <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' onClick={handleSignup} disabled={loading}>
          {loading ? <ClipLoader size = {30}  color = "#ffffff"/> : "Sign Up"}
        </button>
        <div className='w-[80%] flex items-center gap-2'>
          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
          <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or Continue</div>
          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
        </div>
        <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center'>
        <img src={google} alt="Google" className="w-[25px]" />
        <span className='text-[18px] text-gray-500'>oogle</span>
        </div>
        <div className='text-[#6f6f6f]'> Already Have an account?<span className='underline-offset-1 text-[black] underline cursor-pointer' onClick={()=>navigate("/login")}> Login</span> </div>
        </div>

        {/* right div */}
        <div className='w-1/2 h-full rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col  hidden'>
             <img src={logo} alt="Logo" className="w-75 h-75" />
        </div>

    </form>
   </div>
  )
}

export default SignUp