import React from 'react'
import Nav from '../component/nav'
import home from '../assets/home1.jpg'
import { SiViaplay } from "react-icons/si";
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'
import Logos from '../component/Logos';
import ExploreCourses from '../component/ExploreCourses';
import CardPage from '../component/CardPage';
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Full-width Navigation Bar */}
      <Nav />

      {/* 2. Hero Section */}
      <div className="w-full h-[580px] sm:h-[640px] md:h-[700px] lg:h-[calc(100vh-86px)] relative overflow-hidden">
        <img
          src={home}
          className="w-full h-full object-cover object-center pointer-events-none"
          alt="Grow Your Skills"
        />

        {/* Hero Title */}
        <div className="absolute top-6 sm:top-8 md:top-10 lg:top-[8%] w-full flex flex-col items-center justify-center px-4 text-center z-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-white font-bold tracking-tight">
            Grow Your Skills to Advance
          </h1>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-white font-bold tracking-tight mt-1 sm:mt-2">
            Your Career path
          </h2>
        </div>

        {/* Hero Action Buttons */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 w-full flex items-center justify-center gap-3 sm:gap-4 flex-wrap px-4 z-10">
          <button
            className="px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-white bg-black/50 backdrop-blur-sm text-white hover:bg-white hover:text-black rounded-xl text-sm sm:text-base font-medium flex items-center gap-2 cursor-pointer transition shadow-lg active:scale-95"
            onClick={() => navigate("/allcourses")}
          >
            <span>View All Courses</span>
            <SiViaplay className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          </button>
          <button
            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-black hover:bg-gray-100 rounded-xl text-sm sm:text-base font-medium flex items-center gap-2 cursor-pointer transition shadow-lg active:scale-95"
          >
            <span>Search With Ai</span>
            <img src={ai} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full hidden lg:block" alt="" />
            <img src={ai1} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full lg:hidden" alt="" />
          </button>
        </div>
      </div>

      <Logos />
      <ExploreCourses />
      <CardPage />
    </div>
  );
}

export default Home;