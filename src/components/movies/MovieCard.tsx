import React from "react";
import { MovieThumb } from "../../types/movieType";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import MovieModal from "./MovieModal";
import { fetchMovieDetails } from "../../data/slices/apiSlice";
import { MoviePicker } from "../../MoviePicker/MoviePicker";
import { setNeedToUpdateFavorites } from "../../data/slices/coreSlice";

export default function MovieCard({
  movie,
  dispatch,
  moviePicker,
}: {
  movie: MovieThumb;
  dispatch: any;
  moviePicker: MoviePicker;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = async () => {
    dispatch(setNeedToUpdateFavorites(false));
    await dispatch(fetchMovieDetails(movie.imdbID));
    setOpen(true);
    moviePicker.pick(movie.Title);
    dispatch(setNeedToUpdateFavorites(true));
  };
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        display: "flex",
        flex: "0 1 20%",
        maxHeight: "250px",
        maxWidth: "200px",
        minWidth: "200px",
        minHeight: "250px",
      }}
      raised={true}
    >
      <CardMedia
        component="img"
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
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
      />
    </Card>
  );
}
