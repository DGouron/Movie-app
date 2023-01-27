import React, { useEffect } from "react";
import { MoviePicker } from "../../MoviePicker/MoviePicker";
import { LocalStorageMoviePickRepo } from "../../MoviePicker/LocalStorageMoviePickRepo";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Stack, Typography } from "@mui/material";
import store from "../../data/store";
import { MovieThumb } from "../../types/movieType";
import MovieFavoriteCard from "../movies/MovieFavoriteCard";

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
    setPicks(picks);
  };
  useEffect(() => {
    if (needUpdate) {
      updatePicks();
    }
  }, [needUpdate]);

  useEffect(() => {
    updatePicks();
  }, []);

  return (
    <section>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        color={"#ffff"}
        padding={"10px"}
      >
        Your movies tier list {picks.length > 0 ? "" : "is empty"}
      </Typography>
      <Container fixed>
        <Grid
          container
          justifyContent={"space-between"}
          padding={3}
          alignItems={"flex-start"}
          gap={3}
          sx={{ boxShadow: 1, borderRadius: 1 }}
          wrap={"wrap"}
        >
          {picks.sort().map((movieTitle) => {
            const movieThumb = {
              Title: movieTitle,
              Poster: "",
              imdbID: "unknown",
            } as MovieThumb;

            return (
              <MovieFavoriteCard
                movie={movieThumb}
                dispatch={dispatch}
                moviePicker={moviePicker}
                key={movieTitle}
              />
            );
          })}
        </Grid>
      </Container>
    </section>
  );
}

export default Favorite;
