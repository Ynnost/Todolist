import {TodolistType } from "../App"
import { TaskStateType } from "../AppWithReducer";
import { TasksReducer } from "./TasksReducer";
import { TodolistReducer, addTodolistAC, removeTodolistAC } from "./TodolistReducer";


test('is should be equals', ()=>{

const startTaskState:TaskStateType={};
const startTodolistState:TodolistType[] = [];

const action = addTodolistAC('new todolist')

const endTaskState = TasksReducer(startTaskState, action)
const endTodolistState = TodolistReducer(startTodolistState,action)

 const keys = Object.keys(endTaskState);
 const idFromTask = keys[0]
 const idFromTodolist = endTodolistState[0].id


 expect(idFromTask).toBe(action.payload.todolistID);
 expect(idFromTodolist).toBe(action.payload.todolistID);

})

test("new array shold be added when new todolist is added", () => {
  const startState: TaskStateType = {
    'todolistID1': [
      { id: "1", title: "HTML&CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    'todolistID2': [
      { id: "1", title: "Milck", isDone: true },
      { id: "2", title: "Orange", isDone: true },
      { id: "3", title: "Apple", isDone: false },
    ],
  };

  const action = removeTodolistAC("todolistID2");
  const endState = TasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistID2']).not.toBeDefined()
});