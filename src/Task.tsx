import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./components/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskType } from "./AppWithRedux";
import { ChangeEvent, memo } from "react";

type TaskPropsType = {
  task: TaskType;
  removeTask: (id: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  updateTask: (taskId: string, newTitle: string) => void;
};

export const Task = memo(({ task, removeTask, changeTaskStatus, updateTask }: TaskPropsType) => {
  const onClickHandler = () => removeTask(task.id);

  const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(task.id, e.currentTarget.checked);
  };

  const updateTaskHandler = (newTitle: string) => {
    updateTask(task.id, newTitle);
  };

  return (
    <li key={task.id} className={task.isDone ? "is-done" : ""}>
      <Checkbox checked={task.isDone} onChange={onChangeTaskStatus} />
      <EditableSpan oldTitle={task.title} onChange={updateTaskHandler} />
      <IconButton aria-label="delete" onClick={onClickHandler}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
});
