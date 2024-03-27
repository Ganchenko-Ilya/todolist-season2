import { combineReducers, legacy_createStore } from "redux";
import { ActionsTasksType, tasksReducer } from "./tasks-reducer";
import { ActionsTodolistsType, todolistReducer } from "./todolists-reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({ tasks: tasksReducer, todolists: todolistReducer });
type actionsAll = ActionsTodolistsType | ActionsTasksType;
export const store = legacy_createStore(rootReducer, {}, composeWithDevTools());

export type RootReducerType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
