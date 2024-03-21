import { v1 } from "uuid";
import { TodolistsType } from "../components/app/App";
type ActionsType = DeleteTodoTypeAC | AddTodoTypeAC | EditTitleTodoTypeAC;
export const todolistReducer = (state: TodolistsType[], action: ActionsType): TodolistsType[] => {
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

export const addTodoAC = (tId:string,title: string) => ({ type: "ADD-TODO",tId, title } as const);
export const editTitleAC = (tId: string, title: string) =>
  ({ type: "EDIT-TITLE", tId, title } as const);

export type DeleteTodoTypeAC = ReturnType<typeof deleteTodoAC>;
export type AddTodoTypeAC = ReturnType<typeof addTodoAC>;
export type EditTitleTodoTypeAC = ReturnType<typeof editTitleAC>;
