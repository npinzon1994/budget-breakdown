import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

type InitialStateType = {
  showNewForm: boolean;
  showEditForm: boolean;
  showDeleteModal: boolean;
  showNewAccountModal: boolean;
};

const initialState: InitialStateType = {
  showNewForm: false,
  showEditForm: false,
  showDeleteModal: false,
  showNewAccountModal: false,
};

const showHideSlice = createSlice({
  name: "showHide",
  initialState,
  reducers: {
    setShowNewForm(state, action: PayloadAction<boolean>) {
      state.showNewForm = action.payload;
    },
    setShowEditForm(state, action: PayloadAction<boolean>) {
      state.showEditForm = action.payload;
    },
    setShowDeleteModal(state, action: PayloadAction<boolean>) {
      state.showDeleteModal = action.payload;
    },
    setShowNewAccountModal(state, action: PayloadAction<boolean>) {
      state.showNewAccountModal = action.payload;
    },
  },
});

export const showHideActions = showHideSlice.actions;
export const selectShowNewForm = (state: RootState) =>
  state.showHide.showNewForm;
export const selectShowEditForm = (state: RootState) =>
  state.showHide.showEditForm;
export const selectShowDeleteModal = (state: RootState) =>
  state.showHide.showDeleteModal;
export const selectShowNewAccountModal = (state: RootState) =>
  state.showHide.showNewAccountModal;
export default showHideSlice.reducer;
