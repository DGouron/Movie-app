import Stack from "@mui/material/Stack";
import { Provider } from "react-redux";
import MoviesList from "./components/movies/MoviesList";
import SearchBar from "./components/searchBar/SearchBar";
import store from "./data/store";

function App() {
  return (
    <Provider store={store}>
      <Stack spacing={2} bgcolor={"#0f171e"}>
        <SearchBar />
        <MoviesList />
      </Stack>
    </Provider>
  );
}

export default App;
