import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { ActionsTasksType, tasksReducer } from "./tasks-reducer";
import { ActionsTodolistsType, todolistReducer } from "./todolists-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { ActionsAppType, appReducer } from "./app-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
});

export const store = legacy_createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
type AllAction = ActionsTodolistsType | ActionsTasksType | ActionsAppType;
export type ThunkAppDispatch = ThunkDispatch<RootReducerType, unknown, AllAction>
export const useAppDispatch = useDispatch<ThunkAppDispatch>;
export type RootReducerType = ReturnType<typeof rootReducer>;
export type ThunkActionAppType = ThunkAction<any, RootReducerType, unknown, AllAction>;

//@ts-ignore
window.store = store;
