import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterState: ""
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterState(state, action) {
      state.filterState = action.payload;
    },
    
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
