import express from "express";
import cors from "cors";

import { readFile, writeFile } from "fs/promises";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = ["http://localhost:5173"];

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

app.get("/comments", async (req, res) => {
  try {
    const data = await readFile("server/comments.json", "utf8");
    const comments = JSON.parse(data);

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/comments", async (req, res) => {
  try {
    const newMessage = req.body;
    const comments = JSON.parse(await readFile("server/comments.json", "utf8"));

    const newObject = [...comments, newMessage];

    await writeFile(
      "server/comments.json",
      JSON.stringify(newObject, null, 2),
      "utf8",

      res.status(201).json(newObject),
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(1236, () => {
  console.log("Escuchando en el puerto 1236");
});
