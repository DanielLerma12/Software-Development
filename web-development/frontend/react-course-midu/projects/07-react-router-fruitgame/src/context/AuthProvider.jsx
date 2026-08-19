import { useState } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    Boolean(localStorage.getItem("usuario")),
  );

  const login = (user, password) => {
    if (user !== "horneto") return;
    if (password !== "123") return;

    localStorage.setItem("usuario", user);
    localStorage.setItem("password", password);
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
