import React, { useEffect,useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import Toast from "react-hot-toast";

const CustomizeBlog = () => {
    let [blog,setBlog]=useState([]);
    let data=useSelector(state=>state.reducer.blogData);
    let {id}=useParams();
    function findBlog(){
        let filterBlogInfo=data?.filter(ele=>ele._id===id);
        console.log(filterBlogInfo);
        setBlog(filterBlogInfo);
    }
    useEffect(()=>{
        findBlog();
    },[data,id]);

    // function to delete blog
    const deleteBlog=async ()=>{
        try{
    let {data}=await axios.delete("http://localhost:4000/api/v1/deleteBlog/"+id);
    console.log(data);
    Toast.success("data deleted successfully");
    window.location.href="/";
        }catch(error){
            console.log(error);
            Toast.error("Failed to delete data");
        }
    }
    if(blog.length>0){
        return (
            <div className='grid place-content-center pt-5 text-center'>
                <div className='text-center font-semibold text-xl uppercase'>{blog[0].title}</div>
                <div className='max-w-[600px] h-auto my-5'><img src={blog[0]?.cover_image} alt={blog[0]?.title} width="100%"/></div>
                <div className=' text-xl'>{blog[0].summary}</div>
                <div dangerouslySetInnerHTML={{ __html: blog[0].details }}></div>
                <div className='flex justify-between items-center text-[20px] my-5'>
                <div className='flex gap-4 items-center'><AiOutlineLike/><AiOutlineDislike/></div>
                    <div className='flex gap-4 items-center'><FaRegEdit/><FaRegTrashCan onClick={deleteBlog}/></div>
                </div>
            </div>
          )
    }
    return <div>loading...</div>
}

export default CustomizeBlog;