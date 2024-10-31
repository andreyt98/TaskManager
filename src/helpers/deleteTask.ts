import { typeOfTaskObject } from "./submitTask";

export const deleteTask = (task: typeOfTaskObject): Promise<typeOfTaskObject[]> => {
  if (localStorage.length === 0 || !localStorage.getItem(task.state)) {
    return Promise.reject({ reason: { id: 0, text: "No task in this list, UI updated..." } });
  }

  try {
    let resultArray: typeOfTaskObject[] = [];

    const arrayFromLSToDelete = localStorage[task.state];

    if (JSON.parse(arrayFromLSToDelete).length > 0) {
      JSON.parse(arrayFromLSToDelete).forEach((taskObject: typeOfTaskObject) => {
        if (taskObject.id == task.id) {
          resultArray = JSON.parse(arrayFromLSToDelete).filter((element: typeOfTaskObject) => {
            return element.id != task.id;
          });
          localStorage.setItem(task.state, JSON.stringify(resultArray));
        }
      });
    } else {
      return Promise.reject({ reason: { id: 0, text: "Task list was already empty, UI updated..." } });
    }

    return Promise.resolve(resultArray);
  } catch (error) {
    throw error;
  }
};
