export const Home = () => {
  return (
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
      <h1>Fruit Comb</h1>
      <img
        style={{ marginTop: 100 }}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD3w8niePGhMe3KLPsgtro2HEtGOM-XuE2sftZU-DGiCJgkJc3DkPzS3jM&amp;s=10"
      />
      <p
        style={{
          fontSize: "34px",
          fontWeight: 500,
          color: "white",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
          marginTop: 100,
          textAlign: "center",
        }}
      >
        Fruit comb es un simulador de frutas cayendo similar a los juegos de
        casino, el objetivo es obtener el máximo puntaje posible antes de que se
        acaben los créditos (10).
      </p>
    </div>
  );
};
