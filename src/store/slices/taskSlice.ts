import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../Types/task";

interface TaskState {
  newTasks: ITask[];
  inProgressTasks: ITask[];
  completedTasks: ITask[];
}

const initialState: TaskState = {
  newTasks: [],
  inProgressTasks: [],
  completedTasks: [],
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
  },
});

export const { setNewTasks, setInProgressTasks, setCompletedTasks } = taskSlice.actions;

export default taskSlice.reducer;
