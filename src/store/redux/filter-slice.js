import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterState: "Show All",
  filteredItems: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterState(state, action) {
      state.filterState = action.payload;
    },
    setFilteredItems(state, action) {
      state.filteredItems = action.payload;
    },
    
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
