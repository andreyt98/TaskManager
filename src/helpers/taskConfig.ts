import { typeOfTaskObject } from "./submitTask";

export const categories =['Work','School','Family','Pet','Workout','Friends','Events','No category'];

export const saveToLocalStorage = (nameOfItem: string, arrayToSave: typeOfTaskObject[]) => {
    localStorage.setItem(nameOfItem, JSON.stringify(arrayToSave));
    
}