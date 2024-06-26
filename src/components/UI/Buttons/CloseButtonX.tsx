'use client';
import Image from "next/image";

import { FC } from "react";
import classes from "./CloseButtonX.module.css";
import closeButton from "../../../assets/cross.svg";

const CloseButtonX: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Image
      src={closeButton}
      alt="close button"
      onClick={onClose}
      className={classes["close-button"]}
      data-tooltip="Close"
    />
  );
};

export default CloseButtonX;
