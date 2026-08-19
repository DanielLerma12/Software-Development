import { type TODO_FILTERS } from "./consts";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoId = Pick<Todo, "id">; // ===> Todo[id] or
// type TodoId = {
// id: string;
// };
export type TodoTitle = Pick<Todo, "title">;
export type TodoCompleted = Pick<Todo, "completed">;
export type TodoChangeCompleted = Pick<Todo, "id" | "completed">;

export type ListOfTodos = Todo[];

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
