const logout=(req,resp)=>{
let access_token=req.cookies.access_token;
let refresh_token=req.cookies.refresh_token;
resp.clearCookie("access_token");
resp.clearCookie("refresh_token");
resp.status(200).json({message:"log out successfully",isLoggin:false});
}
export {logout};