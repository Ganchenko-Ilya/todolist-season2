import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootReducerType } from "../../types/typesStore/typesStore";
import { Action } from "redux";

export type ThunkAppDispatch = ThunkDispatch<RootReducerType, unknown, Action>;
export const useAppDispatch = useDispatch.withTypes<ThunkAppDispatch>();
