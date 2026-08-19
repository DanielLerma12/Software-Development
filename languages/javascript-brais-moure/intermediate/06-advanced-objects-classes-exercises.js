/*
Clase 38 - Objetos y clases avanzados
Vídeo: https://youtu.be/iJvLAZ8MJ2E?t=11832
*/

// 1. Agregega una función al prototipo de un objeto
let muñeco = {
  nombre: "toad",
  estado: "bueno",
  referencia: "mario bros",
  accion: function () {
    console.log("Moverse a la izquierda");
  },
};

muñeco.getRefer = function () {
  console.log(this.referencia);
};

muñeco.getRefer();
// 2. Crea un objeto que herede de otro
let peluche = Object.create(muñeco);
peluche.nombre = "chica";
console.log(peluche.nombre);

// 3. Define un método de instancia en un objeto
// 4. Haz uso de get y set en un objeto
function Carro(marca, uso) {
  this.name = marca;
  this.age = uso;
}

Carro.prototype.getMarca = function () {
  console.log(`El carro es un: ${this.name}`);
};

Carro.prototype.setMarca = function (marca) {
  this.name = marca;
};

let newCarro = new Carro("Mazda", 10);
newCarro.getMarca();

newCarro.setMarca("Mitzubishi");
newCarro.getMarca();

// 5. Utiliza la operación assign en un objeto
let personCore = { name: "Brais" };
let personDetails = { edad: 37, alias: "MoureDev" };

let fullPerson = Object.assign(personCore, personDetails);
console.log(fullPerson);
// 6. Crea una clase abstracta
// 7. Utiliza polimorfismo en dos clases diferentes
// 8. Implementa un Mixin
// 9. Crea un Singleton
// 10. Desarrolla un Proxy
