"use client";
import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Snackbar, Alert } from "@mui/material";
import { TasksContainer } from "../components/Task/TasksContainer";
import { Context } from "../context/Context";
import { dragEndHandler } from "../helpers/dragEndHandler";
import TaskModal from "../components/Task/TaskModal";
import NewTaskButton from "../components/Task/NewTaskButton";
import { localStorageRepository } from "../repositories/localStorageRepository/localStorageRepository";
import { ITask } from "../Types/task";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar/Navbar";
import LandingPage from "../views/LandingPage/LandingPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setNewTasks, setInProgressTasks, setCompletedTasks } from "../store/slices/taskSlice";
export default function Home() {
  const [message, setMessage] = useState<{ message: string; severity: "error" | "info" | "success" | "warning"; open: boolean }>({ message: "", severity: "info", open: false });
  const [activeTaskValues, setActiveTaskValues] = useState({ taskValues: { id: 0, title: "", description: "", category: "" } });

  const [repo, setRepo] = useState(localStorageRepository); // set this value checking if user is signed in

  const { showTaskModal } = useSelector((state: RootState) => state.ui);
  const contextValues = {
    setMessage,
    activeTaskValues,
    setActiveTaskValues,
    repo,
  };

  const queryClient = new QueryClient();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNewTasks(JSON.parse(localStorage.getItem("newTasks") || "[]")));
    dispatch(setInProgressTasks(JSON.parse(localStorage.getItem("inProgressTasks") || "[]")));
    dispatch(setCompletedTasks(JSON.parse(localStorage.getItem("completedTasks") || "[]")));
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={contextValues}>
        <main className="flex min-h-screen flex-col items-center justify-start gap-4 p-4 bg-gray-50 relative">
          <Navbar />
          {/* <LandingPage /> */}
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
              setMessage({ ...message, open: false });
            }}
          >
            <Alert
              onClose={() => {
                setMessage({ ...message, open: false });
              }}
              severity={message.severity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {message.message}
            </Alert>
          </Snackbar>
          {showTaskModal && <TaskModal />}
        </main>
      </Context.Provider>
    </QueryClientProvider>
  );
}
