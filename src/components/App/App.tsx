"use client";
import { DragDropContext } from "react-beautiful-dnd";
import { setNewTasks, setInProgressTasks, setCompletedTasks } from "../../store/slices/taskSlice";
import { setMessage } from "../../store/slices/UISlice";

import NewTaskButton from "../../components/Task/NewTaskButton";
import { TasksContainer } from "../../components/Task/TasksContainer";
import { dragEndHandler } from "../../helpers/dragEndHandler";
import TaskModal from "../../components/Task/TaskModal";
import { Alert, Snackbar } from "@mui/material";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { RepositoryContext } from "../../context/Context";

function App() {
  const dispatch = useDispatch();
  const { showTaskModal, message } = useSelector((state: RootState) => state.ui);
  const { repo } = useContext(RepositoryContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => repo.getAllTasks(),
  });
  if (isLoading) return <p className="text-black animate-bounce">Loading...</p>;

  if (error) return <p className="text-black">ERROR</p>;

  return (
    <>
      <NewTaskButton />
      <DragDropContext
        onDragEnd={(result) => {
          dragEndHandler(result, setNewTasks, setInProgressTasks, setCompletedTasks);
        }}
      >
        <TasksContainer error={error} data={data} isLoading={isLoading} />
      </DragDropContext>

      <Snackbar
        open={message.open}
        autoHideDuration={2500}
        onClose={() => {
          dispatch(setMessage({ ...message, open: false }));
        }}
      >
        <Alert
          onClose={() => {
            dispatch(setMessage({ ...message, open: false }));
          }}
          severity={message.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
      {showTaskModal && <TaskModal />}
    </>
  );
}

export default App;
