import React from 'react';
import { NavLink } from 'react-router-dom';
import { ModeToggle } from '@/shadcnComponents/ui/toggleMode';
import { Input } from '@/shadcnComponents/ui/input';
import { useSelector ,useDispatch} from 'react-redux';
import { getBlogData,getSearchData } from '@/redux/slices/slices';
import { updateLoader } from '@/redux/slices/slices';
import axios from "axios";
const Header = () => {
let searchData=useSelector(state=>state.reducer.searchData);
let blog=useSelector(state=>state.reducer.blogData);
let dispatch=useDispatch();

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
  return (
    <div className='h-[80px] w-full flex justify-between items-center px-[10px] md:px-[70px] sticky top-0 left-0 border border-b-[#b5acac] mb-10 filter drop-shadow-md dark:bg-[#020817] bg-white'>
     <NavLink to="/"> <h3 className='font-bold text-xl'>My Tech Blogs</h3></NavLink>
      <div><Input type="text"placeholder='Search blogs with topics...'className='outline-none h-[35px] w-[80vw] md:w-[50vw] xl:w-[500px] rounded-md pl-[10px]'onChange={e=>searchBlog(e.target.value.toLowerCase())}/></div>
      <div className='flex items-center gap-6'>
        <NavLink to="/login"><p>Login</p></NavLink>
        <NavLink to="/signup"><p>Sign up</p></NavLink>
       <NavLink to="/addBlog"><p>Add Blogs</p></NavLink>
       <ModeToggle/>
      </div>
      </div>
  )
}

export default Header;