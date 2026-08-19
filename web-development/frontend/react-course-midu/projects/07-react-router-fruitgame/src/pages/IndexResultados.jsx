import { useOutletContext } from "react-router-dom";

export const IndexResultados = () => {
  const { resultados } = useOutletContext();

  const acumulador = resultados.reduce((total, prev) => {
    return total + prev.Puntaje;
  }, 0);

  return <h1>El puntaje total es de: {acumulador}</h1>;
};
