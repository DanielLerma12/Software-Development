/*
Clase 33 - Objetos
Vídeo: https://youtu.be/1glVfFxj8a4?t=14229
*/

// Objetos

// Sintaxis

let person = {
  name: "Brais",
  age: 37,
  alias: "MoureDev",
};

// Acceso a propiedades

// Notación punto
console.log(person.name);

// Notación de corchetes
console.log(person["name"]);

// Modificación de propiedades

person.name = "Brais Moure";
console.log(person.name);

console.log(typeof person.age);
person.age = "37";
console.log(person.age);
console.log(typeof person.age);

// Eliminación de propiedades

delete person.age;

console.log(person);

// Nueva propiedad

person.email = "braismoure@mouredev.com";
person["age"] = 37;

console.log(person);

// Métodos (funciones)

let person2 = {
  name: "Brais",
  age: 37,
  alias: "MoureDev",
  walk: function () {
    console.log("La persona camina.");
  },
};
person2.walk();

// Anidación de objetos

let person3 = {
  name: "Brais",
  age: 37,
  alias: "MoureDev",
  walk: function () {
    console.log("La persona camina.");
  },
  job: {
    name: "Programador",
    exp: 15,
    work: function () {
      console.log(`La persona de ${this.exp} años de experiencia trabaja.`);
    },
  },
};

console.log(person3);

console.log(person3.name);
console.log(person3.job);
console.log(person3.job.name);
person3.job.work();

// Igualdad de objetos

let person4 = {
  name: "Brais Moure",
  alias: "MoureDev",
  email: "braismoure@mouredev.com",
  age: 37,
};

console.log(person);
console.log(person4);

console.log(person == person4);
console.log(person === person4);

console.log(person.name == person4.name);

// Iteración

for (let key in person4) {
  console.log(key + ": " + person4[key]);
}

/* Ejemplo de propiedad .entries, devuelve ambos valores, key y value, convirtiendo tambien el objeto en iterable
 
Object.entries() ← el más usado

Devuelve key + value juntos:

Object.entries(user)

Resultado:

[
  ["name", "Daniel"],
  ["age", 17]
]

Ahora puedes hacer:

for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}

Resultado:

name Daniel
age 17
*/

// Funciones como objetos

function Person(name, age) {
  // Debería ser una clase
  this.name = name;
  this.age = age;
}

let person5 = new Person("Brais", 37);
console.log(person5);
console.log(person5.name);

console.log(typeof person5);
console.log(typeof person4);
