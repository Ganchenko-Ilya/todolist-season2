import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import s from "./InputAddTask.module.css";
type EditableSpanPropsType = {
  title: string;
  editTitle: (newTitle: string) => void;
};
export const EditableSpan = (props: EditableSpanPropsType) => {
  let divRef = useRef<HTMLElement | null>(null);
  const [widthDiv, setWidthDiv] = useState(0);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (divRef.current) setWidthDiv(divRef.current.offsetWidth);
  }, [editMode]);

  const { title, editTitle } = props;

  const [value, setValue] = useState("");
  const [error, setError] = useState<string>("");
  const [width, setWidth] = useState<number>(0);
  console.log(widthDiv, title);
  const onDoubleClickHanlder = () => {
    setEditMode(true);
    setValue(title);

    setWidth(widthDiv);
  };
  const onBlurHanlder = () => {
    if (value.trim()) {
      if (value.trim() !== title) {
        editTitle(value);
      }
      setEditMode(false);
    } else {
      setError("Incorrect input");
      setWidth(80);
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
        setWidth(80);
      }
    }

    if (e.key === "Backspace") {
      if (value.trim()) {
        setWidth((width) => width - 8.7);
      }
    } else if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
      setWidth((width) => width + 8.7);
    }
  };

  const inputStyle = {
    width: `${width + 10}px`,
  };

  return (
    <>
      {editMode ? (
        <input
          onChange={onChangeHandler}
          value={value}
          autoFocus
          onBlur={onBlurHanlder}
          type="text"
          onKeyDown={onKeyDownHanlder}
          className={error ? s.inputError : s.inputEdit}
          placeholder={error}
          style={inputStyle}
        ></input>
      ) : (
        <span ref={divRef} style={{ fontSize: "16px" }} onDoubleClick={onDoubleClickHanlder}>
          {title}
        </span>
      )}
    </>
  );
};
