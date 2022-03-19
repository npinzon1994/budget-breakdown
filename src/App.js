import "./App.css";
import DailyExpenses from "./components/DailyExpenses/DailyExpenses";
import MenuHeader from "./components/Layout/MenuHeader";
import RemainingBalanceHeader from "./components/Layout/RemainingBalanceHeader";
import DailyExpense from "./components/DailyExpenses/DailyExpense";
import NewDailyExpenseForm from "./components/DailyExpenses/NewDailyExpenseForm";
import { useState } from "react";

const App = () => {
  const [expenseFormIsShown, setExpenseFormIsShown] = useState(false);

  const showExpenseFormHandler = () => {
    setExpenseFormIsShown(true);
  }

  const hideExpenseFormHandler = () => {
    setExpenseFormIsShown(false);
  }
  
  return (
    <div>
      {expenseFormIsShown && <NewDailyExpenseForm onClose={hideExpenseFormHandler}/>}
      <MenuHeader onShow={showExpenseFormHandler}/>
      <RemainingBalanceHeader />
      <DailyExpenses />
    </div>
  );
};

export default App;
