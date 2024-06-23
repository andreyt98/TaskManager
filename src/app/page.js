"use client";
import { useState } from "react";
import { TaskForm } from "../components/TaskForm";
import { TasksContainer } from "@/components/TasksContainer";
import { DragDropContext,Droppable } from "react-beautiful-dnd";


export default function Home() {
  const [newTasks, setNewTasks] = useState(JSON.parse(localStorage.getItem("newTasks")) || []);
  const [inProgresstasks, setInProgressTasks] = useState(JSON.parse(localStorage.getItem("inProgressTasks")) || []);
  const [completedTasks, setCompletedTasks] = useState(JSON.parse(localStorage.getItem("completedTasks")) || []);
  const [editClicked, setEditClicked] = useState(false);
  const [clickedId, setClickedId] = useState(false);
  
  const handleOnDragEnd = (result) => {    
    //console.log(result)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-gray-50 relative">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <TaskForm tasks={newTasks} setTasks={setNewTasks}/>
        <Droppable droppableId="tasksSections" >
          {(provided)=>{

            return(
              <div ref={provided.innerRef} {...provided.droppableProps} className="p-2 flex flex-col justify-center lg:flex-row gap-8 lg:w-11/12 xl:w-9/12 w-full">
                {/* TODO: use centralized state to avoid passing too many props */}
                <TasksContainer  tasks={newTasks} setTasks={setNewTasks} setEditClicked={setEditClicked}/>
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
