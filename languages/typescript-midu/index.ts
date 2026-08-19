// any IGNORA el tipado de typescript
let anyvalue: any = "hola";

anyvalue.dsds; // por lo tanto no infiere al ser cualquier cosa

// puede contener cualquier valor pero es más seguro que any
let anyvalue2: unknown = "hola";

anyvalue2.dsds;

//----------------------------------------------------------------//

// functions

// implicito any, compila pero falla en ejecución
function saludar(name) {
  console.log(`hola ${name}`);
}

saludar("pepe");
saludar(123);

// asignar tipo
function saludar2(name: string) {
  console.log(`hola ${name}`);
}

saludar2("pepe");
saludar2(1);

// objetos

function saludar3({ name, age }) {
  console.log(`hola ${name}, tienes ${age} años`);
}

saludar3({ name: "pepe", age: 26 });

// tipar

function saludar4({ name, age }: { name: string; age: number }) {
  console.log(`hola ${name}, tienes ${age} años`);
}

saludar4({ name: "hector", age: 55 });

// inferencia del tipo que devuelve

function saludar5({ name, age }: { name: string; age: number }): number {
  // <- tipar return
  console.log(`hola ${name}, tienes ${age} años`);
  return age; // -> number ya se infiere pero se puede especificar y tipar arriba
}

saludar5({ name: "hector", age: 55 });

// funcion como parámetro

const sayHiFromFunction = (callback: (name: string) => void) => {
  callback("Miguel");
};

const sayHi = (name: string) => {
  console.log(`Hola ${name}`);
};

sayHiFromFunction(sayHi);

// forEach por dentro

function miForEach<T>(
  array: T[],
  callback: (valor: T, indice: number, arreglo: T[]) => void,
) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

const frutas = ["🍎", "🍌", "🍇"];

miForEach(frutas, (fruta, indice) => {
  console.log(indice, fruta);
});

/* never

function saludar6( message : string): never {
  throw new Error(message)
} */

// inferencia de funciones anónimas segun el contexto
const avengers = ["spidey", "hulk", "thor"];

avengers.forEach((avenger) => {
  console.log(avenger.toUpperCase()); // string
});

// objetos

let heroes = {
  name: "thor",
  age: 1500,
};

heroes.power = 100; // contrato de objetos

// type alias

type Hero = {
  // pascal case siempre
  name: string;
  age: number;
};

function CreateHero(name: string, age: number): Hero {
  return {
    name,
    age,
  };
}

const thor = CreateHero("Thor", 1500);

// optional properties

type Hero2 = {
  id?: number;
  name: string;
  age: number;
  isActive?: boolean; // optional
};

function CreateHero2(name: string, age: number): Hero2 {
  return {
    name,
    age,
    isActive: false, // defecto
  };
}

const thor2 = CreateHero2("Thor", 1500);

thor2.id?.toString(); // verifica si existe antes de continuar

// solo lectura

type Hero3 = {
  readonly id?: number;
  name: string;
  age: number;
  isActive?: boolean; // optional
};

const jirou: Hero3 = {
  name: "cap america",
  age: 1000,
  isActive: true,
};

jirou.id = 4444; // readonly

// templates Union Types

type HeroId = `${string}-${string}-${string}-${string}-${string}`;

type Hero4 = {
  readonly id?: HeroId;
  name: string;
  age: number;
  isActive?: boolean;
};

function CreateHero3(name: string, age: number): Hero4 {
  return {
    id: 123, // tipo de cadena
    name,
    age,
    isActive: true,
  };
}

const thor3 = CreateHero3("Thor", 1500);

// union Types

type HeroId2 = `${string}-${string}-${string}-${string}-${string}`;
type HeroPowerScale = "low" | "medium" | "large";

type Hero5 = {
  readonly id?: HeroId;
  name: string;
  age: number;
  isActive?: boolean;
  powerScale?: HeroPowerScale;
};

function CreateHero4(name: string, age: number): Hero5 {
  return {
    id: crypto.randomUUID(),
    name,
    age,
    isActive: true,
  };
}

const thor4 = CreateHero4("Thor", 1500);
thor4.powerScale = "GOD";

// intersection types

type HeroId3 = `${string}-${string}-${string}-${string}-${string}`;
type HeroPowerScale2 = "low" | "medium" | "large";

