/*
Clase 41 - Ejercicios: Manejo de errores
Vídeo: https://youtu.be/1glVfFxj8a4?t=20392
*/

// 1. Captura una excepción utilizando try-catch
// 2. Captura una excepción utilizando try-catch y finally
// 3. Lanza una excepción genérica

const obj1 = undefined;

try {
  console.log(obj1.edad);
} catch (error) {
  console.log("Error de tipo: " + error.message);
} finally {
  console.log("Igual hay que seguir el programa.");
}

// 6. Lanza varias excepciones según una lógica definida
// 7. Captura varias excepciones en un mismo try-catch
// 8. Crea un bucle que intente transformar a float cada valor y capture y muestre los errores
let arrayDatos = ["23px", 9, "hola", "1.367", 0, null, undefined];
let floatDato = "";

for (let dato of arrayDatos) {
  try {
    if (!/\d/.test(dato)) {
      throw new Error(
        `El dato ingresado: ${dato}, no contiene números. Ingresa un número.`,
      );
    }

    if (dato === null) {
      throw new Error(
        `El dato ingresado: ${dato} , es nulo. Ingresa un valor real.`,
      );
    }

    if (dato === undefined) {
      throw new Error(
        `El dato ingresado: ${dato}, está sin definir. Ingresa un valor real.`,
      );
    }

    if (dato == 0) {
      throw new Error(
        `El dato ingresado: ${dato}, tiene que ser un número mayor a 0.`,
      );
    }
    floatDato = parseFloat(dato);
    console.log(floatDato);
  } catch (error) {
    console.log("Error con el dato ingresado: " + error.message);
  }
}

// 4. Crea una excepción personalizada
// 5. Lanza una excepción personalizada
// 9. Crea una función que verifique si un objeto tiene una propiedad específica y lance una excepción personalizada

class ErroresPropios extends Error {
  constructor(mensajede_de_error) {
    super(mensajede_de_error);
  }
}

const carro = {
  name: "Munstang",
  color: "Azul",
  uso: "10 años",
  seguro: "Autorix",
};

const bus = {
  name: "Munstang",
  color: "Azul",
  uso: "10 años",
  tránsito: "escolar",
};

const moto = {
  name: "Munstang",
  color: "Azul",
  uso: "10 años",
  seguro: "Autorix",
};

function verificarPropiedad(objeto, propiedad) {
  let resultado;
  if (objeto == "" || propiedad == "") {
    throw new ErroresPropios(
      "Uno o ambos de los datos ingresados no contienen nada.",
    );
  }
  for (let dato in objeto) {
    if (dato === propiedad) {
      return true;
    } else {
    }
  }
  return false;
}

try {
  console.log(verificarPropiedad(bus, ""));
} catch (error) {
  console.log(error.message);
}

// 10. Crea una función que realice reintentos en caso de error hasta un máximo de 10

class ErroresPropios2 extends Error {
  constructor(mensaje, attemp) {
    super(mensaje);
    this.attemp = attemp;
  }
  nroAttemps() {
    return this.attemp;
  }
}

const numeros = [2, 6, 7, 12, 13, 9, 11, 4, 5, 19];

try {
  console.log(input(numeros));
} catch (error) {
  console.log(`${error.message}, número de intentos: ${error.nroAttemps()}`);
}

function input(numeros) {
  let attemp = 0;
  for (let numero of numeros) {
    attemp++;
    if (numero === 8) {
      return `número de intentos: ${attemp}, muy bien!`;
    } else {
      continue;
    }
  }

  throw new ErroresPropios2("intentos fallidos", attemp);
}
