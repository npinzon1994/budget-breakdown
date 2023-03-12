import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loadError: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setLoadError(state, action) {
      state.loadError = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
