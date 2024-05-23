import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { changeAppStatusAC, setInfoAC } from "./app-reducer";
import { authApi } from "shared/api/apiAuth";
import { AutMeResponseType, useDataRequestType } from "shared";
import { createAppAsyncThunk, helpResultFunc, errorCatchHelpFunc } from "shared/utils";
type initialSAuthStateType = {
  isLogIn: boolean;
  captchaUrl: string;
  initialization: boolean;
  userData: AutMeResponseType;
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
    initialisationAC: (state) => {
      state.initialization = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginOutTC.fulfilled, (state) => {
        state.userData = { email: "", id: "", login: "" };
        state.isLogIn = false;
      })
      .addCase(authMeTC.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      });
  },
});
const { changeIsLoginStatusAC, setCaptchaUrlAC, initialisationAC } = slice.actions;
export const authReducer = slice.reducer;
export type ActionsAuthType = ReturnType<(typeof slice.actions)[keyof typeof slice.actions]>;

const loginAuthTC = createAppAsyncThunk<{ status: boolean }, { userData: useDataRequestType }>(
  `${slice.name}/loginAuth`,
  async (param, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    dispatch(changeAppStatusAC({ status: "loading" }));
    try {
      const res = await authApi.logIn(param.userData);
      const resultCode = helpResultFunc<{ userId: number }>(
        () => {
          dispatch(authMeTC());
        },
        res,
        dispatch,
        "Authorization successful!",
      );
      if (param.userData.captcha && res.data.resultCode === 0) {
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
      return resultCode ? rejectWithValue(null) : { status: true };
    } catch (error: unknown) {
      errorCatchHelpFunc(dispatch, error);
      return rejectWithValue(null);
    }
  },
);

const loginOutTC = createAppAsyncThunk(`${slice.name}/loginOut`, async (_, thunkApi) => {
  const { dispatch, rejectWithValue } = thunkApi;
  dispatch(changeAppStatusAC({ status: "loading" }));
  try {
    const res = await authApi.logout();
    const resultCode = helpResultFunc(() => {}, res, dispatch);
    return resultCode ? rejectWithValue(null) : { status: true };
  } catch (error: unknown) {
    errorCatchHelpFunc(dispatch, error);
    return rejectWithValue(null);
  }
});

const authMeTC = createAppAsyncThunk<{ user: AutMeResponseType }>(`${slice.name}/authMe`, async (_, thunkApi) => {
  const { dispatch, rejectWithValue } = thunkApi;
  dispatch(changeAppStatusAC({ status: "loading" }));
  try {
    const res = await authApi.authMe();
    if (res.data.resultCode === 0) {
      dispatch(changeIsLoginStatusAC({ status: true }));
      dispatch(changeAppStatusAC({ status: "succeeded" }));
      return { user: res.data.data };
    } else {
      dispatch(changeAppStatusAC({ status: "failed" }));
      return rejectWithValue(null);
    }
  } catch (error: unknown) {
    errorCatchHelpFunc(dispatch, error);
    return rejectWithValue(null);
  } finally {
    setTimeout(() => {
      dispatch(initialisationAC());
    }, 1000);
  }
});

export const authThunk = {authMeTC,loginAuthTC,loginOutTC}

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

// export const loginAuthTC_ =
//   (userData: useDataRequestType): ThunkActionAppType =>
//   async (dispatch) => {
//     dispatch(changeAppStatusAC({ status: "loading" }));
//     try {
//       const res = await authApi.logIn(userData);
//       helpResultFunc<{ userId: number }>(
//         () => {
//           dispatch(changeIsLoginStatusAC({ status: true }));
//           dispatch(authMeTC());
//         },
//         res,
//         dispatch,
//         "Authorization successful!",
//       );
//       if (userData.captcha && res.data.resultCode === 0) {
//         dispatch(setCaptchaUrlAC({ url: "" }));
//       }
//       if (res.data.resultCode === 10) {
//         const captcha = await authApi.captcha();
//         dispatch(setCaptchaUrlAC({ url: captcha.data.url }));
//         dispatch(
//           setInfoAC({
//             message: {
//               errorInfo: res.data.messages[0],
//             },
//           }),
//         );
//         dispatch(changeAppStatusAC({ status: "failed" }));
//       }
//     } catch (error: unknown) {
//       errorCatchHelpFunc(dispatch, error);
//     }
//   };

// export const loginOutTC_ = (): ThunkActionAppType => async (dispatch) => {
//   dispatch(changeAppStatusAC({ status: "loading" }));
//   try {
//     const res = await authApi.logout();
//     helpResultFunc(
//       () => {
//         dispatch(deleteStateAC());
//         dispatch(changeIsLoginStatusAC({ status: false }));
//       },
//       res,
//       dispatch,
//     );
//   } catch (error: unknown) {
//     errorCatchHelpFunc(dispatch, error);
//   }
// };
// export const authMeTC_ = (): ThunkActionAppType => async (dispatch) => {
//   dispatch(changeAppStatusAC({ status: "loading" }));

//   try {
//     const res = await authApi.authMe();
//     if (res.data.resultCode === 0) {
//       dispatch(changeIsLoginStatusAC({ status: true }));
//       dispatch(setUserDataAC({ user: res.data.data }));
//       dispatch(changeAppStatusAC({ status: "succeeded" }));
//     } else {
//       dispatch(changeAppStatusAC({ status: "failed" }));
//     }
//   } catch (error: unknown) {
//     errorCatchHelpFunc(dispatch, error);
//   }
//   setTimeout(() => {
//     dispatch(initialisationAC());
//   }, 1000);
// };
