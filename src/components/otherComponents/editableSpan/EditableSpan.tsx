import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import s from "./EditableSpan.module.css";
import { TextField } from "@mui/material";
type EditableSpanPropsType = {
  title: string;
  editTitle: (newTitle: string) => void;
};
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log("EditableSpan");

  const [editMode, setEditMode] = useState(false);

  const { title, editTitle } = props;

  const [value, setValue] = useState("");
  const [error, setError] = useState<string>("");

  const onDoubleClickHanlder = () => {
    setEditMode(true);
    setValue(title);
  };
  const onBlurHanlder = useCallback(() => {
    if (value.trim()) {
      if (value.trim() !== title) {
        editTitle(value);
      }
      setEditMode(false);
    } else {
      setError("Incorrect input");
    }
  }, [value, title]);
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);

    setError("");
  }, []);
  const onKeyDownHanlder = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
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
    },
    [value, title]
  );

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
});
