const os = require("node:os"); // Window object does not exist in node, because it is an object from browser

console.log("información del sistema operativo: ");
console.log("---------------------------------- ");

console.log("Nombre del sistema operativo", os.platform());
console.log("Version del sistema operativo", os.release());
console.log("Arquitectura del sistema operativo", os.arch());
console.log("CPUs", os.cpus());
console.log("Memoria libre", os.freemem() / 1024 / 1024);
console.log("Memoria total", os.totalmem() / 1024 / 1024);
console.log("Uptime", os.uptime() / 60 / 60);
