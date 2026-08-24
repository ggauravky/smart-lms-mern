import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import img from "../../assets/empty.jpg";
import { FaEdit } from "react-icons/fa";

const Courses = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-[100%] min-h-screen p-4 sm:p-6   bg-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div className="flex items-center justify-center gap-3">
            <FaArrowLeftLong
              className=" w-[22px] h-[22px] cursor-pointer"
              onClick={() => navigate("/dashboard")}
            />
            <h1 className="text-xl font-semibold">Courses</h1>
          </div>
          <button
            className="bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => navigate("/createcourses")}
          >
            Create Course
          </button>
        </div>

        {/* {for large screen tables} */}

        <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50 transition duration-200">
                <td className="py-3 px-4 flex items-center gap-4">
                  <img
                    src={img}
                    alt="Course"
                    className="w-14 h-14 object-cover rounded-md object-fit"
                  />
                  <span>Course Title</span>
                </td>
                <td className="py-3 px-4">$99.99</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-red-600">
                    Draft
                  </span>
                </td>
                <td className="py-3 px-4">
                  <FaEdit className="text-gray-600 hover:text-blue-600 " />
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-center text-sm text-gray-400 mt-6">
            A list of your recent courses.
          </p>
        </div>

        {/* {for small screen tables} */}

        <div className="md:hidden space-y-4">
          <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 ">
            <div className="flex gap-4 items-center">
              <img src={img} alt="Course" className="w-16 h-16 object-cover rounded-md" />
              <div className="flex-1">
                <h2 className="font-semibold">title</h2>
                <p className="text-gray-500 text-sm">NA</p>
              </div>
              <FaEdit className="text-gray-600 hover:text-blue-600 " />
            </div>
            <span className="w-fit px-3 py-1 rounded-full text-xs bg-red-600 w-fit">
              Draft
            </span>
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            A list of your recent courses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Courses;
