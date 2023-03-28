import React from "react";
import classes from "./FilterHeader.module.css";

const FilterHeader = ({ title }) => {
  return (
    <div className={classes.header}>
      <span>{title}</span>
    </div>
  );
};

export default FilterHeader;
