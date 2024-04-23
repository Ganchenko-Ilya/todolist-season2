import { InitialStateType, appReducer, changeAppStatusAC, setInfoAC } from "store/app-reducer";

const appState: InitialStateType = {
  errorInfo: null,
  succeededInfo: null,
  status: "idle",
};
beforeEach(() => {});

test("set error message for app application ", () => {
  const newState = appReducer(appState, setInfoAC({ message: { errorInfo: "error" } }));

  expect(newState.errorInfo).toBe("error");
  expect(newState.status).toBe("idle");
});
test("Change status app application ", () => {
  const newState = appReducer(appState, changeAppStatusAC({ status: "loading" }));

  expect(newState.errorInfo).toBe(null);
  expect(newState.status).toBe("loading");
});
