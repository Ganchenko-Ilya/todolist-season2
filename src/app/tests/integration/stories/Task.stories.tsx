import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Task } from "features";
import { Provider } from "react-redux";
import { TasksStatuses } from "shared/enum/enumApi";
import { store } from "shared";

const meta: Meta<typeof Task> = {
  title: "Task",
  component: Task,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
  decorators: (Story) => <Provider store={store}>{Story()}</Provider>,

  args: { deleteTask: fn(), editTitle: fn(), onChangeStatus: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ExampleTask: Story = {
  args: {
    el: {
      id: "1",
      status: TasksStatuses.New,
      todoListId: "",
      priority: 1,
      addedDate: "",
      deadline: "",
      description: null,
      order: 0,
      startDate: "",
      title: "12312",
      statusLoad: "idle",
    },
  },
};
