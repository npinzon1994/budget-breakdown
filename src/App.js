import "./App.css";
import React, { useState } from "react";
import DailyExpenses from "./components/DailyExpenses/DailyExpenses";
import Header from "./components/Layout/Header";
import NewDailyExpenseForm from "./components/DailyExpenses/NewDailyExpenseForm";

import ExpensesProvider from "./context/ExpensesProvider";
import DailyExpenseHeader from "./components/Layout/DailyExpenseHeader";

const App = () => {
  const [expenseFormIsShown, setExpenseFormIsShown] = useState(false);

  const showExpenseFormHandler = () => {
    setExpenseFormIsShown(true);
  };

  const hideExpenseFormHandler = () => {
    setExpenseFormIsShown(false);
  };

  return (
    <ExpensesProvider>
      {expenseFormIsShown && (
        <NewDailyExpenseForm onClose={hideExpenseFormHandler} />
      )}
      <Header onShow={showExpenseFormHandler} />
      <DailyExpenseHeader />
      <DailyExpenses />
    </ExpensesProvider>
  );
};

export default App;
