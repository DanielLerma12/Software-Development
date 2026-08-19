/*
Clase 24 - Ejercicios: Condicionales
Vídeo: https://youtu.be/1glVfFxj8a4?t=8652
*/

// if/else/else if/ternaria

// 1. Imprime por consola tu nombre si una variable toma su valor
let nombre = "Daniel"

if (nombre = "Daniel") {
    console.log("El nombre es Daniel")
}
// 2. Imprime por consola un mensaje si el usuario y contraseña concide con unos establecidos
let usuario = "Daniel"
let contra = "1234"

if (nombre = "Daniel" && contra == "1234") {
    console.log("El nombre es Daniel y la contra es correcta")
}
// 3. Verifica si un número es positivo, negativo o cero e imprime un mensaje
let estNum = -2

if (estNum > 0) {
    console.log("Es positivo")
} else if (estNum < 0) {
    console.log("Es negativo")
} else {
    console.log("Es igual a 0")
}
// 4. Verifica si una persona puede votar o no (mayor o igual a 18) e indica cuántos años le faltan
let edad = 15
let restante = 18 - edad

if (edad >= 18) {
    console.log("Es Puede votar")
} else {
    console.log(`No puede votar y le faltan: ${restante} años para votar`)
}
// 5. Usa el operador ternario para asignar el valor "adulto" o "menor" a una variable
//    dependiendo de la edad
const mensaje = edad >= 18 ? "Adulto" : "Menor de edad"
console.log(mensaje)
// 6. Muestra en que estación del año nos encontramos dependiendo del valor de una variable "mes"
let estacion = "Primavera"

if (estacion == "Primavera") {
    console.log("Estamos en primavera")
} else if (estacion == "Verano") {
    console.log("Estamos en verano")
} else if (estacion == "Invierno") {
    console.log("Estamos en invierno")
} else {
    console.log("Estamos en otoño")
}
// 7. Muestra el número de días que tiene un mes dependiendo de la variable del ejercicio anterior
let mes2 = "Noviembre"

if (mes2 == "Enero" || mes2 == "Marzo" || mes2 == "Mayo" || mes2 == "Julio" || mes2 == "Agosto" || mes2 == "Octubre" || mes2 == "Diciembre") {
    console.log(`${mes2} tiene 31 días`)
} else if (mes2 == "Abril" || mes2 == "Junio" || mes2 == "Septiembre" || mes2 == "Noviembre") {
    console.log(`${mes2} tiene 30 días`)
} else {
    console.log("Febrero tiene 28 días")
}
// switch

// 8. Usa un switch para imprimir un mensaje de saludo diferente dependiendo del idioma
let idioma = "Italiano"

switch (idioma) {
    case "Japones":
        console.log("Konichiwa")
        break
    case "Ingles":
        console.log("Hello")
        break
    case "Español":
        console.log("Hola")
        break
    case "Italiano":
        console.log("Salute")
        break
}
// 9. Usa un switch para hacer de nuevo el ejercicio 6
let mes = 2

switch (mes) {
    case 0:
        console.log("Invierno")
        break
    case 1:
        console.log("Verano")
        break
    case 2:
        console.log("Primavera")
        break
    case 3:
        console.log("Otoño")
        break
}
// 10. Usa un switch para hacer de nuevo el ejercicio 7
let meso = "Octubre"

switch (meso) {
    case 'Enero':
    case 'Marzo':
    case 'Mayo':
    case 'Julio':
    case 'Agosto':
    case 'Diciembre':
        console.log(`${meso} tiene 31 días`)
        break;
    case 'Abril':
    case 'Junio':
    case 'Septiembre':
    case 'Octubre':
    case 'Noviembre':
        console.log(`${meso} tiene 30 días`)
        break;
    default:
        console.log("Febrero tiene 28 días o 29 si es bisiesto.");
}