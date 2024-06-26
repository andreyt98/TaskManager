import { useState, useContext } from "react";
import { EditModal } from "./EditModal";
import { deleteTask } from "@/helpers/deleteTask";
import { AppContext } from "@/app/page";
const Tasks = ({ setTasks, task }) => {
  const [showEditable, setShowEditable] = useState(false);
  const [editClicked, setEditClicked] = useState(false); //esto no lo ocupo, cuando pase setshoweditable eso lo va a hacer todo
  const { setMessage } = useContext(AppContext);
  const handleDelete = () => {
    deleteTask(task, setTasks);
    setMessage({ message: "Task deleted!", severity: "warning", open: true });
  };

  function showEditableInput() {
    setEditClicked(true);
    setShowEditable(!showEditable);
  }

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
            <button onClick={showEditableInput}>
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

        {/* category */}
        {task.category != "none" && <p className="bg-green-50 text-green-700 text-xs font-medium me-2 px-2.5 py-1 rounded-md ring-1 ring-inset ring-green-600/20 self-start">{task.category}</p>}
      </div>

      {/* modal to edit (will appear on edit button click) */}
      {showEditable && <EditModal task={task} setTasks={setTasks} setShowEditable={setShowEditable} />}
    </div>
  );
};

export default Tasks;
