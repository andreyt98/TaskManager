import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../Types/task";

interface TaskState {
  newTasks: ITask[];
  inProgressTasks: ITask[];
  completedTasks: ITask[];
  activeTaskValues: ITask;
}

const initialState: TaskState = {
  newTasks: [],
  inProgressTasks: [],
  completedTasks: [],
  activeTaskValues: {
    id: 0,
    user_id: 0,
    status: { id: 1, status: "new" },
    title: "",
    description: "",
    category: { id: 0, category_name: "" },
  },
};

export const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    setNewTasks: (state: TaskState, action: PayloadAction<ITask[] | []>) => {
      state.newTasks = action.payload;
    },
    setInProgressTasks: (state: TaskState, action: PayloadAction<ITask[] | []>) => {
      state.inProgressTasks = action.payload;
    },
    setCompletedTasks: (state: TaskState, action: PayloadAction<ITask[] | []>) => {
      state.completedTasks = action.payload;
    },
    setActiveTaskValues: (state: TaskState, action) => {
      state.activeTaskValues = action.payload;
    },
  },
});

export const { setNewTasks, setInProgressTasks, setCompletedTasks, setActiveTaskValues } = taskSlice.actions;

export default taskSlice.reducer;
