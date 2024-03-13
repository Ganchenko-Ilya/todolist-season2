import { useState } from "react";

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

  return (
    <>
      <Todolist tasks={tasks} />
    </>
  );
}

export default App;
