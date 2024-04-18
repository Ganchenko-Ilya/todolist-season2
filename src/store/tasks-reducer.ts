import { AddTodoTypeAC, DeleteTodoTypeAC, SetTodoTypeAC } from './todolists-reducer';
import {
  TaskItemResponse,
  TaskObjType,
  TasksStatuses,
  TodoTaskPriority,
  todolistsApi,
} from '../api/api';
import { ThunkActionAppType } from './store';
import { StatusType, changeAppStatusAC } from './app-reducer';
import { errorCatchHelpFunc, helpResultFunc } from './helpFunction/helpResultFunc';
import { DeleteStateTypeAC } from './auth-reducer';

export const initialTasksState: TaskObjType = {};

export const tasksReducer = (
  state: TaskObjType = initialTasksState,
  action: ActionsTasksType
): TaskObjType => {
  switch (action.type) {
    case 'ADD-TASK': {
      return {
        ...state,
        [action.tId]: [{ ...action.newTask, statusLoad: 'idle' }, ...state[action.tId]],
      };
    }
    case 'DELETE-TASK': {
      return { ...state, [action.tId]: state[action.tId].filter((el) => el.id !== action.id) };
    }
    case 'CHANGE-TASK': {
      return {
        ...state,
        [action.tId]: state[action.tId].map((el) =>
          el.id === action.id ? { ...el, ...action.modelChange } : el
        ),
      };
    }
    case 'ADD-TODO': {
      return { ...state, [action.tId]: [] };
    }
    case 'DELETE-TODO': {
      const newObj = { ...state };
      delete newObj[action.tId];
      return newObj;
    }
    case 'SET-TODO': {
      const newState = { ...state };
      action.todolists.forEach((el) => {
        newState[el.id] = [];
      });
      return newState;
    }
    case 'SET-TASKS': {
      return { ...state, [action.tId]: action.tasks.map((el) => ({ ...el, statusLoad: 'idle' })) };
    }
    case 'CHANGE-STATUS-LOAD-TASK': {
      return {
        ...state,
        [action.tId]: state[action.tId].map((el) =>
          el.id === action.id ? { ...el, statusLoad: action.status } : el
        ),
      };
    }
    case 'DELETE-STATE': {
      return {};
    }
    default:
      return state;
  }
};

export const setTaskTC =
  (tId: string): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC('loading'));
    try {
      const res = await todolistsApi.getTasks(tId);
      dispatch(setTaskAC(tId, res.data.items));
      dispatch(changeAppStatusAC('succeeded'));
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };

export const addTaskTC =
  (tId: string, title: string): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC('loading'));
    try {
      const res = await todolistsApi.addTask(tId, title);
      helpResultFunc(
        () => dispatch(addTaskAC(tId, res.data.data.item)),
        res,
        dispatch,
        'Add Task!'
      );
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };

export const deleteTaskTC =
  (tId: string, id: string): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC('loading'));
    dispatch(changeStatusLoadTaskAC(tId, id, 'loading'));
    try {
      const res = await todolistsApi.deleteTask(tId, id);
      helpResultFunc(() => dispatch(deleteTaskAC(tId, id)), res, dispatch, 'Delete Task!');
      dispatch(changeAppStatusAC('succeeded'));
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };

export const changeTaskTC =
  (tId: string, id: string, itemChangedModel: ModelChangeType): ThunkActionAppType =>
  async (dispatch, getState) => {
    dispatch(changeAppStatusAC('loading'));
    let model = getState().tasks[tId].reduce<ModelChangeType>((acc, el) => {
      if (el.id === id) {
        const { id, todoListId, order, addedDate, ...rest } = el;
        return { ...rest, ...itemChangedModel };
      }
      return acc;
    }, {});
    try {
      const res = await todolistsApi.changeTask(tId, id, model);
      helpResultFunc(
        () => dispatch(changeTaskAC(tId, id, itemChangedModel)),
        res,
        dispatch,
        'Task changed!'
      );
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };

export const addTaskAC = (tId: string, newTask: TaskItemResponse) =>
  ({ type: 'ADD-TASK', tId, newTask }) as const;
export const deleteTaskAC = (tId: string, id: string) =>
  ({ type: 'DELETE-TASK', tId, id }) as const;
export const changeTaskAC = (tId: string, id: string, modelChange: ModelChangeType) =>
  ({ type: 'CHANGE-TASK', tId, id, modelChange }) as const;
export const setTaskAC = (tId: string, tasks: TaskItemResponse[]) =>
  ({ type: 'SET-TASKS', tId, tasks }) as const;
export const changeStatusLoadTaskAC = (tId: string, id: string, status: StatusType) =>
  ({ type: 'CHANGE-STATUS-LOAD-TASK', tId, id, status }) as const;

export type ModelChangeType = Partial<{
  title: string;
  description: null;
  status: TasksStatuses;
  priority: TodoTaskPriority;
  startDate: string;
  deadline: string;
}>;
export type AddTaskTypeAC = ReturnType<typeof addTaskAC>;
export type DeleteTaskTypeAC = ReturnType<typeof deleteTaskAC>;
export type changeTaskTypeAC = ReturnType<typeof changeTaskAC>;
export type SetTaskTypeAC = ReturnType<typeof setTaskAC>;
export type ChangeStatusLoadTaskTypeAC = ReturnType<typeof changeStatusLoadTaskAC>;
export type ActionsTasksType =
  | AddTaskTypeAC
  | DeleteTaskTypeAC
  | changeTaskTypeAC
  | AddTodoTypeAC
  | DeleteTodoTypeAC
  | SetTodoTypeAC
  | SetTaskTypeAC
  | ChangeStatusLoadTaskTypeAC
  | DeleteStateTypeAC;
