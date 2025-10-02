import { ITask } from "../Types/task";

export const deleteTask = (task: ITask): Promise<ITask[]> => {
  if (localStorage.length === 0 || !localStorage.getItem(task.status)) {
    return Promise.reject({ reason: { id: 0, text: "No task in this list, UI updated..." } });
  }

  try {
    let resultArray: ITask[] = [];

    const arrayFromLSToDelete = localStorage[task.status];

    if (JSON.parse(arrayFromLSToDelete).length > 0) {
      JSON.parse(arrayFromLSToDelete).forEach((taskObject: ITask) => {
        if (taskObject.id == task.id) {
          resultArray = JSON.parse(arrayFromLSToDelete).filter((element: ITask) => {
            return element.id != task.id;
          });
          localStorage.setItem(task.status, JSON.stringify(resultArray));
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
