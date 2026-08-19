import { ValidateMovie, ValidatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel;
  }
  getAll = async (req, res) => {
    const { genre } = req.query;

    const movies = await this.movieModel.getAll({ genre });

    if (!movies)
      return res.status(400).json({ message: "Movie genre not found" });

    res.json(movies);
  };

  getById = async (req, res) => {
    // tambien se puede usar path-to-regexp
    const { id } = req.params;
    const movie = await this.movieModel.getById({ id });

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  };

  create = async (req, res) => {
    const result = ValidateMovie(req.body);

    if (!result.success) {
      // o !result.success
      return res.status(400).json(result.error.issues);
    }

    const newMovie = await this.movieModel.create({ input: result.data });

    res.status(201).json(newMovie);
  };

  update = async (req, res) => {
    const result = ValidatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json(result.error.issues);
    }

    const { id } = req.params;

    const updatedMovie = await this.movieModel.update({
      id,
      input: result.data,
    });

    if (!updatedMovie)
      return res.status(404).json({ message: "Movie not found" });

    return res.status(200).json(updatedMovie);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const movie = await this.movieModel.delete({ id });

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    return res.json({ message: "Movie deleted" });
  };
}
