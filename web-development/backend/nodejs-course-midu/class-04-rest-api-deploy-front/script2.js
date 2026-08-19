import { API_URL } from "./config.js";

const titulo = document.getElementById("titulo");
const ano = document.getElementById("ano");
const director = document.getElementById("director");
const duracion = document.getElementById("duracion");
const poster = document.getElementById("poster");
const genero = document.getElementById("genero");
const rate = document.getElementById("rate");
const boton = document.getElementById("boton");

boton.addEventListener("click", async (e) => {
  e.preventDefault();
  const movie = {
    title: titulo.value,
    year: Number(ano.value),
    director: director.value,
    duration: Number(duracion.value),
    poster: poster.value,
    genre: genero.value.split(",").map((gen) => gen.trim()),
    rate: Number(rate.value),
  };

  try {
    const res = await fetch(`${API_URL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    const data = await res.json();

    if (!res.ok) {
      data.forEach((error) => {
        console.log(error.path.join("."), "-", error.message);
        return;
      });
    } else {
      console.log("movie created");
    }
  } catch (e) {
    console.error("Error de red:", e);
  }
});
