import { AxiosResponse, isAxiosError } from "axios";
import { TodolistTaskResultResponse } from "../../api/todolists-api";
import { changeAppStatusAC, setErrorAC } from "../app-reducer";
import { ThunkAppDispatch } from "../store";

export const errorHelpFunc = <T = {}>(
  callBack: () => void,
  res: AxiosResponse<TodolistTaskResultResponse<T>>,
  dispatch: ThunkAppDispatch
) => {
  if (res.data.resultCode === 0) {
    callBack();
    dispatch(changeAppStatusAC("succeeded"));
  } else if (res.data.messages) {
    dispatch(setErrorAC(res.data.messages[0]));
    dispatch(changeAppStatusAC("failed"));
  } else {
    dispatch(setErrorAC("some message"));
    dispatch(changeAppStatusAC("failed"));
  }
};

export const errorCatchHelpFunc = (dispatch: ThunkAppDispatch, error: unknown) => {
  if (isAxiosError(error)) {
    dispatch(setErrorAC(error.message));
  }
  else{
    dispatch(setErrorAC("Some Error"));
  }

  dispatch(changeAppStatusAC("failed"));
};
