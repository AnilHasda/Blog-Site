import React, { useEffect, useState } from 'react';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getBlogData,getSearchData ,updateLoader} from '../../redux/slices/slices';
const Home = () => {
  let dispatch=useDispatch();
  let data=useSelector(state=>state.reducer.blogData);
  let loadingStatus=useSelector(state=>state.reducer.loadingStatus);
  return (
    <div className='flex items-center justify-center flex-col pt-5'>
      {(loadingStatus===false)?
      (data.length>0)?
      data.map(ele=>{
        return <NavLink to={`/readBlog/${ele._id}`} key={ele._id}><div className='h-auto w-[100vw] md:w-[800px]  mb-5 grid grid-col-1 sm:grid-cols-2 place-content-center gap-5'>
<div><img src={ele.cover_image} alt={ele.title} width="100%"/></div>
<div className=' flex justify-center items-center sm:items-start flex-col gap-4 pl-3'>
  <h2 className='font-semibold text-xl uppercase'>{ele.title}</h2>
  <h4 className='text-md'>{ele.summary}</h4>
</div>
        </div>
        </NavLink>
      }):<p>No such data found !</p>
    :<p>loading...</p>}
    </div>
  )
}

export default Home;