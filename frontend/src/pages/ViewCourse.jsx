import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCourse } from '../redux/courseSlice';
import { useEffect } from 'react';
import img from "../assets/empty.jpg"

function ViewCourse() {
  const navigate = useNavigate();
  const {courseId} = useParams()
  const {courseData} = useSelector((state) => state.course)
  const {selectedCourse} = useSelector((state) => state.course)
  const dispatch = useDispatch();



  const fetchCourseData = async () => {
    courseData.map((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course))
        console.log(selectedCourse)

        return null
      }
    })

  }
  useEffect(() => {
    fetchCourseData()

  },[courseId, courseData])

  return (
    <div  className='min-h-screen bg-gray-50 p-6'>

      <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>

        {/* top section */}
        <div className='w-full md:w-1/2'>
         <FaArrowLeftLong className='text-[black] w-[22px] h-[22px] cursor-pointer' 
         onClick={()=>navigate("/")}/>
         {selectedCourse?.thumbnail ? <img src=
         {selectedCourse?.thumbnail} alt=""
         className='rounded-x1 w-full object-cover' /> :
        <img src={img} alt=""  className='rounded-x1 w-full object-cover' />
         } 

        </div>
        </div>
    </div>
  )
}

export default ViewCourse
