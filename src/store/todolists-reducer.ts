import { Dispatch, UnknownAction } from "redux";
import { TodolistsResponse, todolistsApi } from "../api/todolists-api";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootReducerType, ThunkActionAppType } from "./store";
import { AxiosError } from "axios";

export type ActionsTodolistsType =
  | DeleteTodoTypeAC
  | AddTodoTypeAC
  | EditTitleTodoTypeAC
  | setTodoTypeAC;

export const initialTodolistsState: TodolistsResponse[] = [];

export const todolistReducer = (
  state: TodolistsResponse[] = initialTodolistsState,
  action: ActionsTodolistsType
): TodolistsResponse[] => {
  switch (action.type) {
    case "DELETE-TODO": {
      return state.filter((el) => el.id !== action.tId);
    }
    case "ADD-TODO": {
      return [{ id: action.tId, title: action.title, addedDate: "", order: 0 }, ...state];
    }
    case "EDIT-TITLE": {
      return state.map((el) => (el.id === action.tId ? { ...el, title: action.title } : el));
    }
    case "SET-TODO": {
      return action.todolists;
    }
    default:
      return state;
  }
};

export const deleteTodoAC = (tId: string) => ({ type: "DELETE-TODO", tId }) as const;

export const addTodoAC = (tId: string, title: string) =>
  ({ type: "ADD-TODO", tId, title }) as const;
export const editTitleTodoAC = (tId: string, title: string) =>
  ({ type: "EDIT-TITLE", tId, title }) as const;
export const setTodoAC = (todolists: TodolistsResponse[]) =>
  ({ type: "SET-TODO", todolists }) as const;

export const setTodoTC = (): ThunkActionAppType => async (dispatch) => {
  try {
    const res = await todolistsApi.getTodolists();
    dispatch(setTodoAC(res.data));
  } catch {}
};
export const deleteTodoTC =
  (id: string): ThunkActionAppType =>
  async (dispatch) => {
    try {
      await todolistsApi.deleteTodolist(id);
      dispatch(deleteTodoAC(id));
    } catch {}
  };
export const addTodoTC =
  (title: string): ThunkActionAppType =>
  async (dispatch) => {
    try {
      const res = await todolistsApi.addTodolist(title);

      dispatch(addTodoAC(res.data.data.item.id, title));
    } catch {}
  };
export const editTitleTodoTC =
  (id: string, title: string): ThunkActionAppType =>
  async (dispatch) => {
    try {
      await todolistsApi.changeTitleTodolist(id, title);

      dispatch(editTitleTodoAC(id, title));
    } catch {}
  };

export type DeleteTodoTypeAC = ReturnType<typeof deleteTodoAC>;
export type AddTodoTypeAC = ReturnType<typeof addTodoAC>;
export type EditTitleTodoTypeAC = ReturnType<typeof editTitleTodoAC>;
export type setTodoTypeAC = ReturnType<typeof setTodoAC>;
