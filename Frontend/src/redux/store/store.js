import {configureStore} from "@reduxjs/toolkit";
import reducer from "../slices/slices";
export let store=configureStore({
    reducer:{
        reducer
    }
});
