import React, { useEffect,useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/shadcnComponents/ui/card";
import { Input } from '@/shadcnComponents/ui/input';
import { Button } from '@/shadcnComponents/ui/button';

const Login = () => {
  let [formData,setFormData]=useState({});
  let navigate=useNavigate();
  const handleFormData=(e)=>{
    let {name,value}=e.target;
    setFormData(prev=>{
      let data={...prev,[name]:value};
      console.log(data);
      return data;
    })
  }
  const loginUser=async (e)=>{
    e.preventDefault();
    try{
let {data}=await axios.post("http://localhost:4000/api/v1/auth/authontication",formData,{
  withCredentials:true,
});
console.log(data)
Toast.success(data.message);
navigate("/");
}catch(error){
  console.log(error)
  Toast.error(error.response.data.message);
}
  }
  return (
    <div className='flex justify-center pt-5'>
<Card className="w-[300px] p-5 pb-10">
  <CardHeader>
    <CardTitle>Login Form</CardTitle>
   </CardHeader>
   <form onSubmit={loginUser}>
   <Input type="text"placeholder="enter user name"name="user"autoComplete="off"onChange={handleFormData}/>
   <Input type="password"placeholder="enter password"name="password"className="my-5"autoComplete="off"onChange={handleFormData}/>
   <Button className="w-full">Login</Button>
   </form>
</Card>
</div>
  )
}

export default Login