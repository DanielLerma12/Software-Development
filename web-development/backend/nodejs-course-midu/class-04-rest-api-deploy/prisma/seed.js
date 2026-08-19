import movies from "../local/movies.json" with { type: "json" };

import { prisma } from "../lib/prisma.js";

const result2 = await prisma.movie.deleteMany();
const result3 = await prisma.genre.deleteMany();

async function main() {
  const genres = [...new Set(movies.flatMap((movie) => movie.genre))];

  await prisma.genre.createMany({
    data: genres.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const dbGenres = await prisma.genre.findMany();

  const genreMap = new Map(dbGenres.map((genre) => [genre.name, genre.id]));

  for (const movie of movies) {
    await prisma.movie.create({
      data: {
        title: movie.title,
        year: movie.year,
        director: movie.director,
        duration: movie.duration,
        poster: movie.poster,
        rate: movie.rate,

        genres: {
          connect: movie.genre.map((name) => ({
            id: genreMap.get(name),
          })),
        },
      },
    });
  }
}
main()
  .then(async () => {
    console.log("Seed completado");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
