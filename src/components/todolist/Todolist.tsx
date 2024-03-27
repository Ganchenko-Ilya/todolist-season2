import React, { useCallback, useState } from "react";

import s from "./Todolist.module.css";
import { InputAddItemForm } from "../otherComponents/inputAddItemForm/InputAddItemForm";

import { EditableSpan } from "../otherComponents/editableSpan/EditableSpan";
import { Button, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../store/store";
import { TasksType } from "../../store/tasks-reducer";
import { useDispatch } from "react-redux";
import {
  addTaskAC,
  changeStatusTaskAC,
  deleteTaskAC,
  editTitleTaskAC,
} from "../../store/tasks-reducer";
import { Task } from "./Task/Task";

type TodolistProps = {
  tId: string;
  titleTodo: string;
  deleteTodo: (tId: string) => void;
  editTitleTodo: (tId: string, newTitle: string) => void;
};

type FilterType = "All" | "Active" | "Complited";

export const Todolist = React.memo((props: TodolistProps) => {
  console.log("Todolist");

  const { tId, titleTodo, deleteTodo, editTitleTodo } = props;
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
    [dispatch]
  );
  const deleteTask = useCallback(
    (id: string) => {
      dispatch(deleteTaskAC(tId, id));
    },
    [dispatch]
  );
  const onCLickDeleteTodoHanlder = useCallback(() => {
    deleteTodo(tId);
  }, [dispatch]);
  const addTaskHandler = useCallback(
    (value: string) => {
      dispatch(addTaskAC(tId, value));
    },
    [dispatch]
  );
  const editTitleTask = useCallback(
    (id: string, newTitle: string) => {
      dispatch(editTitleTaskAC(tId, id, newTitle));
    },
    [dispatch]
  );
  const editTitleHandlerTodo = useCallback(
    (newTitle: string) => {
      editTitleTodo(tId, newTitle);
    },
    [dispatch]
  );

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Active"
      ? tasks.filter((el) => !el.isDone)
      : tasks.filter((el) => el.isDone);

  return (
    <div className={s.baseStyleTodo}>
      <Paper elevation={3} className={s.paper}>
        <div className={s.headerTodo}>
          <h3>
            <EditableSpan editTitle={editTitleHandlerTodo} title={titleTodo} />
            <DeleteIcon onClick={onCLickDeleteTodoHanlder} />
          </h3>
        </div>

        <InputAddItemForm addItem={addTaskHandler} helpText="Add Task" />
        <div className={s.wrapperTasks}>
          <ul>
            {filteredTasks.map((el) => (
              <Task
                key={el.id}
                el={el}
                editTitle={editTitleTask}
                onChangeStatus={onChangeStatus}
                deleteTask={deleteTask}
              />
            ))}
          </ul>
        </div>
        <div className={s.buttonFilters}>
          <Button
            size="small"
            onClick={() => onClickFilterHanlder("All")}
            variant={filter === "All" ? "contained" : "outlined"}
          >
            All
          </Button>
          <Button
            size="small"
            onClick={() => onClickFilterHanlder("Active")}
            variant={filter === "Active" ? "contained" : "outlined"}
          >
            Active
          </Button>
          <Button
            size="small"
            onClick={() => onClickFilterHanlder("Complited")}
            variant={filter === "Complited" ? "contained" : "outlined"}
          >
            Complited
          </Button>
        </div>
      </Paper>
    </div>
  );
});
