const isUserLoggin=(req,resp)=>{
    resp.status(201).json({message:"user found || login",isLoggin:true,userId:req.userId});
}
export {isUserLoggin};