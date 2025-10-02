import { typeOfInputValues } from "../../Types/inputValues";
import { ITask } from "../../Types/task";

export interface ITaskRepository {
  //   getAll(): Promise<ITask[]>;
  //   getById(): Promise<ITask>;
  addTask(task: ITask): Promise<void>;
  updateTask(editableValue: typeOfInputValues, task: ITask): Promise<void | ITask[]>;
  deleteTask(task: ITask): Promise<void | ITask[]>;
}
