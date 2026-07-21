import React from 'react'
import { Route,Routes } from "react-router-dom";
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'


function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<Login/>}/>
    </Routes>
    
    </>
  )
}

export default App