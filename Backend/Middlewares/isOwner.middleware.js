import { authmodel } from "../Models/auth.model.js";
import { blog } from "../Models/addBlog.model.js";
const isAdmin=async (req,resp,next)=>{
    let checkOwner=await blog.find({user:req.name});
    if(checkOwner.length>0){

    }else{
        resp.status(200).json({isOwner:false});
    }
next();
}
export {isAdmin}