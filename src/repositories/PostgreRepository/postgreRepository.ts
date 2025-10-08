import { ITask } from "../../Types/task";
import { ITaskRepository } from "../types/ITaskRepository";

export const postgreRepository: ITaskRepository = {
  async addTask(task) {},

  async getAllTasks() {
    const response = await fetch("http://127.0.0.1:3000/api/tasks", { mode: "cors" });

    const json = await response.json();
    let data: ITask[] = [];

    const newTasks: ITask[] = [];
    const inProgressTasks: ITask[] = [];
    const completedTasks: ITask[] = [];

    if (response.ok) {
      data = json.map((element: unknown) => {
        const task = element as { id: number; title: string; description: string; task_status: { status: string }; task_categories: { category_name: string }; created_at: Date };
        const { id, title, description, task_categories, task_status, created_at } = task;

        const taskObject = {
          id,
          title,
          description,
          category: task_categories.category_name,
          status: task_status.status,
          created_at,
        };

        return taskObject;
      });

      data.forEach((element) => {
        switch (element.status) {
          case "new":
            newTasks.push(element);

            break;
          case "in progress":
            inProgressTasks.push(element);

            break;
          case "completed":
            completedTasks.push(element);

            break;
        }
      });
    }
    return { newTasks, inProgressTasks, completedTasks };
  },
  async updateTask(task) {},
  async deleteTask(task) {},
};
