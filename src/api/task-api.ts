import { instance } from "./todolists-api";

export type GetTasksResponseType = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export enum TaskStatuses {
  New = 0, // new task
  InProgress = 1,
  Completed = 2, // complet task
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0, // started
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type TaskStateType = {
  [key: string]: TaskType[];
};

export type UpdeteTaskModel = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

type ResponseType<D = {}> = {
  resultCode: 0;
  messages: string[];
  data: D;
};

export const taskAPI = {
  getTask(todolistID: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`);
  },
  createTask(todolistID: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistID}/tasks`, { title });
  },
  deleteTask(todolistID: string, id: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${id}`);
  },
  updeteTask(todolistID: string, id: string, model: UpdeteTaskModel) {
    return instance.put<UpdeteTaskModel>(`todo-lists/${todolistID}/tasks/${id}`, model);
  },
};
