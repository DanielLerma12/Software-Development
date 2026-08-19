import fs from "node:fs";

function procesarArchivo(callback) {
  fs.readFile("./input.txt", "utf8", (error, contenido) => {
    if (error) {
      return callback(error);
    }

    setTimeout(() => {
      const textoProcesado = contenido.toUpperCase();

      fs.writeFile("./output.txt", textoProcesado, (error) => {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }, 1000);
  });
}

procesarArchivo((error) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }

  console.log("Archivo procesado y guardado con éxito");
});
