import { getTaskStyle } from "../../utils/getTaskStatusStyle";
import { taskStatusType } from "../../Types/taskStatus";

function TaskStatus({ status }: { status: taskStatusType }) {
  return <p className={`bg-gray-100 ${getTaskStyle(status)} text-xs inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold border-l-8 `}>{status}</p>;
}

export default TaskStatus;
