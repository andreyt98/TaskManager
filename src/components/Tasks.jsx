import { useContext } from "react";
import { Context } from "../context/Context";
import { deleteTask } from "../helpers/deleteTask";
import CategoryBadge from "./Task/CategoryBadge";
const NO_DATA_ERROR = 0;

const Tasks = ({ setTasks, task }) => {
  const { setMessage, setShowTaskModal, setActiveTaskValues } = useContext(Context);
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

        <div className="dropdown text-right relative text-sm">
          <button>
            <svg className="w-6 h-6 text-black  hover:bg-gray-200 rounded-lg px-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 12h.01m6 0h.01m5.99 0h.01" />
            </svg>
          </button>
          <div className="dropdown-menu absolute -left-8 top-6  bg-gray-50 border border-slate-300 rounded-md text-black flex flex-col justify-start gap-2 overflow-hidden">
            <button
              onClick={() => {
                setShowTaskModal(true);
                setActiveTaskValues({ id: task.id, title: task.title, description: task.description, category: task.category });
              }}
            >
              <p className=" cursor-pointer hover:bg-gray-100 px-3 py-2">Edit</p>
            </button>

            <button
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              <p className=" cursor-pointer hover:bg-gray-100 px-3 py-2">Delete</p>
            </button>
          </div>
        </div>
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
