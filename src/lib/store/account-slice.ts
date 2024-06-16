import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Account from "src/models/account";
import Transaction from "src/models/transaction";
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
    setTransactions(state, action: PayloadAction<Transaction[] | null>) {
      if (state.currentAccount) {
        state.currentAccount.transactions = action.payload;
      }
    },
  },
});

export const accountActions = accountSlice.actions;
export const selectCurrentAccount = (state: RootState) =>
  state.account.currentAccount;
export default accountSlice.reducer;
