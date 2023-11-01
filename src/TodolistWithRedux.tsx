import { FilterValuesType, TaskType } from "./App";
import AddItemForm from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { SuperCheckbox } from "./components/SuperCheckbox";
import { TodolistType } from "./AppWithRedux";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import {
  addTaskAC,
  changeTaskStatusAC,
  removeTaskAC,
  updateTaskTitleAC,
} from "./state/TasksReducer";
import {
  changeFilterAC,
  removeTodolistAC,
  updateTodolistTitleAC,
} from "./state/TodolistReducer";

export type PropsType = {
  todolist: TodolistType;
};

export function TodolistWithRedux({ todolist }: PropsType) {
  const { id, title, filter } = todolist;

  const tasks = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[id]
  );

  const dispatch = useDispatch();

  // let [filter, setFilter] = useState<FilterValuesType>("all");

  const colanderFoo = () => {
    let tasksForTodolist = tasks;
    if (filter === "active") {
      tasksForTodolist = tasks.filter((t) => !t.isDone);
    }
    if (filter === "completed") {
      tasksForTodolist = tasks.filter((t) => t.isDone);
    }
    return tasksForTodolist;
  };

  const changeFilter = (value: FilterValuesType) => {
    dispatch(changeFilterAC(id, value));
  };

  const addTaskHandler = (title: string) => {
    // props.addTask(title, id);
    dispatch(addTaskAC(title, id));
  };

  const updateTodolistTitleHandler = (newTitle: string) => {
    dispatch(updateTodolistTitleAC(id, newTitle));
  };

  const updateTaskHandler = (taskID: string, newTitle: string) => {
    dispatch(updateTaskTitleAC(taskID, newTitle, id));
  };

  const removeTodolist = () => {
    dispatch(removeTodolistAC(id));
  };

  const onChangeTaskStatus = (taskID: string, checked: boolean) => {
    dispatch(changeTaskStatusAC(taskID, checked, id));
  };

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={title} callback={updateTodolistTitleHandler} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm callback={addTaskHandler} />
      <ul>
        {colanderFoo().map((t) => {
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <SuperCheckbox
                isDone={t.isDone}
                callback={(checked) => onChangeTaskStatus(t.id, checked)}
              />
              <EditableSpan
                oldTitle={t.title}
                callback={(newTitle) => updateTaskHandler(t.id, newTitle)}
              />
              <IconButton
                aria-label="delete"
                onClick={() => dispatch(removeTaskAC(t.id, id))}
              >
                <DeleteIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          variant={filter === "all" ? "outlined" : "contained"}
          color="success"
          onClick={() => changeFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "contained"}
          color="error"
          onClick={() => changeFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "contained"}
          color="secondary"
          onClick={() => changeFilter("completed")}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
