import { FC } from "react";
import classes from "./FormHeader.module.css";
import CloseButtonX from "../UI/CloseButtonX";

type FormHeaderProps = {
  title: string;
  onClose: () => void;
};

const FormHeader: FC<FormHeaderProps> = ({ title, onClose }) => {
  return (
    <div className={classes.header}>
      <span className={classes.title}>{title}</span>
      <CloseButtonX onClose={onClose} />
    </div>
  );
};

export default FormHeader;
