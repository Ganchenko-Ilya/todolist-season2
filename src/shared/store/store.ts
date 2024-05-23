import { combineReducers } from "redux";
import { tasksReducer } from "../model/tasks-reducer";
import { todolistReducer } from "../model/todolists-reducer";
import { thunk } from "redux-thunk";
import { appReducer } from "../model/app-reducer";
import { authReducer } from "../model/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

//@ts-ignore
window.store = store;
