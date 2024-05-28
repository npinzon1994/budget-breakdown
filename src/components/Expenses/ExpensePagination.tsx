import { useContext, FC } from "react";
import classes from "./ExpensePagination.module.css";
import ExpenseContext from "../../context/expense-context";
import { useAppSelector } from "../../redux-store/hooks";
import { ReactComponent as ArrowIcon } from "../../assets/arrow-rounded-corners.svg";
import { filterItems } from "../../util/filter";
import { ExpensePaginationContext } from "../../context/expense-pagination-context";

const ExpensePagination: FC = () => {
  const filterState = useAppSelector((state) => state.filter.filterState);
  const expenseContext = useContext(ExpenseContext);
  const filteredItems = filterItems(expenseContext.items, filterState);

  const {
    firstRecordIndex,
    lastRecordIndex,
    numItems,
    numPages,
    currentPage,
    setCurrentPage,
    currentRecords,
  } = useContext(ExpensePaginationContext);

  //index of the last record -- accounts for if page has < 10 items
  const lastIndex = currentRecords.length < 10 ? numItems : lastRecordIndex;

  const noExpenses = filteredItems.length === 0;
  const displayEmptyPageCount = "0—0 of 0";
  const displayNormalPageCount = `${
    firstRecordIndex + 1
  }—${lastIndex} of ${numItems}`;

  const onFirstPage = !(numPages > 0 && currentPage !== 1);
  const onLastPage = !(numPages > 0 && currentPage !== numPages);

  const goUpOnePage = () => {
    if (numPages > 0 && currentPage !== numPages) {
      setCurrentPage(currentPage + 1);
    }
    console.log("GOING UP!!");
  };

  const goBackOnePage = () => {
    if (numPages > 0 && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    console.log("GOING DOWN!!");
  };

  return (
    <div className={classes.container}>
      <span className={classes.numbers}>
        {noExpenses ? displayEmptyPageCount : displayNormalPageCount}
      </span>
      <div className={classes["button-container"]}>
        <button
          className={`${classes.button} ${
            onFirstPage || noExpenses ? classes["disabled-button"] : ""
          }`}
          onClick={goBackOnePage}
          disabled={onFirstPage || noExpenses}
          style={{paddingRight: "7px"}}
          data-tooltip="Older"
        >
          <ArrowIcon
            className={`${classes.image} ${classes.left} ${
              onFirstPage || noExpenses ? classes["disabled-image"] : ""
            }`}
          />
        </button>
        <button
          className={`${classes.button} ${
            onLastPage || noExpenses ? classes["disabled-button"] : ""
          }`}
          onClick={goUpOnePage}
          disabled={onLastPage || noExpenses}
          style={{paddingLeft: "7px"}}
          data-tooltip="Newer"
        >
          <ArrowIcon
            className={`${classes.image} ${classes.right} ${
              onLastPage || noExpenses ? classes["disabled-image"] : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ExpensePagination;
