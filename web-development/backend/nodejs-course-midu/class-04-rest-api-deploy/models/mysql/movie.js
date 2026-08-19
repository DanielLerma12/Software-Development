import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "moviesdb",
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      const [movies] = await connection.query(
        `
        SELECT
          BIN_TO_UUID(m.id) AS id,
          m.title,
          m.year,
          m.director,
          m.duration,
          m.poster,
          m.rate,
          GROUP_CONCAT(g2.name) AS genres
        FROM movies m
        JOIN movie_genres mg ON mg.movie_id = m.id
        JOIN genres g ON g.id = mg.genre_id
        LEFT JOIN movie_genres mg2 ON mg2.movie_id = m.id
        LEFT JOIN genres g2 ON g2.id = mg2.genre_id
        WHERE LOWER(g.name) = ?
        GROUP BY m.id
        `,
        [genre.toLowerCase()],
      );

      if (movies.length === 0) return false;

      return movies;
    }

    const [movies] = await connection.query(
      `
        SELECT
    BIN_TO_UUID(m.id) AS id,
    m.title,
    m.year,
    m.director,
    m.duration,
    m.poster,
    m.rate,
    GROUP_CONCAT(g.name) AS genres
  FROM movies m
  LEFT JOIN movie_genres mg ON mg.movie_id = m.id
  LEFT JOIN genres g ON g.id = mg.genre_id
  GROUP BY
    m.id,
    m.title,
    m.year,
    m.director,
    m.duration,
    m.poster,
    m.rate
`,
    );

    return movies;
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `
        SELECT
          BIN_TO_UUID(m.id) AS id,
          m.title,
          m.year,
          m.director,
          m.duration,
          m.poster,
          m.rate,
          GROUP_CONCAT(g.name) AS genres
        FROM movies m
        LEFT JOIN movie_genres mg ON mg.movie_id = m.id
        LEFT JOIN genres g ON g.id = mg.genre_id
        WHERE m.id = UUID_TO_BIN(?)
        GROUP BY
          m.id,
          m.title,
          m.year,
          m.director,
          m.duration,
          m.poster,
          m.rate
        `,
      [id],
    );

    if (movies.length === 0) return null;

    return movies[0];
  }

  static async create({ input }) {
    const { title, year, director, duration, rate, poster, genre } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    await connection.query(
      `
      INSERT INTO movies (
        id,
        title,
        year,
        director,
        duration,
        rate,
        poster
      )
      VALUES (
        UUID_TO_BIN(?),
        ?, ?, ?, ?, ?, ?
      )
      `,
      [uuid, title, year, director, duration, rate, poster],
    );

    for (const genreName of genre) {
      const [genres] = await connection.query(
        `
        SELECT id
        FROM genres
        WHERE name = ?
        `,
        [genreName],
      );

      if (genres.length === 0) {
        throw new Error(`Genre ${genreName} not found`);
      }

      await connection.query(
        `
        INSERT INTO movie_genres(movie_id, genre_id)
        VALUES(UUID_TO_BIN(?), ?)
        `,
        [uuid, genres[0].id],
      );
    }

    const [movies] = await connection.query(
      `
      SELECT
        BIN_TO_UUID(m.id) AS id,
        m.title,
        m.year,
        m.director,
        m.duration,
        m.poster,
        m.rate,
        GROUP_CONCAT(g.name) AS genres
      FROM movies m
      LEFT JOIN movie_genres mg ON mg.movie_id = m.id
      LEFT JOIN genres g ON g.id = mg.genre_id
      WHERE m.id = UUID_TO_BIN(?)
      GROUP BY
        m.id,
        m.title,
        m.year,
        m.director,
        m.duration,
        m.poster,
        m.rate
      `,
      [uuid],
    );

    return movies[0];
  }

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
