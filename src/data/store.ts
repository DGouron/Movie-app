import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slices/apiSlice";
import coreSlice from "./slices/coreSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    moviesApi: apiSlice,
    core: coreSlice,
  },
});

export default store;
