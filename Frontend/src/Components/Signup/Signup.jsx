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

const Signup = () => {
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
  const registerUser=async (e)=>{
    e.preventDefault();
    console.log(formData)
    let {password,cpassword}=formData;
    console.log({password,cpassword});
    if(cpassword===password){
    e.preventDefault();
    try{
let {data}=await axios.post("http://localhost:4000/api/v1/auth/registration",formData,{
  withCredentials:true,
});
Toast.success(data.message);
 navigate("/");
}catch(error){
  console.log(error)
  Toast.error(error.response.data.message);
}
}else{
  Toast.error("password most be same");
}
  }
  return (
    <div className='flex justify-center pt-5'>
<Card className="w-[350px] p-5 pb-10">
  <CardHeader>
    <CardTitle>Signup Form</CardTitle>
   </CardHeader>
   <form onSubmit={registerUser}>
   <Input type="text"placeholder="enter first name"name="first_name"autoComplete="off"onChange={handleFormData}/>
   <Input type="text"placeholder="enter last name"name="last_name"className="my-5"autoComplete="off"onChange={handleFormData}/>
   <Input type="text"placeholder="enter user name"name="user"autoComplete="off"onChange={handleFormData}/>
   <Input type="email"placeholder="enter email"name="email"className="my-5"autoComplete="off"onChange={handleFormData}/>
   <Input type="password"placeholder="enter password"name="password"className="mb-5"autoComplete="off"onChange={handleFormData}/>
   <Input type="password"placeholder="enter password again"name="cpassword"className="mb-5"autoComplete="off"onChange={handleFormData}/>
   <Button className="w-full">Login</Button>
   </form>
</Card>
</div>
  )
}

export default Signup;