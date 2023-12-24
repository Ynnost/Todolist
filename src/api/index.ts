import { TodolistType } from "./todolists-api";
export type { GetTasksResponseType, TaskType, TaskStateType } from "./task-api";
export type { TodolistType } from "./todolists-api";
export { TaskStatuses, TaskPriorities } from "./task-api";

export type FilterValuesType = "all" | "active" | "completed" | "three";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};
