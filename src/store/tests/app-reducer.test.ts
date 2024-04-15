import {
  InitialStateType,
  StatusType,
  appReducer,
  changeAppStatusAC,
  setErrorAC,
} from "../app-reducer";

let error: null | string = null;
let status: StatusType = "idle";
const appState: InitialStateType = {
  error: null,
  status: "idle",
};
beforeEach(() => {});

test("set error message for app application ", () => {
  const newState = appReducer(appState, setErrorAC("error"));

  expect(newState.error).toBe("error");
  expect(newState.status).toBe("idle");
});
test("Change status app application ", () => {
  const newState = appReducer(appState, changeAppStatusAC("loading"));

  expect(newState.error).toBe(null);
  expect(newState.status).toBe("loading");
});
