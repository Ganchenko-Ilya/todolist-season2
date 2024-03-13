import { useState } from "react";
import { TasksType } from "./App";
import s from "./Todolist.module.css";

type TodolistProps = {
  tasks: TasksType[];
};

type FilterType = "All" | "Active" | "Complited";

export const Todolist = (props: TodolistProps) => {
  const { tasks } = props;

  const [filter, setFilter] = useState<FilterType>("All");

  const onClickFilterHanlder = (filter: FilterType) => {
    const newFilter = filter === "All" ? "All" : filter === "Active" ? "Active" : "Complited";
    setFilter(newFilter);
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Active"
      ? tasks.filter((el) => !el.isDone)
      : tasks.filter((el) => el.isDone);

  return (
    <div className={s.baseStyleTodo}>
      <div className={s.wrapperInputAddTask}>
        <input className={s.inputAddTask} type="text" />
        <button>+</button>
      </div>
      <div className={s.wrapperTasks}>
        <ul>
          {filteredTasks.map((el) => (
            <li key={el.id}>
              {el.title}
              <input type="checkbox" checked={el.isDone} />{" "}
            </li>
          ))}
        </ul>
      </div>
      <div className={s.buttonsFilter}>
        <button onClick={() => onClickFilterHanlder("All")}>All</button>
        <button onClick={() => onClickFilterHanlder("Active")}>Active</button>
        <button onClick={() => onClickFilterHanlder("Complited")}>Complited</button>
      </div>
    </div>
  );
};
