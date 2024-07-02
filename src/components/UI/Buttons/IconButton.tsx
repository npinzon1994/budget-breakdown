import React, { FC } from "react";
import classes from "./IconButton.module.css";
import Image from "next/image";

type Props = {
  onClick: () => void;
  src: string;
  alt: string;
  buttonClasses?: string;
  imageClasses?: string;
};

const IconButton: FC<Props> = ({
  onClick,
  src,
  alt,
  buttonClasses,
  imageClasses,
}) => {
  return (
    <button
      type="button"
      className={`${classes.button} ${buttonClasses}`}
      onClick={onClick}
    >
      <div className={`${classes.preview} ${imageClasses}`}>
        <Image src={src} alt={alt} className={classes.image} />
      </div>
    </button>
  );
};

export default IconButton;
