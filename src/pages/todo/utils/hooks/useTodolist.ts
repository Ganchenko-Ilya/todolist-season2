import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChangeTodolistsResponseType, RootReducerType } from "shared/types";
import { todolistsThunk } from "shared";
import { useAppDispatch } from "shared/store/hooks/useAppDispatch";

export const useTodolist = () => {
  const dispatch = useAppDispatch();
  const isLogin = useSelector<RootReducerType, boolean>((state) => state.auth.isLogIn);
  const todolists = useSelector<RootReducerType, ChangeTodolistsResponseType[]>((state) => state.todolists);

  useEffect(() => {
    if (isLogin) {
      dispatch(todolistsThunk.setTodo());
    }
  }, [dispatch, isLogin]);

  const deleteTodo = useCallback(
    (tId: string) => {
      dispatch(todolistsThunk.deleteTodo({ id: tId }));
    },
    [dispatch],
  );

  const addTodo = useCallback(
    (title: string) => {
      dispatch(todolistsThunk.addTodo({ title }));
    },
    [dispatch],
  );

  const editTitleTodo = useCallback(
    (tId: string, newTitle: string) => {
      dispatch(todolistsThunk.editTitleTodo({ id: tId, title: newTitle }));
    },
    [dispatch],
  );

  return { addTodo, todolists, deleteTodo, editTitleTodo, isLogin };
};
