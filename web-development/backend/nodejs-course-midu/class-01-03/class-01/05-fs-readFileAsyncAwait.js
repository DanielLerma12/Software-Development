// using promises and CommonJS, iffy function for top level or async
const { readFile } = require("node:fs/promises");

(async () => {
  console.log("Leyendo el primer archivo...");

  const text = await readFile("./archivo.txt", "utf-8");

  console.log(text);

  console.log("Leyendo el segundo archivo...");

  const text2 = await readFile("./archivo2.txt", "utf-8");

  console.log(text2);
})();

console.log("ejecutando de mientras");
