const fs = require("node:fs");

fs.readdir(".", (err, files) => {
  // ".", dir actual
  if (err) {
    console.log("error al leer el directorio: ", err);
    return;
  }

  files.forEach((file) => {
    console.log(file);
  });
});
