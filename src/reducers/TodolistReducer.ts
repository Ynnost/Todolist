import { FilterValuesType, TodolistType } from "../App";
import { v1 } from "uuid";

export const TodolistReducer = (
  state: TodolistType[],
  action: TodolistReducerType
) => {
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
      console.log(newTodolist.id, "id Reducer");
      return [newTodolist, ...state];
    }
    case "UPDATE-TODOLIST-TITLE": {
      return state.map((el) =>
        el.id === action.payload.todolistID
          ? { ...el, title: action.payload.newtitle }
          : el
      );
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((el) =>
        el.id === action.payload.id
          ? { ...el, filter: action.payload.filter }
          : el
      );
    }

    default:
      return state;
  }
};

export type TodolistReducerType =
  | RemoveTodolistACType
  | AddTodolistAC
  | UpdateTodolistTitleAC
  | ChangeFilterAC;

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;

export const removeTodolistAC = (todolistID: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { todolistID },
  } as const;
};

type AddTodolistAC = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (newTitle: string, todolistID: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { newTitle, todolistID },
  } as const;
};

type UpdateTodolistTitleAC = ReturnType<typeof updateTodolistTitleAC>;
export const updateTodolistTitleAC = (todolistID: string, newtitle: string) => {
  return {
    type: "UPDATE-TODOLIST-TITLE",
    payload: { todolistID, newtitle },
  } as const;
};

type ChangeFilterAC = ReturnType<typeof changeFilter>;
export const changeFilter = (id: string, filter: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: { id, filter },
  } as const;
};
