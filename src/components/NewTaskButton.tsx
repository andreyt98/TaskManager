import { useContext } from "react";
import { Context } from "../context/Context";

function NewTaskButton() {
  const { setShowTaskModal, setActiveTaskValues } = useContext(Context);

  return (
    <button
      className="btn-primary flex gap-2 px-5 py-2.5 lg:text-lg rounded-lg  focus:outline-none"
      onClick={() => {
        setShowTaskModal(true);
        setActiveTaskValues(null);
      }}
    >
      {" "}
      New Task
      <svg className="w-5 h-6 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
      </svg>
    </button>
  );
}

export default NewTaskButton;
