import { ReactNode } from "react";

export type BackdropProps = {
  backdropClassName: string;
  onClose: () => void;
};

export type ModalOverlayProps = {
  className: string;
  children: ReactNode;
};

export type ModalProps = BackdropProps & ModalOverlayProps;
