import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"; 

const store = configureStore({
  reducer: {
    mycart: cartReducer, // Ensure the key is mycart
  },
});

export default store;
