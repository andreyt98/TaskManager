"use client";
import { useState } from "react";
import { TaskForm } from "../components/TaskForm";
import { TasksContainer } from "@/components/TasksContainer";
import { DragDropContext,Droppable } from "react-beautiful-dnd";


export default function Home() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [editClicked, setEditClicked] = useState(false);
  const [clickedId, setClickedId] = useState(false);
  
  const handleOnDragEnd = (result) => {    
    console.log(result)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-gray-50 relative">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <TaskForm tasks={tasks} setTasks={setTasks}/>
        <Droppable droppableId="tasksSections" >
          {(provided)=>{

            return(
              <div ref={provided.innerRef} {...provided.droppableProps} className="p-2 flex flex-col justify-center lg:flex-row gap-8 lg:w-11/12 xl:w-9/12 w-full">
                <TasksContainer  tasks={tasks} setTasks={setTasks} setEditClicked={setEditClicked}/>
                <span className="absolute">
                  {provided.placeholder}
                </span>
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
