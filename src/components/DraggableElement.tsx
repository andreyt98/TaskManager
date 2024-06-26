"use client";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { typeOfTaskObject } from "../helpers/submitTask";
import React, { Dispatch, SetStateAction } from "react";
import Tasks from "./Tasks";

interface IDraggableElement {
  provided: DroppableProvided;
  taskArray: typeOfTaskObject[];
  setTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>;
  typeOfArrayName: string;
}

export const DraggableElement: React.FC<IDraggableElement> = ({ provided, typeOfArrayName, taskArray, setTasks }) => {
  return (
    <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-48 flex-1 border  rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg max-h-96 overflow-auto">
      <p
        className={`bg-gray-100 ${
          typeOfArrayName == "New tasks" ? `text-orange-700 border-l-orange-600` : typeOfArrayName == "In progress" ? "text-yellow-600  border-l-yellow-500" : " text-green-600 border-l-green-600"
        } text-xs inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold border-l-8 `}
      >
        {typeOfArrayName}
      </p>
      {taskArray &&
        taskArray.length > 0 &&
        taskArray.map((task, index) => {
          return (
            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
              {(provided) => {
                return (
                  <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <Tasks setTasks={setTasks} task={task} key={task.id} />
                  </div>
                );
              }}
            </Draggable>
          );
        })}
      <span className="absolute">{provided.placeholder}</span>
    </div>
  );
};

export default DraggableElement;
