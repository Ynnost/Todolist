import { v1 } from "uuid";
import {} from "../../App";
import { AddTodolistAC, GetTodolistAC, RemoveTodolistACType } from "./TodolistReducer";
import { TaskPriorities, TaskStateType, TaskStatuses, TaskType } from "../../api";


const initialState: TaskStateType = {};

export const TasksReducer = (state: TaskStateType = initialState, action: TasksReducerType): TaskStateType => {
  switch (action.type) {
    case "SET-TODOLIST": {
      let stateCopy = {...state}
      action.payload.todolists.forEach((td)=>{
        stateCopy[td.id] = []
      })
      return stateCopy;
    }
    case "ADD-TASK": {
      let newTask: TaskType = {
        id: v1(),
        title: action.payload.title,
        status: TaskStatuses.New,
        todoListId: action.payload.todolistID,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      };
      return {
        ...state,
        [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]],
      };
    }
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].filter((t) => t.id !== action.payload.id),
      };
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map((t) =>
          t.id === action.payload.id ? { ...t, status: action.payload.status } : t
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
      let {
        // eslint-disable-next-line no-empty-pattern
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
  | RemoveTodolistACType
  | GetTodolistAC;

type AddTaskAC = ReturnType<typeof addTaskAC>;
type RemoveTaskAC = ReturnType<typeof removeTaskAC>;
type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>;
type UpdateTaskTitleAC = ReturnType<typeof updateTaskTitleAC>;

export const addTaskAC = (title: string, todolistID: string) => {
  return {
    type: "ADD-TASK",
    payload: { title, todolistID },
  } as const;
};

export const removeTaskAC = (id: string, todolistID: string) => {
  return {
    type: "REMOVE-TASK",
    payload: { id, todolistID },
  } as const;
};

export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistID: string) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: { id, status, todolistID },
  } as const;
};

export const updateTaskTitleAC = (id: string, title: string, todolistID: string) => {
  return {
    type: "UPDATE-TASK",
    payload: { id, title, todolistID },
  } as const;
};
