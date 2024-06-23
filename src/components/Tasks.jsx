import { useRef } from "react";
import { useState, useEffect } from "react";
import { EditModal } from "./EditModal";

const Tasks = ({ tasks, setTasks, task, setEditClicked }) => {
  const [showEditable, setShowEditable] = useState(false);
  const [editableValue, setEditableValue] = useState({ title: "", description: "", category: "none" });
  const [newArray, setNewArray] = useState([]);

  const deleteTask = (event) => {
    let newA;
    tasks.forEach((e) => {
      if (e.id == task.id) {
        newA = tasks.filter((el) => el.id != task.id);

        localStorage.clear();
        localStorage.setItem("tasks", JSON.stringify(newA));

        const index = tasks.indexOf(e);
        tasks.splice(index, 1);

        event.target.parentElement.parentElement.style.transform = "scale(0.1)";
        setTimeout(() => {
          setTasks(newA);
        }, 200);
      }
    });
  };

  const checkTask = () => {
    const completedTodo = [...tasks];
    completedTodo.find((el) => {
      if (el.id === task.id) {
        el.completed = !el.completed;
      }
    });

    setTasks(completedTodo);
  };

  useEffect(() => {
    setNewArray([...tasks]);
  }, [tasks]);

  function showEditableInput() {
    setEditClicked(true);
    setShowEditable(!showEditable);
  }

  return (
    <div className={"task  border border-gray-300 flex flex-col items-center justify-space-between bg-gray-100 rounded-md text-black"}>
      {/* title and dropdown */}
      <div className="flex w-full justify-between border-b border-b-slate-300 p-2">
        <p className="font-semibold">Title</p>

        <div className="dropdown text-right relative text-sm">
          <button>
            <svg className="w-6 h-6 text-black  hover:bg-gray-200 rounded-lg px-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 12h.01m6 0h.01m5.99 0h.01" />
            </svg>
          </button>
          <div class="dropdown-menu absolute -left-8 top-6  bg-gray-50 border border-slate-300 rounded-md text-black flex flex-col justify-start gap-2 overflow-hidden">
            <button onClick={showEditableInput}>
              <p className=" cursor-pointer hover:bg-gray-100 px-3 py-2">Edit</p>
            </button>

            <button
              onClick={(e) => {
                deleteTask(e);
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
      {showEditable && (
        <EditModal editableValue={editableValue} setEditableValue={setEditableValue} task={task} setTasks={setTasks} newArray={newArray} setNewArray={setNewArray} setShowEditable={setShowEditable} />
      )}
    </div>
  );  
};

export default Tasks;
