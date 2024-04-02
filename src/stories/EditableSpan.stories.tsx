import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { EditableSpan } from "../components/otherComponents/editableSpan/EditableSpan";
const meta: Meta<typeof EditableSpan> = {
  title: "EditebleSpan",
  component: EditableSpan,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  args: { editTitle: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ExampleTask: Story = {
  args: { title: "1234" },
};
