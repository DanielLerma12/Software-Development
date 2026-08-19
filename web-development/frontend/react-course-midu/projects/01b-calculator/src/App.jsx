import { useRef, useState } from "react";
import "./App.css";

const cuadricula = [
  "C",
  "<--",
  ".",
  "+",
  7,
  8,
  9,
  "-",
  4,
  5,
  6,
  "x",
  1,
  2,
  3,
  "/",
  "(",
  0,
  ")",
  "=",
];

function App() {
  const [valor, setValor] = useState(null);
  const prevValor = useRef("");
  const nuevoValor = useRef("");

  const insertCuadro = (index) => {
    if (cuadricula[index] === "C") {
      prevValor.current = "";
      setValor("");
      return;
    } else if (cuadricula[index] === "<-") {
      nuevoValor.current = valor.slice(0, valor.length - 1);
      if (nuevoValor.current === "") {
        console.log("hola");
        prevValor.current = "";
        setValor(nuevoValor.current);
      } else {
        setValor(nuevoValor.current);
        return;
      }
    } else if (cuadricula[index] === "=") {
      nuevoValor.current = valor.replaceAll("x", "*");
      const resultado = Function(`return ${nuevoValor.current}`)();
      setValor(resultado);
    } else {
      if (prevValor.current === "") {
        nuevoValor.current = prevValor.current + cuadricula[index];
        prevValor.current = "algo";
      } else {
        prevValor.current = valor;
        nuevoValor.current = prevValor.current + cuadricula[index];
      }

      setValor(nuevoValor.current);
    }
  };

  return (
    <main>
      <div>
        <h1>Calculator</h1>
      </div>

      <div>
        <input placeholder={valor} disabled></input>
      </div>

      <div>
        <ul className="botones">
          {cuadricula.map((cuadro, index) => {
            return (
              <li key={index}>
                <button id={index} onClick={() => insertCuadro(index)}>
                  {cuadro}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default App;
