import { taskStatusStyles } from "../constants/taskStatusStyles";
import { taskStatusType } from "../Types/taskStatus";

export function getTaskStyle(status: taskStatusType) {
  return taskStatusStyles[status];
}
