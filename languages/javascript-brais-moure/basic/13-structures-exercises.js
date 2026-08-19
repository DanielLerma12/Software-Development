/*
Clase 28 - Ejercicios: Estructuras
Vídeo: https://youtu.be/1glVfFxj8a4?t=11451
*/

// 1. Crea un array que almacene cinco animales
let animales = [];

animales = ["cerdo", "vaca", "pollo", "caballo", "perro"];
console.log(animales);
// 2. Añade dos más. Uno al principio y otro al final
animales.push("gato");
animales.unshift("iguana");
console.log(animales);
// 3. Elimina el que se encuentra en tercera posición
animales.splice(2, 1);
console.log(animales);
// 4. Crea un set que almacene cinco libros
let libros = new Set([
  "matematicas",
  "economia",
  "artes",
  "biologia",
  "programacion",
]);
console.log(libros);
// 5. Añade dos más. Uno de ellos repetido
libros.add("fisica");
libros.add("Matematicas");
console.log(libros);
// 6. Elimina uno concreto a tu elección
libros.delete("artes");
console.log(libros);
// 7. Crea un mapa que asocie el número del mes a su nombre
let mapa = new Map([
  [1, "Enero"],
  [2, "Febrero"],
  [3, "Marzo"],
  [4, "Abril"],
  [5, "Mayo"],
]);
console.log(mapa);
// 8. Comprueba si el mes número 5 existe en el map e imprime su valor
console.log(mapa.has(5));
console.log(mapa.get(5));

mapa.has(5)
  ? console.log(`Si, tiene el 5, y es ${mapa.get(5)}`)
  : console.log("No, no lo tiene");
// 9. Añade al mapa una clave con un array que almacene los meses de verano
let arrayInterior = ["Julio", "Agosto", "Septiembre"];
mapa.set(6, arrayInterior);
console.log(mapa);
// 10. Crea un Array, transfórmalo a un Set y almacénalo en un Map
let newArray = ["Miguel", "Daniel"];
let newSet = new Set(newArray);
let newMap = new Map([[1, newSet]]);
console.log(newMap);
