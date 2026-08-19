/*
Clase 23 - Estructuras avanzadas
Vídeo: https://youtu.be/iJvLAZ8MJ2E?t=7514
*/

// 1. Utiliza map, filter y reduce para crear un ejemplo diferente al de la lección
const dulces = ["mora", "chocolate", "mani", "fresa", "menta", "naranja"];

const dulceMayuscula = dulces.map((dulce) => {
  return dulce.toUpperCase();
});

console.log(dulceMayuscula);

const filtrarM = dulces.filter((dulce) => dulce.charAt(0) === "m");
console.log(filtrarM);

const concatenar = dulces.reduce((antes, despues) => antes + " " + despues);
console.log(concatenar);
// 2. Dado un array de números, crea uno nuevo con dichos números elevados al cubo y filtra sólo los números pares
const numeritos = [12, 4, 9, 2, 1];

const cubo = numeritos.map((numero) => numero * numero * numero);
const resultado = cubo.filter((par) => par % 2 === 0);
console.log(resultado);
// 3. Utiliza flat y flatMap para crear un ejemplo diferente al de la lección
const fotos = ["foto 1", ["foto2", ["foto 3", ["foto 4"]]]];
const fotosPlanas = fotos.flat(Infinity);
console.log(fotosPlanas);

const numeros = ["78", "675", "345", "12", "0", "9", "87"];
const numerosFlat = numeros.flatMap((numeroString) => numeroString.split(""));

console.log(numerosFlat);
// 4. Ordena un array de números de mayor a menor
const numeritos2 = [5, 7, 9, 2, 3, 4];
let mayorMenos = numeritos2.sort((numerito, numerito2) => numerito2 - numerito);
console.log(mayorMenos);
// 5. Dados dos sets, encuentra la unión, intersección y diferencia de ellos
const setUno = new Set([2, 6, 7, 10, 34, 5]);
const setDos = new Set([9, 6, 234, 1, 5, 6]);

let setUnion = new Set([...setUno, ...setDos]);
console.log(setUnion);

const intersection = new Set(
  [...setUno].filter((element) => setDos.has(element)),
);
console.log(intersection);

const diferencia = new Set(
  [...setUno].filter((element) => !setDos.has(element)),
);
console.log(diferencia);

// 6. Itera los resultados del ejercicio anterior
diferencia.forEach((d) => console.log(diferencia));

// 7. Crea un mapa que almacene información se usuarios (nombre, edad y email) e itera los datos
// 8. Dado el mapa anterior, crea un array con los nombres
const mapaUsuarios = new Map([
  ["Daniel", { edad: 20, email: "daniel@gmail.com" }],
  ["Juan", { edad: 16, email: "juan@gmail.com" }],
  ["Ana", { edad: 25, email: "ana@gmail.com" }],
  ["Harold", { edad: 45, email: "daniel@gmail.com" }],
]);

let indice = 0;
let arrayNombres = [];

mapaUsuarios.forEach((key, value) => {
  arrayNombres[indice] = value;
  indice++;
});
console.log(arrayNombres);
// 9. Dado el mapa anterior, obtén un array con los email de los usuarios mayores de edad y transfórmalo a un set
let indice2 = 0;
let arrayUsuarios = [];

mapaUsuarios.forEach((key, value) => {
  if (key.edad >= 18) {
    arrayUsuarios[indice2] = key.email;
    indice2++;
  }
});

const setti = new Set(arrayUsuarios);
console.log(setti);
// 10. Transforma el mapa en un objeto, a continuación, transforma el objeto en un mapa con clave el email de cada usuario y como valor todos los datos del usuario
let mapaNuevo = new Map();
const mapFromObject = Object.fromEntries(mapaUsuarios);
console.log(mapFromObject);

for (key in mapFromObject) {
  mapaNuevo.set(mapFromObject[key].email, [mapFromObject[key].edad, key]);
}

console.log(mapaNuevo);
