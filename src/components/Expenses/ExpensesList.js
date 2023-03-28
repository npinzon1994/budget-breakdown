import React, { Fragment, useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import classes from "./ExpensesList.module.css";
import ExpensesContext from "../../store/expenses-context";
import DeleteModal from "../UI/DeleteModal";
// import useWindowHeight from "../../hooks/use-window-height";
import ExpenseForm from "./ExpenseForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sendingActions } from "../../store/redux/sending-slice";
import { loadingActions } from "../../store/redux/loading-slice";
import { showHideActions } from "../../store/redux/show-hide-slice";
import ControlCenter from "../Layout/ControlCenter";
import { filterItems } from "./util/filter";
import { filterActions } from "../../store/redux/filter-slice";
import FilterHeader from "../Layout/FilterHeader";

let isInitial = true;
let deleteModal;
let editModal;

const ExpensesList = (props) => {
  // const screenHeight = useWindowHeight();
  // const vh = screenHeight * 0.71;

  const expensesContext = useContext(ExpensesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.filter.filterState);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const loadError = useSelector((state) => state.loading.loadError);
  const sendError = useSelector((state) => state.sending.sendError);
  const showDeleteModal = useSelector(
    (state) => state.showHide.showDeleteModal
  );

  const filteredItems = filterItems(expensesContext.items, filterState);

  const numItems = filteredItems.length;
  const numPages = Math.ceil(numItems / recordsPerPage);

  //set upper bound to total unless it's not the last page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = filteredItems.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const showEditForm = useSelector((state) => state.showHide.showEditForm);

  const removeItemHandler = (id) => {
    expensesContext.onRemoveExpense(id); //id is the syntactical outline which accepts the actual item
    if (
      currentPage === numPages &&
      currentPage !== 1 &&
      currentRecords.length === 1 &&
      filterState !== "Show All"
    ) {
      setCurrentPage(currentPage - 1);
      dispatch(filterActions.setFilterState("Show All"));
    } else if (
      currentPage === numPages &&
      currentPage !== 1 &&
      currentRecords.length === 1
    ) {
      //this is where we move back one page
      setCurrentPage(currentPage - 1);
    }

    dispatch(showHideActions.setShowDeleteModal(false));
    dispatch(showHideActions.setShowEditForm(false));
  };

  const hideDeleteModalHandler = () => {
    dispatch(showHideActions.setShowDeleteModal(false));
  };

  const showDeleteModalHandler = (id) => {
    dispatch(showHideActions.setShowDeleteModal(true));

    deleteModal = (
      <DeleteModal
        onRemove={removeItemHandler.bind(null, id)}
        onClose={hideDeleteModalHandler}
      />
    );
  };

  const hideEditModalHandler = () => {
    dispatch(showHideActions.setShowEditForm(false));
  };

  const showEditModalHandler = (id) => {
    dispatch(showHideActions.setShowEditForm(true));

    editModal = (
      <ExpenseForm
        onClose={hideEditModalHandler}
        buttonText="Save"
        title="Edit Expense"
        mode="edit"
        id={id}
        onDelete={showDeleteModalHandler.bind(null, id)}
      />
    );
  };

  //gets all expenses on startup
  useEffect(() => {
    console.log("EFFECT RUNNING -- GET");
    const getExpenseData = async () => {
      dispatch(loadingActions.setIsLoading(true));

      const response = await fetch(
        "https://budget-breakdown-85145-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      //data is good EXCEPT for the dates
      //need to convert to JS Date objects
      const data = await response.json();

      let loadedExpenses = [];
      if (data.items) {
        for (let i = 0; i < data.items.length; i++) {
          loadedExpenses.push({
            id: data.items[i].id,
            date: new Date(data.items[i].date),
            amount: data.items[i].amount,
            isPaid: data.items[i].isPaid,
            merchant: data.items[i].merchant,
          });
          console.log(loadedExpenses[i].date);
        }
      }

      expensesContext.setExpenses(loadedExpenses);

      dispatch(loadingActions.setIsLoading(false));
    };

    getExpenseData().catch((error) => {
      dispatch(loadingActions.setIsLoading(false));
      dispatch(loadingActions.setLoadError(error.message));
    });
  }, [dispatch]);

  //sends cart data to the server
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    console.log("EFFECT RUNNING -- PUT");
    const sendExpenseData = async () => {
      dispatch(sendingActions.setIsSending(true));
      const response = await fetch(
        "https://budget-breakdown-85145-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: expensesContext.items,
            totalBalance: expensesContext.totalBalance,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      dispatch(sendingActions.setIsSending(false));
    };
    if (expensesContext.changed) {
      sendExpenseData().catch((error) => {
        dispatch(sendingActions.setIsSending(false));

        dispatch(sendingActions.setSendError(error.message));
      });
    }
  }, [expensesContext, dispatch]);

  //creates a new array of DailyExpenseItem(s)
  const expenses = currentRecords.map((expense) => (
    <ExpenseItem
      key={expense.id}
      amount={expense.amount}
      date={expense.date}
      isPaid={expense.isPaid}
      merchant={expense.merchant}
      onShowEdit={showEditModalHandler.bind(null, expense.id)} //binding expense.id so the actual expense.id can also be used
      //need to bind in order to be able to pass down to ExpenseItem.js
    />
  ));

  const transitionText = classes["transition-text"];
  const expenseListIsEmpty = expensesContext.items.length === 0;
  const filteredListIsEmpty = expenses.length === 0;

  return (
    <Fragment>
      {/* {console.log(screenHeight)} */}

      {showDeleteModal && deleteModal}
      {showEditForm && editModal}
      <Card>
        <ControlCenter
          indexOfFirstRecord={indexOfFirstRecord}
          indexOfLastRecord={indexOfLastRecord}
          numItems={numItems}
          numPages={numPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentRecords={currentRecords}
        />
      </Card>
      <Card>
        <FilterHeader
          title={filterState === "Show All" ? "All Expenses" : filterState}
        />
        {(expenseListIsEmpty || filteredListIsEmpty) && !isLoading && (
          <p className={transitionText}>No expenses found.</p>
        )}
        {loadError && <p className={transitionText}>{loadError}</p>}
        {sendError && <p className={transitionText}>{sendError}</p>}
        {isLoading && !loadError && (
          <p className={transitionText}>Loading expenses...</p>
        )}
        {!isLoading && (
          <ul
            id="expense-list"
            className={classes["daily-expenses"]}
            // style={{ height: `${vh}px` }}
          >
            {expenses}
          </ul>
        )}
      </Card>
    </Fragment>
  );
};

export default ExpensesList;
