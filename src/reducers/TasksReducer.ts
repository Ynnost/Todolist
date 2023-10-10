import { v1 } from "uuid";
import { TaskType, TodolistType } from "../App";

export const TasksReducer = (state: TaskType[], action: TasksReducerType) => {
   switch (action.type) {
     case "ADD-TASK": {
       let newTask:TaskType = { id: v1(), title:action.payload.title, isDone: false };
       return [newTask,...state]
     }
     default:
       return state;
   }
};

export type TasksReducerType = AddTaskAC;

type AddTaskAC = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistID: string) => {
  return {
    type: "ADD-TASK",
    payload: { title, todolistID },
  } as const;
};


// const addTask = (title: string, todolistID: string) => {
//   let newTask = { id: v1(), title, isDone: false };
//   let todolistTasks = tasksObj[todolistID];
//   tasksObj[todolistID] = [task, ...todolistTasks];
//   setTasks({ ...tasksObj });
// };