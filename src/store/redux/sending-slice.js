import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSending: false,
  sendError: false,
};

const sendingSlice = createSlice({
  name: "sending",
  initialState,
  reducers: {
    setIsSending(state, action) {
      state.isSending = action.payload;
    },
    setSendError(state, action) {
      state.sendError = action.payload;
    },
  },
});

export const sendingActions = sendingSlice.actions;
export default sendingSlice.reducer;
