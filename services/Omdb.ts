import * as z from "zod";
import { MovieSearchResult } from "../src/types/movieSearchResultType";
import { MoviesSearchParams } from "../src/types/moviesSearchParamsType";
import { Movie, MovieThumb } from "../src/types/movieType";

const movieDetailedSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  Plot: z.string(),
  Actors: z.string(),
  Director: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Language: z.string(),
  Poster: z.string(),
});

const movieThumbSchema = z.object({
  imdbID: z.string(),
  Poster: z.string(),
  Title: z.string(),
});

const movieSearchResultSchema = z.object({
  Search: z.array(movieThumbSchema),
  totalResults: z.string(),
  Response: z.string(),
});

export class Omdb {
  private apiUrl: string;

  constructor() {
    this.apiUrl = "http://www.omdbapi.com/?apikey=23aaa32";
  }

  public async searchMovies(
    moviesSearchParams: MoviesSearchParams
  ): Promise<MovieSearchResult> {
    try {
      console.log(moviesSearchParams.page);
      const response = await fetch(
        `${this.apiUrl}&s=${moviesSearchParams.titleToFind}&page=${moviesSearchParams.page}&type=movie`
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      const parsedData = movieSearchResultSchema.parse(data);
      if (!parsedData) {
        throw new Error("Invalid data");
      }
      const movieSearchResult = {
        Search: parsedData.Search,
        totalResults: parsedData.totalResults,
        Response: parsedData.Response,
      } as MovieSearchResult;
      return movieSearchResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getMovieDetails(imdbId: string): Promise<Movie> {
    try {
      const response = await fetch(`${this.apiUrl}&i=${imdbId}&plot=short`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const parsedData = movieDetailedSchema.parse(data);
      if (!parsedData) {
        throw new Error("Invalid data");
      }
      const movie = {
        Title: parsedData.Title,
        Year: parsedData.Year,
        Plot: parsedData.Plot,
        Actors: parsedData.Actors,
        Director: parsedData.Director,
        Runtime: parsedData.Runtime,
        Genre: parsedData.Genre,
        Language: parsedData.Language,
        Poster: parsedData.Poster,
      } as Movie;
      return movie;
    } catch (error) {
      throw error;
    }
  }
}
