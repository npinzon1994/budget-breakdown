import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../../models/expense";
import { RootState } from "./index";

type InitialStateType = {
  filterState: string;
  filteredItems: Expense[];
};

const initialState: InitialStateType = {
  filterState: "Show All",
  filteredItems: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterState(state, action: PayloadAction<string>) {
      state.filterState = action.payload;
    },
    setFilteredItems(state, action: PayloadAction<Expense[]>) {
      state.filteredItems = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;
export const selectFilteredItems = (state: RootState) => state.filter.filteredItems;
export const selectFilterState = (state: RootState) => state.filter.filterState;
export default filterSlice.reducer;
