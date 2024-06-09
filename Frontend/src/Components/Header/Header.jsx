import React from 'react';
import { NavLink } from 'react-router-dom';
import { ModeToggle } from '@/shadcnComponents/ui/toggleMode';
import { Input } from '@/shadcnComponents/ui/input';
const Header = () => {
  return (
    <div className='h-[80px] w-full flex justify-between items-center px-[10px] md:px-[70px] sticky top-0 left-0 border border-b-[#b5acac] mb-10 filter drop-shadow-md dark:bg-[#020817] bg-white'>
     <NavLink to="/"> <h3 className='font-bold text-xl'>My Tech Blogs</h3></NavLink>
      <div><Input type="text"placeholder='Search blogs with topics...'className='outline-none h-[35px] w-[80vw] md:w-[50vw] xl:w-[500px] rounded-md pl-[10px]'/></div>
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