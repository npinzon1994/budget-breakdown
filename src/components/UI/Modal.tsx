"use client";

import { FC, useEffect, useState } from "react";
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

const Modal: FC<ModalProps> = ({
  className,
  backdropClassName,
  onClose,
  children,
}) => {
  const [modalPortal, setModalPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalPortal(document.getElementById("modal-overlay"));
  }, []);

  if (!modalPortal) {
    return null; // or return a fallback UI, or log an error
  }

  //ensure the portal isn't null
  if (!modalPortal) {
    console.error("Modal portal element with id 'modal-overlay' not found");
    return null;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} backdropClassName={backdropClassName} />,
        modalPortal
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={className}>{children}</ModalOverlay>,
        modalPortal
      )}
    </>
  );
};

export default Modal;
