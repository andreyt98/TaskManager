"use client";
import { Droppable } from "react-beautiful-dnd";
import { useContext } from "react";
import DraggableElement from "./DraggableElement";
import { Context } from "../context/Context";

export function TasksContainer() {
  const { newTasks, setNewTasks, inProgresstasks, setInProgressTasks, completedTasks, setCompletedTasks } = useContext(Context);

  return (
    <div className="p-2 flex flex-col justify-center lg:flex-row gap-8 lg:w-11/12 xl:w-9/12 w-full">
      <Droppable droppableId="newTasks">
        {(provided) => {
          return <DraggableElement provided={provided} typeOfArrayName={"New tasks"} taskArray={newTasks} setTasks={setNewTasks} />;
        }}
      </Droppable>

      <Droppable droppableId="inProgressTasks">
        {(provided) => {
          return <DraggableElement provided={provided} typeOfArrayName={"In progress"} taskArray={inProgresstasks} setTasks={setInProgressTasks} />;
        }}
      </Droppable>

      <Droppable droppableId="completedTasks">
        {(provided) => {
          return <DraggableElement provided={provided} typeOfArrayName={"Completed"} taskArray={completedTasks} setTasks={setCompletedTasks} />;
        }}
      </Droppable>
    </div>
  );
}
