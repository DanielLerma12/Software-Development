import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getComments,
  type CommentWithId,
  type Comment,
  postComment,
} from "./comments";
import { FormInput, FormTextArea } from "./components/Form";
import { Results } from "./components/Results";

function App() {
  const { data, isLoading, error } = useQuery<CommentWithId[]>({
    queryKey: ["comments"],
    queryFn: getComments,
  });
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoadingMutation } = useMutation({
    mutationFn: postComment,
    // actualización optimista, se ejecuta antes de mutationFn
    onMutate: async (newComment) => {
      // por si hay una query en curso que haga conflicto
      await queryClient.cancelQueries({
        queryKey: ["comments"],
      });

      // guardar el estado previo, por si tenemos que hacer un rollback
      const previousComments = queryClient.getQueryData<CommentWithId[]>([
        "comments",
      ]);

      // modificamos la caché
      queryClient.setQueryData(
        ["comments"],
        (oldData?: Comment[]): Comment[] => {
          // creamos una propiedad preview y un Id temporal para que las lea los componentes
          // sin modificar el newComment porque mutaria lo que se envia a mutationFn
          const newCommentPreview = structuredClone(newComment);
          newCommentPreview.preview = true;
          newCommentPreview.id = "temp";

          if (oldData == null) return [newCommentPreview];
          return [...oldData, newCommentPreview];
        },
      );
      // contexto que recibe en caso de error y se envía el rollback
      return { previousComments };
    },
    onError: (error, variables, context) => {
      console.error(error);
      if (context?.previousComments != null) {
        queryClient.setQueryData(["comments"], context.previousComments);
      }
    },
    onSettled: async () => {
      // se refresca, con eso el truquito de preview se va y la cache es ahora lo que hizo post
      await queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isLoadingMutation) return;

    event.preventDefault();
    // ---> ???
    const form = new FormData(event.currentTarget);
    const message = form.get("message")?.toString() ?? "";
    const title = form.get("title")?.toString() ?? "";

    if (title !== "" && message !== "") {
      mutate({ title, message });
    }
  };

  return (
    <main className="grid h-screen grid-cols-2">
      <div>
        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        <Results data={data} />
      </div>
      <div>
        <form
          className={`${isLoadingMutation ? "opacity-40" : ""} block max-w-xl px-4 m-auto`}
          onSubmit={handleSubmit}
        >
          <FormInput />
          <FormTextArea />

          <button
            disabled={isLoadingMutation}
            type="submit"
            className="mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2"
          >
            {isLoadingMutation ? "Enviando comentario..." : "Enviar comentario"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
