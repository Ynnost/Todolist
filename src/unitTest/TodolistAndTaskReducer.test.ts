
import { TaskPriorities, TaskStateType, TaskStatuses, TodolistDomainType } from "../api";
import { TasksReducer } from "../state/reducers/TasksReducer";
import { TodolistReducer, addTodolistAC, removeTodolistAC } from "../state/reducers/TodolistReducer";

test("is should be equals", () => {
  const startTaskState: TaskStateType = {};
  const startTodolistState: TodolistDomainType[] = [];

  const action = addTodolistAC("new todolist");

  const endTaskState = TasksReducer(startTaskState, action);
  const endTodolistState = TodolistReducer(startTodolistState, action);

  const keys = Object.keys(endTaskState);
  const idFromTask = keys[0];
  const idFromTodolist = endTodolistState[0].id;

  expect(idFromTask).toBe(action.payload.todolistID);
  expect(idFromTodolist).toBe(action.payload.todolistID);
});

test("new array shold be added when new todolist is added", () => {
  const startState: TaskStateType = {
    todolistID1: [
      {
        id: "1",
        title: "HTML&CSS",
        status: TaskStatuses.New,
        todoListId: "todolistID2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistID2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistID2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todolistID2: [
      {
        id: "1",
        title: "Milck",
        status: TaskStatuses.Completed,
        todoListId: "todolistID2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "Orange",
        status: TaskStatuses.Completed,
        todoListId: "todolistID2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "Apple",
        status: TaskStatuses.New,
        todoListId: "todolistID2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  };

  const action = removeTodolistAC("todolistID2");
  const endState = TasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistID2"]).not.toBeDefined();
});
