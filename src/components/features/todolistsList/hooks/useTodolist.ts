import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootReducerType, useAppDispatch } from "../../../../store/store";
import { ChangeTodolistsResponse } from "../../../../api/api";
import {
  addTodoTC,
  deleteTodoTC,
  editTitleTodoTC,
  setTodoTC,
} from "../../../../store/todolists-reducer";

export const useTodolist = () => {
  const dispatch = useAppDispatch();
  const isLogin = useSelector<RootReducerType, boolean>(
    (state) => state.auth.isLogIn,
  );
  const todolists = useSelector<RootReducerType, ChangeTodolistsResponse[]>(
    (state) => state.todolists,
  );

  useEffect(() => {
    if (isLogin) {
      dispatch(setTodoTC());
    }
  }, []);

  const deleteTodo = useCallback(
    (tId: string) => {
      dispatch(deleteTodoTC(tId));
    },
    [dispatch],
  );

  const addTodo = useCallback(
    (title: string) => {
      dispatch(addTodoTC(title));
    },
    [dispatch],
  );

  const editTitleTodo = useCallback(
    (tId: string, newTitle: string) => {
      dispatch(editTitleTodoTC(tId, newTitle));
    },
    [dispatch],
  );

  return { addTodo, todolists, deleteTodo, editTitleTodo, isLogin };
};
