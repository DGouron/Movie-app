import { MovieThumb } from "../../types/movieType";
import Card from "@mui/material/Card";
import MovieModal from "./MovieModal";
import { fetchMovieDetailsByTitle } from "../../data/slices/apiSlice";
import { MoviePicker } from "../../MoviePicker/MoviePicker";
import { setNeedToUpdateFavorites } from "../../data/slices/coreSlice";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { favoriteCardStyle, titleStyle } from "./cardStyle";

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
    await dispatch(fetchMovieDetailsByTitle(movie.Title));
    setOpen(true);
    dispatch(setNeedToUpdateFavorites(true));
  };
  const handleClose = () => setOpen(false);

  return (
    <Card sx={favoriteCardStyle} raised={true} component={"article"}>
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
        moviePicker={moviePicker}
      />
    </Card>
  );
}
