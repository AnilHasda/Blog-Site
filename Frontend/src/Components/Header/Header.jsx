import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { ModeToggle } from '@/shadcnComponents/ui/toggleMode';
import { Input } from '@/shadcnComponents/ui/input';
import { useSelector ,useDispatch} from 'react-redux';
import { getBlogData,getSearchData } from '@/redux/slices/slices';
import { updateLoader,updateLoginStatus } from '@/redux/slices/slices';
import Toast from "react-hot-toast";
import axios from "axios";
const Header = () => {
let searchData=useSelector(state=>state.reducer.searchData);
let blog=useSelector(state=>state.reducer.blogData);
let isLoggin=useSelector(state=>state.reducer.isLoggin);
let dispatch=useDispatch();
let navigate=useNavigate();

// get loggin info
const getLogInfo=async ()=>{
  try{
  let {data}=await axios.get("http://localhost:4000/api/v1/auth/isUserLoggin",{withCredentials:true});
  console.log(data);
  dispatch(updateLoginStatus(data.isLoggin));
  }catch(error){
    console.log(error);
    dispatch(updateLoginStatus(error.response?.data?.isLoggin || false));
  }
}

const getBlogs=async ()=>{
  try{
    dispatch(updateLoader(true));
let {data}=await axios.get("http://localhost:4000/api/v1/getBlogs");
if(data){
dispatch(getBlogData(data.message));
dispatch(getSearchData(data.message));
 dispatch(updateLoader(false));
}
  }catch(error){
console.log(error);
  }
}
React.useEffect(()=>{
getBlogs();
getLogInfo();
},[])
  //  search function 
  const searchBlog= (key)=>{
    dispatch(updateLoader(true));
    let searchResponse=searchData.filter(ele=>{
      let title=ele.title.toLowerCase();
      let summary=ele.summary.toLowerCase();
      return title.includes(key) || summary.includes(key)
    });
    console.log(searchResponse)
    dispatch(getBlogData(searchResponse));
    dispatch(updateLoader(false));
    console.log({blog});
  }
  // function for log out 
  async function logout(){
    try{
let {data}=await axios.get("http://localhost:4000/api/v1/auth/logout",{withCredentials:true});
Toast.success(data.message);
dispatch(updateLoginStatus(data.isLoggin || false));
navigate("/");
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className='h-[80px] w-full flex justify-between items-center px-[10px] md:px-[70px] sticky top-0 left-0 border border-b-[#b5acac] mb-10 filter drop-shadow-md dark:bg-[#020817] bg-white'>
     <NavLink to="/"> <h3 className='font-bold text-xl'>My Tech Blogs</h3></NavLink>
      <div><Input type="text"placeholder='Search blogs with topics...'className='outline-none h-[35px] w-[80vw] md:w-[50vw] xl:w-[500px] rounded-md pl-[10px]'onChange={e=>searchBlog(e.target.value.toLowerCase())}/></div>
      <div className='flex items-center gap-6'>
        {isLoggin===false &&
        <>
        <NavLink to="/login"><p>Login</p></NavLink>
        <NavLink to="/signup"><p>Sign up</p></NavLink>
        </>
        }
       <NavLink to="/addBlog"><p>Add Blogs</p></NavLink>
       {isLoggin===true &&
       <NavLink to="#"onClick={logout}><p>Log out</p></NavLink>
       }
       <ModeToggle/>
      </div>
      </div>
  )
}

export default Header;