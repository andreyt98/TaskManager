import { typeOfInputValues, typeOfTaskObject } from "./submitTask";

export const editTask = (editableValue: typeOfInputValues, task: typeOfTaskObject): Promise<typeOfTaskObject[]> => {
  if (localStorage.length === 0 || !localStorage.getItem(task.state)) {
    return Promise.reject({ reason: { id: 0, text: "No task in this list, UI updated..." } });
  }

  try {
    let resultArray: typeOfTaskObject[] = [];

    const arrayFromLSToEdit = localStorage[task.state];

    if (JSON.parse(arrayFromLSToEdit).length > 0) {
      let modifiedObject: typeOfTaskObject;

      JSON.parse(arrayFromLSToEdit).forEach((taskObject: typeOfTaskObject) => {
        if (taskObject.id == task.id) {
          modifiedObject = taskObject;
          modifiedObject.title = editableValue.title;
          modifiedObject.description = editableValue.description;
          modifiedObject.category = editableValue.category;
          resultArray = JSON.parse(arrayFromLSToEdit).filter((element: typeOfTaskObject) => {
            return element.id != task.id;
          });

          resultArray.push(modifiedObject);
          localStorage.setItem(task.state, JSON.stringify(resultArray));
        }
      });
    } else {
      return Promise.reject({ reason: { id: 0, text: "This task was already deleted from the list, UI updated..." } });
    }

    return Promise.resolve(resultArray);
  } catch (error) {
    throw error;
  }
};
