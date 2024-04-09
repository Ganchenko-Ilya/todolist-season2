import { v1 } from "uuid";

import { TaskObjType, addTaskAC, changeTaskAC, changeTaskTC, deleteTaskAC, tasksReducer } from "./tasks-reducer";
import { addTodoAC, deleteTodoAC } from "./todolists-reducer";
import { TasksStatuses, TodoTaskPriority } from "../api/todolists-api";

let todolist1Id = "";
let todolist2Id = "";
let tasks: TaskObjType = {};

beforeEach(() => {
  todolist1Id = v1();
  todolist2Id = v1();
  tasks = {
    [todolist1Id]: [
      {
        id: v1(),
        title: "Css",
        status: TasksStatuses.Complited,
        todoListId: "",
        priority: 1,
        addedDate: "",
        deadline: "",
        description: null,
        order: 0,
        startDate: "",
      },
      {
        id: v1(),
        title: "React",
        status: TasksStatuses.New,
        todoListId: "",
        priority: 1,
        addedDate: "",
        deadline: "",
        description: null,
        order: 0,
        startDate: "",
      },
    ],
    [todolist2Id]: [
      {
        id: v1(),
        title: "book",
        status: TasksStatuses.Complited,
        todoListId: "",
        priority: 1,
        addedDate: "",
        deadline: "",
        description: null,
        order: 0,
        startDate: "",
      },
      {
        id: v1(),
        title: "bread",
        status: TasksStatuses.New,
        todoListId: "",
        priority: 1,
        addedDate: "",
        deadline: "",
        description: null,
        order: 0,
        startDate: "",
      },
    ],
  };
});

test("Add Task of todolist by Id", () => {
  const newState = tasksReducer(tasks, addTaskAC(todolist2Id,{
    id: v1(),
    title: "Snake",
    status: TasksStatuses.New,
    todoListId: "",
    priority: TodoTaskPriority.Low,
    addedDate: "",
    deadline: "",
    description: null,
    order: 0,
    startDate: "",
  }, ));
  
  expect(newState[todolist2Id].length).toBe(3);

  expect(newState[todolist2Id][2].status).toBe(TasksStatuses.New);
  expect(newState[todolist2Id][0].title).toBe("Snake");
  expect(newState[todolist2Id][1].title).toBe("book");
  expect(newState[todolist1Id][1].title).toBe("React");
  expect(newState[todolist1Id][0].title).toBe("Css");
  expect(Object.keys(newState).length).toBe(2);
});
test("Change status task by Id", () => {
  const taskId = tasks[todolist2Id][1].id;
  const newState = tasksReducer(
    tasks,
    changeTaskAC(todolist2Id, taskId, {status:TasksStatuses.Complited})
  );
  expect(Object.keys(newState).length).toBe(2);
  expect(newState[todolist2Id].length).toBe(2);
  expect(newState[todolist2Id][1].status).toBe(TasksStatuses.Complited);
  expect(newState[todolist2Id][0].status).toBe(TasksStatuses.Complited);
  expect(newState[todolist1Id][0].status).toBe(TasksStatuses.Complited);
  expect(newState[todolist1Id][1].status).toBe(TasksStatuses.New);
});
test("Delete task from todolist by Id ", () => {
  const taskId = tasks[todolist2Id][1].id;
  const newState = tasksReducer(tasks, deleteTaskAC(todolist2Id, taskId));
  expect(Object.keys(newState).length).toBe(2);
  expect(newState[todolist2Id].length).toBe(1);
  expect(newState[todolist2Id][0].id).not.toBe(taskId);
  expect(newState[todolist1Id].length).toBe(2);
  expect(newState[todolist1Id][1].title).toBe("React");
});
test("Change title task by Id ", () => {
  const taskId = tasks[todolist2Id][1].id;
  const newState = tasksReducer(tasks, changeTaskAC(todolist2Id, taskId, { title: "Computer" }));
  expect(Object.keys(newState).length).toBe(2);
  expect(newState[todolist2Id].length).toBe(2);
  expect(newState[todolist2Id][0].title).toBe("book");
  expect(newState[todolist2Id][1].title).toBe("Computer");
  expect(newState[todolist1Id][1].title).toBe("React");
  expect(newState[todolist1Id].length).toBe(2);
});
test("Add todolist and add  empty array for  tasks", () => {
  const todolist3Id = v1();
  const newState = tasksReducer(tasks, addTodoAC(todolist3Id, "Computer"));
  expect(Object.keys(newState).length).toBe(3);
  expect(Object.keys(newState)[2]).toBe(todolist3Id);
  expect(newState[todolist3Id].length).toBe(0);
});
test("Delete key for Tasks after delete todolis", () => {
  const newState = tasksReducer(tasks, deleteTodoAC(todolist1Id));

  expect(Object.keys(newState).length).toBe(1);
  expect(Object.keys(newState)[0]).toBe(todolist2Id);
  expect(newState[todolist1Id]).toBeUndefined();
});
