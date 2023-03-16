import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pages: [],
  currentPage: [],
  pageCounter: 0,
  lowerBound: 1,
  upperBound: 0
};

const pagesSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPages(state, action) {
      state.pages = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    incrementPage(state) {
      state.pageCounter = state.pageCounter + 1;
    },
    decrementPage(state) {
      state.pageCounter = state.pageCounter - 1;
    },
    setLowerBound(state, action) {
      state.lowerBound = action.payload;
    },
    setUpperBound(state, action) {
      state.upperBound = action.payload;
    },
  },
});

export const pagesActions = pagesSlice.actions;
export default pagesSlice.reducer;
