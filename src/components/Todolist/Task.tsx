import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "../EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent, memo } from "react";
import {  TaskType } from "../../api";

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
    <li key={task.id} className={task.status ? "is-done" : ""}>
      <Checkbox checked={task.status} onChange={onChangeTaskStatus} />
      <EditableSpan oldTitle={task.title} onChange={updateTaskHandler} />
      <IconButton aria-label="delete" onClick={onClickHandler}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
});
