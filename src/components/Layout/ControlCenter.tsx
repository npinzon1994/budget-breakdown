import { FC, useContext } from "react";
import classes from "./ControlCenter.module.css";
import Button from "../UI/Buttons/Button";
import { useAppDispatch } from "../../lib/store/hooks";
import { showHideActions } from "../../lib/store/show-hide-slice";
import { filterActions } from "../../lib/store/filter-slice";
import ExpenseFilter from "../Expenses/ExpenseFilter";
import ExpensePagination from "../Expenses/ExpensePagination";
import { ExpensePaginationContext } from "../../context/expense-pagination-context";

const ControlCenter: FC = () => {
  const { currentPage, setCurrentPage } = useContext(ExpensePaginationContext);

  const dispatch = useAppDispatch();

  const filterExpenses = (state: string) => {
    dispatch(filterActions.setFilterState(state));
    if (currentPage !== 1) setCurrentPage(1);
  };

  const showExpenseFormHandler = () => {
    dispatch(showHideActions.setShowNewForm(true));
  };

  return (
    <div className={classes.header}>
      <div className={classes["actions-container"]}>
        <ExpenseFilter onFilter={filterExpenses} />
        <Button
          className={classes["add-expense"]}
          tooltip="Create New Expense"
          onClick={showExpenseFormHandler}
        >
          Add
        </Button>
      </div>
      <ExpensePagination />
    </div>
  );
};

export default ControlCenter;
