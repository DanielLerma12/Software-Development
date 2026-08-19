/*
Clase 60 - APIs
Vídeo: https://youtu.be/iJvLAZ8MJ2E?t=18710
*/

// 1. Realiza una petición GET con fetch() a JSONPlaceholder y muestra en la consola la lista de publicaciones
async function pedirDatos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  console.log(data);
  console.log(response);
  return response;
}

pedirDatos()
  .then(pedirDatosError)
  .then(partialPostDelete)
  .then(() => getPokemon("charmander"));

// 2. Modifica el ejercicio anterior para que verifique si la respuesta es correcta usando response.ok. Si no lo es, lanza y muestra un error
async function pedirDatosError() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/postsfsdfsfsdzfsd",
    );
    if (!response.ok) {
      throw new Error(
        "Error en la petición: Error de tipo: " + response.status,
      );
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// 3. Reescribe el ejercicio 1 usando la sintaxis async/await en lugar de promesas

// 4. Realiza una petición POST a JSONPlaceholder para crear una nueva publicación. Envía un objeto con propiedades como title o body

// 5. Utiliza el método PUT para actualizar completamente un recurso (por ejemplo, modificar una publicación) en JSONPlaceholder

// 6. Realiza una petición PATCH para modificar únicamente uno o dos campos de un recurso existente

// 7. Envía una solicitud DELETE a la API para borrar un recurso (por ejemplo, una publicación) y verifica la respuesta
async function partialPostDelete() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        method: "DELETE",
      },
    );

    const data = await response.json();
    console.log(response.status);
  } catch (error) {
    console.log("Error", error);
  }
}

// 8. Crea una función que realice una solicitud GET (la que quieras) a OpenWeatherMap

// 9. Utiliza la PokéAPI para obtener los datos de un Pokémon concreto, a continuación los detalles de la especie y, finalmente, la cadena evolutiva a partir de la especie
async function getPokemon(pokemon) {
  // https://pokeapi.co
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(`Habilidades de ${data.name}`);
    data.abilities.forEach((ability) => {
      console.log(ability.ability.name);
      console.log(data.species.name);
    });
  } catch (error) {
    console.log("Error", error);
  }
}

// 10. Utiliza una herramienta como Postman o Thunder Client para probar diferentes endpoint de una API
