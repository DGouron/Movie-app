import { MovieThumb } from "../../types/movieType";
import Card from "@mui/material/Card";
import MovieModal from "./MovieModal";
import { fetchMovieDetails } from "../../data/slices/apiSlice";
import { MoviePicker } from "../../MoviePicker/MoviePicker";
import { setNeedToUpdateFavorites } from "../../data/slices/coreSlice";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const cardStyle = {
  display: "flex",
  flex: "0 1 15%",
  height: "60px",
  textAlign: "center",
  alignItems: "center",
};

const titleStyle = { p: 1, flex: "1 1 100%", textOverflow: "ellipsis" };

export default function MovieFavoriteCard({
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
    await dispatch(fetchMovieDetails(movie.imdbID));
    setOpen(true);
    moviePicker.pick(movie.Title);
    dispatch(setNeedToUpdateFavorites(true));
  };
  const handleClose = () => setOpen(false);

  return (
    <Card sx={cardStyle} raised={true} component={"article"}>
      <Typography
        variant="subtitle2"
        component="h2"
        sx={titleStyle}
        onClick={handleOpen}
      >
        {movie.Title}
      </Typography>
      <MovieModal
        open={open}
        handleClose={handleClose}
        movieTitle={movie.Title}
      />
    </Card>
  );
}
