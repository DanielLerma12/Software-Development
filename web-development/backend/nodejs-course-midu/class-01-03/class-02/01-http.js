const http = require("node:http");
const pico = require("picocolors");
const fs = require("node:fs");

const desiredPort = process.env.PORT ?? 1235;

const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("<h1>Bienvenido a mi página de inicio</h1>");
  } else if (req.url === "/images") {
    fs.readFile("./class-02/images/gatox.jpg", (err, data) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.end("<h1>500 internal Server Error</h1>");
      } else {
        res.setHeader("Content-Type", "image/jpg");
        res.end(data);
      }
    });
  } else if (req.url === "/contacto") {
    res.statusCode = 200;
    res.end("<h1>Bienvenido a mi página de contacto</h1>");
  } else {
    res.statusCode = 404;
    res.end("<h1>404</h1>");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  // node --watch for listening on server without closing the server anytime changes are made
  console.log(
    pico.yellow(`server listening in port: http://localhost:${desiredPort}`),
  );
});

// status code:
// 100-199: Respuestas informativas
// 200-299: Respuestas satisfactorias
// 300-399: Redirecciones
// 400-499: Errores del cliente
// 500-599: Errores del servidor
