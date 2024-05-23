import { PayloadAction } from "@reduxjs/toolkit";
import { todolistsThunk } from "./todolists-reducer";
import { createSlice } from "@reduxjs/toolkit";

import { TasksStatuses, TodoTaskPriority } from "shared/enum/enumApi";
import { TaskObjType, StatusType, TaskItemResponse } from "shared/types";
import { createAppAsyncThunk, errorCatchHelpFunc, helpResultFunc } from "shared/utils";
import { changeAppStatusAC } from "./app-reducer";
import {authThunk } from "./auth-reducer";
import { tasksApi } from "shared/api/tasksApi";

export const initialState: TaskObjType = {};

const slice = createSlice({
  initialState,
  name: "tasks",
  reducers: {
    changeStatusLoadTaskAC(state, action: PayloadAction<{ tId: string; id: string; status: StatusType }>) {
      const index = state[action.payload.tId].findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[action.payload.tId][index] = { ...state[action.payload.tId][index], statusLoad: action.payload.status };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunk.setTodo.fulfilled, (state, action) => {
        action.payload.todolists.forEach((el) => {
          state[el.id] = [];
        });
      })
      .addCase(todolistsThunk.deleteTodo.fulfilled, (state, action) => {
        delete state[action.payload.tId];
      })
      .addCase(authThunk.loginOutTC.fulfilled, () => {
        return {};
      })
      .addCase(todolistsThunk.addTodo.fulfilled, (state, action) => {
        state[action.payload.tId] = [];
      })
      .addCase(setTask.fulfilled, (state, action) => {
        state[action.payload.tId] = action.payload.tasks.map((el) => ({ ...el, statusLoad: "idle" }));
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.tId].unshift({ ...action.payload.newTask, statusLoad: "idle" });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state[action.payload.tId].findIndex((el) => el.id === action.payload.id);
        if (index > -1) {
          state[action.payload.tId].splice(index, 1);
        }
      })
      .addCase(changeTask.fulfilled, (state, action) => {
        const index = state[action.payload.tId].findIndex((el) => el.id === action.payload.id);
        if (index > -1) {
          state[action.payload.tId][index] = { ...state[action.payload.tId][index], ...action.payload.modelChange };
        }
      });
  },
});

export const { changeStatusLoadTaskAC } = slice.actions;
export const tasksReducer = slice.reducer;

const setTask = createAppAsyncThunk<{ tId: string; tasks: TaskItemResponse[] }, { tId: string }>(
  `${slice.name}/setTask`,
  async (param, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    dispatch(changeAppStatusAC({ status: "loading" }));
    try {
      const res = await tasksApi.getTasks(param.tId);
      dispatch(changeAppStatusAC({ status: "succeeded" }));
      return { tId: param.tId, tasks: res.data.items };
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
      return rejectWithValue(null);
    }
  },
);
// export const setTaskTC_ =
//   (tId: string): ThunkActionAppType =>
//   async (dispatch) => {
//     dispatch(changeAppStatusAC({ status: "loading" }));
//     try {
//       const res = await todolistsApi.getTasks(tId);
//       dispatch(setTaskAC({ tId, tasks: res.data.items }));
//       dispatch(changeAppStatusAC({ status: "succeeded" }));
//     } catch (error) {
//       errorCatchHelpFunc(dispatch, error);
//     }
//   };
const addTask = createAppAsyncThunk<{ tId: string; newTask: TaskItemResponse }, { tId: string; title: string }>(
  `${slice.name}/addTask`,
  async (param, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    dispatch(changeAppStatusAC({ status: "loading" }));
    try {
      const res = await tasksApi.addTask(param.tId, param.title);
      helpResultFunc(() => {}, res, dispatch, "Add Task!");
      return { tId: param.tId, newTask: res.data.data.item };
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
      return rejectWithValue(null);
    }
  },
);
// export const addTaskTC_ =
//   (tId: string, title: string): ThunkActionAppType =>
//   async (dispatch) => {
//     dispatch(changeAppStatusAC({ status: "loading" }));
//     try {
//       const res = await todolistsApi.addTask(tId, title);
//       helpResultFunc(() => dispatch(addTaskAC({ tId: tId, newTask: res.data.data.item })), res, dispatch, "Add Task!");
//     } catch (error) {
//       errorCatchHelpFunc(dispatch, error);
//     }
//   };
const deleteTask = createAppAsyncThunk<{ tId: string; id: string }, { tId: string; id: string }>(
  `${slice.name}/deleteTask`,
  async (param, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    dispatch(changeAppStatusAC({ status: "loading" }));
    dispatch(changeStatusLoadTaskAC({ tId: param.tId, id: param.id, status: "loading" }));
    try {
      const res = await tasksApi.deleteTask(param.tId, param.id);
      helpResultFunc(() => {}, res, dispatch, "Delete Task!");
      dispatch(changeAppStatusAC({ status: "succeeded" }));
      dispatch(changeStatusLoadTaskAC({ tId: param.tId, id: param.id, status: "failed" }));
      return { tId: param.tId, id: param.id };
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
      dispatch(changeStatusLoadTaskAC({ tId: param.tId, id: param.id, status: "failed" }));
      return rejectWithValue(null);
    }
  },
);

