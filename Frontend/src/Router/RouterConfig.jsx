import React from 'react'
import {BrowserRouter,Routes,Route, Outlet} from "react-router-dom";
import Home from '../Components/Home/Home';
import Layout from '../Components/Outlet/Layout';
import Login from '../Components/Login/Login';
import Signup from '../Components/Signup/Signup';
import AddBlog from '../Components/AddBlog/AddBlog';
import CustomizeBlog from '../Components/customizeBlog/customizeBlog';
const RouterConfig = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/"element={<Layout/>}>
        <Route exact path="/"element={<Home/>}/>
        <Route  path="/login"element={<Login/>}/>
        <Route  path="/signup"element={<Signup/>}/>
        <Route  path="/addBlog"element={<AddBlog/>}/>
        <Route path="/readBlog/:id"element={<CustomizeBlog/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default RouterConfig