import { Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditableSpan } from "../../otherComponents/editableSpan/EditableSpan";
import s from "./Task.module.css";
import React, { ChangeEvent, useCallback } from "react";

import { TasksType } from "../../../store/tasks-reducer";

export type TaskTypeProps = {
  el: TasksType;
  editTitle: (id: string, newTitle: string) => void;
  onChangeStatus: (id: string, status: boolean) => void;
  deleteTask: (id: string) => void;
};
export const Task = React.memo((props: TaskTypeProps) => {
  console.log(`Task`);

  const { deleteTask, editTitle, onChangeStatus } = props;
  const { id, isDone, title } = props.el;
  const editTitleHandlerTask = useCallback(
    (newTitle: string) => {
      editTitle(id, newTitle);
    },
    [editTitle]
  );
  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChangeStatus(id, e.currentTarget.checked);
    },
    [onChangeStatus]
  );
  const onCLickDeleteTaskHanlder = useCallback(() => {
    deleteTask(id);
  }, [deleteTask]);
  return (
    <div className={s.wrapperTasks}>
    <li className={isDone ? s.taskIsDone : ""}>
      <EditableSpan title={title} editTitle={editTitleHandlerTask} />
      <div className={s.wrapperCheckbox}>
        <Checkbox
          sx={{ width: "0px", height: "18px" }}
          onChange={onChangeStatusHandler}
          size="small"
          checked={isDone}
        />
        
        <DeleteIcon style={{cursor:'pointer'}} onClick={onCLickDeleteTaskHanlder} />
        
      </div>
    </li>
    </div>
  );
});
