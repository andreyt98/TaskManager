import { ITask } from "../../Types/task";
import { ITaskRepository } from "../types/ITaskRepository";
import { typeOfInputValues } from "../../Types/inputValues";

export const LocalSTasksNames = {
  new: "newTasks",
  "in progress": "inProgressTasks",
  completed: "completedTasks",
};
export const tasksStatus = {
  newTasks: "new",
  inProgressTasks: "in progress",
  completedTasks: "completed",
};

export type taskStatus = "new" | "in progress" | "completed";

export function isValidStatus(status: string): taskStatus {
  if (status in tasksStatus) {
    let LSstatus = status as keyof typeof tasksStatus;
    return tasksStatus[LSstatus] as taskStatus;
  }

  return "new";
}

export function convertStatus(status: keyof typeof LocalSTasksNames) {
  return LocalSTasksNames[status];
}

export const localStorageRepository: ITaskRepository = {
  async addTask(task: ITask) {
    const { title, status, description, category } = task;

    const LSTasks = JSON.parse(localStorage.getItem("newTasks") || "[]");

    let newTasks: ITask[] = [];

    const newTaskObject = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      title,
      status,
      description,
      category,
    };

    if (LSTasks && LSTasks.length > 0) {
      newTasks = [...LSTasks, newTaskObject];
    } else {
      newTasks = [newTaskObject];
    }

    localStorage.setItem("newTasks", JSON.stringify(newTasks));
  },

  async updateTask(editableValue: typeOfInputValues, task: ITask) {
    if (localStorage.length === 0 || !localStorage.getItem(convertStatus(task.status))) {
      return Promise.reject({ reason: { id: 0, text: "No task in this list, UI updated..." } });
    }

    try {
      let resultArray: ITask[] = [];

      const arrayFromLSToEdit = localStorage[convertStatus(task.status)];

      if (JSON.parse(arrayFromLSToEdit).length > 0) {
        let modifiedObject: ITask;

        JSON.parse(arrayFromLSToEdit).forEach((taskObject: ITask) => {
          if (taskObject.id == task.id) {
            modifiedObject = taskObject;
            modifiedObject.title = editableValue.title;
            modifiedObject.status = taskObject.status;
            modifiedObject.description = editableValue.description;
            modifiedObject.category = editableValue.category;
            resultArray = JSON.parse(arrayFromLSToEdit).filter((element: ITask) => {
              return element.id != task.id;
            });

            resultArray.push(modifiedObject);
            localStorage.setItem(convertStatus(task.status), JSON.stringify(resultArray));
          }
        });
      } else {
        return Promise.reject({ reason: { id: 0, text: "This task was already deleted from the list, UI updated..." } });
      }

      return Promise.resolve(resultArray);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async deleteTask(task: ITask): Promise<ITask[] | void> {
    if (localStorage.length === 0 || !localStorage.getItem(convertStatus(task.status))) {
      return Promise.reject({ reason: { id: 0, text: "No task in this list, UI updated..." } });
    }

    try {
      let resultArray: ITask[] = [];

    const arrayFromLSToDelete = localStorage[convertStatus(task.status)];

      if (JSON.parse(arrayFromLSToDelete).length > 0) {
        JSON.parse(arrayFromLSToDelete).forEach((taskObject: ITask) => {
          if (taskObject.id == task.id) {
            resultArray = JSON.parse(arrayFromLSToDelete).filter((element: ITask) => {
              return element.id != task.id;
            });
            localStorage.setItem(convertStatus(task.status), JSON.stringify(resultArray));
          }
        });
      } else {
        return Promise.reject({ reason: { id: 0, text: "Task list was already empty, UI updated..." } });
      }

      return Promise.resolve(resultArray);
    } catch (error) {
      throw error;
    }
  },
};
