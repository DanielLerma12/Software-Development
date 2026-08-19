// argumentos de entrada
console.log(process.argv);

// current working directory
console.log(process.cwd());

// controlar el proceso de salida
process.exit();
process.exit(0); // todo ha ido bien
process.exit(1); // con errores

// controlar eventos del proceso
process.on("exit", () => {
  // limpiar los recursos
});
