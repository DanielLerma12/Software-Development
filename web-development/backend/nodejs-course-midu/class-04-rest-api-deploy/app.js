import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { createMovieRouter } from "./routes/movies.js";
import pico from "picocolors";

export const createApp = ({ movieModel }) => {
  const app = express();

  app.use(json());

  app.use(corsMiddleware());

  app.use("/movies", createMovieRouter({ movieModel }));

  const PORT = process.env.PORT ?? 1234; // usar en despliegue la variable de entorno del proceso

  app.listen(PORT, () => {
    console.log(
      pico.magenta(`server listening in port: http://localhost:${PORT}`),
    );
  });
};
