import { typeOfTaskObject } from "./submitTask";

export const deleteTask = (task: typeOfTaskObject): Promise<typeOfTaskObject[]> => {
  try {
    if (localStorage.length > 0) {
      let resultArray: typeOfTaskObject[] = [];

      const taskExistsInLS = Object.keys(localStorage).includes(task.state);

      if (taskExistsInLS) {
        const arrayFromLSToDelete = localStorage[task.state];

        if (arrayFromLSToDelete && JSON.parse(arrayFromLSToDelete).length > 0) {
          JSON.parse(arrayFromLSToDelete).forEach((taskObject: typeOfTaskObject) => {
            if (taskObject.id == task.id) {
              resultArray = JSON.parse(arrayFromLSToDelete).filter((element: typeOfTaskObject) => {
                return element.id != task.id;
              });
              localStorage.setItem(task.state, JSON.stringify(resultArray));
              return Promise.resolve(resultArray);
            } else {
              return Promise.reject("id not present in data");
            }
          });
        } else {
          return Promise.reject({ reason: { id: 0, text: "Task list was already empty, UI updated..." } });
        }
      } else {
        return Promise.reject({ reason: { id: 0, text: "No data in localstorage related to our app, UI updated..." } });
      }

      return Promise.resolve(resultArray);
    } else {
      return Promise.reject("no data in localstorage");
    }
  } catch (error) {
    throw error;
  }
};