type HeroBasicInfo = {
  name: string;
  age: number;
};

type HeroProperties = {
  readonly id?: HeroId;
  isActive?: boolean;
  powerScale?: HeroPowerScale;
};

type Hero6 = HeroBasicInfo & HeroProperties; // unir en vez de or |

function CreateHero5(elñeroe: HeroBasicInfo): Hero6 {
  const { name, age } = elñeroe;
  return {
    id: crypto.randomUUID(),
    name,
    age,
    isActive: true,
  };
}

const elñeroe: HeroBasicInfo = {
  name: "julio",
  age: 5000,
};

const thor5 = CreateHero5(elñeroe);

// type Indexing

type PeopleProperties = {
  isActive?: boolean;
  adress: {
    planet: string;
    city: string;
  };
};

const adressPerson: PeopleProperties["adress"] = {
  planet: "Earth",
  city: "Madrid",
};

// type from value

const address = {
  planet: "Earth",
  city: "Madrid",
};

type Address = typeof address;

// type from function return

function createAdress() {
  return {
    planet: "Earth",
    city: "Madrid",
  };
}

type Address2 = ReturnType<typeof createAdress>;

// arrays

const Languages: string[] = [];
// const Languages: Array<string> = []

Languages.push("Javascript");
Languages.push(2);

const Languages2: (string | number)[] = [];

Languages2.push("Javascript");
Languages2.push(2);

// array de arrays, tuplas

type cellValue = "X" | "0" | "";
type gameBoard = [
  [cellValue, cellValue, cellValue],
  [cellValue, cellValue, cellValue],
  [cellValue, cellValue, cellValue],
];

const gameBoard: gameBoard = [
  ["X", "0", "X". "O"],
  ["0", "0", "X"],
  ["X", "X", ""],
];

gameBoard[0][1] = "0";

//---//

type RGB = [number, number, number]

const rgb: RGB = ["a", 2, 3]

// enums para colección de datos finita

enum ERROR_TYPES {
  NOT_FOUND,
  UNAUTHORIZED,
  FORBIDDEN
}

function mostrarMensaje (tipoDeError: ERROR_TYPES){
  if(tipoDeError === ERROR_TYPES.NOT_FOUND){
    console.log("")
  }
  
}

// objetos constantes en vez de enums

const Status = {
  Pending: "pending",
  Approved: "approved",
  Rejected: "rejected",
} as const; 

export type Status = typeof Status[keyof typeof Status];

/* sin const, ts no infiere que el valor puede ser: "Pending" | "Approved" | "Rejected", seria simplemente: 
{
  Pending: string;
  Approved: string;
  Rejected: string;
}
*/

// aserciones de tipos

const canvas = document.getElementById("canvas") as HTMLCanvasElement // usuario indica a ts el tipo. pero puede ser HTMLCanvasElement
const ctx = canvas.getContext("2d")

//----

const canvas2 = document.getElementById("canvas")

// ts se da cuenta que dentro del if ya solo el canvas va a poder ser un HTMLCanvasElement
if(canvas2 !== null && canvas2 instanceof HTMLCanvasElement){
  const ctx2 = canvas2.getContext("2d")
}

// aserciones de tipos en fetching de datos

const API_URL = "https://..."

const response = await fetch(API_URL)
if(!response.ok){
  throw new Error("Request failed")
} 

type APIResponse = {
  items: object[]
}

const data = await response.json() as APIResponse

data.items

// mejor usar quicktype para pegar el json o el formato de res y generar los types automáticamente
// también se puede usar ts zod, para validar de una vez en runtime

// Interfaces

interface tal { // describir la forma de objetos, type sería mas general
  name: "thor",
  age: 1500,
}

// narrowing

function mostrarLongitud(objeto: number | string){
  if (typeof objeto === "string"){ // typeguard o narrowing
    return objeto.length
  }

  return objeto.toString()
}

mostrarLongitud("1")

//-----

interface Mario{
  company: "Nintendo"
  nombre: string,
  saltar: () => void
}

interface Sonic{
  company: "Sega",
  nombre: string,
  correr: () => void
}

type Personaje = Mario | Sonic

function jugar(personaje: Personaje){
  if(personaje.company === "Nintendo"){
    personaje.saltar()
    return
  }
  personaje.correr()
}