const changeTask = createAppAsyncThunk<
  { tId: string; id: string; modelChange: ModelChangeType },
  { tId: string; id: string; itemChangedModel: ModelChangeType }
>(`${slice.name}/changeTask`, async (param, thunkApi) => {
  const { dispatch, rejectWithValue, getState } = thunkApi;
  dispatch(changeAppStatusAC({ status: "loading" }));
  dispatch(changeStatusLoadTaskAC({ tId: param.tId, id: param.id, status: "loading" }));
  let model = getState().tasks[param.tId].reduce<ModelChangeType>((acc, el) => {
    if (el.id === param.id) {
      const { id, todoListId, order, addedDate, ...rest } = el;
      return { ...rest, ...param.itemChangedModel };
    }
    return acc;
  }, {});
  try {
    const res = await tasksApi.changeTask(param.tId, param.id, model);
    helpResultFunc(() => {}, res, dispatch, "Task changed!");
    dispatch(changeStatusLoadTaskAC({ tId: param.tId, id: param.id, status: "failed" }));
    return { tId: param.tId, id: param.id, modelChange: param.itemChangedModel };
  } catch (error) {
    errorCatchHelpFunc(dispatch, error);
    dispatch(changeStatusLoadTaskAC({ tId: param.tId, id: param.id, status: "failed" }));
    return rejectWithValue(null);
  }
});

export type ActionsTasksType = ReturnType<(typeof slice.actions)[keyof typeof slice.actions]>;
export type ModelChangeType = Partial<{
  title: string;
  description: null;
  status: TasksStatuses;
  priority: TodoTaskPriority;
  startDate: string;
  deadline: string;
}>;
export const tasksThunk = { changeTask, deleteTask, addTask, setTask };
// export const changeTaskTC_ =
//   (tId: string, id: string, itemChangedModel: ModelChangeType): ThunkActionAppType =>
//   async (dispatch, getState) => {
//     dispatch(changeAppStatusAC({ status: "loading" }));
//     let model = getState().tasks[tId].reduce<ModelChangeType>((acc, el) => {
//       if (el.id === id) {
//         const { id, todoListId, order, addedDate, ...rest } = el;
//         return { ...rest, ...itemChangedModel };
//       }
//       return acc;
//     }, {});
//     try {
//       const res = await todolistsApi.changeTask(tId, id, model);
//       helpResultFunc(
//         () => dispatch(changeTaskAC({ tId, id, modelChange: itemChangedModel })),
//         res,
//         dispatch,
//         "Task changed!",
//       );
//     } catch (error) {
//       errorCatchHelpFunc(dispatch, error);
//     }
//   };

