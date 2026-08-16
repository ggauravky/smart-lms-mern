import React from "react";
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

function Logos() {
  return (
    <div className="w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px] ">
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3x1 bg-gray-200 cursor-pointertext-[18px] font-light">
        <MdCastForEducation className="w- [35px] h-[35px] fill-[#03394b]" />
        20k+ online Courses
      </div>

      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3x1 bg-gray-200 cursor-pointertext-[18px] font-light">
        <SiOpenaccess className="w- [35px] h-[35px] fill-[#03394b]" />
        Lifetime Access
      </div>

      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3x1 bg-gray-200 cursor-pointertext-[18px] font-light">
        <FaSackDollar className="w- [35px] h-[35px] fill-[#03394b]" />
        Value for Money
      </div>

      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3x1 bg-gray-200 cursor-pointertext-[18px] font-light">
        <BiSupport className="w- [35px] h-[35px] fill-[#03394b]" />
        Lifetime Support
      </div>

      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3x1 bg-gray-200 cursor-pointertext-[18px] font-light">
        <FaUsers className="w- [35px] h-[35px] fill-[#03394b]" />
        Community Support
      </div>
    </div>
  );
}
export default Logos;
