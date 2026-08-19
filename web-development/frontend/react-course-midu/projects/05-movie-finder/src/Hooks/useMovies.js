import { useState, useRef, useMemo } from "react";
import { searchMovies } from "../Services/movies";

export function useMovies({ sort }) {
  const searchDb = useRef("");
  const [movies, setMovies] = useState([]);

  const getMovies = async ({ search }) => {
    if (searchDb.current === search) return;
    else searchDb.current = search;

    const newMovies = await searchMovies({ search });
    setMovies(newMovies);
  };

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [movies, sort]);

  return { movies: sortedMovies, getMovies };
}
