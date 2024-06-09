"use client";

import Image from "next/image";
import classes from "./BackButton.module.css";
import { useRouter } from "next/navigation";
import arrowIcon from "../../../assets/arrow-rounded-corners.svg";

const BackButton = () => {
  const router = useRouter();

  return (
    <button className={classes.button} onClick={() => router.back()}>
      <Image
        src={arrowIcon}
        alt="left arrow"
        className={`${classes.image} ${classes.left}`}
      />
      <span className={classes["button-text"]}>Back</span>
    </button>
  );
};

export default BackButton;
