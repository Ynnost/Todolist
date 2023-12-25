import { TaskStateType } from "../../api";
import { AppRootStateType } from "../store";

export const taskSelector = (state: AppRootStateType): TaskStateType => state.tasks;
