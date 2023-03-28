import React, { useContext, useEffect } from "react";
import classes from "./NumberOfExpenses.module.css";
import ExpensesContext from "../../store/expenses-context";
import { useSelector } from "react-redux";
import { ReactComponent as ArrowIcon } from "../../assets/arrow-rounded-corners.svg";
import { filterItems } from "./util/filter";

const NumberOfExpenses = ({
  indexOfFirstRecord,
  indexOfLastRecord,
  numItems,
  numPages,
  currentPage,
  setCurrentPage,
  currentRecords,
}) => {
  const filterState = useSelector((state) => state.filter.filterState);
  const expensesContext = useContext(ExpensesContext);
  const filteredItems = filterItems(expensesContext.items, filterState);

  //index of the last record -- accounts for if page has < 10 items
  const lastIndex = currentRecords.length < 10 ? numItems : indexOfLastRecord;

  const noExpenses = filteredItems.length === 0;
  const displayEmptyPageCount = "0—0 of 0";
  const displayNormalPageCount = `${
    indexOfFirstRecord + 1
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

  useEffect(() => {
    console.log("-------------------------------------------------------");
    console.log("current page:", currentPage);
    console.log("number of pages:", numPages);
    console.log("# of current records", currentRecords.length);
    console.log("Filter State:", filterState);
  }, [currentPage, numPages, currentRecords.length, filterState]);

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
          datatooltip="Older"
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
          datatooltip="Newer"
        >
          <ArrowIcon
            className={`${classes.image} ${classes.right} ${
              onLastPage || noExpenses ? classes["disabled-image"] : ""
            }`}
          />
        </button>
      </div>
      {/* <div>{`Page ${currentPage} of ${numPages}`}</div> */}
    </div>
  );
};

export default NumberOfExpenses;
