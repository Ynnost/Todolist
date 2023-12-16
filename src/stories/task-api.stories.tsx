import React, { useEffect, useState } from "react";
import { taskAPI } from "../api/task-api";
import { number } from "prop-types";

const meta = {
  title: "TODOLIST/API_TASK",
};
export default meta;

export const GetTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistID, setTodolistID] = useState<string>("");

  const getTasks = () => {
    taskAPI.getTask(todolistID).then((res) => {
      return setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder="todolistID"
          value={todolistID}
          onChange={(e) => {
            setTodolistID(e.currentTarget.value);
          }}
        />
        <button onClick={getTasks}>Get Task</button>
      </div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistID, setTodolistID] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");

  const createTask = () => {
    taskAPI.createTask(todolistID, taskTitle).then((res) => {
      setTaskTitle("");
      return setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder="todolistID"
          value={todolistID}
          onChange={(e) => {
            setTodolistID(e.currentTarget.value);
          }}
        />
        <input
          placeholder="task"
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
        />
        <button onClick={createTask}>Create Task</button>
      </div>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskID, setTaskID] = useState<string>("");
  const [todolistID, settodolistID] = useState<string>("");

  const deleteTask = () => {
    taskAPI.deleteTask(todolistID, taskID).then((res) => {
      return setState(res.data.messages);
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
        <button onClick={deleteTask}>Delete Task</button>
      </div>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskID, setTaskID] = useState<string>("");
  const [todolistID, setTodolistID] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const updeteTask = () => {
    taskAPI
      .updeteTask(todolistID, taskID, {
        description: description,
        title: title,
        status: status,
        priority: priority,
        startDate: "",
        deadline: "",
      })
      .then((res) => {
        setTitle("");
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
            setTodolistID(e.currentTarget.value);
          }}
        />
        <input
          placeholder="taskID"
          value={taskID}
          onChange={(e) => {
            setTaskID(e.currentTarget.value);
          }}
        />
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />
        <input
          placeholder="Status"
          value={status}
          type="number"
          onChange={(e) => {
            setStatus(+e.currentTarget.value);
          }}
        />
        <input
          placeholder="Priority"
          value={priority}
          type="number"
          onChange={(e) => {
            setPriority(+e.currentTarget.value);
          }}
        />
        <input
          placeholder="StartDate"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.currentTarget.value);
          }}
        />
        <input
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => {
            setDeadline(e.currentTarget.value);
          }}
        />
        <button onClick={updeteTask}>updeteTask</button>
      </div>
    </div>
  );
};
