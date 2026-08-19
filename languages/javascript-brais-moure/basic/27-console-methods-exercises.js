/*
Clase 43 - Ejercicios: Console
Vídeo: https://youtu.be/1glVfFxj8a4?t=21421
*/

// 1. Crea un función que utilice error correctamente
function sumara() {
  let a, b;
  a = "holiii";
  b = 4;
  if (typeof a == "string" || typeof b == "string")
    console.error("hay una cadena de texto", new Error("Horror"));
}

sumara();
// 2. Crea una función que utilice warn correctamente
function restara(c, d) {
  if (c == 0 || d == 0) console.warn("hay un 0");
}

restara(0, 2);
// 3. Crea una función que utilice info correctamente
function infoJs() {
  console.info("Js es un lenguaje que bla bla bla bla");
}

infoJs();
// 4. Utiliza table
let arrayNum = [2, 4, 6];
console.table(arrayNum);
// 5. Utiliza group
console.group("Nombres:");
console.log("Brais");
console.log("Daniel");
console.groupEnd();
// 6. Utiliza time
console.time("je");
console.group("Nombres:");
console.log("Brais");
console.log("Daniel");
console.groupEnd();
console.timeEnd("je");
// 7. Valida con assert si un número es positivo
console.assert(-2 > 0, "Negativo");
// 8. Utiliza count
console.count("je");
console.count("je");
// 9. Utiliza trace
function funcA() {
  funcB();
}

function funcB() {
  console.trace("Seguimiento de la ejecución.");
}

funcA();
// 10. Utiliza clears
console.clear();
