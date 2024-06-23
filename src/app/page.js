"use client";
import { useState } from "react";
import { TaskForm } from "../components/TaskForm";
import { TasksContainer } from "@/components/TasksContainer";
import { DragDropContext } from "react-beautiful-dnd";
import { Context } from "@/context/Context";


export default function Home() {
  const [newTasks, setNewTasks] = useState(JSON.parse(localStorage.getItem("newTasks")) || []);
  const [inProgresstasks, setInProgressTasks] = useState(JSON.parse(localStorage.getItem("inProgressTasks")) || []);
  const [completedTasks, setCompletedTasks] = useState(JSON.parse(localStorage.getItem("completedTasks")) || []);
  const [editClicked, setEditClicked] = useState(false);

  const contextValues = {
    newTasks, 
    setNewTasks,
    inProgresstasks,
    setInProgressTasks,
    completedTasks,
    setCompletedTasks
  }

  return (
  <Context.Provider value={contextValues}>
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-gray-50 relative">
        <DragDropContext >
          <TaskForm tasks={newTasks} setTasks={setNewTasks}/>
          <TasksContainer  setEditClicked={setEditClicked} />
        </DragDropContext>
      </main>
  </Context.Provider>
  );
}
