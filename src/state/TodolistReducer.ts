import { FilterValuesType, TodolistType } from "../App";
import { v1 } from "uuid";

const initialState: TodolistType[] = [];

export const TodolistReducer = (state: TodolistType[] = initialState, action: TodolistReducerType) => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.payload.todolistID);
    }
    case "ADD-TODOLIST": {
      let newTodolist: TodolistType = {
        id: action.payload.todolistID,
        title: action.payload.newTitle,
        filter: "all",
      };

      return [newTodolist, ...state];
    }
    case "UPDATE-TODOLIST-TITLE": {
      return state.map((el) => (el.id === action.payload.todolistID ? { ...el, title: action.payload.newtitle } : el));
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((el) => (el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el));
    }

    default:
      return state;
  }
};

export type TodolistReducerType = RemoveTodolistACType | AddTodolistAC | UpdateTodolistTitleAC | ChangeFilterAC;

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;

export const removeTodolistAC = (todolistID: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { todolistID },
  } as const;
};

export type AddTodolistAC = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (newTitle: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { newTitle, todolistID: v1() },
  } as const;
};

export type UpdateTodolistTitleAC = ReturnType<typeof updateTodolistTitleAC>;
export const updateTodolistTitleAC = (todolistID: string, newtitle: string) => {
  return {
    type: "UPDATE-TODOLIST-TITLE",
    payload: { todolistID, newtitle },
  } as const;
};

export type ChangeFilterAC = ReturnType<typeof changeFilterAC>;
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: { id, filter },
  } as const;
};
