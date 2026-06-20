import { useState } from "react";
import css from "./App.module.css";
import "modern-normalize";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadError, setIsLoadError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = (formData: FormData) => {
    setMovies([]);
    setIsLoading(true);
    setIsLoadError(false);
    const input = formData.get("query") as string;
    if (input.trim().length === 0) {
      toast.error("Please enter your search query.");
      return;
    }

    fetchMovies({ page: 1, query: input.trim() })
      .then((movieResponse) => {
        if (movieResponse.length === 0) {
          toast.error("No movies found for your request.");
          return;
        }
        setMovies(movieResponse);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoadError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSelect = (movieId: string) => {
    setSelectedMovie(movies.find(({ id }) => id.toString() === movieId)!);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleSubmit}></SearchBar>
      {isLoading && <Loader />}
      {isLoadError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={movies} />
      )}
      {selectedMovie !== null && (
        <MovieModal movie={selectedMovie} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default App;
