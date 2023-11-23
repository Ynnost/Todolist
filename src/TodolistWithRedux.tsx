import { FilterValuesType, TaskType } from "./App";

import { EditableSpan } from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { SuperCheckbox } from "./components/SuperCheckbox";
import { TodolistType } from "./AppWithRedux";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC } from "./state/TasksReducer";
import { changeFilterAC, removeTodolistAC, updateTodolistTitleAC } from "./state/TodolistReducer";
import { AddItemForm } from "./components/AddItemForm";
import { useCallback } from "react";
import { TaskWithRedux } from "./TaskWithRedux";

export type PropsType = {
  todolist: TodolistType;
};

export function TodolistWithRedux({ todolist }: PropsType) {
  const { id, title, filter } = todolist;

  const tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[id]);

  const dispatch = useDispatch();

  const changeFilter = (value: FilterValuesType) => {
    dispatch(changeFilterAC(id, value));
  };

  const addTaskHandler = useCallback(
    (title: string) => {
      dispatch(addTaskAC(title, id));
    },
    [dispatch]
  );

  const updateTodolistTitleHandler = (newTitle: string) => {
    dispatch(updateTodolistTitleAC(id, newTitle));
  };

  const removeTodolist = () => {
    dispatch(removeTodolistAC(id));
  };

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => !t.isDone);
  }

  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone);
  }

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={title} onChange={updateTodolistTitleHandler} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm callback={addTaskHandler} />
      <ul>
        {tasksForTodolist.map((t) => {
          return <TaskWithRedux key={t.id} task={t} todolistID={id} />;
        })}
      </ul>
      <div>
        <Button variant={filter === "all" ? "outlined" : "contained"} color="success" onClick={() => changeFilter("all")}>
          All
        </Button>
        <Button variant={filter === "active" ? "outlined" : "contained"} color="error" onClick={() => changeFilter("active")}>
          Active
        </Button>
        <Button variant={filter === "completed" ? "outlined" : "contained"} color="secondary" onClick={() => changeFilter("completed")}>
          Completed
        </Button>
      </div>
    </div>
  );
}
