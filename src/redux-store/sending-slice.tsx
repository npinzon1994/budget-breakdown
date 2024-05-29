import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

type InitialStateType = {
  isSending: boolean;
  sendError: boolean;
};

const initialState: InitialStateType = {
  isSending: false,
  sendError: false,
};

const sendingSlice = createSlice({
  name: "sending",
  initialState,
  reducers: {
    setIsSending(state, action: PayloadAction<boolean>) {
      state.isSending = action.payload;
    },
    setSendError(state, action: PayloadAction<boolean>) {
      state.sendError = action.payload;
    },
  },
});

export const sendingActions = sendingSlice.actions;
export const selectIsSending = (state: RootState) => state.sending.isSending;
export const selectSendError = (state: RootState) => state.sending.sendError;
export default sendingSlice.reducer;
