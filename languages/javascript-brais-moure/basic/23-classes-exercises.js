/*
Clase 39 - Ejercicios: Clases
Vídeo: https://youtu.be/1glVfFxj8a4?t=18630
*/

// 1. Crea una clase que reciba dos propiedades
// 2. Añade un método a la clase que utilice las propiedades
// 3. Muestra los valores de las propiedades e invoca a la función
// 4. Añade un método estático a la primera clase
// 5. Haz uso del método estático

class Sencillo {
  constructor(name, edad) {
    this.name = name;
    this.edad = edad;
  }

  validar() {
    let msg = this.name ? `hay nombre y es ${this.name}` : "no hay nombre";
    console.log(msg);
    let msg2 = this.edad ? `hay edad y es ${this.edad}` : "no hay nombre";
    console.log(msg2);
  }

  static resultado() {
    return "resultado de busqueda correcto";
  }
}

const var1 = new Sencillo("Daniel", 26);
var1.validar();
console.log(Sencillo.resultado());

// 6. Crea una clase que haga uso de herencia
// 7. Crea una clase que haga uso de getters y setters
// 8. Modifica la clase con getters y setters para que use propiedades privadas
// 9. Utiliza los get y set y muestra sus valores
// 10. Sobrescribe un método de una clase que utilice herencia

class Humano {
  #sexo;
  #estatura;

  constructor(sexo, estatura) {
    this.#sexo = sexo;
    this.#estatura = estatura;
  }

  get infoHumano() {
    return `El humano es: ${this.#sexo}, y mide ${this.#estatura}`;
  }

  set cambiarInfo(sexo) {
    this.#sexo = sexo;
  }

  saludar() {
    console.log("Hola, soy un humano");
  }
}

class Ciudadano extends Humano {
  constructor(sexo, estatura, regCivil) {
    super(sexo, estatura);
    this.regCivil = regCivil;
  }

  saludar() {
    console.log("Hola, soy un ciudadano");
  }
}

let ciudadano1 = new Ciudadano("Masculino", 1.65, "Soltero");
console.log(ciudadano1.regCivil);
console.log((ciudadano1.cambiarInfo = "Femenino"));
console.log(ciudadano1.infoHumano);
ciudadano1.saludar();
