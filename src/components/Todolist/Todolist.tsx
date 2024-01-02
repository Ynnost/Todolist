import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { EditableSpan } from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddItemForm } from "../AddItemForm";
import { BattonMemo } from "../ButtonMemo";
import { Task } from "./Task";
import { FilterValuesType, TaskStatuses, TaskType } from "../../api";
import { getTasksThunkTC } from "../../state/reducers/TasksReducer";
import { useAppDispatch } from "../../state/store";

export type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTodolist: (id: string) => void;
  id: string;
  addTask: (title: string, todolistID: string) => void;
  removeTask: (id: string, todolistID: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistID: string) => void;
  updateTask: (todolistID: string, taskId: string, newTitle: string) => void;
  updateTodolistTitle: (todolistID: string, newTitle: string) => void;
};

export const Todolist = memo((props: PropsType) => {
  let [filter, setFilter] = useState<FilterValuesType>("all");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksThunkTC(props.id));
  }, [dispatch, props.id]);

  const changeFilter = useCallback((value: FilterValuesType) => {
    setFilter(value);
  }, []);

  const addTaskHandler = useCallback(
    (title: string) => {
      props.addTask(props.id, title);
    },
    [props]
  );

  const updateTodolistTitleHandler = useCallback(
    (newTitle: string) => {
      props.updateTodolistTitle(props.id, newTitle);
    },
    [props]
  );

  const removeTask = useCallback((taskID: string) => props.removeTask(props.id, taskID), [props]);

  const updateTaskHandler = useCallback(
    (taskID: string, newTitle: string) => {
      props.updateTask(taskID, newTitle, props.id);
    },
    [props]
  );

  const removeTodolist = useCallback(() => {
    return props.removeTodolist(props.id);
  }, [props]);

  const onChangeTaskStatus = useCallback(
    (taskID: string, checked: TaskStatuses) => {
      props.changeTaskStatus(taskID, checked, props.id);
    },
    [props]
  );

  let tasksForTodolist = props.tasks;

  useMemo(() => {
    if (filter === "active") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
    }

    if (filter === "completed") {
      tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
    }
  }, [filter]);

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={props.title} onChange={updateTodolistTitleHandler} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} />
      <ul>
        {tasksForTodolist.map((t) => {
          return <Task key={t.id} task={t} removeTask={removeTask} changeTaskStatus={onChangeTaskStatus} updateTask={updateTaskHandler} />;
        })}
      </ul>
      <div>
        <BattonMemo variant={filter === "all" ? "outlined" : "contained"} color="success" onClick={() => changeFilter("all")}>
          All
        </BattonMemo>
        <BattonMemo variant={filter === "active" ? "outlined" : "contained"} color="error" onClick={() => changeFilter("active")}>
          Active
        </BattonMemo>
        <BattonMemo variant={filter === "completed" ? "outlined" : "contained"} color="secondary" onClick={() => changeFilter("completed")}>
          Completed
        </BattonMemo>
      </div>
    </div>
  );
});
