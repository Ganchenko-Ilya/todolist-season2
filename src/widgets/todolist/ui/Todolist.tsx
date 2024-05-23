import React from "react";
import s from "./Todolist.module.css";
import { Button, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTask } from "../utils/hooks/useTask";
import { StatusType } from "shared/types";
import { InputAddItemForm } from "features";
import { Task } from "features";
import { EditableSpan } from "shared/ui";

type TodolistProps = {
  tId: string;
  titleTodo: string;
  statusTodo: StatusType;
  deleteTodo: (tId: string) => void;
  editTitleTodo: (tId: string, newTitle: string) => void;
};

export const Todolist = React.memo((props: TodolistProps) => {
  console.log("Todolist");

  const { tId, titleTodo, statusTodo, deleteTodo, editTitleTodo } = props;
  const {
    filter,
    editTitleHandlerTodo,
    onCLickDeleteTodoHanlder,
    addTaskHandler,
    editTitleTask,
    onChangeStatus,
    deleteTask,
    onClickFilterHanlder,
    filteredTasks,
  } = useTask(tId, deleteTodo, editTitleTodo);

  return (
    <div>
      <div className={s.baseStyleTodo}>
        <Paper elevation={3} className={s.paper}>
          <div className={s.headerTodo}>
            <h3>
              <EditableSpan statusTodo={statusTodo} editTitle={editTitleHandlerTodo} title={titleTodo} />
              <DeleteIcon
                style={
                  statusTodo === "loading"
                    ? { pointerEvents: "none", opacity: 0.5, cursor: "pointer" }
                    : { cursor: "pointer" }
                }
                onClick={onCLickDeleteTodoHanlder}
              />
            </h3>
          </div>

          <InputAddItemForm statusTodo={statusTodo} addItem={addTaskHandler} helpText="Add Task" />
          <div className={s.wrapperListTasks}>
            <ul>
              {filteredTasks.map((el) => (
                <Task
                  key={el.id}
                  el={el}
                  statusTodo={statusTodo}
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
    </div>
  );
});
