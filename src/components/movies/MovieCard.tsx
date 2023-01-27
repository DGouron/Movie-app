import { MovieThumb } from "../../types/movieType";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import MovieModal from "./MovieModal";
import { fetchMovieDetails } from "../../data/slices/apiSlice";
import { MoviePicker } from "../../MoviePicker/MoviePicker";
import { setNeedToUpdateFavorites } from "../../data/slices/coreSlice";
import { useState } from "react";

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
    <Card
      sx={{
        display: "flex",
        flex: "0 1 20%",
        maxHeight: "250px",
        maxWidth: "200px",
        minWidth: "200px",
        minHeight: "250px",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 0 10px 0 #000000",
        },
      }}
      raised={true}
      component={"article"}
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
        moviePicker={moviePicker}
      />
    </Card>
  );
}
