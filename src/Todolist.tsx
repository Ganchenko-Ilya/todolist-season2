import { ChangeEvent, useState } from "react";
import { TasksType } from "./App";
import s from "./Todolist.module.css";
import { InputAddTask } from "./InputAddTask";
import deletIcon from "./delete-icon.png";

type TodolistProps = {
  tasks: TasksType[];
  addTask: (value: string) => void;
  changeStatusTask: (id: string, checked: boolean) => void;
  deleteTask: (id: string) => void;
};

type FilterType = "All" | "Active" | "Complited";

export const Todolist = (props: TodolistProps) => {
  const { tasks, addTask, changeStatusTask, deleteTask } = props;

  const [filter, setFilter] = useState<FilterType>("All");

  const onClickFilterHanlder = (filter: FilterType) => {
    const newFilter = filter === "All" ? "All" : filter === "Active" ? "Active" : "Complited";
    setFilter(newFilter);
  };
  const onChangeStatusHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    changeStatusTask(id, e.currentTarget.checked);
  };
  const onCLickDeleteHenlder = (id: string) => {
    deleteTask(id);
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Active"
      ? tasks.filter((el) => !el.isDone)
      : tasks.filter((el) => el.isDone);

  return (
    <div className={s.baseStyleTodo}>
      <InputAddTask addTask={addTask} />
      <div className={s.wrapperTasks}>
        <ul>
          {filteredTasks.map((el) => (
            <li className={el.isDone ? s.taskIsDone:''} key={el.id}>
              {el.title}
              <div>
                <input
                  onChange={(e) => onChangeStatusHandler(el.id, e)}
                  type="checkbox"
                  checked={el.isDone}
                />{" "}
                <img
                  onClick={() => onCLickDeleteHenlder(el.id)}
                  className={s.img}
                  src={deletIcon}
                  alt="delete"
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
