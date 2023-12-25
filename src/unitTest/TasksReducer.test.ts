import {} from "../App";
import { TaskPriorities, TaskStateType, TaskStatuses } from "../api";
import { TasksReducer, addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC } from "../state/reducers/TasksReducer";
import { addTodolistAC } from "../state/reducers/TodolistReducer";

let startState: TaskStateType;

beforeEach(() => {
  startState = {
    todolistID1: [
      {
        id: "1",
        title: "HTML&CSS",
        status: TaskStatuses.New,
        todoListId: 'todolistID1',
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
        status: TaskStatuses.New,
        todoListId: 'todolistID1',
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
        todoListId: 'todolistID1',
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
        status: TaskStatuses.New,
        todoListId: 'todolistID2',
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
        status: TaskStatuses.New,
        todoListId: 'todolistID2',
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
        todoListId: 'todolistID2',
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const action = removeTaskAC("2", "todolistID2");

  const endState = TasksReducer(startState, action);

  expect(endState).toEqual({
    todolistID1: [
      {
        id: "1",
        title: "HTML&CSS",
        status: TaskStatuses.New,
        todoListId: 'todolistID1',
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
        status: TaskStatuses.New,
        todoListId: 'todolistID1',
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
        todoListId: 'todolistID1',
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
        status: TaskStatuses.New,
        todoListId: 'todolistID2',
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
        todoListId: 'todolistID2',
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  });
});

test("correct task should be addes  correct array", () => {
  const action = addTaskAC("Juce", "todolistID2");

  const endState = TasksReducer(startState, action);

  expect(endState["todolistID1"].length).toBe(3);
  expect(endState["todolistID2"].length).toBe(4);
  expect(endState["todolistID2"][0].id).toBeDefined();
  expect(endState["todolistID2"][0].title).toBe("Juce");
  expect(endState["todolistID2"][0].status).toBe(TaskStatuses.New);
});

test("status of specified task shold be changed", () => {
  const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistID2");

  const endState = TasksReducer(startState, action);

  expect(endState["todolistID1"][1].status).toBe(TaskStatuses.Completed);
  expect(endState["todolistID2"][2].status).toBe(TaskStatuses.New);
});

test("title of specified task shold be changed", () => {
  const action = updateTaskTitleAC("2", "LOL", "todolistID2");

  const endState = TasksReducer(startState, action);

  expect(endState["todolistID1"][1].title).toBe("JS");
  expect(endState["todolistID2"][1].title).toBe("LOL");
});

test("new array shold be added when new todolist is added", () => {
  const action = addTodolistAC("new todolist");
  const endState = TasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistID1" && k !== "todolistID2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
