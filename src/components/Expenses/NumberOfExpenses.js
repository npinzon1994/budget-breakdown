import React, { useContext, useEffect } from "react";
import classes from "./NumberOfExpenses.module.css";
import leftArrow from "../../assets/left-arrow.svg";
import rightArrow from "../../assets/right-arrow.svg";
import ExpensesContext from "../../store/expenses-context";
import { useDispatch, useSelector } from "react-redux";
import { pagesActions } from "../../store/redux/pages-slice";
import { filterActions } from "../../store/redux/filter-slice";

const NumberOfExpenses = () => {
  const filterState = useSelector((state) => state.filter.filterState);
  const currentPageCount = useSelector((state) => state.pages.pageCounter);
  const lowerBound = useSelector((state) => state.pages.lowerBound);
  const upperBound = useSelector((state) => state.pages.upperBound);
  const expensesContext = useContext(ExpensesContext);
  const dispatch = useDispatch();

  let filteredExpenses = [...expensesContext.items];
  if (filterState === "Paid Expenses") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.isPaid === true
    );
  }
  if (filterState === "Unpaid Expenses") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.isPaid === false
    );
  }

  const numItems = filteredExpenses.length;
  const numPages = Math.ceil(numItems / 10); //in this case, 3 pages

  const pages = [];
  let firstInPage = -10;
  for (let i = 0; i < numPages; i++) {
    if (firstInPage > filteredExpenses.length) {
      break;
    }
    firstInPage += 10;
    const page = [];
    for (let j = firstInPage; j < firstInPage + 10; j++) {
      if (j === filteredExpenses.length) {
        break;
      }

      page.push(filteredExpenses[j]);
    }
    pages.push(page);
  }

  console.log(filteredExpenses);
  console.log(pages);

  //upper bound is either lowerbound + 9 OR numItems
  //if page length < 10, upper bound is numItems

  let upperBoundTemp;
  if (pages[currentPageCount]) {
    if (pages[currentPageCount].length < 10) {
      upperBoundTemp = numItems;
    } else {
      upperBoundTemp = lowerBound + 9;
    }
  }

  useEffect(() => {
    dispatch(filterActions.setFilteredItems(filteredExpenses));
    dispatch(pagesActions.setPages(pages));
    dispatch(pagesActions.setCurrentPage(pages[currentPageCount]));
    dispatch(pagesActions.setLowerBound(1 + currentPageCount * 10));
    console.log('current page count', currentPageCount)
    dispatch(pagesActions.setUpperBound(upperBoundTemp));
  }, [dispatch, pages, filteredExpenses, currentPageCount, upperBoundTemp]);

  useEffect(() => {
    dispatch(pagesActions.resetPage());
  }, [dispatch, filterState])



  const firstPage = filteredExpenses.slice(0, 10);
  console.log("First Page", pages[0]);

  //to get lower number, we need the

  const goUpOnePage = () => {
    dispatch(pagesActions.incrementPage());
    console.log("GOING UP!!");
  };

  const goBackOnePage = () => {
    dispatch(pagesActions.decrementPage());
    console.log("GOING DOWN!!");
  };

  const onTheFirstPage = currentPageCount === 0;
  const onTheLastPage = currentPageCount === pages.length-1;

  return (
    <div className={classes.container}>
      <span className={classes.numbers}>
        {lowerBound} — {upperBound} of {numItems}
      </span>
      <div className={classes["button-container"]}>
        <button className={`${classes.button} ${onTheFirstPage ? classes['disabled-button'] : ''}`} onClick={goBackOnePage} disabled={onTheFirstPage}>
          <img className={`${classes.image} ${onTheFirstPage ? classes['disabled-image'] : ''}`} style={{paddingRight: 3, paddingTop: 3}} src={leftArrow} alt="left arrow icon" />
        </button>
        <button className={`${classes.button} ${onTheLastPage ? classes['disabled-button'] : ''}`} onClick={goUpOnePage} disabled={onTheLastPage}>
          <img className={`${classes.image} ${onTheLastPage ? classes['disabled-image'] : ''}`} style={{paddingLeft: 3, paddingTop: 3}} src={rightArrow} alt="right arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default NumberOfExpenses;
