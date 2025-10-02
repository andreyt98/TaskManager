import { ITask } from "../Types/task";
import { typeOfInputValues } from "./submitTask";




export const editTask = (editableValue: typeOfInputValues, task: ITask): Promise<ITask[]> => {
  if (localStorage.length === 0 || !localStorage.getItem(task.status)) {
    return Promise.reject({ reason: { id: 0, text: "No task in this list, UI updated..." } });
  }

  try {
    let resultArray: ITask[] = [];

    const arrayFromLSToEdit = localStorage[task.status];

    if (JSON.parse(arrayFromLSToEdit).length > 0) {
      let modifiedObject: ITask;

      JSON.parse(arrayFromLSToEdit).forEach((taskObject: ITask) => {
        if (taskObject.id == task.id) {
          modifiedObject = taskObject;
          modifiedObject.title = editableValue.title;
          modifiedObject.description = editableValue.description;
          modifiedObject.category = editableValue.category;
          resultArray = JSON.parse(arrayFromLSToEdit).filter((element: ITask) => {
            return element.id != task.id;
          });

          resultArray.push(modifiedObject);
          localStorage.setItem(task.status, JSON.stringify(resultArray));
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
