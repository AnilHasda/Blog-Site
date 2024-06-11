import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  blogData: [],
  //  this state is used to hold data for searcing purpose
  searchData: [],
//   this state holds the status of loading status of api response
  loadingStatus: false,
  isLoggin:false,
  isOwner:false,
  userInfo:{
    id:null,
    user:null
  }
};
let globalData = createSlice({
  name: "blogData",
  initialState,
  reducers: {
    getBlogData: (state, action) => {
      state.blogData = action.payload;
    },
    // this function dispatch data for search operation only
    getSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    updateLoader: (state, action) => {
      state.loadingStatus = action.payload;
    },
    updateLoginStatus:(state,action)=>{
      console.log(action.payload)
      state.isLoggin=action.payload;
    },
    updateOwnerStatus:(state,action)=>{
      state.isOwner=action.payload;
    },
    updateUserInfo:(state,action)=>{
      state.userInfo.id=action.payload.id;
      state.userInfo.user=action.payload.user;
    }
  },
});
export const { getBlogData, getSearchData, updateLoader,updateLoginStatus,updateOwnerStatus,updateUserInfo } = globalData.actions;
export default globalData.reducer;
