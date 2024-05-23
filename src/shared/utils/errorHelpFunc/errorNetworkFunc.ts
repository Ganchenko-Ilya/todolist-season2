import { isAxiosError } from "axios";

import { changeAppStatusAC, setInfoAC } from "shared/model/app-reducer";
import { ThunkAppDispatch } from "shared/store/hooks/useAppDispatch";

export const errorCatchHelpFunc = (dispatch: ThunkAppDispatch, error: unknown) => {
  if (isAxiosError(error)) {
    dispatch(setInfoAC({ message: { errorInfo: error.message } }));
  } else {
    dispatch(setInfoAC({ message: { errorInfo: "Some Error" } }));
  }
  dispatch(changeAppStatusAC({ status: "failed" }));
};
