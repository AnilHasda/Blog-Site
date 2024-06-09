import React, {  useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import Toast from "react-hot-toast";
import axios from "axios";
import { Input } from '@/shadcnComponents/ui/input';
import { Button } from '@/shadcnComponents/ui/button';

const AddBlog = () => {
  let  [details,setDetails]=useState("");
  let [formData,setFormData]=useState({});
  let [image,setImage]=useState("");
  let [previewImage,setPreviewImage]=useState("");
  function handleFormData(e){
let {name,value}=e.target;
setFormData(prev=>({...prev,[name]:value}));
  }
  async function handleForm(e){
    e.preventDefault();
   try {
    let sentData=new FormData();
    sentData.append("title",formData.title);
    sentData.append("summary",formData.summary);
    sentData.append("cover_image",image);
    sentData.append("details",details);
    console.log(formData)
    let {data}=await axios.post("http://localhost:4000/api/v1/addBlog",sentData,{
      withCredentials:true,
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    if(data){
      console.log(data);
    Toast.success(data.message);
    }
   } catch (error) {
    console.log(error);
Toast.error("error while adding data");
   }
  }
  // function for preview image
  function preview(e){
let file=e.target.files[0];
setPreviewImage(URL.createObjectURL(file));
  }
  return (
    <>
    <div id="editor" className='w-full h-auto  max-w-[600px] m-auto mt-[100px]'>
      <form onSubmit={handleForm} method="post"encType='multipart/form-data'>
      <Input type="text"className='w-full h-[35px] mt-5 outline-none border border-[#ddd] px-[10px]'placeholder='Title'name="title"onChange={handleFormData} required/>
      <Input type="text"className='w-full h-[35px] mt-5 outline-none border border-[#ddd] px-[10px]'placeholder='Summary'name="summary"onChange={handleFormData} required/>
      <Input type="file"name="cover_image"className='w-full h-[35px] mt-5  outline-none border border-[#ddd] mb-5'onChange={e=>{setImage(e.target.files[0]);preview(e)}} required/>
      {previewImage && 
      <div>
      <p>Preview:</p>
      <div className='w-auto'><img src={previewImage} alt="preview-image" width="200px"/></div>
      </div>
      }
    <ReactQuill theme="snow" value={details} 
                  modules={{ toolbar: true }}
    formats={[
                'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent', 'link', 'image'
              ]} onChange={setDetails}/>
    <Button type="submit" className='w-full h-[40px] mt-5'>Create Post</Button>
    </form>
    </div>
    </>
  );
}

export default AddBlog;