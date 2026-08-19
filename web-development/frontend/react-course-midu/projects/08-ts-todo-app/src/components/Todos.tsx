import { type ListOfTodos } from "../types.d";
import { type TodoId, type TodoChangeCompleted } from "../types.d";
import { Todo } from "./Todo";

interface Props {
  todos: ListOfTodos;
  setTodos: React.Dispatch<React.SetStateAction<ListOfTodos>>;
  onRemoveTodo: ({ id }: TodoId) => void;
  onToggleCompleted: ({ id, completed }: TodoChangeCompleted) => void;
  handleAllCompleted: (checked: boolean) => void;
}

export const Todos: React.FC<Props> = ({
  setTodos,
  todos,
  onRemoveTodo,
  onToggleCompleted,
  handleAllCompleted,
}) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`${todo.completed ? "completed" : ""}`}>
          <Todo
            todos={todos}
            setTodos={setTodos}
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompleted={onToggleCompleted}
            handleAllCompleted={handleAllCompleted}
          ></Todo>
        </li>
      ))}
    </ul>
  );
};
