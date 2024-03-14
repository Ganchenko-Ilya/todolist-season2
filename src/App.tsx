import { useState } from "react";
import s from './App.module.css'
import { v1 } from "uuid";
import { Todolist } from "./Todolist";


export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};
function App() {
  const [tasks, setTasks] = useState<TasksType[]>([
    { id: v1(), title: "Css", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "TypeScript", isDone: false },
  ]);
  const addTask = (title: string) => {
    setTasks([...tasks, { id: v1(), title, isDone: false }]);
  };
  const changeStatusTask = (id: string, checked: boolean) => {
    setTasks(tasks.map((el) => (el.id === id ? { ...el, isDone: checked } : el)));
  };
  const deleteTask = (id:string) => {
    setTasks(tasks.filter(el => el.id !== id))
  }

  return (
    <>
   
      <Todolist tasks={tasks} addTask={addTask} changeStatusTask={changeStatusTask} deleteTask={deleteTask} />
      
    </>
  );
}

export default App;
