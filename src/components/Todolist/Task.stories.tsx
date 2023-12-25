import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { Task } from "./Task";
import { TaskPriorities, TaskStatuses } from "../../api";
import { v1 } from "uuid";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "TODOLIST/Task",
  component: Task,
  args: {
    task: {
      id: v1(),
      title: "HTML&CSS",
      status: TaskStatuses.Completed,
      todoListId: '1',
      description: "",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
    },
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
    task: {
      id: v1(),
      title: "HTML&CSS",
      status: TaskStatuses.Completed,
      todoListId: "1",
      description: "",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
    },
  },
};
