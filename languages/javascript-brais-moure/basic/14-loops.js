/*
Clase 29 - Bucles
Vídeo: https://youtu.be/1glVfFxj8a4?t=11575
*/

// Loops o bucles

// for

for (let i = 0; i < 5; i++) {
  console.log(`Hola ${i}`);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

for (let i = 0; i < numbers.length; i++) {
  console.log(`Elemento: ${numbers[i]}`);
}

// while

let i = 0;
while (i < 5) {
  console.log(`Hola ${i}`);
  i++;
}

// Bucle infinito
// while(true) {
// }

// do while - Executes at least once

i = 6;
do {
  console.log(`Hola ${i}`);
  i++;
} while (i < 5);

// for of

let myArray = [1, 2, 3, 4];

let mySet = new Set([
  "Brais",
  "Moure",
  "mouredev",
  37,
  true,
  "braismoure@mouredev.com",
]);

let myMap = new Map([
  ["name", "Brais"],
  ["email", "braismoure@mouredev.com"],
  ["age", 37],
]);

let myString = "¡Hola, JavaScript!";

for (let value of myArray) {
  console.log(value);
}

for (let value of mySet) {
  console.log(value);
}

for (let value of myMap) {
  console.log(value);
}

for (let value of myString) {
  console.log(value);
}

// break y continue

for (let i = 0; i < 10; i++) {
  if (i == 5) {
    continue;
  } else if (i == 7) {
    break;
  }
  console.log(`Hola ${i}`);
}
