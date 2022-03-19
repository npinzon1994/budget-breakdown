import "./App.css";
import DailyExpenses from './components/DailyExpensesList';
import DailyExpenseHeader from "./components/Layout/DailyExpenseHeader";

const DUMMY_EXPENSES = [
  { id: "a1", amount: 36.16, date: new Date(2022, 3, 18), isPaid: false, merchant: "Wawa" },
  { id: "a2", amount: 19.55, date: new Date(2022, 3, 12), isPaid: false, merchant: "Mobil" },
  { id: "a3", amount: 5.82, date: new Date(2022, 2, 28), isPaid: false, merchant: "Taco Bell" }
];

const App = () => {
  return (
    <div>
      <DailyExpenseHeader />
      
      <DailyExpenses items={DUMMY_EXPENSES}/>
      {console.log('after DailyExpenseHeader AND DailyExpenses')}
    </div>
  );
};

export default App;
