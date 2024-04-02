import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../store/store";
import { TasksType } from "../../store/tasks-reducer";

import { useCallback, useState } from "react";

import {
  addTaskAC,
  changeStatusTaskAC,
  deleteTaskAC,
  editTitleTaskAC,
} from "../../store/tasks-reducer";
export type FilterType = "All" | "Active" | "Complited";
export const useTask = (
  tId: string,
  deleteTodo: (tId: string) => void,
  editTitleTodo: (tId: string, newTitle: string) => void
) => {
  const tasks = useSelector<RootReducerType, TasksType[]>((state) => state.tasks[tId]);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<FilterType>("All");

  const onClickFilterHanlder = useCallback((filter: FilterType) => {
    const newFilter = filter === "All" ? "All" : filter === "Active" ? "Active" : "Complited";
    setFilter(newFilter);
  }, []);
  const onChangeStatus = useCallback(
    (id: string, status: boolean) => {
      dispatch(changeStatusTaskAC(tId, id, status));
    },
    [dispatch, tId, changeStatusTaskAC]
  );
  const deleteTask = useCallback(
    (id: string) => {
      dispatch(deleteTaskAC(tId, id));
    },
    [dispatch, tId, deleteTaskAC]
  );
  const onCLickDeleteTodoHanlder = useCallback(() => {
    deleteTodo(tId);
  }, [tId]);
  const addTaskHandler = useCallback(
    (value: string) => {
      dispatch(addTaskAC(tId, value));
    },
    [dispatch, tId]
  );
  const editTitleTask = useCallback(
    (id: string, newTitle: string) => {
      dispatch(editTitleTaskAC(tId, id, newTitle));
    },
    [dispatch, tId, editTitleTaskAC]
  );
  const editTitleHandlerTodo = useCallback(
    (newTitle: string) => {
      editTitleTodo(tId, newTitle);
    },
    [tId]
  );
  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Active"
        ? tasks.filter((el) => !el.isDone)
        : tasks.filter((el) => el.isDone);

  return {
    filter,
    editTitleHandlerTodo,
    onCLickDeleteTodoHanlder,
    addTaskHandler,
    editTitleTask,
    onChangeStatus,
    deleteTask,
    onClickFilterHanlder,
    filteredTasks,
  };
};
