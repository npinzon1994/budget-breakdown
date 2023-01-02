import { useState } from "react";

const useInput = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = validateInput(enteredValue);
  const hasError = !inputIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputOnBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    inputIsValid,
    hasError,
    inputChangeHandler,
    inputOnBlurHandler,
    reset,
  };
};

export default useInput;
