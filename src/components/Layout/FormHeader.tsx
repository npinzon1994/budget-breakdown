import { FC } from "react";
import classes from "./FormHeader.module.css";
import CloseButtonX from "../UI/Buttons/CloseButtonX";

type FormHeaderProps = {
  title: string;
  headerClasses?: string;
  titleClasses?: string;
  onClose: () => void;
};

const FormHeader: FC<FormHeaderProps> = ({
  title,
  headerClasses,
  titleClasses,
  onClose,
}) => {
  return (
    <div className={`${classes.header} ${headerClasses}`}>
      <span className={`${classes.title} ${titleClasses}`}>{title}</span>
      <CloseButtonX onClose={onClose} />
    </div>
  );
};

export default FormHeader;
