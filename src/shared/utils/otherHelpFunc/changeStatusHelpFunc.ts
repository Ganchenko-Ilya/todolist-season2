import { changeAppStatusAC } from "shared/model/app-reducer";
import { changeStatusTodoAC } from "shared/model/todolists-reducer";
import { ThunkAppDispatch } from "shared/store/hooks/useAppDispatch";
import { StatusType } from "shared/types";

export const helpChangeStatusFunc = (tId: string, status: StatusType, dispatch: ThunkAppDispatch) => {
  dispatch(changeStatusTodoAC({ tId, status }));
  dispatch(changeAppStatusAC({ status }));
};
