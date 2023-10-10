import React, { ChangeEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";
import AddItemForm from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { SuperCheckbox } from "./components/SuperCheckbox";

export type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTodolist: (id: string) => void;
  id: string;
  addTask: (title: string, todolistID: string) => void;
  removeTask: (id: string, todolistID: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistID: string
  ) => void;
  updateTask: (todolistID: string, taskId: string, newTitle: string) => void;
  updateTodolistTitle: (todolistID: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
  let [filter, setFilter] = useState<FilterValuesType>("all");

  const colanderFoo = () => {
    let tasksForTodolist = props.tasks;
    if (filter === "active") {
      tasksForTodolist = props.tasks.filter((t) => !t.isDone);
    }
    if (filter === "completed") {
      tasksForTodolist = props.tasks.filter((t) => t.isDone);
    }
    return tasksForTodolist;
  };

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  };

  const addTaskHandler = (title: string) => {
    props.addTask(title, props.id);
  };

  const updateTodolistTitleHandler = (newTitle: string) => {
    props.updateTodolistTitle(props.id, newTitle);
  };

  const updateTaskHandler = (taskID: string, newTitle: string) => {
    props.updateTask(props.id, taskID, newTitle);
  };

  const removeTodolist = () => {
    return props.removeTodolist(props.id);
  };

  const onChangeTaskStatus = (taskID: string, checked: boolean) => {
    props.changeTaskStatus(taskID, checked, props.id);
  };

  console.log(props.tasks);

  console.log(colanderFoo(), "COlOANDER");
  return (
    <div>
      <h3>
        <EditableSpan
          oldTitle={props.title}
          callback={updateTodolistTitleHandler}
        />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm callback={addTaskHandler} />
      <ul>
        {colanderFoo().map((t) => {
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <SuperCheckbox
                isDone={t.isDone}
                callback={(checked) => onChangeTaskStatus(t.id, checked)}
              />
              <EditableSpan
                oldTitle={t.title}
                callback={(newTitle) => updateTaskHandler(t.id, newTitle)}
              />
              <IconButton
                aria-label="delete"
                onClick={() => props.removeTask(t.id, props.id)}
              >
                <DeleteIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          variant={filter === "all" ? "outlined" : "contained"}
          color="success"
          onClick={() => changeFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "contained"}
          color="error"
          onClick={() => changeFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "contained"}
          color="secondary"
          onClick={() => changeFilter("completed")}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
