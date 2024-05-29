import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

type InitialStateProps = {
  isLoading: boolean;
  loadError: boolean;
}

const initialState: InitialStateProps = {
  isLoading: false,
  loadError: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setLoadError(state, action: PayloadAction<boolean>) {
      state.loadError = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export const selectIsLoading = (state: RootState) => state.loading.isLoading;
export const selectLoadError = (state: RootState) => state.loading.loadError;
export default loadingSlice.reducer;
