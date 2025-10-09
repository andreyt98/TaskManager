import { ITask } from "../Types/task";

export const categories = [
  { id: 1, category_name: "Work" },
  { id: 2, category_name: "School" },
  { id: 3, category_name: "Family" },
  { id: 4, category_name: "Pet" },
  { id: 5, category_name: "Chill time" },
  { id: 6, category_name: "Hobbies" },
  { id: 7, category_name: "Business" },
  { id: 8, category_name: "Chores" },
  { id: 9, category_name: "Study" },
  { id: 10, category_name: "Errands" },
  { id: 11, category_name: "Workout" },
  { id: 12, category_name: "Friends" },
  { id: 13, category_name: "Events" },
  { id: 14, category_name: "Vacations" },
];
export const saveToLocalStorage = (nameOfItem: string, arrayToSave: ITask[]) => {
  localStorage.setItem(nameOfItem, JSON.stringify(arrayToSave));
};
