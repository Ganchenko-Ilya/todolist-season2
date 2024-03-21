import { ChangeEvent, useState } from "react";
import { TasksType } from "../app/App";
import s from "./Todolist.module.css";
import { InputAddItemForm } from "../inputAddItemForm/InputAddItemForm";

import { EditableSpan } from "../editableSpan/EditableSpan";
import { Button, Checkbox, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type TodolistProps = {
  tasks: TasksType[];
  addTask: (tId: string, value: string) => void;
  changeStatusTask: (tId: string, id: string, checked: boolean) => void;
  deleteTask: (tId: string, id: string) => void;
  tId: string;
  titleTodo: string;
  deleteTodo: (tId: string) => void;
  editTitleTask: (tId: string, id: string, newTitle: string) => void;
  editTitleTodo: (tId: string, newTitle: string) => void;
};

type FilterType = "All" | "Active" | "Complited";

export const Todolist = (props: TodolistProps) => {
  const {
    tasks,
    addTask,
    changeStatusTask,
    deleteTask,
    tId,
    titleTodo,
    deleteTodo,
    editTitleTask,
    editTitleTodo,
  } = props;

  const [filter, setFilter] = useState<FilterType>("All");

  const onClickFilterHanlder = (filter: FilterType) => {
    const newFilter = filter === "All" ? "All" : filter === "Active" ? "Active" : "Complited";
    setFilter(newFilter);
  };
  const onChangeStatusHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    changeStatusTask(tId, id, e.currentTarget.checked);
  };
  const onCLickDeleteTaskHanlder = (id: string) => {
    deleteTask(tId, id);
  };
  const onCLickDeleteTodoHanlder = () => {
    deleteTodo(tId);
  };
  const addTaskHandler = (value: string) => {
    addTask(tId, value);
  };
  const editTitleHandler = (id: string, newTitle: string) => {
    editTitleTask(tId, id, newTitle);
  };
  const editTitleHandlerTodo = (newTitle: string) => {
    editTitleTodo(tId, newTitle);
  };

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

        <InputAddItemForm addItem={addTaskHandler} helpText='Add Task' />
        <div className={s.wrapperTasks}>
          <ul>
            {filteredTasks.map((el) => (
              <li className={el.isDone ? s.taskIsDone : ""} key={el.id}>
                <EditableSpan
                  title={el.title}
                  editTitle={(newTitle) => editTitleHandler(el.id, newTitle)}
                />
                <div className={s.wrapperCheckbox}>
                  <Checkbox
                    sx={{ width: "0px", height: "18px" }}
                    onChange={(e) => onChangeStatusHandler(el.id, e)}
                    size="small"
                    checked={el.isDone}
                  />
                  <DeleteIcon onClick={() => onCLickDeleteTaskHanlder(el.id)} />
                </div>
              </li>
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
};
