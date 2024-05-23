import { AxiosResponse } from "axios";
import { ThunkAppDispatch } from "shared/store/hooks/useAppDispatch";
import { ResultResponse } from "shared/types/typesApi";
import { changeAppStatusAC, setInfoAC } from "shared/model/app-reducer";

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
  return res.data.resultCode;
};
