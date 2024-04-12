import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import s from "./InputAddItemForm.module.css";

import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { StatusType } from "../../store/app-reducer";
type InputAddTaskProps = {
  addItem: (value: string) => void;
  helpText: string;
  statusTodo?: StatusType;
};
export const InputAddItemForm = React.memo((props: InputAddTaskProps) => {
  console.log("InputAddItemForm");
  const { addItem, helpText, statusTodo } = props;
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    if (error) setError("");
  };
  const onClickOnKeyDownHandler = () => {
    if (value.trim()) {
      addItem(value);
    } else {
      setError("Incorrect input");
    }
    setValue("");
  };
  const onClickHandler = useCallback(() => {
    onClickOnKeyDownHandler();
  }, [onClickOnKeyDownHandler]);
  const onKeyDownHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onClickOnKeyDownHandler();
    },
    [onClickOnKeyDownHandler]
  );

  return (
    <div className={s.wrapper}>
      <TextField
        className={error ? s.inputError : ""}
        value={value}
        placeholder={error ? error : helpText}
        error={!!error}
        variant="outlined"
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
        disabled={statusTodo === "loading"}
      />
      <AddIcon
        onClick={onClickHandler}
        style={
          statusTodo === "loading"
            ? { pointerEvents: "none", cursor: "pointer" }
            : { cursor: "pointer" }
        }
      />
    </div>
  );
});
