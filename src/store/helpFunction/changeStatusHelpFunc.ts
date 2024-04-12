import { StatusType, changeAppStatusAC } from "../app-reducer";
import { ThunkAppDispatch } from "../store";
import { changeStatusTodoAC } from "../todolists-reducer";

export const helpChangeStatusFunc = (
  tId: string,
  status: StatusType,
  dispatch: ThunkAppDispatch
) => {
  dispatch(changeStatusTodoAC(tId, status));
  dispatch(changeAppStatusAC(status));
};
