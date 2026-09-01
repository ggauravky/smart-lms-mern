import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const EditCourses = () => {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* Top Bar */}
      <div className="flex flex-col items-center justify-center gap-[20px] md:justify-between md:flex-row mb-6 relative">
        <FaArrowLeftLong 
          className="top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer" 
          onClick={() => navigate("/courses")} 
        />
        <h2 className="text-2xl font-semibold md:pl-[60px]">Add Detail Information regarding the Course</h2>
        <div className="space-x-2 space-y-2">
          <button className="bg-black text-white px-4 py-2 rounded-md">Go to lecture page</button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
        <div className="space-x-2 space-y-2 mb-6">
          {!isPublished ? (
            <button 
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border cursor-pointer" 
              onClick={() => setIsPublished(prev => !prev)}
            >
              Click to Publish
            </button>
          ) : (
            <button 
              className="bg-red-100 text-red-600 px-4 py-2 rounded-md border cursor-pointer" 
              onClick={() => setIsPublished(prev => !prev)}
            >
              Click to UnPublish
            </button>
          )}
          <button className="bg-red-100 text-red-600 px-4 py-2 rounded-md border cursor-pointer">
            Remove Course
          </button>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" id="title" name="title" className="w-full border px-4 py-2 rounded-md" placeholder="Course Title" />
          </div>
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input type="text" id="subtitle" name="subtitle" className="w-full border px-4 py-2 rounded-md" placeholder="Course Subtitle" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" name="description" className="w-full border px-4 py-2 rounded-md h-24" placeholder="Course Description" />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/* Category */}
            <div className="flex flex-col flex-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="category" id="category" className="w-full border px-4 py-2 rounded-md">
                <option value="">Select category</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI UX Designing">UI UX Designing</option>
                <option value="Web Development">Web Development</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Level */}
            <div className="flex flex-col flex-1">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select name="level" id="level" className="w-full border px-4 py-2 rounded-md">
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col flex-1">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Course Price (INR)</label>
              <input type="number" id="price" name="price" className="w-full border px-4 py-2 rounded-md" placeholder="Course Price" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourses;