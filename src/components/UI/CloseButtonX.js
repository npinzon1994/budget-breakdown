import React from "react";
import classes from "./CloseButtonX.module.css";
import closeButton from '../../assets/cross.svg';

const CloseButtonX = (props) => {
  return (
    <img
      src={closeButton}
      alt="close button"
      onClick={props.onClose}
      className={classes["close-button"]}
      dataTooltip="Close"
    />
  );
};

export default CloseButtonX;
