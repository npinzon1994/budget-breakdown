import "./App.css";
import DailyExpenses from "./components/DailyExpenses/DailyExpenses";
import Header from "./components/Layout/Header";
import NewDailyExpenseForm from "./components/DailyExpenses/NewDailyExpenseForm";
import { useState } from "react";
import ExpensesProvider from "./context/ExpensesProvider";

const App = () => {
  const [expenseFormIsShown, setExpenseFormIsShown] = useState(false);

  const showExpenseFormHandler = () => {
    setExpenseFormIsShown(true);
  }

  const hideExpenseFormHandler = () => {
    setExpenseFormIsShown(false);
  }
  
  return (
    <ExpensesProvider>
      {expenseFormIsShown && <NewDailyExpenseForm onClose={hideExpenseFormHandler}/>}
      <Header onShow={showExpenseFormHandler}/>
      <DailyExpenses/>
    </ExpensesProvider>
  );
};

export default App;
