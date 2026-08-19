import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { Todos } from "./components/Todos.tsx";
import {
  type FilterValue,
  type ListOfTodos,
  type TodoChangeCompleted,
  type TodoId,
} from "./types.d";
import { Footer } from "./components/Footer.tsx";
import { TODO_FILTERS } from "./consts.ts";

const App = (): JSX.Element => {
  const [todos, setTodos] = useState<ListOfTodos>([]);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL,
  );

  const handleChangeInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key !== "Enter") return;

    const valueInput = event.currentTarget.value;

    const maxId = todos.reduce((previousValue, currentValue) => {
      return currentValue.id > previousValue ? currentValue.id : previousValue;
    }, 0);

    const newTodo = {
      id: maxId === 0 ? 1 : maxId + 1,
      title: valueInput,
      completed: false,
    };

    setTodos((prevState) => [...prevState, newTodo]);

    event.currentTarget.value = "";
  };

  const handleRemove = ({ id }: TodoId): void => {
    // Destructuring, TodoId es Todo[id] o un objeto
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleCompleted = ({ id, completed }: TodoChangeCompleted): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleAllCompleted = (checked: boolean): void => {
    const newTodos = todos.map((todo) => {
      return {
        ...todo,
        completed: checked,
      };
    });

    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  return (
    <>
      <div className="todoapp">
        <header className="header" data-testid="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            data-testid="text-input"
            aria-label="New Todo Input"
            placeholder="¿Qué necesitas hacer?"
            type="text"
            onKeyDown={handleChangeInput}
          />
        </header>
        <Todos
          todos={filteredTodos}
          setTodos={setTodos}
          onRemoveTodo={handleRemove}
          onToggleCompleted={handleCompleted}
          handleAllCompleted={handleAllCompleted}
        />
      </div>
      <Footer
        activeCount={activeCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
      />
    </>
  );
};

export default App;
