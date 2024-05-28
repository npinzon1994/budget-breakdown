export function filterItems(expenses, filterState) {
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
