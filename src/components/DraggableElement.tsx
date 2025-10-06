"use client";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { Dispatch, SetStateAction } from "react";
import Tasks from "./Tasks";
import { taskStatusType } from "../Types/taskStatus";
import TaskStatus from "./Task/TaskStatus";
import { ITask } from "../Types/task";

interface IDraggableElement {
  provided: DroppableProvided;
  taskArray: ITask[];
  setTasks: (task: ITask | []) => void;
  typeOfArrayName: taskStatusType;
  isLoading: boolean;
}

export function DraggableElement({ provided, typeOfArrayName, taskArray, setTasks, isLoading }: IDraggableElement) {
  return (
    <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-48 flex-1 border rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg max-h-96 overflow-auto">
      <TaskStatus status={typeOfArrayName} />

      {isLoading ? (
        <div className="flex flex-col rounded-md items-start justify-center p-2 gap-2 animate-pulse border h-full w-full  bg-gray-200">
          <div className="h-3 w-full rounded-md bg-gray-400"></div>
          <div className="h-3 w-[80%] rounded-md bg-gray-400"></div>
          <div className="h-3 w-[65%] rounded-md bg-gray-400"></div>
        </div>
      ) : (
        taskArray &&
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
        })
      )}
      <span className="absolute">{provided.placeholder}</span>
    </div>
  );
}

export default DraggableElement;
