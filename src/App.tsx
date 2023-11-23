import  { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import ButtonAppBar from "./ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
import { AddItemForm } from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed" | "three";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolistS, setTodolistS] = useState<Array<TodolistType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasksObj, setTasks] = useState<Record<string, TaskType[]>>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  const addTask = (title: string, todolistID: string) => {
    let task = { id: v1(), title: title, isDone: false };
    let todolistTasks = tasksObj[todolistID];
    tasksObj[todolistID] = [task, ...todolistTasks];
    setTasks({ ...tasksObj });
  };

  const removeTodolist = (todolistID: string) => {
    setTodolistS(todolistS.filter((el) => el.id !== todolistID));
    delete tasksObj[todolistID];
    console.log(tasksObj);
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
    const todolistID = v1();
    let newTodolist: TodolistType = {
      id: todolistID,
      title: newTitle,
      filter: "all",
    };

    setTodolistS([newTodolist, ...todolistS]);
    setTasks({ ...tasksObj, [todolistID]: [] });
  };

  const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
    setTasks({
      ...tasksObj,
      [todolistID]: tasksObj[todolistID].map((el) =>
        el.id === taskID ? { ...el, title: newTitle } : el
      ),
    });
  };

  const updateTodolistTitle = (todolistID: string, title: string) => {
    setTodolistS(
      todolistS.map((el) => (el.id === todolistID ? { ...el, title } : el))
    );
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
              <Grid item style={{ padding: "20px" }}>
                <Paper style={{ padding: "10px" }}>
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
