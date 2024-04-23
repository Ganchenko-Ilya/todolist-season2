import {  combineReducers } from "redux";
import { ActionsTasksType, tasksReducer } from "./tasks-reducer";
import { ActionsTodolistsType, todolistReducer } from "./todolists-reducer";

import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { ActionsAppType, appReducer } from "./app-reducer";
import { ActionsAuthType, authReducer } from "./auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
  auth: authReducer,
});


// export const store = legacy_createStore(
//   rootReducer,
//   {},
//   composeWithDevTools(applyMiddleware(thunk)),
// );
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

type AllAction = ActionsTodolistsType | ActionsTasksType | ActionsAppType | ActionsAuthType;
export type ThunkAppDispatch = ThunkDispatch<RootReducerType, unknown, AllAction>;
export const useAppDispatch = useDispatch<ThunkAppDispatch>;
export type RootReducerType = ReturnType<typeof rootReducer>;
export type ThunkActionAppType = ThunkAction<any, RootReducerType, unknown, AllAction>;

//@ts-ignore
window.store = store;
