import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  blogData: [],
  //  this state is used to hold data for searcing purpose
  searchData: [],
//   this state holds the status of loading status of api response
  loadingStatus: false,
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
  },
});
export const { getBlogData, getSearchData, updateLoader } = globalData.actions;
export default globalData.reducer;
