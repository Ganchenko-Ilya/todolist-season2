import { v1 } from "uuid";
import { changeStatusTodoAC, todolistsThunk, todolistReducer } from "shared/model/todolists-reducer";
import { ChangeTodolistsResponseType } from "shared/types";

let todolist: ChangeTodolistsResponseType[] = [];
let todolist1Id = "";
let todolist2Id = "";

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
});

test("Delete todolist by Id", () => {
  const newState = todolistReducer(todolist, todolistsThunk.deleteTodo.fulfilled({ tId: todolist1Id }, "", { id: "" }));
  expect(newState.length).toBe(1);

  expect(newState[0].id).toBe(todolist2Id);

  expect(newState[0].title).toBe("What to buy");
});

test("Add todolist", () => {
  const todolist3Id = v1();
  const newState = todolistReducer(
    todolist,
    todolistsThunk.addTodo.fulfilled({ tId: todolist3Id, title: "Top books" }, "", { title: "" }),
  );
  expect(newState.length).toBe(3);
  expect(newState[0].title).toBe("Top books");
  expect(newState[2].id).toBe(todolist2Id);
  expect(newState[1].title).toBe("What to learn");
  expect(newState[0].id).toBe(todolist3Id);
});
test("Change title of todolist by id", () => {
  const newState = todolistReducer(
    todolist,
    todolistsThunk.editTitleTodo.fulfilled({ tId: todolist2Id, title: "Top cinema" }, "", { id: "", title: "" }),
  );
  expect(newState[1].title).toBe("Top cinema");
  expect(newState[1].id).toBe(todolist2Id);
  expect(newState[0].title).toBe("What to learn");
  expect(newState.length).toBe(2);
});

test("Change status Todo", () => {
  const newState = todolistReducer(todolist, changeStatusTodoAC({ tId: todolist1Id, status: "loading" }));

  expect(newState[0].statusTodo).toBe("loading");
  expect(newState[1].statusTodo).toBe("idle");
});

test("Set Todo in State", () => {
  const newState = todolistReducer([], todolistsThunk.setTodo.fulfilled({ todolists: todolist }, ""));

  expect(newState[0].title).toBe("What to learn");
  expect(newState[1].statusTodo).toBe("idle");
  expect(newState.length).toBe(2);
});
