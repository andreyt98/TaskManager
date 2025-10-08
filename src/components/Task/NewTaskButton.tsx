import { useContext } from "react";
import { Context } from "../../context/Context";
import { useDispatch } from "react-redux";
import { setShowTaskModal } from "../../store/slices/UISlice";

function NewTaskButton() {
  const { setActiveTaskValues } = useContext(Context);
  const dispatch = useDispatch();
  return (
    <button
      className="btn-primary flex gap-2 px-5 py-2.5 lg:text-lg rounded-lg  focus:outline-none !font-normal"
      onClick={() => {
        dispatch(setShowTaskModal(true));
        setActiveTaskValues(null);
      }}
    >
      New Task +
    </button>
  );
}

export default NewTaskButton;
