import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { RootReducerType, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { setErrorAC } from "../../store/app-reducer";

export const SnakeBarError = () => {
  const error = useSelector<RootReducerType, string | null>((state) => state.app.error);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setErrorAC(null));
  };

  return (
    <div>
      <Snackbar
        open={!!error}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};