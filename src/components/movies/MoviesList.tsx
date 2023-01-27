import {
  Pagination,
  Grid,
  Stack,
  PaginationItem,
  Container,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchData,
  fetchMovies,
  setCurrentPage,
} from "../../data/slices/apiSlice";
import store from "../../data/store";
import { MoviePicker } from "../../MoviePicker/MoviePicker";
import { MovieSearchResult } from "../../types/movieSearchResultType";
import { MoviesSearchParams } from "../../types/moviesSearchParamsType";
import { MovieThumb } from "../../types/movieType";
import SkeletonRow from "../loader/SkeletonRow";
import { mainTitleStyle, movieListGridStyle } from "./cardStyle";
import MovieCard from "./MovieCard";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default function MoviesList({
  moviePicker,
}: {
  moviePicker: MoviePicker;
}) {
  const dispatch = useAppDispatch();

  const moviesResult: MovieSearchResult = useSelector(
    (state: any) => state.moviesApi.movies
  );
  const moviesLoading = useSelector(
    (state: any) => state.moviesApi.loadingStatus
  );
  const currentPage = useSelector((state: any) => state.moviesApi.currentPage);
  const currentSearch = useSelector(
    (state: any) => state.moviesApi.currentSearch
  );

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const newSearchRequest = {
      titleToFind: currentSearch,
      page: page,
    } as MoviesSearchParams;
    dispatch(setCurrentPage(page));
    await dispatch(fetchMovies(newSearchRequest));
  };

  useEffect(() => {
    if (moviesLoading !== "succeeded") {
      dispatch(clearSearchData());
    }
  }, [moviesLoading]);

  return (
    <section>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        color={"#ffff"}
        padding={"10px"}
        sx={mainTitleStyle}
      >
        {parseInt(moviesResult?.totalResults) > 0
          ? "Movies found (" + moviesResult.totalResults + ")"
          : "What movie do you want ? Tell your wish in the search bar"}
      </Typography>
      <Stack
        alignItems={"center"}
        minHeight={"95vh"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        {moviesLoading === "loading" ? (
          <SkeletonRow />
        ) : parseInt(moviesResult?.totalResults) === 0 ||
          moviesResult.Response !== "True" ? (
          <h1>
            No movies (or too much) found for your search. Try again with
            another title or more letters.
          </h1>
        ) : (
          <Container fixed>
            <Grid container sx={movieListGridStyle}>
              {moviesResult.Search?.map((movie: MovieThumb) => (
                <MovieCard
                  movie={movie}
                  key={movie.imdbID}
                  dispatch={dispatch}
                  moviePicker={moviePicker}
                />
              ))}
            </Grid>
          </Container>
        )}
        <Pagination
          count={Math.round(parseInt(moviesResult?.totalResults) / 10)}
          page={currentPage}
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
    </section>
  );
}
