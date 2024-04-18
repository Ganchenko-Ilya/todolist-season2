import { AutMeResponse } from './../api/api';
import { authApi, useDataRequestType } from '../api/api';
import { changeAppStatusAC, setInfoAC } from './app-reducer';
import { errorCatchHelpFunc, helpResultFunc } from './helpFunction/helpResultFunc';
import { ThunkActionAppType } from './store';

type initialSAuthStateType = {
  isLogIn: boolean;
  captchaUrl: string;
  initialization: boolean;
  userData: AutMeResponse;
};

const initialAuthState: initialSAuthStateType = {
  isLogIn: false,
  initialization: false,
  captchaUrl: '',
  userData: {
    email: '',
    id: '',
    login: '',
  },
};

export const authReducer = (
  state: initialSAuthStateType = initialAuthState,
  action: ActionAuthType
) => {
  switch (action.type) {
    case 'CHANGE-LOGIN-STATUS': {
      return { ...state, isLogIn: action.status };
    }
    case 'SET-CAPTCHA': {
      return { ...state, captchaUrl: action.url };
    }
    case 'SET-USER-DATA': {
      return { ...state, userData: { ...action.user } };
    }
    case 'DELETE-STATE': {
      return { ...state, userData: { email: '', id: '', login: '' } };
    }
    case 'INITIALIZATION': {
      return { ...state, initialization: true };
    }
    default:
      return state;
  }
};

export const loginAuthTC =
  (userData: useDataRequestType): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC('loading'));
    try {
      const res = await authApi.logIn(userData);
      helpResultFunc<{ userId: number }>(
        () => {
          dispatch(changeIsLoginStatusAC(true));
          dispatch(authMeTC());
        },
        res,
        dispatch,
        'Authorization successful'
      );
      if (userData.captcha && res.data.resultCode === 0) {
        dispatch(setCaptchaUrlAC(''));
      }
      if (res.data.resultCode === 10) {
        const captcha = await authApi.captcha();
        dispatch(setCaptchaUrlAC(captcha.data.url));
        dispatch(setInfoAC({ errorInfo: res.data.messages[0] }));
        dispatch(changeAppStatusAC('failed'));
      }
    } catch (error: unknown) {
      errorCatchHelpFunc(dispatch, error);
    }
  };

export const loginOutTC = (): ThunkActionAppType => async (dispatch) => {
  dispatch(changeAppStatusAC('loading'));
  try {
    const res = await authApi.logout();
    helpResultFunc(
      () => {
        dispatch(deleteStateAC());
        dispatch(changeIsLoginStatusAC(false));
      },
      res,
      dispatch
    );
  } catch (error: unknown) {
    errorCatchHelpFunc(dispatch, error);
  }
};
export const authMeTC = (): ThunkActionAppType => async (dispatch) => {
  dispatch(changeAppStatusAC('loading'));

  try {
    const res = await authApi.authMe();
    if (res.data.resultCode === 0) {
      dispatch(changeIsLoginStatusAC(true));
      dispatch(setUserDataAC(res.data.data));
      dispatch(changeAppStatusAC('succeeded'));
    } else {
      dispatch(changeAppStatusAC('failed'));
    }
  } catch (error: unknown) {
    errorCatchHelpFunc(dispatch, error);
  }
  setTimeout(() => {
    dispatch(initialisationAC());
  }, 1000);
};

export const changeIsLoginStatusAC = (status: boolean) =>
  ({ type: 'CHANGE-LOGIN-STATUS', status }) as const;
export const setCaptchaUrlAC = (url: string) => ({ type: 'SET-CAPTCHA', url }) as const;
export const setUserDataAC = (user: AutMeResponse) => ({ type: 'SET-USER-DATA', user }) as const;
export const deleteStateAC = () => ({ type: 'DELETE-STATE' }) as const;
export const initialisationAC = () => ({ type: 'INITIALIZATION' }) as const;

export type ActionAuthType =
  | ChangeIsLoginStatusTypeAC
  | SetCaptchaUrlTypeAC
  | SetUserDataTypeAC
  | DeleteStateTypeAC
  | InitialisationTypeAC;

export type ChangeIsLoginStatusTypeAC = ReturnType<typeof changeIsLoginStatusAC>;
export type SetCaptchaUrlTypeAC = ReturnType<typeof setCaptchaUrlAC>;
export type SetUserDataTypeAC = ReturnType<typeof setUserDataAC>;
export type DeleteStateTypeAC = ReturnType<typeof deleteStateAC>;
export type InitialisationTypeAC = ReturnType<typeof initialisationAC>;
