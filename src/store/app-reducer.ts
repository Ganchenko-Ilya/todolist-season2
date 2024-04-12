export type StatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialStateType = {
  error: null | string;
  status: StatusType;
};
const initialState: InitialStateType = {
  error: null,
  status: "idle",
};

export type ActionsAppType = serErrorTypeAC | changeAppStatusTypeAC;

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType) => {
  switch (action.type) {
    case "SET-ERROR": {
      return { ...state, error: action.errorMessage };
    }
    case "CHANGE-STATUS-APP": {
      return { ...state, status: action.status };
    }

    default:
      return state;
  }
};

export const setErrorAC = (errorMessage: string | null) =>
  ({ type: "SET-ERROR", errorMessage }) as const;

export const changeAppStatusAC = (status: StatusType) =>
  ({ type: "CHANGE-STATUS-APP", status }) as const;

type serErrorTypeAC = ReturnType<typeof setErrorAC>;
type changeAppStatusTypeAC = ReturnType<typeof changeAppStatusAC>;
