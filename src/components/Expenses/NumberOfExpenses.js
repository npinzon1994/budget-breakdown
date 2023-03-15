import React from "react";
import classes from "./NumberOfExpenses.module.css";
import leftArrow from "../../assets/left-arrow.svg";
import rightArrow from "../../assets/right-arrow.svg";

const NumberOfExpenses = () => {
  return (
    <div className={classes.container}>
      <span className={classes.numbers}> 1 - 4 of 4</span>
      <div className={classes["button-container"]}>
        <button>
          <img src={leftArrow} alt="left arrow icon" />
        </button>
        <button>
          <img src={rightArrow} alt="right arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default NumberOfExpenses;
