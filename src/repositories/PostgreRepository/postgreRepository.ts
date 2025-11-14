import { ITask } from "../../Types/task";
import { ITaskRepository } from "../types/ITaskRepository";
import { API_BASE_URL, API_ENDPOINTS } from "../../constants";
export const postgreRepository: ITaskRepository = {
  async addTask(task) {
    const request = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TASKS.ADD}`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ← fundamental
      },
      body: JSON.stringify(task),
    });

    const response = await request.json();
  },

  async getAllTasks() {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TASKS.GET}`, { mode: "cors" });

    const json = await response.json();
    let data: ITask[] = [];

    const newTasks: ITask[] = [];
    const inProgressTasks: ITask[] = [];
    const completedTasks: ITask[] = [];

    if (response.ok) {
      data = json.map((element: unknown) => {
        const task = element as { id: number; title: string; description: string; task_status: { id: number; status: string }; task_categories: { category_name: string }; created_at: Date };
        const { id, title, description, task_categories, task_status, created_at } = task;

        const taskObject = {
          id,
          title,
          description,
          category: task_categories,
          status: task_status,
          created_at,
        };

        return taskObject;
      });

      data.forEach((element) => {
        switch (element.status.id) {
          case 1: //new
            newTasks.push(element);

            break;
          case 2: //inprogress
            inProgressTasks.push(element);

            break;
          case 3: //completed
            completedTasks.push(element);

            break;
        }
      });
    }
    return { newTasks, inProgressTasks, completedTasks };
  },
  async updateTask(task) {
    const request = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TASKS.UPDATE(task.id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const response = await request.json();
  },

  async deleteTask(task_Id: number) {
    const request = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TASKS.DELETE(task_Id)}`, {
      method: "DELETE",
    });
    const response = await request.json();
    return response;
  },
};

export async function getTasksCategories() {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TASKS.GET_CATEGORIES}`, { mode: "cors" });
  const json = await response.json();
  return json; // <- clave: nunca retornes undefined
}
