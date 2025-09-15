import { useContext } from "react";
import { Context } from "../context/Context";
import { deleteTask } from "../helpers/deleteTask";
import CategoryBadge from "./Task/CategoryBadge";
import ActionMenu from "./Task/ActionMenu";
const NO_DATA_ERROR = 0;

const Tasks = ({ setTasks, task }) => {
  const { setMessage } = useContext(Context);
  const handleDelete = async () => {
    try {
      const deletedTask = await deleteTask(task);
      setTasks(deletedTask);
      setMessage({ message: "Task deleted!", severity: "warning", open: true });
    } catch (error) {
      if (error.reason && error.reason.id === NO_DATA_ERROR) {
        setMessage({ message: error.reason.text, severity: "warning", open: true });
        setTasks([]);
        return;
      }
      setMessage({ message: "Error deleting task!", severity: "error", open: true });
    }
  };

  return (
    <div className={"task  border border-gray-300 flex flex-col items-center justify-space-between bg-gray-100 rounded-md text-black"}>
      {/* title and dropdown */}
      <div className="flex w-full justify-between border-b border-b-slate-300 p-2 transition-all duration-200">
        <p className="font-semibold">{task.title}</p>

        <ActionMenu task={task} />
      </div>

      {/*task  description   and category*/}
      <div className="task text-start w-full p-2 flex flex-col gap-6">
        {/* description */}
        <p className=" font-light text-sm">{task.description}</p>

        {task.category != "none" && <CategoryBadge category={task.category} />}
      </div>
    </div>
  );
};

export default Tasks;
