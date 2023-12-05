import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";
import { TodolistReducer, addTodolistAC, changeFilterAC, removeTodolistAC, updateTodolistTitleAC } from "../state/reducers/TodolistReducer";

let todolistID1: string;
let todolistID2: string;

let startState: TodolistType[];

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();

  startState = [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ];
});

test("correct todolist should be remove Todolist ", () => {
  const endState: TodolistType[] = TodolistReducer(startState, removeTodolistAC(todolistID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
});

test("correct todolist should be add new Todolist", () => {
  const newTodolistTitle = "New Todolist title";

  const endState: TodolistType[] = TodolistReducer(startState, addTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
});

test("correct todolist should be update title Todolist", () => {
  const uppdateTodolistTitle = "Todolist";

  const endState: TodolistType[] = TodolistReducer(startState, updateTodolistTitleAC(todolistID1, uppdateTodolistTitle));

  expect(endState[1].title).toBe("What to buy");
  expect(endState[0].title).toBe(uppdateTodolistTitle);
});

test("correct filter of Todolist shold be changet", () => {
  let newFilter: FilterValuesType = "completed";

  const endState: TodolistType[] = TodolistReducer(startState, changeFilterAC(todolistID1, newFilter));

  expect(endState[1].filter).toBe("all");
  expect(endState[0].filter).toBe("completed");
});
