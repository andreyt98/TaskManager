"use client";
import { Droppable } from "react-beautiful-dnd";
import DraggableElement from "../DraggableElement";
import { useQuery } from "@tanstack/react-query";
import { ITask } from "../../Types/task";
import { setNewTasks, setInProgressTasks, setCompletedTasks } from "../../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useContext, useEffect, useState } from "react";
import { RepositoryContext } from "../../context/Context";

export function TasksContainer() {
  const { newTasks, completedTasks, inProgressTasks } = useSelector((state: RootState) => state.taskSlice);
  const { repo } = useContext(RepositoryContext);

  const dispatch = useDispatch();

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => repo.getAllTasks(),
  });

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setNewTasks(data.newTasks));
      dispatch(setInProgressTasks(data.inProgressTasks));
      dispatch(setCompletedTasks(data.completedTasks));
    }
  }, [isSuccess, data]);

  if (error) return <p className="text-black">ERROR</p>;

  // const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="p-2 flex flex-col justify-center lg:flex-row gap-8 lg:w-11/12 w-full text-black">
      <Droppable droppableId="newTasks">
        {(provided) => {
          return (
            <DraggableElement
              provided={provided}
              typeOfArrayName={"New tasks"}
              taskArray={newTasks}
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
              taskArray={inProgressTasks}
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
              taskArray={completedTasks}
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
