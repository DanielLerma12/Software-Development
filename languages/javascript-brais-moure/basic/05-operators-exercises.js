/*
Clase 20 - Ejercicios: Operadores
Vídeo: https://youtu.be/1glVfFxj8a4?t=6458
*/

// 1. Crea una variable para cada operación aritmética
let suma = 2 + 2
let resta = 6 - 4
// 2. Crea una variable para cada tipo de operación de asignación,
//    que haga uso de las variables utilizadas para las operaciones aritméticas
let numero = 2
numero += 5
console.log(numero)
// 3. Imprime 5 comparaciones verdaderas con diferentes operadores de comparación
let num1 = 10
let num2 = 5

console.log(num1 > num2)
// 4. Imprime 5 comparaciones falsas con diferentes operadores de comparación
let num3 = 8
let num4 = 5

console.log(num3 < num4)

let num5 = 2
let num6 = 5

console.log(num5 === num6)
console.log(num5 === 2)
console.log(num5 === "2")
// 5. Utiliza el operador lógico and
console.log(5 > 3 && 2 < 5)
// 6. Utiliza el operador lógico or
console.log(5 >= 5 || 4 != 4)
// 7. Combina ambos operadores lógicos
console.log(10 > 7 && 8 === 8 || 4 > 4)
// 8. Añade alguna negación
console.log(!4 < 5)
// 9. Utiliza el operador ternario
let nombre = "maria"
nombre ? console.log("si, es ella") : ("no, no es ella")

// 10. Combina operadores aritméticos, de comparáción y lógicas
let nummy1 = 5
let nummy2 = 10

console.log(nummy1 + nummy2 > 10 && nummy1 === "6")