//
// export const deleteTaskTC_ =
//   (tId: string, id: string): ThunkActionAppType =>
//   async (dispatch) => {
//     dispatch(changeAppStatusAC({ status: "loading" }));
//     dispatch(changeStatusLoadTaskAC({ tId, id, status: "loading" }));
//     try {
//       const res = await todolistsApi.deleteTask(tId, id);
//       helpResultFunc(() => dispatch(deleteTaskAC({ tId, id })), res, dispatch, "Delete Task!");
//       dispatch(changeAppStatusAC({ status: "succeeded" }));
//     } catch (error) {
//       errorCatchHelpFunc(dispatch, error);
//     }
//   };

// export const tasksReducer = (state: TaskObjType = initialState, action: ActionsTasksType): TaskObjType => {
//   switch (action.type) {
//     case "ADD-TASK": {
//       return {
//         ...state,
//         [action.tId]: [
//           {
//             ...action.newTask,
//             statusLoad: "idle",
//           },
//           ...state[action.tId],
//         ],
//       };
//     }
//     case "DELETE-TASK": {
//       return {
//         ...state,
//         [action.tId]: state[action.tId].filter((el) => el.id !== action.id),
//       };
//     }
//     case "CHANGE-TASK": {
//       return {
//         ...state,
//         [action.tId]: state[action.tId].map((el) => (el.id === action.id ? { ...el, ...action.modelChange } : el)),
//       };
//     }
//     case "ADD-TODO": {
//       return { ...state, [action.tId]: [] };
//     }
//     case "DELETE-TODO": {
//       const newObj = { ...state };
//       delete newObj[action.tId];
//       return newObj;
//     }
//     case "SET-TODO": {
//       const newState = { ...state };
//       action.todolists.forEach((el) => {
//         newState[el.id] = [];
//       });
//       return newState;
//     }
//     case "SET-TASKS": {
//       return {
//         ...state,
//         [action.tId]: action.tasks.map((el) => ({
//           ...el,
//           statusLoad: "idle",
//         })),
//       };
//     }
//     case "CHANGE-STATUS-LOAD-TASK": {
//       return {
//         ...state,
//         [action.tId]: state[action.tId].map((el) =>
//           el.id === action.id
//             ? {
//                 ...el,
//                 statusLoad: action.status,
//               }
//             : el,
//         ),
//       };
//     }
//     case "DELETE-STATE": {
//       return {};
//     }
//     default:
//       return state;
//   }
// };
// export const addTaskAC = (tId: string, newTask: TaskItemResponse) => ({ type: "ADD-TASK", tId, newTask }) as const;
// export const deleteTaskAC = (tId: string, id: string) => ({ type: "DELETE-TASK", tId, id }) as const;
// export const changeTaskAC = (tId: string, id: string, modelChange: ModelChangeType) =>
//   ({
//     type: "CHANGE-TASK",
//     tId,
//     id,
//     modelChange,
//   }) as const;
// export const setTaskAC = (tId: string, tasks: TaskItemResponse[]) => ({ type: "SET-TASKS", tId, tasks }) as const;
// export const changeStatusLoadTaskAC = (tId: string, id: string, status: StatusType) =>
//   ({
//     type: "CHANGE-STATUS-LOAD-TASK",
//     tId,
//     id,
//     status,
//   }) as const;

// export type AddTaskTypeAC = ReturnType<typeof addTaskAC>;
// export type DeleteTaskTypeAC = ReturnType<typeof deleteTaskAC>;
// export type changeTaskTypeAC = ReturnType<typeof changeTaskAC>;
// export type SetTaskTypeAC = ReturnType<typeof setTaskAC>;
// export type ChangeStatusLoadTaskTypeAC = ReturnType<typeof changeStatusLoadTaskAC>;
// export type ActionsTasksType =
//   | AddTaskTypeAC
//   | DeleteTaskTypeAC
//   | changeTaskTypeAC
//   | AddTodoTypeAC
//   | DeleteTodoTypeAC
//   | SetTodoTypeAC
//   | SetTaskTypeAC
//   | ChangeStatusLoadTaskTypeAC
//   | DeleteStateTypeAC;
