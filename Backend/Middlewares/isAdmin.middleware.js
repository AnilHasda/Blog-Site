import { authmodel } from "../Models/auth.model.js";
const isAdmin=(req,resp,next)=>{
    
next();
}
export {isAdmin}