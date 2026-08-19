import { MovieModel } from "./models/prisma/movie.js";
import { createApp } from "./app.js";

createApp({ movieModel: MovieModel });
