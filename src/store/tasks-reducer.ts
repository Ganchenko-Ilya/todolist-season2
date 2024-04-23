import { PayloadAction } from "@reduxjs/toolkit";
import { addTodoAC, deleteTodoAC, setTodoAC } from "./todolists-reducer";
import { TaskItemResponse, TaskObjType, TasksStatuses, TodoTaskPriority, todolistsApi } from "../api/api";
import { ThunkActionAppType } from "./store";
import { StatusType, changeAppStatusAC } from "./app-reducer";
import { errorCatchHelpFunc, helpResultFunc } from "./helpFunction/helpResultFunc";

import { createSlice } from "@reduxjs/toolkit";
import { deleteStateAC } from "./auth-reducer";

export const initialState: TaskObjType = {};

const slice = createSlice({
  initialState,
  name: "tasks",
  reducers: {
    addTaskAC(state, action: PayloadAction<{ tId: string; newTask: TaskItemResponse }>) {
      state[action.payload.tId].unshift({ ...action.payload.newTask, statusLoad: "idle" });
    },
    deleteTaskAC(state, action: PayloadAction<{ tId: string; id: string }>) {
      const index = state[action.payload.tId].findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[action.payload.tId].splice(index, 1);
      }
    },
    changeTaskAC(state, action: PayloadAction<{ tId: string; id: string; modelChange: ModelChangeType }>) {
      const index = state[action.payload.tId].findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[action.payload.tId][index] = { ...state[action.payload.tId][index], ...action.payload.modelChange };
      }
    },
    setTaskAC(state, action: PayloadAction<{ tId: string; tasks: TaskItemResponse[] }>) {
      state[action.payload.tId] = action.payload.tasks.map((el) => ({ ...el, statusLoad: "idle" }));
    },
    changeStatusLoadTaskAC(state, action: PayloadAction<{ tId: string; id: string; status: StatusType }>) {
      const index = state[action.payload.tId].findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[action.payload.tId][index] = { ...state[action.payload.tId][index], statusLoad: action.payload.status };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTodoAC, (state, action) => {
        action.payload.todolists.forEach((el) => {
          state[el.id] = [];
        });
      })
      .addCase(deleteTodoAC, (state, action) => {
        delete state[action.payload.tId];
      })
      .addCase(deleteStateAC, () => {
        return {};
      })
      .addCase(addTodoAC, (state,action) => {
        state[action.payload.tId] = []
      })
      
  },
});

export const { addTaskAC, changeStatusLoadTaskAC, changeTaskAC, deleteTaskAC, setTaskAC } = slice.actions;
export const tasksReducer = slice.reducer;

export const setTaskTC =
  (tId: string): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistsApi.getTasks(tId);
      dispatch(setTaskAC({ tId, tasks: res.data.items }));
      dispatch(changeAppStatusAC({ status: "succeeded" }));
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };

export const addTaskTC =
  (tId: string, title: string): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistsApi.addTask(tId, title);
      helpResultFunc(() => dispatch(addTaskAC({ tId: tId, newTask: res.data.data.item })), res, dispatch, "Add Task!");
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };

export const deleteTaskTC =
  (tId: string, id: string): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC({ status: "loading" }));
    dispatch(changeStatusLoadTaskAC({ tId, id, status: "loading" }));
    try {
      const res = await todolistsApi.deleteTask(tId, id);
      helpResultFunc(() => dispatch(deleteTaskAC({ tId, id })), res, dispatch, "Delete Task!");
      dispatch(changeAppStatusAC({ status: "succeeded" }));
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };

export const changeTaskTC =
  (tId: string, id: string, itemChangedModel: ModelChangeType): ThunkActionAppType =>
  async (dispatch, getState) => {
    dispatch(changeAppStatusAC({ status: "loading" }));
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
        () => dispatch(changeTaskAC({ tId, id, modelChange: itemChangedModel })),
        res,
        dispatch,
        "Task changed!",
      );
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };

//
export type ActionsTasksType = ReturnType<(typeof slice.actions)[keyof typeof slice.actions]>;
export type ModelChangeType = Partial<{
  title: string;
  description: null;
  status: TasksStatuses;
  priority: TodoTaskPriority;
  startDate: string;
  deadline: string;
}>;

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
