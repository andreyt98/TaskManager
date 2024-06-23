"use client";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Tasks from "./Tasks";
export function TasksContainer({ tasks, setTasks, setEditClicked }) {
  return (
    <>
    {/* TODO: create single component to render droppable elements to be able to render any array  */}
      <Droppable droppableId="tasksSections">
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-48 flex-1 border  rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg max-h-96 overflow-auto">
              <p className="bg-gray-100 text-orange-700 text-xs inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold border-l-8 border-l-orange-600">New tasks</p>
              {tasks &&
                tasks.length > 0 &&
                tasks.map((task, index) => {
                  return (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => {
                        return (
                          <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                            <Tasks tasks={tasks} setTasks={setTasks} task={task} setEditClicked={setEditClicked} key={task.id} />
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

      <Droppable droppableId="tasksSections2">
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-48 flex-1 border  rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg max-h-lg overflow-auto">
              <p className="bg-gray-100 text-yellow-600 text-xs  inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold border-l-8 border-l-yellow-500">In progress</p>
              <span className="absolute">{provided.placeholder}</span>
            </div>
          );
        }}
      </Droppable>

      <Droppable droppableId="tasksSections3">
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-48 flex-1 border  rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg max-h-lg overflow-auto">
              <p className="bg-gray-100 text-green-600 text-xs  inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold border-l-8 border-l-green-600">Completed</p>
              <span className="absolute">{provided.placeholder}</span>
            </div>
          );
        }}
      </Droppable>
    </>
  );
}
