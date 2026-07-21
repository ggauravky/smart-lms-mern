import React from 'react'


function SignUp() {
  return (
   <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
    <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'>
        {/* left div */}

       <div className="md:w-1/2 w-full h-full flex flex-col items-center justify-center gap-3">
       <div>
        <h1 className='font-semibold text-[black] text-2xl'>let's get started</h1>
        <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
        
        </div>
        <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
        <label htmlFor="name"></label>
        <input id='name' type="text" />
        </div>
        
        </div>

        {/* right div */}
        <div className='w-1/2 h-full rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col  hidden'>
             <img src="/logo.png" alt="Logo" className="w-24 h-24" />
            <span className='text-2xl text-white'>VIRTUAL COURSES</span>
        </div>

    </form>


   </div>
  )
}

export default SignUp