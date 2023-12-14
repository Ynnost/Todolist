import axios from "axios";
import { instance } from "./todolists-api";

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

type UpdeyeTaskModel = {
  description: string;
  title: string;
  completed: boolean;
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
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/task`);
  },
  createTask(todolistID:string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistID}/`, title);
  },
  deleteTask(todolistID: string, id: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/task/${id}`);
  },
  updeteTask(todolistID: string, id: string, title: string) {
    return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistID}/task/${id}`, title);
  },
};
