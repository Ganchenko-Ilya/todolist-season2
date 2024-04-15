import { AxiosResponse, isAxiosError } from "axios";
import { ResultResponse } from "../../api/api";
import { changeAppStatusAC, setErrorAC } from "../app-reducer";
import { ThunkAppDispatch } from "../store";

export const errorHelpFunc = <T = {}>(
  callBack: () => void,
  res: AxiosResponse<ResultResponse<T>>,
  dispatch: ThunkAppDispatch
) => {
  
  if (res.data.resultCode === 0) {
    callBack();
    dispatch(changeAppStatusAC("succeeded"));
  } else if (res.data.messages && res.data.resultCode === 1) {
    dispatch(setErrorAC(res.data.messages[0]));
    dispatch(changeAppStatusAC("failed"));
  }
};

export const errorCatchHelpFunc = (dispatch: ThunkAppDispatch, error: unknown) => {
  if (isAxiosError(error)) {
    dispatch(setErrorAC(error.message));
  } else {
    dispatch(setErrorAC("Some Error"));
  }

  dispatch(changeAppStatusAC("failed"));
};
