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

function App() {
  const dispatch = useDispatch();
  const { showTaskModal, message } = useSelector((state: RootState) => state.ui);

  return (
    <>
      <NewTaskButton />
      <DragDropContext
        onDragEnd={(result) => {
          dragEndHandler(result, setNewTasks, setInProgressTasks, setCompletedTasks);
        }}
      >
        <TasksContainer />
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
