import React from "react";
import classes from "./FormHeader.module.css";
import CloseButtonX from '../UI/CloseButtonX';
import CSSTransition from 'react-transition-group/CSSTransition';
import { useSelector } from "react-redux";

const FormHeader = (props) => {
  const isNewFormVisible = useSelector((state) => state.showHide.showNewForm);
  return (
    <CSSTransition
    in={isNewFormVisible}
    mountOnEnter
    unmountOnExit
    timeout={{ enter: 300, exit: 500 }}
    classNames={{
      enter: "",
      enterActive: `${classes["header-open"]}`,
      exit: "",
      exitActive: `${classes["header-closed"]}`,
    }}
  >
  <div className={classes.header}>
    <span className={classes.title}>{props.title}</span>
    <CloseButtonX onClose={props.onClose}/>
  </div>
  </CSSTransition>
  )
};

export default FormHeader;
