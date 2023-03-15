import React from "react";
import classes from "./DeleteModal.module.css";
import Modal from "./Modal";
import deleteIcon from "../../assets/modal-delete-red-x.png";

const DeleteModal = (props) => {
  return (
    <Modal onClose={props.onClose} className={classes.modal} backdropClassName={classes.backdrop}>
      <div className={classes.container}>
        <img
          className={classes.icon}
          src={deleteIcon}
          alt="Red X in a circle"
        />

        <div className={classes.title}>
          <span>Delete Expense?</span>
        </div>
        <div className={classes.message}>
          <span>This action cannot be undone</span>
        </div>
        <div className={classes.buttons}>
          <button className={classes['close-button']} onClick={props.onClose}>Cancel</button>
          <button className={classes['delete-button']} onClick={props.onRemove}>Delete</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
