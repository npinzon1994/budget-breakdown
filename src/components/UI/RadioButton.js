import React, { useEffect, useState } from "react";
import classes from "./RadioButton.module.css";
import {ReactComponent as ThumbsUpIcon} from "../../assets/thumbs-up-icon.svg";
import {ReactComponent as ThumbsDownIcon} from "../../assets/thumbs-up-icon.svg";

const RadioButton = (props) => {
  const [topButtonSelected, setTopButtonSelected] = useState(
    props.mode === "edit" ? props.currentExpenseItem.isPaid : false
  );
  const [bottomButtonSelected, setBottomButtonSelected] = useState(
    props.mode === "edit" ? !props.currentExpenseItem.isPaid : true
  );

  const topButtonClickHandler = () => {
    if (!topButtonSelected) {
      setTopButtonSelected(true);
      setBottomButtonSelected(false);
      // setIsPaid(true);
    }
  };

  const bottomButtonClickHandler = () => {
    if (!bottomButtonSelected) {
      setBottomButtonSelected(true);
      setTopButtonSelected(false);
      // setIsPaid(false);
    }
  };

  useEffect(() => {
    //lift state up whenever it changes
    if (topButtonSelected === true) {
      props.isPaid(true);
    } else {
      props.isPaid(false);
    }
  }, [props, topButtonSelected]);

  /*Confirming button states*/
  // useEffect(() => {
  //   console.log("Top button selected?", topButtonSelected);
  //   console.log("Bottom button selected?", bottomButtonSelected);
  //   // console.log("IS PAID? (from RadioButton.js)", isPaid);
  // }, [topButtonSelected, bottomButtonSelected]);

  return (
    <div className={classes["radio-button-container"]}>
      <div
        className={`${classes["radio-button"]} ${
          topButtonSelected ? classes.selected : ""
        }`}
        onClick={topButtonClickHandler}
      >
        <span className={classes.label}>{props.names.firstOption}</span>
        {/* <img src={thumbsUpIcon} alt="Thumbs up icon" className={classes.icon} /> */}
        <ThumbsUpIcon className={classes['thumbs-up']}/>
      </div>
      <div
        className={`${classes["radio-button"]} ${
          bottomButtonSelected ? classes.selected : ""
        }`}
        onClick={bottomButtonClickHandler}
      >
        <span className={classes.label}>{props.names.secondOption}</span>
        <ThumbsDownIcon className={classes['thumbs-down']}/>
      </div>
    </div>
  );
};

export default RadioButton;
