import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface messageType {
  message: string;
  severity: "error" | "info" | "success" | "warning";
  open: boolean;
}
interface initialStateType {
  showTaskModal: boolean;
  message: messageType;
}
const initialState: initialStateType = {
  showTaskModal: false,
  message: { message: "", severity: "info", open: false },
};

export const UISlice = createSlice({
  name: "UISlice",
  initialState,
  reducers: {
    setShowTaskModal: (state, action) => {
      state.showTaskModal = action.payload;
    },
    setMessage: (state, action: PayloadAction<messageType>) => {
      state.message = action.payload;
    },
  },
});

export const { setShowTaskModal, setMessage } = UISlice.actions;
export default UISlice.reducer;
