import React, { useEffect, useState } from 'react'
import Card from "./Card.jsx"
import { useSelector } from 'react-redux';
import { SiViaplay } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Cardspage() {
    const [popularCourses, setPopularCourses] = useState([]);
    const { courseData } = useSelector(state => state.course);
    const navigate = useNavigate();

    useEffect(() => {
        setPopularCourses(courseData?.slice(0, 6) || []);
    }, [courseData]);

    return (
        <div className='flex items-center justify-center flex-col py-10 px-4'>
            <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[10px] px-[20px]'>
                Our Popular Courses
            </h1>
            <span className='lg:w-[50%] md:w-[80%] text-[15px] text-gray-500 text-center mt-[10px] mb-[30px] px-[20px]'>
                Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, business, and beyond.
            </span>

            {/* If courses exist, display cards. Otherwise, display a clean empty state */}
            {popularCourses.length > 0 ? (
                <>
                    <div className='w-full flex items-center justify-center flex-wrap gap-[40px] lg:p-[40px] md:p-[20px] p-[10px] mb-[30px]'>
                        {popularCourses.map((item, index) => (
                            <Card 
                                key={index} 
                                id={item._id} 
                                thumbnail={item.thumbnail} 
                                title={item.title} 
                                price={item.price} 
                                category={item.category} 
                                reviews={item.reviews} 
                            />
                        ))}
                    </div>

                    <button 
                        className='px-[20px] py-[10px] border-2 border-black bg-black text-white rounded-[10px] text-[18px] font-light flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition' 
                        onClick={() => navigate("/allcourses")}
                    >
                        View all Courses <SiViaplay className='w-[24px] h-[24px] fill-white' />
                    </button>
                </>
            ) : (
                <div className='flex flex-col items-center justify-center py-12 text-center text-gray-400'>
                    <p className='text-lg font-medium text-gray-600'>No courses published yet</p>
                    <p className='text-sm mt-1'>Check back soon for new and trending courses!</p>
                </div>
            )}
        </div>
    );
}

export default Cardspage;
