import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import { Home } from "./pages/Home";
import { Game } from "./pages/Game";
import { Login } from "./pages/Login";
import { Resultados } from "./pages/Resultados";
import { Details } from "./pages/Details";
import { IndexResultados } from "./pages/IndexResultados";

import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "game",
        element: (
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        ),
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "resultados",
        element: (
          <ProtectedRoute>
            <Resultados />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <IndexResultados />,
          },
          {
            path: ":id",
            element: <Details />,
          },
        ],
      },

      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);
