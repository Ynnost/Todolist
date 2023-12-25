import { TodolistDomainType } from "../../api";
import { AppRootStateType } from "../store";

export const todolistSelector = (state: AppRootStateType): TodolistDomainType[] => state.todolist;
