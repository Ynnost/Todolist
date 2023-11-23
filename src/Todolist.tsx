import React, { ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import { FilterValuesType, TaskType } from "./App";

import { EditableSpan } from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { SuperCheckbox } from "./components/SuperCheckbox";
import { AddItemForm } from "./components/AddItemForm";
import { BattonMemo } from "./components/ButtonMemo";
import { Task } from "./Task";

export type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTodolist: (id: string) => void;
  id: string;
  addTask: (title: string, todolistID: string) => void;
  removeTask: (id: string, todolistID: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void;
  updateTask: (todolistID: string, taskId: string, newTitle: string) => void;
  updateTodolistTitle: (todolistID: string, newTitle: string) => void;
};

export const Todolist = memo((props: PropsType) => {
  let [filter, setFilter] = useState<FilterValuesType>("all");

  const changeFilter = useCallback((value: FilterValuesType) => {
    setFilter(value);
  }, []);

  const addTaskHandler = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
  );

  const updateTodolistTitleHandler = useCallback(
    (newTitle: string) => {
      props.updateTodolistTitle(props.id, newTitle);
    },
    [props.updateTodolistTitle, props.id]
  );

  const removeTask = useCallback((taskID: string) => props.removeTask(taskID, props.id), [props.id]);

  const updateTaskHandler = useCallback(
    (taskID: string, newTitle: string) => {
      props.updateTask(taskID, newTitle, props.id);
    },
    [props.updateTask, props.id]
  );

  const removeTodolist = useCallback(() => {
    return props.removeTodolist(props.id);
  }, [props.removeTodolist, props.id]);

  const onChangeTaskStatus = useCallback(
    (taskID: string, checked: boolean) => {
      props.changeTaskStatus(taskID, checked, props.id);
    },
    [props.changeTaskStatus, props.id]
  );

  let tasksForTodolist = props.tasks;

  useMemo(() => {
    if (filter === "active") {
      tasksForTodolist = props.tasks.filter((t) => !t.isDone);
    }

    if (filter === "completed") {
      tasksForTodolist = props.tasks.filter((t) => t.isDone);
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
      <AddItemForm callback={addTaskHandler} />
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
