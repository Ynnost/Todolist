import { combineReducers, legacy_createStore, AnyAction, applyMiddleware } from "redux";
import { TasksReducer } from "./reducers/TasksReducer";
import { TodolistReducer } from "./reducers/TodolistReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk, { ThunkDispatch } from "redux-thunk";

const rootReducer = combineReducers({
  tasks: TasksReducer,
  todolist: TodolistReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<ThunkDispatchType>();

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

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
