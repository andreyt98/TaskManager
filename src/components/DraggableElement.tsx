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
}

export const DraggableElement: React.FC<IDraggableElement> = ({ provided, typeOfArrayName, taskArray, setTasks }) => {
  return (
    <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-48 flex-1 border  rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg max-h-96 overflow-auto">
      <TaskStatus status={typeOfArrayName} />
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
