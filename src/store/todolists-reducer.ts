import { v1 } from "uuid";

type ActionsType = DeleteTodoTypeAC | AddTodoTypeAC | EditTitleTodoTypeAC;
export type TodolistsType = {
  id: string;
  title: string;
};
export const todolist1Id = v1();
export const todolist2Id = v1();
const initialState: TodolistsType[] = [
  { id: todolist1Id, title: "What to learn" },
  { id: todolist2Id, title: "What to buy" },
];
export const todolistReducer = (
  state: TodolistsType[] = initialState,
  action: ActionsType
): TodolistsType[] => {
  switch (action.type) {
    case "DELETE-TODO": {
      return state.filter((el) => el.id !== action.tId);
    }
    case "ADD-TODO": {
      return [{ id: action.tId, title: action.title }, ...state];
    }
    case "EDIT-TITLE": {
      return state.map((el) => (el.id === action.tId ? { ...el, title: action.title } : el));
    }
    default:
      return state;
  }
};

export const deleteTodoAC = (tId: string) => ({ type: "DELETE-TODO", tId } as const);

export const addTodoAC = (tId: string, title: string) =>
  ({ type: "ADD-TODO", tId, title } as const);
export const editTitleTodoAC = (tId: string, title: string) =>
  ({ type: "EDIT-TITLE", tId, title } as const);

export type DeleteTodoTypeAC = ReturnType<typeof deleteTodoAC>;
export type AddTodoTypeAC = ReturnType<typeof addTodoAC>;
export type EditTitleTodoTypeAC = ReturnType<typeof editTitleTodoAC>;
