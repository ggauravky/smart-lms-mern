import React from 'react'
import { Route,Routes } from "react-router-dom";
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { ToastContainer } from "react-toastify"
import getCurrentUser from './customHooks/getCurrentUser';



export const serverUrl = "http://localhost:8000";

function App() {
  getCurrentUser();
  return (
    <>
    <ToastContainer/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    
    </>
  )
}

export default App