import { prisma } from "../../lib/prisma.js";

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const movies = await prisma.movie.findMany({
        where: {
          genres: {
            some: {
              name: {
                equals: genre,
                mode: "insensitive",
              },
            },
          },
        },
        include: {
          genres: true,
        },
      });

      if (movies.length === 0) return false;

      return movies.map((movie) => ({
        ...movie,
        rate: Number(movie.rate.toFixed(1)),
        genres: movie.genres.map((genre) => genre.name),
      }));
    }

    const movies = await prisma.movie.findMany({
      include: {
        genres: true,
      },
    });

    return movies.map((movie) => ({
      ...movie,
      rate: Number(movie.rate.toFixed(1)),
      genres: movie.genres.map((genre) => genre.name),
    }));
  }

  static async getById({ id }) {
    try {
      const movie = await prisma.movie.findUnique({
        where: {
          id,
        },
        include: {
          genres: true,
        },
      });

      return {
        ...movie,
        rate: Number(movie.rate),
        genres: movie.genres.map((genre) => genre.name),
      };
    } catch (e) {
      console.log("Error al buscar la id, la id no existe en la base de datos");
      return null;
    }
  }

  static async create({ input }) {
    const { title, year, director, duration, rate, poster, genre } = input;

    const genres = [];

    for (const genreName of genre) {
      const genreFound = await prisma.genre.findUnique({
        where: {
          name: genreName,
        },
      });

      if (!genreFound) {
        throw new Error(`Genre ${genreName} not found`);
      }

      genres.push({
        id: genreFound.id,
      });
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        year,
        director,
        duration,
        rate,
        poster,

        genres: {
          connect: genres,
        },
      },

      include: {
        genres: true,
      },
    });

    return {
      ...movie,
      rate: Number(movie.rate),
      genres: movie.genres.map((genre) => genre.name),
    };
  }

  static async update({ id, input }) {
    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) return false;

    const { genre, ...data } = input;

    let genres;

    if (genre) {
      genres = [];

      for (const genreName of genre) {
        const genreFound = await prisma.genre.findUnique({
          where: {
            name: genreName,
          },
        });

        if (!genreFound) {
          throw new Error(`Genre ${genreName} not found`);
        }

        genres.push({
          id: genreFound.id,
        });
      }
    }

    const updatedMovie = await prisma.movie.update({
      where: {
        id,
      },
      data: {
        ...data,
        ...(genres && {
          genres: {
            set: genres,
          },
        }),
      },
      include: {
        genres: true,
      },
    });

    return {
      ...updatedMovie,
      rate: Number(updatedMovie.rate),
      genres: updatedMovie.genres.map((genre) => genre.name),
    };
  }

  static async delete({ id }) {
    const movie = await prisma.movie.findUnique({
      where: {
        id,
      },
    });

    if (!movie) return false;

    await prisma.movie.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
