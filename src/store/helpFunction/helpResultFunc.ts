import { AxiosResponse, isAxiosError } from "axios";
import { ResultResponse } from "../../api/api";
import { changeAppStatusAC, setInfoAC } from "../app-reducer";
import { ThunkAppDispatch } from "../store";

export const helpResultFunc = <T = {}>(
  callBack: () => void,
  res: AxiosResponse<ResultResponse<T>>,
  dispatch: ThunkAppDispatch,
  succeededInfo: null | string = null
) => {
  if (res.data.resultCode === 0) {
    callBack();
    dispatch(changeAppStatusAC("succeeded"));
    if (succeededInfo) {
      dispatch(setInfoAC({ succeededInfo }));
    }
  } else if (res.data.messages && res.data.resultCode === 1) {
    dispatch(setInfoAC({ errorInfo: res.data.messages[0] }));
    dispatch(changeAppStatusAC("failed"));
  }
};

export const errorCatchHelpFunc = (dispatch: ThunkAppDispatch, error: unknown) => {
  if (isAxiosError(error)) {
    dispatch(setInfoAC({ errorInfo: error.message }));
  } else {
    dispatch(setInfoAC({ errorInfo: "Some Error" }));
  }

  dispatch(changeAppStatusAC("failed"));
};
