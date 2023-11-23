import { Reducer, useCallback, useReducer } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import ButtonAppBar from "./ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
import { addTodolistAC, removeTodolistAC, TodolistReducer, TodolistReducerType, updateTodolistTitleAC } from "./state/TodolistReducer";
import { TasksReducer, addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC } from "./state/TasksReducer";
import { AppRootStateType } from "./state/store";
import { useDispatch, useSelector } from "react-redux";
import { TodolistWithRedux } from "./TodolistWithRedux";
import { taskSelector, todolistSelector } from "./state/selectors";
import { AddItemForm } from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed" | "three";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskStateType = {
  [key: string]: TaskType[];
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function AppWithReducer() {
  let todolistS = useSelector(todolistSelector);
  let tasksObj = useSelector(taskSelector);

  const dispatch = useDispatch();

  const addTask = useCallback(
    (title: string, todolistID: string) => {
      dispatch(addTaskAC(title, todolistID));
    },
    [dispatch]
  );

  const removeTodolist = (todolistID: string) => {
    dispatch(removeTodolistAC(todolistID));
  };

  const removeTask = (id: string, todolistID: string) => {
    dispatch(removeTaskAC(id, todolistID));
  };

  const changeStatus = (taskId: string, isDone: boolean, todolistID: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistID));
  };

  const addTodolist = useCallback(
    (newTitle: string) => {
      dispatch(addTodolistAC(newTitle));
    },
    [dispatch]
  );

  const updateTask = (taskID: string, newTitle: string, todolistID: string) => {
    dispatch(updateTaskTitleAC(taskID, newTitle, todolistID));
  };

  const updateTodolistTitle = (todolistID: string, newtitle: string) => {
    dispatch(updateTodolistTitleAC(todolistID, newtitle));
  };

  return (
    <div className="App">
      <ButtonAppBar />
      <Container>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm callback={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolistS.map((el) => {
            return (
              <Grid key={el.id} item style={{ padding: "20px" }}>
                <Paper style={{ padding: "10px" }} elevation={10}>
                  <Todolist
                    key={el.id}
                    title={el.title}
                    tasks={tasksObj[el.id]}
                    id={el.id}
                    removeTodolist={removeTodolist}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeStatus}
                    updateTask={updateTask}
                    updateTodolistTitle={updateTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;
