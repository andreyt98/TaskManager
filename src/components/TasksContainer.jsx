"use client";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Tasks from "./Tasks";
import { useContext } from "react";
import { Context } from "@/context/Context";

export function TasksContainer({ setEditClicked }) {

  const { newTasks, setNewTasks, inProgresstasks, setInProgressTasks, completedTasks, setCompletedTasks } = useContext(Context);

  return (
    <div className="p-2 flex flex-col justify-center lg:flex-row gap-8 lg:w-11/12 xl:w-9/12 w-full">
      {/* TODO: create single component to render droppable elements   */}
      <Droppable droppableId="newTasks">
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-48 flex-1 border  rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg max-h-96 overflow-auto">
              <p className="bg-gray-100 text-orange-700 text-xs inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold border-l-8 border-l-orange-600">New tasks</p>
              {newTasks &&
                newTasks.length > 0 &&
                newTasks.map((task, index) => {
                  return (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => {
                        return (
                          <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                            <Tasks tasks={newTasks} setTasks={setNewTasks} task={task} setEditClicked={setEditClicked} key={task.id} />
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
              <span className="absolute">{provided.placeholder}</span>
            </div>
          );
        }}
      </Droppable>

      <Droppable droppableId="inProgressTasks">
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-48 flex-1 border  rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg max-h-lg overflow-auto">
              <p className="bg-gray-100 text-yellow-600 text-xs  inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold border-l-8 border-l-yellow-500">In progress</p>
              {inProgresstasks &&
                inProgresstasks.length > 0 &&
                inProgresstasks.map((task, index) => {
                  return (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => {
                        return (
                          <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                            <Tasks tasks={inProgresstasks} setTasks={setInProgressTasks} task={task} setEditClicked={setEditClicked} key={task.id} />
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
              <span className="absolute">{provided.placeholder}</span>
            </div>
          );
        }}
      </Droppable>

      <Droppable droppableId="completedTasks">
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-48 flex-1 border  rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg max-h-lg overflow-auto">
              <p className="bg-gray-100 text-green-600 text-xs  inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold border-l-8 border-l-green-600">Completed</p>
              {completedTasks &&
                completedTasks.length > 0 &&
                completedTasks.map((task, index) => {
                  return (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => {
                        return (
                          <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                            <Tasks tasks={completedTasks} setTasks={setCompletedTasks} task={task} setEditClicked={setEditClicked} key={task.id} />
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
              <span className="absolute">{provided.placeholder}</span>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
