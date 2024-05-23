import { useCallback, useEffect, useState } from "react";
import { tasksThunk, useAppDispatch, FilterType, useAppSelector } from "shared";

export const useTask = (
  tId: string,
  deleteTodo: (tId: string) => void,
  editTitleTodo: (tId: string, newTitle: string) => void,
) => {
  const tasks = useAppSelector((state) => state.tasks[tId]);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<FilterType>("All");

  useEffect(() => {
    dispatch(tasksThunk.setTask({ tId }));
  }, [dispatch, tId]);

  const onClickFilterHanlder = useCallback((filter: FilterType) => {
    const newFilter = filter === "All" ? "All" : filter === "Active" ? "Active" : "Complited";
    setFilter(newFilter);
  }, []);

  const onChangeStatus = useCallback(
    (id: string, status: number) => {
      dispatch(tasksThunk.changeTask({ tId, id, itemChangedModel: { status } }));
    },
    [dispatch, tId],
  );

  const deleteTask = useCallback(
    (id: string) => {
      dispatch(tasksThunk.deleteTask({ tId, id }));
    },
    [dispatch, tId],
  );

  const onCLickDeleteTodoHanlder = useCallback(() => {
    deleteTodo(tId);
  }, [tId, deleteTodo]);

  const addTaskHandler = useCallback(
    (value: string) => {
      dispatch(tasksThunk.addTask({ tId, title: value }));
    },
    [dispatch, tId],
  );

  const editTitleTask = useCallback(
    (id: string, newTitle: string) => {
      dispatch(tasksThunk.changeTask({ tId, id, itemChangedModel: { title: newTitle } }));
    },
    [dispatch, tId],
  );

  const editTitleHandlerTodo = useCallback(
    (newTitle: string) => {
      editTitleTodo(tId, newTitle);
    },
    [tId, editTitleTodo],
  );

  const filteredTasks =
    filter === "All" ? tasks : filter === "Active" ? tasks.filter((el) => !el.status) : tasks.filter((el) => el.status);

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
