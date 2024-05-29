import { FC } from "react";
import classes from "./FilterHeader.module.css";

const FilterHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <div className={classes.header}>
      <span>{title}</span>
    </div>
  );
};

export default FilterHeader;
