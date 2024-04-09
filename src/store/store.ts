import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { ActionsTasksType, tasksReducer } from "./tasks-reducer";
import { ActionsTodolistsType, todolistReducer } from "./todolists-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk, ThunkAction, ThunkActionDispatch, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({ tasks: tasksReducer, todolists: todolistReducer });

export const store = legacy_createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
type AllAction = ActionsTodolistsType | ActionsTasksType;
export const useAppDispatch = useDispatch<ThunkDispatch<RootReducerType, unknown, AllAction>>;
export type RootReducerType = ReturnType<typeof rootReducer>;
export type ThunkActionAppType = ThunkAction<any,RootReducerType,unknown,any>

//@ts-ignore
window.store = store;
