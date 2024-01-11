import { FilterValuesType, TodolistDomainType, TodolistType } from "../../api";
import { Dispatch } from "redux";
import { todolistsAPI } from "../../api/todolists-api";
import { SetStatusACType, setStatusAC } from "./appReducer";

const initialState: TodolistDomainType[] = [];

export const TodolistReducer = (state: TodolistDomainType[] = initialState, action: TodolistReducerType) => {
  switch (action.type) {
    case "SET-TODOLIST": {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }));
    }
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.payload.todolistID);
    }
    case "ADD-TODOLIST": {
      const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all" };
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

export type TodolistReducerType =
  | RemoveTodolistACType
  | AddTodolistAC
  | UpdateTodolistTitleAC
  | ChangeFilterAC
  | GetTodolistAC
  | SetStatusACType;

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAC = ReturnType<typeof addTodolistAC>;
export type UpdateTodolistTitleAC = ReturnType<typeof updateTodolistTitleAC>;
export type ChangeFilterAC = ReturnType<typeof changeFilterAC>;
export type GetTodolistAC = ReturnType<typeof getTodolistAC>;

export const removeTodolistAC = (todolistID: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { todolistID },
  } as const;
};

export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: "ADD-TODOLIST",
    payload: { todolist },
  } as const;
};

export const updateTodolistTitleAC = (todolistID: string, newtitle: string) => {
  return {
    type: "UPDATE-TODOLIST-TITLE",
    payload: { todolistID, newtitle },
  } as const;
};

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: { id, filter },
  } as const;
};

export const getTodolistAC = (todolists: TodolistType[]) => {
  return {
    type: "SET-TODOLIST",
    payload: { todolists },
  } as const;
};

// export const getTodolistsThunk = (dispatch:Dispatch) => {
//   todolistsAPI.getTodolists().then((res)=>{
//       dispatch(getTodolistAC(res.data))
//     })
// }

// Функция вызывается в Middleware

export const getTodolistsThunkTC = () => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  todolistsAPI.getTodolists().then((res) => {
    dispatch(getTodolistAC(res.data));
    dispatch(setStatusAC("succeeded"));
  });
};

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  todolistsAPI.deleteTodolist(todolistId).then((res) => {
    dispatch(removeTodolistAC(todolistId));
    dispatch(setStatusAC("succeeded"));
  });
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  todolistsAPI.createTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item));
    dispatch(setStatusAC("succeeded"));
  });
};

export const updateTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  todolistsAPI.updeteTodolist(todoListId, title).then((res) => {
    dispatch(updateTodolistTitleAC(todoListId, title));
    dispatch(setStatusAC("succeeded"));
  });
};
