import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    "API-KEY": "f52f21bd-7878-46cf-af08-0e516caa96d0",
  },
});

export type TodolistType = {
  id: string;
  title: string;
  addDate: string;
  order: number;
};

type CreateTodolistResponseType = {
  resultCode: 0;
  messages: [];
  data: {
    item: TodolistType;
  };
};

type DeleteTodoistType = { resultCode: 1; messages: ["Something wrong"]; data: {} };

type ResponseType<D> = {
  resultCode: 0;
  messages: [];
  data: D;
};

export const todolistsAPI = {
  getTodolists() {
    const promise = instance.get<TodolistType[]>("todo-lists");
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<CreateTodolistResponseType>("todo-lists", title);
    return promise;
  },
  deleteTodolist(id: string) {
    const promise = instance.delete<ResponseType<{}>>("todo-lists/" + id);
    return promise;
  },
  updeteTodolist(id: string, title: string) {
    const promise = instance.put<ResponseType<{}>>(`todo-lists/${id}`, title);
    return promise;
  },
};
