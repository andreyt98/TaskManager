import { ITask } from "../../Types/task";

export interface ITaskRepository {
  getAllTasks(): Promise<{ newTasks: ITask[]; inProgressTasks: ITask[]; completedTasks: ITask[] }>;
  addTask(task: ITask): Promise<void>;
  updateTask(task: ITask): Promise<void | ITask[]>;
  deleteTask(task_Id: number): Promise<ITask[]>;
}
