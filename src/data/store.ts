import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    moviesApi: apiSlice,
  },
});

export default store;
