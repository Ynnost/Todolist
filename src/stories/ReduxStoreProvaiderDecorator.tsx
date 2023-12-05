import { Provider } from "react-redux";
import { AppRootStateType, store } from "../state/store";
import { TasksReducer } from "../state/reducers/TasksReducer";
import { TodolistReducer } from "../state/reducers/TodolistReducer";
import { v1 } from "uuid";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  tasks: TasksReducer,
  todolist: TodolistReducer,
});

const initialGlobalState = {
  todolist: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to buy", filter: "all" },
  ],
  tasks: {
    ["todolistId1"]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
    ["todolistId2"]: [
      { id: v1(), title: "Milc", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
    ],
  },
};

export const storyBooksStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProvaiderDecorator = (story: any) => {
  return <Provider store={storyBooksStore}>{story()}</Provider>;
};
