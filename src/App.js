import React from "react";
import Expenses from "./components/Expenses/Expenses";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import ExpensesProvider from "./store/ExpensesProvider";
import MainHeader from "./components/Layout/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import { showHideActions } from "./store/redux/show-hide-slice";
import NewExpenseButton from "./components/UI/NewExpenseButton";
import Modal from "./components/UI/Modal";
import NumberOfExpenses from "./components/Expenses/NumberOfExpenses";

const App = () => {
  const newFormIsVisible = useSelector((state) => state.showHide.showNewForm);
  const dispatch = useDispatch();

  const hideExpenseFormHandler = () => {
    dispatch(showHideActions.setShowNewForm(false));
  };

  return (
    <ExpensesProvider>
      {newFormIsVisible && (
        <ExpenseForm
          onClose={hideExpenseFormHandler}
          buttonText="Create Expense"
          title="Create New Expense"
        />
      )}
      <MainHeader />

      {/* <NewExpenseButton type="button" onShowNew={showExpenseFormHandler}>
        New Expense
      </NewExpenseButton> */}
      <Expenses />
      {/* <NumberOfExpenses /> */}
    </ExpensesProvider>
  );
};

export default App;
