import { v1 } from "uuid";
import {  } from "../App";
import { AddTodolistAC, RemoveTodolistACType } from "./TodolistReducer";
import { TaskStateType } from "../AppWithReducer";

const initialState:TaskStateType={}

export const TasksReducer = (
  state: TaskStateType = initialState,
  action: TasksReducerType
) => {
  switch (action.type) {
    case "ADD-TASK": {
      let newTask = { id: v1(), title: action.payload.title, isDone: false };
      return {
        ...state,
        [action.payload.todolistID]: [
          newTask,
          ...state[action.payload.todolistID],
        ],
      };
    }
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].filter(
          (t) => t.id !== action.payload.id
        ),
      };
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map((t) =>
          t.id === action.payload.id
            ? { ...t, isDone: action.payload.isDone }
            : t
        ),
      };
    }

    case "UPDATE-TASK": {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map((t) =>
          t.id === action.payload.id ? { ...t, title: action.payload.title } : t
        ),
      };
    }

    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.payload.todolistID]: [],
      };
    }

    case "REMOVE-TODOLIST": {
      // let copyState = {...state}
      // delete copyState[action.payload.todolistID];
      // return copyState
      let {
        [action.payload.todolistID]: [],
        ...rest
      } = state;
      return rest;
    }

    default:
      return state;
  }
};

export type TasksReducerType =
  | AddTaskAC
  | RemoveTaskAC
  | ChangeTaskStatusAC
  | UpdateTaskTitleAC
  | AddTodolistAC
  | RemoveTodolistACType;

type AddTaskAC = ReturnType<typeof addTaskAC>;
export const addTaskAC = (title: string, todolistID: string) => {
  return {
    type: "ADD-TASK",
    payload: { title, todolistID },
  } as const;
};

type RemoveTaskAC = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (id: string, todolistID: string) => {
  return {
    type: "REMOVE-TASK",
    payload: { id, todolistID },
  } as const;
};

type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>;
export const changeTaskStatusAC = (
  id: string,
  isDone: boolean,
  todolistID: string
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: { id, isDone, todolistID },
  } as const;
};


type UpdateTaskTitleAC = ReturnType<typeof updateTaskTitleAC>;
export const updateTaskTitleAC = (id: string, title: string, todolistID: string) => {
  return {
    type: "UPDATE-TASK",
    payload: { id, title, todolistID },
  } as const;
};

