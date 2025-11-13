"use client";
import { Droppable } from "react-beautiful-dnd";
import DraggableElement from "../DraggableElement";
import { ITask } from "../../Types/task";
import { setNewTasks, setInProgressTasks, setCompletedTasks } from "../../store/slices/taskSlice";
import { useDispatch } from "react-redux";

export function TasksContainer({ error, data, isLoading }: { error: Error | null; data: { newTasks: ITask[]; inProgressTasks: ITask[]; completedTasks: ITask[] } | undefined; isLoading: boolean }) {

  const dispatch = useDispatch();

  if (error) return <p className="text-black">ERROR</p>;

  return (
    <div className="p-2 flex flex-col justify-center lg:flex-row gap-8 lg:w-11/12 w-full text-black">
      <Droppable droppableId="newTasks">
        {(provided) => {
          return (
            <DraggableElement
              provided={provided}
              typeOfArrayName={"New tasks"}
              taskArray={data?.newTasks}
              setTasks={(value: ITask[]) => {
                dispatch(setNewTasks(value));
              }}
              isLoading={isLoading}
            />
          );
        }}
      </Droppable>

      <Droppable droppableId="inProgressTasks">
        {(provided) => {
          return (
            <DraggableElement
              provided={provided}
              typeOfArrayName={"In progress"}
              taskArray={data?.inProgressTasks}
              setTasks={(value: ITask[]) => {
                dispatch(setInProgressTasks(value));
              }}
              isLoading={isLoading}
            />
          );
        }}
      </Droppable>

      <Droppable droppableId="completedTasks">
        {(provided) => {
          return (
            <DraggableElement
              provided={provided}
              typeOfArrayName={"Completed"}
              taskArray={data?.completedTasks}
              setTasks={(value: ITask[]) => {
                dispatch(setCompletedTasks(value));
              }}
              isLoading={isLoading}
            />
          );
        }}
      </Droppable>
    </div>
  );
}
