import { NavLink as NavLinkRouter } from "react-router-dom";

export const NavLink = ({ to, children, ...props }) => {
  return (
    <NavLinkRouter
      {...props}
      to={to}
      className={({ isActive }) => {
        return isActive ? "is-active" : undefined;
      }} // `${className ?? ""} ${isActive ? "is-active" : ""}` : caso tal que className lo pasemos props por si cada uno quiero usar su propio estilo
    >
      {children}
    </NavLinkRouter>
  );
};
