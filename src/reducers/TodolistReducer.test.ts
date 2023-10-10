import { v1 } from "uuid";
import { TodolistType } from "../App";
import {
  TodolistReducer,
  addTodolistAC,
  removeTodolistAC,
  updateTodolistTitleAC,
} from "./TodolistReducer";

let todolistID1 = v1();
let todolistID2 = v1();

const startState: TodolistType[] = [
  { id: todolistID1, title: "What to learn", filter: "all" },
  { id: todolistID2, title: "What to buy", filter: "all" },
];

test("correct todolist should be removed", () => {
  const endStateRemove: TodolistType[] = TodolistReducer(
    startState,
    removeTodolistAC(todolistID1)
  );

  expect(endStateRemove.length).toBe(1);
  expect(endStateRemove[0].id).toBe(todolistID2);
});

test("correct todolist should be add Todolist", () => {
  const newTodolistTitle = "New Todolist title";
  const newTodolistID = v1();

  const endStateAdd: TodolistType[] = TodolistReducer(
    startState,
    addTodolistAC(newTodolistTitle, newTodolistID)
  );

  expect(endStateAdd.length).toBe(3);
  expect(endStateAdd[0].title).toBe(newTodolistTitle);
});

test("correct todolist should be update Todolist", () => {
  const uppdateTodolistTitle = "Todolist";

  const endStateUpdate: TodolistType[] = TodolistReducer(
    startState,
    updateTodolistTitleAC(todolistID1, uppdateTodolistTitle)
  );

  expect(endStateUpdate.length).toBe(2);
  expect(endStateUpdate[0].title).toBe(uppdateTodolistTitle);
});
