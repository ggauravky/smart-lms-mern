import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import emptyImg from "../assets/empty.jpg";
const CourseCard = ({ thumbnail, title, category, price, id, reviews }) => {
    const navigate = useNavigate()
    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;

        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (total / reviews.length).toFixed(1); // rounded to 1 decimal
    };

    // Usage:
    const avgRating = calculateAverageRating(reviews);
    console.log("Average Rating:", avgRating);
    return (
        <div className="max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300" onClick={() => navigate(`/viewcourse/${id}`)}>
            {/* Thumbnail */}
            <img
                src={thumbnail ?? emptyImg}
                alt={title}
                className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5 space-y-2">
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

                {/* Category */}
                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 capitalize">
                    {category}
                </span>


                {/* Meta info */}
                <div className="flex justify-between text-sm text-gray-600 mt-3 px-[10px]">

                    <span className="font-semibold text-gray-800">₹{price}</span>

                    <span className="flex items-center gap-1 ">
                        <FaStar className="text-yellow-500" /> {avgRating}
                    </span>

                </div>
            </div>
        </div>
    );
};

export default CourseCard;
