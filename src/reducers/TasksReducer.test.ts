import { TaskStateType } from "../App";
import {
  TasksReducer,
  addTaskAC,
  changeTaskStatusAC,
  removeTaskAC,
  updateTaskTitleAC,
} from "./TasksReducer";
import { addTodolistAC } from "./TodolistReducer";

let startState: TaskStateType;

beforeEach(() => {
  startState = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "Milck", isDone: true },
      { id: "2", title: "Orange", isDone: true },
      { id: "3", title: "Apple", isDone: false },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const action = removeTaskAC("2", "todolistID2");

  const endState = TasksReducer(startState, action);

  expect(endState).toEqual({
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "Milck", isDone: true },
      { id: "3", title: "Apple", isDone: false },
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
  expect(endState["todolistID2"][0].isDone).toBe(false);
});

test("status of specified task shold be changed", () => {
  const action = changeTaskStatusAC("2", false, "todolistID2");

  const endState = TasksReducer(startState, action);

  expect(endState["todolistID1"][1].isDone).toBe(true);
  expect(endState["todolistID2"][2].isDone).toBe(false);
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
  const newKey = keys.find((k) => k != "todolistID1" && k != "todolistID2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});