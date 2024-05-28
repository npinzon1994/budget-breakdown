import { FC } from "react";
import classes from "./ControlCenter.module.css";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../store/redux/hooks";
import { selectFilterState } from "../../store/redux/filter-slice";
import { showHideActions } from "../../store/redux/show-hide-slice";
import { filterActions } from "../../store/redux/filter-slice";
import ExpenseFilter from "../Expenses/ExpenseFilter";
import NumberOfExpenses from "../Expenses/NumberOfExpenses";
import { Expense } from "../../models/expense";

type ControlCenterProps = {
  indexOfFirstRecord: number;
  indexOfLastRecord: number;
  numItems: number;
  numPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentRecords: Expense[];
}

const ControlCenter: FC<ControlCenterProps> = ({
  indexOfFirstRecord,
  indexOfLastRecord,
  numItems,
  numPages,
  currentPage,
  setCurrentPage,
  currentRecords,
}) => {
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
