import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { Task } from "./Task";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "TODOLIST/Task",
  component: Task,
  args: {
    task: { id: "1", isDone: true, title: "CSS" },
    removeTask: action("Task removed"),
    changeTaskStatus: action("Status changet"),
    updateTask: action("Title changet"),
  },
} satisfies Meta<typeof Task>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
  args: {
    task: { id: "2", isDone: false, title: "JavaScript" },
  },
};
