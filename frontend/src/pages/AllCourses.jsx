import React, { useEffect, useState } from 'react';
import Card from "../component/Card.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Nav from '../component/Nav';
import ai from '../assets/SearchAi.png';
import { useSelector } from 'react-redux';

const CATEGORIES = [
  'App Development',
  'AI/ML',
  'AI Tools',
  'Data Science',
  'Data Analytics',
  'Ethical Hacking',
  'UI UX Designing',
  'Web Development',
  'Others'
];

function AllCourses() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const { courseData } = useSelector(state => state.course);

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value));
    } else {
      setCategory(prev => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let courseCopy = courseData ? [...courseData] : [];
    if (category.length > 0) {
      courseCopy = courseCopy.filter(item => category.includes(item.category));
    }
    setFilterCourses(courseCopy);
  };

  useEffect(() => {
    setFilterCourses(courseData || []);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category, courseData]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 1. Full-width Top Navigation */}
      <Nav />

      {/* 2. Main Page Layout */}
      <div className="flex flex-1 relative">
        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setIsSidebarVisible(prev => !prev)}
          className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-2.5 rounded-full shadow-lg md:hidden flex items-center gap-2 text-sm font-medium"
        >
          {isSidebarVisible ? 'Hide Filters' : 'Filter Categories'}
        </button>

        {/* Backdrop for mobile sidebar */}
        {isSidebarVisible && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsSidebarVisible(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`w-[260px] bg-white border-r border-gray-200 p-6 shrink-0
            fixed md:sticky top-0 md:top-[86px] h-screen md:h-[calc(100vh-86px)] overflow-y-auto
            transition-transform duration-300 z-40
            ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
            <button
              onClick={() => navigate("/")}
              className="p-1.5 hover:bg-gray-100 rounded-full transition cursor-pointer text-gray-700"
              title="Back to Home"
            >
              <FaArrowLeftLong className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-bold text-gray-800">Filter by Category</h2>
          </div>

          {/* Search with AI */}
          <button
            type="button"
            className="w-full mb-5 py-2.5 px-4 bg-black text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition shadow-sm cursor-pointer"
          >
            <span>Search with AI</span>
            <img src={ai} className="w-5 h-5 rounded-full" alt="AI" />
          </button>

          {/* Categories */}
          <form className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Categories
            </div>
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer text-sm text-gray-700 transition select-none"
              >
                <input
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                  className="w-4 h-4 accent-black rounded cursor-pointer"
                />
                <span>{cat}</span>
              </label>
            ))}
          </form>

          {category.length > 0 && (
            <button
              onClick={() => setCategory([])}
              className="mt-6 w-full py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
            >
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Main Courses Area */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Title & Count Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Courses</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Showing {filterCourses?.length || 0} course{filterCourses?.length === 1 ? '' : 's'}
                  {category.length > 0 && ` filtered by ${category.length} categor${category.length === 1 ? 'y' : 'ies'}`}
                </p>
              </div>
            </div>

            {/* Responsive Courses Grid */}
            {filterCourses && filterCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterCourses.map((item, index) => (
                  <Card
                    key={item._id || index}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    price={item.price}
                    category={item.category}
                    id={item._id}
                    reviews={item.reviews}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <p className="text-lg font-semibold text-gray-700">No courses found</p>
                <p className="text-sm text-gray-500 mt-1 max-w-sm">
                  {category.length > 0
                    ? "No courses match the selected category filters."
                    : "No courses have been published yet."}
                </p>
                {category.length > 0 && (
                  <button
                    onClick={() => setCategory([])}
                    className="mt-4 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllCourses;
