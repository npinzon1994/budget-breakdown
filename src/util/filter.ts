import { Expense } from "../models/transaction";

export function filterItems(expenses: Expense[], filterState: string) {
  let filteredExpenses = [...expenses];

  if (filterState === "Paid Expenses") {
    return (filteredExpenses = filteredExpenses.filter(
      (expense) => expense.isPaid === true
    ));
  }
  if (filterState === "Unpaid Expenses") {
    return (filteredExpenses = filteredExpenses.filter(
      (expense) => expense.isPaid === false
    ));
  }
  return filteredExpenses;
}
