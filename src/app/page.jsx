"use client";
import { useState, useEffect } from "react";
import { TaskForm } from "../components/TaskForm";
import { DragDropContext } from "react-beautiful-dnd";
import { Snackbar, Alert } from "@mui/material";
import { TasksContainer } from "../components/TasksContainer";
import { Context } from "../context/Context";
import { dragEndHandler } from "../helpers/dragEndHandler";
export default function Home() {
  const [newTasks, setNewTasks] = useState([]);
  const [inProgresstasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [message, setMessage] = useState({ message: null, severity: null, open: false });
  const contextValues = {
    newTasks,
    setNewTasks,
    inProgresstasks,
    setInProgressTasks,
    completedTasks,
    setCompletedTasks,
    setMessage,
  };

  useEffect(() => {
    setNewTasks(JSON.parse(localStorage.getItem("newTasks")) || []);
    setInProgressTasks(JSON.parse(localStorage.getItem("inProgressTasks")) || []);
    setCompletedTasks(JSON.parse(localStorage.getItem("completedTasks")) || []);
  }, []);

  return (
    <Context.Provider value={contextValues}>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-gray-50 relative">
        <DragDropContext
          onDragEnd={(result) => {
            dragEndHandler(result, setNewTasks, setInProgressTasks, setCompletedTasks);
          }}
        >
          <TaskForm />
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
      </main>
    </Context.Provider>
  );
}
