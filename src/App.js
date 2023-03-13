import React from "react";
import Expenses from "./components/Expenses/Expenses";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import ExpensesProvider from "./store/ExpensesProvider";
import MainHeader from "./components/Layout/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import { showHideActions } from "./store/redux/show-hide-slice";
import NewExpenseButton from "./components/UI/NewExpenseButton";
import DraggableCore from "react-draggable";

const App = () => {
  const newFormIsVisible = useSelector((state) => state.showHide.showNewForm);
  const dispatch = useDispatch();

  const toggleExpenseFormHandler = () => {
    dispatch(showHideActions.setShowNewForm());
  };

  // const hideExpenseFormHandler = () => {
  //   dispatch(showHideActions.setShowNewForm(false));
  // };

  return (
    <ExpensesProvider>
      <MainHeader />
      <NewExpenseButton type="button" onShowNew={toggleExpenseFormHandler}>
        New Expense
      </NewExpenseButton>

      <ExpenseForm
        onClose={toggleExpenseFormHandler}
        buttonText="Create Expense"
        title="Create New Expense"
      />

      <Expenses />
    </ExpensesProvider>
  );
};

export default App;
