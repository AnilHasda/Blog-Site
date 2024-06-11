const isUserLoggin=(req,resp)=>{
    resp.status(201).json({message:"user found || login",isLoggin:true,id:req.userId,user:req.user});
}
export {isUserLoggin};