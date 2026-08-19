/*
Clase 18 - Ejercicios: primeros pasos
Vídeo: https://youtu.be/1glVfFxj8a4?t=4733
*/

// 1. Escribe un comentario en una línea
// Comnentario en una línea
// 2. Escribe un comentario en varias líneas
/*
Comentario
en varias
líneas
*/
// 3. Declara variables con valores asociados a todos los datos de tipo primitivos
let myText = "hola";
let myAge = 26;
let esCasado = false;
let valorindefinido;
let valornulo = null;
let numeroGrandote = BigInt(2312312255345234523452435);
let miSimbolo = Symbol("mysimbolo");

// 4. Imprime por consola el valor de todas las variables
console.log(myText);
console.log(myAge);
console.log(esCasado);
console.log(valorindefinido);
console.log(valornulo);
console.log(numeroGrandote);
console.log(miSimbolo);
// 5. Imprime por consola el tipo de todas las variables
console.log(typeof myText);
console.log(typeof myAge);
console.log(typeof esCasado);
console.log(typeof valorindefinido);
console.log(typeof valornulo);
console.log(typeof numeroGrandote);
console.log(typeof miSimbolo);

// 6. A continuación, modifica los valores de las variables por otros del mismo tipo
myText = "chao";
myAge = 25;
esCasado = true;
// 7. A continuación, modifica los valores de las variables por otros de distinto tipo
myText = 45;
myAge = "hola";
// 8. Declara constantes con valores asociados a todos los tipos de datos primitivos
const otroText = "otro texto";
// 9. A continuación, modifica los valores de las constantes
otroText = "otro texto2";
// 10. Comenta las líneas que produzcan algún tipo de error al ejecutarse
// Assingment to constarnt variable from exercise 9
