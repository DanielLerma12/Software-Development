import { API_URL } from "./config.js";

console.log(API_URL);

fetch(`${API_URL}/movies`)
  .then((res) => res.json())
  .then((movies) => {
    const html = movies
      .map((movie) => {
        return `

            <article data-id="${movie.id}">
              <h2>${movie.title}</h2>
              <img src="${movie.poster}" alt="${movie.title}">
               <p>${movie.director}</p>
              <p>${movie.year}</p>
              <button>Edit</button>
              <button>Delete</button>
            </article>

          `;
      })
      .join("");

    document.querySelector("section").innerHTML = html;

    document.addEventListener("click", (e) => {
      if (e.target.matches("button")) {
        const article = e.target.closest("article");
        const id = article.dataset.id;
        if (e.target.textContent === "Delete") {
          fetch(`${API_URL}/movies/${id}`, {
            method: "DELETE",
          }).then((res) => {
            if (res.ok) {
              article.remove();
              console.log("movie deleted");
            }
          });
        }
        if (e.target.textContent === "Edit") {
          window.location.href = `./updatemovie.html?id=${id}`;
        }
      }
    });
  });
