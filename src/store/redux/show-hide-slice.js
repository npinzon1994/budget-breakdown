import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showNewForm: false,
  showEditForm: false,
  showDeleteModal: false,
};

const showHideSlice = createSlice({
  name: "showHide",
  initialState,
  reducers: {
    setShowNewForm(state, action) {
      state.showNewForm = !state.showNewForm;
    },
    setShowEditForm(state, action) {
      state.showEditForm = action.payload;
    },
    setShowDeleteModal(state, action) {
      state.showDeleteModal = action.payload;
    },
  },
});

export const showHideActions = showHideSlice.actions;
export default showHideSlice.reducer;
