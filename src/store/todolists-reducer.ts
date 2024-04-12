import { ChangeTodolistsResponse, TodolistsResponse, todolistsApi } from "../api/todolists-api";

import { ThunkActionAppType } from "./store";

import { StatusType, changeAppStatusAC } from "./app-reducer";
import { helpChangeStatusFunc } from "./helpFunction/changeStatusHelpFunc";
import { errorCatchHelpFunc, errorHelpFunc } from "./helpFunction/errorHelpFunc";

export type ActionsTodolistsType =
  | DeleteTodoTypeAC
  | AddTodoTypeAC
  | EditTitleTodoTypeAC
  | SetTodoTypeAC
  | ChangeStatusTodoTypeAC;

export const initialTodolistsState: ChangeTodolistsResponse[] = [];

export const todolistReducer = (
  state: ChangeTodolistsResponse[] = initialTodolistsState,
  action: ActionsTodolistsType
): ChangeTodolistsResponse[] => {
  switch (action.type) {
    case "DELETE-TODO": {
      return state.filter((el) => el.id !== action.tId);
    }
    case "ADD-TODO": {
      return [
        { id: action.tId, title: action.title, addedDate: "", order: 0, statusTodo: "idle" },
        ...state,
      ];
    }
    case "EDIT-TITLE": {
      return state.map((el) => (el.id === action.tId ? { ...el, title: action.title } : el));
    }
    case "SET-TODO": {
      return action.todolists.map((el) => ({ ...el, statusTodo: "idle" }));
    }
    case "CHANGE-STATUS-TODO": {
      return state.map((el) => (el.id === action.tId ? { ...el, statusTodo: action.status } : el));
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
export const changeStatusTodoAC = (tId: string, status: StatusType) =>
  ({ type: "CHANGE-STATUS-TODO", tId, status }) as const;

export const setTodoTC = (): ThunkActionAppType => async (dispatch) => {
  dispatch(changeAppStatusAC("loading"));
  try {
    const res = await todolistsApi.getTodolists();
    dispatch(setTodoAC(res.data));
    dispatch(changeAppStatusAC("succeeded"));
  } catch (error) {
    errorCatchHelpFunc(dispatch, error);
  }
};
export const deleteTodoTC =
  (id: string): ThunkActionAppType =>
  async (dispatch) => {
    helpChangeStatusFunc(id, "loading", dispatch);
    try {
      await todolistsApi.deleteTodolist(id);
      dispatch(deleteTodoAC(id));
      helpChangeStatusFunc(id, "succeeded", dispatch);
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
      dispatch(changeStatusTodoAC(id, "failed"));
    }
  };
export const addTodoTC =
  (title: string): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC("loading"));
    try {
      const res = await todolistsApi.addTodolist(title);
      errorHelpFunc<{ item: TodolistsResponse }>(
        () => dispatch(addTodoAC(res.data.data.item.id, title)),
        res,
        dispatch
      );
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };
export const editTitleTodoTC =
  (id: string, title: string): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC("loading"));
    try {
      const res = await todolistsApi.changeTitleTodolist(id, title);
      errorHelpFunc(() => dispatch(editTitleTodoAC(id, title)), res, dispatch);

      dispatch(changeAppStatusAC("succeeded"));
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };

export type DeleteTodoTypeAC = ReturnType<typeof deleteTodoAC>;
export type AddTodoTypeAC = ReturnType<typeof addTodoAC>;
export type EditTitleTodoTypeAC = ReturnType<typeof editTitleTodoAC>;
export type SetTodoTypeAC = ReturnType<typeof setTodoAC>;
export type ChangeStatusTodoTypeAC = ReturnType<typeof changeStatusTodoAC>;
