import {
  Modal,
  Fade,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../../data/slices/apiSlice";
import store from "../../data/store";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MovieModal({
  open,
  handleClose,
  movieId,
}: {
  open: boolean;
  handleClose: () => void;
  movieId: string;
}) {
  const dispatch = useAppDispatch();
  const movieDetails = useSelector(
    (state: any) => state.moviesApi.targetMovieDetails
  );
  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
  }, [movieId]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {movieDetails.Title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {movieDetails.Year}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Genre : {movieDetails.Genre}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Director : {movieDetails.Director}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Actors : {movieDetails.Actors}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  marginTop={"10px"}
                >
                  {movieDetails.Plot}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              src={movieDetails.Poster}
              alt={movieDetails.Title}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default MovieModal;
