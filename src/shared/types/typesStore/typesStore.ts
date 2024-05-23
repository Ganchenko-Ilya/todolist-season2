// export type AllAction = ActionsTodolistsType | ActionsTasksType | ActionsAppType | ActionsAuthType;

import { store } from "../../store/store";

// export type RootReducerType = ReturnType<typeof rootReducer>;
export type RootReducerType = ReturnType<typeof store.getState>;
