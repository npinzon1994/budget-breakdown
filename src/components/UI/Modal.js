import React, { Fragment } from "react";
import classes from "./Modal.module.css";
import Button from "../UI/Button";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const modalPortal = document.getElementById("modal-overlay");

const Modal = (props) => {
  return (<Fragment>
    {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, modalPortal)}
    {ReactDOM.createPortal(
      <ModalOverlay>{props.children}</ModalOverlay>,
      modalPortal
    )}
  </Fragment>);
};

export default Modal;
