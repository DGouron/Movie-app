import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "core",
  initialState: {
    needToUpdateFavorites: false,
  },
  reducers: {
    setNeedToUpdateFavorites: (state, action) => {
      state.needToUpdateFavorites = action.payload;
    },
  },
});

export const { setNeedToUpdateFavorites } = apiSlice.actions;
export default apiSlice.reducer;
