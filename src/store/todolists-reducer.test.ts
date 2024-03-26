import { v1 } from "uuid";
import { TodolistsType, addTodoAC, deleteTodoAC, editTitleTodoAC, todolistReducer } from "./todolists-reducer";

let todolist: TodolistsType[] = [];
let todolist1Id = "";
let todolist2Id = "";

beforeEach(() => {
  todolist1Id = v1();
  todolist2Id = v1();

  todolist = [
    { id: todolist1Id, title: "What to learn" },
    { id: todolist2Id, title: "What to buy" },
  ];
});

test("Delete todolist by Id", () => {
  const newState = todolistReducer(todolist, deleteTodoAC(todolist1Id));
  expect(newState.length).toBe(1);

  expect(newState[0].id).toBe(todolist2Id);

  expect(newState[0].title).toBe("What to buy");
});

test("Add todolist", () => {
  const todolist3Id = v1();
  const newState = todolistReducer(todolist, addTodoAC(todolist3Id,"Top books"));
  expect(newState.length).toBe(3);
  expect(newState[0].title).toBe("Top books");
  expect(newState[2].id).toBe(todolist2Id);
  expect(newState[1].title).toBe("What to learn");
  expect(newState[0].id).toBe(todolist3Id);
});
test("Change title of todolist by id", () => {
  const newState = todolistReducer(todolist, editTitleTodoAC(todolist2Id, "Top cinema"));
  expect(newState[1].title).toBe("Top cinema");
  expect(newState[1].id).toBe(todolist2Id);
  expect(newState[0].title).toBe("What to learn");
  expect(newState.length).toBe(2);
});
