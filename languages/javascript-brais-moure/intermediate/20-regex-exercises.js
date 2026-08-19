/*
Clase 79 - Regex
Vídeo: https://youtu.be/iJvLAZ8MJ2E?t=25888
*/

// 1. Crea una RegEx que valide correos electrónicos
const correoVad = [
  /@gmail.com/,
  /@hotmail.com/,
  /@yahoo.com/,
  /@outlook.com/,
  /@yahoo.es/,
  /@outlook.es/,
];
input = "c#rr#o@gmail.com";
for (let correo of correoVad) {
  if (correo.test(input)) {
    console.log("El correo es válido");
    break;
  } else {
    console.log("El correo no es válido");
    break;
  }
}

// 2. Crea una RegEx obtenga Hashtags de un Texto
regexDos = /#/g;

while ((match = regexDos.exec(input)) !== null) {
  console.log(match);
}
// 3. Crea una RegEx que valide contraseñas seguras (mínimo 8 caracteres, al menos una letra y un número)
const contra = "asdasddasdas";
const patron1 = /[a-zA-Z]/;
const patron2 = /\d/;
const patron3 = 8;

if (contra.length < patron3) {
  console.log("La contraseña tiene que tener minimo 8 caracteres.");
} else {
  if (!patron1.test(contra)) {
    console.log("La contraseña tiene que tener al menos un caracter.");
  } else {
    if (!patron2.test(contra)) {
      console.log("La contraseña tiene que tener al menos un número.");
    } else {
      console.log("Exito");
    }
  }
}

// NOTA: Aplícalas utilizando diferentes operaciones
