import React from "react";
import { MovieThumb } from "../../types/movieType";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import MovieModal from "./MovieModal";
import { fetchMovieDetails } from "../../data/slices/apiSlice";

export default function MovieCard({
  movie,
  dispatch,
}: {
  movie: MovieThumb;
  dispatch: any;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = async () => {
    await dispatch(fetchMovieDetails(movie.imdbID));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        display: "flex",
        flex: "0 1 20%",
        maxHeight: "250px",
        maxWidth: "200px",
      }}
      raised={true}
    >
      <CardMedia
        component="img"
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        image={movie.Poster}
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
