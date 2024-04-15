import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  addTodoTC,
  deleteTodoTC,
  editTitleTodoTC,
  setTodoTC,
} from "../../../../store/todolists-reducer";

import { RootReducerType, useAppDispatch } from "../../../../store/store";
import { ChangeTodolistsResponse } from "../../../../api/api";

export const useTodolist = () => {
  const dispatch = useAppDispatch();
  const todolists = useSelector<RootReducerType, ChangeTodolistsResponse[]>(
    (state) => state.todolists
  );

  useEffect(() => {
    dispatch(setTodoTC());
  }, []);
  const deleteTodo = useCallback(
    (tId: string) => {
      dispatch(deleteTodoTC(tId));
    },
    [dispatch]
  );
  const addTodo = useCallback(
    (title: string) => {
      dispatch(addTodoTC(title));
    },
    [dispatch]
  );

  const editTitleTodo = useCallback(
    (tId: string, newTitle: string) => {
      dispatch(editTitleTodoTC(tId, newTitle));
    },
    [dispatch]
  );

  return { addTodo, todolists, deleteTodo, editTitleTodo };
};
