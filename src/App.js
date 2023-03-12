import React from "react";
import Expenses from "./components/Expenses/Expenses";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import ExpensesProvider from "./store/ExpensesProvider";
import MainHeader from "./components/Layout/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import { showHideActions } from "./store/redux/show-hide-slice";

const App = () => {
  const newFormIsVisible = useSelector((state) => state.showHide.showNewForm);
  const dispatch = useDispatch();

  const showExpenseFormHandler = () => {
    dispatch(showHideActions.setShowNewForm(true));
  };

  const hideExpenseFormHandler = () => {
    dispatch(showHideActions.setShowNewForm(false));
  };

  return (
    <ExpensesProvider>
      <MainHeader onShowNew={showExpenseFormHandler} />
      {newFormIsVisible && (
        <ExpenseForm
          onClose={hideExpenseFormHandler}
          buttonText="Create Expense"
          title="Create New Expense"
        />
      )}
      <Expenses />
    </ExpensesProvider>
  );
};

export default App;
