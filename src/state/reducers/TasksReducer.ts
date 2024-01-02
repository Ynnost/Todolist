import {} from "../../App";
import { AddTodolistAC, GetTodolistAC, RemoveTodolistACType } from "./TodolistReducer";
import { TaskStateType, TaskStatuses, TaskType } from "../../api";
import { UpdeteTaskModel, taskAPI } from "../../api/task-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "../store";

const initialState: TaskStateType = {};

export const TasksReducer = (state: TaskStateType = initialState, action: TasksReducerType): TaskStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      console.log(action.payload.tasks);
      return { ...state, [action.payload.todoListId]: action.payload.tasks };
    }
    case "SET-TODOLIST": {
      let stateCopy = { ...state };
      action.payload.todolists.forEach((td) => {
        stateCopy[td.id] = [];
      });
      return stateCopy;
    }
    case "ADD-TASK": {
      return { ...state, [action.payload.todolistID]: [action.payload.task, ...state[action.payload.todolistID]] };
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
  | GetTodolistAC
  | SetTasksAC;

type AddTaskAC = ReturnType<typeof addTaskAC>;
type RemoveTaskAC = ReturnType<typeof removeTaskAC>;
type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>;
type UpdateTaskTitleAC = ReturnType<typeof updateTaskTitleAC>;
type SetTasksAC = ReturnType<typeof setTasksAC>;

export const addTaskAC = (todolistID: string, task: TaskType) => {
  return {
    type: "ADD-TASK",
    payload: { task, todolistID },
  } as const;
};

export const removeTaskAC = (todolistID: string, id: string) => {
  return {
    type: "REMOVE-TASK",
    payload: { todolistID, id },
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

export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
  return {
    type: "SET-TASKS",
    payload: { todoListId, tasks },
  } as const;
};

export const getTasksThunkTC = (todoListId: string) => (dispatch: Dispatch) => {
  taskAPI.getTask(todoListId).then((res) => {
    dispatch(setTasksAC(todoListId, res.data.items));
    console.log(res.data.items);
  });
};

export const removeTaskThunkTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  taskAPI.deleteTask(todolistId, taskId).then((res) => {
    dispatch(removeTaskAC(todolistId, taskId));
  });
};

export const createTaskThunkTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  taskAPI.createTask(todolistId, title).then((res) => {
    dispatch(addTaskAC(todolistId, res.data.data.item));
  });
};

export const updateTaskStatusTC =
  (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find((task) => task.id === taskId);

    if (task) {
      const model: UpdeteTaskModel = {
        title: task.title,
        description: task.description,
        status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
      };

      taskAPI.updeteTask(todolistId, taskId, model).then((res) => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId));
      });
    }
  };
