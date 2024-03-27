import { v1 } from "uuid";

import { AddTodoTypeAC, DeleteTodoTypeAC, todolist1Id, todolist2Id } from "./todolists-reducer";

export type ActionsTasksType =
  | AddTaskTypeAC
  | ChangeStatusTaskTypeAC
  | DeleteTaskTypeAC
  | EditTitleTaskTypeAC
  | AddTodoTypeAC
  | DeleteTodoTypeAC;
export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TaskObjType = {
  [key: string]: TasksType[];
};

export const initialTasksState: TaskObjType = {
  [todolist1Id]: [
    { id: v1(), title: "Css", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "TypeScript", isDone: false },
  ],
  [todolist2Id]: [
    { id: v1(), title: "book", isDone: true },
    { id: v1(), title: "bread", isDone: false },
    { id: v1(), title: "milk", isDone: false },
  ],
};
export const tasksReducer = (
  state: TaskObjType = initialTasksState,
  action: ActionsTasksType
): TaskObjType => {
  switch (action.type) {
    case "ADD-TASK": {
      return {
        ...state,
        [action.tId]: [...state[action.tId], { id: v1(), title: action.title, isDone: false }],
      };
    }
    case "CHANGE-STATUS-TASK": {
      return {
        ...state,
        [action.tId]: state[action.tId].map((el) =>
          el.id === action.id ? { ...el, isDone: action.isDone } : el
        ),
      };
    }
    case "DELETE-TASK": {
      return { ...state, [action.tId]: state[action.tId].filter((el) => el.id !== action.id) };
    }
    case "EDIT-TITLE-TASK": {
      return {
        ...state,
        [action.tId]: state[action.tId].map((el) =>
          el.id === action.id ? { ...el, title: action.title } : el
        ),
      };
    }
    case "ADD-TODO": {
      return { ...state, [action.tId]: [] };
    }
    case "DELETE-TODO": {
      const newObj = { ...state };
      delete newObj[action.tId];
      return newObj;
    }
    default:
      return state;
  }
};

export const addTaskAC = (tId: string, title: string) =>
  ({ type: "ADD-TASK", tId, title } as const);

export const changeStatusTaskAC = (tId: string, id: string, isDone: boolean) =>
  ({ type: "CHANGE-STATUS-TASK", tId, id, isDone } as const);

export const deleteTaskAC = (tId: string, id: string) =>
  ({ type: "DELETE-TASK", tId, id } as const);

export const editTitleTaskAC = (tId: string, id: string, title: string) =>
  ({ type: "EDIT-TITLE-TASK", tId, id, title } as const);

export type AddTaskTypeAC = ReturnType<typeof addTaskAC>;

export type ChangeStatusTaskTypeAC = ReturnType<typeof changeStatusTaskAC>;

export type DeleteTaskTypeAC = ReturnType<typeof deleteTaskAC>;

export type EditTitleTaskTypeAC = ReturnType<typeof editTitleTaskAC>;
