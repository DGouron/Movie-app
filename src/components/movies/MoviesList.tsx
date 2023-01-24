import { Pagination, Grid, Stack, PaginationItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addSearchHistory, fetchMovies } from "../../data/slices/apiSlice";
import store from "../../data/store";
import { MoviesSearchParams } from "../../types/moviesSearchParamsType";
import SkeletonRow from "../loader/SkeletonRow";
import MovieCard from "./MovieCard";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

function MoviesList() {
  const dispatch = useAppDispatch();

  const moviesSearch = useSelector(
    (state: any) => state.moviesApi.movies.Search
  );
  const moviesSearchResponse = useSelector(
    (state: any) => state.moviesApi.movies.Response
  );
  const moviesTotalResults = useSelector(
    (state: any) => state.moviesApi.movies.totalResults
  );
  const moviesFetchingError = useSelector(
    (state: any) => state.moviesApi.movies.Error
  );
  const moviesLoading = useSelector(
    (state: any) => state.moviesApi.loadingStatus
  );
  const searchHistory = useSelector(
    (state: any) => state.moviesApi.searchHistory
  );

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const lastRequest: MoviesSearchParams =
      searchHistory[searchHistory.length - 1];
    console.log("NEW PAGE", page);
    const newSearchRequest = {
      ...lastRequest,
      page: page,
    } as MoviesSearchParams;
    await dispatch(fetchMovies(newSearchRequest));
    if (moviesLoading === "succeeded") {
      dispatch(addSearchHistory(newSearchRequest));
    }
  };

  return (
    <Stack
      alignItems={"center"}
      minHeight={"90vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      {moviesLoading === "loading" ? (
        <SkeletonRow />
      ) : moviesTotalResults === 0 || moviesSearchResponse !== "True" ? (
        <h1>{moviesFetchingError}</h1>
      ) : (
        <>
          <Grid
            container
            justifyContent={"flex-start"}
            padding={3}
            alignItems={"flex-start"}
            gap={3}
            sx={{ boxShadow: 1 }}
            wrap={"wrap"}
          >
            {moviesSearch?.map((movie: any) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
          </Grid>
        </>
      )}
      <Pagination
        count={Math.round(moviesTotalResults / 10)}
        variant="outlined"
        renderItem={(item) => {
          return (
            <PaginationItem
              {...item}
              sx={{
                color: "#fff",
                bgcolor: "#0f171e",
                borderColor: "#ffffff",
              }}
            />
          );
        }}
        shape="rounded"
        onChange={(event: React.ChangeEvent<unknown>, page: number) =>
          handlePageChange(event, page)
        }
        color="primary"
        size="large"
        sx={{
          margin: 3,
        }}
      />
    </Stack>
  );
}

export default MoviesList;
