import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    "API-KEY": "19a20be4-376b-428b-8e2c-afca32450dd7",
  },
});

export type TodolistType = {
  id: string;
  title: string;
  addDate: string;
  order: number;
};

type ResponseType<Type = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: string[];
  data: Type;
};

export const todolistsAPI = {
  getTodolists() {
    const promise = instance.get<TodolistType[]>("todo-lists");
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title });
    return promise;
  },
  deleteTodolist(id: string) {
    const promise = instance.delete<ResponseType>(`todo-lists/${id}`);
    return promise;
  },
  updeteTodolist(id: string, title: string) {
    const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title});
    return promise;
  },
};
