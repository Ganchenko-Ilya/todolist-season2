import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./InputAddTask.module.css";
import addIcon from "./add-icon.png";
type InputAddTaskProps = {
  addTask: (value: string) => void;
};
export const InputAddTask = (props: InputAddTaskProps) => {
  const { addTask } = props;
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setError("");
  };
  const onClickOnKeyDownHandler = () => {
    if (value.trim()) {
      addTask(value);
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
      <input
        className={error ? s.inputError : s.input}
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
        type="text"
        value={value}
      />
      <img onClick={onClickHandler} className={s.buttonIcon} src={addIcon} alt="add" />
      <div className={s.textError}>{error}</div>
    </div>
  );
};
