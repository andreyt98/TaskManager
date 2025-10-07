import { createSlice } from "@reduxjs/toolkit";

export const UISlice = createSlice({
  name: "UISlice",
  initialState: {
    showTaskModal: false,
  },

  reducers: {
    setShowTaskModal: (state, action) => {
      state.showTaskModal = action.payload;
    },
  },
});

export const { setShowTaskModal } = UISlice.actions;
export default UISlice.reducer;
