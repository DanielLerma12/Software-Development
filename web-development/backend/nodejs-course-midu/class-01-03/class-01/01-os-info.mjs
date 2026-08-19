import {
  platform,
  release,
  arch,
  cpus,
  freemem,
  totalmem,
  uptime,
} from "node:os";

// or import os from "node:os"

console.log("información del sistema operativo: ");
console.log("---------------------------------- ");

console.log("Nombre del sistema operativo", platform());
console.log("Version del sistema operativo", release());
console.log("Arquitectura del sistema operativo", arch());
console.log("CPUs", cpus());
console.log("Memoria libre", freemem() / 1024 / 1024);
console.log("Memoria total", totalmem() / 1024 / 1024);
console.log("Uptime", uptime() / 60 / 60);
