import React from "react";
import classes from "./ControlCenter.module.css";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { showHideActions } from "../../store/redux/show-hide-slice";
import { filterActions } from "../../store/redux/filter-slice";
import ExpenseFilter from "../Expenses/ExpenseFilter";
import NumberOfExpenses from "../Expenses/NumberOfExpenses";

const ControlCenter = ({
  indexOfFirstRecord,
  indexOfLastRecord,
  numItems,
  numPages,
  currentPage,
  setCurrentPage,
  currentRecords,
}) => {
  const dispatch = useDispatch();

  const filterExpenses = (state) => {
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
          onClick={showExpenseFormHandler}
          tooltip="Create New Expense"
        />
      </div>
      <NumberOfExpenses
        indexOfFirstRecord={indexOfFirstRecord}
        indexOfLastRecord={indexOfLastRecord}
        numItems={numItems}
        numPages={numPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentRecords={currentRecords}
      />
    </div>
  );
};

export default ControlCenter;
