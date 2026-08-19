const path = require("node:path");

// barra separadora de carpetas segun el Os
console.log(path.sep);

// unir rutas

const ruta = path.join(
  "D:",
  "Documents",
  "Programming",
  "Learning",
  "web-development",
  "courses",
  "nodejs-course-midu",
  "txt",
  "general.txt",
);

console.log(ruta);

// nombre de fichero
const nombre = path.basename(ruta);
console.log(nombre);

// nombre de fichero, sin extensión
const nombre2 = path.basename(ruta, ".txt");
console.log(nombre2);

// extensión
const extension = path.extname("image.jpg");
console.log(extension);
