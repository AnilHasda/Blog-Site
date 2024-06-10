
import mongoose, {Schema,model} from "mongoose";
const addBlogSchema=new Schema({
    owner:{
    type:Schema.Types.ObjectId,ref:"authmodels"
    },
    title:{
        type:String,
        required:true,
    },
    summary:{
        type:String,
        required:true,
    },
    cover_image:{
        type:String,
        require:true,
    },
    details:{
        type:String,
        required:true
    }
},{timestamps:true})
const blog=model("blog",addBlogSchema);
export {blog};