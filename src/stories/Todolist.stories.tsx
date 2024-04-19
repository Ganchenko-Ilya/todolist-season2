import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Todolist } from "../components/todolist/Todolist";
import { initialTodolistsState } from "../store/todolists-reducer";
import { Provider } from "react-redux";
import { store } from "../store/store";

const meta: Meta<typeof Todolist> = {
  title: "Todolist",
  component: Todolist,
  parameters: {
    layout: "centered",
  },
  decorators: (Story) => <Provider store={store}>{Story()}</Provider>,

  tags: ["autodocs"],
  args: {
    deleteTodo: fn(),
    editTitleTodo: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ExampleTodolist: Story = {
  args: { tId: initialTodolistsState[0].id, titleTodo: "asdasd" },
};
