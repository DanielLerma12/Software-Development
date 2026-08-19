import { useState } from "react";
import { type Todo as TodoType } from "../types.d";
import { type TodoId, type TodoChangeCompleted } from "../types.d";
import { type ListOfTodos } from "../types.d";

interface Props extends TodoType {
  todos: ListOfTodos;
  setTodos: React.Dispatch<React.SetStateAction<ListOfTodos>>;
  onRemoveTodo: ({ id }: TodoId) => void;
  onToggleCompleted: ({ id, completed }: TodoChangeCompleted) => void;
  handleAllCompleted: (checked: boolean) => void;
}

export const Todo: React.FC<Props> = ({
  todos,
  setTodos,
  id,
  title,
  completed,
  onRemoveTodo,
  onToggleCompleted,
  handleAllCompleted,
}) => {
  const [doubleClickInput, setDoubleClickInput] = useState(true);

  const handleChangeInputDb = (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: number,
    setTodos: React.Dispatch<React.SetStateAction<ListOfTodos>>,
  ): void => {
    if (event.key !== "Enter") return;

    const valueInput = event.currentTarget.value;

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: valueInput,
        };
      }

      return todo;
    });

    setTodos(newTodos);

    event.currentTarget.value = "";

    setDoubleClickInput((prevState) => !prevState);
  };

  const handleChangeCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    onToggleCompleted({
      id,
      completed: event.target.checked,
    });
  };

  const handleChangeCheckboxAll = (
    event: React.MouseEvent<HTMLInputElement>,
  ): void => {
    handleAllCompleted(!event.currentTarget.checked);
  };

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={handleChangeCheckbox}
        onDoubleClick={handleChangeCheckboxAll}
      ></input>
      {doubleClickInput && (
        <label
          onDoubleClick={() => setDoubleClickInput((prevState) => !prevState)}
        >
          {title}
        </label>
      )}
      {doubleClickInput === false && (
        <input
          autoFocus
          className="new-todo"
          data-testid="text-input"
          aria-label="New Todo Input"
          type="text"
          defaultValue={title}
          onBlur={() => setDoubleClickInput((prevState) => !prevState)}
          onKeyDown={(event) => handleChangeInputDb(event, id, setTodos)}
        />
      )}
      <button
        className="destroy"
        onClick={() => {
          onRemoveTodo({ id });
        }}
      ></button>
    </div>
  );
};
