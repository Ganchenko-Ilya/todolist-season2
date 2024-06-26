import { v1 } from "uuid";

import { tasksThunk, changeStatusLoadTaskAC, tasksReducer } from "shared/model/tasks-reducer";
import { todolistsThunk } from "shared/model/todolists-reducer";
import { ChangeTodolistsResponseType, TaskObjType } from "shared/types";

let todolist1Id = "";
let todolist2Id = "";
let tasks: TaskObjType = {};
let todolist: ChangeTodolistsResponseType[] = [];
let TasksStatusesTest = {
  New: 0,
  InProgress: 1,
  Completed: 2,
  Draft: 3,
};
beforeEach(() => {
  todolist1Id = v1();
  todolist2Id = v1();
  todolist = [
    {
      id: todolist1Id,
      title: "What to learn",
      addedDate: "",
      order: 0,
      statusTodo: "idle",
    },
    {
      id: todolist2Id,
      title: "What to buy",
      addedDate: "",
      order: 0,
      statusTodo: "idle",
    },
  ];
  tasks = {
    [todolist1Id]: [
      {
        id: v1(),
        title: "Css",
        status: TasksStatusesTest.Completed,
        todoListId: "",
        priority: 1,
        addedDate: "",
        deadline: "",
        description: null,
        order: 0,
        startDate: "",
        statusLoad: "idle",
      },
      {
        id: v1(),
        title: "React",
        status: TasksStatusesTest.New,
        todoListId: "",
        priority: 1,
        addedDate: "",
        deadline: "",
        description: null,
        order: 0,
        startDate: "",
        statusLoad: "idle",
      },
    ],
    [todolist2Id]: [
      {
        id: v1(),
        title: "book",
        status: TasksStatusesTest.Completed,
        todoListId: "",
        priority: 1,
        addedDate: "",
        deadline: "",
        description: null,
        order: 0,
        startDate: "",
        statusLoad: "idle",
      },
      {
        id: v1(),
        title: "bread",
        status: TasksStatusesTest.New,
        todoListId: "",
        priority: 1,
        addedDate: "",
        deadline: "",
        description: null,
        order: 0,
        startDate: "",
        statusLoad: "idle",
      },
    ],
  };
});

test("Add Task of todolist by Id", () => {
  const newState = tasksReducer(
    tasks,
    tasksThunk.addTask.fulfilled(
      {
        tId: todolist2Id,
        newTask: {
          id: v1(),
          title: "Snake",
          status: TasksStatusesTest.New,
          todoListId: "",
          priority: 0,
          addedDate: "",
          deadline: "",
          description: null,
          order: 0,
          startDate: "",
        },
      },
      "",
      { tId: "", title: "" },
    ),
  );

  expect(newState[todolist2Id].length).toBe(3);

  expect(newState[todolist2Id][2].status).toBe(TasksStatusesTest.New);
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
    tasksThunk.changeTask.fulfilled(
      { tId: todolist2Id, id: taskId, modelChange: { status: TasksStatusesTest.Completed } },
      "",
      { tId: "", id: "", itemChangedModel: {} },
    ),
  );
  expect(Object.keys(newState).length).toBe(2);
  expect(newState[todolist2Id].length).toBe(2);
  expect(newState[todolist2Id][1].status).toBe(TasksStatusesTest.Completed);
  expect(newState[todolist2Id][0].status).toBe(TasksStatusesTest.Completed);
  expect(newState[todolist1Id][0].status).toBe(TasksStatusesTest.Completed);
  expect(newState[todolist1Id][1].status).toBe(TasksStatusesTest.New);
});

test("Delete task from todolist by Id ", () => {
  const taskId = tasks[todolist2Id][1].id;
  const newState = tasksReducer(
    tasks,
    tasksThunk.deleteTask.fulfilled({ tId: todolist2Id, id: taskId }, "", { tId: "", id: "" }),
  );
  expect(Object.keys(newState).length).toBe(2);
  expect(newState[todolist2Id].length).toBe(1);
  expect(newState[todolist2Id][0].id).not.toBe(taskId);
  expect(newState[todolist1Id].length).toBe(2);
  expect(newState[todolist1Id][1].title).toBe("React");
});
test("Change title task by Id ", () => {
  const taskId = tasks[todolist2Id][1].id;
  const newState = tasksReducer(
    tasks,
    tasksThunk.changeTask.fulfilled({ tId: todolist2Id, id: taskId, modelChange: { title: "Computer" } }, "", {
      tId: "",
      id: "",
      itemChangedModel: {},
    }),
  );
  expect(Object.keys(newState).length).toBe(2);
  expect(newState[todolist2Id].length).toBe(2);
  expect(newState[todolist2Id][0].title).toBe("book");
  expect(newState[todolist2Id][1].title).toBe("Computer");
  expect(newState[todolist1Id][1].title).toBe("React");
  expect(newState[todolist1Id].length).toBe(2);
});
test("Add todolist and add  empty array for  tasks", () => {
  const todolist3Id = v1();
  const newState = tasksReducer(
    tasks,
    todolistsThunk.addTodo.fulfilled({ tId: todolist3Id, title: "Computer" }, "", { title: "" }),
  );
  expect(Object.keys(newState).length).toBe(3);
  expect(Object.keys(newState)[2]).toBe(todolist3Id);
  expect(newState[todolist3Id].length).toBe(0);
});
test("Delete key for Tasks after delete todolis", () => {
  const newState = tasksReducer(
    tasks,
    todolistsThunk.deleteTodo.fulfilled({ tId: todolist1Id }, "", { id: todolist1Id }),
  );

  expect(Object.keys(newState).length).toBe(1);
  expect(Object.keys(newState)[0]).toBe(todolist2Id);
  expect(newState[todolist1Id]).toBeUndefined();
});

test("Add empty array for keys of tasks", () => {
  const newState = tasksReducer({}, todolistsThunk.setTodo.fulfilled({ todolists: todolist }, ""));
  const result = Object.keys(newState);
  expect(newState[todolist[0].id]).toBeDefined();
  expect(newState[todolist[0].id].length).toBe(0);
  expect(result.length).toBe(2);
  expect(result[0]).toBe(todolist1Id);
});

test("Change status for loading Task ", () => {
  const newState = tasksReducer(
    tasks,
    changeStatusLoadTaskAC({ tId: todolist1Id, id: tasks[todolist1Id][0].id, status: "loading" }),
  );

  expect(newState[todolist1Id][0].statusLoad).toBe("loading");
  expect(newState[todolist2Id][0].statusLoad).toBe("idle");
});
