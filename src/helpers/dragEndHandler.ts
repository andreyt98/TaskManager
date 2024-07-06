import { DropResult } from "react-beautiful-dnd";
import { typeOfTaskObject } from "./submitTask";
import { Dispatch, SetStateAction } from "react";

export const dragEndHandler = (
  result: DropResult,
  setNewTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>,
  setInProgressTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>,
  setCompletedTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>
) => {
  if (!result.destination) {
    return;
  }

  const source: string = result.source.droppableId;
  const destination: string = result.destination.droppableId;

  const idToSearch: string = result.draggableId;

  const sourceTasksFromLS: typeOfTaskObject[] = JSON.parse(localStorage.getItem(source) || "");

  let arrayWithoutMovedElement: typeOfTaskObject[] = [];

  let elementToMove: typeOfTaskObject = {
    id: "2",
    state: "2",
    title: "2",
    description: "2",
    category: "2",
  };

  sourceTasksFromLS.forEach((element: typeOfTaskObject) => {
    if (element.id == idToSearch) {
      elementToMove = element;

      arrayWithoutMovedElement = sourceTasksFromLS.filter((el) => {
        return el.id != idToSearch;
      });
    }
  });

  localStorage.setItem(source, JSON.stringify(arrayWithoutMovedElement));
  setArray(source, setNewTasks, setInProgressTasks, setCompletedTasks, arrayWithoutMovedElement);

  moveTaskToDestination( destination, elementToMove, setNewTasks, setInProgressTasks, setCompletedTasks);
};

export const moveTaskToDestination = (
  destination: string,
  elementToMove: typeOfTaskObject,
  setNewTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>,
  setInProgressTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>,
  setCompletedTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>
) => {
  // agregamos el elemento al array destination
  const isDestinationInLocalS: typeOfTaskObject[] = JSON.parse(localStorage.getItem(destination) || "[]");
  //si no hay nada en el destination array en el ls
  if (isDestinationInLocalS && isDestinationInLocalS.length > 0) {
    //TODO: actualizar el LS cada vez que se actualizan los arrays para evitar estar seteando tanto los arrays

    //actualizar el localS
    isDestinationInLocalS.push(elementToMove);
    localStorage.setItem(destination, JSON.stringify(isDestinationInLocalS));

    //actualizar array para la parte visual

    setArray(destination, setNewTasks,setInProgressTasks, setCompletedTasks, isDestinationInLocalS);
  } else {
    let temp = [elementToMove];
    localStorage.setItem(destination, JSON.stringify(temp));

    setArray(destination, setNewTasks, setInProgressTasks, setCompletedTasks, temp);
  }
};

const setArray = (
  name: string,
  setNewTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>,
  setInProgressTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>,
  setCompletedTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>,
  valueToSave: typeOfTaskObject[]
) => {
  if (name == "newTasks") {
    setNewTasks(valueToSave);
  } else if (name == "inProgressTasks") {
    setInProgressTasks(valueToSave);
  } else if (name == "completedTasks") {
    setCompletedTasks(valueToSave);
  }
};
