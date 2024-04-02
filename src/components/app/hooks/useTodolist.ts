import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  TodolistsType,
  addTodoAC,
  deleteTodoAC,
  editTitleTodoAC,
} from "../../../store/todolists-reducer";
import { v1 } from "uuid";
import { RootReducerType } from "../../../store/store";

export const useTodolist = () => {
  const dispatch = useDispatch();
  const todolists = useSelector<RootReducerType, TodolistsType[]>((state) => state.todolists);

  const deleteTodo = useCallback(
    (tId: string) => {
      dispatch(deleteTodoAC(tId));
    },
    [dispatch]
  );
  const addTodo = useCallback(
    (title: string) => {
      const newTodoId = v1();
      dispatch(addTodoAC(newTodoId, title));
    },
    [dispatch]
  );

  const editTitleTodo = useCallback(
    (tId: string, newTitle: string) => {
      dispatch(editTitleTodoAC(tId, newTitle));
    },
    [dispatch]
  );

  return { addTodo, todolists, deleteTodo, editTitleTodo };
};
