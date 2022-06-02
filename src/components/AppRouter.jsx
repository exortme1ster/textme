import React, {useContext } from "react";
import About from '../pages/About'
import '../styles/App.css'
import {Route, Routes, Navigate} from 'react-router-dom'
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import { AuthContext } from "../context";
import Loader from "./ UI/Loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext)
  if(isLoading) {
    return <Loader />
  }
  return ( 
    isAuth 
    ? 
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostIdPage />} />
      <Route path="/error" element={<Error />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate replace to="/posts"/>} />
    </Routes> 
    :
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate replace to="/login "/>} />
   </Routes> 
  )
}

export default AppRouter

