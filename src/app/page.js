"use client";
import { useState } from "react";
import { TaskForm } from "../components/TaskForm";


export default function Home() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-gray-900 relative">
      <header className="text-center  p-2">
          <h1 className="font-semibold text-2xl">Task Manager App</h1>
        </header>

        <TaskForm tasks={tasks} setTasks={setTasks}/>

    </main>
  );
}
