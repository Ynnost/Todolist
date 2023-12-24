import React, { useEffect, useState } from "react";
import { todolistsAPI } from "../api/todolists-api";

const meta = {
  title: "TODOLIST/API_TODOLIST",
};
export default meta;

export const GetTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistsAPI.getTodolists().then((res) => {
      return setState(res.data);
    });
    //здесь мы будем делать запрос и ответ закидывть в state
    //который в виде строки будет отображаться в div
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistsAPI.createTodolist("I").then((res) => {
      return setState(res.data.data.item);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistID = "ca6849db-eb11-4080-b7f3-67bb529f8e9b";
    todolistsAPI.deleteTodolist(todolistID).then((res) => {
      return setState(res.data.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistID = "d4aacad1-50ed-42e0-9e18-6effc8364f20";
    todolistsAPI.updeteTodolist(todolistID, "II").then((res) => {
      return setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
