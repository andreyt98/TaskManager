"use client";
import { useState } from "react";
import { TaskForm } from "../components/TaskForm";
import { TasksContainer } from "@/components/TasksContainer";

export default function Home() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [editClicked, setEditClicked] = useState(false);
  const [clickedId, setClickedId] = useState(false);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-gray-50 relative">
      <TaskForm tasks={tasks} setTasks={setTasks}/>
      <TasksContainer tasks={tasks} setTasks={setTasks} setEditClicked={setEditClicked}/>
    </main>
  );
}
