import { TodolistType } from "../../AppWithRedux";
import { AppRootStateType } from "../store";

export const todolistSelector = (state: AppRootStateType): TodolistType []=> state.todolist