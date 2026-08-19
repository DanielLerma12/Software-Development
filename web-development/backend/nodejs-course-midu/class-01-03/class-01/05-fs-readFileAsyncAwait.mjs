// using promises and ES modules
import { readFile } from "node:fs/promises";

console.log("Leyendo el primer archivo...");

const text = await readFile("./archivo.txt", "utf-8");

console.log(text);

console.log("Haciendo cosas mientras lee ese archivo...");

console.log("Leyendo el segundo archivo...");

const text2 = await readFile("./archivo2.txt", "utf-8");

console.log(text2);
