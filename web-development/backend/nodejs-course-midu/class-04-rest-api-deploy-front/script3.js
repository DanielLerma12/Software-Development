import { API_URL } from "./config.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`${API_URL}/movies/${id}`)
  .then((res) => res.json())
  .then((movies) => {
    document.querySelector("main").innerHTML =
      `               <h2>Update Movie</h2>
            <div>
                <p >Title</p>
                <input id="titulo" value="${movies.title}" autofocus />
                <p >Year</p>
                <input id="ano"  value="${movies.year}"></input>
                <p >Director</p>
                <input id="director"  value="${movies.director}"></input>
                <p >Duration</p>
                <input id="duracion"  value="${movies.duration}"></input>
                <p >Poster</p>
                <input id="poster"  value="${movies.poster}"></input>
                <p >Genre</p>
                <input id="genero"  value="${movies.genres.join(", ")}"></input>
                <p >Rate</p>
                <input id="rate"  value="${movies.rate}"></input>
            </div>
            <button id="boton">Update</button>
          `;

    const loading = document.getElementById("loading");
    loading.hidden = true;

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
        const res = await fetch(`${API_URL}/movies/${id}`, {
          method: "PATCH",
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
          console.log("movie updated");
        }
      } catch (e) {
        console.error("Error de red:", e);
      }
    });
  });
