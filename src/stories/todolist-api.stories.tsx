import React, { useEffect, useState } from "react";
import { todolistsAPI } from "../api/todolists-api";

const meta = {
  title: "TODOLIST/API",
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
      return setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistID = "d75ce6f5-0603-4ad4-b2b8-cb2d3f92ad9f";
    todolistsAPI.deleteTodolist(todolistID).then((res) => {
      return setState(res.data);
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
