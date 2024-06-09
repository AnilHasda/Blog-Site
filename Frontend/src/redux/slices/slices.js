import {createSlice} from "@reduxjs/toolkit";

let initialState={
blogData:[],
}
let globalData=createSlice({
    name:"blogData",
    initialState,
    reducers:{
    getBlogData:(state,action)=>{
        state.blogData=action.payload;
    }
    }
});
export const {getBlogData}=globalData.actions;
export default globalData.reducer;