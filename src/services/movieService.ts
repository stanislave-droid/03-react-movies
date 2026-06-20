import axios from "axios";
import type { Movie } from "../types/movie";

interface fetchMoviesProps {
  page: number;
  query: string;
}

interface MovieHTTPResponse {
  results: Movie[];
}

export default async function fetchMovies(props: fetchMoviesProps) {
  const { data } = await axios.get<MovieHTTPResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        page: props.page,
        query: props.query,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    },
  );

  return data.results;
}
