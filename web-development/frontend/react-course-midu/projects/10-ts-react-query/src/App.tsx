import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { SortBy, type User, type DataUsers, type PageUsers } from "./types.d";
import { UsersList } from "./components/UsersList";
import { useUsers } from "./hooks/useUsers";
import { useQueryClient } from "@tanstack/react-query";

function App() {
  const { isLoading, isError, users, fetchNextPage, hasNextPage } = useUsers();

  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortBy = (sortBy: SortBy) => {
    const newSortingValue = sorting === SortBy.NONE ? sortBy : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const originalData = useRef<DataUsers[]>(undefined);

  useEffect(() => {
    if (users && !originalData.current) {
      originalData.current = queryClient.getQueryData(["users"]);
    }
  }, [users]);

  const handleReset = () => {
    queryClient.setQueryData(["users"], structuredClone(originalData.current));
  };

  const handleDeleteUser = (email: string) => {
    queryClient.setQueryData(["users"], (oldUsers: DataUsers) => {
      if (!oldUsers) return oldUsers;

      return {
        ...oldUsers,
        pages: oldUsers.pages.map((page: PageUsers) => ({
          ...page,
          users: page.users.filter((user: User) => user.email !== email),
        })),
      };
    });
  };

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [filterCountry, users]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.first.localeCompare(b.name.first);
      });
    }

    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.last.localeCompare(b.name.last);
      });
    }

    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      });
    }

    if (sorting === SortBy.NONE) {
      return filteredUsers;
    }
  }, [filteredUsers, sorting]);

  return (
    <>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={() => toggleSortBy(SortBy.COUNTRY)}>
          {sorting !== SortBy.NONE ? "No ordenar por país" : "Ordenar por país"}
        </button>
        <button onClick={handleReset}>Resetear usuarios</button>
        <input
          placeholder="Filtra por país"
          onChange={(e) => setFilterCountry(e.target.value)}
        ></input>
      </header>
      <main>
        {users.length > 0 && (
          <UsersList
            showColors={showColors}
            users={sortedUsers}
            handleDeleteUser={handleDeleteUser}
            toggleSortBy={toggleSortBy}
          />
        )}
        {isLoading && <strong>Cargando...</strong>}
        {isError && <p>Error al cargar los usuarios</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError && hasNextPage && (
          <button onClick={() => fetchNextPage()}>Cargar más resultados</button>
        )}
        {!hasNextPage && <p>No hay más resultados</p>}
      </main>
    </>
  );
}

export default App;
