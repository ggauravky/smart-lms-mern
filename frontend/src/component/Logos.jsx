import React from "react";
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const features = [
  {
    icon: MdCastForEducation,
    title: "20k+ online Courses",
    isFeatured: true,
  },
  {
    icon: SiOpenaccess,
    title: "Lifetime Access",
  },
  {
    icon: FaSackDollar,
    title: "Value for Money",
  },
  {
    icon: BiSupport,
    title: "Lifetime Support",
  },
  {
    icon: FaUsers,
    title: "Community Support",
  },
];

function Logos() {
  return (
    <div className="w-full py-6 md:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gray-100 hover:bg-gray-200/80 border border-gray-200/70 transition-all cursor-pointer text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-xs active:scale-95 select-none ${
                  item.isFeatured ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 fill-[#03394b]" />
                <span className="truncate">{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Logos;
