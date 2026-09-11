import { useSelector } from "react-redux";
import img from "../../assets/empty.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FaArrowLeftLong
        className=" w-[22px] absolute top-[10%]
      left-[10%] h-[22px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="w-full px-6 py-10 bg-gray-50 space-y-10">
        {/* {main section} */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={userData?.photoUrl || img}
            alt="Educator"
            className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"
          />
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {userData?.name || "Educator"} 👋
            </h1>
            <h1 className="text-xl font-semibold text-gray-800">
              Total Earning :0
            </h1>
            <p className="text-gray-600 text-sm">
              {userData?.description ||
                "Start creating amazing courses for your students!"}
            </p>
            <h1
              className="px-[10px] text-center  py-[10px] border-2  bg-black border-black text-white  rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => navigate("/courses")}
            >
              Create Courses
            </h1>
          </div>
        </div>

        {/* {graph section} */}
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
