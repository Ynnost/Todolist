import { useState } from "react";
import { Todolist } from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import ButtonAppBar from "./components/ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
import { AddItemForm } from "./components/AddItemForm";
import { TaskPriorities, TaskStateType, TaskStatuses, TodolistDomainType } from "./api";

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolistS, setTodolistS] = useState<Array<TodolistDomainType>>([
    { id: todolistID1, title: "What to learn", filter: "all", addDate: "", order: 0 },
    { id: todolistID2, title: "What to buy", filter: "all", addDate: "", order: 0 },
  ]);

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistID1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        todoListId: todolistID1,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: todolistID1,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    [todolistID2]: [
      {
        id: v1(),
        title: "Хлеб",
        status: TaskStatuses.Completed,
        todoListId: todolistID2,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "Молоко",
        status: TaskStatuses.Completed,
        todoListId: todolistID2,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  });

  const addTask = (title: string, todolistID: string) => {
    let task = {
      id: v1(),
      title: title,
      status: TaskStatuses.Completed,
      todoListId: todolistID1,
      description: "",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
    };
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

  const changeStatus = (taskId: string, status: TaskStatuses, todolistID: string) => {
    let tasks = tasksObj[todolistID];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = status;
      setTasks({ ...tasksObj });
    }
  };

  const addTodolist = (newTitle: string) => {
    const todolistID = v1();
    let newTodolist: TodolistDomainType = {
      id: todolistID,
      title: newTitle,
      filter: "all",
      addDate: "",
      order: 0,
    };

    setTodolistS([newTodolist, ...todolistS]);
    setTasks({ ...tasksObj, [todolistID]: [] });
  };

  const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
    setTasks({
      ...tasksObj,
      [todolistID]: tasksObj[todolistID].map((el) => (el.id === taskID ? { ...el, title: newTitle } : el)),
    });
  };

  const updateTodolistTitle = (todolistID: string, title: string) => {
    setTodolistS(todolistS.map((el) => (el.id === todolistID ? { ...el, title } : el)));
  };

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
