import {
  Modal,
  Fade,
  Box,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchMovieDetails,
  fetchMovieDetailsByTitle,
} from "../../data/slices/apiSlice";
import store from "../../data/store";
import { MoviePicker } from "../../MoviePicker/MoviePicker";
import AddToFavoritesButton from "../favorite/AddToFavoriteButton";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "90vw",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 2,
};

function MovieModal({
  open,
  handleClose,
  movieId = "",
  movieTitle = "",
  moviePicker,
}: {
  open: boolean;
  handleClose: () => void;
  movieId?: string;
  movieTitle?: string;
  moviePicker: MoviePicker;
}) {
  const dispatch = useAppDispatch();
  const movieDetails = useSelector(
    (state: any) => state.moviesApi.targetMovieDetails
  );
  useEffect(() => {
    if (movieId === "unknown") {
      dispatch(fetchMovieDetailsByTitle(movieTitle));
    } else {
      dispatch(fetchMovieDetails(movieId));
    }
  }, [movieId]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      component={"aside"}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="h2" variant="h5">
                  {movieDetails.Title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="p"
                >
                  {movieDetails.Year}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  Genre : {movieDetails.Genre}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  Director : {movieDetails.Director}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  Actors : {movieDetails.Actors}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  color="text.secondary"
                  marginTop={"10px"}
                >
                  {movieDetails.Plot}
                </Typography>
              </CardContent>
            </Box>
            <Box>
              <AddToFavoritesButton
                moviePicker={moviePicker}
                movieTitle={movieDetails.Title}
                dispatch={dispatch}
              />
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                src={movieDetails.Poster}
                alt={movieDetails.Title}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default MovieModal;
