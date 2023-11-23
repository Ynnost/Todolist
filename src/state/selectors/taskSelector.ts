import { TaskStateType } from "../../AppWithRedux";
import { AppRootStateType } from "../store";

export const taskSelector = (state: AppRootStateType): TaskStateType => state.tasks;
