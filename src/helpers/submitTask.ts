import { Dispatch, SetStateAction } from "react";

export type typeOfInputValues = {
    title: string,
    description: string,
    category: string
}

export type typeOfTaskObject = {
    id: string,
    state: string,
    title: string,
    description: string,
    category: string    
}

export const submitTask = (inputValues: typeOfInputValues, newTasks: typeOfTaskObject[] = [], setNewTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>) => {    

    if(inputValues.title == "" || inputValues.description==""){
      return;
    }

    const newTaskObj: typeOfTaskObject = {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      state: "new",
      title: inputValues.title,
      description: inputValues.description,
      category: inputValues.category,
    };

    let newTaskArray: typeOfTaskObject[];

    if (newTasks.length < 1) {
      newTaskArray = [newTaskObj];
    } else {
      newTaskArray = [...newTasks, newTaskObj];
    }
    setNewTasks(newTaskArray);
    localStorage.setItem("newTasks", JSON.stringify(newTaskArray));

}