"use client";
import { useState, useEffect, createContext } from "react";
import { TaskForm } from "../components/TaskForm";
import { TasksContainer } from "@/components/TasksContainer";
import { DragDropContext } from "react-beautiful-dnd";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import { typeOfTaskObject } from "@/helpers/submitTask";
import React from "react";
interface AppContextType {
  newTasks: typeOfTaskObject[];
  setNewTasks: React.Dispatch<React.SetStateAction<typeOfTaskObject[]>>;
  inProgresstasks: typeOfTaskObject[];
  setInProgressTasks: React.Dispatch<React.SetStateAction<typeOfTaskObject[]>>;
  completedTasks: typeOfTaskObject[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<typeOfTaskObject[]>>;
  setMessage: React.Dispatch<React.SetStateAction<{ message: string; severity: AlertColor; open: boolean }>>;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function Home() {
  const [newTasks, setNewTasks] = useState<typeOfTaskObject[]>([]);
  const [inProgresstasks, setInProgressTasks] = useState<typeOfTaskObject[]>([]);
  const [completedTasks, setCompletedTasks] = useState<typeOfTaskObject[]>([]);
  const AlertColor: AlertColor = "error"
  const [message, setMessage] = useState({ message: "null", severity: AlertColor, open: false });

  const contextValues: AppContextType = {
    newTasks,
    setNewTasks,
    inProgresstasks,
    setInProgressTasks,
    completedTasks,
    setCompletedTasks,
    setMessage,
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

  useEffect(() => {
    setNewTasks(JSON.parse(localStorage.getItem("newTasks")) || []);
    setInProgressTasks(JSON.parse(localStorage.getItem("inProgressTasks")) || []);
    setCompletedTasks(JSON.parse(localStorage.getItem("completedTasks")) || []);
  }, []);

  return (
    <AppContext.Provider value={contextValues}>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-gray-50 relative">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <TaskForm />
          <TasksContainer />
        </DragDropContext>
        <Snackbar
          open={message.open}
          autoHideDuration={2500}
          onClose={() => {
            setMessage({ ...message, open: false });
          }}
        >
          <Alert
            onClose={() => {
              setMessage({ ...message, open: false });
            }}
            severity={message.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      </main>
    </AppContext.Provider>
  );
}
