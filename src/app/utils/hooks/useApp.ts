import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authThunk, useAppDispatch, useAppSelector } from "shared";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const urlName = useLocation().pathname;

  useEffect(() => {
    if (urlName === "/") {
      navigate("/todo");
    }
    dispatch(authThunk.authMeTC());
  }, [dispatch, navigate, urlName]);
  const statusApp = useAppSelector((state) => state.app.status);
  const userLogin = useAppSelector((state) => state.auth.userData.login);
  const { isLogIn, initialization } = useAppSelector((state) => state.auth);

  const onClickLoginHandler = useCallback(() => {
    if (isLogIn) {
      dispatch(authThunk.loginOutTC());
    }
  }, [isLogIn, dispatch]);

  return { statusApp, isLogIn, userLogin, onClickLoginHandler, initialization };
};
