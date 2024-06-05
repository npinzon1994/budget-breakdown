'use client';

import { FC } from "react";
import classes from "./LoadingSpinner.module.css";

const LoadingSpinner: FC = () => {
  return <div className={classes.spinner} />;
};

export default LoadingSpinner;
