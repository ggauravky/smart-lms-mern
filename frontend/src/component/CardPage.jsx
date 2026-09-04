import React, { useEffect, useState } from 'react'
import Card from "./Card.jsx"
import { useSelector } from 'react-redux';
import { SiViaplay } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Cardspage() {
    const [popularCourses, setPopularCourses] = useState([]);
    const { courseData } = useSelector(state => state.course)
    const navigate = useNavigate()
    useEffect(() => {
        setPopularCourses(courseData.slice(0, 6));
    }, [courseData])
    return (
        <div className=' relative flex items-center justify-center flex-col'>
            <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]'>Our Popular Courses</h1>
            <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, business, and beyond.</span>
            <div className='w-[100%] min-[100vh] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]

    '>


                {
                    popularCourses.map((item, index) => (
                        <Card key={index} id={item._id} thumbnail={item.thumbnail} title={item.title} price={item.price} category={item.category} reviews={item.reviews} />
                    ))
                }

            </div>
            <button className=' absolute right-[9%] bottom-2 px-[20px] py-[10px] border-2 lg:border-white border-black bg-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={() => navigate("/allcourses")}>View all Courses <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black' /></button>
        </div>
    )
}

export default Cardspage
