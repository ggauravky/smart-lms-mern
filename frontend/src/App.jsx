import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import getCurrentUser from "./customHooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import { Navigate } from "react-router-dom";
import ForgetPassword from "./pages/ForgetPassword";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Educator/Dashboard";
import Courses from "./pages/Educator/Courses";
import CreateCourse from "./pages/Educator/CreateCourses";
import useGetCurrentUser from "./customHooks/useGetCurrentUser";
import getCreatorCourse from "./customHooks/getCreatorCourse";
import EditCourse from "./pages/Educator/EditCourses";
import getPublishedCourse from "./customHooks/getPublishedCourse";

export const serverUrl = "http://localhost:8000";

function App() {
  useGetCurrentUser();
  getCreatorCourse();
  getPublishedCourse();
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/signup"} />}
        />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/dashboard"
          element={
            userData?.role === "educator" ? (
              <Dashboard />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/courses"
          element={
            userData?.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/createcourses"
          element={
            userData?.role === "educator" ? (
              <CreateCourse />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/editcourse/:courseId"
          element={
            userData?.role === "educator" ? (
              <EditCourse />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
