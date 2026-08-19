import { SortBy, type User } from "../types.d";

interface Props {
  users: User[] | undefined;
  showColors: boolean;
  handleDeleteUser: (index: string) => void;
  toggleSortBy: (sortBy: SortBy) => void;
}

export function UsersList({
  users,
  showColors,
  handleDeleteUser,
  toggleSortBy,
}: Props) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th className="pointer" onClick={() => toggleSortBy(SortBy.NAME)}>
            Nombre
          </th>
          <th className="pointer" onClick={() => toggleSortBy(SortBy.LAST)}>
            Apellido
          </th>
          <th className="pointer" onClick={() => toggleSortBy(SortBy.COUNTRY)}>
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? "#333" : "#555";
          return (
            <tr
              key={user.email}
              style={
                showColors ? { backgroundColor: backgroundColor } : undefined
              }
            >
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.email)}>
                  Borrar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
