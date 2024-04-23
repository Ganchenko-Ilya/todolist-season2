import { ChangeTodolistsResponse, TodolistsResponse, todolistsApi } from "api/api";
import { ThunkActionAppType } from "./store";
import { StatusType, changeAppStatusAC, setInfoAC } from "./app-reducer";
import { helpChangeStatusFunc } from "./helpFunction/changeStatusHelpFunc";
import { errorCatchHelpFunc, helpResultFunc } from "./helpFunction/helpResultFunc";
import { deleteStateAC } from "./auth-reducer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialStateTodo: ChangeTodolistsResponse[] = [];

const slice = createSlice({
  initialState:initialStateTodo,
  name: "todolists",
  reducers: {
    deleteTodoAC: (state, action: PayloadAction<{ tId: string }>) => {
      const index = state.findIndex((el) => el.id === action.payload.tId);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addTodoAC: (state, action: PayloadAction<{ tId: string; title: string }>) => {
      state.unshift({
        id: action.payload.tId,
        title: action.payload.title,
        addedDate: "",
        order: 0,
        statusTodo: "idle",
      });
    },
    editTitleTodoAC: (state, action: PayloadAction<{ tId: string; title: string }>) => {
      const index = state.findIndex((el) => el.id === action.payload.tId);
      if (index > -1) {
        state[index].title = action.payload.title;
      }
    },
    setTodoAC: (state, action: PayloadAction<{ todolists: TodolistsResponse[] }>) => {
      return action.payload.todolists.map((el) => ({ ...el, statusTodo: "idle" }));
    },
    changeStatusTodoAC: (state, action: PayloadAction<{ tId: string; status: StatusType }>) => {
      const index = state.findIndex((el) => el.id === action.payload.tId);
      if (index > -1) {
        state[index].statusTodo = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteStateAC, () => {
      return [];
    });
  },
});

export const { addTodoAC, changeStatusTodoAC, deleteTodoAC, editTitleTodoAC, setTodoAC } = slice.actions;
export const todolistReducer = slice.reducer;

export const setTodoTC = (): ThunkActionAppType => async (dispatch) => {
  dispatch(changeAppStatusAC({ status: "loading" }));
  try {
    const res = await todolistsApi.getTodolists();
    dispatch(setTodoAC({ todolists: res.data }));
    dispatch(changeAppStatusAC({ status: "succeeded" }));
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
      dispatch(deleteTodoAC({ tId: id }));
      helpChangeStatusFunc(id, "succeeded", dispatch);
      dispatch(setInfoAC({ message: { succeededInfo: "Delete Todo!" } }));
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
      dispatch(changeStatusTodoAC({ tId: id, status: "failed" }));
    }
  };

export const addTodoTC =
  (title: string): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistsApi.addTodolist(title);
      helpResultFunc<{ item: TodolistsResponse }>(
        () => dispatch(addTodoAC({ tId: res.data.data.item.id, title })),
        res,
        dispatch,
        "Add Todo!",
      );
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };
export const editTitleTodoTC =
  (id: string, title: string): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistsApi.changeTitleTodolist(id, title);
      helpResultFunc(() => dispatch(editTitleTodoAC({ tId: id, title })), res, dispatch, "Todo changed!");
    } catch (error) {
      errorCatchHelpFunc(dispatch, error);
    }
  };
export type ActionsTodolistsType = ReturnType<(typeof slice.actions)[keyof typeof slice.actions]>;
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
