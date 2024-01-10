import { EditableSpan } from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../state/store";
import { createTaskThunkTC, getTasksThunkTC } from "../../state/reducers/TasksReducer";
import { changeFilterAC, removeTodolistTC, updateTodolistTitleTC } from "../../state/reducers/TodolistReducer";
import { AddItemForm } from "../AddItemForm";
import { useCallback, useEffect } from "react";
import { TaskWithRedux } from "./TaskWithRedux";
import { FilterValuesType, TaskStatuses, TaskType, TodolistDomainType } from "../../api";

export type PropsType = {
  todolist: TodolistDomainType;
};

export function TodolistWithRedux({ todolist }: PropsType) {
  const { id, title, filter } = todolist;

  const dispatch = useAppDispatch();

  const tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[id]);

  useEffect(() => {
    dispatch(getTasksThunkTC(id));
  }, [dispatch, id]);

  const changeFilter = (value: FilterValuesType) => {
    dispatch(changeFilterAC(id, value));
  };

  const addTaskHandler = useCallback(
    (title: string) => {
      dispatch(createTaskThunkTC(id, title));
    },
    [dispatch, id]
  );

  const updateTodolistTitleHandler = (newTitle: string) => {
    dispatch(updateTodolistTitleTC(id, newTitle));
  };

  const removeTodolist = () => {
    dispatch(removeTodolistTC(id));
  };

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }

  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={title} onChange={updateTodolistTitleHandler} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} />
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
