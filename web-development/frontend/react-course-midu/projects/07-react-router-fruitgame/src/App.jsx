import { Outlet } from "react-router-dom";
import { NavLink } from "./components/NavLink";

function App() {
  return (
    <div>
      <header>
        <nav>
          <div className="titleTodo">
            <h1>React Router Fruit Combo 🍒</h1>
          </div>
          <div className="navButtons">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/game">Ir a Juego</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

// const navigation = useNavigation();      para administrar cargas de navegación

// if (navigation.state === "loading") {
//  return <Spinner />;
// }
