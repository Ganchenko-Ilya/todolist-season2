import { PayloadAction } from "@reduxjs/toolkit";
import { AutMeResponse, authApi, useDataRequestType } from "api/api";
import { changeAppStatusAC, setInfoAC } from "./app-reducer";
import { errorCatchHelpFunc, helpResultFunc } from "./helpFunction/helpResultFunc";
import { ThunkActionAppType } from "./store";
import { createSlice } from "@reduxjs/toolkit";

type initialSAuthStateType = {
  isLogIn: boolean;
  captchaUrl: string;
  initialization: boolean;
  userData: AutMeResponse;
};

const initialState: initialSAuthStateType = {
  isLogIn: false,
  initialization: false,
  captchaUrl: "",
  userData: {
    email: "",
    id: "",
    login: "",
  },
};

const slice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    changeIsLoginStatusAC: (state, action: PayloadAction<{ status: boolean }>) => {
      state.isLogIn = action.payload.status;
    },
    setCaptchaUrlAC: (state, action: PayloadAction<{ url: string }>) => {
      state.captchaUrl = action.payload.url;
    },
    setUserDataAC: (state, action: PayloadAction<{ user: AutMeResponse }>) => {
      state.userData = action.payload.user;
    },
    deleteStateAC: (state) => {
      state.userData = { email: "", id: "", login: "" };
    },
    initialisationAC: (state) => {
      state.initialization = true;
    },
  },
});
export const { changeIsLoginStatusAC, setCaptchaUrlAC, setUserDataAC, deleteStateAC, initialisationAC } = slice.actions;
export const authReducer = slice.reducer;
export type ActionsAuthType = ReturnType<(typeof slice.actions)[keyof typeof slice.actions]>;

// export const authReducer = (state: initialSAuthStateType = initialState, action: ActionAuthType) => {
//   switch (action.type) {
//     case "CHANGE-LOGIN-STATUS": {
//       return { ...state, isLogIn: action.status };
//     }
//     case "SET-CAPTCHA": {
//       return { ...state, captchaUrl: action.url };
//     }
//     case "SET-USER-DATA": {
//       return {
//         ...state,
//         userData: { ...action.user },
//       };
//     }
//     case "DELETE-STATE": {
//       return {
//         ...state,
//         userData: {
//           email: "",
//           id: "",
//           login: "",
//         },
//       };
//     }
//     case "INITIALIZATION": {
//       return { ...state, initialization: true };
//     }
//     default:
//       return state;
//   }
// };

export const loginAuthTC =
  (userData: useDataRequestType): ThunkActionAppType =>
  async (dispatch) => {
    dispatch(changeAppStatusAC({ status: "loading" }));
    try {
      const res = await authApi.logIn(userData);
      helpResultFunc<{ userId: number }>(
        () => {
          dispatch(changeIsLoginStatusAC({ status: true }));
          dispatch(authMeTC());
        },
        res,
        dispatch,
        "Authorization successful!",
      );
      if (userData.captcha && res.data.resultCode === 0) {
        dispatch(setCaptchaUrlAC({ url: "" }));
      }
      if (res.data.resultCode === 10) {
        const captcha = await authApi.captcha();
        dispatch(setCaptchaUrlAC({ url: captcha.data.url }));
        dispatch(
          setInfoAC({
            message: {
              errorInfo: res.data.messages[0],
            },
          }),
        );
        dispatch(changeAppStatusAC({ status: "failed" }));
      }
    } catch (error: unknown) {
      errorCatchHelpFunc(dispatch, error);
    }
  };

export const loginOutTC = (): ThunkActionAppType => async (dispatch) => {
  dispatch(changeAppStatusAC({ status: "loading" }));
  try {
    const res = await authApi.logout();
    helpResultFunc(
      () => {
        dispatch(deleteStateAC());
        dispatch(changeIsLoginStatusAC({ status: false }));
      },
      res,
      dispatch,
    );
  } catch (error: unknown) {
    errorCatchHelpFunc(dispatch, error);
  }
};
export const authMeTC = (): ThunkActionAppType => async (dispatch) => {
  dispatch(changeAppStatusAC({ status: "loading" }));

  try {
    const res = await authApi.authMe();
    if (res.data.resultCode === 0) {
      dispatch(changeIsLoginStatusAC({ status: true }));
      dispatch(setUserDataAC({ user: res.data.data }));
      dispatch(changeAppStatusAC({ status: "succeeded" }));
    } else {
      dispatch(changeAppStatusAC({ status: "failed" }));
    }
  } catch (error: unknown) {
    errorCatchHelpFunc(dispatch, error);
  }
  setTimeout(() => {
    dispatch(initialisationAC());
  }, 1000);
};

// export const changeIsLoginStatusAC = (status: boolean) =>
//   ({
//     type: "CHANGE-LOGIN-STATUS",
//     status,
//   }) as const;
// export const setCaptchaUrlAC = (url: string) => ({ type: "SET-CAPTCHA", url }) as const;
// export const setUserDataAC = (user: AutMeResponse) => ({ type: "SET-USER-DATA", user }) as const;
// export const deleteStateAC = () => ({ type: "DELETE-STATE" }) as const;
// export const initialisationAC = () => ({ type: "INITIALIZATION" }) as const;

// export type ActionAuthType =
//   | ChangeIsLoginStatusTypeAC
//   | SetCaptchaUrlTypeAC
//   | SetUserDataTypeAC
//   | DeleteStateTypeAC
//   | InitialisationTypeAC;

// export type ChangeIsLoginStatusTypeAC = ReturnType<typeof changeIsLoginStatusAC>;
// export type SetCaptchaUrlTypeAC = ReturnType<typeof setCaptchaUrlAC>;
// export type SetUserDataTypeAC = ReturnType<typeof setUserDataAC>;
// export type DeleteStateTypeAC = ReturnType<typeof deleteStateAC>;
// export type InitialisationTypeAC = ReturnType<typeof initialisationAC>;
