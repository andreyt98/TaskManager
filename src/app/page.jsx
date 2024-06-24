"use client";
import { useState } from "react";
import { TaskForm } from "../components/TaskForm";
import { TasksContainer } from "@/components/TasksContainer";
import { DragDropContext } from "react-beautiful-dnd";
import { Context } from "@/context/Context";

export default function Home() {
  const [newTasks, setNewTasks] = useState(JSON.parse(localStorage.getItem("newTasks")) || []);
  const [inProgresstasks, setInProgressTasks] = useState(JSON.parse(localStorage.getItem("inProgressTasks")) || []);
  const [completedTasks, setCompletedTasks] = useState(JSON.parse(localStorage.getItem("completedTasks")) || []);
  const [editClicked, setEditClicked] = useState(false); //esto no lo ocupo, cuando pase setshoweditable eso lo va a hacer todo

  const contextValues = {
    newTasks,
    setNewTasks,
    inProgresstasks,
    setInProgressTasks,
    completedTasks,
    setCompletedTasks,
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const source = result.source.droppableId;
    const destination = result.destination.droppableId;

    const idToSearch = result.draggableId;

    const sourceTasksFromLS = JSON.parse(localStorage.getItem(source));
    let tempArr = [];

    let elementToMove;

    sourceTasksFromLS.forEach((element) => {
      if (element.id == idToSearch) {
        elementToMove = element;

        tempArr = sourceTasksFromLS.filter((el) => {
          return el.id != idToSearch;
        });
      }
    });
    localStorage.setItem(source, JSON.stringify(tempArr));

    //eliminamos el elemento del source
    if (source == "inProgressTasks") {
      setInProgressTasks(tempArr);
    } else if (source == "newTasks") {
      setNewTasks(tempArr);
    } else if (source == "completedTasks") {
      setCompletedTasks(tempArr);
    }

    // agregamos el elemento al array destination
    const isDestinationInLocalS = JSON.parse(localStorage.getItem(destination));

    if (isDestinationInLocalS && isDestinationInLocalS.length > 0) {
      isDestinationInLocalS.push(elementToMove);
      localStorage.setItem(destination, JSON.stringify(isDestinationInLocalS));
      if (destination == "inProgressTasks") {
        setInProgressTasks(isDestinationInLocalS);
      } else if (destination == "newTasks") {
        setNewTasks(isDestinationInLocalS);
      } else if (destination == "completedTasks") {
        setCompletedTasks(isDestinationInLocalS);
      }
    } else {
      let temp = [elementToMove];
      localStorage.setItem(destination, JSON.stringify(temp));
      if (destination == "inProgressTasks") {
        setInProgressTasks(temp);
      } else if (destination == "newTasks") {
        setNewTasks(temp);
      } else if (destination == "completedTasks") {
        setCompletedTasks(temp);
      }
    }
    // TODO: fix this spaghetti
  };
  return (
    <Context.Provider value={contextValues}>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-gray-50 relative">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <TaskForm />
          <TasksContainer setEditClicked={setEditClicked} />
        </DragDropContext>
      </main>
    </Context.Provider>
  );
}
