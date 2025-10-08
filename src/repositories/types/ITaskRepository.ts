import { typeOfInputValues } from "../../Types/inputValues";
import { ITask } from "../../Types/task";

export interface ITaskRepository {
  getAllTasks(): Promise<{ newTasks: ITask[]; inProgressTasks: ITask[]; completedTasks: ITask[] }>;
  addTask(task: ITask): Promise<void>;
  updateTask(editableValue: typeOfInputValues, task: ITask): Promise<void | ITask[]>;
  deleteTask(task: ITask): Promise<ITask[]>;
}
