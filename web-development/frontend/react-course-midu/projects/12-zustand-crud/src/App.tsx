import UsersList from "./components/UsersList";
import { useUsersStore } from "./store/useUsersStore";

import { Toaster } from "sonner";

function App() {
  const users = useUsersStore((state) => state.users);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <UsersList />
        <label className={users.length === 0 ? "opacity-50" : "opacity-0"}>
          No hay usuarios
        </label>
        <Toaster
          toastOptions={{
            style: {
              background: "#dcfce7",
              color: "#166534",
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
