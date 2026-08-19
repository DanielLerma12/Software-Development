import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndgame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveLocalStorage, resetLocalStorage } from "./logic/index.js";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    if (turnFromStorage) return JSON.parse(turnFromStorage);
    return TURNS.X;
  });

  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem("winner");
    if (winnerFromStorage !== null) return JSON.parse(winnerFromStorage);
    return null;
  });

  const resetGame = () => {
    const newBoard = Array(9).fill(null);
    const newTurn = TURNS.X;
    const newWinner = null;

    setBoard(newBoard);
    setTurn(newTurn);
    setWinner(newWinner);

    resetLocalStorage();
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    let newWinner = checkWinnerFrom(newBoard);

    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndgame(newBoard)) {
      newWinner = false;
      setWinner(newWinner);
    }

    saveLocalStorage(newBoard, newTurn, newWinner);
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((element, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {element}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
