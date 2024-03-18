import { ChangeEvent, useState } from "react";
import { TasksType } from "./App";
import s from "./Todolist.module.css";
import { InputAddItemForm } from "./InputAddItemForm";
import deleteIcon from "./delete-icon.png";
import { EditableSpan } from "./EditableSpan";

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
    editTitleTodo
  } = props;

  const [filter, setFilter] = useState<FilterType>("All");

  const onClickFilterHanlder = (filter: FilterType) => {
    const newFilter = filter === "All" ? "All" : filter === "Active" ? "Active" : "Complited";
    setFilter(newFilter);
  };
  const onChangeStatusHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    changeStatusTask(tId, id, e.currentTarget.checked);
  };
  const onCLickDeleteTaskHenlder = (id: string) => {
    deleteTask(tId, id);
  };
  const onCLickDeleteTodoHenlder = () => {
    deleteTodo(tId);
  };
  const addTaskHandler = (value: string) => {
    addTask(tId, value);
  };
  const editTitleHandler = (id: string, newTitle: string) => {
    editTitleTask(tId, id, newTitle);
  };
  const editTitleHandlerTodo = (newTitle: string) => {
    editTitleTodo(tId,newTitle)
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Active"
      ? tasks.filter((el) => !el.isDone)
      : tasks.filter((el) => el.isDone);

  return (
    <div className={s.baseStyleTodo}>
      <div className={s.headerTodo}>
        <h3>
          <EditableSpan editTitle={editTitleHandlerTodo} title={titleTodo} />
          <img onClick={onCLickDeleteTodoHenlder} src={deleteIcon} alt="deleteTodo" />
        </h3>
      </div>

      <InputAddItemForm addItem={addTaskHandler} />
      <div className={s.wrapperTasks}>
        <ul>
          {filteredTasks.map((el) => (
            <li className={el.isDone ? s.taskIsDone : ""} key={el.id}>
              <EditableSpan
                title={el.title}
                editTitle={(newTitle) => editTitleHandler(el.id, newTitle)}
              />
              <div>
                <input
                  onChange={(e) => onChangeStatusHandler(el.id, e)}
                  type="checkbox"
                  checked={el.isDone}
                />{" "}
                <img
                  onClick={() => onCLickDeleteTaskHenlder(el.id)}
                  className={s.img}
                  src={deleteIcon}
                  alt="deleteTask"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.buttonsFilter}>
        <button
          className={filter === "All" ? s.buttonActiveFilter : s.buttonBaseFilter}
          onClick={() => onClickFilterHanlder("All")}
        >
          All
        </button>
        <button
          className={filter === "Active" ? s.buttonActiveFilter : s.buttonBaseFilter}
          onClick={() => onClickFilterHanlder("Active")}
        >
          Active
        </button>
        <button
          className={filter === "Complited" ? s.buttonActiveFilter : s.buttonBaseFilter}
          onClick={() => onClickFilterHanlder("Complited")}
        >
          Complited
        </button>
      </div>
    </div>
  );
};
