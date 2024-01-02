import { useCallback, useEffect } from "react";
import { Todolist } from "../Todolist/Todolist";
import ButtonAppBar from "../ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
import { addTodolistAC, getTodolistsThunkTC, removeTodolistAC, updateTodolistTitleAC } from "../../state/reducers/TodolistReducer";
import {
  createTaskThunkTC,
  removeTaskThunkTC,
  updateTaskStatusTC,
  updateTaskTitleAC,
} from "../../state/reducers/TasksReducer";
import { taskSelector, todolistSelector } from "../../state/selectors";
import { AddItemForm } from "../AddItemForm";
import { TaskStatuses } from "../../api";
import { useAppDispatch, useAppSelector } from "../../state/store";

function AppWithRedux() {
  let todolistS = useAppSelector(todolistSelector);
  let tasks = useAppSelector(taskSelector);

  const dispatch = useAppDispatch();

  const addTask = useCallback(
    (todolistID: string, title: string) => {
      dispatch(createTaskThunkTC(todolistID, title));
    },
    [dispatch]
  );

  const removeTodolist = (todolistID: string) => {
    dispatch(removeTodolistAC(todolistID));
  };

  const removeTask = useCallback(
    (todolistID: string, id: string) => {
      dispatch(removeTaskThunkTC(todolistID, id));
    },
    [dispatch]
  );

  const changeStatus = (taskId: string, status: TaskStatuses, todolistID: string) => {
    dispatch(updateTaskStatusTC(todolistID, taskId, status));
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

  useEffect(() => {
    dispatch(getTodolistsThunkTC());
  }, [dispatch]);

  return (
    <div className="App">
      <ButtonAppBar />
      <Container>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolistS.map((el) => {
            return (
              <Grid key={el.id} item style={{ padding: "20px" }}>
                <Paper style={{ padding: "10px" }} elevation={10}>
                  <Todolist
                    key={el.id}
                    title={el.title}
                    tasks={tasks[el.id]}
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

export default AppWithRedux;
