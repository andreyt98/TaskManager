import { useContext } from "react";
import Overlay from "./common/Overlay";
import { Context } from "../context/Context";
import TaskForm from "./TaskForm";
import { setShowTaskModal } from "../store/slices/UISlice";
import { useDispatch } from "react-redux";

function TaskModal() {
  const { activeTaskValues } = useContext(Context);
  const isNewTask = activeTaskValues === null;
  const dispatch = useDispatch();

  return (
    <Overlay setShowOverlay={setShowTaskModal}>
      <div className=" max-md:-translate-y-14  absolute w-11/12 lg:w-1/2 2xl:w-6/12 mx-auto rounded-lg border-gray-100 bg-gray-50 z-20 shadow-md text-black">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-b-gray-200 rounded-t ">
          <h3 className="text-lg font-semibold"> {isNewTask ? "Add a new task" : "Edit task"}</h3>
          <button
            title="close-overlay"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={() => {
              dispatch(setShowTaskModal(false));
            }}
            type="button"
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
        <TaskForm />
      </div>
    </Overlay>
  );
}

export default TaskModal;
