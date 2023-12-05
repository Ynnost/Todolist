import { action } from "@storybook/addon-actions";
import { Task } from "../../components/Todolist/Task";

export default {
  title: "Task Component",
  component: Task,
};

const onChangeTaskStatusCallback = action("Status changet");
const removeTaskCallback = action("Task removed");
const updateTaskHandlerCallback = action("Title changet");

export const TaskBaseExapmle = (props: any) => {
  return (
    <>
      <Task
        task={{ id: "1", isDone: true, title: "CSS" }}
        removeTask={removeTaskCallback}
        changeTaskStatus={onChangeTaskStatusCallback}
        updateTask={updateTaskHandlerCallback}
      />
      <Task
        task={{ id: "2", isDone: false, title: "JavaScript" }}
        removeTask={removeTaskCallback}
        changeTaskStatus={onChangeTaskStatusCallback}
        updateTask={updateTaskHandlerCallback}
      />
    </>
  );
};
