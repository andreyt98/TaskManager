export interface ITask {
  id: number;
  user_id: number;
  category: { id: number; category_name: string };
  status: {id: number, status:"new" | "in progress" | "completed"};
  title: string;
  description?: string;
  created_at?: string;
}