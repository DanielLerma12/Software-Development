import fs from "node:fs/promises";

async function leerArchivos() {
  const contenido = await Promise.all([
    // allsettled permite que no se bloquee si una falla y devuelva su error o undefined
    fs.readFile("archivo1.txt", "utf8"),
    fs.readFile("archivo2.txt", "utf8"),
    fs.readFile("archivo3.txt", "utf8"),
  ]);

  return contenido.join(" ");
}

const resultado = await leerArchivos();

console.log(resultado);
