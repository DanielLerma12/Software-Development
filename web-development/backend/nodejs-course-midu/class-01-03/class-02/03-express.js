const express = require("express");
const pico = require("picocolors");
const dittoJSON = require("./ditto.json");

const app = express();

const PORT = process.env.PORT ?? 1234;

app.use(express.json()); // hace lo mismo que lo encasillado abajo

app.get("/", (req, res) => {
  res.send("<h1>Mi página</h1>"); // express detecta automáticamente cual es el content-type dependiendo de la respuesta
  // res.json({ message: "hola mundo" }); // por ej un json
});

app.get("/pokemon/ditto", (req, res) => {
  res.json(dittoJSON);
});

app.post("/pokemon", (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send("<h1>Error, 404</h1>");
});

app.listen(PORT, () => {
  console.log(pico.cyan(`server listening in port: http://localhost:${PORT}`));
});

/*

{
  console.log("mi primer middleware"); 
  
  // trackear la request a la base de datos, revisar si el usuario tiene cookies

  if (req.method !== "POST") return next();
  if (req.headers["content-type"] !== "application/json") return next();

  // solo llegan request que son POST y que tienen el header Content-Type: application/json

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
                                                        // res.writeHead(201, {
                                                        // "Content-Type": "application/json;charset=utf-8", // innecesario ahora
                                                        // }); 
    req.body = data;
    next();
  });
}

*/
