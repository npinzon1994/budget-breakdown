import React, { useEffect, useContext, useState } from "react";
import classes from "./ExpenseForm.module.css";
import ExpensesContext from "../../store/expenses-context";
import FormHeader from "../UI/FormHeader";
import ToggleSwitch from "../UI/ToggleSwitch";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { uniqueIdActions } from "../../store/redux/generate-unique-id-slice";
import { sendingActions } from "../../store/redux/sending-slice";
import { showHideActions } from "../../store/redux/show-hide-slice";

let isAmountValid;

const ExpenseForm = (props) => {
  const expensesContext = useContext(ExpensesContext);
  const currentExpenseItem = expensesContext.items.find(
    (item) => item.id === props.id
  );

  const [pickedDate, setPickedDate] = useState();
  const [isChecked, setIsChecked] = useState(
    props.mode === "edit" && currentExpenseItem
      ? currentExpenseItem.isPaid
      : false
  );

  const dispatch = useDispatch();

  const uniqueId = useSelector((state) => state.uniqueId.uniqueId);

  const { register, control, handleSubmit, watch, getValues, setFocus } =
    useForm({
      defaultValues: {
        amount: currentExpenseItem ? currentExpenseItem.amount : "",
        date: currentExpenseItem
          ? currentExpenseItem.date.toISOString().substring(0, 10)
          : null,
        isPaid: currentExpenseItem ? currentExpenseItem.isPaid : "",
        merchant: currentExpenseItem ? currentExpenseItem.merchant : "",
      },
    });

  useEffect(() => {
    setFocus("amount");
  }, [setFocus]);

  const inputChangeMonitors = {
    watchAmount: watch("amount"),
    watchDate: watch("date"),
    watchIsPaid: watch("is-paid"),
    watchMerchant: watch("merchant"),
  };

  const { watchAmount, watchDate, watchIsPaid, watchMerchant } =
    inputChangeMonitors;

  const fieldIsNotEmpty = (value) => value !== "";

  const currentValues = {
    currentAmount: getValues("amount"),
    currentDate: getValues("date"),
    currentMerchant: getValues("merchant"),
  };
  const { currentAmount, currentDate, currentMerchant } = currentValues;

  isAmountValid = +watchAmount >= 0 && +watchAmount < 1000000;

  const toggleSwitchChangeHandler = (event) => {
    setIsChecked(event);
  };

  const submitHandler = () => {
    //object to be added -- contains all values captured from the form
    console.log("submitting...");
    let newExpenseObject = {};
    dispatch(sendingActions.setIsSending(true));
    if (props.mode === "edit") {
      //find current item and overwrite
      newExpenseObject = {
        id: currentExpenseItem.id,
        date: new Date(currentDate),
        amount: currentAmount,
        isPaid: isChecked,
        merchant: currentMerchant,
      };

      expensesContext.onEditExpense(newExpenseObject, currentExpenseItem.id);
      dispatch(showHideActions.setShowEditForm(false));
    } else {
      newExpenseObject = {
        id: `E${uniqueId}`,
        date: new Date(currentDate),
        amount: currentAmount,
        isPaid: isChecked,
        merchant: currentMerchant,
      };
      expensesContext.onAddExpense(newExpenseObject);
      dispatch(uniqueIdActions.incrementIdCounter());
      dispatch(showHideActions.setShowNewForm(false));
    }

    dispatch(sendingActions.setIsSending(false));
  };

  useEffect(() => {
    console.log("Picked Date:", pickedDate);
  }, [pickedDate]);

  return (
    <Modal
      onClose={props.onClose}
      className={classes.modal}
      backdropClassName={classes.backdrop}
    >
      <FormHeader title={props.title} onClose={props.onClose} />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={classes["add-expense-form"]}
        name="submit-form"
      >
        {isAmountValid === false && (
          <span className={classes["error-text"]}>
            *Please enter an amount between $0 and $1,000,000
          </span>
        )}

        <div className={classes["top-container"]}>
          <div className={classes["input-container"]}>
            <input
              {...register("amount", {
                required: true,
                min: 0.01,
                max: 999999.99,
              })}
              id="amountField"
              type="number"
              step=".01"
              className={`${classes.input} ${
                fieldIsNotEmpty(watchAmount) && classes["after-focus"]
              }`}
            />
            <label
              htmlFor="amountField"
              className={classes["input-placeholder"]}
            >
              Enter Amount
            </label>
          </div>

          <div className={classes["input-container"]}>
            <input
              {...register("date", { required: true })}
              id="datePicker"
              type="date"
              max="9999-12-31"
              className={classes.input}
            />
            {/* <label
              htmlFor="datePicker"
              className={classes["datepicker-placeholder"]}
            >
              Enter Date
            </label> */}
          </div>
          {/* <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            // defaultValue={currentExpenseItem
            //   ? currentExpenseItem.date.toISOString().substring(0, 10)
            //   : null}
            render={({ field }) => (
                <DatePicker
                  {...field}
                  id="datePicker"
                  isClearable
                  shouldCloseOnSelect
                  selected={pickedDate}
                  onChange={(date) => setPickedDate(date)}
                  className={`${classes.datepicker} ${
                    fieldIsNotEmpty(pickedDate) && classes["after-focus"]
                  }`}
                  // wrapperClassName={classes["datepicker-wrapper"]}
                />
                
              
            )}
          /> */}
        </div>

        <div className={classes["bottom-container"]}>
          <div className={classes["input-container"]}>
            <textarea
              {...register("merchant", { required: true })}
              id="merchantField"
              type="text"
              maxLength="100"
              className={`${classes.textarea} ${
                fieldIsNotEmpty(watchMerchant) && classes["after-focus"]
              }`}
              data-testid="merchant-input-field"
            />
            <label
              htmlFor="merchantField"
              className={classes["textarea-placeholder"]}
            >
              Enter Merchant
            </label>
            {/* <div className={classes["toggle-switch-container"]}>
            <label className={classes["paid-off-label"]}>Paid off?</label>
            <ToggleSwitch
              id="switch"
              onChange={toggleSwitchChangeHandler}
              checked={isChecked}
            />
          </div> */}
          </div>
        </div>

        <div className={classes["button-div"]}>
          <button
            type="submit"
            className={classes["add-expense-button"]}
            data-testid="submit-button"
          >
            {props.buttonText}
          </button>

          {props.mode === "edit" && (
            <button
              className={classes["remove-button"]}
              type="button"
              onClick={props.onDelete}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseForm;
