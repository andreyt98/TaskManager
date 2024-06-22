import { useRef } from "react";
import { useState, useEffect } from "react";
const Tasks = ({ tasks, setTasks, task, setEditClicked }) => {
  const [showEditable, setShowEditable] = useState(false);
  const [editableValue, setEditableValue] = useState(task.description);
  const [newArray, setNewArray] = useState([]);

  const editableTaskRef = useRef();

  return (
    <div className={"task rounded-sm p-3 border border-gray-800 flex items-center justify-space-between " + (task.completed ? "completed border-success" : "")}>
      {/* task text */}
      <div className={"w-auto " + (task.completed ? "line-through text-gray-600" : "")}>{task.description}</div>
      {task.category != "none" && <span class="bg-sky-200 text-gray-900 text-xs font-medium me-2 px-2.5 py-0.5  border-blue-400 rounded-xl">{task.category}</span>}
      {/* input to edit (will appear on edit button click) */}
      <input
        value={editableValue}
        onChange={(e) => {
          setEditableValue(e.target.value);
        }}
        type="text"
        name=""
        id="new"
        style={{ display: showEditable ? "block" : "none", backgroundColor: "#073056", color: "white", border: "none" }}
        ref={editableTaskRef}
        placeholder="editing task..."
        onKeyUp={(e) => {
          handleEnterKey(e);
        }}
      />

      {/* task options */}
      <div className="w-auto ms-auto ">
        <button role={"button"} onClick={showEditableInput}>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
        </button>

        <button
          onClick={(e) => {
            deleteTask(e);
          }}
        >
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>

        <button
          onClick={(e) => {
            checkTask(e);
          }}
          defaultChecked={task.completed}
        >
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Tasks;
