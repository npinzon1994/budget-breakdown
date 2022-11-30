//default states for reducers
const defaultAmountState = { value: "", isValid: null };
const defaultDateState = { value: "", isValid: null };
const defaultIsPaidState = { value: "", isValid: null };
const defaultMerchantState = { value: "", isValid: null };

//reducer functions
const amountReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const inputIsValid = action.val > 0 && action.val.trim().length > 0;
    return { value: action.val, isValid: inputIsValid };
  }

  const latestStateIsValid = state.value > 0 && state.value.trim().length > 0;
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: latestStateIsValid };
  }
  return defaultAmountState;
};

const dateReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const inputIsValid = action.val.trim().length > 0;
    return { value: action.val, isValid: inputIsValid };
  }

  const latestStateIsValid = state.value.trim().length > 0;
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: latestStateIsValid };
  }

  return defaultDateState;
};

const isPaidReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    // const inputIsValid = action.val !== 'default';

    return { value: action.val, isValid: action.val !== 'default' };
  }
  // const latestStateIsValid = state.val !== 'default';
  if (action.type === "INPUT_BLUR") {
    return { value: state.val, isValid: state.val !== 'default' };
  }
  return defaultIsPaidState;
};

const merchantReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const inputIsValid = action.val.trim().length > 0;

    return { value: action.val, isValid: inputIsValid };
  }

  const latestStateIsValid = state.value.trim().length > 0;
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: latestStateIsValid };
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
  merchantReducer: merchantReducer,
};

export default ExpenseFormReducers;
