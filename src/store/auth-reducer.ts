import { authApi, useDataRequestType } from "../api/api";
import { changeAppStatusAC, setErrorAC } from "./app-reducer";
import { errorCatchHelpFunc, errorHelpFunc } from "./helpFunction/errorHelpFunc";
import { ThunkActionAppType } from "./store";
type initialSAuthStateType = {
  isLogIn: boolean;
  captchaUrl: string;
};
const initialAuthState: initialSAuthStateType = {
  isLogIn: false,
  captchaUrl: "",
};

export const authReducer = (
  state: initialSAuthStateType = initialAuthState,
  action: ActionAuthType
) => {
  switch (action.type) {
    case "CHANGE-LOGIN-STATUS": {
      return { ...state, isLogIn: action.status };
    }
    case "SET-CAPTCHA": {
      return { ...state, captchaUrl: action.url };
    }

    default:
      return state;
  }
};

export const loginAuthTC =
  (userData: useDataRequestType): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC("loading"));
    try {
      const res = await authApi.logIn(userData);

      errorHelpFunc<{ userId: number }>(() => dispatch(changeIsLoginStatusAC(true)), res, dispatch);
      if (userData.captcha && res.data.resultCode === 0) {
        dispatch(setCaptchaUrlAC(""));
      }

      if (res.data.resultCode === 10) {
        const captcha = await authApi.captcha();
        dispatch(setCaptchaUrlAC(captcha.data.url));

        dispatch(setErrorAC(res.data.messages[0]));

        dispatch(changeAppStatusAC("failed"));
      }
    } catch (error: unknown) {
      errorCatchHelpFunc(dispatch, error);
    }
  };
export const loginOutTC = (): ThunkActionAppType => async (dispatch) => {
  dispatch(changeAppStatusAC("loading"));
  try {
    const res = await authApi.logout();

    errorHelpFunc(() => dispatch(changeIsLoginStatusAC(false)), res, dispatch);
  } catch (error: unknown) {
    errorCatchHelpFunc(dispatch, error);
  }
};

export const changeIsLoginStatusAC = (status: boolean) =>
  ({ type: "CHANGE-LOGIN-STATUS", status }) as const;
export const setCaptchaUrlAC = (url: string) => ({ type: "SET-CAPTCHA", url }) as const;

export type ActionAuthType = ChangeIsLoginStatusTypeAC | setCaptchaUrlTypeAC;

export type ChangeIsLoginStatusTypeAC = ReturnType<typeof changeIsLoginStatusAC>;
export type setCaptchaUrlTypeAC = ReturnType<typeof setCaptchaUrlAC>;
