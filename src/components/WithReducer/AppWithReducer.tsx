import { Reducer, useReducer } from "react";
import { Todolist } from "../Todolist/Todolist";
import { v1 } from "uuid";
import ButtonAppBar from "../ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
import {
  addTodolistAC,
  removeTodolistAC,
  TodolistReducer,
  TodolistReducerType,
  updateTodolistTitleAC,
} from "../../state/reducers/TodolistReducer";
import { TasksReducer, addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC } from "../../state/reducers/TasksReducer";
import { AddItemForm } from "../AddItemForm";

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
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolistS, dispatchTodolistS] = useReducer<Reducer<TodolistType[], TodolistReducerType>>(TodolistReducer, [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasksObj, dispatchTasks] = useReducer(TasksReducer, {
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: false },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Milck", isDone: true },
      { id: v1(), title: "Orange", isDone: true },
      { id: v1(), title: "Apple", isDone: false },
    ],
  });

  const addTask = (title: string, todolistID: string) => {
    dispatchTasks(addTaskAC(title, todolistID));
  };

  const removeTodolist = (todolistID: string) => {
    let action = removeTodolistAC(todolistID);
    dispatchTodolistS(action);
    dispatchTasks(action);
  };

  const removeTask = (id: string, todolistID: string) => {
    dispatchTasks(removeTaskAC(id, todolistID));
  };

  const changeStatus = (taskId: string, isDone: boolean, todolistID: string) => {
    dispatchTasks(changeTaskStatusAC(taskId, isDone, todolistID));
  };

  const addTodolist = (newTitle: string) => {
    let action = addTodolistAC(newTitle);
    dispatchTodolistS(action);
    dispatchTasks(action);
    console.log(todolistS);
    // console.log(tasksObj);
  };

  const updateTask = (taskID: string, newTitle: string, todolistID: string) => {
    console.log(taskID, "--------", newTitle, "-------", todolistID);
    dispatchTasks(updateTaskTitleAC(taskID, newTitle, todolistID));
  };

  const updateTodolistTitle = (todolistID: string, newtitle: string) => {
    dispatchTodolistS(updateTodolistTitleAC(todolistID, newtitle));
  };

  // console.log(todolistS);
  return (
    <div className="App">
      <ButtonAppBar />
      <Container>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolistS.map((el) => {
            // console.log(el);
            return (
              <Grid item style={{ padding: "20px" }}>
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
