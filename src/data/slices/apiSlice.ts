import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieSearchResult } from "../../types/movieSearchResultType";
import { MoviesSearchParams } from "../../types/moviesSearchParamsType";

const API_KEY = "23aaa32";

export const fetchMovies = createAsyncThunk(
  "moviesApi/fetchMovies",
  async (moviesSearchParams: MoviesSearchParams) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${moviesSearchParams.titleToFind}&page=${moviesSearchParams.page}&plot=full`
    );
    const data = await response.json();
    return data as MovieSearchResult;
  }
);

const apiSlice = createSlice({
  name: "moviesApi",
  initialState: {
    movies: {} as MovieSearchResult,
    loadingStatus: "idle",
    error: "" as string | undefined,
    searchHistory: [] as MoviesSearchParams[],
  },

  reducers: {
    addSearchHistory: (state, action) => {
      console.log("addSearchHistory", action.payload);
      state.searchHistory.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loadingStatus = "loading";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loadingStatus = "succeeded";
      state.movies = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loadingStatus = "failed";
      state.error = action.error.message;
    });
  },
});

export const { addSearchHistory } = apiSlice.actions;
export default apiSlice.reducer;
