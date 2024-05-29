import {FC} from "react";
import classes from "./DeleteModal.module.css";
import Modal from "./Modal";
import deleteIcon from "../../assets/modal-delete-red-x.png";
import { DeleteModalProps } from "../../models/delete-modal";

const DeleteModal: FC<DeleteModalProps> = ({onClose, onRemove}) => {
  return (
    <Modal onClose={onClose} className={classes.modal} backdropClassName={classes.backdrop}>
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
          <button className={classes['close-button']} onClick={onClose}>Cancel</button>
          <button className={classes['delete-button']} onClick={onRemove}>Delete</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
