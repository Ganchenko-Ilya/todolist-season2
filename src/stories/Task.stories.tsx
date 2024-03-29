import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Task } from "../components/todolist/Task/Task";

import {} from "../testComponents/helpFuction/providerDecorator";
const meta: Meta<typeof Task> = {
  title: "Task",
  component: Task,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  args: { deleteTask: fn(), editTitle: fn(), onChangeStatus: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ExampleTask: Story = {
  args: { el: { id: "1", isDone: false, title: "StoryBook" } },
};
