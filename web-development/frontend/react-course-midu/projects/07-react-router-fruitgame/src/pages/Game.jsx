import { Link } from "react-router-dom";
import "../Game.css";
import { useEffect, useState } from "react";

const Cuadricula = ({ celdas }) => {
  const [renderFruits, setRenderFruits] = useState([]);

  useEffect(() => {
    const timers = [];
    if (celdas.length !== 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRenderFruits([]);

      celdas.forEach((celda, index) => {
        const id = setTimeout(() => {
          setRenderFruits((prevState) => [...prevState, celda]);
        }, index * 30);

        timers.push(id);
      });
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [celdas]);

  return (
    <>
      {renderFruits.length === 0 ? (
        <div className="start-screen">
          <h2>🍓 Fruit Combo 🍇</h2>
          <p>Press SPIN to start!</p>
        </div>
      ) : (
        <div className="grid">
          {renderFruits.map((celda) => (
            <div
              key={celda.id}
              className={
                celda.visible
                  ? celda.highlight
                    ? "cell highlight"
                    : "cell"
                  : "cellHidden"
              }
            >
              {celda.fruta}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export const Game = () => {
  const [celdas, setCeldas] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [disabledRes, setDisabledRes] = useState(true);
  const [disabledSpin, setDisabledSpin] = useState(false);

  const crearCeldas = () => {
    const celdasVisibles = [3, 7, 8, 9, 11, 12, 13, 14, 15, 17, 18, 19, 23];
    const frutas = ["🍇", "🍉", "🍊", "🍎", "🍋‍🟩"];

    const randomFruta = Array.from({ length: 13 }, () =>
      Math.floor(Math.random() * 5),
    );

    return Array.from({ length: 25 }).map((_, index) => ({
      id: index + 1,
      visible: celdasVisibles.includes(index + 1),
      fruta: celdasVisibles.includes(index + 1)
        ? frutas[randomFruta[celdasVisibles.indexOf(index + 1)]]
        : null,
    }));
  };

  const Matching = (celdas) => {
    const frutaInit = celdas.find((c) => c.id === 11).fruta;

    return celdas.map((celda) => ({
      ...celda,
      highlight: celda.visible && celda.fruta === frutaInit,
    }));
  };

  const renderFruits = (arrayFruits) => {
    setDisabledSpin(true);

    if (resultados.length === 10) {
      setDisabledRes(false);
      setDisabledSpin(true);
    } else {
      if (resultados.length === 9) {
        setDisabledRes(false);
      }
      const nuevasCeldas = crearCeldas(arrayFruits);
      const celdasConHighlight = Matching(nuevasCeldas);

      setCeldas(celdasConHighlight);

      let acum = 0;

      celdasConHighlight.map((celda) => {
        if (celda.highlight) return acum++;
        else return acum;
      });

      setResultados((prevState) => [
        ...prevState,
        {
          matriz: celdasConHighlight,
          acumulador: acum,
        },
      ]);

      setTimeout(() => {
        setDisabledSpin(false);
      }, 800);
    }
  };

  return (
    <div>
      <div className="background">
        <span className="fruit">🍎</span>
        <span className="fruit">🍌</span>
        <span className="fruit">🍍</span>
        <span className="fruit">🍉</span>
        <span className="fruit">🍇</span>
        <span className="fruit">🍒</span>
        <span className="fruit">🍓</span>
        <span className="fruit">🍊</span>
        <span className="fruit">🥝</span>
        <span className="fruit">🍐</span>
        <span className="fruit">🍑</span>
        <span className="fruit">🥥</span>
        <span className="fruit">🍎</span>
        <span className="fruit">🍌</span>
        <span className="fruit">🍍</span>
        <span className="fruit">🍉</span>
        <span className="fruit">🍇</span>
        <span className="fruit">🍒</span>
        <span className="fruit">🍓</span>
        <span className="fruit">🍊</span>
        <span className="fruit">🥝</span>
        <span className="fruit">🍐</span>
        <span className="fruit">🍑</span>
        <span className="fruit">🥥</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: 800,
          margin: "50px auto",
        }}
      >
        <h1>Fruit Combo Game</h1>
        <Cuadricula celdas={celdas} />

        <button
          className="spin-btn"
          onClick={renderFruits}
          disabled={disabledSpin}
        >
          SPIN
        </button>
        <Link
          style={{ marginTop: 50 }}
          to="/resultados"
          onClick={(e) => {
            if (disabledRes) {
              e.preventDefault();
            }
          }}
          state={resultados}
        >
          Ir a resultados
        </Link>
      </div>
    </div>
  );
};
