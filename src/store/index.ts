import { configureStore } from "@reduxjs/toolkit";
import UISliceReducer from "./slices/UISlice";
import taskSliceReducer from "./slices/taskSlice";
import authSliceReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    ui: UISliceReducer,
    taskSlice: taskSliceReducer,
    auth: authSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
