import "./App.css";
import React, { useState } from "react";
import DailyExpenses from "./components/DailyExpenses/DailyExpenses";
import Header from "./components/Layout/Header";
import NewDailyExpenseForm from "./components/DailyExpenses/NewDailyExpenseForm";

import ExpensesProvider from "./context/ExpensesProvider";

const App = () => {
  const [expenseFormIsVisible, setExpenseFormIsVisible] = useState(false);

  const showExpenseFormHandler = () => {
    setExpenseFormIsVisible(true);
  };

  const hideExpenseFormHandler = () => {
    setExpenseFormIsVisible(false);
  };

  return (
    <ExpensesProvider>
      {expenseFormIsVisible && (
        <NewDailyExpenseForm onClose={hideExpenseFormHandler} />
      )}
      <Header onShow={showExpenseFormHandler} />
      <DailyExpenses />
    </ExpensesProvider>
  );
};

export default App;
