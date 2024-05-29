import { FC } from "react";
import ExpensesList from "./components/Expenses/ExpensesList";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import ExpenseProvider from "./context/ExpenseProvider";
import MainHeader from "./components/Layout/MainHeader";
import ControlCenter from "./components/Layout/ControlCenter";
import { useAppDispatch, useAppSelector } from "./redux-store/hooks";
import { showHideActions } from "./redux-store/show-hide-slice";
import { ExpensePaginationProvider } from "./context/expense-pagination-context";

const App: FC = () => {
  const newFormIsVisible = useAppSelector((state) => state.showHide.showNewForm);
  const dispatch = useAppDispatch();

  const hideExpenseFormHandler = () => {
    dispatch(showHideActions.setShowNewForm(false));
  };

  return (
    <ExpenseProvider>
      <ExpensePaginationProvider>
        {newFormIsVisible && (
          <ExpenseForm onClose={hideExpenseFormHandler} title="New Expense" />
        )}
        <MainHeader />
        <ControlCenter />
        <ExpensesList />
      </ExpensePaginationProvider>
    </ExpenseProvider>
  );
};

export default App;
