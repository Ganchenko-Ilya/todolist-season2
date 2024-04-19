import { StatusType, changeAppStatusAC } from "../app-reducer";
import { ThunkAppDispatch } from "store/store";
import { changeStatusTodoAC } from "store/todolists-reducer";

export const helpChangeStatusFunc = (tId: string, status: StatusType, dispatch: ThunkAppDispatch) => {
  dispatch(changeStatusTodoAC(tId, status));
  dispatch(changeAppStatusAC(status));
};
