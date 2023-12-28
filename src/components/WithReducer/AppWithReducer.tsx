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
import { TaskPriorities, TaskStatuses, TodolistDomainType } from "../../api";



function AppWithReducer() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolistS, dispatchTodolistS] = useReducer<Reducer<TodolistDomainType[], TodolistReducerType>>(TodolistReducer, [
    { id: todolistID1, title: "What to learn", addDate: "", order: 0, filter: "all" },
    { id: todolistID2, title: "What to buy", addDate: "", order: 0, filter: "all" },
  ]);

  let [tasksObj, dispatchTasks] = useReducer(TasksReducer, {
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
        title: "Milck",
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
        title: "Orange",
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

  const changeStatus = (taskId: string, status: TaskStatuses, todolistID: string) => {
    dispatchTasks(changeTaskStatusAC(taskId, status, todolistID));
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
