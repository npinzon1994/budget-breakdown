import "./App.css";
import DailyExpenses from "./components/DailyExpenses";
import MenuHeader from "./components/Layout/MenuHeader";
import RemainingBalanceHeader from "./components/Layout/RemainingBalanceHeader";
import DailyExpense from "./components/DailyExpense";

const App = () => {
  return (
    <div>
      <MenuHeader />
      <RemainingBalanceHeader />
      

      <DailyExpenses />
      {console.log("after DailyExpenseHeader AND DailyExpenses")}
    </div>
  );
};

export default App;
