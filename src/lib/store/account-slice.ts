import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Account from "src/models/account";
import { RootState } from "./index";

type InitialStateType = {
  currentAccount: Account | null;
};

const initialState: InitialStateType = {
  currentAccount: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentAccount(state, action: PayloadAction<Account | null>) {
      state.currentAccount = action.payload;
    },
  },
});

export const accountActions = accountSlice.actions;
export const selectCurrentAccount = (state: RootState) =>
  state.account.currentAccount;
export default accountSlice.reducer;
