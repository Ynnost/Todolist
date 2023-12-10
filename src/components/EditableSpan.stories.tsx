import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { EditableSpan } from "./EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "TODOLIST/EditableSpan",
  component: EditableSpan,
  args: {
    oldTitle: "Start value",
    onChange: action("Value changet"),
  },
} satisfies Meta<typeof EditableSpan>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EditableSpanStory: Story = {};
