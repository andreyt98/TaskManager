import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

function SubmitButton() {
  const { activeTaskValues } = useSelector((state: RootState) => state.taskSlice);

  const isNewTask = activeTaskValues === null;

  return (
    <button type="submit" className="btn-primary mt-2 max-sm:w-full rounded-lg text-sm !px-5 !py-3">
      {isNewTask ? "Add" : "Update"}
    </button>
  );
}

export default SubmitButton;
