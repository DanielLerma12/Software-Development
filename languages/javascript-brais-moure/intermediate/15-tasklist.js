const inputador = document.querySelector("#textInput");
const diva = document.querySelector("#result");

inputador.addEventListener("input", () => {
  diva.textContent = inputador.value;
  console.log(inputador.value);
});
