import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "../EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, removeTaskAC, updateTaskTitleAC } from "../../state/reducers/TasksReducer";
import { TaskType } from "../../api";


type TaskPropsType = {
  task: TaskType;
  todolistID: string;
};

export const TaskWithRedux = memo(({ task, todolistID }: TaskPropsType) => {
  //  const tasksFilter = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[todolistID].filter(t=>t.id === taskID));
  //  const tasksFind = useSelector<AppRootStateType, TaskType>((state) => state.tasks[todolistID].find((t) => t.id === taskID) as TaskType);

  const dispatch = useDispatch();

  const onClickHandler = useCallback(() => dispatch(removeTaskAC(task.id, todolistID)), [dispatch]);

  const onChangeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistID));
    },
    [dispatch]
  );

  const updateTaskHandler = useCallback(
    (newTitle: string) => {
      dispatch(updateTaskTitleAC(task.id, newTitle, todolistID));
    },
    [dispatch]
  );

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
