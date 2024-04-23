import { AxiosResponse, isAxiosError } from "axios";
import { ResultResponse } from "../../api/api";
import { changeAppStatusAC, setInfoAC } from "../app-reducer";
import { ThunkAppDispatch } from "../store";

export const helpResultFunc = <T = {}>(
  callBack: () => void,
  res: AxiosResponse<ResultResponse<T>>,
  dispatch: ThunkAppDispatch,
  succeededInfo: null | string = null,
) => {
  if (res.data.resultCode === 0) {
    callBack();
    dispatch(changeAppStatusAC({ status: "succeeded" }));
    if (succeededInfo) {
      dispatch(setInfoAC({ message: { succeededInfo } }));
    }
  } else if (res.data.messages && res.data.resultCode === 1) {
    dispatch(setInfoAC({ message: { errorInfo: res.data.messages[0] } }));
    dispatch(changeAppStatusAC({ status: "failed" }));
  }
};

export const errorCatchHelpFunc = (dispatch: ThunkAppDispatch, error: unknown) => {
  if (isAxiosError(error)) {
    dispatch(setInfoAC({ message: { errorInfo: error.message } }));
  } else {
    dispatch(setInfoAC({ message: { errorInfo: "Some Error" } }));
  }
  dispatch(changeAppStatusAC({ status: "failed" }));
};
