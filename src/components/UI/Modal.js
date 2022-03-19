import React, { Fragment } from "react";
import classes from "./Modal.module.css";
import Button from "../Button";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>
};

const ModalOverlay = (props) => {
    <form>
    <input type="text" placeholder="Enter Amount" id="enterAmount"></input>
    <input type="date" placeholder="Date" id="pickDate"></input>
    <select name="isPaidDropdown" id="isPaidDropdown" placeholder="Paid Off?">
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
    <Button label={"Add Expense"} />
  </form>
};

const modalPortal = document.getElementById('modal-overlay');

const Modal = (props) => {
  
};

export default Modal;
