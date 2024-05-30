import { FC } from "react";
import classes from "./CloseButtonX.module.css";
import closeButton from "../../assets/cross.svg";

const CloseButtonX: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <img
      src={closeButton.src}
      alt="close button"
      onClick={onClose}
      className={classes["close-button"]}
      data-tooltip="Close"
    />
  );
};

export default CloseButtonX;
