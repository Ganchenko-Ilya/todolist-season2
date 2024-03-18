import { useState } from "react";
import s from "./App.module.css";
import { v1 } from "uuid";
import { Todolist } from "./Todolist";
import { InputAddItemForm } from "./InputAddItemForm";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TodolistsType = {
  id: string;
  title: string;
};
export type TaskObjType = {
  [key: string]: TasksType[];
};
function App() {
  const todolist1Id = v1();
  const todolist2Id = v1();
  const [todolists, setTodolists] = useState<TodolistsType[]>([
    { id: todolist1Id, title: "What to learn" },
    { id: todolist2Id, title: "What to buy" },
  ]);
  const [tasks, setTasks] = useState<TaskObjType>({
    [todolist1Id]: [
      { id: v1(), title: "Css", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "TypeScript", isDone: false },
    ],
    [todolist2Id]: [
      { id: v1(), title: "book", isDone: true },
      { id: v1(), title: "bread", isDone: false },
      { id: v1(), title: "milk", isDone: false },
    ],
  });

  const addTask = (tId: string, title: string) => {
    setTasks({ ...tasks, [tId]: [...tasks[tId], { id: v1(), title, isDone: false }] });
  };
  const changeStatusTask = (tId: string, id: string, checked: boolean) => {
    setTasks({
      ...tasks,
      [tId]: tasks[tId].map((el) => (el.id === id ? { ...el, isDone: checked } : el)),
    });
  };
  const deleteTask = (tId: string, id: string) => {
    setTasks({ ...tasks, [tId]: tasks[tId].filter((el) => el.id !== id) });
  };
  const deleteTodo = (tId: string) => {
    setTodolists(todolists.filter((el) => el.id !== tId));
    const newTasks = { ...tasks };
    delete newTasks[tId];
    setTasks(newTasks);
  };
  const addTodo = (title: string) => {
    const newTodo: TodolistsType = { id: v1(), title };
    setTodolists([newTodo, ...todolists]);
    setTasks({ ...tasks, [newTodo.id]: [] });
  };
  const editTitleTask = (tId: string, id: string, newTitle: string) => {
    setTasks({
      ...tasks,
      [tId]: tasks[tId].map((el) => (el.id === id ? { ...el, title: newTitle } : el)),
    });
  };
  const editTitleTodo = (tId: string, newTitle: string) => {
    setTodolists(todolists.map((el) => (el.id === tId ? { ...el, title: newTitle } : el)));
  };

  return (
    <div className={s.app}>
      <div className={s.inputTodo}>
        <InputAddItemForm addItem={addTodo} placeholder="Add List" />
      </div>
      <div className={s.todolistsWrapper}>
        {todolists.map((el) => (
          <Todolist
            key={el.id}
            tId={el.id}
            tasks={tasks[el.id]}
            addTask={addTask}
            changeStatusTask={changeStatusTask}
            deleteTask={deleteTask}
            titleTodo={el.title}
            deleteTodo={deleteTodo}
            editTitleTask={editTitleTask}
            editTitleTodo={editTitleTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
