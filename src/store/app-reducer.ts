export type StatusType = "idle" | "loading" | "succeeded" | "failed";

export type messageInfo = {
  errorInfo?: null | string;
  succeededInfo?: null | string;
};
export type InitialStateType = {
  errorInfo: null | string;
  succeededInfo: null | string;
  status: StatusType;
};
const initialState: InitialStateType = {
  errorInfo: null,
  succeededInfo: null,
  status: "idle",
};

export type ActionsAppType = serErrorTypeAC | changeAppStatusTypeAC;

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType) => {
  switch (action.type) {
    case "SET-INFO": {
      return { ...state, ...action.message };
    }
    case "CHANGE-STATUS-APP": {
      return { ...state, status: action.status };
    }
    default:
      return state;
  }
};

export const setInfoAC = (message: messageInfo) => ({ type: "SET-INFO", message }) as const;
export const changeAppStatusAC = (status: StatusType) => ({ type: "CHANGE-STATUS-APP", status }) as const;

type serErrorTypeAC = ReturnType<typeof setInfoAC>;
type changeAppStatusTypeAC = ReturnType<typeof changeAppStatusAC>;
