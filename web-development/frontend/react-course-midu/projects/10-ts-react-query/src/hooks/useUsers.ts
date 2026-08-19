import { fetchUsers } from "../services/users";
import { type PageUsers } from "../types.d";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PageUsers>({
      queryKey: ["users"],
      queryFn: fetchUsers,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false, // En caso de que no cambien los datos al irse o cambiar de página, entonces se evita un refetch
      staleTime: 1000 * 60 * 60 * 24, // Los datos permanecen frescos durante 24 h. Después se consideran stale.
    });

  return {
    isLoading,
    isError,
    users: data?.pages?.flatMap((page) => page.users) ?? [],
    fetchNextPage,
    hasNextPage,
  };
};
