import { Link, Outlet, useLocation } from "react-router-dom";
import { useMemo } from "react";

export const Resultados = () => {
  const location = useLocation();

  const resultados = useMemo(() => {
    if (location.pathname !== "/resultados") {
      return JSON.parse(localStorage.getItem("puntajes"));
    }

    const newResultados = location.state.map((item, index) => ({
      Index: `Spin nro: ${index + 1}`,
      Puntaje: item.acumulador,
    }));

    localStorage.setItem("puntajes", JSON.stringify(newResultados));

    return JSON.parse(localStorage.getItem("puntajes"));
  }, [location.state]);

  const resultados2 = useMemo(() => {
    if (location.pathname !== "/resultados") {
      return JSON.parse(localStorage.getItem("resultados"));
    }

    localStorage.setItem("resultados", JSON.stringify(location.state));

    return JSON.parse(localStorage.getItem("resultados"));
  }, [location.state]);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 50 }}>Mis Resultados</h1>
      <ul>
        {resultados.map((resultado, index) => (
          <li key={index}>
            <Link to={`${index + 1}`}>
              {resultado.Index + " ----> Puntaje: " + resultado.Puntaje}
            </Link>
          </li>
        ))}
      </ul>
      <div
        style={{
          marginTop: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet context={{ resultados, resultados2 }} />
      </div>
    </div>
  );
};
