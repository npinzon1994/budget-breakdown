import React from "react";
import classes from "./DailyExpenseHeader.module.css";
import Card from "../UI/Card";

const DailyExpenseHeader = () => {
  return (
    <Card>
    <header className={classes.titles}>
      <span>Amount</span>
      <span>Date</span>
      <span>Paid Off?</span>
      <span>Merchant</span>
    </header>
    </Card>
  );
};

export default DailyExpenseHeader;
