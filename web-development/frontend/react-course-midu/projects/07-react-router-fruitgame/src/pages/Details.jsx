import { useOutletContext, useParams } from "react-router-dom";

export const Details = () => {
  const { resultados2 } = useOutletContext();

  const { id } = useParams();
  const indice = Number(id - 1);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Detalles</h1>

      <div className="grid results">
        {resultados2[indice]?.matriz.map((celda) => (
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
    </div>
  );
};
