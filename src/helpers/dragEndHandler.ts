import { DropResult } from "react-beautiful-dnd";
import { Dispatch, SetStateAction } from "react";
import { ITask } from "../Types/task";
import { isValidStatus, convertStatus, taskStatus } from "../repositories/localStorageRepository/localStorageRepository";

export const dragEndHandler = (
  result: DropResult,
  setNewTasks: Dispatch<SetStateAction<ITask[] | []>>,
  setInProgressTasks: Dispatch<SetStateAction<ITask[] | []>>,
  setCompletedTasks: Dispatch<SetStateAction<ITask[] | []>>
) => {
  if (!result.destination) {
    return;
  }

  const source: string = result.source.droppableId;
  const destination: taskStatus = isValidStatus(result.destination.droppableId);

  const idToSearch: string = result.draggableId;

  const sourceTasksFromLS: ITask[] = JSON.parse(localStorage.getItem(source) || "");

  let arrayWithoutMovedElement: ITask[] = [];

  let elementToMove: ITask = {
    id: 0,
    status: "new",
    title: "",
    description: "",
    category: "",
  };

  sourceTasksFromLS.forEach((element: ITask) => {
    if (element.id.toString() == idToSearch) {
      elementToMove = element;

      arrayWithoutMovedElement = sourceTasksFromLS.filter((el) => {
        return el.id.toString() != idToSearch;
      });
    }
  });

  localStorage.setItem(source, JSON.stringify(arrayWithoutMovedElement));
  updateUIStateArrays(source, setNewTasks, setInProgressTasks, setCompletedTasks, arrayWithoutMovedElement);
  elementToMove.status = destination;

  moveTaskToDestination(convertStatus(destination), elementToMove, setNewTasks, setInProgressTasks, setCompletedTasks);
};

export const moveTaskToDestination = (
  destinationName: string,
  elementToMove: ITask,
  setNewTasks: Dispatch<SetStateAction<ITask[]>>,
  setInProgressTasks: Dispatch<SetStateAction<ITask[]>>,
  setCompletedTasks: Dispatch<SetStateAction<ITask[]>>
) => {
  // agregamos el elemento al array destination
  const destinationArrayLS: ITask[] = JSON.parse(localStorage.getItem(destinationName) || "[]");
  //si no hay nada en el destination array en el ls
  if (destinationArrayLS && destinationArrayLS.length > 0) {
    destinationArrayLS.push(elementToMove);
    localStorage.setItem(destinationName, JSON.stringify(destinationArrayLS));

    updateUIStateArrays(destinationName, setNewTasks, setInProgressTasks, setCompletedTasks, destinationArrayLS);
  } else {
    let temp = [elementToMove];
    localStorage.setItem(destinationName, JSON.stringify(temp));

    updateUIStateArrays(destinationName, setNewTasks, setInProgressTasks, setCompletedTasks, temp);
  }
};

const updateUIStateArrays = (
  name: string,
  setNewTasks: Dispatch<SetStateAction<ITask[]>>,
  setInProgressTasks: Dispatch<SetStateAction<ITask[]>>,
  setCompletedTasks: Dispatch<SetStateAction<ITask[]>>,
  valueToSave: ITask[]
) => {
  if (name == "newTasks") {
    setNewTasks(valueToSave);
  } else if (name == "inProgressTasks") {
    setInProgressTasks(valueToSave);
  } else if (name == "completedTasks") {
    setCompletedTasks(valueToSave);
  }
};
