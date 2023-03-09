import "./App.css";
import React, { useState } from "react";
import DailyExpenses from "./components/DailyExpenses/DailyExpenses";
import Header from "./components/Layout/Header";
import NewDailyExpenseForm from "./components/DailyExpenses/NewDailyExpenseForm";
import ExpensesProvider from "./context/ExpensesProvider";
import Footer from "./components/Layout/Footer";

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
      <DailyExpenses onShow={showExpenseFormHandler}/>
      <Footer />
    </ExpensesProvider>
  );
};

export default App;
