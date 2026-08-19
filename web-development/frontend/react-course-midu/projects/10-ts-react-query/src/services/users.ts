export const fetchUsers = async ({ pageParam }: { pageParam?: unknown }) => {
  const res = await fetch(
    `https://randomuser.me/api/?results=10&seed=prueba&page=${pageParam as number}`,
  );

  if (!res.ok) throw new Error("Error en la petición");

  const data = await res.json();

  const currentPage = data.info.page;
  const nextCursor = currentPage > 3 ? undefined : currentPage + 1;

  return {
    users: data.results,
    nextCursor,
  };
};
