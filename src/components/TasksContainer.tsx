"use client";
import { Droppable } from "react-beautiful-dnd";
import { useContext } from "react";
import DraggableElement from "./DraggableElement";
import { Context } from "../context/Context";
import { useQuery } from "@tanstack/react-query";
import { ITask } from "../Types/task";

export function TasksContainer() {
  const { newTasks, setNewTasks, inProgresstasks, setInProgressTasks, completedTasks, setCompletedTasks } = useContext(Context);

  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/tasks", { mode: "cors" });

        const json = await response.json();

        let data: ITask[] = [];

        if (response.ok) {
          data = json.map((element: unknown) => {
            const task = element as { id: number; title: string; description: string; task_status: { status: string }; task_categories: { category_name: string }; created_at: Date };
            const { id, title, description, task_categories, task_status, created_at } = task;

            // console.log(task);
            const taskObject = {
              id,
              title,
              description,
              category: task_categories.category_name,
              status: task_status.status,
              created_at,
            };

            return taskObject;
          });

          const newO: ITask[] = [];
          const inProgressO: ITask[] = [];
          const completed: ITask[] = [];

          data.forEach((element) => {
            switch (element.status) {
              case "new":
                newO.push(element);

                break;
              case "in progress":
                inProgressO.push(element);

                break;
              case "completed":
                completed.push(element);

                break;
            }
          });

          setNewTasks(newO);
          setInProgressTasks(inProgressO);
          setCompletedTasks(completed);
        }

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    queryKey: ["tasks"],
  });

  if (error) return <p className="text-black">ERROR</p>;

  return (
    <div className="p-2 flex flex-col justify-center lg:flex-row gap-8 lg:w-11/12 xl:w-9/12 w-full text-black">
      <Droppable droppableId="newTasks">
        {(provided) => {
          return <DraggableElement provided={provided} typeOfArrayName={"New tasks"} taskArray={newTasks} setTasks={setNewTasks} isLoading={isLoading} />;
        }}
      </Droppable>

      <Droppable droppableId="inProgressTasks">
        {(provided) => {
          return <DraggableElement provided={provided} typeOfArrayName={"In progress"} taskArray={inProgresstasks} setTasks={setInProgressTasks} isLoading={isLoading} />;
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
