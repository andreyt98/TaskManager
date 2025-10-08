import { useDispatch } from "react-redux";
import { setShowTaskModal } from "../../store/slices/UISlice";
import { setActiveTaskValues } from "../../store/slices/taskSlice";

function NewTaskButton() {
  const dispatch = useDispatch();
  return (
    <button
      className="btn-primary flex gap-2 px-5 py-2.5 lg:text-lg rounded-lg  focus:outline-none !font-normal"
      onClick={() => {
        dispatch(setShowTaskModal(true));
        dispatch(setActiveTaskValues(null));
      }}
    >
      New Task +
    </button>
  );
}

export default NewTaskButton;
