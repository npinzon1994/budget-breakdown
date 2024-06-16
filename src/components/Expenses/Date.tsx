import { FC } from "react";
import classes from "./Date.module.css";

type DateProps = {
  month: string;
  day: string;
  year: string;
}

const DateElement: FC<DateProps> = ({month, day, year}) => {
  return (
    <div className={classes.container}>
      <div className={classes.date}>
        <span>{month}</span>
        <span className={classes["day-text"]}>{day}</span>
        <span>{year}</span>
      </div>
    </div>
  );
};

export default DateElement;
