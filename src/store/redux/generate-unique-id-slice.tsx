import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uniqueId: 0
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
export default uniqueIdSlice.reducer;
