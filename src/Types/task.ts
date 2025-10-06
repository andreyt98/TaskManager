export interface ITask {
  id: number;
  category: string;
  status: "new" | "in progress" | "completed";
  title: string;
  description?: string;
  created_at?: string;
}
