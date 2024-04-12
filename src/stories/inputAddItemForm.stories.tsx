import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { InputAddItemForm } from "../otherComponents/inputAddItemForm/InputAddItemForm";

const meta: Meta<typeof InputAddItemForm> = {
  title: "InputAddItemForm",
  component: InputAddItemForm,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  args: { addItem: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ExampleInputAddItemForm: Story = {
  args: { helpText: "Input Text" },
};
