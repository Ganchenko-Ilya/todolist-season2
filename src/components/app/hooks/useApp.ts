import { useSelector } from "react-redux";
import { RootReducerType, useAppDispatch } from "store/store";
import { authMeTC, loginOutTC } from "store/auth-reducer";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const statusApp = useSelector<RootReducerType, string>(
    (state) => state.app.status,
  );
  const isLogIn = useSelector<RootReducerType, boolean>(
    (state) => state.auth.isLogIn,
  );
  const userLogin = useSelector<RootReducerType, string>(
    (state) => state.auth.userData.login,
  );
  const initialization = useSelector<RootReducerType, boolean>(
    (state) => state.auth.initialization,
  );

  const onClickLoginHandler = useCallback(() => {
    if (isLogIn) {
      dispatch(loginOutTC());
    }
  }, [isLogIn]);

  useEffect(() => {
    navigate("/todo");
    dispatch(authMeTC());
  }, []);

  return { statusApp, isLogIn, userLogin, onClickLoginHandler, initialization };
};
