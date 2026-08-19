import { useAuth } from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" replace state={location} />; // state={{location, o mas datos}} para enviar información cargada del usuario a la otra URL
  }

  return children;
};
