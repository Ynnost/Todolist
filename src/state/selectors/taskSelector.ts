import { TaskStateType } from "../../components/WithRedux/AppWithRedux";
import { AppRootStateType } from "../store";

export const taskSelector = (state: AppRootStateType): TaskStateType => state.tasks;
