import { typeOfTaskObject } from "./submitTask";

export const categories = ["Work", "School", "Family", "Pet", "Chill time", "Hobbies", "Business", "Chores", "Study", "Errands", "Workout", "Friends", "Events","Vacations", "No category"];

export const saveToLocalStorage = (nameOfItem: string, arrayToSave: typeOfTaskObject[]) => {
    localStorage.setItem(nameOfItem, JSON.stringify(arrayToSave));
    
}