import { Provider } from "react-redux";
import { AppRootStateType } from "../state/store";
import { TasksReducer } from "../state/reducers/TasksReducer";
import { TodolistReducer } from "../state/reducers/TodolistReducer";
import { v1 } from "uuid";
import { createStore, combineReducers } from "redux";
import { TaskPriorities, TaskStatuses } from "../api";
import { appReducer } from "../state/reducers/appReducer";

const rootReducer = combineReducers({
  tasks: TasksReducer,
  todolist: TodolistReducer,
  app: appReducer,
});

const initialGlobalState = {
  todolist: [
    { id: "todolistId1", title: "What to learn", filter: "all", addDate: "", order: 0, entityStatus: "idle" },
    { id: "todolistId2", title: "What to buy", filter: "all", addDate: "", order: 0, entityStatus: "idle" },
  ],
  tasks: {
    todolistId1: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todolistId2: [
      {
        id: v1(),
        title: "Milc",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "React Book",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  },
  app: {
    status: "loading",
    error: null,
  },
};

export const storyBooksStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProvaiderDecorator = (story: any) => {
  return <Provider store={storyBooksStore}>{story()}</Provider>;
};
