import React from "react";
import classes from "./ControlCenter.module.css";
import NewExpenseButton from "../UI/NewExpenseButton";
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
        <NewExpenseButton
          onShowNew={showExpenseFormHandler}
          tooltip="Create New Expense"
        />
        <ExpenseFilter onFilter={filterExpenses} />
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
