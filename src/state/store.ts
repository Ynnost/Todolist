import { combineReducers, legacy_createStore } from "redux";
import { TasksReducer } from "./reducers/TasksReducer";
import { TodolistReducer } from "./reducers/TodolistReducer";

const rootReducer = combineReducers({
  tasks: TasksReducer,
  todolist: TodolistReducer,
});

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;

// {
//    state:{
//       task:{}
//       todolist:[]
//    }
//    getState()
//    dispatch()
// }
