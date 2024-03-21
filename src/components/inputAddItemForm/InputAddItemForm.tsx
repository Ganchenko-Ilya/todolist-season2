import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./InputAddItemForm.module.css";

import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
type InputAddTaskProps = {
  addItem: (value: string) => void;
  helpText:string
};
export const InputAddItemForm = (props: InputAddTaskProps) => {
  const { addItem, helpText } = props;
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setError("");
  };
  const onClickOnKeyDownHandler = () => {
    if (value.trim()) {
      addItem(value);
    } else {
      setError("Incorrect input");
    }
    setValue("");
  };
  const onClickHandler = () => {
    onClickOnKeyDownHandler();
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onClickOnKeyDownHandler();
  };
  return (
    <div className={s.wrapper}>
      <TextField
        className={error ? s.inputError : ''}
        value={value}
        placeholder={error ? error : helpText}
        error={!!error}
        variant="outlined"
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
      />
      <AddIcon onClick={onClickHandler} />
    </div>
  );
};
