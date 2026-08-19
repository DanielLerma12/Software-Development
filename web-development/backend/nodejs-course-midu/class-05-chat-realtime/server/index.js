import "dotenv/config";

import pico from "picocolors";

import express, { json } from "express";
import { SocketServer } from "./socket.js";
import { createServer } from "node:http";
import path from "node:path";

import logger from "morgan";

import jwt from "jsonwebtoken";

import cookieParser from "cookie-parser";
import { prisma } from "../lib/prisma.js";
import { UserRepository } from "./user-repository.js";

await prisma.$connect();
console.log(pico.magenta("connected to Postgres supabase"));

const app = express(); // express crea todo por uno, pero solo crea el servidor al momento de hacer listen, ahora esa lógica la maneja el server de http
const server = createServer(app); // se crea un servidor que usa a app

app.use(cookieParser());
app.use(logger("dev"));

app.use(json());

app.use((req, res, next) => {
  // middleware para detectar si existen cookies
  const token = req.cookies.access_token;

  req.session = { user: null }; // crea la propiedad de sesión de usuario nula si no hay

  try {
    const data = jwt.verify(token, process.env.SECRET_JWT_KEY);

    req.session.user = data; // y aquí almacena el usuario
  } catch {}

  next();
});

app.use(express.static(path.join(process.cwd(), "client/public"))); // sirve css y js

app.get("/", (req, res) => {
  if (!req.session.user) {
    return res.sendFile(path.join(process.cwd(), "client/login", "index.html"));
  }

  return res.redirect("/chat&game");
});

app.get("/chat&game", (req, res) => {
  const { user } = req.session;
  if (!user)
    return res
      .status(403)
      .send(
        "Access not authorized. Register/login correctly or refresh your login again",
      );
  res.sendFile(path.join(process.cwd(), "client/chat", "chat.html"));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const login = await UserRepository.login({ user: req.body });

  if (!login.state) return res.status(400).json(login.prompt);

  const token = jwt.sign({ username }, process.env.SECRET_JWT_KEY, {
    expiresIn: "1h",
  });

  return res
    .status(201)
    .cookie("access_token", token, {
      httpOnly: true, // la cookie solo se puede acceder en el servidor
      secure: process.env.NODE_ENV === "production", // solo se puede acceder en https
      sameSite: "strict", // solo se puede acceder en el mismo dominio
      maxAge: 1000 * 60 * 60, // solo tiene validez por 1 hora
    })
    .json({});
});

app.post("/register", async (req, res) => {
  const createUser = await UserRepository.create({ user: req.body });

  if (!createUser.state) {
    return res.status(400).json(createUser.prompt);
  }

  return res.status(201).send(createUser.prompt);
});

app.post("/logout", (req, res) => {
  res.clearCookie("access_token").json({ message: "Logout successful" });
});

app.get("/user", (req, res) => {
  const { user } = req.session;
  res.json(user);
});

SocketServer(server);

const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => {
  console.log(
    pico.yellowBright(`Server listening on http://localhost:${PORT}`),
  );
});
