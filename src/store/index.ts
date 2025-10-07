import { configureStore } from "@reduxjs/toolkit";
import UISliceReducer from "./slices/UISlice";
import taskSliceReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    ui: UISliceReducer,
    taskSlice: taskSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
