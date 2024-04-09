import { AddTodoTypeAC, DeleteTodoTypeAC, setTodoTypeAC } from "./todolists-reducer";
import {
  TaskItemResponse,
  TasksStatuses,
  TodoTaskPriority,
  todolistsApi,
} from "../api/todolists-api";
import { ThunkActionAppType } from "./store";

export type ActionsTasksType =
  | AddTaskTypeAC
  | DeleteTaskTypeAC
  | changeTaskTypeAC
  | AddTodoTypeAC
  | DeleteTodoTypeAC
  | setTodoTypeAC
  | setTaskTypeAC;
export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TaskObjType = {
  [key: string]: TaskItemResponse[];
};

export const initialTasksState: TaskObjType = {};
export const tasksReducer = (
  state: TaskObjType = initialTasksState,
  action: ActionsTasksType
): TaskObjType => {
  switch (action.type) {
    case "ADD-TASK": {
      return {...state,[action.tId]: [action.newTask,...state[action.tId]]};
    }

    case "DELETE-TASK": {
      return { ...state, [action.tId]: state[action.tId].filter((el) => el.id !== action.id) };
    }
    case "CHANGE-TASK": {
      return {
        ...state,
        [action.tId]: state[action.tId].map((el) =>
          el.id === action.id ? { ...el, ...action.modelChange } : el
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
    case "SET-TODO": {
      const newState = { ...state };
      action.todolists.forEach((el) => {
        newState[el.id] = [];
      });
      return newState;
    }
    case "SET-TASKS": {
      return { ...state, [action.tId]: action.tasks };
    }
    default:
      return state;
  }
};

export const addTaskAC = (tId: string, newTask: TaskItemResponse) =>
  ({ type: "ADD-TASK", tId, newTask }) as const;

export const deleteTaskAC = (tId: string, id: string) =>
  ({ type: "DELETE-TASK", tId, id }) as const;

export const changeTaskAC = (tId: string, id: string, modelChange: ModelChangeType) =>
  ({ type: "CHANGE-TASK", tId, id, modelChange }) as const;
export const setTaskAC = (tId: string, tasks: TaskItemResponse[]) =>
  ({ type: "SET-TASKS", tId, tasks }) as const;

export type AddTaskTypeAC = ReturnType<typeof addTaskAC>;

export type DeleteTaskTypeAC = ReturnType<typeof deleteTaskAC>;

export type changeTaskTypeAC = ReturnType<typeof changeTaskAC>;
export type setTaskTypeAC = ReturnType<typeof setTaskAC>;

export const setTaskTC =
  (id: string): ThunkActionAppType =>
  async (dispatch) => {
    try {
      const res = await todolistsApi.getTasks(id);
      dispatch(setTaskAC(id, res.data.items));
    } catch {}
  };
export const addTaskTC =
  (id: string, title: string): ThunkActionAppType =>
  async (dispatch) => {
    try {
      const res = await todolistsApi.addTask(id, title);
      dispatch(addTaskAC(id, res.data.data.item));
    } catch {}
  };
export const deleteTaskTC =
  (tId: string, id: string): ThunkActionAppType =>
  async (dispatch) => {
    try {
      await todolistsApi.deleteTask(tId, id);
      dispatch(deleteTaskAC(tId, id));
    } catch {}
  };
export type ModelChangeType = Partial<{
  title: string;
  description: null;
  status: TasksStatuses;
  priority: TodoTaskPriority;
  startDate: string;
  deadline: string;
}>;

export const changeTaskTC =
  (tId: string, id: string, itemChangedModel: ModelChangeType): ThunkActionAppType =>
  async (dispatch, getState) => {
   
    let model = getState().tasks[tId].reduce<ModelChangeType>((acc, el) => {
      if (el.id === id) {
        const { id, todoListId, order, addedDate, ...rest } = el;
        return { ...rest, ...itemChangedModel };
      }
      return acc;
    }, {});

    try {
      await todolistsApi.changeTask(tId, id, model);
      dispatch(changeTaskAC(tId, id, itemChangedModel));
    } catch {}
  };
