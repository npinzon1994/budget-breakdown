import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPageCount: 1,
  recordsPerPage: 10,
  currentPage: [],
  

  
  pages: [],
  pageCounter: 0,
  lowerBound: 1,
  upperBound: 0
};

const pagesSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    
    setRecordsPerPage (state, action) {
      state.recordsPerPage = action.payload;
    },
    setCurrentPageCount(state, action) {
      state.currentPageCount = action.payload;
    },
    incrementPage(state) {
      state.currentPageCount = state.currentPageCount + 1;
    },
    decrementPage(state) {
      state.currentPageCount = state.currentPageCount - 1;
    },


    setPages(state, action) {
      state.pages = action.payload;
    },
    addPage(state, action) {
      state.pages = [...state.pages, action.payload];
    },
    
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    resetPage(state) {
      state.pageCounter = 0;
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
