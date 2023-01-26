import Stack from "@mui/material/Stack";
import { Provider } from "react-redux";
import Favorite from "./components/favorite/Favorite";
import MoviesList from "./components/movies/MoviesList";
import SearchBar from "./components/searchBar/SearchBar";
import store from "./data/store";
import { LocalStorageMoviePickRepo } from "./MoviePicker/LocalStorageMoviePickRepo";
import { MoviePicker } from "./MoviePicker/MoviePicker";
import { MoviePickRepo } from "./MoviePicker/MoviePickRepo";

function App() {
  let moviePicker: MoviePicker;
  let moviePickRepo: MoviePickRepo;

  moviePickRepo = new LocalStorageMoviePickRepo();
  moviePicker = new MoviePicker(moviePickRepo);

  return (
    <Provider store={store}>
      <Stack spacing={2} bgcolor={"#0f171e"}>
        <SearchBar />
        <Favorite moviePickRepo={moviePickRepo} moviePicker={moviePicker} />
        <MoviesList moviePicker={moviePicker} />
      </Stack>
    </Provider>
  );
}

export default App;
