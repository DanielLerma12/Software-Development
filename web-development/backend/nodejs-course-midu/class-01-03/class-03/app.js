const express = require("express");
const cors = require("cors");

const pico = require("picocolors");

const movies = require("./movies.json");
const crypto = require("node:crypto");
const { ValidateMovie, ValidatePartialMovie } = require("./schemas/movies.js");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://127.0.0.1:5500",
        "http://localhost:1234",
        "https://movies.com",
        "https://midu.dev",
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "hola mundo" });
});

// Todos los recursos que sean MOVIES se identifica con /movies
app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()),
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  // tambien se puede usar path-to-regexp
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);

  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
  const result = ValidateMovie(req.body);

  if (!result.success) {
    // o !result.success
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);
  res.status(201).json(movies);
});

app.patch("/movies/:id", (req, res) => {
  const result = ValidatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1)
    return res.status(404).json({ message: "Movie not found" });

  const UpdatedMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = UpdatedMovie;
  return res.status(200).json(UpdatedMovie);
});

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: "Movie deleted" });
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(
    pico.magenta(`server listening in port: http://localhost:${PORT}`),
  );
});
