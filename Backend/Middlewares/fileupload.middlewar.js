import multer from "multer";

let storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"./uploadFiles");
    },
    filename:function (req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});
let uploadFiles=multer({storage});
export {uploadFiles};