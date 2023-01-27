import { MovieThumb } from "../../types/movieType";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import MovieModal from "./MovieModal";
import { fetchMovieDetails } from "../../data/slices/apiSlice";
import { MoviePicker } from "../../MoviePicker/MoviePicker";
import { setNeedToUpdateFavorites } from "../../data/slices/coreSlice";
import { useState } from "react";
import { regularCardMediaStyle, regularCardStyle } from "./cardStyle";

export default function MovieCard({
  movie,
  dispatch,
  moviePicker,
}: {
  movie: MovieThumb;
  dispatch: any;
  moviePicker: MoviePicker;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    dispatch(setNeedToUpdateFavorites(false));
    await dispatch(fetchMovieDetails(movie.imdbID));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const addToFavorites = () => {
    moviePicker.pick(movie.Title);
    dispatch(setNeedToUpdateFavorites(true));
  };

  return (
    <Card sx={regularCardStyle} raised={true} component={"article"}>
      <CardMedia
        component="img"
        sx={regularCardMediaStyle}
        image={
          movie.Poster && movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/200x250"
        }
        alt={movie.Title}
        onClick={handleOpen}
      />
      <MovieModal
        open={open}
        handleClose={handleClose}
        movieId={movie.imdbID}
        moviePicker={moviePicker}
      />
    </Card>
  );
}
