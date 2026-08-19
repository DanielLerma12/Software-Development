import movies from "../../local/movies.json" with { type: "json" };
import crypto from "node:crypto";

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()),
      );

      if (filteredMovies.length === 0) return false;
      return filteredMovies;
    }

    return movies;
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);

    if (movie) return movie;
    return movie;
  }

  static async create({ input }) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...input,
    };

    movies.push(newMovie);

    return newMovie;
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) return false;

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input,
    };

    return movies[movieIndex];
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  }
}
