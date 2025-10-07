"use client";
import { Droppable } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import { useQuery } from "@tanstack/react-query";
import { ITask } from "../Types/task";
import { setNewTasks, setInProgressTasks, setCompletedTasks } from "../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
export function TasksContainer() {
  const { newTasks, completedTasks, inProgressTasks } = useSelector((state: RootState) => state.taskSlice);

  const dispatch = useDispatch();

  // const { data, isLoading, error } = useQuery({
  //   queryFn: async () => {
  //     try {
  //       const response = await fetch("http://127f.0.0.1:3000/api/tasks", { mode: "cors" });

  //       const json = await response.json();

  //       let data: ITask[] = [];

  //       if (response.ok) {
  //         data = json.map((element: unknown) => {
  //           const task = element as { id: number; title: string; description: string; task_status: { status: string }; task_categories: { category_name: string }; created_at: Date };
  //           const { id, title, description, task_categories, task_status, created_at } = task;

  //           // console.log(task);
  //           const taskObject = {
  //             id,
  //             title,
  //             description,
  //             category: task_categories.category_name,
  //             status: task_status.status,
  //             created_at,
  //           };

  //           return taskObject;
  //         });

  //         const newO: ITask[] = [];
  //         const inProgressO: ITask[] = [];
  //         const completed: ITask[] = [];

  //         data.forEach((element) => {
  //           switch (element.status) {
  //             case "new":
  //               newO.push(element);

  //               break;
  //             case "in progress":
  //               inProgressO.push(element);

  //               break;
  //             case "completed":
  //               completed.push(element);

  //               break;
  //           }
  //         });

  //         dispatch(setNewTasks(newO));
  //         dispatch(setInProgressTasks(inProgressO));
  //         dispatch(setCompletedTasks(completed));
  //       }

  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   queryKey: ["tasks"],
  // });

  // if (error) return <p className="text-black">ERROR</p>;

  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="p-2 flex flex-col justify-center lg:flex-row gap-8 lg:w-11/12 xl:w-9/12 w-full text-black">
      <Droppable droppableId="newTasks">
        {(provided) => {
          return <DraggableElement provided={provided} typeOfArrayName={"New tasks"} taskArray={newTasks} setTasks={setNewTasks} isLoading={isLoading} />;
        }}
      </Droppable>

      <Droppable droppableId="inProgressTasks">
        {(provided) => {
          return <DraggableElement provided={provided} typeOfArrayName={"In progress"} taskArray={inProgressTasks} setTasks={setInProgressTasks} isLoading={isLoading} />;
        }}
      </Droppable>

      <Droppable droppableId="completedTasks">
        {(provided) => {
          return <DraggableElement provided={provided} typeOfArrayName={"Completed"} taskArray={completedTasks} setTasks={setCompletedTasks} isLoading={isLoading} />;
        }}
      </Droppable>
    </div>
  );
}
