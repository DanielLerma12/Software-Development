import { useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { SYMBOLS } from "./symbols";
import { WinnerModal } from "./components/WinnerModal.jsx";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [endgamemodal, setEndgameModal] = useState(null);
  // clase del boton para desactivarlo cuando empiece
  const [classButton, setClassButton] = useState("enabled");
  // clase del cuadro para cambiar color al seleccionar
  const [squareLight, setSquareLight] = useState(null);
  // control de clicks
  const [gameState, setGameState] = useState(false);
  // clicks para pasar al winner modal
  const [clicks, setClicks] = useState(0);
  // refs para control de tiempo, generacion de random y comprobacion de repeticion y
  // contador para cantidad de clicks
  const tiempo = useRef(1000);
  const numeroRandom = useRef(0);
  const prevRandom = useRef(0);
  const contador = useRef(0);

  function getRandomSquare() {
    do {
      numeroRandom.current = Math.floor(Math.random() * 9);
    } while (numeroRandom.current === prevRandom.current);
  }

  const StartGame = () => {
    // copia de board
    const newBoard = [...board];
    // generacion de clicks
    setGameState(true);
    // boton Start desactivado
    setClassButton("disabled");

    // funcion y condicional para no repetir random
    getRandomSquare();

    // prev para hacer condicional cada bucle de StartGame
    prevRandom.current = numeroRandom.current;

    // ingresar simbolo
    newBoard[numeroRandom.current] = SYMBOLS.X;
    setBoard(newBoard);

    // temporizador
    const intervalo = setTimeout(() => {
      // apagar cuadrado para cada cambio
      setSquareLight(null);
      // bajar tiempo
      tiempo.current = tiempo.current - 50;
      // tiempo sin acabar
      if (tiempo.current !== 0) {
        // borrar temporizador actual
        clearTimeout(intervalo);
        // repetir funcion
        StartGame();
      } else if (tiempo.current === 0) {
        // boton Start activo nuevamente
        setClassButton("enabled");
        // no se puede clickar mas
        setGameState(false);
        // activar modal de fin de juego
        setEndgameModal(true);
        // un poco de confeti
        confetti();
      }
    }, tiempo.current);
  };

  const FollowBoard = (index) => {
    // comprueba doble click
    if (!gameState) return;
    // si se hizo click donde era:
    if (index === numeroRandom.current) {
      // indice del cuadrado a iluminar
      setSquareLight(index);
      // contador de clicks
      contador.current = contador.current + 1;
      setClicks(contador.current);
      // Setea para evitar doble click
      setGameState(false);
      return;
    }
  };

  const resetGame = () => {
    window.location.reload();
  };

  return (
    <main className="board">
      <h1>Follow the X</h1>
      <button className={classButton} onClick={StartGame}>
        Start
      </button>
      <section className="game">
        {board.map((element, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={FollowBoard}
              isSelected={index === squareLight} // cuadrado a iluminar
            >
              {element}
            </Square>
          );
        })}
      </section>

      <WinnerModal
        winner={endgamemodal}
        contador={clicks}
        resetGame={resetGame}
      />
    </main>
  );
}
export default App;
