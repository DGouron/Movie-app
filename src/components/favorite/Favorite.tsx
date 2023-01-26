import React, { useEffect } from "react";
import { MoviePicker } from "../../MoviePicker/MoviePicker";
import { LocalStorageMoviePickRepo } from "../../MoviePicker/LocalStorageMoviePickRepo";
import { useDispatch, useSelector } from "react-redux";
import { Container, Stack, Typography } from "@mui/material";
import MovieCard from "../movies/MovieCard";
import store from "../../data/store";
import { MovieThumb } from "../../types/movieType";

interface FavoriteProps {
  moviePicker: MoviePicker;
  moviePickRepo: LocalStorageMoviePickRepo;
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

function Favorite({ moviePicker, moviePickRepo }: FavoriteProps) {
  const dispatch = useAppDispatch();

  const needUpdate = useSelector(
    (state: any) => state.core.needToUpdateFavorites
  );
  const [picks, setPicks] = React.useState<string[]>([]);

  const updatePicks = async () => {
    const picks = await moviePickRepo.getAll();
    console.log("updatePicks -> ", picks);
    setPicks(picks);
  };
  useEffect(() => {
    if (needUpdate) {
      updatePicks();
    }
  }, [needUpdate]);

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom color={"#ffff"}>
        Favorite Movies :{" "}
      </Typography>
      <Stack direction="row" spacing={2} flexWrap={"wrap"} gap={"10px"}>
        {picks.sort().map((movieTitle) => {
          const movieThumb = {
            Title: movieTitle,
            Poster: "",
            imdbID: "",
          } as MovieThumb;

          return (
            <MovieCard
              movie={movieThumb}
              dispatch={dispatch}
              moviePicker={moviePicker}
              key={movieTitle}
            />
          );
        })}
      </Stack>
    </>
  );
}

export default Favorite;
