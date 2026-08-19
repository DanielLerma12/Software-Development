// using callbacks
const fs = require("node:fs");

console.log("Leyendo el primer archivo...");

fs.readFile("./archivo.txt", "utf-8", (err, text) => {
  console.log("primer texto:", text);
});

console.log("Haciendo cosas mientras lee ese archivo...");

console.log("Leyendo el segundo archivo...");

fs.readFile("./archivo2.txt", "utf-8", (err, text) => {
  console.log("segundo texto:", text);
});

// using promises
const fsProm = require("node:fs/promises");

console.log("Leyendo el primer archivo...");

fsProm
  .readFile("./archivo.txt", "utf-8")
  .then((text) => console.log("primer texto:", text));

console.log("Haciendo cosas mientras lee ese archivo...");

console.log("Leyendo el segundo archivo...");

fsProm
  .readFile("./archivo2.txt", "utf-8")
  .then((text) => console.log("segundo texto:", text));
