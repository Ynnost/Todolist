import { TodolistType } from "../../components/WithRedux/AppWithRedux";
import { AppRootStateType } from "../store";

export const todolistSelector = (state: AppRootStateType): TodolistType[] => state.todolist;
