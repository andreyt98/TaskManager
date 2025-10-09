import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userExists = "unknown" | "on" | "off";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authState: "on",
  },
  reducers: {
    setAuthState: (state, action: PayloadAction<userExists>) => {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
