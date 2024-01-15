import { useCallback, useEffect } from "react";
import { Todolist } from "../Todolist/Todolist";
import ButtonAppBar from "../ButtonAppBar";
import { Container, Grid, LinearProgress, Paper } from "@mui/material";
import { addTodolistTC, getTodolistsThunkTC, removeTodolistTC, updateTodolistTitleTC } from "../../state/reducers/TodolistReducer";
import { createTaskThunkTC, removeTaskThunkTC, updateTaskTC } from "../../state/reducers/TasksReducer";
import { taskSelector, todolistSelector } from "../../state/selectors";
import { AddItemForm } from "../AddItemForm";
import { TaskStatuses } from "../../api";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { RequestStatusType } from "../../state/reducers/appReducer";
import { CustomizedSnackbars } from "../EroorSnaccbar/ErrorSnackbar";

function AppWithRedux() {
  let todolistS = useAppSelector(todolistSelector);
  let tasks = useAppSelector(taskSelector);
  let status = useAppSelector<RequestStatusType>((state) => state.app.status);

  const dispatch = useAppDispatch();

  const addTask = useCallback(
    (todolistID: string, title: string) => {
      dispatch(createTaskThunkTC(todolistID, title));
    },
    [dispatch]
  );

  const removeTodolist = (todolistID: string) => {
    dispatch(removeTodolistTC(todolistID));
  };

  const removeTask = useCallback(
    (todolistID: string, id: string) => {
      dispatch(removeTaskThunkTC(todolistID, id));
    },
    [dispatch]
  );

  const changeStatus = (taskId: string, status: TaskStatuses, todolistID: string) => {
    dispatch(updateTaskTC(todolistID, taskId, { status }));
  };

  const addTodolist = useCallback(
    (newTitle: string) => {
      dispatch(addTodolistTC(newTitle));
    },
    [dispatch]
  );

  const updateTask = (taskId: string, title: string, todolistID: string) => {
    dispatch(updateTaskTC(todolistID, taskId, { title }));
  };

  const updateTodolistTitle = (todolistID: string, newtitle: string) => {
    dispatch(updateTodolistTitleTC(todolistID, newtitle));
  };

  useEffect(() => {
    dispatch(getTodolistsThunkTC());
  }, [dispatch]);

  return (
    <div className="App">
      <ButtonAppBar />
      {status === "loading" && <LinearProgress />}
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
                    entityStatus={el.entityStatus}
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
      <CustomizedSnackbars/>
    </div>
  );
}

export default AppWithRedux;
