import { action } from "@storybook/addon-actions";
import { Task } from "../../components/Todolist/Task";
import { EditableSpan } from "../../components/EditableSpan";

export default {
  title: "EditableSpan Component",
  component: EditableSpan,
};

const onChangeCallback = action("Value changet");

export const EditableSpanBaseExapmle = (props: any) => {
  return <EditableSpan oldTitle={"Start value"} onChange={onChangeCallback} />;
};
