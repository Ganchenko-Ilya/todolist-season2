import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { todolistsApi } from "../api/todolistsApi";
import { ChangeTodolistsResponseType, StatusType, TodolistsResponse } from "shared/types";
import { createAppAsyncThunk, errorCatchHelpFunc, helpChangeStatusFunc, helpResultFunc } from "shared/utils";
import { changeAppStatusAC, setInfoAC } from "./app-reducer";
import { authThunk } from "./auth-reducer";

export const initialStateTodo: ChangeTodolistsResponseType[] = [];

export type ActionsTodolistsType = ReturnType<(typeof slice.actions)[keyof typeof slice.actions]>;

const slice = createSlice({
  initialState: initialStateTodo,
  name: "todolists",
  reducers: {
    changeStatusTodoAC: (state, action: PayloadAction<{ tId: string; status: StatusType }>) => {
      const index = state.findIndex((el) => el.id === action.payload.tId);
      if (index > -1) {
        state[index].statusTodo = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunk.loginOutTC.fulfilled, () => {
        return [];
      })
      .addCase(setTodo.fulfilled, (_, action) => {
        return action.payload.todolists.map((el) => ({ ...el, statusTodo: "idle" }));
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const index = state.findIndex((el) => el.id === action.payload.tId);
        if (index > -1) {
          state.splice(index, 1);
        }
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.unshift({
          id: action.payload.tId,
          title: action.payload.title,
          addedDate: "",
          order: 0,
          statusTodo: "idle",
        });
      })
      .addCase(editTitleTodo.fulfilled, (state, action) => {
        const index = state.findIndex((el) => el.id === action.payload.tId);
        if (index > -1) {
          state[index].title = action.payload.title;
        }
      });
  },
});

export const { changeStatusTodoAC } = slice.actions;
export const todolistReducer = slice.reducer;

const setTodo = createAppAsyncThunk<{ todolists: TodolistsResponse[] }>(
  `${slice.name}/setTodo`,
  async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    dispatch(changeAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistsApi.getTodolists();
      dispatch(changeAppStatusAC({ status: "succeeded" }));
      return { todolists: res.data };
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
      return rejectWithValue(null);
    }
  },
);

const deleteTodo = createAppAsyncThunk<{ tId: string }, { id: string }>(
  `${slice.name}/deleteTodolist`,
  async (param, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    helpChangeStatusFunc(param.id, "loading", dispatch);
    try {
      await todolistsApi.deleteTodolist(param.id);
      helpChangeStatusFunc(param.id, "succeeded", dispatch);
      dispatch(setInfoAC({ message: { succeededInfo: "Delete Todo!" } }));
      return { tId: param.id };
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
      dispatch(changeStatusTodoAC({ tId: param.id, status: "failed" }));
      return rejectWithValue(null);
    }
  },
);

const addTodo = createAppAsyncThunk<{ tId: string; title: string }, { title: string }>(
  `${slice.name}/addTodo`,
  async (param, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    dispatch(changeAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistsApi.addTodolist(param.title);
      const resultCode = helpResultFunc<{ item: TodolistsResponse }>(() => {}, res, dispatch, "Add Todo!");
      return resultCode ? rejectWithValue(null) : { tId: res.data.data.item.id, title: param.title };
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
      return rejectWithValue(null);
    }
  },
);

const editTitleTodo = createAppAsyncThunk<{ tId: string; title: string }, { id: string; title: string }>(
  `${slice.name}/editTitleTodo`,
  async (param, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    dispatch(changeAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistsApi.changeTitleTodolist(param.id, param.title);
      const resultCode = helpResultFunc(() => {}, res, dispatch, "Todo changed!");
      return resultCode ? rejectWithValue(null) : { tId: param.id, title: param.title };
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
      return rejectWithValue(null);
    }
  },
);
export const todolistsThunk = { editTitleTodo, addTodo, deleteTodo, setTodo };
// export const deleteTodoTC_ =
//   (id: string): ThunkActionAppType =>
//   async (dispatch) => {
//     helpChangeStatusFunc(id, "loading", dispatch);
//     try {
//       await todolistsApi.deleteTodolist(id);
//       dispatch(deleteTodoAC({ tId: id }));
//       helpChangeStatusFunc(id, "succeeded", dispatch);
//       dispatch(setInfoAC({ message: { succeededInfo: "Delete Todo!" } }));
//     } catch (error) {
//       errorCatchHelpFunc(dispatch, error);
//       dispatch(changeStatusTodoAC({ tId: id, status: "failed" }));
//     }
//   };

