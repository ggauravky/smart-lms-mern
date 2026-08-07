import React from 'react'
import logo from "../assets/logo.png"
function Nav() {
  return (
    <div>
    <div className='w=[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10'></div>
    <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
        <img src={logo} alt="" className='w-[60px] rounded[5px] border-2 border-white' />
    </div>
     <div ></div>
    </div>
  )
}

export default Nav
