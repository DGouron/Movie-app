import {
  Pagination,
  Grid,
  Stack,
  PaginationItem,
  Container,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setCurrentPage } from "../../data/slices/apiSlice";
import store from "../../data/store";
import { MoviePicker } from "../../MoviePicker/MoviePicker";
import { MoviesSearchParams } from "../../types/moviesSearchParamsType";
import { MovieThumb } from "../../types/movieType";
import SkeletonRow from "../loader/SkeletonRow";
import MovieCard from "./MovieCard";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default function MoviesList({
  moviePicker,
}: {
  moviePicker: MoviePicker;
}) {
  const dispatch = useAppDispatch();

  const moviesResult = useSelector((state: any) => state.moviesApi.movies);
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

  return (
    <Stack
      alignItems={"center"}
      minHeight={"95vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Typography variant="h5" component="h2" gutterBottom color={"#ffff"}>
        Movies :{" "}
      </Typography>
      {moviesLoading === "loading" ? (
        <SkeletonRow />
      ) : moviesResult.totalResult === 0 || moviesResult.Response !== "True" ? (
        <h1>{moviesResult.Error}</h1>
      ) : (
        <Container>
          <Grid
            container
            justifyContent={"flex-start"}
            padding={3}
            alignItems={"flex-start"}
            gap={3}
            sx={{ boxShadow: 1 }}
            wrap={"wrap"}
          >
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
        count={Math.round(moviesResult.totalResult / 10)}
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
  );
}
