
// CREO QUE TODA ESTA FUNCION YA NO LO OCUPO

import { Dispatch, SetStateAction } from "react";
import { ITask } from "../Types/task";

export type typeOfInputValues = {
  title: string;
  description: string;
  category: string;
};

export const submitTask = (inputValues: typeOfInputValues, newTasks: ITask[] = [], setNewTasks: Dispatch<SetStateAction<ITask[]>>) => {
  if (inputValues.title == "" || inputValues.description == "") {
    return;
  }

  const newTaskObj: ITask = {
    id: Math.random() + Date.now(),
    status: "new",
    title: inputValues.title,
    description: inputValues.description,
    category: inputValues.category,
  };

  let newTaskArray: ITask[];

  if (newTasks.length < 1) {
    newTaskArray = [newTaskObj];
  } else {
    newTaskArray = [...newTasks, newTaskObj];
  }
  localStorage.setItem("newTasks", JSON.stringify(newTaskArray));
};
