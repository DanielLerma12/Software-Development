const fs = require("node:fs");

const stats = fs.statSync("./archivo.txt");

console.log(stats);
