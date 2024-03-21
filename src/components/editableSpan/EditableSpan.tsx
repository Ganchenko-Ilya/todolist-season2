import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import s from "./EditableSpan.module.css";
import { TextField } from "@mui/material";
type EditableSpanPropsType = {
  title: string;
  editTitle: (newTitle: string) => void;
};
export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);

  const { title, editTitle } = props;

  const [value, setValue] = useState("");
  const [error, setError] = useState<string>("");

  const onDoubleClickHanlder = () => {
    setEditMode(true);
    setValue(title);
  };
  const onBlurHanlder = () => {
    if (value.trim()) {
      if (value.trim() !== title) {
        editTitle(value);
      }
      setEditMode(false);
    } else {
      setError("Incorrect input");
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);

    setError("");
  };
  const onKeyDownHanlder = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (value.trim()) {
        if (value.trim() !== title) {
          editTitle(value);
        }
        setEditMode(false);
      } else {
        setError("Incorrect input");
      }
    }
  };

  return (
    <div className={s.editWrapper}>
      {editMode ? (
        <TextField
          className={s.textField}
          error={!!error}
          variant="filled"
          autoFocus
          onBlur={onBlurHanlder}
          onKeyDown={onKeyDownHanlder}
          onChange={onChangeHandler}
          value={value}
          placeholder={error ? error : ""}
        />
      ) : (
        <span onDoubleClick={onDoubleClickHanlder}>{title}</span>
      )}
    </div>
  );
};
