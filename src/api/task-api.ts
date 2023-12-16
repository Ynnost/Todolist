import axios from "axios";
import { instance } from "./todolists-api";
import { title } from "process";

export type GetTasksResponseType = {
  error: string | null;
  totalCount: number;
  item: TaskType[];
};

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type UpdeteTaskModel = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

type ResponseType<D = {}> = {
  resultCode: 0;
  messages: [];
  data: D;
};

export const taskAPI = {
  getTask(todolistID: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`);
  },
  createTask(todolistID: string, title: string) {
    return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistID}/tasks`, { title });
  },
  deleteTask(todolistID: string, id: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${id}`);
  },
  updeteTask(todolistID: string, id: string, model: UpdeteTaskModel) {
    return instance.put<UpdeteTaskModel>(`todo-lists/${todolistID}/tasks/${id}`, model);
  },
};
