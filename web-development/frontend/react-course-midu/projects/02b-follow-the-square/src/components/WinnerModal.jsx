import { Square } from "./Square";

export function WinnerModal({ winner, resetGame, contador }) {
  if (winner === null) return null;

  return (
    <section className="winner">
      <div className="text">
        <h2>Final Result</h2>
        <header className="win">
          {winner && <Square>{contador}</Square>}
        </header>{" "}
        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
