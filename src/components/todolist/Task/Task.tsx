import { Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditableSpan } from "../../../otherComponents/editableSpan/EditableSpan";
import s from "./Task.module.css";
import React, { ChangeEvent, useCallback } from "react";

import { ChangeTaskResponseType, TasksStatuses } from "../../../api/todolists-api";
import { StatusType } from "../../../store/app-reducer";

export const Task = React.memo((props: TaskTypeProps) => {
  console.log(`Task`);

  const { deleteTask, editTitle, onChangeStatus, statusTodo } = props;
  const { id, status, title, statusLoad } = props.el;

  const editTitleHandlerTask = useCallback(
    (newTitle: string) => {
      editTitle(id, newTitle);
    },
    [editTitle]
  );
  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChangeStatus(id, e.currentTarget.checked ? TasksStatuses.Complited : TasksStatuses.New);
    },
    [onChangeStatus]
  );
  const onCLickDeleteTaskHanlder = useCallback(() => {
    deleteTask(id);
  }, [deleteTask]);

  return (
    <div className={s.wrapperTasks}>
      <li className={status ? s.taskIsDone : ""}>
        <EditableSpan
          statusTodo={statusTodo}
          statusLoad={statusLoad}
          title={title}
          editTitle={editTitleHandlerTask}
        />
        <div className={s.wrapperCheckbox}>
          <Checkbox
            sx={{ width: "0px", height: "18px" }}
            onChange={onChangeStatusHandler}
            size="small"
            checked={!!status}
            disabled={statusTodo === "loading" || statusLoad === "loading"}
          />

          <DeleteIcon
            className={s.deleteIcon}
            style={
              statusTodo === "loading" || statusLoad === "loading"
                ? { pointerEvents: "none", opacity: 0.5, cursor: "pointer" }
                : {}
            }
            onClick={onCLickDeleteTaskHanlder}
          />
        </div>
      </li>
    </div>
  );
});

export type TaskTypeProps = {
  el: ChangeTaskResponseType;
  statusTodo: StatusType;
  editTitle: (id: string, newTitle: string) => void;
  onChangeStatus: (id: string, status: number) => void;
  deleteTask: (id: string) => void;
};
