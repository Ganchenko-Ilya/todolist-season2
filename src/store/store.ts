import { combineReducers, legacy_createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistReducer } from "./todolists-reducer";

const rootReducer = combineReducers({ tasks: tasksReducer, todolists: todolistReducer });

export const store = legacy_createStore(rootReducer);

export type RootReducerType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store

