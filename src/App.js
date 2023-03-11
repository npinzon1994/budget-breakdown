import "./App.css";
import React, { useState } from "react";
import DailyExpenses from "./components/DailyExpenses/DailyExpenses";
import Header from "./components/Layout/Header";
import DailyExpenseForm from "./components/DailyExpenses/DailyExpenseForm";
import ExpensesProvider from "./context/ExpensesProvider";
import Footer from "./components/Layout/Footer";

const App = () => {
  const [expenseFormIsVisible, setExpenseFormIsVisible] = useState(false);
  const [editFormIsVisible, setEditFormIsVisible] = useState(false);

  const showExpenseFormHandler = () => {
    setExpenseFormIsVisible(true);
  };

  const hideExpenseFormHandler = () => {
    setExpenseFormIsVisible(false);
  };


  const showEditFormHandler = () => {
    setEditFormIsVisible(true);
  };

  const hideEditFormHandler = () => {
    setEditFormIsVisible(false);
  };

  return (
    <ExpensesProvider>
      {expenseFormIsVisible && (
        <DailyExpenseForm
          onClose={hideExpenseFormHandler}
          buttonText="Create Expense"
          title="Create New Expense"
        />
      )}
      {editFormIsVisible && <DailyExpenseForm 
        onClose={hideEditFormHandler}
        buttonText="Save"
        title="Edit Expense"
        mode="edit"
      />}
      <DailyExpenses onShowNew={showExpenseFormHandler} onShowEdit={showEditFormHandler} />
      {/* <Footer /> */}
    </ExpensesProvider>
  );
};

export default App;
