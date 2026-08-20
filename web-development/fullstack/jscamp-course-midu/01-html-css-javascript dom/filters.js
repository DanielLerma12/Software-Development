import { state } from "./config.js";

state.count++;

console.log(state);

const filter = document.querySelector("#filter-location");
const mensaje = document.querySelector("#filter-selected-value");

filter.addEventListener("change", function () {
  const jobs = document.querySelectorAll(".job-listing-card");

  const selectedValue = filter.value;

  if (selectedValue) {
    mensaje.textContent = `Has seleccionado: ${selectedValue}`;
  } else {
    mensaje.textContent = "";
  }

  jobs.forEach((job) => {
    // const modalidad = job.dataset.modalidad
    const modalidad = job.getAttribute("data-modalidad");
    const isShown = selectedValue === "" || selectedValue === modalidad;
    job.classList.toggle("is-hidden", isShown === false);
  });
});

// input
const inputBuscador = document.getElementById("empleos-search-input");

console.log(inputBuscador);

inputBuscador.addEventListener("keydown", (event) => {
  const jobs = document.querySelectorAll(".job-listing-card");

  const selectedValue = inputBuscador.value;

  if (selectedValue) {
    mensaje.textContent = `Has seleccionado: ${selectedValue}`;
  } else {
    mensaje.textContent = "";
  }

  jobs.forEach((job) => {
    const titulo = job.getAttribute("data-titulo");
    console.log(titulo);
    const isShown =
      selectedValue === "" ||
      titulo.toLowerCase().startsWith(selectedValue.toLowerCase());
    job.classList.toggle("is-hidden", isShown === false);
  });
});
