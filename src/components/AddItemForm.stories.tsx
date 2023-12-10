import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { AddItemForm } from "./AddItemForm";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "TODOLIST/AddItemForm",
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    addItem: action("AddItemForm"),
  },
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormBase: Story = {};
