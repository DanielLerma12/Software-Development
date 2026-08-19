/*
Clase 12 - Funciones avanzadas
Vídeo: https://youtu.be/iJvLAZ8MJ2E?t=4112
*/

// 1. Crea una función que retorne a otra función
const saludo1 = function saludar(saludo) {
  return function () {
    console.log(saludo);
  };
};

const saludoPrograma1 = saludo1("holaaa");

saludoPrograma1();
// 2. Implementa una función currificada que multiplique 3 números

// 3. Desarrolla una función recursiva que calcule la potencia de un número elevado a un exponente

// 4. Crea una función createCounter() que reciba un valor inicial y retorne un objeto con métodos para increment(), decrement() y getValue(), utilizando un closure para mantener el estado
function createCounter(valor_inicial, callback) {
  if (callback == "incremento") {
    return function incrementar() {
      console.log(valor_inicial + 10);
    };
  } else if (callback == "decremento") {
    return function decrementar() {
      console.log(valor_inicial - 10);
    };
  } else if (callback == undefined)
    return function getValue() {
      console.log(
        `El valor sigue siendo ${valor_inicial} y no se especificó la función`,
      );
    };
}

const contador1 = createCounter(5);
contador1();
const contador2 = createCounter(16, "incremento");
contador2();
// 5. Crea una función sumManyTimes(multiplier, ...numbers) que primero sume todos los números (usando parámetros Rest) y luego multiplique el resultado por multiplier
function sumManyTimes(multiplier, ...numbers) {
  let suma = 0;
  for (numero of numbers) {
    suma = suma + numero;
  }
  let resultado = suma * multiplier;
  return resultado;
}

console.log(sumManyTimes(2, 5, 5, 10));
// 6. Crea un Callback que se invoque con el resultado de la suma de todos los números que se le pasan a una función
function sumar(uno, dos, tres, callback) {
  let suma = uno + dos + tres;
  return callback(suma);
}

function showResult(suma) {
  console.log("el resultado es: " + suma);
}

const numeros = [2, 5, 6];
const resultado = sumar(...numeros, showResult);

// 7. Desarrolla una función parcial

// 8. Implementa un ejemplo que haga uso de Spread

// 9. Implementa un retorno implícito

// 10. Haz uso del this léxico
