import { Meta, StoryObj } from "@storybook/react";
import AppWithRedux from "../WithRedux/AppWithRedux";
import { ReduxStoreProvaiderDecorator } from "../../stories/ReduxStoreProvaiderDecorator";


const meta = {
  title: "TODOLIST/AppWithRedux",
  component: AppWithRedux,
  decorators: [ReduxStoreProvaiderDecorator],
} satisfies Meta<typeof AppWithRedux>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AppWithReduxStory: Story = {};
