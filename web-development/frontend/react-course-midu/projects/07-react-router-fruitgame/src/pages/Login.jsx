import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState("");
  const [Contraseña, setContraseña] = useState("");

  console.log(location.state.pathname); // acceder al state, en este caso al location enviado desde ProtectedRoute
  console.log(location.pathname);

  const handleClick = () => {
    login(usuario, Contraseña);
    navigate(location.state.pathname);
  };

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
      <h1>Login</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
          marginTop: 100,
        }}
      >
        <label style={{ color: "white" }}>Usuario</label>
        <input onChange={(event) => setUsuario(event.target.value)} />
        <label style={{ color: "white" }}>Contraseña</label>
        <input onChange={(event) => setContraseña(event.target.value)} />
      </div>

      <button className="btnLogin" onClick={handleClick}>
        Login
      </button>
    </div>
  );
};
