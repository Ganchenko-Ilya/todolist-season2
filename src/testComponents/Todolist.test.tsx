import renderer from "react-test-renderer";
import { TodolistWithProvider } from "./helpFuction/providerDecorator";
import { initialTodolistsState } from "../store/todolists-reducer";

test("renders correctly", () => {
  const result = renderer
    .create(
      <TodolistWithProvider
        deleteTodo={() => {}}
        editTitleTodo={() => {}}
        tId={initialTodolistsState[0].id}
        titleTodo="Test"
      />
    )
    .toJSON();
  expect(result).toMatchSnapshot();
});
