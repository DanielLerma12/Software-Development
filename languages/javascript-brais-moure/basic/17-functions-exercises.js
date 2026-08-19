/*
Clase 32 - Ejercicios: Funciones
Vídeo: https://youtu.be/1glVfFxj8a4?t=14146
*/

// NOTA: Explora diferentes sintaxis de funciones para resolver los ejercicios

// 1. Crea una función que reciba dos números y devuelva su suma
function lermaSuma(n1, n2) {
  return n1 + n2;
}
console.log(lermaSuma(2, 5));
// 2. Crea una función que reciba un array de números y devuelva el mayor de ellos
const lermaArrayMayor = (elArray) => {
  let contenedor = 0;
  elArray.forEach((element) => {
    if (contenedor < element) {
      contenedor = element;
    } else {
    }
  });
  return contenedor;
};
let edades = [4, -57, 56, 3, 189, 174];
console.log(lermaArrayMayor(edades));
// 3. Crea una función que reciba un string y devuelva el número de vocales que contiene
const stringVocales = function (getString) {
  let ward = 0;
  for (let letra of getString) {
    if (
      letra == "a" ||
      letra == "e" ||
      letra == "i" ||
      letra == "o" ||
      letra == "u"
    ) {
      ward++;
    }
  }
  return ward;
};

console.log(stringVocales("ajsadfhowieh fafbsvoif"));
// 4. Crea una función que reciba un array de strings y devuelva un nuevo array con las strings en mayúsculas
function arrayMayus(arrayString) {
  let nuevoArray = [];

  arrayString.forEach((apellido, i) => {
    nuevoArray[i] = apellido.toUpperCase();
  });

  return nuevoArray;
}

function arrayMayus2(arrayString) {
  return arrayString.map((apellido) => apellido.toUpperCase());
}

let apellidos = ["lerma", "gonzalez", "garcia", "alvarez"];
console.log(arrayMayus(apellidos));
console.log(arrayMayus2(apellidos));
// 5. Crea una función que reciba un número y devuelva true si es primo, y false en caso contrario
function numPrimo(getNum) {
  let cont = 0;
  let i;
  for (i = getNum; i > 0; i--) {
    if (getNum % i === 0) {
      cont++;
    }
  }
  if (cont === 2) {
    return true;
  } else {
    return false;
  }
}

let numero = 67;
console.log(numPrimo(numero));
// 6. Crea una función que reciba dos arrays y devuelva un nuevo array que contenga los elementos comunes entre ambos
function comunesFunction(array1, array2) {
  let datoa1;
  let datoa2;
  let arrayWard = [];

  for (datoa1 of array1) {
    for (datoa2 of array2) {
      if (datoa1 === datoa2) {
        arrayWard.push(datoa1);
      }
    }
  }
  return arrayWard;
}

let array1 = [4, 8, 12, 9, "dani", "jeje"];
let array2 = [6, 1, 54, 8, "hector", "dani", "jeje"];
console.log(comunesFunction(array1, array2));
// 7. Crea una función que reciba un array de números y devuelva la suma de todos los números pares
function sumaPares(getArrayPares) {
  let ward = 0;

  getArrayPares.forEach((num) => {
    if (num % 2 === 0) {
      ward = ward + num;
    }
  });
  return ward;
}

let arrayPares = [131, 9, 4, 22345, 66, 2];
console.log(sumaPares(arrayPares));
// 8. Crea una función que reciba un array de números y devuelva un nuevo array con cada número elevado al cuadrado
function arrayCuadrado(array) {
  return array.map((num) => num * num);
}

let arrayNum = [13, 98, 54, 2];
console.log(arrayCuadrado(arrayNum));
// 9. Crea una función que reciba una cadena de texto y devuelva la misma cadena con las palabras en orden inverso
const palabraInversa = function (getString) {
  let palabra = "";
  let contenedor = "";
  let indice = 0;
  for (let letra of getString) {
    if (letra === " ") {
      contenedor = palabra + " " + contenedor;
      palabra = "";
      indice++;
    } else {
      palabra = palabra + letra;
      indice++;
    }
    if (indice == getString.length) {
      contenedor = palabra + " " + contenedor;
    }
  }
  return contenedor;
};

console.log(palabraInversa("esto tiene que ser una broma"));
// 10. Crea una función que calcule el factorial de un número dado
function numFactorial(getNum) {
  let contenedor = "";
  for (let i = getNum; i > 0; i--) {
    if (i === getNum) {
      contenedor = i;
    } else {
      contenedor = contenedor * i;
    }
  }
  return contenedor;
}

let fact = 10;
console.log(numFactorial(fact));
