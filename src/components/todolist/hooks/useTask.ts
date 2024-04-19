import { useSelector } from "react-redux";
import { RootReducerType, useAppDispatch } from "../../../store/store";
import { useCallback, useEffect, useState } from "react";
import {
  addTaskTC,
  changeTaskTC,
  deleteTaskTC,
  setTaskTC,
} from "../../../store/tasks-reducer";
import { ChangeTaskResponseType } from "../../../api/api";

export type FilterType = "All" | "Active" | "Complited";

export const useTask = (
  tId: string,
  deleteTodo: (tId: string) => void,
  editTitleTodo: (tId: string, newTitle: string) => void,
) => {
  const tasks = useSelector<RootReducerType, ChangeTaskResponseType[]>(
    (state) => state.tasks[tId],
  );
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<FilterType>("All");

  useEffect(() => {
    dispatch(setTaskTC(tId));
  }, []);

  const onClickFilterHanlder = useCallback((filter: FilterType) => {
    const newFilter =
      filter === "All" ? "All" : filter === "Active" ? "Active" : "Complited";
    setFilter(newFilter);
  }, []);

  const onChangeStatus = useCallback(
    (id: string, status: number) => {
      dispatch(changeTaskTC(tId, id, { status }));
    },
    [dispatch, tId, changeTaskTC],
  );

  const deleteTask = useCallback(
    (id: string) => {
      dispatch(deleteTaskTC(tId, id));
    },
    [dispatch, tId, deleteTaskTC],
  );

  const onCLickDeleteTodoHanlder = useCallback(() => {
    deleteTodo(tId);
  }, [tId]);

  const addTaskHandler = useCallback(
    (value: string) => {
      dispatch(addTaskTC(tId, value));
    },
    [dispatch, tId, addTaskTC],
  );

  const editTitleTask = useCallback(
    (id: string, newTitle: string) => {
      dispatch(changeTaskTC(tId, id, { title: newTitle }));
    },
    [dispatch, tId, changeTaskTC],
  );

  const editTitleHandlerTodo = useCallback(
    (newTitle: string) => {
      editTitleTodo(tId, newTitle);
    },
    [tId],
  );

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Active"
        ? tasks.filter((el) => !el.status)
        : tasks.filter((el) => el.status);

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
