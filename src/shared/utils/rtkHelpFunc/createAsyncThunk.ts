import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAppDispatch } from "shared/store/hooks/useAppDispatch";
import { RootReducerType } from "shared/types/typesStore/typesStore";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootReducerType;
  dispatch: ThunkAppDispatch;
  rejectValue: null;
}>();
