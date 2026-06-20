import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  onSelect: (movieId: number) => void;
  movies: Movie[];
}

export default function MovieGrid(props: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {props.movies.map((movie) => (
        <li
          key={movie.id}
          onClick={(event: React.MouseEvent<HTMLLIElement>) =>
            props.onSelect(+event.currentTarget.dataset.id!)
          }
          data-id={movie.id}
        >
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
