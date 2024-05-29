import { Fragment, useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import classes from "./ExpensesList.module.css";
import ExpenseContext from "../../context/expense-context";
import DeleteModal from "../UI/DeleteModal";
import ExpenseForm from "./ExpenseForm";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import { sendingActions } from "../../redux-store/sending-slice";
import { loadingActions } from "../../redux-store/loading-slice";
import { showHideActions } from "../../redux-store/show-hide-slice";
import { filterActions } from "../../redux-store/filter-slice";
import FilterHeader from "../Layout/FilterHeader";
import LoadingSpinner from "../UI/LoadingSpinner";
import { ExpensePaginationContext } from "../../context/expense-pagination-context";

let isInitial = true;

const ExpensesList = () => {
  const [currentItemId, setCurrentItemId] = useState("");

  const expenseContext = useContext(ExpenseContext);
  const { numPages, currentPage, setCurrentPage, currentRecords } = useContext(
    ExpensePaginationContext
  );

  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.filter.filterState);
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const loadError = useAppSelector((state) => state.loading.loadError);
  const sendError = useAppSelector((state) => state.sending.sendError);
  const showDeleteModal = useAppSelector(
    (state) => state.showHide.showDeleteModal
  );

  const showEditForm = useAppSelector((state) => state.showHide.showEditForm);

  const removeItemHandler = (id: string) => {
    expenseContext.onRemoveExpense(id); //id is the syntactical outline which accepts the actual item
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

  const showDeleteModalHandler = () => {
    dispatch(showHideActions.setShowDeleteModal(true));
  };

  const hideEditModalHandler = () => {
    dispatch(showHideActions.setShowEditForm(false));
  };

  const showEditModalHandler = (id: string) => {
    dispatch(showHideActions.setShowEditForm(true));
    setCurrentItemId(id);
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

      expenseContext.setExpenses(loadedExpenses);

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
            items: expenseContext.items,
            totalBalance: expenseContext.totalBalance,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      dispatch(sendingActions.setIsSending(false));
    };
    if (expenseContext.changed) {
      sendExpenseData().catch((error) => {
        dispatch(sendingActions.setIsSending(false));

        dispatch(sendingActions.setSendError(error.message));
      });
    }
  }, [expenseContext, dispatch]);

  //creates a new array of ExpenseItem(s)
  const expenses = currentRecords.map((expense) => (
    <ExpenseItem
      id={expense.id}
      amount={expense.amount}
      date={expense.date}
      isPaid={expense.isPaid}
      merchant={expense.merchant}
      onShowEdit={showEditModalHandler.bind(null, expense.id)} //binding expense.id so the actual expense.id can also be used
      //need to bind in order to be able to pass down to ExpenseItem.js
    />
  ));

  const transitionText = classes["transition-text"];
  const expenseListIsEmpty = expenseContext.items.length === 0;
  const filteredListIsEmpty = expenses.length === 0;

  return (
    <Fragment>
      {showDeleteModal ? (
        <DeleteModal
          onClose={hideDeleteModalHandler}
          onRemove={() => removeItemHandler(currentItemId)}
        />
      ) : undefined}

      {showEditForm ? (
        <ExpenseForm
          id={currentItemId}
          mode="edit"
          title="Edit Expense"
          onClose={hideEditModalHandler}
          onDelete={showDeleteModalHandler}
        />
      ) : undefined}
      <Card
        className={`${isLoading && !loadError ? classes["card-padding"] : ""}`}
      >
        <FilterHeader
          title={filterState === "Show All" ? "All Expenses" : filterState}
        />
        {(expenseListIsEmpty || filteredListIsEmpty) && !isLoading && (
          <p className={transitionText}>No expenses found.</p>
        )}
        {loadError && <p className={transitionText}>{loadError}</p>}
        {sendError && <p className={transitionText}>{sendError}</p>}
        {isLoading && !loadError && <LoadingSpinner />}
        {!isLoading && (
          <ul id="expense-list" className={classes["daily-expenses"]}>
            {expenses}
          </ul>
        )}
      </Card>
    </Fragment>
  );
};

export default ExpensesList;
