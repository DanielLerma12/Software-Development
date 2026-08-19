/*
Clase 36 - Ejercicios: Desestructuración y propagación
Vídeo: https://youtu.be/1glVfFxj8a4?t=16802
*/

// 1. Usa desestructuración para extraer los dos primeros elementos de un array
let arrayFamilia = ["daniel", "Miguel", "Diana", "Jorge"];

let objetoGato = {
  nombre: "Nekko",
  edad: 4,
  comida: "Diamond",
  dormitorios: {
    pieza1: "cama daniel",
    pieza2: "cama miguel",
    pieza3: "sala",
  },
};

let [destFamilia1, destfamilia2] = arrayFamilia;
console.log(destFamilia1, destfamilia2);
// 2. Usa desestructuración en un array y asigna un valor predeterminado a una variable
let [destFamilia3, destfamilia4, , , destfamilia5 = "nekko"] = arrayFamilia;
console.log(destFamilia3, destfamilia5);
// 3. Usa desestructuración para extraer dos propiedades de un objeto
let { nombre, edad } = objetoGato;
console.log(nombre, edad);
// 4. Usa desestructuración para extraer dos propiedades de un objeto y asígnalas
//    a nuevas variables con nombres diferentes
let { nombre: nombre2, edad: edad2 } = objetoGato;
console.log(nombre2, edad2);
// 5. Usa desestructuración para extraer dos propiedades de un objeto anidado
let {
  nombre: nombre3,
  edad: edad3,
  dormitorios: { pieza1: pieza1 },
  dormitorios: { pieza2: pieza2 },
} = objetoGato;
console.log(nombre3, edad3, pieza1, pieza2);
// 6. Usa propagación para combinar dos arrays en uno nuevo
let arrayUno = [1, 2, 3, 4];
let arrayDos = ["ja", "je", "ji", "jo", "ju"];

let arrayComb = [...arrayUno, ...arrayDos];
console.log(arrayComb);
// 7. Usa propagación para crear una copia de un array
let arrayCopia = [...arrayUno];
console.log(arrayCopia);
// 8. Usa propagación para combinar dos objetos en uno nuevo
let objUno = {
  teclado: "razer",
  mouse: "logitech",
};

let objDos = {
  celular: "Xiaomi",
  Monitor: "Samsung",
};

let objCopia = { ...objUno, ...objDos };
console.log(objCopia);
// 9. Usa propagación para crear una copia de un objeto
let objCopia2 = { ...objDos };
console.log(objCopia2);
// 10. Combina desestructuración y propagación
let foto = {
  marco: 15,
  integrantes: "toda la familia",
  color: "negro",
  forma: "cuadrada",
};

let { marco, ...resto } = foto;
console.log(marco, resto);
