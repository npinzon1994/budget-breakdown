import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

type InitialStateProps = {
  uniqueId: number;
};

const initialState: InitialStateProps = {
  uniqueId: 0,
};

const uniqueIdSlice = createSlice({
  name: "uniqueId",
  initialState,
  reducers: {
    incrementIdCounter(state) {
      state.uniqueId = state.uniqueId + 1;
    },
  },
});

export const uniqueIdActions = uniqueIdSlice.actions;
export const selectUniqueId = (state: RootState) => state.uniqueId.uniqueId;
export default uniqueIdSlice.reducer;
