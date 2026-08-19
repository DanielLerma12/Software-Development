/*
Clase 22 - Ejercicios: Strings
Vídeo: https://youtu.be/1glVfFxj8a4?t=7226
*/

// 1. Concatena dos cadenas de texto
let nombre = "Hola, soy Daniel"
let nombre2 = "Hola, soy Carlos"
console.log(nombre + ", tengo 26 años")

// 2. Muestra la longitud de una cadena de texto
console.log(nombre.length)

// 3. Muestra el primer y último carácter de un string
console.log(nombre.slice(0, 1))
console.log(nombre.slice(nombre.length - 1, nombre.length))
// 4. Convierte a mayúsculas y minúsculas un string
console.log(nombre.toUpperCase())
console.log(nombre.toLowerCase())
// 5. Crea una cadena de texto en varias líneas
console.log(`Hola
soy lindo`)
// 6. Interpola el valor de una variable en un string
console.log(`${nombre}, tengo 26`)
// 7. Reemplaza todos los espacios en blanco de un string por guiones
console.log(nombre.replace(" ", "-"))
// 8. Comprueba si una cadena de texto contiene una palabra concreta
console.log(nombre.includes("Hola"))
// 9. Comprueba si dos strings son iguales
console.log(nombre === "Hola, soy Daniel")
// 10. Comprueba si dos strings tienen la misma longitud
console.log(nombre.length == nombre2.length)