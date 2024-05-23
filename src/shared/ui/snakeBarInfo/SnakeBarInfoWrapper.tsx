import { Alert, Snackbar } from "@mui/material";
import { setInfoAC } from "shared/model/app-reducer";
import React from "react";
import { useAppDispatch } from "shared/store/hooks/useAppDispatch";
type SnakeBarInfoWrapperPropsType = {
  errorInfo: null | string;
  info: null | string;
};

export const SnakeBarInfoWrapper = React.memo(({ errorInfo, info }: SnakeBarInfoWrapperPropsType) => {
  const dispatch = useAppDispatch();
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    dispatch(setInfoAC({ message: { errorInfo: null, succeededInfo: null } }));
  };

  return (
    <div>
      <Snackbar
        open={!!info}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {!!errorInfo ? (
          <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
            {info}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
            {info}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
});
