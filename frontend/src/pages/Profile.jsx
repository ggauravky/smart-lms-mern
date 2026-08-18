import React from 'react'
import { useSelector } from "react-redux";

function Profile() {
  const {userData}=useSelector((state)=>state.user)
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative">
        <div className="flex flex-col items-center text-center">
         {userData?.photoUrl ? <img src={userData?.photoUrl} className="w-24 h-24 rounded-full object-cover border-4 border-[black]" alt="Profile" />:
         <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white">
          {userData?.name?.charAt(0).toUpperCase()}

           </div>
         }
         <h2 className="text-2xl font-bold mt-4 text-gray-800">
          {userData.name}
          <p className="text-sm text-gray-500">{userData.role}</p>
         </h2>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <span>Email: </span>
            <span>{userData.email}</span>
          </div>
          <div>
            <span>Bio: </span>
            <span>{userData.description}</span>
          </div>
          <div>
            <span>Enrollment Courses: </span>
            <span>{userData.enrollmentCourses?.length || 0}</span>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Profile
