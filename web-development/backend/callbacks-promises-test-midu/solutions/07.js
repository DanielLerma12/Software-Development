import express, { json } from "express";
import lista from "./lista.json" with { type: "json" };

const app = express();

app.use(json());

app.get("/", (req, res) => {
  res.json(lista);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;

  const filteredItem = lista.filter((item) => {
    return Number(item.id) === Number(id);
  });

  res.json(filteredItem);
});

app.post("/", (req, res) => {
  const item = req.body;
  lista.push(item);
  res.json(lista);
});

app.patch("/:id", (req, res) => {
  const { id } = req.params;
  const item = req.body;

  const filteredItem = lista.findIndex((item) => {
    return Number(item.id) === Number(id);
  });

  lista[filteredItem] = item;
  res.json(lista);
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const filteredItem = lista.filter((item) => {
    return Number(item.id) !== Number(id);
  });

  res.json(filteredItem);
});

const puerto = process.env.PORT ?? 3000;

app.listen(puerto, () => {
  console.log(`Escuchando en puerto: http://localhost:${puerto}`);
});
