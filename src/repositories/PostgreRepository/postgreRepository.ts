import { ITask } from "../../Types/task";
import { ITaskRepository } from "../types/ITaskRepository";

export const postgreRepository: ITaskRepository = {
  async addTask(task) {
    // console.log(task);

    const req = await fetch("http://127.0.0.1:3000/api/tasks", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ← fundamental
      },
      body: JSON.stringify(task),
    });

    const resp = await req.json();
    console.log("response del backend desde el front es ", resp);
  },

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

export async function getTasksCategories() {
  const response = await fetch("http://127.0.0.1:3000/api/tasks/categories", { mode: "cors" });
  const json = await response.json();
  // if (response.ok) console.log("todo bien en las categories ", json);
  return json; // <- clave: nunca retornes undefined
}
