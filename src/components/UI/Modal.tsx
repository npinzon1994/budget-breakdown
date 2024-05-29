import { Fragment, FC } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import {
  BackdropProps,
  ModalOverlayProps,
  ModalProps,
} from "../../models/modal";

const Backdrop: FC<BackdropProps> = ({ backdropClassName, onClose }) => {
  return (
    <div
      className={`${classes.backdrop} ${backdropClassName}`}
      onClick={onClose}
    />
  );
};

const ModalOverlay: FC<ModalOverlayProps> = ({ className, children }) => {
  return (
    <div className={`${classes.modal} ${className}`}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const modalPortal = document.getElementById("modal-overlay");

const Modal: FC<ModalProps> = ({
  className,
  backdropClassName,
  onClose,
  children,
}) => {
  //ensure the portal isn't null
  if (!modalPortal) {
    console.error("Modal portal element with id 'modal-overlay' not found");
    return null;
  }

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} backdropClassName={backdropClassName} />,
        modalPortal
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={className}>{children}</ModalOverlay>,
        modalPortal
      )}
    </Fragment>
  );
};

export default Modal;
