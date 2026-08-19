/*
Clase 30 - Ejercicios: Bucles
Vídeo: https://youtu.be/1glVfFxj8a4?t=12732
*/

// NOTA: Explora diferentes sintaxis de bucles para resolver los ejercicios

// 1. Crea un bucle que imprima los números del 1 al 20
for (let i = 1; i <= 20; i++) {
  console.log(i);
}
// 2. Crea un bucle que sume todos los números del 1 al 100 y muestre el resultado
let suma = 0;
for (let i = 1; i <= 100; i++) {
  suma = suma + i;
  console.log(suma);
}
// 3. Crea un bucle que imprima todos los números pares entre 1 y 50
for (let i = 0; i <= 50; i = i + 2) {
  if (i == 0) {
    continue;
  } else {
    console.log(i);
  }
}

let i = 2;

do {
  console.log(i);
  i = i + 2;
} while (i <= 50);

// 4. Dado un array de nombres, usa un bucle para imprimir cada nombre en la consola
let nuevoArray = ["Daniel", "Miguel", "Diana", "Jorge"];

for (let nombre of nuevoArray) {
  console.log(nombre);
}
// 5. Escribe un bucle que cuente el número de vocales en una cadena de texto
let texto = "Me gustan estos ejercicios.";

for (let letra of texto) {
  if (
    letra == "a" ||
    letra == "e" ||
    letra == "i" ||
    letra == "o" ||
    letra == "u"
  ) {
    console.log(letra);
  } else {
    continue;
  }
}
// 6. Dado un array de números, usa un bucle para multiplicar todos los números y mostrar el producto
let producto = 1;
let numeritos = [1, 5, 2, 3];

for (let numero of numeritos) {
  producto = producto * numero;
  console.log(producto);
}
// 7. Escribe un bucle que imprima la tabla de multiplicar del 5
let multp = 5;
let cont = 1;

while (cont <= 100) {
  console.log(cont * multp);
  cont++;
}
// 8. Usa un bucle para invertir una cadena de texto
let texto2 = "Me gustan estos ejercicios, sí señor.";
let invertido = "";

for (let letra of texto2) {
  invertido = letra + invertido;
}
console.log(invertido);
// 9. Usa un bucle para generar los primeros 10 números de la secuencia de Fibonacci
let num1 = 0;
let num2 = 1;
let sumaAnt = 0;

console.log(0);
console.log(1);

do {
  console.log((sumaAnt = num1 + num2));

  num1 = num2;
  num2 = sumaAnt;
} while (num2 <= 50);
// 10. Dado un array de números, usa un bucle para crear un nuevo array que contenga solo los números mayores a 10
let arrayInicial = [77, 2, 5, 10, 11, 34, 56, 65, 66, 32];
let arrayFinal = [];
let inArray = 0;

for (let elementoArray of arrayInicial) {
  if (elementoArray > 10) {
    arrayFinal.push(elementoArray);
  } else {
  }
}

console.log(arrayFinal);
