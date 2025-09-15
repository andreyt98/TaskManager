import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { ITask } from "../../Types/task";

function ActionMenu({ task }: { task: ITask }) {
  const { setShowTaskModal, setActiveTaskValues } = useContext(Context);

  return (
    <div className="dropdown text-right relative text-sm">
      <button title="action-menu">
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
          <p className="hover:bg-gray-100 px-3 py-2">Edit</p>
        </button>

        <button
          onClick={(e) => {
            // handleDelete(e);
          }}
        >
          <p className="hover:bg-gray-100 px-3 py-2">Delete</p>
        </button>
      </div>
    </div>
  );
}

export default ActionMenu;
