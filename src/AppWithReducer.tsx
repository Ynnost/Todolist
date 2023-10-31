import { Reducer, useReducer, useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import AddItemForm from "./components/AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
import {
  addTodolistAC,
  removeTodolistAC,
  TodolistReducer,
  TodolistReducerType,
  updateTodolistTitleAC,
} from "./reducers/TodolistReducer";

export type FilterValuesType = "all" | "active" | "completed" | "three";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskStateType = {
  [key:string]:TaskType[]
}

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function AppWithReducer() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolistS, dispatchTodolistS] = useReducer<
    Reducer<TodolistType[], TodolistReducerType>
  >(TodolistReducer, [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasksObj, setTasks] = useState<Record<string, TaskType[]>>({
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
    let task = { id: v1(), title, isDone: false };
    let todolistTasks = tasksObj[todolistID];
    tasksObj[todolistID] = [task, ...todolistTasks];
    setTasks({ ...tasksObj });
  };

  const removeTodolist = (todolistID: string) => {
    dispatchTodolistS(removeTodolistAC(todolistID));
    delete tasksObj[todolistID];
  };

  const removeTask = (id: string, todolistID: string) => {
    let tasks = tasksObj[todolistID];
    tasksObj[todolistID] = tasks.filter((t) => t.id !== id);
    setTasks({ ...tasksObj });
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistID: string
  ) => {
    let tasks = tasksObj[todolistID];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  };

  const addTodolist = (newTitle: string) => {
    // const todolistID = v1();
    dispatchTodolistS(addTodolistAC(newTitle));
    setTasks({ ...tasksObj, [todolistID]: [] });
    // console.log(todolistID, "id APP");
  };

  const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
    setTasks({
      ...tasksObj,
      [todolistID]: tasksObj[todolistID].map((el) =>
        el.id === taskID ? { ...el, title: newTitle } : el
      ),
    });
  };

  const updateTodolistTitle = (todolistID: string, newtitle: string) => {
    dispatchTodolistS(updateTodolistTitleAC(todolistID, newtitle));
  };

  console.log(todolistS);
  return (
    <div className="App">
      <ButtonAppBar />
      <Container>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm callback={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolistS.map((el) => {
            console.log(el);
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

export default App;
