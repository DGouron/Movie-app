import { MovieSearchResult } from "../../types/movieSearchResultType";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import React from "react";
import MovieModal from "./MovieModal";

export default function MovieCard({ movie }: { movie: MovieSearchResult }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
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
