import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieSearchResult } from "../../types/movieSearchResultType";
import { MoviesSearchParams } from "../../types/moviesSearchParamsType";
import { Omdb } from "../../../services/Omdb";
import { Movie } from "../../types/movieType";

const omdb = new Omdb();

export const fetchMovies = createAsyncThunk(
  "moviesApi/fetchMovies",
  async (moviesSearchParams: MoviesSearchParams) => {
    const data = await omdb.searchMovies(moviesSearchParams);
    return data;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "moviesApi/fetchMovieDetails",
  async (imdbId: string) => {
    const data = await omdb.getMovieDetails(imdbId, "i");
    return data;
  }
);
export const fetchMovieDetailsByTitle = createAsyncThunk(
  "moviesApi/fetchMovieDetailsByTitle",
  async (imdbId: string) => {
    const data = await omdb.getMovieDetails(imdbId, "t");
    return data;
  }
);

const apiSlice = createSlice({
  name: "moviesApi",
  initialState: {
    movies: {} as MovieSearchResult,
    loadingStatus: "idle",
    error: "" as string | undefined,
    targetMovieDetails: {} as Movie,
    fetchMovieDetailsError: "" as string | undefined,
    loadingDetailsStatus: "idle",
    currentSearch: "" as string | undefined,
    currentPage: 1,
  },

  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentSearch: (state, action) => {
      state.currentSearch = action.payload;
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
    builder.addCase(fetchMovieDetails.pending, (state, action) => {
      state.loadingDetailsStatus = "loading";
    });
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.loadingDetailsStatus = "succeeded";
      state.targetMovieDetails = action.payload;
    });
    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.loadingDetailsStatus = "failed";
      state.fetchMovieDetailsError = action.error.message;
    });
    builder.addCase(fetchMovieDetailsByTitle.pending, (state, action) => {
      state.loadingDetailsStatus = "loading";
    });
    builder.addCase(fetchMovieDetailsByTitle.fulfilled, (state, action) => {
      state.loadingDetailsStatus = "succeeded";
      state.targetMovieDetails = action.payload;
    });
    builder.addCase(fetchMovieDetailsByTitle.rejected, (state, action) => {
      state.loadingDetailsStatus = "failed";
      state.fetchMovieDetailsError = action.error.message;
    });
  },
});

export const { setCurrentPage, setCurrentSearch } = apiSlice.actions;
export default apiSlice.reducer;
