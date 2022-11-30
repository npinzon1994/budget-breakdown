//default states for reducers
const defaultAmountState = { value: "", isValid: true };
const defaultDateState = { value: "", isValid: true };
const defaultIsPaidState = { value: "", isValid: true };
const defaultMerchantState = { value: "", isValid: true };

//reducer functions
const amountReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const inputIsValid = action.val > 0 && action.val.trim().length > 0;
    if (inputIsValid) {
      return { value: action.val, isValid: true };
    } else {
      //if amount input is not valid...
      //add .invalid styling and return
      return { value: action.val, isValid: false };
    }
  }
  return defaultAmountState;
};

const dateReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const inputIsValid = action.val.trim().length > 0;
    if (inputIsValid) {
      return { value: action.val, isValid: true };
    } else {
      //if amount input is not valid...
      //add .invalid styling and return
      return { value: action.val, isValid: false };
    }
  }
  return defaultDateState;
};

const isPaidReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const inputIsValid = action.val !== "Paid Off?";
    if (inputIsValid) {
      return { value: action.val, isValid: true };
    } else {
      //if amount input is not valid...
      //add .invalid styling and return
      return { value: action.val, isValid: false };
    }
  }
  return defaultIsPaidState;
};

const merchantReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const inputIsValid = action.val.trim().length > 0;
    if (inputIsValid) {
      return { value: action.val, isValid: true };
    } else {
      //if amount input is not valid...
      //add .invalid styling and return
      return { value: action.val, isValid: false };
    }
  }
  return defaultMerchantState;
};

const ExpenseFormReducers = {
    defaultAmountState: defaultAmountState,
    defaultDateState: defaultDateState,
    defaultIsPaidState: defaultIsPaidState,
    defaultMerchantState: defaultMerchantState,
    amountReducer: amountReducer,
    dateReducer: dateReducer,
    isPaidReducer: isPaidReducer,
    merchantReducer: merchantReducer
};

export default ExpenseFormReducers;