// export const setTodoTC_ = (): ThunkActionAppType => async (dispatch) => {
//   dispatch(changeAppStatusAC({ status: "loading" }));
//   try {
//     const res = await todolistsApi.getTodolists();
//     dispatch(setTodoAC({ todolists: res.data }));
//     dispatch(changeAppStatusAC({ status: "succeeded" }));
//   } catch (error) {
//     errorCatchHelpFunc(dispatch, error);
//   }
// };

// export const addTodoTC_ =
//   (title: string): ThunkActionAppType =>
//   async (dispatch) => {
//     dispatch(changeAppStatusAC({ status: "loading" }));
//     try {
//       const res = await todolistsApi.addTodolist(title);
//       helpResultFunc<{ item: TodolistsResponse }>(
//         () => dispatch(addTodoAC({ tId: res.data.data.item.id, title })),
//         res,
//         dispatch,
//         "Add Todo!",
//       );
//     } catch (error) {
//       errorCatchHelpFunc(dispatch, error);
//     }
//   };

// export const editTitleTodoTC_ =
//   (id: string, title: string): ThunkActionAppType =>
//   async (dispatch) => {
//     dispatch(changeAppStatusAC({ status: "loading" }));
//     try {
//       const res = await todolistsApi.changeTitleTodolist(id, title);
//       helpResultFunc(() => dispatch(editTitleTodoAC({ tId: id, title })), res, dispatch, "Todo changed!");
//     } catch (error) {
//       errorCatchHelpFunc(dispatch, error);
//     }
//   };

// export const todolistReducer = (
//   state: ChangeTodolistsResponse[] = initialState,
//   action: ActionsTodolistsType,
// ): ChangeTodolistsResponse[] => {
//   switch (action.type) {
//     case "DELETE-TODO": {
//       return state.filter((el) => el.id !== action.tId);
//     }
//     case "ADD-TODO": {
//       return [
//         {
//           id: action.tId,
//           title: action.title,
//           addedDate: "",
//           order: 0,
//           statusTodo: "idle",
//         },
//         ...state,
//       ];
//     }
//     case "EDIT-TITLE": {
//       return state.map((el) => (el.id === action.tId ? { ...el, title: action.title } : el));
//     }
//     case "SET-TODO": {
//       return action.todolists.map((el) => ({ ...el, statusTodo: "idle" }));
//     }
//     case "CHANGE-STATUS-TODO": {
//       return state.map((el) => (el.id === action.tId ? { ...el, statusTodo: action.status } : el));
//     }
//     case "DELETE-STATE": {
//       return [];
//     }
//     default:
//       return state;
//   }
// };

// export const deleteTodoAC = (tId: string) => ({ type: "DELETE-TODO", tId }) as const;
// export const addTodoAC = (tId: string, title: string) => ({ type: "ADD-TODO", tId, title }) as const;
// export const editTitleTodoAC = (tId: string, title: string) => ({ type: "EDIT-TITLE", tId, title }) as const;
// export const setTodoAC = (todolists: TodolistsResponse[]) => ({ type: "SET-TODO", todolists }) as const;
// export const changeStatusTodoAC = (tId: string, status: StatusType) =>
//   ({ type: "CHANGE-STATUS-TODO", tId, status }) as const;

// export type ActionsTodolistsType =
//   | DeleteTodoTypeAC
//   | AddTodoTypeAC
//   | EditTitleTodoTypeAC
//   | SetTodoTypeAC
//   | ChangeStatusTodoTypeAC
//   | DeleteStateTypeAC;

// export type DeleteTodoTypeAC = ReturnType<typeof deleteTodoAC>;
// export type AddTodoTypeAC = ReturnType<typeof addTodoAC>;
// export type EditTitleTodoTypeAC = ReturnType<typeof editTitleTodoAC>;
// export type SetTodoTypeAC = ReturnType<typeof setTodoAC>;
// export type ChangeStatusTodoTypeAC = ReturnType<typeof changeStatusTodoAC>;
