"use client";
import Tasks from "../components/Tasks";
import { useState } from "react";
import { TaskForm } from "../components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [editClicked, setEditClicked] = useState(false);
  const [clickedId, setClickedId] = useState(false);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-gray-900 relative">
      <header className="text-center  p-2">
          <h1 className="font-semibold text-2xl">Task Manager App</h1>
        </header>

        <TaskForm tasks={tasks} setTasks={setTasks}/>

        <div className={`${tasks.length > 0 &&" border border-neutral-800" } rounded-lg task-container flex flex-col justify-space-between gap-4 p-4 max-h-80 overflow-y-auto w-full lg:w-5/6 2xl:w-1/2 text-wrap`} >
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (              
                <Tasks tasks={tasks} setTasks={setTasks} task={task} setEditClicked={setEditClicked} key={task.id} setClickedId={setClickedId}/>
              );
            })
          ) :( 
            <p className="text-info text-center p-2 rounded"> Start doing something! </p>
          )}
        </div>
    </main>
  );
}
