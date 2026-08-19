/*
Clase 34 - Ejercicios: Objetos
Vídeo: https://youtu.be/1glVfFxj8a4?t=15675
*/

// 1. Crea un objeto con 3 propiedades
let carro = {
  llanta: "Mazda",
  volante: "Mitzubishi",
  tamaño: 5,
};
// 2. Accede y muestra su valor
console.log(carro.llanta);
// 3. Agrega una nueva propiedad
carro.num_puertas = 4;
console.log(carro);
// 4. Elimina una de las 3 primeras propiedades
delete carro.volante;
console.log(carro);
// 5. Agrega una función e invócala
carro.arrancar = function () {
  console.log("que empiece la acción");
};
carro.arrancar();
// 6. Itera las propiedades del objeto
for (let item in carro) {
  console.log(item);
}
// 7. Crea un objeto anidado
let manga = {
  publicación: "12/07/1999",
  editorial: "Sueishia",
  nro_vol: 126,
  autor: {
    nombre: "miura",
    manga: "berserk",
  },
};
console.log(manga);
// 8. Accede y muestra el valor de las propiedades anidadas
for (let key in manga) {
  if (key === "autor") {
    for (let key2 in manga[key]) {
      console.log(manga[key][key2]);
    }
  }
}
// 9. Comprueba si los dos objetos creados son iguales
let moto = {
  llanta: "Mazda",
  volante: "Roman",
  tamaño: 1.5,
  otro_tamaño: 5,
};

console.log(carro == moto);
console.log(carro === moto);
console.log(carro.llanta == moto.llanta);
// 10. Comprueba si dos propiedades diferentes son iguales
console.log(carro.tamaño == moto.otro_tamaño);
