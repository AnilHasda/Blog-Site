const tryCatchWrapper=(requestHandler)=>{
return async (req,resp,next)=>{
    try {
       await  requestHandler(req,resp,next);
    } catch (error) {
        next({errorCode:error.code,message:error.keyValue});
    }
}
}
export {tryCatchWrapper};