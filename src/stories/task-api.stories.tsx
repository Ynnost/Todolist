import React, { useEffect, useState } from "react";
import { todolistsAPI } from "../api/todolists-api";
import { taskAPI } from "../api/task-api";

const meta = {
  title: "TASK/API",
};
export default meta;

export const GetTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistID = "";
    taskAPI.getTask(todolistID).then((res) => {
      return setState(res.data.item);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistID = "";
    taskAPI.createTask(todolistID, "IV").then((res) => {
      return setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskID, setTaskID] = useState<string>("");
  const [todolistID, settodolistID] = useState<string>("");

  const eleteTask = () => {
    taskAPI.deleteTask(todolistID, taskID).then((res) => {
      return setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}{" "}
      <div>
        <input
          placeholder="todolistID"
          value={todolistID}
          onChange={(e) => {
            settodolistID(e.currentTarget.value);
          }}
        />
        <input
          placeholder="taskID"
          value={taskID}
          onChange={(e) => {
            setTaskID(e.currentTarget.value);
          }}
        />
        <button onClick={eleteTask}>Delete Task</button>
      </div>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistID = "";
    const taskID = "";
    taskAPI.updeteTask(todolistID, taskID, "V").then((res) => {
      return setState(res.data);
    });
  }, []);
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input />
        <input />
        <button></button>
      </div>
    </div>
  );
};
