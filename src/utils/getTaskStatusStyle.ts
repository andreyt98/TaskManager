import { taskStatusStyles } from "../constants/ui/styles";
import { taskStatusType } from "../Types/taskStatus";

export function getTaskStyle(status: taskStatusType) {
  return taskStatusStyles[status];
}
