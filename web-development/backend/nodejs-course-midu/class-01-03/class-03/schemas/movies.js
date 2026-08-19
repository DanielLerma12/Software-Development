const z = require("zod");

const baseMovieSchema = z.object({
  title: z.string(),
  year: z.number().int().min(1900).max(2026),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url(),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Crime",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ]),
  ),
});

const movieSchema = baseMovieSchema.extend({
  rate: baseMovieSchema.shape.rate.default(0),
});

function ValidateMovie(object) {
  return movieSchema.safeParse(object);
}

const partialMovieSchema = baseMovieSchema.partial();

function ValidatePartialMovie(object) {
  return partialMovieSchema.safeParse(object);
}

module.exports = {
  ValidateMovie,
  ValidatePartialMovie,
};
