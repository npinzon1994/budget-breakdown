import React, { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={`${classes.backdrop} ${props.backdropClassName}`} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
      <div className={`${classes.modal} ${props.className}`}>
        <div className={classes.content}>{props.children}</div>
      </div>
  );
};

const modalPortal = document.getElementById("modal-overlay");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} backdropClassName={props.backdropClassName}/>, modalPortal)}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.className}>{props.children}</ModalOverlay>,
        modalPortal
      )}
    </Fragment>
  );
};

export default Modal;
